# Guia de Contribuição

Obrigado por considerar contribuir com o OfficeBrain Juris Enterprise!

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
git clone https://github.com/seu-usuario/OFFICEBRAIN-JURIS-ENTERPRISE.git
cd OFFICEBRAIN-JURIS-ENTERPRISE
```

### 2. Criar Branch

```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

### 3. Desenvolvimento

1. Instale dependências: `npm install`
2. Configure `.env` baseado em `.env.example`
3. Execute migrações: `npm run prisma:migrate`
4. Desenvolva sua feature
5. Execute testes: `npm test`
6. Verifique lint: `npm run lint`

### 4. Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: adiciona validação de CNJ
fix: corrige erro ao criar cliente
docs: atualiza README
test: adiciona testes para processos
refactor: reorganiza estrutura de módulos
```

### 5. Push e Pull Request

```bash
git push origin feature/nova-funcionalidade
```

Depois, abra um Pull Request no GitHub.

## 📋 Checklist

Antes de submeter o PR, certifique-se:

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (`npm test`)
- [ ] Cobertura de testes mantida (>70%)
- [ ] Lint passa (`npm run lint`)
- [ ] Documentação atualizada
- [ ] Commits seguem Conventional Commits

## 🎯 Padrões de Código

### TypeScript

- Use tipos explícitos
- Evite `any`
- Use interfaces para objetos
- Use enums quando apropriado

### NestJS

- Um controller por módulo
- Services para lógica de negócio
- DTOs para validação
- Guards para autenticação/autorização

### Testes

- Teste casos de sucesso
- Teste casos de erro
- Teste validações
- Mantenha cobertura >70%

## 📝 Documentação

- Atualize README se necessário
- Adicione exemplos de uso
- Documente APIs novas
- Atualize CHANGELOG.md

## ❓ Dúvidas?

Abra uma issue no GitHub ou entre em contato!

