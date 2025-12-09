#!/bin/sh
set -e

echo "🚀 OfficeBrain Juris Enterprise - Iniciando..."

# Aguardar PostgreSQL estar pronto
echo "⏳ Aguardando PostgreSQL..."
until pg_isready -h postgres -U ${POSTGRES_USER:-postgres} -d ${POSTGRES_DB:-officebrain} 2>/dev/null; do
  echo "   PostgreSQL ainda não está pronto. Aguardando..."
  sleep 2
done

echo "✅ PostgreSQL está pronto!"

# Executar migrações
echo "📦 Executando migrações do Prisma..."
npx prisma migrate deploy || echo "⚠️  Migrações já aplicadas ou erro (continuando...)"

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Verificar se precisa rodar seed
if [ "$RUN_SEED" = "true" ]; then
  echo "🌱 Executando seed do banco de dados..."
  npm run db:seed || echo "⚠️  Seed já executado ou erro (continuando...)"
fi

# Iniciar aplicação
echo "🎯 Iniciando aplicação NestJS..."
exec node dist/main.js

