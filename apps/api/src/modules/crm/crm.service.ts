import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class CrmService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async createLead(createLeadDto: CreateLeadDto) {
    // IA classifica área de interesse se não informada
    let areaInteresse = createLeadDto.areaInteresse;
    
    if (!areaInteresse && createLeadDto.assunto) {
      const classificacao = await this.aiService.classifyAction(createLeadDto.assunto);
      areaInteresse = classificacao.area as any;
    }

    return this.prisma.leadCRM.create({
      data: {
        ...createLeadDto,
        areaInteresse,
      },
      include: {
        responsavel: { select: { id: true, nome: true } },
        cliente: { select: { id: true, nome: true } },
        _count: { select: { interacoes: true, tarefas: true, documentos: true } },
      },
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    workspaceId?: string;
    status?: string;
    origem?: string;
    responsavelId?: string;
  }) {
    const { skip = 0, take = 50, ...filters } = params || {};

    const where: any = {};

    if (filters.workspaceId) where.workspaceId = filters.workspaceId;
    if (filters.status) where.status = filters.status;
    if (filters.origem) where.origem = filters.origem;
    if (filters.responsavelId) where.responsavelId = filters.responsavelId;

    const [data, total] = await Promise.all([
      this.prisma.leadCRM.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          responsavel: { select: { id: true, nome: true } },
          cliente: { select: { id: true, nome: true } },
          _count: { select: { interacoes: true, tarefas: true } },
        },
      }),
      this.prisma.leadCRM.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async getFunnel(workspaceId?: string) {
    const where = workspaceId ? { workspaceId } : {};

    const [leads, prospeccao, reuniao, proposta, negociacao, contratado, perdido] = await Promise.all([
      this.prisma.leadCRM.count({ where: { ...where, status: 'LEAD' } }),
      this.prisma.leadCRM.count({ where: { ...where, status: 'PROSPECCAO' } }),
      this.prisma.leadCRM.count({ where: { ...where, status: 'REUNIAO_AGENDADA' } }),
      this.prisma.leadCRM.count({ where: { ...where, status: 'PROPOSTA_ENVIADA' } }),
      this.prisma.leadCRM.count({ where: { ...where, status: 'NEGOCIACAO' } }),
      this.prisma.leadCRM.count({ where: { ...where, status: 'CONTRATADO' } }),
      this.prisma.leadCRM.count({ where: { ...where, status: 'PERDIDO' } }),
    ]);

    return {
      lead: leads,
      prospeccao,
      reuniao,
      proposta,
      negociacao,
      contratado,
      perdido,
      total: leads + prospeccao + reuniao + proposta + negociacao + contratado + perdido,
    };
  }

  async findOne(id: string) {
    const lead = await this.prisma.leadCRM.findUnique({
      where: { id },
      include: {
        responsavel: true,
        cliente: true,
        interacoes: { 
          orderBy: { data: 'desc' },
          include: { usuario: { select: { id: true, nome: true } } },
        },
        tarefas: { 
          orderBy: { createdAt: 'desc' },
          include: { responsavel: { select: { id: true, nome: true } } },
        },
        documentos: { include: { documento: true } },
      },
    });

    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }

    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    return this.prisma.leadCRM.update({
      where: { id },
      data: updateLeadDto,
      include: {
        responsavel: { select: { id: true, nome: true } },
        cliente: { select: { id: true, nome: true } },
      },
    });
  }

  async addInteraction(leadId: string, data: {
    tipo: string;
    descricao: string;
    resultado?: string;
    usuarioId?: string;
    duracaoMinutos?: number;
    anotacoes?: string;
    proximaAcao?: string;
    proximaData?: Date;
  }) {
    return this.prisma.interacaoCRM.create({
      data: {
        leadId,
        ...data,
        tipo: data.tipo as any,
        data: new Date(),
      },
      include: {
        usuario: { select: { id: true, nome: true } },
      },
    });
  }

  async convertToClient(leadId: string, clienteData: any) {
    // Criar cliente
    const cliente = await this.prisma.cliente.create({
      data: clienteData,
    });

    // Atualizar lead
    const lead = await this.prisma.leadCRM.update({
      where: { id: leadId },
      data: {
        convertidoEmCliente: true,
        clienteId: cliente.id,
        status: 'CONTRATADO',
      },
    });

    return { lead, cliente };
  }

  async remove(id: string) {
    await this.prisma.interacaoCRM.deleteMany({ where: { leadId: id } });
    await this.prisma.tarefaCRM.deleteMany({ where: { leadId: id } });
    await this.prisma.documentoCRM.deleteMany({ where: { leadId: id } });
    
    return this.prisma.leadCRM.delete({ where: { id } });
  }
}

