# ============================================
# OfficeBrain Juris Enterprise - Dockerfile
# Multi-stage build otimizado para produção
# ============================================

# ========== STAGE 1: Dependencies ==========
FROM node:20-alpine AS dependencies

WORKDIR /app

# Instalar dependências do sistema para compilação nativa
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci --include=dev

# ========== STAGE 2: Builder ==========
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package*.json ./

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Remover devDependencies após build
RUN npm prune --production

# ========== STAGE 3: Production ==========
FROM node:20-alpine AS production

WORKDIR /app

# Instalar apenas runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    curl

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copiar arquivos necessários
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma

# Copiar script de entrada
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Criar diretórios necessários
RUN mkdir -p /app/uploads /app/logs && \
    chown -R nestjs:nodejs /app/uploads /app/logs

# Instalar pg_isready para healthcheck
RUN apk add --no-cache postgresql-client

# Mudar para usuário não-root
USER nestjs

# Expor porta
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Script de inicialização
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Usar dumb-init para gerenciar processos
ENTRYPOINT ["dumb-init", "--"]

# Comando de inicialização
CMD ["/app/docker-entrypoint.sh"]
