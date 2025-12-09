import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn', 'log'] 
      : ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  // CORS
  const corsOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://127.0.0.1:3000'];
  
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  
  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Global Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    forbidNonWhitelisted: true,
    disableErrorMessages: process.env.NODE_ENV === 'production',
  }));
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('OfficeBrain Juris Enterprise API')
    .setDescription('API completa para gestao juridica - Escritorios de Advocacia')
    .setVersion('2.0.0')
    .addBearerAuth()
    .addTag('Autenticacao', 'Endpoints de autenticacao e autorizacao')
    .addTag('Dashboard', 'Visao geral e estatisticas')
    .addTag('Clientes', 'Gestao de clientes PF e PJ')
    .addTag('Processos', 'Gestao de processos judiciais')
    .addTag('Documentos', 'Upload e gestao de documentos')
    .addTag('Financeiro', 'Honorarios e movimentacoes financeiras')
    .addTag('Tarefas', 'Gestao de tarefas e kanban')
    .addTag('Legislacao', 'Codigo Civil e CPC')
    .addTag('IA', 'Assistente de IA juridico')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  logger.log('');
  logger.log('='.repeat(60));
  logger.log('  OFFICEBRAIN JURIS ENTERPRISE - API');
  logger.log('='.repeat(60));
  logger.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`  API:     http://localhost:${port}/api`);
  logger.log(`  Swagger: http://localhost:${port}/api/docs`);
  logger.log(`  Health:  http://localhost:${port}/api/health`);
  logger.log('='.repeat(60));
  logger.log('');
}

bootstrap();
