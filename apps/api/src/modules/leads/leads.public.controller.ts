import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { LeadsService } from './leads.service';
import { PublicLeadDto } from './dto/public-lead.dto';

@ApiTags('Leads Públicos')
@Controller('public/leads')
export class LeadsPublicController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Capturar lead do site público' })
  @ApiResponse({ status: 201, description: 'Lead criado com sucesso' })
  create(@Body() body: PublicLeadDto) {
    return this.leadsService.createPublicLead(body);
  }
}

