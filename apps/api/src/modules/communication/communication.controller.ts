import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CommunicationService } from './communication.service';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Comunicação')
@Controller('communication')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar mensagem' })
  @ApiResponse({ status: 201, description: 'Mensagem enviada' })
  sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.communicationService.sendMessage(sendMessageDto);
  }

  @Post('send-automatic/:clienteId')
  @ApiOperation({ summary: 'Enviar mensagem automática' })
  @ApiQuery({ name: 'tipo', required: true, type: String })
  @ApiQuery({ name: 'processoId', required: false, type: String })
  sendAutomatic(
    @Param('clienteId') clienteId: string,
    @Query('tipo') tipo: string,
    @Query('processoId') processoId?: string,
  ) {
    return this.communicationService.sendAutomaticMessage(clienteId, tipo, processoId);
  }

  @Get('messages')
  @ApiOperation({ summary: 'Listar mensagens' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'clienteId', required: false, type: String })
  @ApiQuery({ name: 'processoId', required: false, type: String })
  findAllMessages(@Query() query: any) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 50;
    
    return this.communicationService.findAllMessages({
      skip: (page - 1) * limit,
      take: limit,
      clienteId: query.clienteId,
      processoId: query.processoId,
      tipo: query.tipo,
      automatica: query.automatica === 'true',
    });
  }

  @Get('history/:clienteId')
  @ApiOperation({ summary: 'Obter histórico de comunicação do cliente' })
  getClientHistory(@Param('clienteId') clienteId: string) {
    return this.communicationService.getClientHistory(clienteId);
  }

  @Post('templates')
  @ApiOperation({ summary: 'Criar template de mensagem' })
  createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return this.communicationService.createTemplate(createTemplateDto);
  }

  @Get('templates')
  @ApiOperation({ summary: 'Listar templates' })
  @ApiQuery({ name: 'workspaceId', required: false, type: String })
  @ApiQuery({ name: 'tipo', required: false, type: String })
  findAllTemplates(@Query() query: any) {
    return this.communicationService.findAllTemplates(query.workspaceId, query.tipo);
  }
}

