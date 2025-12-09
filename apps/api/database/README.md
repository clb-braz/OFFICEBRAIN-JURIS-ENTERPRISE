# Database Management - OfficeBrain Juris Enterprise

Este diretório contém scripts e arquivos relacionados ao gerenciamento do banco de dados PostgreSQL.

## Estrutura

```
database/
├── init/                          # Scripts de inicialização
│   ├── 01-import-database.sql    # Importação inicial do banco
│   ├── 01-import-database-processed.sql  # Versão processada
│   └── 02-init-extensions.sql    # Extensões PostgreSQL
├── backups/                       # Backups do banco (gitignored)
├── backup.sh                      # Script de backup
├── restore.sh                     # Script de restore
└── process-sql.ps1                # Processador de SQL para Docker
```

## Inicialização Automática

O Docker Compose executa automaticamente os scripts em `init/` na primeira inicialização do container PostgreSQL. Os scripts são executados em ordem alfabética:

1. `01-import-database-processed.sql` - Importa estrutura e dados
2. `02-init-extensions.sql` - Cria extensões necessárias

## Backup Manual

### Linux/Mac

```bash
cd apps/api/database
chmod +x backup.sh
./backup.sh
```

### Windows (PowerShell)

```powershell
cd apps/api/database
docker exec officebrain-postgres pg_dump -U officebrain officebrain > backups/backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql
```

## Restore Manual

### Linux/Mac

```bash
cd apps/api/database
chmod +x restore.sh
./restore.sh backups/officebrain_backup_20241208_120000.sql.gz
```

### Windows (PowerShell)

```powershell
cd apps/api/database
Get-Content backups/backup.sql | docker exec -i officebrain-postgres psql -U officebrain officebrain
```

## Backup Automático

Para configurar backup automático, adicione ao crontab (Linux) ou Task Scheduler (Windows):

```bash
# Backup diário às 2h da manhã
0 2 * * * cd /path/to/apps/api/database && ./backup.sh
```

## Variáveis de Ambiente

Os scripts usam as seguintes variáveis de ambiente (com valores padrão):

- `POSTGRES_HOST` (padrão: localhost)
- `POSTGRES_PORT` (padrão: 5432)
- `POSTGRES_DB` (padrão: officebrain)
- `POSTGRES_USER` (padrão: officebrain)
- `POSTGRES_PASSWORD` (padrão: officebrain123)

## Notas Importantes

1. **Primeira Execução**: Os scripts em `init/` são executados apenas na primeira inicialização do container. Para reexecutar, é necessário recriar o volume:

   ```bash
   docker compose down -v
   docker compose up -d
   ```

2. **Backups**: Sempre faça backup antes de restaurar dados.

3. **Produção**: Em produção, configure backups automáticos e monitore o espaço em disco.

4. **Segurança**: Nunca commite arquivos de backup com dados sensíveis no Git.

