import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Criar novo lead (site público)' })
  @ApiResponse({ status: 201, description: 'Lead criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os leads (admin)' })
  @ApiResponse({ status: 200, description: 'Lista de leads' })
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter lead por ID (admin)' })
  @ApiResponse({ status: 200, description: 'Lead encontrado' })
  @ApiResponse({ status: 404, description: 'Lead não encontrado' })
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }
}

