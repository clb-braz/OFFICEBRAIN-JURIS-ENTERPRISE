-- Limpar todos os dados do banco
TRUNCATE TABLE "LogAuditoria" CASCADE;
TRUNCATE TABLE "LogIA" CASCADE;
TRUNCATE TABLE "Notificacao" CASCADE;
TRUNCATE TABLE "Comentario" CASCADE;
TRUNCATE TABLE "ChecklistItem" CASCADE;
TRUNCATE TABLE "Tarefa" CASCADE;
TRUNCATE TABLE "CalculoIRPF" CASCADE;
TRUNCATE TABLE "NotaFiscal" CASCADE;
TRUNCATE TABLE "ParcelaHonorario" CASCADE;
TRUNCATE TABLE "MovimentacaoFinanceira" CASCADE;
TRUNCATE TABLE "Honorario" CASCADE;
TRUNCATE TABLE "VersaoDocumento" CASCADE;
TRUNCATE TABLE "Documento" CASCADE;
TRUNCATE TABLE "Prazo" CASCADE;
TRUNCATE TABLE "Audiencia" CASCADE;
TRUNCATE TABLE "AndamentoProcessual" CASCADE;
TRUNCATE TABLE "ProcessoEquipe" CASCADE;
TRUNCATE TABLE "ParteProcesso" CASCADE;
TRUNCATE TABLE "ProcessoCliente" CASCADE;
TRUNCATE TABLE "Processo" CASCADE;
TRUNCATE TABLE "InteracaoCliente" CASCADE;
TRUNCATE TABLE "Endereco" CASCADE;
TRUNCATE TABLE "Cliente" CASCADE;
TRUNCATE TABLE "SessaoLogin" CASCADE;
TRUNCATE TABLE "LogAutomacao" CASCADE;
TRUNCATE TABLE "Automacao" CASCADE;
TRUNCATE TABLE "Usuario" CASCADE;
TRUNCATE TABLE "CentroCusto" CASCADE;

-- Criar usuário admin padrão (senha: admin123)
INSERT INTO "Usuario" (id, email, senha, nome, perfil, ativo, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@officebrain.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4JJXR.gRQ1qY.Vci',
  'Administrador',
  'ADMIN',
  true,
  NOW(),
  NOW()
);

