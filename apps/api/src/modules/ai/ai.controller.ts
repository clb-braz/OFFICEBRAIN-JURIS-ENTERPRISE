import { Controller, Post, Body, Param } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('extract')
  extractDocument(@Body() data: { text: string }) { return this.aiService.extractDocumentInfo(data.text); }

  @Post('summarize/:processId')
  summarizeProcess(@Param('processId') processId: string) { return this.aiService.summarizeProcess(processId); }

  @Post('classify')
  classifyAction(@Body() data: { description: string }) { return this.aiService.classifyAction(data.description); }

  @Post('generate')
  generateDocument(@Body() data: { tipo: string; dados: any }) { return this.aiService.generateDocument(data.tipo, data.dados); }

  @Post('chat')
  chat(@Body() data: { message: string; context?: string }) { return this.aiService.chat(data.message, data.context); }
}

