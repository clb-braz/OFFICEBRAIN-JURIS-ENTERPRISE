import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.cliente.create({
      data: {
        tipo: data.tipo,
        nome: data.nome,
        razaoSocial: data.razaoSocial,
        cpfCnpj: data.cpfCnpj,
        rg: data.rg,
        email: data.email,
        telefone: data.telefone,
        celular: data.celular,
        observacoes: data.observacoes,
        tags: data.tags || [],
      },
    });
  }

  async findAll(params?: { skip?: number; take?: number; search?: string }) {
    const { skip = 0, take = 50, search } = params || {};
    
    const where = search ? {
      OR: [
        { nome: { contains: search, mode: 'insensitive' as const } },
        { cpfCnpj: { contains: search } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [data, total] = await Promise.all([
      this.prisma.cliente.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { enderecos: true, _count: { select: { processos: true } } },
      }),
      this.prisma.cliente.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async findOne(id: string) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: {
        enderecos: true,
        processos: { include: { processo: true } },
        honorarios: true,
        interacoes: { orderBy: { data: 'desc' }, take: 10 },
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.cliente.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.cliente.delete({ where: { id } });
  }

  async addEndereco(clienteId: string, data: any) {
    return this.prisma.endereco.create({
      data: { ...data, clienteId },
    });
  }
}
