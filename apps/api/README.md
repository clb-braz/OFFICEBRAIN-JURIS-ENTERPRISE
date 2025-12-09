# OfficeBrain Juris Enterprise - API

API completa para gestão jurídica de escritórios de advocacia.

## 🚀 Tecnologias

- **NestJS 10** - Framework Node.js
- **Prisma 5.8** - ORM moderno
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação de API
- **TypeScript** - Tipagem estática

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Gerar Prisma Client
npm run prisma:generate

# Executar migrações
npm run prisma:migrate

# Popular banco de dados (opcional)
npm run db:seed
```

## 🏃 Execução

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm run start:prod
```

### Docker

```bash
docker-compose up -d
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de código
npm run test:cov

# Testes E2E
npm run test:e2e
```

## 📚 Documentação

A documentação completa da API está disponível via Swagger:

- **Desenvolvimento**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/api/health

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia em modo desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia em modo produção
- `npm test` - Executa testes
- `npm run test:cov` - Testes com cobertura
- `npm run lint` - Verifica código
- `npm run format` - Formata código
- `npm run prisma:studio` - Abre Prisma Studio
- `npm run prisma:migrate` - Executa migrações
- `npm run db:seed` - Popula banco de dados

## 📁 Estrutura do Projeto

```
src/
├── common/           # Código compartilhado
│   ├── decorators/  # Decorators customizados
│   ├── filters/     # Exception filters
│   ├── guards/      # Guards (auth, rate limit)
│   ├── interceptors/# Interceptors (logging, cache)
│   ├── pipes/       # Pipes de validação
│   └── utils/       # Utilitários
├── modules/         # Módulos da aplicação
│   ├── auth/       # Autenticação
│   ├── clients/     # Clientes
│   ├── processes/  # Processos
│   └── ...
├── prisma/          # Prisma Service
└── main.ts          # Entry point
```

## 🔒 Segurança

- Validação de dados com class-validator
- Autenticação JWT
- Rate limiting
- CORS configurável
- Logging de requisições
- Exception handling global

## 📊 Performance

- Cache de requisições
- Paginação otimizada
- Índices no banco de dados
- Queries otimizadas com Prisma

## 🐳 Docker

O projeto inclui configuração Docker completa:

```bash
# Build e start
docker-compose up -d

# Logs
docker-compose logs -f api

# Stop
docker-compose down
```

## 📝 Licença

MIT

