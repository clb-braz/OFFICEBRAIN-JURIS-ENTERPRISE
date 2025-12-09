-- Extensões necessárias para o OfficeBrain
-- Este arquivo é executado após a importação do banco

-- Extensão para UUIDs (já deve estar criada, mas garantimos)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extensão pgvector para embeddings e busca semântica
CREATE EXTENSION IF NOT EXISTS vector;

-- Extensão para busca full-text melhorada
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Extensão para emails case-insensitive
CREATE EXTENSION IF NOT EXISTS citext;

-- Verificar se extensões foram criadas
DO $$
BEGIN
    RAISE NOTICE 'Verificando extensões...';
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
        RAISE NOTICE 'pgvector: OK';
    ELSE
        RAISE EXCEPTION 'pgvector não foi instalado!';
    END IF;
END $$;
