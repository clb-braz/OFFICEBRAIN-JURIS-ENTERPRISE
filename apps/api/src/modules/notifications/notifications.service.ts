import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(usuarioId: string, data: {
    workspaceId?: string;
    titulo: string;
    mensagem: string;
    tipo: string;
    link?: string;
  }) {
    return this.prisma.notificacao.create({
      data: {
        ...data,
        usuarioId,
      },
    });
  }

  async findAll(usuarioId: string, params?: {
    skip?: number;
    take?: number;
    lida?: boolean;
  }) {
    const { skip = 0, take = 50, lida } = params || {};

    const where: any = { usuarioId };
    if (lida !== undefined) where.lida = lida;

    const [data, total] = await Promise.all([
      this.prisma.notificacao.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notificacao.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async markAsRead(id: string, usuarioId: string) {
    return this.prisma.notificacao.updateMany({
      where: { id, usuarioId },
      data: { lida: true },
    });
  }

  async markAllAsRead(usuarioId: string) {
    return this.prisma.notificacao.updateMany({
      where: { usuarioId, lida: false },
      data: { lida: true },
    });
  }

  async getUnreadCount(usuarioId: string) {
    return this.prisma.notificacao.count({
      where: {
        usuarioId,
        lida: false,
      },
    });
  }

  async delete(id: string, usuarioId: string) {
    return this.prisma.notificacao.deleteMany({
      where: { id, usuarioId },
    });
  }
}

