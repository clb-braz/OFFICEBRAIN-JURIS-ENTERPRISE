import { Module } from '@nestjs/common';
import { DocumentsAdvancedController } from './documents-advanced.controller';
import { DocumentsAdvancedService } from './documents-advanced.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [DocumentsAdvancedController],
  providers: [DocumentsAdvancedService],
  exports: [DocumentsAdvancedService],
})
export class DocumentsAdvancedModule {}

