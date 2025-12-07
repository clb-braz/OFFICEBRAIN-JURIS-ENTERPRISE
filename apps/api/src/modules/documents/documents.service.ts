import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    nome: string;
    tipo?: string;
    descricao?: string;
    arquivoUrl: string;
    arquivoPath?: string;
    tamanhoBytes?: number;
    mimeType?: string;
    processoId?: string;
    clienteId?: string;
    uploadPorId?: string;
  }) {
    return this.prisma.documento.create({
      data: {
        nome: data.nome,
        tipo: (data.tipo as any) || 'OUTROS',
        descricao: data.descricao,
        arquivoUrl: data.arquivoUrl,
        arquivoPath: data.arquivoPath,
        tamanhoBytes: data.tamanhoBytes,
        mimeType: data.mimeType,
        processoId: data.processoId,
        clienteId: data.clienteId,
        uploadPorId: data.uploadPorId,
      },
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    search?: string;
    tipo?: string;
    processoId?: string;
    clienteId?: string;
  }) {
    const { skip = 0, take = 50, search, tipo, processoId, clienteId } = params || {};

    const where: any = {};
    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { descricao: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (tipo) where.tipo = tipo;
    if (processoId) where.processoId = processoId;
    if (clienteId) where.clienteId = clienteId;

    const [data, total] = await Promise.all([
      this.prisma.documento.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          processo: { select: { id: true, numeroCnj: true, tipoAcao: true } },
          cliente: { select: { id: true, nome: true } },
          uploadPor: { select: { id: true, nome: true } },
        },
      }),
      this.prisma.documento.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async findOne(id: string) {
    return this.prisma.documento.findUnique({
      where: { id },
      include: {
        processo: true,
        cliente: true,
        uploadPor: true,
        versoes: { orderBy: { versao: 'desc' } },
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.documento.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const doc = await this.prisma.documento.findUnique({ where: { id } });
    
    if (doc?.arquivoPath) {
      try {
        await unlink(join(process.cwd(), 'uploads', doc.arquivoPath));
      } catch (err) {
        console.error('Erro ao deletar arquivo:', err);
      }
    }

    return this.prisma.documento.delete({ where: { id } });
  }
}
