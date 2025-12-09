# ============================================
# Frontend - Next.js 14
# Multi-stage build otimizado
# ============================================

# ========== STAGE 1: Dependencies ==========
FROM node:20-alpine AS deps

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci

# ========== STAGE 2: Builder ==========
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependências
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variáveis de ambiente para build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Desabilitar telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build da aplicação
RUN npm run build

# ========== STAGE 3: Runner ==========
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Mudar ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]

