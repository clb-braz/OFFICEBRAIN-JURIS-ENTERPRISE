import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('usuarioId') usuarioId?: string, @Query('entidade') entidade?: string, @Query('acao') acao?: string) {
    return this.auditService.findAll({ skip: skip ? parseInt(skip) : undefined, take: take ? parseInt(take) : undefined, usuarioId, entidade, acao });
  }

  @Get('ia')
  getLogsIA(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.auditService.getLogsIA({ skip: skip ? parseInt(skip) : undefined, take: take ? parseInt(take) : undefined });
  }
}

