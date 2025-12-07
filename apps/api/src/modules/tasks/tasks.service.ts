import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.tarefa.create({
      data,
      include: { responsavel: true, processo: true, cliente: true },
    });
  }

  async findAll(params?: { status?: string; responsavelId?: string; processoId?: string }) {
    const where: any = {};
    if (params?.status) where.status = params.status;
    if (params?.responsavelId) where.responsavelId = params.responsavelId;
    if (params?.processoId) where.processoId = params.processoId;

    return this.prisma.tarefa.findMany({
      where,
      include: { responsavel: true, processo: true, cliente: true },
      orderBy: [{ prioridade: 'desc' }, { ordem: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    return this.prisma.tarefa.findUnique({
      where: { id },
      include: { checklist: true, comentarios: { include: { autor: true } }, responsavel: true, processo: true, cliente: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.tarefa.update({
      where: { id },
      data,
      include: { responsavel: true, processo: true, cliente: true },
    });
  }

  async remove(id: string) {
    return this.prisma.tarefa.delete({ where: { id } });
  }

  async getKanban() {
    const tarefas = await this.prisma.tarefa.findMany({
      include: { responsavel: true, processo: true, cliente: true },
      orderBy: [{ ordem: 'asc' }],
    });

    return {
      A_FAZER: tarefas.filter(t => t.status === 'A_FAZER'),
      EM_ANDAMENTO: tarefas.filter(t => t.status === 'EM_ANDAMENTO'),
      AGUARDANDO_CLIENTE: tarefas.filter(t => t.status === 'AGUARDANDO_CLIENTE'),
      CONCLUIDO: tarefas.filter(t => t.status === 'CONCLUIDO'),
    };
  }
}
