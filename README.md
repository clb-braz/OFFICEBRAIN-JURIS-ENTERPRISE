# 🏛️ OfficeBrain Juris Enterprise

<div align="center">

![OfficeBrain Logo](https://img.shields.io/badge/OfficeBrain-Juris%20Enterprise-2563eb?style=for-the-badge&logo=scale-of-justice&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

**Sistema completo de gestão jurídica para escritórios de advocacia com IA integrada**

[Documentação](#-documentação) • [Instalação](#-instalação-rápida) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Contribuir](#-contribuindo)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação Rápida](#-instalação-rápida)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Documentation](#-api-documentation)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

**OfficeBrain Juris Enterprise** é uma plataforma completa de gestão jurídica desenvolvida especificamente para escritórios de advocacia. O sistema integra gestão de processos, clientes, documentos, finanças, tarefas e um assistente de IA jurídico com acesso ao Código Civil e Código de Processo Civil brasileiros.

### 🎨 Características Principais

- ✅ **Multi-tenant**: Suporte a múltiplos escritórios
- ✅ **IA Jurídica**: Assistente com RAG (Retrieval-Augmented Generation) baseado em legislação
- ✅ **Gestão Completa**: Processos, clientes, documentos, finanças e tarefas
- ✅ **Base Jurídica**: Integração com Código Civil e CPC
- ✅ **Financeiro Avançado**: Cálculo de IRPF/IRPJ e gestão de honorários
- ✅ **Interface Moderna**: UI/UX profissional com Tailwind CSS e shadcn/ui
- ✅ **API RESTful**: Backend robusto com NestJS e documentação Swagger
- ✅ **Segurança**: Autenticação JWT, bcrypt, guards e auditoria

---

## 🚀 Funcionalidades

### 📊 Dashboard
- Visão geral do escritório
- Estatísticas em tempo real
- Processos recentes
- Prazos próximos
- Gráficos e métricas

### 👥 Gestão de Clientes
- Cadastro de pessoas físicas e jurídicas
- Histórico de interações
- Múltiplos endereços
- Tags e categorização
- Timeline de relacionamento

### ⚖️ Gestão de Processos
- Cadastro completo com número CNJ
- Partes e advogados
- Audiências e prazos
- Andamentos processuais
- Análise de IA com probabilidade de êxito
- Base jurídica integrada

### 📄 Documentos
- Upload de PDF, DOCX, imagens
- Versionamento
- Extração de dados por IA
- Vinculação a processos e clientes
- Busca avançada

### 💰 Financeiro
- Gestão de honorários
- Movimentações financeiras
- Centros de custo
- Notas fiscais
- Cálculo de IRPF/IRPJ
- Relatórios consolidados

### ✅ Tarefas e Kanban
- Boards personalizados
- Checklist por tarefa
- Comentários
- Atribuição de responsáveis
- Integração com processos

### 🤖 Assistente de IA Jurídico
- Consultas baseadas em legislação
- Busca semântica em artigos
- Análise de processos
- Sugestões de estratégias
- Geração de resumos

### 📚 Base Jurídica
- Código Civil Brasileiro (99+ artigos)
- Código de Processo Civil (99+ artigos)
- Busca por palavra-chave
- Estrutura hierárquica (livros/títulos/capítulos)
- Artigos relacionados

---

## 🛠️ Tecnologias

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js
- **[Prisma](https://www.prisma.io/)** - ORM moderno
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hash de senhas
- **[Swagger](https://swagger.io/)** - Documentação de API
- **[OpenAI](https://openai.com/)** - Integração com IA

### Frontend
- **[Next.js 14](https://nextjs.org/)** - Framework React
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI
- **[Lucide Icons](https://lucide.dev/)** - Ícones

### DevOps
- **[Docker](https://www.docker.com/)** - Containerização (opcional)
- **[Git](https://git-scm.com/)** - Controle de versão

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 20.x ou superior
- **npm** 9.x ou superior
- **PostgreSQL** 14.x ou superior
- **Git** (para clonar o repositório)

### Verificação

```bash
node --version  # v20.x.x
npm --version   # 9.x.x
psql --version  # PostgreSQL 14.x ou superior
git --version
```

---

## 🚀 Instalação Rápida

### 1. Clone o repositório

```bash
git clone https://github.com/clb-braz/OFFICEBRAIN-JURIS-ENTERPRISE.git
cd OFFICEBRAIN-JURIS-ENTERPRISE
```

### 2. Configure o banco de dados

Crie um banco de dados PostgreSQL:

```sql
CREATE DATABASE officebrain;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 3. Configure as variáveis de ambiente

Copie os arquivos `.env.example` e configure:

```bash
# Backend
cd apps/api
cp .env.example .env
# Edite o .env com suas credenciais

# Frontend
cd ../frontend
cp .env.example .env.local
```

### 4. Instale as dependências

```bash
# Backend
cd apps/api
npm install

# Frontend
cd ../frontend
npm install
```

### 5. Configure o banco de dados

```bash
cd apps/api
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 6. Inicie os servidores

**Terminal 1 - Backend:**
```bash
cd apps/api
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd apps/frontend
npm run dev
```

### 7. Acesse o sistema

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api
- **Swagger**: http://localhost:3001/api/docs

### 8. Login inicial

- **Email**: `admin@officebrain.com.br`
- **Senha**: `OfficeBrain@2024`

---

## ⚙️ Configuração

### Variáveis de Ambiente - Backend (`apps/api/.env`)

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/officebrain?schema=public"

# Server
NODE_ENV=development
PORT=3001

# JWT
JWT_SECRET=seu-jwt-secret-super-seguro-aqui

# OpenAI (opcional - para funcionalidades de IA)
OPENAI_API_KEY=sk-...

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Variáveis de Ambiente - Frontend (`apps/frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 📖 Uso

### Criar um Cliente

1. Acesse **Clientes** no menu lateral
2. Clique em **Novo Cliente**
3. Preencha os dados (PF ou PJ)
4. Salve

### Cadastrar um Processo

1. Acesse **Processos**
2. Clique em **Novo Processo**
3. Preencha número CNJ, tipo de ação, área, etc.
4. Vincule clientes e partes
5. Salve

### Consultar Legislação

1. Acesse um processo
2. Vá para a aba **Base Jurídica**
3. Busque por palavra-chave ou número do artigo
4. Visualize artigos do CC ou CPC

### Usar Assistente de IA

1. Acesse um processo
2. Vá para a aba **Assistente IA**
3. Faça uma pergunta sobre o caso
4. A IA responderá com base na legislação

---

## 📁 Estrutura do Projeto

```
OFFICEBRAIN-JURIS-ENTERPRISE/
├── apps/
│   ├── api/                    # Backend NestJS
│   │   ├── src/
│   │   │   ├── modules/        # Módulos da aplicação
│   │   │   │   ├── auth/       # Autenticação
│   │   │   │   ├── clients/    # Clientes
│   │   │   │   ├── processes/  # Processos
│   │   │   │   ├── documents/  # Documentos
│   │   │   │   ├── finance/    # Financeiro
│   │   │   │   ├── tasks/      # Tarefas
│   │   │   │   ├── legislation/# Legislação
│   │   │   │   └── ai/         # IA
│   │   │   ├── prisma/         # Prisma Service
│   │   │   └── main.ts         # Entry point
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Schema do banco
│   │   │   └── seed.ts         # Seed de dados
│   │   └── package.json
│   │
│   └── frontend/               # Frontend Next.js
│       ├── src/
│       │   ├── app/           # App Router
│       │   ├── components/    # Componentes React
│       │   └── lib/           # Utilitários
│       └── package.json
│
├── database/                   # Scripts SQL
├── docs/                       # Documentação
├── scripts/                    # Scripts auxiliares
├── .gitignore
├── README.md
└── LICENSE
```

---

## 📚 API Documentation

A documentação completa da API está disponível via Swagger:

**URL**: http://localhost:3001/api/docs

### Principais Endpoints

#### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/refresh` - Renovar token
- `GET /api/auth/me` - Dados do usuário

#### Clientes
- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Criar cliente
- `GET /api/clients/:id` - Detalhes do cliente
- `PATCH /api/clients/:id` - Atualizar cliente

#### Processos
- `GET /api/processes` - Listar processos
- `POST /api/processes` - Criar processo
- `GET /api/processes/:id` - Detalhes do processo
- `PATCH /api/processes/:id` - Atualizar processo

#### Legislação
- `GET /api/legislation` - Listar legislações
- `GET /api/legislation/:codigo` - Legislação por código
- `GET /api/legislation/search?q=...` - Buscar artigos
- `GET /api/legislation/:codigo/artigo/:numero` - Artigo específico

---

## 🚢 Deploy

### Deploy em Produção

Consulte o arquivo [DEPLOYMENT.md](./docs/DEPLOYMENT.md) para instruções detalhadas de deploy.

### Opções de Deploy

- **Railway**: Deploy automático via Git
- **Vercel**: Frontend Next.js
- **Heroku**: Backend NestJS
- **VPS**: Deploy manual com Docker

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](./CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

### Processo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para detalhes.

---

## 👥 Autores

- **OfficeBrain Team** - *Desenvolvimento inicial*

---

## 🙏 Agradecimentos

- Comunidade NestJS
- Comunidade Next.js
- Prisma Team
- Todos os contribuidores

---

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/clb-braz/OFFICEBRAIN-JURIS-ENTERPRISE/issues)
- **Email**: suporte@officebrain.com.br

---

<div align="center">

**Desenvolvido com ❤️ para escritórios de advocacia**

⭐ **Se este projeto foi útil, considere dar uma estrela!** ⭐

</div>
