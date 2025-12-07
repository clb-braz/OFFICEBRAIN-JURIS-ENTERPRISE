import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() { return this.dashboardService.getStats(); }

  @Get('recent-processes')
  getRecentProcesses() { return this.dashboardService.getRecentProcesses(); }

  @Get('upcoming-deadlines')
  getUpcomingDeadlines() { return this.dashboardService.getUpcomingDeadlines(); }

  @Get('upcoming-audiencias')
  getUpcomingAudiencias() { return this.dashboardService.getUpcomingAudiencias(); }
}

