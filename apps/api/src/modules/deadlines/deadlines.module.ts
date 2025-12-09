import { Module } from '@nestjs/common';
import { DeadlinesController } from './deadlines.controller';
import { DeadlinesService } from './deadlines.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [DeadlinesController],
  providers: [DeadlinesService],
  exports: [DeadlinesService],
})
export class DeadlinesModule {}

