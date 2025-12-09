# 🐳 OfficeBrain Juris Enterprise - Docker Setup Completo

## 📋 Visão Geral

Este projeto está 100% dockerizado e pronto para produção. Todos os serviços rodam em containers Docker, garantindo isolamento, portabilidade e facilidade de deploy.

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│              (officebrain-network)                       │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Frontend │  │ Backend  │  │  pgAdmin │             │
│  │ :3000    │  │ :3001    │  │  :5050   │             │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘             │
│       │             │              │                    │
│       └─────────────┼──────────────┘                    │
│                     │                                   │
│       ┌─────────────┼──────────────┐                   │
│       │             │              │                    │
│  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐              │
│  │Postgres │  │  Redis  │  │   OCR    │              │
│  │ :5432   │  │ :6379   │  │  :8080   │              │
│  └─────────┘  └─────────┘  └─────────┘              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Início Rápido

### Pré-requisitos

- Docker Desktop instalado e rodando
- Docker Compose v2.0+
- 8GB+ de RAM disponível
- Portas livres: 3000, 3001, 5432, 6379, 5050, 8080

### 1. Clonar e Configurar

```bash
# Clonar repositório
git clone https://github.com/clb-braz/OFFICEBRAIN-JURIS-ENTERPRISE.git
cd OFFICEBRAIN-JURIS-ENTERPRISE

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas configurações (opcional)
nano .env
```

### 2. Subir Todos os Serviços

```bash
# Subir todos os containers
docker compose up -d --build

# Ver logs
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f backend
docker compose logs -f frontend
```

### 3. Verificar Status

```bash
# Ver status dos containers
docker compose ps

# Verificar saúde dos serviços
curl http://localhost:3001/api/health
curl http://localhost:8080/health
```

### 4. Executar Testes Automáticos

```bash
# Executar script de testes
./scripts/test-docker.sh

# Ou manualmente
bash scripts/test-docker.sh
```

## 📦 Serviços Incluídos

### 1. PostgreSQL 16 + pgvector

- **Porta**: 5432
- **Imagem**: `pgvector/pgvector:pg16`
- **Extensões**:
  - `uuid-ossp` - Geração de UUIDs
  - `vector` - Busca semântica com embeddings
  - `pg_trgm` - Busca full-text melhorada
  - `citext` - Emails case-insensitive

**Acesso via psql:**
```bash
docker exec -it officebrain-postgres psql -U postgres -d officebrain
```

### 2. pgAdmin 4

- **URL**: http://localhost:5050
- **Email**: admin@officebrain.com (padrão)
- **Senha**: admin (padrão)

**Configurar conexão no pgAdmin:**
- Host: `postgres`
- Port: `5432`
- Database: `officebrain`
- Username: `postgres`
- Password: `postgres`

### 3. Redis

- **Porta**: 6379
- **Uso**: Cache e filas de processamento

**Acesso via CLI:**
```bash
docker exec -it officebrain-redis redis-cli
```

### 4. OCR Service (Tesseract)

- **Porta**: 8080
- **Endpoint**: http://localhost:8080
- **Funcionalidades**:
  - OCR de PDFs
  - OCR de imagens (PNG, JPG, JPEG, GIF, BMP)
  - Processamento em lote

**Testar OCR:**
```bash
curl -X POST http://localhost:8080/ocr \
  -F "file=@documento.pdf"
```

### 5. Backend (NestJS)

- **Porta**: 3001
- **URL**: http://localhost:3001/api
- **Swagger**: http://localhost:3001/api/docs (se configurado)

**Funcionalidades:**
- ✅ CRUD completo de todos os módulos
- ✅ Autenticação JWT
- ✅ Upload de documentos com OCR automático
- ✅ IA jurídica com RAG
- ✅ Geração automática de prazos
- ✅ Cálculo financeiro
- ✅ Notificações

### 6. Frontend (Next.js 14)

- **Porta**: 3000
- **URL**: http://localhost:3000

