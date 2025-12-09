import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsAdvancedService } from './documents-advanced.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { CompareVersionsDto } from './dto/compare-versions.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Documentos Avançados')
@Controller('documents-advanced')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DocumentsAdvancedController {
  constructor(private readonly documentsAdvancedService: DocumentsAdvancedService) {}

  @Post('documents/:documentoId/versions')
  @ApiOperation({ summary: 'Criar nova versão do documento' })
  @ApiResponse({ status: 201, description: 'Versão criada com sucesso' })
  createVersion(
    @Param('documentoId') documentoId: string,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    return this.documentsAdvancedService.createVersion(documentoId, createVersionDto);
  }

  @Get('documents/:documentoId/versions')
  @ApiOperation({ summary: 'Listar todas as versões do documento' })
  findAllVersions(@Param('documentoId') documentoId: string) {
    return this.documentsAdvancedService.findAllVersions(documentoId);
  }

  @Get('versions/:id')
  @ApiOperation({ summary: 'Obter versão específica' })
  @ApiResponse({ status: 200, description: 'Versão encontrada' })
  @ApiResponse({ status: 404, description: 'Versão não encontrada' })
  findOneVersion(@Param('id') id: string) {
    return this.documentsAdvancedService.findOneVersion(id);
  }

  @Post('versions/compare')
  @ApiOperation({ summary: 'Comparar duas versões' })
  compareVersions(@Body() compareVersionsDto: CompareVersionsDto) {
    return this.documentsAdvancedService.compareVersions(compareVersionsDto);
  }

  @Post('versions/:id/restore')
  @ApiOperation({ summary: 'Restaurar versão' })
  restoreVersion(@Param('id') id: string) {
    return this.documentsAdvancedService.restoreVersion(id);
  }

  @Post('documents/:documentoId/extract')
  @ApiOperation({ summary: 'Extrair dados do documento usando IA' })
  extractData(@Param('documentoId') documentoId: string) {
    return this.documentsAdvancedService.extractDataFromDocument(documentoId);
  }
}

