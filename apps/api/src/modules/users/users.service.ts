import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany({
      select: { id: true, email: true, nome: true, oab: true, perfil: true, ativo: true, createdAt: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, email: true, nome: true, oab: true, perfil: true, telefone: true, ativo: true, createdAt: true },
    });
  }

  async create(data: any) {
    return this.prisma.usuario.create({
      data: { ...data, senha: '$2b$12$default' },
      select: { id: true, email: true, nome: true, perfil: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.usuario.update({
      where: { id },
      data,
      select: { id: true, email: true, nome: true, perfil: true },
    });
  }
}