**Funcionalidades:**
- ✅ Site público (landing page)
- ✅ Login e autenticação
- ✅ Dashboard completo
- ✅ Todos os módulos jurídicos
- ✅ Dark mode
- ✅ Responsivo

## 🔧 Comandos Úteis

### Gerenciamento de Containers

```bash
# Subir serviços
docker compose up -d

# Parar serviços
docker compose down

# Parar e remover volumes (⚠️ apaga dados)
docker compose down -v

# Reconstruir containers
docker compose up -d --build

# Ver logs
docker compose logs -f [serviço]

# Reiniciar um serviço
docker compose restart [serviço]
```

### Banco de Dados

```bash
# Backup do banco
docker exec officebrain-postgres pg_dump -U postgres officebrain > backup.sql

# Restaurar backup
cat backup.sql | docker exec -i officebrain-postgres psql -U postgres officebrain

# Executar migrations
docker exec officebrain-backend npx prisma migrate deploy

# Gerar Prisma Client
docker exec officebrain-backend npx prisma generate

# Acessar Prisma Studio
docker exec -it officebrain-backend npx prisma studio
```

### Desenvolvimento

```bash
# Entrar no container do backend
docker exec -it officebrain-backend sh

# Entrar no container do frontend
docker exec -it officebrain-frontend sh

# Ver variáveis de ambiente
docker exec officebrain-backend env
```

## 🔐 Variáveis de Ambiente

Principais variáveis no arquivo `.env`:

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=officebrain

# Backend
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/officebrain?schema=public
JWT_SECRET=change-this-in-production
OPENAI_API_KEY=sk-your-key-here

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📊 Monitoramento

### Health Checks

Todos os serviços possuem health checks configurados:

```bash
# Backend
curl http://localhost:3001/api/health

# OCR
curl http://localhost:8080/health

# PostgreSQL
docker exec officebrain-postgres pg_isready -U postgres

# Redis
docker exec officebrain-redis redis-cli ping
```

### Logs

```bash
# Todos os logs
docker compose logs -f

# Logs do backend
docker compose logs -f backend

# Últimas 100 linhas
docker compose logs --tail=100 backend
```

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs de erro
docker compose logs [serviço]

# Verificar se porta está em uso
netstat -an | grep [PORTA]

# Verificar recursos do sistema
docker stats
```

### Banco de dados não conecta

```bash
# Verificar se PostgreSQL está rodando
docker compose ps postgres

# Verificar logs
docker compose logs postgres

# Testar conexão
docker exec officebrain-postgres pg_isready -U postgres
```

### OCR não funciona

```bash
# Verificar se serviço está rodando
curl http://localhost:8080/health

# Ver logs
docker compose logs ocr-service

# Testar manualmente
docker exec officebrain-ocr python /app/ocr-server.py
```

### Frontend não carrega

```bash
# Verificar build
docker compose logs frontend

# Reconstruir
docker compose up -d --build frontend

# Verificar se API está acessível
curl http://localhost:3001/api/health
```

## 🚀 Deploy em Produção

### 1. Atualizar Variáveis de Ambiente

```env
NODE_ENV=production
JWT_SECRET=[senha-forte-aleatória]
POSTGRES_PASSWORD=[senha-forte]
OPENAI_API_KEY=[sua-chave]
```

### 2. Usar docker-compose.prod.yml

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 3. Configurar SSL/HTTPS

Use um reverse proxy (Nginx, Traefik) na frente dos containers.

### 4. Backup Automático

Configure backups regulares do volume `postgres_data`:

```bash
# Script de backup (criar cron job)
docker exec officebrain-postgres pg_dump -U postgres officebrain | gzip > backup-$(date +%Y%m%d).sql.gz
```

## 📚 Documentação Adicional

- [README Principal](../README.md)
- [Documentação da API](../apps/api/README.md)
- [Guia de Desenvolvimento](../CONTRIBUTING.md)

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verificar logs: `docker compose logs -f`
2. Verificar health checks
3. Consultar documentação
4. Abrir issue no GitHub

---

**Desenvolvido com ❤️ para a advocacia brasileira**

