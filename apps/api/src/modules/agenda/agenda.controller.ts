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
import { AgendaService } from './agenda.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Agenda')
@Controller('agenda')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo evento' })
  @ApiResponse({ status: 201, description: 'Evento criado com sucesso' })
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.agendaService.create(createEventoDto);
  }

  @Post('from-process/:processoId')
  @ApiOperation({ summary: 'Criar eventos automáticos para processo' })
  @ApiResponse({ status: 201, description: 'Eventos criados' })
  createFromProcess(@Param('processoId') processoId: string) {
    return this.agendaService.createFromProcess(processoId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar eventos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'processoId', required: false, type: String })
  @ApiQuery({ name: 'clienteId', required: false, type: String })
  @ApiQuery({ name: 'responsavelId', required: false, type: String })
  @ApiQuery({ name: 'tipo', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  findAll(@Query() query: any) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 50;
    
    return this.agendaService.findAll({
      skip: (page - 1) * limit,
      take: limit,
      workspaceId: query.workspaceId,
      processoId: query.processoId,
      clienteId: query.clienteId,
      responsavelId: query.responsavelId,
      tipo: query.tipo,
      status: query.status,
      dataInicio: query.dataInicio ? new Date(query.dataInicio) : undefined,
      dataFim: query.dataFim ? new Date(query.dataFim) : undefined,
    });
  }

  @Get('calendar')
  @ApiOperation({ summary: 'Obter eventos por período (calendário)' })
  @ApiQuery({ name: 'dataInicio', required: true, type: String })
  @ApiQuery({ name: 'dataFim', required: true, type: String })
  @ApiQuery({ name: 'workspaceId', required: false, type: String })
  getCalendar(
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
    @Query('workspaceId') workspaceId?: string,
  ) {
    return this.agendaService.findByDateRange(
      new Date(dataInicio),
      new Date(dataFim),
      workspaceId,
    );
  }

  @Get('check-reminders')
  @ApiOperation({ summary: 'Verificar e enviar lembretes' })
  checkReminders() {
    return this.agendaService.checkAndSendReminders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter evento por ID' })
  @ApiResponse({ status: 200, description: 'Evento encontrado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  findOne(@Param('id') id: string) {
    return this.agendaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar evento' })
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.agendaService.update(id, updateEventoDto);
  }

  @Post(':id/participants')
  @ApiOperation({ summary: 'Adicionar participante ao evento' })
  addParticipant(
    @Param('id') id: string,
    @Body('usuarioId') usuarioId: string,
  ) {
    return this.agendaService.addParticipant(id, usuarioId);
  }

  @Patch(':id/participants/:usuarioId/confirm')
  @ApiOperation({ summary: 'Confirmar participação' })
  confirmParticipant(
    @Param('id') id: string,
    @Param('usuarioId') usuarioId: string,
  ) {
    return this.agendaService.confirmParticipant(id, usuarioId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir evento' })
  remove(@Param('id') id: string) {
    return this.agendaService.remove(id);
  }
}

