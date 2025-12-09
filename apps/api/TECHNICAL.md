# Documentação Técnica - OfficeBrain Juris Enterprise API

## 📋 Índice

1. [Arquitetura](#arquitetura)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Padrões e Convenções](#padrões-e-convenções)
4. [Banco de Dados](#banco-de-dados)
5. [Autenticação e Segurança](#autenticação-e-segurança)
6. [Performance](#performance)
7. [Testes](#testes)
8. [Deploy](#deploy)

## 🏗️ Arquitetura

### Stack Tecnológica

- **Framework**: NestJS 10 (Node.js)
- **ORM**: Prisma 5.8
- **Banco de Dados**: PostgreSQL 15
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest

### Padrão Arquitetural

O projeto segue o padrão **Modular** do NestJS, onde cada módulo representa uma funcionalidade específica:

```
AppModule
├── AuthModule (Autenticação)
├── ClientsModule (Clientes)
├── ProcessesModule (Processos)
├── DocumentsModule (Documentos)
├── FinanceModule (Financeiro)
├── TasksModule (Tarefas)
├── DashboardModule (Dashboard)
├── LegislationModule (Legislação)
└── UsersModule (Usuários)
```

## 📁 Estrutura do Projeto

```
apps/api/
├── src/
│   ├── common/              # Código compartilhado
│   │   ├── decorators/     # Decorators customizados
│   │   ├── filters/        # Exception filters
│   │   ├── guards/         # Guards (auth, rate limit)
│   │   ├── interceptors/   # Interceptors (logging, cache)
│   │   ├── pipes/          # Pipes de validação
│   │   ├── utils/          # Utilitários
│   │   └── health/         # Health checks
│   ├── modules/            # Módulos da aplicação
│   │   └── [module]/
│   │       ├── [module].controller.ts
│   │       ├── [module].service.ts
│   │       ├── [module].module.ts
│   │       └── dto/        # Data Transfer Objects
│   ├── prisma/             # Prisma Service
│   └── main.ts             # Entry point
├── prisma/
│   └── schema.prisma       # Schema do banco
├── test/                   # Testes E2E
└── dist/                   # Build output
```

## 📐 Padrões e Convenções

### Nomenclatura

- **Controllers**: `[nome].controller.ts`
- **Services**: `[nome].service.ts`
- **Modules**: `[nome].module.ts`
- **DTOs**: `[acao]-[nome].dto.ts` (ex: `create-client.dto.ts`)
- **Guards**: `[nome].guard.ts`
- **Interceptors**: `[nome].interceptor.ts`

### Código

- **TypeScript strict mode** habilitado
- **ESLint** para linting
- **Prettier** para formatação
- **Conventional Commits** para mensagens de commit

### Validação

Todos os DTOs devem usar decorators do `class-validator`:

```typescript
export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
```

## 🗄️ Banco de Dados

### Prisma

O projeto usa Prisma como ORM. O schema está em `prisma/schema.prisma`.

### Migrações

```bash
# Criar nova migração
npm run prisma:migrate

# Aplicar migrações em produção
npm run prisma:migrate:deploy

# Resetar banco (desenvolvimento)
npm run prisma:reset
```

### Índices

Principais índices para performance:

- `Cliente.cpfCnpj` (unique)
- `Processo.numeroCnj` (unique)
- `Processo.status`
- `Processo.area`
- `Prazo.dataLimite`
- `Audiencia.data`

## 🔒 Autenticação e Segurança

### JWT

- **Access Token**: Expira em 24h
- **Refresh Token**: Expira em 7 dias
- **Algoritmo**: HS256

### Guards

- `JwtAuthGuard`: Valida token JWT
- `RolesGuard`: Valida permissões do usuário
- `RateLimitGuard`: Limita requisições

### Validações

- **CNJ**: Validação completa com dígitos verificadores
- **CPF/CNPJ**: Validação com algoritmo oficial
- **Inputs**: Sanitização automática

## ⚡ Performance

### Cache

- Cache de requisições GET (5 minutos padrão)
- Configurável por endpoint via decorator `@CacheTTL()`

### Paginação

- Padrão: 50 itens por página
- Máximo: 100 itens por página
- Utiliza `PaginationUtil` para normalização

### Queries

- Uso de `select` para limitar campos retornados
- `include` apenas quando necessário
- Índices no banco de dados

## 🧪 Testes

### Estrutura

```
src/
├── [module]/
│   ├── [module].service.spec.ts  # Testes unitários
│   └── [module].controller.spec.ts
└── common/
    └── utils/
        └── [util].spec.ts

test/
└── [module].e2e-spec.ts  # Testes E2E
```

### Executar Testes

```bash
# Todos os testes
npm test

# Watch mode
npm run test:watch

# Cobertura
npm run test:cov

# E2E
npm run test:e2e
```

### Cobertura Mínima

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## 🚀 Deploy

### Docker

```bash
# Build
docker-compose build

# Start
docker-compose up -d

# Logs
docker-compose logs -f api
```

### Variáveis de Ambiente

Ver `.env.example` para todas as variáveis necessárias.

### Health Checks

- `/api/health` - Health check geral
- `/api/health/ready` - Readiness check
- `/api/health/live` - Liveness check

### Monitoramento

- Logs estruturados
- Exception tracking
- Performance metrics

## 📚 Recursos Adicionais

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Swagger/OpenAPI](https://swagger.io/specification/)

