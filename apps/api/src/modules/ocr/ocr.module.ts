import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OcrController } from './ocr.controller';
import { OcrService } from './ocr.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [OcrController],
  providers: [OcrService],
  exports: [OcrService],
})
export class OcrModule {}

