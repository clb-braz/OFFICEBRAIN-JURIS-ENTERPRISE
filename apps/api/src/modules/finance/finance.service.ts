import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async createHonorario(data: any) {
    return this.prisma.honorario.create({ data });
  }

  async findAllHonorarios(params?: { skip?: number; take?: number; clienteId?: string; status?: string }) {
    const { skip = 0, take = 50, clienteId, status } = params || {};
    const where: any = {};
    if (clienteId) where.clienteId = clienteId;
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.honorario.findMany({
        where, skip, take,
        include: { cliente: true, processo: true, advogado: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.honorario.count({ where }),
    ]);
    return { data, total };
  }

  async createMovimentacao(data: any) {
    return this.prisma.movimentacaoFinanceira.create({ data });
  }

  async findAllMovimentacoes(params?: { skip?: number; take?: number; tipo?: string }) {
    const { skip = 0, take = 50, tipo } = params || {};
    const where: any = tipo ? { tipo } : {};

    const [data, total] = await Promise.all([
      this.prisma.movimentacaoFinanceira.findMany({
        where, skip, take,
        include: { cliente: true, processo: true },
        orderBy: { data: 'desc' },
      }),
      this.prisma.movimentacaoFinanceira.count({ where }),
    ]);
    return { data, total };
  }

  async getDashboard() {
    const [honorariosPendentes, honorariosPagos, receitas, despesas] = await Promise.all([
      this.prisma.honorario.aggregate({ where: { status: 'PENDENTE' }, _sum: { valor: true } }),
      this.prisma.honorario.aggregate({ where: { status: 'PAGO' }, _sum: { valorPago: true } }),
      this.prisma.movimentacaoFinanceira.aggregate({ where: { tipo: 'RECEITA', status: 'CONFIRMADO' }, _sum: { valor: true } }),
      this.prisma.movimentacaoFinanceira.aggregate({ where: { tipo: 'DESPESA', status: 'CONFIRMADO' }, _sum: { valor: true } }),
    ]);

    return {
      honorariosPendentes: honorariosPendentes._sum.valor || 0,
      honorariosPagos: honorariosPagos._sum.valorPago || 0,
      receitas: receitas._sum.valor || 0,
      despesas: despesas._sum.valor || 0,
      saldo: (Number(receitas._sum.valor) || 0) - (Number(despesas._sum.valor) || 0),
    };
  }
}
