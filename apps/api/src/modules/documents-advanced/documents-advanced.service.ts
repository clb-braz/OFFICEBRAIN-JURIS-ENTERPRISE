import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { CompareVersionsDto } from './dto/compare-versions.dto';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class DocumentsAdvancedService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async createVersion(documentoId: string, createVersionDto: CreateVersionDto) {
    const documento = await this.prisma.documento.findUnique({
      where: { id: documentoId },
    });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado');
    }

    // Buscar última versão ativa
    const ultimaVersao = await this.prisma.versaoDocumentoAvancada.findFirst({
      where: {
        documentoId,
        ativa: true,
      },
      orderBy: { versao: 'desc' },
    });

    const novaVersao = (ultimaVersao?.versao || 0) + 1;

    // Calcular hash do arquivo
    const arquivoPath = createVersionDto.arquivoPath || documento.arquivoUrl;
    let hashArquivo: string | null = null;
    let tamanhoBytes: number | null = null;

    try {
      if (arquivoPath && arquivoPath.startsWith('/')) {
        const fileBuffer = await fs.readFile(arquivoPath);
        hashArquivo = crypto.createHash('sha256').update(fileBuffer).digest('hex');
        tamanhoBytes = fileBuffer.length;
      }
    } catch (err) {
      // Arquivo não encontrado, continuar sem hash
    }

    // Desativar versão anterior
    if (ultimaVersao) {
      await this.prisma.versaoDocumentoAvancada.update({
        where: { id: ultimaVersao.id },
        data: { ativa: false },
      });
    }

    // Criar nova versão
    const versao = await this.prisma.versaoDocumentoAvancada.create({
      data: {
        documentoId,
        versao: novaVersao,
        versaoAnteriorId: ultimaVersao?.id,
        arquivoUrl: createVersionDto.arquivoUrl || documento.arquivoUrl,
        arquivoPath: createVersionDto.arquivoPath,
        hashArquivo,
        tamanhoBytes,
        mensagemCommit: createVersionDto.mensagemCommit || `Versão ${novaVersao}`,
        autorId: createVersionDto.autorId,
        tags: createVersionDto.tags || [],
        branch: createVersionDto.branch || 'main',
        ativa: true,
      },
      include: {
        autor: { select: { id: true, nome: true } },
        versaoAnterior: { select: { id: true, versao: true } },
      },
    });

    // Calcular diferenças se houver versão anterior
    if (ultimaVersao && documento.textoCompleto) {
      const diffTexto = await this.calculateTextDiff(
        ultimaVersao.arquivoUrl,
        versao.arquivoUrl,
      );
      
      if (diffTexto) {
        await this.prisma.versaoDocumentoAvancada.update({
          where: { id: versao.id },
          data: { diffTexto },
        });
      }
    }

    return versao;
  }

  async findAllVersions(documentoId: string) {
    return this.prisma.versaoDocumentoAvancada.findMany({
      where: { documentoId },
      orderBy: { versao: 'desc' },
      include: {
        autor: { select: { id: true, nome: true } },
        versaoAnterior: { select: { id: true, versao: true } },
        _count: { select: { versoesFilhas: true } },
      },
    });
  }

  async findOneVersion(id: string) {
    const versao = await this.prisma.versaoDocumentoAvancada.findUnique({
      where: { id },
      include: {
        documento: true,
        autor: { select: { id: true, nome: true, email: true } },
        versaoAnterior: {
          include: {
            autor: { select: { id: true, nome: true } },
          },
        },
        versoesFilhas: {
          include: {
            autor: { select: { id: true, nome: true } },
          },
        },
      },
    });

    if (!versao) {
      throw new NotFoundException('Versão não encontrada');
    }

    return versao;
  }

  async compareVersions(compareVersionsDto: CompareVersionsDto) {
    const { versao1Id, versao2Id } = compareVersionsDto;

    const [versao1, versao2] = await Promise.all([
      this.prisma.versaoDocumentoAvancada.findUnique({ where: { id: versao1Id } }),
      this.prisma.versaoDocumentoAvancada.findUnique({ where: { id: versao2Id } }),
    ]);

    if (!versao1 || !versao2) {
      throw new NotFoundException('Uma ou ambas as versões não foram encontradas');
    }

    if (versao1.documentoId !== versao2.documentoId) {
      throw new BadRequestException('As versões devem ser do mesmo documento');
    }

    // Calcular diferenças
    const diferencas = await this.calculateDifferences(versao1, versao2);

    // Verificar se já existe comparação
    const comparacaoExistente = await this.prisma.comparacaoDocumento.findUnique({
      where: {
        versao1Id_versao2Id: {
          versao1Id,
          versao2Id,
        },
      },
    });

    if (comparacaoExistente) {
      return this.prisma.comparacaoDocumento.update({
        where: { id: comparacaoExistente.id },
        data: {
          diferencas,
          resumo: this.generateSummary(diferencas),
        },
      });
    }

    return this.prisma.comparacaoDocumento.create({
      data: {
        versao1Id,
        versao2Id,
        diferencas,
        resumo: this.generateSummary(diferencas),
        criadoPorId: compareVersionsDto.criadoPorId,
      },
      include: {
        versao1: { select: { id: true, versao: true } },
        versao2: { select: { id: true, versao: true } },
        criadoPor: { select: { id: true, nome: true } },
      },
    });
  }

  async restoreVersion(versaoId: string) {
    const versao = await this.prisma.versaoDocumentoAvancada.findUnique({
      where: { id: versaoId },
      include: { documento: true },
    });

    if (!versao) {
      throw new NotFoundException('Versão não encontrada');
    }

    // Criar nova versão baseada na versão restaurada
    return this.createVersion(versao.documentoId, {
      arquivoUrl: versao.arquivoUrl,
      arquivoPath: versao.arquivoPath || undefined,
      mensagemCommit: `Restauração da versão ${versao.versao}`,
      tags: versao.tags,
      branch: versao.branch || undefined,
    });
  }

  async extractDataFromDocument(documentoId: string) {
    const documento = await this.prisma.documento.findUnique({
      where: { id: documentoId },
    });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado');
    }

    // Usar IA para extrair dados
    const extracted = await this.aiService.extractDocumentInfo(
      documento.textoCompleto || '',
    );

    // Atualizar documento com dados extraídos
    await this.prisma.documento.update({
      where: { id: documentoId },
      data: {
        partesExtraidas: extracted.partes || [],
        valoresExtraidos: extracted.valores || [],
        datasExtraidas: extracted.datas || [],
        resumoIA: extracted.resumo || documento.resumoIA,
      },
    });

    return extracted;
  }

  private async calculateTextDiff(arquivo1: string, arquivo2: string): Promise<string | null> {
    // Implementação simplificada - usar biblioteca de diff em produção
    try {
      // Por enquanto, retornar null (implementar com diff library)
      return null;
    } catch (err) {
      return null;
    }
  }

  private async calculateDifferences(versao1: any, versao2: any): Promise<any> {
    return {
      versao1: {
        versao: versao1.versao,
        tamanho: versao1.tamanhoBytes,
        hash: versao1.hashArquivo,
        data: versao1.createdAt,
      },
      versao2: {
        versao: versao2.versao,
        tamanho: versao2.tamanhoBytes,
        hash: versao2.hashArquivo,
        data: versao2.createdAt,
      },
      diferencaTamanho: (versao2.tamanhoBytes || 0) - (versao1.tamanhoBytes || 0),
      hashDiferente: versao1.hashArquivo !== versao2.hashArquivo,
      diffTexto: versao2.diffTexto || null,
    };
  }

  private generateSummary(diferencas: any): string {
    if (diferencas.hashDiferente) {
      return `Documento modificado. Diferença de tamanho: ${diferencas.diferencaTamanho} bytes`;
    }
    return 'Nenhuma diferença significativa detectada';
  }
}

