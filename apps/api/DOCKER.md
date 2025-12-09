# 🐳 Docker Setup - OfficeBrain Juris Enterprise

Configuração profissional de Docker para desenvolvimento e produção.

## 📋 Índice

- [Estrutura](#estrutura)
- [Início Rápido](#início-rápido)
- [Serviços](#serviços)
- [Configuração](#configuração)
- [Backup e Restore](#backup-e-restore)
- [Produção](#produção)
- [Troubleshooting](#troubleshooting)

## 🏗️ Estrutura

```
apps/api/
├── docker-compose.yml          # Configuração base (dev/prod)
├── docker-compose.prod.yml     # Overrides para produção
├── Dockerfile                  # Build da API
├── .dockerignore              # Arquivos ignorados no build
└── database/
    ├── init/                   # Scripts de inicialização
    │   ├── 01-import-database-processed.sql
    │   └── 02-init-extensions.sql
    ├── backups/                # Backups (gitignored)
    ├── backup.sh               # Script de backup
    └── restore.sh              # Script de restore
```

## 🚀 Início Rápido

### Desenvolvimento

```bash
cd apps/api

# Iniciar todos os serviços
docker compose up -d

# Ver logs
docker compose logs -f

# Parar serviços
docker compose down
```

### Primeira Execução

Na primeira execução, o PostgreSQL irá:
1. Criar o banco de dados `officebrain`
2. Executar scripts em `database/init/` em ordem alfabética
3. Importar estrutura e dados do banco local

## 🎯 Serviços

### PostgreSQL

- **Container**: `officebrain-postgres`
- **Porta**: `5432`
- **Usuário**: `officebrain` (configurável via env)
- **Senha**: `officebrain123` (configurável via env)
- **Banco**: `officebrain`

**Configurações de Performance:**
- Max connections: 200 (dev) / 500 (prod)
- Shared buffers: 256MB (dev) / 512MB (prod)
- Effective cache: 1GB (dev) / 2GB (prod)

### API

- **Container**: `officebrain-api`
- **Porta**: `3001`
- **Health Check**: `/api/health`

**Build Multi-stage:**
1. Dependencies: Instala todas as dependências
2. Builder: Compila a aplicação
3. Production: Imagem final otimizada

### Redis (Opcional)

- **Container**: `officebrain-redis`
- **Porta**: `6379`
- **Uso**: Cache e sessões

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz de `apps/api/`:

```env
# PostgreSQL
POSTGRES_USER=officebrain
POSTGRES_PASSWORD=senha-segura-aqui
POSTGRES_DB=officebrain
POSTGRES_PORT=5432

# API
NODE_ENV=development
PORT=3001
JWT_SECRET=seu-jwt-secret-super-seguro
CORS_ORIGIN=http://localhost:3000
OPENAI_API_KEY=sk-...

# Redis (opcional)
REDIS_PORT=6379
REDIS_PASSWORD=senha-redis
```

### Volumes

- `postgres_data`: Dados persistentes do PostgreSQL
- `redis_data`: Dados persistentes do Redis
- `./uploads`: Uploads de arquivos (montado do host)
- `./logs`: Logs da aplicação (montado do host)

## 💾 Backup e Restore

### Backup Automático

Os scripts em `database/init/` são executados apenas na primeira inicialização.

### Backup Manual

**Linux/Mac:**
```bash
cd apps/api/database
chmod +x backup.sh
./backup.sh
```

**Windows:**
```powershell
cd apps/api/database
docker exec officebrain-postgres pg_dump -U officebrain officebrain > backups/backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql
```

### Restore

**Linux/Mac:**
```bash
cd apps/api/database
./restore.sh backups/officebrain_backup_20241208_120000.sql.gz
```

**Windows:**
```powershell
Get-Content backups/backup.sql | docker exec -i officebrain-postgres psql -U officebrain officebrain
```

## 🏭 Produção

### Deploy em Produção

```bash
# Usar configuração de produção
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Build da API
docker compose build api

# Verificar saúde
docker compose ps
```

### Configurações de Produção

O arquivo `docker-compose.prod.yml` adiciona:
- Limites de recursos (CPU/Memória)
- Configurações otimizadas do PostgreSQL
- Logging avançado
- Políticas de restart

### Segurança

1. **Altere todas as senhas padrão**
2. **Use secrets management** (Docker Secrets, Vault, etc)
3. **Configure firewall** para expor apenas portas necessárias
4. **Use HTTPS** em produção
5. **Monitore logs** regularmente

## 🔧 Troubleshooting

### PostgreSQL não inicia

```bash
# Ver logs
docker logs officebrain-postgres

# Verificar permissões
docker exec officebrain-postgres ls -la /var/lib/postgresql/data

# Recriar volume
docker compose down -v
docker compose up -d postgres
```

### Erro ao importar SQL

```bash
# Verificar logs de inicialização
docker logs officebrain-postgres | grep -i error

# Verificar se scripts estão montados
docker exec officebrain-postgres ls -la /docker-entrypoint-initdb.d/

# Recriar container (scripts só executam na primeira vez)
docker compose down -v
docker compose up -d postgres
```

### API não conecta ao banco

```bash
# Verificar se PostgreSQL está rodando
docker compose ps

# Testar conexão
docker exec officebrain-postgres psql -U officebrain -d officebrain -c "SELECT 1;"

# Verificar DATABASE_URL
docker exec officebrain-api printenv DATABASE_URL
```

### Limpar tudo e recomeçar

```bash
# Parar e remover tudo (CUIDADO: apaga dados!)
docker compose down -v

# Remover imagens
docker rmi officebrain-api

# Limpar sistema Docker
docker system prune -a
```

## 📊 Monitoramento

### Health Checks

Todos os serviços têm health checks configurados:

```bash
# Ver status
docker compose ps

# Ver health checks
docker inspect officebrain-postgres | grep -A 10 Healthcheck
```

### Logs

```bash
# Todos os serviços
docker compose logs -f

# Apenas PostgreSQL
docker compose logs -f postgres

# Últimas 100 linhas
docker compose logs --tail=100
```

## 🔄 Atualizações

### Atualizar Código

```bash
# Rebuild da API
docker compose build api

# Restart
docker compose restart api
```

### Atualizar Banco de Dados

```bash
# Executar migrações
docker exec officebrain-api npm run prisma:migrate

# Ou via Prisma Studio
docker exec -it officebrain-api npx prisma studio
```

## 📚 Referências

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Prisma with Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verifique os logs: `docker compose logs`
2. Consulte a documentação do projeto
3. Abra uma issue no GitHub

---

**Desenvolvido com ❤️ para OfficeBrain Juris Enterprise**

