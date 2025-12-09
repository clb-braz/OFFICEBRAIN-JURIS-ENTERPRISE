import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateDeadlineDto } from './dto/create-deadline.dto';
import { UpdateDeadlineDto } from './dto/update-deadline.dto';

@Injectable()
export class DeadlinesService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(createDeadlineDto: CreateDeadlineDto) {
    const { tipoOriginal, ...rest } = createDeadlineDto;
    const prazo = await this.prisma.prazoAvancado.create({
      data: {
        ...rest,
        processoId: createDeadlineDto.processoId,
        dataLimite: new Date(createDeadlineDto.dataLimite),
        nivelAlerta: this.calculateAlertLevel(new Date(createDeadlineDto.dataLimite)),
        tipoOriginal: (tipoOriginal as any) || 'OUTROS',
      },
      include: {
        processo: { select: { id: true, numeroCnj: true } },
        responsavel: { select: { id: true, nome: true } },
        documento: { select: { id: true, nome: true } },
      },
    });

    // Criar histórico
    await this.prisma.historicoPrazo.create({
      data: {
        prazoId: prazo.id,
        acao: 'CRIADO',
        descricao: `Prazo criado: ${prazo.descricao}`,
      },
    });

    return prazo;
  }

  async createFromDocument(documentId: string, processoId: string) {
    const documento = await this.prisma.documento.findUnique({
      where: { id: documentId },
      include: { processo: true },
    });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado');
    }

    // IA identifica prazos no documento
    const prazosIdentificados = await this.aiService.identifyDeadlines(
      documento.textoCompleto || '',
      documento.tipo,
    );

    const prazosCriados = [];

    for (const prazoData of prazosIdentificados) {
      const prazo = await this.prisma.prazoAvancado.create({
        data: {
          processoId,
          documentoId: documentId,
          tipo: prazoData.tipo,
          tipoOriginal: prazoData.tipoOriginal || 'OUTROS',
          descricao: prazoData.descricao,
          dataLimite: new Date(prazoData.dataLimite),
          origem: 'IA_DOCUMENTO',
          criadoPorIA: true,
          confiancaIA: prazoData.confianca || 0.8,
          nivelAlerta: this.calculateAlertLevel(new Date(prazoData.dataLimite)),
          instrucoes: prazoData.instrucoes,
        },
      });

      prazosCriados.push(prazo);
    }

    return prazosCriados;
  }

  async createFromProcess(processoId: string) {
    const processo = await this.prisma.processo.findUnique({
      where: { id: processoId },
      select: {
        id: true,
        area: true,
        fase: true,
        dataDistribuicao: true,
        dataCitacao: true,
      },
    });

    if (!processo) {
      throw new NotFoundException('Processo não encontrado');
    }

    // Criar prazos automáticos baseados no CPC e área
    const prazosAutomaticos = await this.generateAutomaticDeadlines(processo);

    const prazosCriados = [];

    for (const prazoData of prazosAutomaticos) {
      const prazo = await this.prisma.prazoAvancado.create({
        data: {
          processoId,
          tipo: prazoData.tipo,
          tipoOriginal: prazoData.tipoOriginal,
          descricao: prazoData.descricao,
          dataLimite: prazoData.dataLimite,
          origem: 'AUTOMATICO_CPC',
          nivelAlerta: this.calculateAlertLevel(prazoData.dataLimite),
          instrucoes: prazoData.instrucoes,
        },
      });

      prazosCriados.push(prazo);
    }

    return prazosCriados;
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    processoId?: string;
    responsavelId?: string;
    status?: string;
    nivelAlerta?: string;
    dataLimiteInicio?: Date;
    dataLimiteFim?: Date;
  }) {
    const { skip = 0, take = 50, ...filters } = params || {};

    const where: any = {};

    if (filters.processoId) where.processoId = filters.processoId;
    if (filters.responsavelId) where.responsavelId = filters.responsavelId;
    if (filters.status) where.status = filters.status;
    if (filters.nivelAlerta) where.nivelAlerta = filters.nivelAlerta;

    if (filters.dataLimiteInicio || filters.dataLimiteFim) {
      where.dataLimite = {};
      if (filters.dataLimiteInicio) where.dataLimite.gte = filters.dataLimiteInicio;
      if (filters.dataLimiteFim) where.dataLimite.lte = filters.dataLimiteFim;
    }

    const [data, total] = await Promise.all([
      this.prisma.prazoAvancado.findMany({
        where,
        skip,
        take,
        orderBy: [
          { nivelAlerta: 'desc' },
          { dataLimite: 'asc' },
        ],
        include: {
          processo: { select: { id: true, numeroCnj: true, tipoAcao: true } },
          responsavel: { select: { id: true, nome: true, email: true } },
          documento: { select: { id: true, nome: true } },
          _count: { select: { notificacoes: true, historico: true } },
        },
      }),
      this.prisma.prazoAvancado.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async findOne(id: string) {
    const prazo = await this.prisma.prazoAvancado.findUnique({
      where: { id },
      include: {
        processo: true,
        responsavel: true,
        documento: true,
        notificacoes: { orderBy: { createdAt: 'desc' } },
        historico: { 
          orderBy: { createdAt: 'desc' },
          include: { usuario: { select: { id: true, nome: true } } },
        },
      },
    });

    if (!prazo) {
      throw new NotFoundException('Prazo não encontrado');
    }

    return prazo;
  }

  async update(id: string, updateDeadlineDto: UpdateDeadlineDto) {
    const prazoAntigo = await this.prisma.prazoAvancado.findUnique({ where: { id } });

    if (!prazoAntigo) {
      throw new NotFoundException('Prazo não encontrado');
    }

    const dataLimite = updateDeadlineDto.dataLimite 
      ? new Date(updateDeadlineDto.dataLimite)
      : prazoAntigo.dataLimite;

    const { processoId, tipoOriginal, ...rest } = updateDeadlineDto as any;

    const prazo = await this.prisma.prazoAvancado.update({
      where: { id },
      data: {
        ...rest,
        tipoOriginal: (tipoOriginal as any) || prazoAntigo.tipoOriginal,
        dataLimite,
        nivelAlerta: this.calculateAlertLevel(dataLimite),
      },
      include: {
        processo: { select: { id: true, numeroCnj: true } },
        responsavel: { select: { id: true, nome: true } },
      },
    });

    // Criar histórico
    await this.prisma.historicoPrazo.create({
      data: {
        prazoId: id,
        acao: 'ATUALIZADO',
        descricao: 'Prazo atualizado',
        dadosAntigos: prazoAntigo as any,
        dadosNovos: prazo as any,
      },
    });

    return prazo;
  }

  async remove(id: string) {
    return this.prisma.prazoAvancado.delete({ where: { id } });
  }

  async markAsCompleted(id: string, usuarioId?: string) {
    const prazo = await this.prisma.prazoAvancado.update({
      where: { id },
      data: {
        status: 'CUMPRIDO',
        dataCumprido: new Date(),
      },
    });

    await this.prisma.historicoPrazo.create({
      data: {
        prazoId: id,
        acao: 'CUMPRIDO',
        descricao: 'Prazo cumprido',
        usuarioId,
      },
    });

    return prazo;
  }

  async getCriticalDeadlines(hours: number = 48) {
    const now = new Date();
    const limit = new Date(now.getTime() + hours * 60 * 60 * 1000);

    return this.prisma.prazoAvancado.findMany({
      where: {
        status: 'PENDENTE',
        dataLimite: {
          gte: now,
          lte: limit,
        },
      },
      include: {
        processo: { select: { id: true, numeroCnj: true, tipoAcao: true } },
        responsavel: { select: { id: true, nome: true, email: true, telefone: true } },
      },
      orderBy: { dataLimite: 'asc' },
    });
  }

  async checkAndSendAlerts() {
    const now = new Date();
    const prazos = await this.prisma.prazoAvancado.findMany({
      where: {
        status: 'PENDENTE',
        dataLimite: { gte: now },
      },
      include: {
        processo: true,
        responsavel: true,
      },
    });

    const alerts = [];

    for (const prazo of prazos) {
      const horasRestantes = (prazo.dataLimite.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Alerta 48h
      if (horasRestantes <= 48 && horasRestantes > 24 && !prazo.alerta48hEnviado) {
        await this.sendAlert(prazo, '48H');
        alerts.push({ prazo: prazo.id, tipo: '48H' });
      }

      // Alerta 24h
      if (horasRestantes <= 24 && horasRestantes > 12 && !prazo.alerta24hEnviado) {
        await this.sendAlert(prazo, '24H');
        alerts.push({ prazo: prazo.id, tipo: '24H' });
      }

      // Alerta 12h
      if (horasRestantes <= 12 && horasRestantes > 1 && !prazo.alerta12hEnviado) {
        await this.sendAlert(prazo, '12H');
        alerts.push({ prazo: prazo.id, tipo: '12H' });
      }

      // Alerta 1h
      if (horasRestantes <= 1 && horasRestantes > 0 && !prazo.alerta1hEnviado) {
        await this.sendAlert(prazo, '1H');
        alerts.push({ prazo: prazo.id, tipo: '1H' });
      }
    }

    return alerts;
  }

  private async sendAlert(prazo: any, tipo: string) {
    const campoAlerta = `alerta${tipo}Enviado`;

    await this.prisma.prazoAvancado.update({
      where: { id: prazo.id },
      data: { [campoAlerta]: true },
    });

    // Criar notificações
    if (prazo.responsavel) {
      await this.prisma.notificacaoPrazo.create({
        data: {
          prazoId: prazo.id,
          tipo: 'WEB',
          enviada: true,
          enviadaEm: new Date(),
        },
      });

      // TODO: Enviar email, WhatsApp, SMS
    }
  }

  private calculateAlertLevel(dataLimite: Date): $Enums.NivelAlertaPrazo {
    const now = new Date();
    const horasRestantes = (dataLimite.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (horasRestantes < 1) return 'EMERGENCIAL' as $Enums.NivelAlertaPrazo;
    if (horasRestantes < 12) return 'CRITICO' as $Enums.NivelAlertaPrazo;
    if (horasRestantes < 24) return 'URGENTE' as $Enums.NivelAlertaPrazo;
    if (horasRestantes < 48) return 'ATENCAO' as $Enums.NivelAlertaPrazo;
    return 'NORMAL' as $Enums.NivelAlertaPrazo;
  }

  private async generateAutomaticDeadlines(processo: any): Promise<any[]> {
    const prazos = [];
    const hoje = new Date();

    // Prazos baseados na fase processual
    if (processo.fase === 'CONHECIMENTO') {
      if (processo.dataDistribuicao) {
        // Prazo para contestação (15 dias)
        prazos.push({
          tipo: 'CONTESTACAO',
          tipoOriginal: 'CONTESTACAO',
          descricao: 'Prazo para apresentação de contestação',
          dataLimite: new Date(processo.dataDistribuicao.getTime() + 15 * 24 * 60 * 60 * 1000),
          instrucoes: 'Prepare a contestação com todos os documentos necessários',
        });
      }
    }

    // Prazos recursais (baseados no tipo de ação)
    if (processo.area === 'TRABALHISTA') {
      prazos.push({
        tipo: 'RECURSAL',
        tipoOriginal: 'RECURSO',
        descricao: 'Prazo para interposição de recurso trabalhista',
        dataLimite: new Date(hoje.getTime() + 8 * 24 * 60 * 60 * 1000),
        instrucoes: 'Verifique o prazo específico do recurso trabalhista',
      });
    }

    return prazos;
  }
}

