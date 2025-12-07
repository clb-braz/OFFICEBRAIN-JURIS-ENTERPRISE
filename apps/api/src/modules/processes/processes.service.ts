import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProcessesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { clienteId, partes, ...processoData } = data;
    
    return this.prisma.processo.create({
      data: {
        ...processoData,
        clientes: clienteId ? {
          create: { clienteId, participacao: 'AUTOR', principal: true },
        } : undefined,
        partes: partes?.length ? {
          createMany: { data: partes },
        } : undefined,
      },
      include: {
        clientes: { include: { cliente: true } },
        partes: true,
      },
    });
  }

  async findAll(params?: { skip?: number; take?: number; search?: string; status?: string; area?: string }) {
    const { skip = 0, take = 50, search, status, area } = params || {};
    
    const where: any = {};
    if (search) {
      where.OR = [
        { numeroCnj: { contains: search } },
        { tipoAcao: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) where.status = status;
    if (area) where.area = area;

    const [data, total] = await Promise.all([
      this.prisma.processo.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          clientes: { include: { cliente: { select: { id: true, nome: true } } } },
          advogadoResponsavel: { select: { id: true, nome: true } },
          _count: { select: { audiencias: true, prazos: true, documentos: true } },
        },
      }),
      this.prisma.processo.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async findOne(id: string) {
    return this.prisma.processo.findUnique({
      where: { id },
      include: {
        clientes: { include: { cliente: true } },
        partes: true,
        equipe: { include: { usuario: true } },
        audiencias: { orderBy: { data: 'asc' } },
        prazos: { orderBy: { dataLimite: 'asc' } },
        documentos: { orderBy: { createdAt: 'desc' } },
        andamentos: { orderBy: { data: 'desc' }, take: 20 },
        advogadoResponsavel: true,
        honorarios: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.processo.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.processo.delete({ where: { id } });
  }

  async addAudiencia(processoId: string, data: any) {
    return this.prisma.audiencia.create({
      data: { ...data, processoId },
    });
  }

  async addPrazo(processoId: string, data: any) {
    return this.prisma.prazo.create({
      data: { ...data, processoId },
    });
  }

  async addAndamento(processoId: string, data: any) {
    return this.prisma.andamentoProcessual.create({
      data: { ...data, processoId, data: new Date() },
    });
  }
}
