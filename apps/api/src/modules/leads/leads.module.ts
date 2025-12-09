import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsPublicController } from './leads.public.controller';
import { LeadsService } from './leads.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LeadsController, LeadsPublicController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}

