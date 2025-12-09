import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class AgendaService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(createEventoDto: CreateEventoDto) {
    return this.prisma.eventoAgenda.create({
      data: {
        ...createEventoDto,
        dataInicio: new Date(createEventoDto.dataInicio),
        dataFim: createEventoDto.dataFim ? new Date(createEventoDto.dataFim) : null,
        participantes: createEventoDto.participantesIds ? {
          create: createEventoDto.participantesIds.map((id) => ({
            usuarioId: id,
          })),
        } : undefined,
      },
      include: {
        processo: { select: { id: true, numeroCnj: true } },
        cliente: { select: { id: true, nome: true } },
        responsavel: { select: { id: true, nome: true } },
        participantes: { include: { usuario: { select: { id: true, nome: true } } } },
      },
    });
  }

  async createFromProcess(processoId: string) {
    const processo = await this.prisma.processo.findUnique({
      where: { id: processoId },
      select: {
        id: true,
        workspaceId: true,
        numeroCnj: true,
        dataDistribuicao: true,
        audiencias: true,
      },
    });

    if (!processo) {
      throw new NotFoundException('Processo não encontrado');
    }

    const eventos = [];

    // Criar eventos baseados em audiências
    for (const audiencia of processo.audiencias || []) {
      const evento = await this.prisma.eventoAgenda.create({
        data: {
          workspaceId: processo.workspaceId,
          tipo: 'AUDIENCIA',
          titulo: `Audiência - ${audiencia.tipo}`,
          descricao: `Audiência do processo ${processo.numeroCnj}`,
          dataInicio: audiencia.data,
          local: audiencia.local,
          sala: audiencia.sala,
          linkVirtual: audiencia.linkVirtual,
          processoId,
          status: audiencia.status === 'AGENDADA' ? 'AGENDADO' : 'REALIZADO',
          criadoPorIA: false,
        },
      });
      eventos.push(evento);
    }

    // IA prevê próximos eventos
    const previsoes = await this.aiService.predictEvents(processo);
    
    for (const previsao of previsoes) {
      const evento = await this.prisma.eventoAgenda.create({
        data: {
          workspaceId: processo.workspaceId,
          tipo: previsao.tipo,
          titulo: previsao.titulo,
          descricao: previsao.descricao,
          dataInicio: previsao.dataInicio,
          processoId,
          criadoPorIA: true,
          previsaoIA: previsao.previsao,
        },
      });
      eventos.push(evento);
    }

    return eventos;
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    workspaceId?: string;
    processoId?: string;
    clienteId?: string;
    responsavelId?: string;
    tipo?: string;
    status?: string;
    dataInicio?: Date;
    dataFim?: Date;
  }) {
    const { skip = 0, take = 50, ...filters } = params || {};

    const where: any = {};

    if (filters.workspaceId) where.workspaceId = filters.workspaceId;
    if (filters.processoId) where.processoId = filters.processoId;
    if (filters.clienteId) where.clienteId = filters.clienteId;
    if (filters.responsavelId) where.responsavelId = filters.responsavelId;
    if (filters.tipo) where.tipo = filters.tipo;
    if (filters.status) where.status = filters.status;

    if (filters.dataInicio || filters.dataFim) {
      where.dataInicio = {};
      if (filters.dataInicio) where.dataInicio.gte = filters.dataInicio;
      if (filters.dataFim) where.dataInicio.lte = filters.dataFim;
    }

    const [data, total] = await Promise.all([
      this.prisma.eventoAgenda.findMany({
        where,
        skip,
        take,
        orderBy: { dataInicio: 'asc' },
        include: {
          processo: { select: { id: true, numeroCnj: true, tipoAcao: true } },
          cliente: { select: { id: true, nome: true } },
          responsavel: { select: { id: true, nome: true, email: true } },
          participantes: { include: { usuario: { select: { id: true, nome: true } } } },
          _count: { select: { lembretes: true, notificacoes: true } },
        },
      }),
      this.prisma.eventoAgenda.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async findByDateRange(dataInicio: Date, dataFim: Date, workspaceId?: string) {
    const where: any = {
      dataInicio: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    if (workspaceId) where.workspaceId = workspaceId;

    return this.prisma.eventoAgenda.findMany({
      where,
      orderBy: { dataInicio: 'asc' },
      include: {
        processo: { select: { id: true, numeroCnj: true } },
        cliente: { select: { id: true, nome: true } },
        responsavel: { select: { id: true, nome: true } },
        participantes: { include: { usuario: { select: { id: true, nome: true } } } },
      },
    });
  }

  async findOne(id: string) {
    const evento = await this.prisma.eventoAgenda.findUnique({
      where: { id },
      include: {
        processo: true,
        cliente: true,
        responsavel: true,
        participantes: { include: { usuario: true } },
        lembretes: { orderBy: { createdAt: 'desc' } },
        notificacoes: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!evento) {
      throw new NotFoundException('Evento não encontrado');
    }

    return evento;
  }

  async update(id: string, updateEventoDto: UpdateEventoDto) {
    return this.prisma.eventoAgenda.update({
      where: { id },
      data: {
        ...updateEventoDto,
        dataInicio: updateEventoDto.dataInicio ? new Date(updateEventoDto.dataInicio) : undefined,
        dataFim: updateEventoDto.dataFim ? new Date(updateEventoDto.dataFim) : undefined,
      },
      include: {
        processo: { select: { id: true, numeroCnj: true } },
        cliente: { select: { id: true, nome: true } },
        responsavel: { select: { id: true, nome: true } },
      },
    });
  }

  async remove(id: string) {
    await this.prisma.lembreteEvento.deleteMany({ where: { eventoId: id } });
    await this.prisma.notificacaoEvento.deleteMany({ where: { eventoId: id } });
    await this.prisma.participanteEvento.deleteMany({ where: { eventoId: id } });
    
    return this.prisma.eventoAgenda.delete({ where: { id } });
  }

  async addParticipant(eventoId: string, usuarioId: string) {
    return this.prisma.participanteEvento.create({
      data: {
        eventoId,
        usuarioId,
      },
      include: { usuario: { select: { id: true, nome: true } } },
    });
  }

  async confirmParticipant(eventoId: string, usuarioId: string) {
    return this.prisma.participanteEvento.updateMany({
      where: { eventoId, usuarioId },
      data: { confirmado: true },
    });
  }

  async checkAndSendReminders() {
    const now = new Date();
    const eventos = await this.prisma.eventoAgenda.findMany({
      where: {
        status: { in: ['AGENDADO', 'CONFIRMADO'] },
        dataInicio: { gte: now },
      },
      include: {
        responsavel: true,
        participantes: { include: { usuario: true } },
        lembretes: true,
      },
    });

    const reminders = [];

    for (const evento of eventos) {
      const horasRestantes = (evento.dataInicio.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Lembrete 1 dia antes
      if (horasRestantes <= 24 && horasRestantes > 1) {
        const existe = evento.lembretes.find((l) => l.tipo === '1_DIA' && l.enviado);
        if (!existe) {
          await this.sendReminder(evento, '1_DIA');
          reminders.push({ evento: evento.id, tipo: '1_DIA' });
        }
      }

      // Lembrete 1 hora antes
      if (horasRestantes <= 1 && horasRestantes > 0) {
        const existe = evento.lembretes.find((l) => l.tipo === '1_HORA' && l.enviado);
        if (!existe) {
          await this.sendReminder(evento, '1_HORA');
          reminders.push({ evento: evento.id, tipo: '1_HORA' });
        }
      }
    }

    return reminders;
  }

  private async sendReminder(evento: any, tipo: string) {
    await this.prisma.lembreteEvento.create({
      data: {
        eventoId: evento.id,
        tipo,
        enviado: true,
        enviadoEm: new Date(),
      },
    });

    // Criar notificações para participantes
    const participantes = [evento.responsavel, ...evento.participantes.map((p: any) => p.usuario)].filter(Boolean);

    for (const participante of participantes) {
      await this.prisma.notificacaoEvento.create({
        data: {
          eventoId: evento.id,
          tipo: 'WEB',
          enviada: true,
          enviadaEm: new Date(),
        },
      });

      // TODO: Enviar email, WhatsApp
    }
  }
}

