import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProcessesService } from './processes.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Processos')
@Controller('processes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo processo' })
  @ApiResponse({ status: 201, description: 'Processo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createProcessDto: CreateProcessDto) {
    return this.processesService.create(createProcessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar processos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'area', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de processos' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('area') area?: string,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 50;
    return this.processesService.findAll({
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      search, status, area,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter processo por ID' })
  @ApiResponse({ status: 200, description: 'Processo encontrado' })
  @ApiResponse({ status: 404, description: 'Processo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.processesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar processo' })
  @ApiResponse({ status: 200, description: 'Processo atualizado' })
  @ApiResponse({ status: 404, description: 'Processo não encontrado' })
  update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
    return this.processesService.update(id, updateProcessDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir processo' })
  @ApiResponse({ status: 200, description: 'Processo excluído' })
  @ApiResponse({ status: 404, description: 'Processo não encontrado' })
  remove(@Param('id') id: string) {
    return this.processesService.remove(id);
  }

  @Post(':id/audiencias')
  @ApiOperation({ summary: 'Adicionar audiência ao processo' })
  addAudiencia(@Param('id') id: string, @Body() data: any) {
    return this.processesService.addAudiencia(id, data);
  }

  @Post(':id/prazos')
  @ApiOperation({ summary: 'Adicionar prazo ao processo' })
  addPrazo(@Param('id') id: string, @Body() data: any) {
    return this.processesService.addPrazo(id, data);
  }

  @Post(':id/andamentos')
  @ApiOperation({ summary: 'Adicionar andamento ao processo' })
  addAndamento(@Param('id') id: string, @Body() data: any) {
    return this.processesService.addAndamento(id, data);
  }
}
