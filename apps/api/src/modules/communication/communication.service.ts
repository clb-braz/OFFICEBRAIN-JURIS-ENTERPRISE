import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class CommunicationService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: sendMessageDto.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    // Processar template se fornecido
    let conteudo = sendMessageDto.conteudo;
    if (sendMessageDto.templateId) {
      const template = await this.prisma.templateMensagem.findUnique({
        where: { id: sendMessageDto.templateId },
      });
      
      if (template) {
        conteudo = this.processTemplate(template.conteudo, {
          cliente: cliente,
          processo: sendMessageDto.processoId ? await this.prisma.processo.findUnique({
            where: { id: sendMessageDto.processoId },
          }) : null,
        });
      }
    }

    const mensagem = await this.prisma.mensagemCliente.create({
      data: {
        ...sendMessageDto,
        conteudo,
        enviadaEm: new Date(),
        status: 'ENVIADA',
      },
      include: {
        cliente: { select: { id: true, nome: true } },
        processo: { select: { id: true, numeroCnj: true } },
        remetente: { select: { id: true, nome: true } },
      },
    });

    // Enviar mensagem real (email, WhatsApp, SMS)
    await this.deliverMessage(mensagem);

    return mensagem;
  }

  async sendAutomaticMessage(clienteId: string, tipo: string, processoId?: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
      include: {
        processos: processoId ? {
          where: { processoId },
          include: { processo: true },
        } : undefined,
      },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    // Buscar template automático
    const template = await this.prisma.templateMensagem.findFirst({
      where: {
        tipo: tipo as any,
        ativo: true,
      },
    });

    if (!template) {
      return null; // Sem template configurado
    }

    const processoSelecionado = processoId ? (cliente as any).processos?.[0]?.processo : null;

    const conteudo = this.processTemplate(template.conteudo, {
      cliente,
      processo: processoSelecionado,
    });

    const mensagem = await this.prisma.mensagemCliente.create({
      data: {
        workspaceId: cliente.workspaceId,
        clienteId,
        processoId,
        tipo: template.tipo,
        canal: template.tipo === 'WHATSAPP' ? 'WHATSAPP' : template.tipo === 'EMAIL' ? 'EMAIL' : 'SISTEMA',
        assunto: template.assunto,
        conteudo,
        automatica: true,
        geradaPorIA: false,
        enviadaEm: new Date(),
        status: 'ENVIADA',
      },
    });

    await this.deliverMessage(mensagem);

    return mensagem;
  }

  async findAllMessages(params?: {
    skip?: number;
    take?: number;
    clienteId?: string;
    processoId?: string;
    tipo?: string;
    automatica?: boolean;
  }) {
    const { skip = 0, take = 50, ...filters } = params || {};

    const where: any = {};

    if (filters.clienteId) where.clienteId = filters.clienteId;
    if (filters.processoId) where.processoId = filters.processoId;
    if (filters.tipo) where.tipo = filters.tipo;
    if (filters.automatica !== undefined) where.automatica = filters.automatica;

    const [data, total] = await Promise.all([
      this.prisma.mensagemCliente.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          cliente: { select: { id: true, nome: true } },
          processo: { select: { id: true, numeroCnj: true } },
          remetente: { select: { id: true, nome: true } },
        },
      }),
      this.prisma.mensagemCliente.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async getClientHistory(clienteId: string) {
    return this.prisma.mensagemCliente.findMany({
      where: { clienteId },
      orderBy: { createdAt: 'desc' },
      include: {
        processo: { select: { id: true, numeroCnj: true } },
        remetente: { select: { id: true, nome: true } },
        respostas: true,
      },
    });
  }

  async createTemplate(createTemplateDto: CreateTemplateDto) {
    return this.prisma.templateMensagem.create({
      data: createTemplateDto,
    });
  }

  async findAllTemplates(workspaceId?: string, tipo?: string) {
    const where: any = {};

    if (workspaceId) where.workspaceId = workspaceId;
    if (tipo) where.tipo = tipo;
    where.ativo = true;

    return this.prisma.templateMensagem.findMany({
      where,
      orderBy: { nome: 'asc' },
    });
  }

  private processTemplate(template: string, context: any): string {
    let processed = template;

    // Substituir variáveis do cliente
    if (context.cliente) {
      processed = processed.replace(/\{\{cliente\.nome\}\}/g, context.cliente.nome || '');
      processed = processed.replace(/\{\{cliente\.email\}\}/g, context.cliente.email || '');
      processed = processed.replace(/\{\{cliente\.telefone\}\}/g, context.cliente.telefone || '');
    }

    // Substituir variáveis do processo
    if (context.processo) {
      processed = processed.replace(/\{\{processo\.numero\}\}/g, context.processo.numeroCnj || '');
      processed = processed.replace(/\{\{processo\.tipoAcao\}\}/g, context.processo.tipoAcao || '');
    }

    return processed;
  }

  private async deliverMessage(mensagem: any) {
    // TODO: Implementar envio real
    // - Email: usar nodemailer ou SendGrid
    // - WhatsApp: usar API do WhatsApp Business
    // - SMS: usar Twilio ou similar

    // Por enquanto, apenas criar notificação
    if (mensagem.clienteId) {
      await this.prisma.notificacao.create({
        data: {
          workspaceId: mensagem.workspaceId,
          usuarioId: mensagem.remetenteId || '',
          titulo: 'Mensagem enviada',
          mensagem: `Mensagem ${mensagem.tipo} enviada para ${mensagem.clienteId}`,
          tipo: 'COMUNICACAO',
          link: `/clients/${mensagem.clienteId}`,
        },
      });
    }
  }
}

