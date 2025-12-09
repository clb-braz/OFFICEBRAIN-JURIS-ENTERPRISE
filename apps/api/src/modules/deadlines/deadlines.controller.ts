import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DeadlinesService } from './deadlines.service';
import { CreateDeadlineDto } from './dto/create-deadline.dto';
import { UpdateDeadlineDto } from './dto/update-deadline.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Prazos Avançados')
@Controller('deadlines')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DeadlinesController {
  constructor(private readonly deadlinesService: DeadlinesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo prazo' })
  @ApiResponse({ status: 201, description: 'Prazo criado com sucesso' })
  create(@Body() createDeadlineDto: CreateDeadlineDto) {
    return this.deadlinesService.create(createDeadlineDto);
  }

  @Post('from-document/:documentId')
  @ApiOperation({ summary: 'Criar prazos a partir de documento (IA)' })
  @ApiResponse({ status: 201, description: 'Prazos identificados e criados' })
  createFromDocument(
    @Param('documentId') documentId: string,
    @Query('processoId') processoId: string,
  ) {
    return this.deadlinesService.createFromDocument(documentId, processoId);
  }

  @Post('from-process/:processoId')
  @ApiOperation({ summary: 'Criar prazos automáticos para processo' })
  @ApiResponse({ status: 201, description: 'Prazos automáticos criados' })
  createFromProcess(@Param('processoId') processoId: string) {
    return this.deadlinesService.createFromProcess(processoId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar prazos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'processoId', required: false, type: String })
  @ApiQuery({ name: 'responsavelId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'nivelAlerta', required: false, type: String })
  findAll(@Query() query: any) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 50;
    
    return this.deadlinesService.findAll({
      skip: (page - 1) * limit,
      take: limit,
      processoId: query.processoId,
      responsavelId: query.responsavelId,
      status: query.status,
      nivelAlerta: query.nivelAlerta,
    });
  }

  @Get('critical')
  @ApiOperation({ summary: 'Listar prazos críticos' })
  @ApiQuery({ name: 'hours', required: false, type: Number, description: 'Horas para considerar crítico (padrão: 48)' })
  getCritical(@Query('hours') hours?: string) {
    return this.deadlinesService.getCriticalDeadlines(
      hours ? parseInt(hours) : 48,
    );
  }

  @Get('check-alerts')
  @ApiOperation({ summary: 'Verificar e enviar alertas de prazos' })
  checkAlerts() {
    return this.deadlinesService.checkAndSendAlerts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter prazo por ID' })
  @ApiResponse({ status: 200, description: 'Prazo encontrado' })
  @ApiResponse({ status: 404, description: 'Prazo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.deadlinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar prazo' })
  update(@Param('id') id: string, @Body() updateDeadlineDto: UpdateDeadlineDto) {
    return this.deadlinesService.update(id, updateDeadlineDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Marcar prazo como cumprido' })
  markAsCompleted(@Param('id') id: string, @Query('usuarioId') usuarioId?: string) {
    return this.deadlinesService.markAsCompleted(id, usuarioId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir prazo' })
  remove(@Param('id') id: string) {
    return this.deadlinesService.remove(id);
  }
}

