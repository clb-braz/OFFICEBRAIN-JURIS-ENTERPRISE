import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
  UseInterceptors, UploadedFile, Res, StreamableFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Body() body: { titulo?: string; nome?: string; tipo?: string; descricao?: string; processoId?: string; clienteId?: string }
  ) {
    const fileName = file?.filename || 'documento';
    return this.documentsService.create({
      nome: body.titulo || body.nome || file?.originalname || 'Documento',
      tipo: body.tipo,
      descricao: body.descricao,
      arquivoUrl: `/uploads/${fileName}`,
      arquivoPath: fileName,
      tamanhoBytes: file?.size,
      mimeType: file?.mimetype,
      processoId: body.processoId,
      clienteId: body.clienteId,
    });
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
    @Query('tipo') tipo?: string,
    @Query('categoria') categoria?: string,
    @Query('processoId') processoId?: string,
    @Query('clienteId') clienteId?: string,
  ) {
    return this.documentsService.findAll({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 50,
      search,
      tipo: tipo || categoria,
      processoId,
      clienteId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Get('download/:id')
  async download(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const doc = await this.documentsService.findOne(id);
    if (!doc?.arquivoPath) {
      return { error: 'Arquivo não encontrado' };
    }

    const filePath = join(process.cwd(), 'uploads', doc.arquivoPath);
    if (!existsSync(filePath)) {
      return { error: 'Arquivo não encontrado no servidor' };
    }

    res.set({
      'Content-Type': doc.mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${doc.nome}"`,
    });

    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.documentsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
