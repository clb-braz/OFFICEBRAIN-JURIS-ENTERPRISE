import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [
      totalClientes,
      totalProcessos,
      processosAtivos,
      totalHonorarios,
      honorariosPendentes,
      prazosProximos,
      audienciasProximas,
    ] = await Promise.all([
      this.prisma.cliente.count({ where: { ativo: true } }),
      this.prisma.processo.count(),
      this.prisma.processo.count({ where: { status: 'ATIVO' } }),
      this.prisma.honorario.aggregate({ _sum: { valor: true } }),
      this.prisma.honorario.aggregate({ where: { status: 'PENDENTE' }, _sum: { valor: true } }),
      this.prisma.prazo.count({
        where: {
          status: 'PENDENTE',
          dataLimite: { gte: new Date(), lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      this.prisma.audiencia.count({
        where: {
          status: 'AGENDADA',
          data: { gte: new Date(), lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    return {
      clientes: { total: totalClientes },
      processos: { total: totalProcessos, ativos: processosAtivos },
      financeiro: {
        totalHonorarios: totalHonorarios._sum.valor || 0,
        honorariosPendentes: honorariosPendentes._sum.valor || 0,
      },
      prazos: { proximos: prazosProximos },
      audiencias: { proximas: audienciasProximas },
    };
  }

  async getRecentProcesses() {
    return this.prisma.processo.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        clientes: { include: { cliente: { select: { nome: true } } } },
        advogadoResponsavel: { select: { nome: true } },
      },
    });
  }

  async getUpcomingDeadlines() {
    return this.prisma.prazo.findMany({
      where: {
        status: 'PENDENTE',
        dataLimite: { gte: new Date() },
      },
      take: 5,
      orderBy: { dataLimite: 'asc' },
      include: {
        processo: { select: { numeroCnj: true, tipoAcao: true } },
        responsavel: { select: { nome: true } },
      },
    });
  }

  async getUpcomingAudiencias() {
    return this.prisma.audiencia.findMany({
      where: {
        status: 'AGENDADA',
        data: { gte: new Date() },
      },
      take: 5,
      orderBy: { data: 'asc' },
      include: {
        processo: { select: { numeroCnj: true, tipoAcao: true } },
      },
    });
  }
}

