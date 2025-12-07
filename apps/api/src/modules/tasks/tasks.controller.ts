import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() data: any) { return this.tasksService.create(data); }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('responsavelId') responsavelId?: string,
    @Query('processoId') processoId?: string,
  ) {
    return this.tasksService.findAll({ status, responsavelId, processoId });
  }

  @Get('kanban')
  getKanban() { return this.tasksService.getKanban(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.tasksService.findOne(id); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) { return this.tasksService.update(id, data); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.tasksService.remove(id); }
}
