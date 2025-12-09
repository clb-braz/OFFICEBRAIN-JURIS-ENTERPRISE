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
import { CrmService } from './crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('CRM')
@Controller('crm')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post('leads')
  @ApiOperation({ summary: 'Criar novo lead' })
  @ApiResponse({ status: 201, description: 'Lead criado com sucesso' })
  createLead(@Body() createLeadDto: CreateLeadDto) {
    return this.crmService.createLead(createLeadDto);
  }

  @Get('leads')
  @ApiOperation({ summary: 'Listar leads' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'origem', required: false, type: String })
  findAll(@Query() query: any) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 50;
    
    return this.crmService.findAll({
      skip: (page - 1) * limit,
      take: limit,
      workspaceId: query.workspaceId,
      status: query.status,
      origem: query.origem,
      responsavelId: query.responsavelId,
    });
  }

  @Get('funnel')
  @ApiOperation({ summary: 'Obter funil de vendas' })
  @ApiQuery({ name: 'workspaceId', required: false, type: String })
  getFunnel(@Query('workspaceId') workspaceId?: string) {
    return this.crmService.getFunnel(workspaceId);
  }

  @Get('leads/:id')
  @ApiOperation({ summary: 'Obter lead por ID' })
  @ApiResponse({ status: 200, description: 'Lead encontrado' })
  @ApiResponse({ status: 404, description: 'Lead não encontrado' })
  findOne(@Param('id') id: string) {
    return this.crmService.findOne(id);
  }

  @Patch('leads/:id')
  @ApiOperation({ summary: 'Atualizar lead' })
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.crmService.update(id, updateLeadDto);
  }

  @Post('leads/:id/interactions')
  @ApiOperation({ summary: 'Adicionar interação ao lead' })
  addInteraction(@Param('id') id: string, @Body() data: any) {
    return this.crmService.addInteraction(id, data);
  }

  @Post('leads/:id/convert')
  @ApiOperation({ summary: 'Converter lead em cliente' })
  convertToClient(@Param('id') id: string, @Body() clienteData: any) {
    return this.crmService.convertToClient(id, clienteData);
  }

  @Delete('leads/:id')
  @ApiOperation({ summary: 'Excluir lead' })
  remove(@Param('id') id: string) {
    return this.crmService.remove(id);
  }
}

