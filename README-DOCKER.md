# 🐳 Docker Setup Completo - OfficeBrain Juris Enterprise

## ✅ O que foi feito

### 1. **Migração do Banco de Dados Local para Docker** ✅
- ✅ Arquivo SQL original copiado: `apps/api/database/init/01-import-database.sql`
- ✅ SQL processado e otimizado: `apps/api/database/init/01-import-database-processed.sql`
- ✅ Scripts de inicialização automática configurados
- ✅ Extensões PostgreSQL configuradas (uuid-ossp, pg_trgm)

### 2. **Configuração Docker Profissional** ✅
- ✅ `docker-compose.yml` - Configuração completa com PostgreSQL, API e Redis
- ✅ `docker-compose.prod.yml` - Overrides para produção
- ✅ `Dockerfile` - Multi-stage build otimizado
- ✅ `.dockerignore` - Otimização de build
- ✅ Health checks configurados em todos os serviços
- ✅ Volumes persistentes para dados
- ✅ Configurações de performance do PostgreSQL

### 3. **Scripts de Gerenciamento** ✅
- ✅ `database/backup.sh` - Backup automático
- ✅ `database/restore.sh` - Restore de backups
- ✅ `database/verify-import.ps1` - Verificação de importação
- ✅ `database/process-sql.ps1` - Processamento de SQL
- ✅ `database/fix-sql.ps1` - Correção de comandos SQL

### 4. **Documentação** ✅
- ✅ `DOCKER.md` - Documentação completa do Docker
- ✅ `database/README.md` - Guia de gerenciamento do banco

## 🚀 Como Usar

### Iniciar Todos os Serviços

```bash
cd apps/api
docker compose up -d
```

### Verificar Importação

```powershell
# Windows
powershell -ExecutionPolicy Bypass -File database/verify-import.ps1

# Linux/Mac
docker exec officebrain-postgres psql -U officebrain -d officebrain -c "SELECT COUNT(*) FROM \"Usuario\";"
```

### Acessar o Banco

```bash
# Via psql
docker exec -it officebrain-postgres psql -U officebrain -d officebrain

# Via Prisma Studio (quando API estiver rodando)
docker exec -it officebrain-api npx prisma studio
```

## 📊 Status da Importação

O banco de dados foi importado com:
- ✅ Todas as tabelas criadas
- ✅ Estrutura completa preservada
- ✅ Dados do banco local transferidos
- ✅ Extensões PostgreSQL configuradas

## 🔧 Configurações Aplicadas

### PostgreSQL
- **Versão**: 15-alpine (leve e otimizada)
- **Porta**: 5432
- **Usuário**: officebrain
- **Banco**: officebrain
- **Performance**: Configurações otimizadas para dev/prod

### API
- **Multi-stage build**: Otimizado para produção
- **Health checks**: Monitoramento automático
- **Volumes**: Uploads e logs persistentes
- **Recursos**: Limites de CPU/Memória configurados

### Redis
- **Cache**: Configurado para sessões e cache
- **Persistência**: AOF habilitado
- **Memory policy**: LRU para gerenciamento de memória

## 📝 Próximos Passos

1. **Verificar dados importados**: Execute o script de verificação
2. **Testar API**: Inicie a API e teste os endpoints
3. **Configurar produção**: Use `docker-compose.prod.yml` para produção
4. **Backup automático**: Configure cron/task scheduler para backups

## 🆘 Troubleshooting

Se houver problemas:

1. **Recriar banco do zero**:
   ```bash
   docker compose down -v
   docker compose up -d postgres
   ```

2. **Ver logs**:
   ```bash
   docker logs officebrain-postgres
   ```

3. **Verificar scripts de init**:
   ```bash
   docker exec officebrain-postgres ls -la /docker-entrypoint-initdb.d/
   ```

## 📚 Documentação Completa

Consulte `apps/api/DOCKER.md` para documentação detalhada.

---

**✅ Migração concluída com sucesso!**

