-- ============================================
-- OfficeBrain Juris Enterprise
-- Inicialização do Banco de Dados
-- Extensões PostgreSQL obrigatórias
-- ============================================

-- Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extensão pgvector para embeddings e busca semântica
CREATE EXTENSION IF NOT EXISTS vector;

-- Extensão para busca full-text melhorada
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Extensão para emails case-insensitive
CREATE EXTENSION IF NOT EXISTS citext;

-- Configurações de performance
ALTER DATABASE officebrain SET timezone TO 'America/Sao_Paulo';
ALTER DATABASE officebrain SET lc_messages TO 'pt_BR.UTF-8';
ALTER DATABASE officebrain SET lc_monetary TO 'pt_BR.UTF-8';
ALTER DATABASE officebrain SET lc_numeric TO 'pt_BR.UTF-8';
ALTER DATABASE officebrain SET lc_time TO 'pt_BR.UTF-8';

-- Log de extensões criadas
DO $$
BEGIN
    RAISE NOTICE 'Extensões PostgreSQL inicializadas com sucesso!';
    RAISE NOTICE '- uuid-ossp: OK';
    RAISE NOTICE '- vector (pgvector): OK';
    RAISE NOTICE '- pg_trgm: OK';
    RAISE NOTICE '- citext: OK';
END $$;

