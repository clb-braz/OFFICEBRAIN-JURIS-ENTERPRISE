#!/bin/bash
# Script de backup do banco de dados PostgreSQL

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/officebrain_backup_$TIMESTAMP.sql"

# Criar diretório de backups se não existir
mkdir -p "$BACKUP_DIR"

# Configurações do banco
DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_NAME="${POSTGRES_DB:-officebrain}"
DB_USER="${POSTGRES_USER:-officebrain}"

echo "Iniciando backup do banco de dados..."
echo "Host: $DB_HOST"
echo "Porta: $DB_PORT"
echo "Banco: $DB_NAME"
echo "Usuário: $DB_USER"

# Executar backup
PGPASSWORD="${POSTGRES_PASSWORD:-officebrain123}" pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --clean \
  --if-exists \
  --create \
  --format=plain \
  --file="$BACKUP_FILE"

# Comprimir backup
gzip "$BACKUP_FILE"
BACKUP_FILE_GZ="${BACKUP_FILE}.gz"

echo "Backup concluído: $BACKUP_FILE_GZ"
echo "Tamanho: $(du -h "$BACKUP_FILE_GZ" | cut -f1)"

# Manter apenas os últimos 7 backups
ls -t "$BACKUP_DIR"/*.sql.gz | tail -n +8 | xargs -r rm

echo "Backup finalizado com sucesso!"

