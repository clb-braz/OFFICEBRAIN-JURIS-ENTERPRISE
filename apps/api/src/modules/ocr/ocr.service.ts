import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);
  private readonly ocrServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.ocrServiceUrl = this.configService.get<string>('OCR_SERVICE_URL') || 'http://ocr-service:8080';
  }

  async processDocument(file: Express.Multer.File): Promise<{
    text: string;
    pages: number;
    success: boolean;
  }> {
    try {
      this.logger.log(`Processando documento: ${file.originalname}`);

      // Enviar arquivo para serviço OCR
      const formData = new FormData();
      const blob = new Blob([file.buffer], { type: file.mimetype });
      formData.append('file', blob, file.originalname);

      const response = await firstValueFrom(
        this.httpService.post(`${this.ocrServiceUrl}/ocr`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 300000, // 5 minutos para documentos grandes
        }),
      );

      if (response.data.success) {
        this.logger.log(`OCR concluído: ${response.data.pages} página(s) processada(s)`);
        return {
          text: response.data.text,
          pages: response.data.pages,
          success: true,
        };
      } else {
        throw new BadRequestException(response.data.error || 'Erro no processamento OCR');
      }
    } catch (error) {
      this.logger.error(`Erro no OCR: ${error.message}`, error.stack);
      throw new BadRequestException(`Erro ao processar OCR: ${error.message}`);
    }
  }

  async processBatch(files: Express.Multer.File[]): Promise<{
    results: Array<{
      filename: string;
      text: string;
      success: boolean;
      error?: string;
    }>;
    total: number;
  }> {
    try {
      this.logger.log(`Processando lote de ${files.length} arquivo(s)`);

      const formData = new FormData();
      files.forEach((file) => {
        const blob = new Blob([file.buffer], { type: file.mimetype });
        formData.append('files', blob, file.originalname);
      });

      const response = await firstValueFrom(
        this.httpService.post(`${this.ocrServiceUrl}/ocr/batch`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 600000, // 10 minutos para lotes
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Erro no OCR batch: ${error.message}`, error.stack);
      throw new BadRequestException(`Erro ao processar OCR em lote: ${error.message}`);
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.ocrServiceUrl}/health`, { timeout: 5000 }),
      );
      return response.data.status === 'healthy';
    } catch (error) {
      this.logger.warn(`OCR service não está disponível: ${error.message}`);
      return false;
    }
  }
}

