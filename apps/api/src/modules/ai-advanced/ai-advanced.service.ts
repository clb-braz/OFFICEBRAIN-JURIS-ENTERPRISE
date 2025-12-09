import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { LegislationService } from '../legislation/legislation.service';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateAnaliseDto } from './dto/create-analise.dto';

@Injectable()
export class AiAdvancedService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
    private legislationService: LegislationService,
  ) {}

  async createConversation(createConversaDto: CreateConversaDto) {
    return this.prisma.conversaIA.create({
      data: createConversaDto,
      include: {
        usuario: { select: { id: true, nome: true } },
        processo: { select: { id: true, numeroCnj: true } },
      },
    });
  }

  async sendMessage(conversaId: string, sendMessageDto: SendMessageDto) {
    const conversa = await this.prisma.conversaIA.findUnique({
      where: { id: conversaId },
      include: { processo: true },
    });

    if (!conversa) {
      throw new NotFoundException('Conversa não encontrada');
    }

    // Salvar mensagem do usuário
    const userMessage = await this.prisma.mensagemIA.create({
      data: {
        conversaId,
        role: 'user',
        conteudo: sendMessageDto.mensagem,
      },
    });

    // Buscar contexto relevante (legislação, jurisprudência)
    const contexto = await this.buildContext(sendMessageDto.mensagem, conversa.processoId);

    // Gerar resposta da IA
    const resposta = await this.aiService.chat(
      sendMessageDto.mensagem,
      contexto,
    );
    const tokens = (resposta as any)?.tokens;

    // Extrair artigos e jurisprudências citados
    const artigosCitados = await this.extractArticleReferences(resposta.response);
    const jurisprudenciasCitadas = await this.extractJurisprudenceReferences(resposta.response);

    // Salvar resposta da IA
    const aiMessage = await this.prisma.mensagemIA.create({
      data: {
        conversaId,
        role: 'assistant',
        conteudo: resposta.response,
        tokens: tokens ?? undefined,
        artigosCitados,
        jurisprudenciasCitadas,
        modelo: 'gpt-4o',
        temperatura: 0.3,
      },
    });

    // Atualizar conversa
    await this.prisma.conversaIA.update({
      where: { id: conversaId },
      data: { updatedAt: new Date() },
    });

    return {
      userMessage,
      aiMessage,
    };
  }

  async findAllConversations(usuarioId?: string, processoId?: string) {
    const where: any = {};

    if (usuarioId) where.usuarioId = usuarioId;
    if (processoId) where.processoId = processoId;
    where.ativa = true;

    return this.prisma.conversaIA.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        usuario: { select: { id: true, nome: true } },
        processo: { select: { id: true, numeroCnj: true } },
        _count: { select: { mensagens: true } },
      },
    });
  }

  async findOneConversation(id: string) {
    const conversa = await this.prisma.conversaIA.findUnique({
      where: { id },
      include: {
        usuario: { select: { id: true, nome: true } },
        processo: true,
        mensagens: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!conversa) {
      throw new NotFoundException('Conversa não encontrada');
    }

    return conversa;
  }

  async createAnalise(createAnaliseDto: CreateAnaliseDto) {
    let resultado: any = {};
    let sugestoes: string[] = [];
    let alertas: string[] = [];

    switch (createAnaliseDto.tipo) {
      case 'ANALISE_PROCESSO':
        if (createAnaliseDto.processoId) {
          const processo = await this.prisma.processo.findUnique({
            where: { id: createAnaliseDto.processoId },
            include: {
              andamentos: true,
              documentos: true,
              prazos: true,
            },
          });

          if (!processo) {
            throw new NotFoundException('Processo não encontrado');
          }

          resultado = await this.analyzeProcess(processo);
          sugestoes = resultado.sugestoes || [];
          alertas = resultado.alertas || [];
        }
        break;

      case 'IDENTIFICACAO_PRAZO':
        if (createAnaliseDto.documentoId) {
          const documento = await this.prisma.documento.findUnique({
            where: { id: createAnaliseDto.documentoId },
          });

          if (!documento) {
            throw new NotFoundException('Documento não encontrado');
          }

          resultado = await this.identifyDeadlinesInDocument(documento);
        }
        break;

      case 'LEITURA_DECISAO':
        if (createAnaliseDto.documentoId) {
          const documento = await this.prisma.documento.findUnique({
            where: { id: createAnaliseDto.documentoId },
          });

          if (!documento) {
            throw new NotFoundException('Documento não encontrado');
          }

          resultado = await this.readDecision(documento);
        }
        break;

      default:
        resultado = { mensagem: 'Tipo de análise não implementado' };
    }

    return this.prisma.analiseIA.create({
      data: {
        ...createAnaliseDto,
        resultado,
        sugestoes,
        alertas,
        confianca: resultado.confianca || 0.8,
      },
      include: {
        processo: { select: { id: true, numeroCnj: true } },
        documento: { select: { id: true, nome: true } },
        usuario: { select: { id: true, nome: true } },
      },
    });
  }

  async findAllAnalises(params?: {
    skip?: number;
    take?: number;
    tipo?: string;
    processoId?: string;
  }) {
    const { skip = 0, take = 50, ...filters } = params || {};

    const where: any = {};

    if (filters.tipo) where.tipo = filters.tipo;
    if (filters.processoId) where.processoId = filters.processoId;

    const [data, total] = await Promise.all([
      this.prisma.analiseIA.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          processo: { select: { id: true, numeroCnj: true } },
          documento: { select: { id: true, nome: true } },
        },
      }),
      this.prisma.analiseIA.count({ where }),
    ]);

    return { data, total, skip, take };
  }

  private async buildContext(mensagem: string, processoId?: string | null): Promise<string> {
    let contexto = '';

    // Adicionar contexto do processo se disponível
    if (processoId) {
      const processo = await this.prisma.processo.findUnique({
        where: { id: processoId },
        select: {
          numeroCnj: true,
          area: true,
          fase: true,
          referenciasJuridicas: {
            include: { artigo: { include: { legislacao: true } } },
            take: 5,
          },
        },
      });

      if (processo) {
        contexto += `Processo: ${processo.numeroCnj}\n`;
        contexto += `Área: ${processo.area}\n`;
        contexto += `Fase: ${processo.fase}\n`;
        
        if (processo.referenciasJuridicas && processo.referenciasJuridicas.length > 0) {
          contexto += '\nArtigos relacionados:\n';
          for (const ref of processo.referenciasJuridicas) {
            contexto += `- ${ref.artigo.legislacao.codigo}, Art. ${ref.artigo.numeroArtigo}\n`;
          }
        }
      }
    }

    // Buscar artigos relevantes na legislação
    const artigosRelevantes = await this.legislationService.findArticlesByKeywords(
      this.extractKeywords(mensagem),
    );

    if (artigosRelevantes.length > 0) {
      contexto += '\nLegislação relevante:\n';
      for (const artigo of artigosRelevantes.slice(0, 3)) {
        contexto += `- ${artigo.legislacao.codigo}, Art. ${artigo.numeroArtigo}: ${artigo.caput || artigo.texto.substring(0, 100)}\n`;
      }
    }

    return contexto;
  }

  private extractKeywords(texto: string): string[] {
    const palavras = texto.toLowerCase().split(/\s+/);
    const keywords = palavras.filter((p) => p.length > 4);
    return keywords.slice(0, 5);
  }

  private async extractArticleReferences(texto: string): Promise<string[]> {
    // Extrair referências a artigos (ex: "artigo 123 do CC", "art. 456 do CPC")
    const regex = /art(?:igo|\.)?\s*(\d+)/gi;
    const matches = texto.match(regex);
    return matches || [];
  }

  private async extractJurisprudenceReferences(texto: string): Promise<string[]> {
    // Extrair referências a jurisprudências
    const regex = /(?:STJ|STF|TST|TJ)\s*(?:n\.?\s*)?(\d+)/gi;
    const matches = texto.match(regex);
    return matches || [];
  }

  private async analyzeProcess(processo: any): Promise<any> {
    // Análise completa do processo
    const analise = await this.aiService.summarizeProcess(processo.id);

    return {
      resumo: analise.resumo,
      probabilidadeExito: processo.probabilidadeExito || 0.5,
      riscos: processo.riscosIdentificados || [],
      sugestoes: [
        'Revisar documentos pendentes',
        'Verificar prazos próximos',
        'Preparar estratégia de defesa',
      ],
      alertas: processo.prazos?.filter((p: any) => p.status === 'PENDENTE' && new Date(p.dataLimite) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) || [],
      confianca: 0.85,
    };
  }

  private async identifyDeadlinesInDocument(documento: any): Promise<any> {
    const prazos = await this.aiService.identifyDeadlines(
      documento.textoCompleto || '',
      documento.tipo,
    );

    return {
      prazosIdentificados: prazos.length,
      prazos,
      confianca: 0.8,
    };
  }

  private async readDecision(documento: any): Promise<any> {
    // Leitura e análise de decisão
    return {
      tipo: 'DECISAO',
      resumo: documento.resumoIA || 'Análise pendente',
      partes: documento.partesExtraidas || [],
      valores: documento.valoresExtraidos || [],
      datas: documento.datasExtraidas || [],
      confianca: 0.9,
    };
  }
}

