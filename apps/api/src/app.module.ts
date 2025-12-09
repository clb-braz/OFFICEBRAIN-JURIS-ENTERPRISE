import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ProcessesModule } from './modules/processes/processes.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { FinanceModule } from './modules/finance/finance.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LegislationModule } from './modules/legislation/legislation.module';
import { DeadlinesModule } from './modules/deadlines/deadlines.module';
import { AgendaModule } from './modules/agenda/agenda.module';
import { CrmModule } from './modules/crm/crm.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { AiAdvancedModule } from './modules/ai-advanced/ai-advanced.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DocumentsAdvancedModule } from './modules/documents-advanced/documents-advanced.module';
import { LeadsModule } from './modules/leads/leads.module';
import { OcrModule } from './modules/ocr/ocr.module';
import { HealthController } from './common/health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    ClientsModule,
    ProcessesModule,
    DocumentsModule,
    FinanceModule,
    TasksModule,
    UsersModule,
    DashboardModule,
    LegislationModule,
    DeadlinesModule,
    AgendaModule,
    CrmModule,
    CommunicationModule,
    AiAdvancedModule,
    NotificationsModule,
    DocumentsAdvancedModule,
    LeadsModule,
    OcrModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
