import { Module } from '@nestjs/common';
import { AiAdvancedController } from './ai-advanced.controller';
import { AiAdvancedService } from './ai-advanced.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';
import { LegislationModule } from '../legislation/legislation.module';

@Module({
  imports: [PrismaModule, AiModule, LegislationModule],
  controllers: [AiAdvancedController],
  providers: [AiAdvancedService],
  exports: [AiAdvancedService],
})
export class AiAdvancedModule {}

