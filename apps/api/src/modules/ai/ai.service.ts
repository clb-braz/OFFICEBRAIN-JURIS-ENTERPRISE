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
}

