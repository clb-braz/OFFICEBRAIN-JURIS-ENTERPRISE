import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OcrService } from '../ocr/ocr.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private ocrService: OcrService,
  ) {}

  async create(file: Express.Multer.File, data: {
    nome: string;
    tipo: string;
    descricao?: string;
    processoId?: string;
    clienteId?: string;
    workspaceId?: string;
    uploadPorId?: string;
  }) {
    // Salvar arquivo
    const uploadDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, file.buffer);

    // Processar OCR se for PDF ou imagem
    let textoCompleto: string | null = null;
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      try {
        const ocrResult = await this.ocrService.processDocument(file);
        textoCompleto = ocrResult.text;
      } catch (error) {
        console.warn('OCR falhou, continuando sem texto extraído:', error.message);
      }
    }

    // Criar documento no banco
    const documento = await this.prisma.documento.create({
      data: {
        nome: data.nome,
        tipo: data.tipo as any,
        descricao: data.descricao,
        arquivoUrl: `/uploads/${fileName}`,
        arquivoPath: filePath,
        tamanhoBytes: file.size,
        mimeType: file.mimetype,
        processoId: data.processoId,
        clienteId: data.clienteId,
        workspaceId: data.workspaceId,
        uploadPorId: data.uploadPorId,
        textoCompleto,
      },
    });

    return documento;
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    processoId?: string;
    clienteId?: string;
    workspaceId?: string;
    tipo?: string;
    search?: string;
  }) {
    const { skip = 0, take = 50, ...filters } = params || {};

    const where: any = {};
    if (filters.processoId) where.processoId = filters.processoId;
    if (filters.clienteId) where.clienteId = filters.clienteId;
    if (filters.workspaceId) where.workspaceId = filters.workspaceId;
    if (filters.tipo) where.tipo = filters.tipo;
    if (filters.search) {
      where.OR = [
        { nome: { contains: filters.search, mode: 'insensitive' } },
        { descricao: { contains: filters.search, mode: 'insensitive' } },
        { textoCompleto: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.documento.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          processo: { select: { id: true, numeroCnj: true } },
          cliente: { select: { id: true, nome: true } },
          uploadPor: { select: { id: true, nome: true } },
        },
      }),
      this.prisma.documento.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  async findOne(id: string) {
    const documento = await this.prisma.documento.findUnique({
      where: { id },
      include: {
        processo: true,
        cliente: true,
        uploadPor: true,
        versoes: { orderBy: { versao: 'desc' } },
      },
    });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado');
    }

    return documento;
  }

  async update(id: string, data: {
    nome?: string;
    descricao?: string;
    tipo?: string;
  }) {
    return this.prisma.documento.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const documento = await this.prisma.documento.findUnique({
      where: { id },
    });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado');
    }

    // Remover arquivo físico
    if (documento.arquivoPath) {
      try {
        await fs.unlink(documento.arquivoPath);
      } catch (error) {
        console.warn('Erro ao remover arquivo físico:', error.message);
      }
    }

    // Remover do banco
    return this.prisma.documento.delete({
      where: { id },
    });
  }

  async reprocessOcr(id: string) {
    const documento = await this.prisma.documento.findUnique({
      where: { id },
    });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado');
    }

    if (!documento.arquivoPath) {
      throw new BadRequestException('Arquivo físico não encontrado');
    }

    // Ler arquivo
    const fileBuffer = await fs.readFile(documento.arquivoPath);
    const file: Express.Multer.File = {
      buffer: fileBuffer,
      originalname: documento.nome,
      mimetype: documento.mimeType || 'application/pdf',
      size: documento.tamanhoBytes || 0,
      fieldname: 'file',
      encoding: '7bit',
      destination: '',
      filename: documento.nome,
      path: documento.arquivoPath,
    } as Express.Multer.File;

    // Processar OCR
    const ocrResult = await this.ocrService.processDocument(file);

    // Atualizar documento
    return this.prisma.documento.update({
      where: { id },
      data: {
        textoCompleto: ocrResult.text,
      },
    });
  }
}
