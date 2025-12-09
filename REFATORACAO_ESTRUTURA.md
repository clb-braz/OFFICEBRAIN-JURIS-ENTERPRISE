# 🔄 REFATORAÇÃO COMPLETA DA ESTRUTURA DO PROJETO

## 📋 OBJETIVO

Separar completamente o projeto em duas aplicações distintas:
1. **Site Público** (`/apps/site`) - Marketing/Landing Page
2. **Painel Interno** (`/apps/app`) - Plataforma Jurídica Completa

---

## 🏗️ NOVA ESTRUTURA

```
OFFICEBRAIN-JURIS-ENTERPRISE/
├── apps/
│   ├── api/              # Backend NestJS (mantido)
│   ├── site/             # Site Público (NOVO)
│   │   ├── app/
│   │   ├── components/
│   │   ├── public/
│   │   └── package.json
│   └── app/              # Painel Interno (NOVO)
│       ├── app/
│       ├── components/
│       ├── middleware.ts
│       └── package.json
└── package.json          # Root (workspace)
```

---

## 🅰️ APLICAÇÃO 1: SITE PÚBLICO (`/apps/site`)

### Tecnologias
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui

### Páginas Obrigatórias
- `/` - Home (landing page premium)
- `/login` - Login (redireciona para `/app/dashboard`)
- `/register` - Registro
- `/forgot-password` - Recuperação de senha
- `/reset-password` - Redefinição de senha

### Seções da Home
1. **Hero Section**
   - Título impactante
   - Subtítulo
   - CTAs: "Começar Agora" e "Conhecer Planos"

2. **Quem Somos**
   - Sobre a empresa
   - Missão e valores

3. **Funcionalidades**
   - Cards premium com ícones
   - Gestão jurídica completa
   - Automação processual
   - IA especializada
   - Financeiro automatizado
   - CRM jurídico
   - Prazos e agenda inteligente
   - Segurança de nível bancário

4. **Demonstração**
   - Vídeo ou screenshots
   - Link para demo

5. **Depoimentos**
   - Placeholder para depoimentos

6. **Como Funciona**
   - Passo a passo visual

7. **Conhecer Planos**
   - Modal com formulário

8. **Rodapé Institucional**
   - Links
   - Contatos
   - Redes sociais
   - Copyright

### Formulário "Conhecer Planos"
- Nome do escritório *
- Nome do advogado *
- E-mail *
- Telefone
- Áreas de atuação (multiselect) *
- Média de novos clientes/mês
- Tamanho da equipe (select)
- Desafios principais (textarea)
- Mensagem opcional (textarea)

**Ação**: Salvar em `Lead` (PostgreSQL) e enviar notificação

---

## 🅱️ APLICAÇÃO 2: PAINEL INTERNO (`/apps/app`)

### Tecnologias
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- NextAuth (autenticação)
- Proteção de rotas

### Rotas Protegidas
Todas as rotas dentro de `/app/*` devem ser protegidas.

### Páginas
- `/app/dashboard` - Dashboard principal
- `/app/clients` - Clientes
- `/app/processes` - Processos
- `/app/finance` - Financeiro
- `/app/documents` - Documentos
- `/app/agenda` - Agenda
- `/app/tasks` - Tarefas
- `/app/ai` - IA Jurídica
- `/app/settings` - Configurações
- `/app/audit` - Auditoria

### Autenticação
- Login tradicional (email + senha)
- Login com Google OAuth
- Redirecionamento automático após login

### Middleware
- Verificar autenticação
- Redirecionar para `/login` se não autenticado
- Proteger todas as rotas `/app/*`

---

## 🔐 SISTEMA DE AUTENTICAÇÃO

### Rotas Públicas (Site)
- `/` - Home
- `/login` - Login
- `/register` - Registro
- `/forgot-password` - Recuperação
- `/reset-password` - Redefinição

### Rotas Protegidas (Painel)
- `/app/*` - Todas protegidas

### Fluxo
1. Usuário acessa site público
2. Clica em "Login"
3. Redirecionado para `/login` (site público)
4. Após login → redirecionado para `/app/dashboard` (painel)

---

## 📊 BANCO DE DADOS

### Modelo Lead (NOVO)
```prisma
model Lead {
  id                    String   @id @default(uuid())
  nomeEscritorio        String
  nomeAdvogado          String
  email                 String
  telefone              String?
  areasAtuacao          String[]
  mediaNovosClientes    Int?
  tamanhoEquipe         String?
  desafiosPrincipais    String?
  mensagem              String?
  status                String   @default("NOVO")
  processado            Boolean  @default(false)
  // ... outros campos
}
```

---

## 🚀 COMANDOS

### Site Público
```bash
cd apps/site
npm install
npm run dev  # Porta 3000
```

### Painel Interno
```bash
cd apps/app
npm install
npm run dev  # Porta 3001
```

### Backend
```bash
cd apps/api
npm install
npm run dev  # Porta 3002
```

---

## ✅ CHECKLIST

- [ ] Criar estrutura `/apps/site`
- [ ] Criar estrutura `/apps/app`
- [ ] Adicionar modelo `Lead` no Prisma
- [ ] Criar API para leads
- [ ] Criar Home page premium
- [ ] Criar formulário "Conhecer Planos"
- [ ] Criar sistema de autenticação
- [ ] Criar middleware de proteção
- [ ] Criar páginas do painel
- [ ] Configurar NextAuth
- [ ] Testar fluxo completo

---

**Status**: Em andamento...

