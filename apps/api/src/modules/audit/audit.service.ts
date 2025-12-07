import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: { usuarioId?: string; acao: string; entidade: string; entidadeId?: string; dadosAntigos?: any; dadosNovos?: any; ip?: string; userAgent?: string }) {
    return this.prisma.logAuditoria.create({ data });
  }

  async findAll(params: { skip?: number; take?: number; usuarioId?: string; entidade?: string; acao?: string }) {
    const { skip = 0, take = 50, usuarioId, entidade, acao } = params;
    const where: any = {};
    if (usuarioId) where.usuarioId = usuarioId;
    if (entidade) where.entidade = entidade;
    if (acao) where.acao = acao;
    return this.prisma.logAuditoria.findMany({ where, skip, take, include: { usuario: { select: { id: true, nome: true, email: true } } }, orderBy: { createdAt: 'desc' } });
  }

  async getLogsIA(params: { skip?: number; take?: number }) {
    const { skip = 0, take = 50 } = params;
    return this.prisma.logIA.findMany({ skip, take, orderBy: { createdAt: 'desc' } });
  }
}

