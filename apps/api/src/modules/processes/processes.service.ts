import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CNJValidator } from '../../common/utils/cnj-validator';
import { CreateProcessDto } from './dto/create-process.dto';

@Injectable()
export class ProcessesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProcessDto) {
    // Valida e formata CNJ
    if (!CNJValidator.validate(data.numeroCnj)) {
      throw new BadRequestException('Número CNJ inválido');
    }

    const numeroCnjFormatado = CNJValidator.format(data.numeroCnj);

    // Verifica se CNJ já existe
    const existing = await this.prisma.processo.findUnique({
      where: { numeroCnj: numeroCnjFormatado },
    });

    if (existing) {
      throw new BadRequestException('Processo com este CNJ já existe');
    }

    const { clienteId, partes, ...processoData } = data;
    
    return this.prisma.processo.create({
      data: {
        ...processoData,
        numeroCnj: numeroCnjFormatado,
        clientes: clienteId ? {
          create: { clienteId, participacao: 'AUTOR', principal: true },
        } : undefined,
        partes: partes?.length ? {
          createMany: { data: partes.map((parte) => ({ ...parte, tipo: parte.tipo as any })) },
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
    const processo = await this.prisma.processo.findUnique({
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

    if (!processo) {
      throw new NotFoundException('Processo não encontrado');
    }

    return processo;
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
