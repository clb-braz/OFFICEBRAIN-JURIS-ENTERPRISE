# Guia de Deploy - OfficeBrain Juris Enterprise

## 🚀 Deploy em Produção

### Pré-requisitos

- Node.js 20.x ou superior
- PostgreSQL 14.x ou superior
- Docker (opcional, mas recomendado)

### Opção 1: Docker (Recomendado)

#### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env`:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@postgres:5432/officebrain
JWT_SECRET=seu-secret-super-seguro-aqui
CORS_ORIGIN=https://seu-dominio.com
PORT=3001
```

#### 2. Build e Start

```bash
docker-compose up -d
```

#### 3. Executar Migrações

```bash
docker-compose exec api npm run prisma:migrate:deploy
```

#### 4. Verificar Health

```bash
curl http://localhost:3001/api/health
```

### Opção 2: Deploy Manual

#### 1. Instalar Dependências

```bash
npm ci --only=production
```

#### 2. Build

```bash
npm run build
```

#### 3. Configurar Banco de Dados

```bash
npm run prisma:generate
npm run prisma:migrate:deploy
```

#### 4. Iniciar Aplicação

```bash
npm run start:prod
```

### Opção 3: PM2 (Process Manager)

#### 1. Instalar PM2

```bash
npm install -g pm2
```

#### 2. Criar ecosystem.config.js

```javascript
module.exports = {
  apps: [{
    name: 'officebrain-api',
    script: './dist/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
  }],
};
```

#### 3. Iniciar

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Opção 4: Railway

1. Conecte seu repositório GitHub
2. Configure variáveis de ambiente
3. Railway detecta automaticamente e faz deploy

### Opção 5: Heroku

#### 1. Criar Procfile

```
web: node dist/main.js
release: npm run prisma:migrate:deploy
```

#### 2. Deploy

```bash
heroku create officebrain-api
heroku addons:create heroku-postgresql
git push heroku main
```

## 🔧 Configurações de Produção

### Variáveis de Ambiente Essenciais

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=seu-secret-super-seguro
CORS_ORIGIN=https://seu-dominio.com
PORT=3001
LOG_LEVEL=info
```

### Segurança

- ✅ Use HTTPS
- ✅ Configure CORS corretamente
- ✅ Use JWT_SECRET forte
- ✅ Habilite rate limiting
- ✅ Configure firewall
- ✅ Use variáveis de ambiente

### Monitoramento

- Configure logs estruturados
- Configure alertas
- Monitore health checks
- Configure backup do banco

### Backup

#### Banco de Dados

```bash
# Backup diário
pg_dump -U user -d officebrain > backup_$(date +%Y%m%d).sql

# Restore
psql -U user -d officebrain < backup_20240101.sql
```

#### Arquivos

Configure backup automático dos uploads.

## 📊 Health Checks

Configure seu load balancer para verificar:

- `/api/health` - Health check geral
- `/api/health/ready` - Readiness
- `/api/health/live` - Liveness

## 🔄 Atualizações

### Processo de Atualização

1. Backup do banco de dados
2. Pull do código atualizado
3. Instalar dependências: `npm ci`
4. Build: `npm run build`
5. Migrações: `npm run prisma:migrate:deploy`
6. Restart da aplicação

### Rollback

1. Restaurar código anterior
2. Restaurar banco de dados (se necessário)
3. Restart da aplicação

## 📝 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados criado e migrado
- [ ] Build executado com sucesso
- [ ] Testes passando
- [ ] Health checks funcionando
- [ ] Logs configurados
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] Documentação atualizada

## 🆘 Troubleshooting

### Erro de Conexão com Banco

- Verifique DATABASE_URL
- Verifique firewall
- Verifique credenciais

### Erro de Migração

- Verifique permissões do usuário
- Verifique se banco existe
- Execute migrações manualmente

### Aplicação não inicia

- Verifique logs
- Verifique variáveis de ambiente
- Verifique porta disponível

## 📞 Suporte

Para problemas de deploy, abra uma issue no GitHub.

