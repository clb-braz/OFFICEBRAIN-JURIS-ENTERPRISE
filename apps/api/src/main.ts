import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  
  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
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
  
  console.log('');
  console.log('='.repeat(60));
  console.log('  OFFICEBRAIN JURIS ENTERPRISE - API');
  console.log('='.repeat(60));
  console.log(`  API:     http://localhost:${port}/api`);
  console.log(`  Swagger: http://localhost:${port}/api/docs`);
  console.log('='.repeat(60));
  console.log('');
}

bootstrap();
