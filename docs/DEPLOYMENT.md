# 🚀 Guia de Deploy - OfficeBrain Juris Enterprise

Este guia fornece instruções detalhadas para fazer deploy do OfficeBrain Juris Enterprise em diferentes ambientes.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Deploy Local](#deploy-local)
- [Deploy em VPS](#deploy-em-vps)
- [Deploy com Docker](#deploy-com-docker)
- [Deploy no Railway](#deploy-no-railway)
- [Deploy no Vercel](#deploy-no-vercel)
- [Configuração de Produção](#configuração-de-produção)
- [Backup e Restore](#backup-e-restore)

## ✅ Pré-requisitos

- Node.js 20.x ou superior
- PostgreSQL 14.x ou superior
- Git
- (Opcional) Docker e Docker Compose

## 🏠 Deploy Local

### 1. Clone o Repositório

```bash
git clone https://github.com/clb-braz/OFFICEBRAIN-JURIS-ENTERPRISE.git
cd OFFICEBRAIN-JURIS-ENTERPRISE
```

### 2. Configure o Banco de Dados

```bash
# Crie o banco de dados
createdb officebrain

# Ou via psql
psql -U postgres
CREATE DATABASE officebrain;
\q
```

### 3. Configure Variáveis de Ambiente

```bash
# Backend
cd apps/api
cp .env.example .env
# Edite .env com suas credenciais

# Frontend
cd ../frontend
cp .env.example .env.local
# Edite .env.local
```

### 4. Instale e Configure

```bash
# Backend
cd apps/api
npm install
npx prisma generate
npx prisma db push
npx prisma db seed

# Frontend
cd ../frontend
npm install
```

### 5. Inicie os Servidores

```bash
# Terminal 1 - Backend
cd apps/api
npm run dev

# Terminal 2 - Frontend
cd apps/frontend
npm run dev
```

## 🖥️ Deploy em VPS

### 1. Preparar Servidor

```bash
# Atualize o sistema
sudo apt update && sudo apt upgrade -y

# Instale Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instale PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instale PM2 (gerenciador de processos)
sudo npm install -g pm2
```

### 2. Configure PostgreSQL

```bash
sudo -u postgres psql
CREATE DATABASE officebrain;
CREATE USER officebrain_user WITH PASSWORD 'senha_segura';
GRANT ALL PRIVILEGES ON DATABASE officebrain TO officebrain_user;
\q
```

### 3. Clone e Configure

```bash
cd /var/www
sudo git clone https://github.com/clb-braz/OFFICEBRAIN-JURIS-ENTERPRISE.git
sudo chown -R $USER:$USER OFFICEBRAIN-JURIS-ENTERPRISE
cd OFFICEBRAIN-JURIS-ENTERPRISE

# Configure .env
cd apps/api
cp .env.example .env
nano .env  # Edite com credenciais de produção
```

### 4. Build e Deploy

```bash
# Backend
cd apps/api
npm install --production
npm run build
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# Frontend
cd ../frontend
npm install --production
npm run build
```

### 5. Configure PM2

```bash
# Crie ecosystem.config.js na raiz
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'officebrain-api',
      script: './apps/api/dist/main.js',
      cwd: './apps/api',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 2,
      exec_mode: 'cluster'
    },
    {
      name: 'officebrain-frontend',
      script: 'npm',
      args: 'start',
      cwd: './apps/frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
EOF

# Inicie com PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Configure Nginx

```nginx
# /etc/nginx/sites-available/officebrain
server {
    listen 80;
    server_name seu-dominio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/officebrain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🐳 Deploy com Docker

### 1. Crie docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: officebrain
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: senha_segura
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://postgres:senha_segura@postgres:5432/officebrain
      NODE_ENV: production
      PORT: 3001
      JWT_SECRET: seu-jwt-secret
    ports:
      - "3001:3001"
    depends_on:
      - postgres

  frontend:
    build:
      context: ./apps/frontend
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001/api
    ports:
      - "3000:3000"
    depends_on:
      - api

volumes:
  postgres_data:
```

### 2. Dockerfile - Backend

```dockerfile
# apps/api/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main.js"]
```

### 3. Dockerfile - Frontend

```dockerfile
# apps/frontend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
```

### 4. Deploy

```bash
docker-compose up -d
```

## 🚂 Deploy no Railway

1. Conecte seu repositório GitHub ao Railway
2. Configure variáveis de ambiente
3. Railway detectará automaticamente e fará o deploy
4. Configure PostgreSQL addon
5. Atualize `DATABASE_URL` nas variáveis de ambiente

## ▲ Deploy no Vercel (Frontend)

1. Conecte o repositório
2. Configure:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Environment Variables: `NEXT_PUBLIC_API_URL`

## ⚙️ Configuração de Produção

### Variáveis de Ambiente Críticas

```env
# Backend
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=senha-super-segura-aleatoria
OPENAI_API_KEY=sk-...

# Frontend
NEXT_PUBLIC_API_URL=https://api.seudominio.com/api
```

### Segurança

- Use HTTPS (Let's Encrypt)
- Configure CORS corretamente
- Use variáveis de ambiente para secrets
- Ative rate limiting
- Configure firewall

## 💾 Backup e Restore

### Backup do Banco

```bash
pg_dump -U postgres officebrain > backup_$(date +%Y%m%d).sql
```

### Restore

```bash
psql -U postgres officebrain < backup_20241207.sql
```

### Backup Automático (Cron)

```bash
# Adicione ao crontab
0 2 * * * pg_dump -U postgres officebrain > /backups/officebrain_$(date +\%Y\%m\%d).sql
```

---

Para mais informações, consulte a [documentação completa](./README.md).

