#!/bin/bash
# Script de restore do banco de dados PostgreSQL

set -e

if [ -z "$1" ]; then
    echo "Uso: $0 <arquivo_backup.sql.gz>"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Erro: Arquivo de backup não encontrado: $BACKUP_FILE"
    exit 1
fi

# Configurações do banco
DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_NAME="${POSTGRES_DB:-officebrain}"
DB_USER="${POSTGRES_USER:-officebrain}"

echo "ATENÇÃO: Este processo irá SOBRESCREVER o banco de dados atual!"
echo "Host: $DB_HOST"
echo "Porta: $DB_PORT"
echo "Banco: $DB_NAME"
echo "Usuário: $DB_USER"
echo "Backup: $BACKUP_FILE"
echo ""
read -p "Deseja continuar? (sim/não): " CONFIRM

if [ "$CONFIRM" != "sim" ]; then
    echo "Restore cancelado."
    exit 0
fi

# Descomprimir se necessário
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo "Descomprimindo backup..."
    gunzip -c "$BACKUP_FILE" > /tmp/restore.sql
    SQL_FILE="/tmp/restore.sql"
else
    SQL_FILE="$BACKUP_FILE"
fi

echo "Restaurando banco de dados..."

# Executar restore
PGPASSWORD="${POSTGRES_PASSWORD:-officebrain123}" psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d postgres \
  -f "$SQL_FILE"

# Limpar arquivo temporário
if [ -f "/tmp/restore.sql" ]; then
    rm /tmp/restore.sql
fi

echo "Restore concluído com sucesso!"

