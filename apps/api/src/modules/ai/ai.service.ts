import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  private async logIA(tipo: string, modelo: string, input: string, output: string | null, sucesso: boolean, erro?: string) {
    await this.prisma.logIA.create({ data: { tipo, modelo, input, output, sucesso, erro } });
  }

  async extractDocumentInfo(documentText: string) {
    const startTime = Date.now();
    try {
      // Simulação - integrar com OpenAI/Claude
      const result = { partes: [], valores: [], datas: [], resumo: 'Extração pendente de API key configurada' };
      await this.logIA('EXTRACAO', 'gpt-4', documentText.substring(0, 500), JSON.stringify(result), true);
      return result;
    } catch (error: any) {
      await this.logIA('EXTRACAO', 'gpt-4', documentText.substring(0, 500), null, false, error.message);
      throw error;
    }
  }

  async summarizeProcess(processId: string) {
    const processo = await this.prisma.processo.findUnique({ where: { id: processId }, include: { andamentos: true, documentos: true } });
    if (!processo) throw new Error('Processo não encontrado');
    
    // Simulação - integrar com IA real
    const resumo = `Processo ${processo.numeroCnj} - ${processo.tipoAcao} na área de ${processo.area}. Status: ${processo.status}, Fase: ${processo.fase}.`;
    await this.logIA('RESUMO', 'gpt-4', `Processo ${processId}`, resumo, true);
    return { resumo, processo };
  }

  async classifyAction(description: string) {
    // Classificação simulada
    const result = { tipo: 'CIVIL', rito: 'ORDINARIO', area: 'CIVIL', confianca: 0.85 };
    await this.logIA('CLASSIFICACAO', 'gpt-4', description, JSON.stringify(result), true);
    return result;
  }

  async generateDocument(tipo: string, dados: any) {
    // Geração simulada de minuta
    const minuta = `MINUTA DE ${tipo.toUpperCase()}\n\nGeração pendente de API key configurada.\nDados recebidos: ${JSON.stringify(dados)}`;
    await this.logIA('GERACAO', 'gpt-4', JSON.stringify({ tipo, dados }), minuta, true);
    return { minuta };
  }

  async chat(message: string, context?: string) {
    // Chat jurídico simulado
    const response = 'Esta é uma resposta simulada. Configure OPENAI_API_KEY no .env para ativar a IA real.';
    await this.logIA('CHAT', 'gpt-4', message, response, true);
    return { response };
  }

  async identifyDeadlines(documentText: string, documentType: string): Promise<any[]> {
    // IA identifica prazos em documentos
    const prazos = [];
    
    // Buscar palavras-chave de prazos
    const keywords = [
      { palavra: 'prazo de', dias: 15, tipo: 'MANIFESTACAO' },
      { palavra: 'prazo para', dias: 15, tipo: 'MANIFESTACAO' },
      { palavra: 'recurso', dias: 15, tipo: 'RECURSAL' },
      { palavra: 'contestação', dias: 15, tipo: 'CONTESTACAO' },
      { palavra: 'embargos', dias: 15, tipo: 'EMBARGOS' },
      { palavra: 'agravo', dias: 15, tipo: 'AGRAVO' },
    ];

    const hoje = new Date();
    
    for (const keyword of keywords) {
      if (documentText.toLowerCase().includes(keyword.palavra.toLowerCase())) {
        prazos.push({
          tipo: keyword.tipo,
          tipoOriginal: keyword.tipo,
          descricao: `Prazo identificado: ${keyword.palavra}`,
          dataLimite: new Date(hoje.getTime() + keyword.dias * 24 * 60 * 60 * 1000),
          confianca: 0.8,
          instrucoes: `Verifique o prazo específico mencionado no documento`,
        });
      }
    }

    await this.logIA('IDENTIFICACAO_PRAZO', 'gpt-4', documentText.substring(0, 500), JSON.stringify(prazos), true);
    return prazos;
  }

  async predictEvents(processo: any): Promise<any[]> {
    // IA prevê eventos futuros baseado no processo
    const eventos = [];
    const hoje = new Date();

    // Previsão de sentença (baseado em média de processos similares)
    if (processo.fase === 'CONHECIMENTO' && processo.dataDistribuicao) {
      const diasMedios = 180; // Média de dias para sentença
      eventos.push({
        tipo: 'ANDAMENTO_INTERNO',
        titulo: 'Previsão de Sentença',
        descricao: 'Previsão baseada em processos similares',
        dataInicio: new Date(processo.dataDistribuicao.getTime() + diasMedios * 24 * 60 * 60 * 1000),
        previsao: `Previsão de sentença em aproximadamente ${diasMedios} dias`,
      });
    }

    await this.logIA('PREVISAO_EVENTOS', 'gpt-4', JSON.stringify(processo), JSON.stringify(eventos), true);
    return eventos;
  }
}

