# Contribuindo para OfficeBrain Juris Enterprise

Obrigado por considerar contribuir com o OfficeBrain Juris Enterprise! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Funcionalidades](#sugerir-funcionalidades)

## 📜 Código de Conduta

Este projeto adere a um Código de Conduta. Ao participar, você concorda em manter este código.

## 🚀 Como Contribuir

### Reportar Bugs

Se você encontrou um bug:

1. Verifique se o bug já não foi reportado nas [Issues](https://github.com/clb-braz/OFFICEBRAIN-JURIS-ENTERPRISE/issues)
2. Se não foi reportado, crie uma nova issue com:
   - Título descritivo
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots (se aplicável)
   - Ambiente (OS, versões, etc.)

### Sugerir Funcionalidades

1. Verifique se a funcionalidade já não foi sugerida
2. Crie uma issue com:
   - Título descritivo
   - Descrição detalhada da funcionalidade
   - Casos de uso
   - Benefícios

### Contribuir com Código

1. **Fork o repositório**
2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU-USUARIO/OFFICEBRAIN-JURIS-ENTERPRISE.git
   cd OFFICEBRAIN-JURIS-ENTERPRISE
   ```

3. **Crie uma branch**
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   # ou
   git checkout -b fix/nome-do-bug
   ```

4. **Faça suas alterações**
   - Siga os padrões de código
   - Adicione testes se aplicável
   - Atualize a documentação

5. **Commit suas mudanças**
   ```bash
   git commit -m "feat: adiciona funcionalidade X"
   # ou
   git commit -m "fix: corrige bug Y"
   ```

6. **Push para seu fork**
   ```bash
   git push origin feature/nome-da-funcionalidade
   ```

7. **Abra um Pull Request**

## ⚙️ Configuração do Ambiente

Siga as instruções do [README.md](./README.md) para configurar o ambiente de desenvolvimento.

## 📐 Padrões de Código

### TypeScript

- Use TypeScript estrito
- Evite `any` - use tipos específicos
- Documente funções complexas com JSDoc

### Nomenclatura

- **Variáveis/Funções**: `camelCase`
- **Classes/Interfaces**: `PascalCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Arquivos**: `kebab-case` ou `PascalCase` (componentes React)

### Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (não afeta código)
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

Exemplo:
```bash
git commit -m "feat: adiciona busca avançada de processos"
git commit -m "fix: corrige cálculo de IRPF"
```

### Estrutura de Arquivos

```
modules/
  nome-modulo/
    nome-modulo.module.ts
    nome-modulo.service.ts
    nome-modulo.controller.ts
    dto/
      create-nome.dto.ts
      update-nome.dto.ts
```

## 🔍 Processo de Pull Request

1. **Atualize sua branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout sua-branch
   git rebase main
   ```

2. **Certifique-se de que:**
   - O código compila sem erros
   - Os testes passam (se houver)
   - A documentação está atualizada
   - O código segue os padrões

3. **Abra o Pull Request**
   - Título descritivo
   - Descrição clara do que foi feito
   - Referencie issues relacionadas
   - Adicione screenshots se aplicável

4. **Aguarde revisão**
   - Responda aos comentários
   - Faça ajustes se necessário

## 🐛 Reportar Bugs

Use o template de issue para bugs:

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Reprodução**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [ex: Windows 11]
- Navegador: [ex: Chrome 120]
- Versão: [ex: 2.0.0]
```

## 💡 Sugerir Funcionalidades

Use o template de issue para funcionalidades:

```markdown
**Funcionalidade Proposta**
Descrição clara da funcionalidade.

**Problema que Resolve**
Qual problema esta funcionalidade resolve?

**Solução Proposta**
Como você imagina que deveria funcionar?

**Alternativas Consideradas**
Outras soluções que você considerou.

**Contexto Adicional**
Qualquer outra informação relevante.
```

## ✅ Checklist Antes de Submeter

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (se aplicável)
- [ ] Documentação atualizada
- [ ] Commits seguem o padrão Conventional Commits
- [ ] Branch atualizada com `main`
- [ ] Sem conflitos de merge
- [ ] Código revisado

## 📚 Recursos Adicionais

- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Obrigado por contribuir! 🎉

