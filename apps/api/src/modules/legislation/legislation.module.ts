import { Module } from '@nestjs/common';
import { LegislationService } from './legislation.service';
import { LegislationController } from './legislation.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LegislationController],
  providers: [LegislationService],
  exports: [LegislationService],
})
export class LegislationModule {}

