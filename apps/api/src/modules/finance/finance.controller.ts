import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('dashboard')
  getDashboard() { return this.financeService.getDashboard(); }

  @Post('honorarios')
  createHonorario(@Body() data: any) { return this.financeService.createHonorario(data); }

  @Get('honorarios')
  findAllHonorarios(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('clienteId') clienteId?: string,
    @Query('status') status?: string,
  ) {
    return this.financeService.findAllHonorarios({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 50,
      clienteId, status,
    });
  }

  @Post('movimentacoes')
  createMovimentacao(@Body() data: any) { return this.financeService.createMovimentacao(data); }

  @Get('movimentacoes')
  findAllMovimentacoes(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('tipo') tipo?: string,
  ) {
    return this.financeService.findAllMovimentacoes({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 50,
      tipo,
    });
  }
}
