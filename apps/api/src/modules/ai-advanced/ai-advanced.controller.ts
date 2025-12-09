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
import { AiAdvancedService } from './ai-advanced.service';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { CreateAnaliseDto } from './dto/create-analise.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('IA Avançada')
@Controller('ai-advanced')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiAdvancedController {
  constructor(private readonly aiAdvancedService: AiAdvancedService) {}

  @Post('conversations')
  @ApiOperation({ summary: 'Criar nova conversa com IA' })
  @ApiResponse({ status: 201, description: 'Conversa criada' })
  createConversation(@Body() createConversaDto: CreateConversaDto) {
    return this.aiAdvancedService.createConversation(createConversaDto);
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Listar conversas' })
  @ApiQuery({ name: 'usuarioId', required: false, type: String })
  @ApiQuery({ name: 'processoId', required: false, type: String })
  findAllConversations(@Query() query: any) {
    return this.aiAdvancedService.findAllConversations(query.usuarioId, query.processoId);
  }

  @Get('conversations/:id')
  @ApiOperation({ summary: 'Obter conversa por ID' })
  findOneConversation(@Param('id') id: string) {
    return this.aiAdvancedService.findOneConversation(id);
  }

  @Post('conversations/:id/messages')
  @ApiOperation({ summary: 'Enviar mensagem na conversa' })
  sendMessage(
    @Param('id') id: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.aiAdvancedService.sendMessage(id, sendMessageDto);
  }

  @Post('analyses')
  @ApiOperation({ summary: 'Criar análise de IA' })
  @ApiResponse({ status: 201, description: 'Análise criada' })
  createAnalise(@Body() createAnaliseDto: CreateAnaliseDto) {
    return this.aiAdvancedService.createAnalise(createAnaliseDto);
  }

  @Get('analyses')
  @ApiOperation({ summary: 'Listar análises' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'tipo', required: false, type: String })
  @ApiQuery({ name: 'processoId', required: false, type: String })
  findAllAnalises(@Query() query: any) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 50;
    
    return this.aiAdvancedService.findAllAnalises({
      skip: (page - 1) * limit,
      take: limit,
      tipo: query.tipo,
      processoId: query.processoId,
    });
  }
}

