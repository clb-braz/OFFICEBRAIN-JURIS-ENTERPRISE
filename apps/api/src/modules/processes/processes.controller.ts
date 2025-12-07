import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProcessesService } from './processes.service';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  create(@Body() data: any) {
    return this.processesService.create(data);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('area') area?: string,
  ) {
    return this.processesService.findAll({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 50,
      search, status, area,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.processesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processesService.remove(id);
  }

  @Post(':id/audiencias')
  addAudiencia(@Param('id') id: string, @Body() data: any) {
    return this.processesService.addAudiencia(id, data);
  }

  @Post(':id/prazos')
  addPrazo(@Param('id') id: string, @Body() data: any) {
    return this.processesService.addPrazo(id, data);
  }

  @Post(':id/andamentos')
  addAndamento(@Param('id') id: string, @Body() data: any) {
    return this.processesService.addAndamento(id, data);
  }
}
