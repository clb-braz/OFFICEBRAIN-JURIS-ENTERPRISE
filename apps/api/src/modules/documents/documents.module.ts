import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { OcrModule } from '../ocr/ocr.module';

@Module({
  imports: [
    OcrModule,
    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
      fileFilter: (req, file, callback) => {
        const allowedTypes = /pdf|doc|docx|xls|xlsx|jpg|jpeg|png|gif/;
        const ext = extname(file.originalname).toLowerCase().slice(1);
        if (allowedTypes.test(ext)) {
          callback(null, true);
        } else {
          callback(new Error('Tipo de arquivo não permitido'), false);
        }
      },
    }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
