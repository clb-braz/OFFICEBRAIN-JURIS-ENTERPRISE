import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { OcrService } from './ocr.service';

@ApiTags('OCR')
@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('process')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Processar documento com OCR' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Texto extraído com sucesso' })
  async processDocument(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    // Validar tipo de arquivo
    const allowedMimes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/bmp',
    ];

    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de arquivo não suportado: ${file.mimetype}. Tipos permitidos: PDF, PNG, JPG, JPEG, GIF, BMP`,
      );
    }

    return this.ocrService.processDocument(file);
  }

  @Post('process/batch')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({ summary: 'Processar múltiplos documentos com OCR' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Documentos processados com sucesso' })
  async processBatch(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    if (files.length > 10) {
      throw new BadRequestException('Máximo de 10 arquivos por lote');
    }

    return this.ocrService.processBatch(files);
  }

  @Get('health')
  @ApiOperation({ summary: 'Verificar saúde do serviço OCR' })
  async checkHealth() {
    const isHealthy = await this.ocrService.checkHealth();
    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      service: 'ocr',
    };
  }
}

