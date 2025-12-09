import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Notificações')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar notificações do usuário' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'lida', required: false, type: Boolean })
  findAll(@Request() req: any, @Query() query: any) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 50;
    
    return this.notificationsService.findAll(req.user.id, {
      skip: (page - 1) * limit,
      take: limit,
      lida: query.lida === 'true' ? true : query.lida === 'false' ? false : undefined,
    });
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Contar notificações não lidas' })
  getUnreadCount(@Request() req: any) {
    return this.notificationsService.getUnreadCount(req.user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marcar notificação como lida' })
  markAsRead(@Param('id') id: string, @Request() req: any) {
    return this.notificationsService.markAsRead(id, req.user.id);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Marcar todas as notificações como lidas' })
  markAllAsRead(@Request() req: any) {
    return this.notificationsService.markAllAsRead(req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir notificação' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.notificationsService.delete(id, req.user.id);
  }
}

