--
-- PostgreSQL database dump
--

\restrict EbwFc6a4bEZ0O2AHa4WSShssWSvcWnOCQqFiuv0zOclB07jgkl9Vr8oJB8pfxnS

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

-- Started on 2025-12-08 11:27:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS officebrain;
--
-- TOC entry 5471 (class 1262 OID 16394)
-- Name: officebrain; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE officebrain WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';


ALTER DATABASE officebrain OWNER TO postgres;

\unrestrict EbwFc6a4bEZ0O2AHa4WSShssWSvcWnOCQqFiuv0zOclB07jgkl9Vr8oJB8pfxnS
\connect officebrain
\restrict EbwFc6a4bEZ0O2AHa4WSShssWSvcWnOCQqFiuv0zOclB07jgkl9Vr8oJB8pfxnS

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 21741)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 898 (class 1247 OID 21784)
-- Name: AreaDireito; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AreaDireito" AS ENUM (
    'CIVIL',
    'CONSUMIDOR',
    'FAMILIA',
    'SUCESSOES',
    'TRABALHISTA',
    'EMPRESARIAL',
    'TRIBUTARIO',
    'ADMINISTRATIVO',
    'PENAL',
    'PREVIDENCIARIO'
);


ALTER TYPE public."AreaDireito" OWNER TO postgres;

--
-- TOC entry 934 (class 1247 OID 21942)
-- Name: CategoriaMovimentacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CategoriaMovimentacao" AS ENUM (
    'HONORARIOS',
    'CUSTAS',
    'DEPOSITO_JUDICIAL',
    'PERICIA',
    'DILIGENCIAS',
    'OUTROS'
);


ALTER TYPE public."CategoriaMovimentacao" OWNER TO postgres;

--
-- TOC entry 895 (class 1247 OID 21772)
-- Name: FaseProcessual; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."FaseProcessual" AS ENUM (
    'CONHECIMENTO',
    'EXECUCAO',
    'RECURSOS',
    'CUMPRIMENTO_SENTENCA',
    'ENCERRADO'
);


ALTER TYPE public."FaseProcessual" OWNER TO postgres;

--
-- TOC entry 946 (class 1247 OID 21986)
-- Name: PerfilUsuario; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PerfilUsuario" AS ENUM (
    'ADMIN',
    'SOCIO',
    'ADVOGADO',
    'ESTAGIARIO',
    'FINANCEIRO',
    'SECRETARIA'
);


ALTER TYPE public."PerfilUsuario" OWNER TO postgres;

--
-- TOC entry 922 (class 1247 OID 21904)
-- Name: PrioridadeTarefa; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PrioridadeTarefa" AS ENUM (
    'BAIXA',
    'MEDIA',
    'ALTA',
    'URGENTE'
);


ALTER TYPE public."PrioridadeTarefa" OWNER TO postgres;

--
-- TOC entry 949 (class 1247 OID 22000)
-- Name: RegimeTributario; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RegimeTributario" AS ENUM (
    'SIMPLES_NACIONAL',
    'LUCRO_PRESUMIDO',
    'LUCRO_REAL',
    'MEI'
);


ALTER TYPE public."RegimeTributario" OWNER TO postgres;

--
-- TOC entry 904 (class 1247 OID 21818)
-- Name: StatusAudiencia; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusAudiencia" AS ENUM (
    'AGENDADA',
    'REALIZADA',
    'ADIADA',
    'CANCELADA'
);


ALTER TYPE public."StatusAudiencia" OWNER TO postgres;

--
-- TOC entry 943 (class 1247 OID 21976)
-- Name: StatusAutomacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusAutomacao" AS ENUM (
    'ATIVA',
    'PAUSADA',
    'ERRO',
    'CONCLUIDA'
);


ALTER TYPE public."StatusAutomacao" OWNER TO postgres;

--
-- TOC entry 928 (class 1247 OID 21926)
-- Name: StatusHonorario; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusHonorario" AS ENUM (
    'PENDENTE',
    'PARCIAL',
    'PAGO',
    'CANCELADO'
);


ALTER TYPE public."StatusHonorario" OWNER TO postgres;

--
-- TOC entry 937 (class 1247 OID 21956)
-- Name: StatusMovimentacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusMovimentacao" AS ENUM (
    'PREVISTO',
    'CONFIRMADO',
    'CANCELADO'
);


ALTER TYPE public."StatusMovimentacao" OWNER TO postgres;

--
-- TOC entry 910 (class 1247 OID 21840)
-- Name: StatusPrazo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusPrazo" AS ENUM (
    'PENDENTE',
    'CUMPRIDO',
    'PERDIDO',
    'PRORROGADO'
);


ALTER TYPE public."StatusPrazo" OWNER TO postgres;

--
-- TOC entry 892 (class 1247 OID 21760)
-- Name: StatusProcesso; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusProcesso" AS ENUM (
    'ATIVO',
    'ARQUIVADO',
    'SUSPENSO',
    'BAIXADO',
    'RECURSO'
);


ALTER TYPE public."StatusProcesso" OWNER TO postgres;

--
-- TOC entry 919 (class 1247 OID 21890)
-- Name: StatusTarefa; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusTarefa" AS ENUM (
    'A_FAZER',
    'EM_ANDAMENTO',
    'AGUARDANDO_CLIENTE',
    'AGUARDANDO_TERCEIRO',
    'CONCLUIDO',
    'CANCELADO'
);


ALTER TYPE public."StatusTarefa" OWNER TO postgres;

--
-- TOC entry 907 (class 1247 OID 21828)
-- Name: TipoAudiencia; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoAudiencia" AS ENUM (
    'CONCILIACAO',
    'INSTRUCAO',
    'JULGAMENTO',
    'UNA',
    'VIRTUAL'
);


ALTER TYPE public."TipoAudiencia" OWNER TO postgres;

--
-- TOC entry 940 (class 1247 OID 21964)
-- Name: TipoAutomacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoAutomacao" AS ENUM (
    'NOTIFICACAO_PRAZO',
    'NOTIFICACAO_AUDIENCIA',
    'ATUALIZACAO_PROCESSO',
    'GERACAO_DOCUMENTO',
    'ANALISE_IA'
);


ALTER TYPE public."TipoAutomacao" OWNER TO postgres;

--
-- TOC entry 916 (class 1247 OID 21864)
-- Name: TipoDocumento; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoDocumento" AS ENUM (
    'PETICAO_INICIAL',
    'CONTESTACAO',
    'RECURSO',
    'CONTRATO',
    'PROCURACAO',
    'SUBSTABELECIMENTO',
    'COMPROVANTE',
    'DOCUMENTO_PESSOAL',
    'SENTENCA',
    'ACORDAO',
    'DESPACHO',
    'OUTROS'
);


ALTER TYPE public."TipoDocumento" OWNER TO postgres;

--
-- TOC entry 925 (class 1247 OID 21914)
-- Name: TipoHonorario; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoHonorario" AS ENUM (
    'CONTRATUAL',
    'EXITO',
    'SUCUMBENCIA',
    'CONSULTORIA',
    'AVULSO'
);


ALTER TYPE public."TipoHonorario" OWNER TO postgres;

--
-- TOC entry 931 (class 1247 OID 21936)
-- Name: TipoMovimentacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoMovimentacao" AS ENUM (
    'RECEITA',
    'DESPESA'
);


ALTER TYPE public."TipoMovimentacao" OWNER TO postgres;

--
-- TOC entry 901 (class 1247 OID 21806)
-- Name: TipoParticipacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoParticipacao" AS ENUM (
    'AUTOR',
    'REU',
    'TERCEIRO_INTERESSADO',
    'ASSISTENTE',
    'LITISCONSORTE'
);


ALTER TYPE public."TipoParticipacao" OWNER TO postgres;

--
-- TOC entry 889 (class 1247 OID 21754)
-- Name: TipoPessoa; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoPessoa" AS ENUM (
    'FISICA',
    'JURIDICA'
);


ALTER TYPE public."TipoPessoa" OWNER TO postgres;

--
-- TOC entry 913 (class 1247 OID 21850)
-- Name: TipoPrazo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TipoPrazo" AS ENUM (
    'CONTESTACAO',
    'RECURSO',
    'MANIFESTACAO',
    'CUMPRIMENTO',
    'PAGAMENTO',
    'OUTROS'
);


ALTER TYPE public."TipoPrazo" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 22121)
-- Name: AndamentoProcessual; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AndamentoProcessual" (
    id text NOT NULL,
    "processoId" text NOT NULL,
    data timestamp(3) without time zone NOT NULL,
    descricao text NOT NULL,
    origem text,
    tipo text,
    "categoriaIA" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."AndamentoProcessual" OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 22276)
-- Name: ArtigoEmbedding; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArtigoEmbedding" (
    id text NOT NULL,
    "artigoId" text NOT NULL,
    embedding jsonb,
    modelo text DEFAULT 'text-embedding-3-small'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ArtigoEmbedding" OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 22267)
-- Name: ArtigoLei; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArtigoLei" (
    id text NOT NULL,
    "legislacaoId" text NOT NULL,
    "numeroArtigo" text NOT NULL,
    livro text,
    titulo text,
    capitulo text,
    secao text,
    subsecao text,
    texto text NOT NULL,
    caput text,
    paragrafos text[],
    incisos text[],
    alineas text[],
    vigente boolean DEFAULT true NOT NULL,
    "revogadoPor" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ArtigoLei" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 22129)
-- Name: Audiencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Audiencia" (
    id text NOT NULL,
    "processoId" text NOT NULL,
    tipo public."TipoAudiencia" NOT NULL,
    data timestamp(3) without time zone NOT NULL,
    hora text,
    local text,
    sala text,
    juiz text,
    status public."StatusAudiencia" DEFAULT 'AGENDADA'::public."StatusAudiencia" NOT NULL,
    observacoes text,
    "linkVirtual" text,
    resultado text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Audiencia" OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 22310)
-- Name: Automacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Automacao" (
    id text NOT NULL,
    "workspaceId" text,
    nome text NOT NULL,
    tipo public."TipoAutomacao" NOT NULL,
    descricao text,
    configuracao jsonb,
    status public."StatusAutomacao" DEFAULT 'ATIVA'::public."StatusAutomacao" NOT NULL,
    "ultimoDisparo" timestamp(3) without time zone,
    "proximoDisparo" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Automacao" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 22238)
-- Name: CalculoIRPF; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CalculoIRPF" (
    id text NOT NULL,
    "movimentacaoId" text,
    competencia timestamp(3) without time zone NOT NULL,
    "baseCalculo" numeric(15,2) NOT NULL,
    aliquota double precision NOT NULL,
    deducoes numeric(15,2) DEFAULT 0 NOT NULL,
    "impostoDevido" numeric(15,2) NOT NULL,
    "impostoRetido" numeric(15,2) DEFAULT 0 NOT NULL,
    "impostoPagar" numeric(15,2) NOT NULL,
    "codigoDarf" text,
    "dataVencimento" timestamp(3) without time zone,
    pago boolean DEFAULT false NOT NULL,
    "dataPagamento" timestamp(3) without time zone,
    observacoes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CalculoIRPF" OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 22221)
-- Name: CentroCusto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CentroCusto" (
    id text NOT NULL,
    "workspaceId" text,
    nome text NOT NULL,
    descricao text,
    ativo boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CentroCusto" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 22176)
-- Name: ChecklistItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ChecklistItem" (
    id text NOT NULL,
    "tarefaId" text NOT NULL,
    texto text NOT NULL,
    concluido boolean DEFAULT false NOT NULL,
    ordem integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ChecklistItem" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 22057)
-- Name: Cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cliente" (
    id text NOT NULL,
    "workspaceId" text,
    tipo public."TipoPessoa" NOT NULL,
    nome text NOT NULL,
    "nomeFantasia" text,
    "razaoSocial" text,
    "cpfCnpj" text NOT NULL,
    rg text,
    "dataNascimento" timestamp(3) without time zone,
    email text,
    telefone text,
    celular text,
    profissao text,
    "estadoCivil" text,
    observacoes text,
    tags text[],
    ativo boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Cliente" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 22186)
-- Name: Comentario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comentario" (
    id text NOT NULL,
    "tarefaId" text NOT NULL,
    "autorId" text NOT NULL,
    texto text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Comentario" OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 22249)
-- Name: ConfiguracaoFiscal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ConfiguracaoFiscal" (
    id text NOT NULL,
    ano integer NOT NULL,
    regime public."RegimeTributario" NOT NULL,
    "faixasIRPF" jsonb,
    "aliquotaISS" double precision DEFAULT 5.0 NOT NULL,
    "aliquotaIRPJ" double precision,
    "aliquotaCSLL" double precision,
    "aliquotaPIS" double precision,
    "aliquotaCOFINS" double precision,
    "limiteSimples" numeric(15,2),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ConfiguracaoFiscal" OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 22336)
-- Name: ConfiguracaoIA; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ConfiguracaoIA" (
    id text NOT NULL,
    "workspaceId" text NOT NULL,
    "modeloPrincipal" text DEFAULT 'gpt-4o'::text NOT NULL,
    "modeloEmbedding" text DEFAULT 'text-embedding-3-small'::text NOT NULL,
    temperatura double precision DEFAULT 0.3 NOT NULL,
    "maxTokens" integer DEFAULT 4000 NOT NULL,
    "apiKey" text,
    "limiteUsoDiario" integer,
    "usoHoje" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ConfiguracaoIA" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 22148)
-- Name: Documento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Documento" (
    id text NOT NULL,
    "workspaceId" text,
    nome text NOT NULL,
    tipo public."TipoDocumento" NOT NULL,
    descricao text,
    "arquivoUrl" text NOT NULL,
    "arquivoPath" text,
    "tamanhoBytes" integer,
    "mimeType" text,
    versao integer DEFAULT 1 NOT NULL,
    "processoId" text,
    "clienteId" text,
    "uploadPorId" text,
    "partesExtraidas" text[],
    "valoresExtraidos" text[],
    "datasExtraidas" text[],
    "resumoIA" text,
    "textoCompleto" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Documento" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 22066)
-- Name: Endereco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Endereco" (
    id text NOT NULL,
    "clienteId" text NOT NULL,
    tipo text DEFAULT 'RESIDENCIAL'::text NOT NULL,
    cep text NOT NULL,
    logradouro text NOT NULL,
    numero text NOT NULL,
    complemento text,
    bairro text NOT NULL,
    cidade text NOT NULL,
    uf text NOT NULL,
    principal boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Endereco" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 22194)
-- Name: Honorario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Honorario" (
    id text NOT NULL,
    "workspaceId" text,
    tipo public."TipoHonorario" NOT NULL,
    descricao text NOT NULL,
    valor numeric(15,2) NOT NULL,
    "percentualExito" double precision,
    status public."StatusHonorario" DEFAULT 'PENDENTE'::public."StatusHonorario" NOT NULL,
    "processoId" text,
    "clienteId" text NOT NULL,
    "advogadoId" text,
    "centroCustoId" text,
    "dataVencimento" timestamp(3) without time zone,
    "dataPagamento" timestamp(3) without time zone,
    "valorPago" numeric(15,2),
    "formaPagamento" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Honorario" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 22076)
-- Name: InteracaoCliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InteracaoCliente" (
    id text NOT NULL,
    "clienteId" text NOT NULL,
    tipo text NOT NULL,
    descricao text NOT NULL,
    data timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."InteracaoCliente" OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 22293)
-- Name: Jurisprudencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Jurisprudencia" (
    id text NOT NULL,
    tribunal text NOT NULL,
    tipo text NOT NULL,
    numero text NOT NULL,
    relator text,
    "dataJulgamento" timestamp(3) without time zone,
    "dataPublicacao" timestamp(3) without time zone,
    ementa text NOT NULL,
    "textoCompleto" text,
    temas text[],
    "palavrasChave" text[],
    referencias text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Jurisprudencia" OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 22301)
-- Name: JurisprudenciaEmbedding; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."JurisprudenciaEmbedding" (
    id text NOT NULL,
    "jurisprudenciaId" text NOT NULL,
    embedding jsonb,
    modelo text DEFAULT 'text-embedding-3-small'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."JurisprudenciaEmbedding" OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 22258)
-- Name: Legislacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Legislacao" (
    id text NOT NULL,
    codigo text NOT NULL,
    nome text NOT NULL,
    descricao text,
    "dataPublicacao" timestamp(3) without time zone,
    vigente boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Legislacao" OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 22349)
-- Name: LogAuditoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LogAuditoria" (
    id text NOT NULL,
    "usuarioId" text,
    acao text NOT NULL,
    entidade text NOT NULL,
    "entidadeId" text,
    "dadosAntigos" jsonb,
    "dadosNovos" jsonb,
    ip text,
    "userAgent" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."LogAuditoria" OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 22319)
-- Name: LogAutomacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LogAutomacao" (
    id text NOT NULL,
    "automacaoId" text NOT NULL,
    sucesso boolean NOT NULL,
    mensagem text,
    dados jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."LogAutomacao" OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 22327)
-- Name: LogIA; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LogIA" (
    id text NOT NULL,
    tipo text NOT NULL,
    modelo text NOT NULL,
    input text NOT NULL,
    output text,
    "tokensInput" integer,
    "tokensOutput" integer,
    "custoEstimado" numeric(10,6),
    "latenciaMs" integer,
    sucesso boolean DEFAULT true NOT NULL,
    erro text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."LogIA" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 22212)
-- Name: MovimentacaoFinanceira; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MovimentacaoFinanceira" (
    id text NOT NULL,
    "workspaceId" text,
    tipo public."TipoMovimentacao" NOT NULL,
    categoria public."CategoriaMovimentacao" NOT NULL,
    descricao text NOT NULL,
    valor numeric(15,2) NOT NULL,
    data timestamp(3) without time zone NOT NULL,
    status public."StatusMovimentacao" DEFAULT 'PREVISTO'::public."StatusMovimentacao" NOT NULL,
    comprovante text,
    "processoId" text,
    "clienteId" text,
    "centroCustoId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MovimentacaoFinanceira" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 22230)
-- Name: NotaFiscal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NotaFiscal" (
    id text NOT NULL,
    "honorarioId" text NOT NULL,
    numero text NOT NULL,
    serie text,
    "dataEmissao" timestamp(3) without time zone NOT NULL,
    "valorTotal" numeric(15,2) NOT NULL,
    "valorIss" numeric(15,2),
    "valorIr" numeric(15,2),
    "arquivoUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."NotaFiscal" OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 22357)
-- Name: Notificacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notificacao" (
    id text NOT NULL,
    "workspaceId" text,
    "usuarioId" text NOT NULL,
    titulo text NOT NULL,
    mensagem text NOT NULL,
    tipo text NOT NULL,
    lida boolean DEFAULT false NOT NULL,
    link text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notificacao" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 22203)
-- Name: ParcelaHonorario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ParcelaHonorario" (
    id text NOT NULL,
    "honorarioId" text NOT NULL,
    numero integer NOT NULL,
    valor numeric(15,2) NOT NULL,
    vencimento timestamp(3) without time zone NOT NULL,
    pago boolean DEFAULT false NOT NULL,
    "dataPago" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ParcelaHonorario" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 22105)
-- Name: ParteProcesso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ParteProcesso" (
    id text NOT NULL,
    "processoId" text NOT NULL,
    nome text NOT NULL,
    "cpfCnpj" text,
    tipo public."TipoParticipacao" NOT NULL,
    advogado text,
    "oabAdvogado" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ParteProcesso" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 22138)
-- Name: Prazo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Prazo" (
    id text NOT NULL,
    "processoId" text NOT NULL,
    tipo public."TipoPrazo" NOT NULL,
    descricao text NOT NULL,
    "dataLimite" timestamp(3) without time zone NOT NULL,
    "dataCumprido" timestamp(3) without time zone,
    status public."StatusPrazo" DEFAULT 'PENDENTE'::public."StatusPrazo" NOT NULL,
    "responsavelId" text,
    prioridade public."PrioridadeTarefa" DEFAULT 'MEDIA'::public."PrioridadeTarefa" NOT NULL,
    observacoes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Prazo" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 22085)
-- Name: Processo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Processo" (
    id text NOT NULL,
    "workspaceId" text,
    "numeroCnj" text NOT NULL,
    "numeroAntigo" text,
    "tipoAcao" text NOT NULL,
    "classeProcessual" text,
    "assuntoPrincipal" text,
    area public."AreaDireito" NOT NULL,
    status public."StatusProcesso" DEFAULT 'ATIVO'::public."StatusProcesso" NOT NULL,
    fase public."FaseProcessual" DEFAULT 'CONHECIMENTO'::public."FaseProcessual" NOT NULL,
    vara text,
    foro text,
    comarca text,
    uf text,
    tribunal text,
    instancia integer DEFAULT 1 NOT NULL,
    "valorCausa" numeric(15,2),
    "valorCondenacao" numeric(15,2),
    "objetoAcao" text,
    "dataDistribuicao" timestamp(3) without time zone,
    "dataCitacao" timestamp(3) without time zone,
    "dataSentenca" timestamp(3) without time zone,
    "dataTransitoJulgado" timestamp(3) without time zone,
    "resumoIA" text,
    "riscosIdentificados" text[],
    "probabilidadeExito" double precision,
    "pontosAtencao" text[],
    "estrategiaSugerida" text,
    "artigosRelacionados" text[],
    "advogadoResponsavelId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Processo" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 22096)
-- Name: ProcessoCliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProcessoCliente" (
    id text NOT NULL,
    "processoId" text NOT NULL,
    "clienteId" text NOT NULL,
    participacao public."TipoParticipacao" NOT NULL,
    principal boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProcessoCliente" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 22113)
-- Name: ProcessoEquipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProcessoEquipe" (
    id text NOT NULL,
    "processoId" text NOT NULL,
    "usuarioId" text NOT NULL,
    funcao text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProcessoEquipe" OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 22285)
-- Name: ReferenciaJuridica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReferenciaJuridica" (
    id text NOT NULL,
    "processoId" text NOT NULL,
    "artigoId" text NOT NULL,
    contexto text,
    relevancia double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ReferenciaJuridica" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 22048)
-- Name: RefreshToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RefreshToken" (
    id text NOT NULL,
    "usuarioId" text NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    revogado boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."RefreshToken" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 22040)
-- Name: SessaoLogin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SessaoLogin" (
    id text NOT NULL,
    "usuarioId" text NOT NULL,
    token text NOT NULL,
    ip text,
    "userAgent" text,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SessaoLogin" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 22165)
-- Name: Tarefa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tarefa" (
    id text NOT NULL,
    "workspaceId" text,
    titulo text NOT NULL,
    descricao text,
    status public."StatusTarefa" DEFAULT 'A_FAZER'::public."StatusTarefa" NOT NULL,
    prioridade public."PrioridadeTarefa" DEFAULT 'MEDIA'::public."PrioridadeTarefa" NOT NULL,
    "dataLimite" timestamp(3) without time zone,
    "dataConclusao" timestamp(3) without time zone,
    ordem integer DEFAULT 0 NOT NULL,
    etiquetas text[],
    "processoId" text,
    "clienteId" text,
    "responsavelId" text,
    "criadorId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tarefa" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 22029)
-- Name: Usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Usuario" (
    id text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    nome text NOT NULL,
    oab text,
    telefone text,
    perfil public."PerfilUsuario" DEFAULT 'ADVOGADO'::public."PerfilUsuario" NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    "avatarUrl" text,
    "emailVerificado" boolean DEFAULT false NOT NULL,
    "ultimoLogin" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 22157)
-- Name: VersaoDocumento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VersaoDocumento" (
    id text NOT NULL,
    "documentoId" text NOT NULL,
    versao integer NOT NULL,
    "arquivoUrl" text NOT NULL,
    alteracoes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."VersaoDocumento" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 22009)
-- Name: Workspace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Workspace" (
    id text NOT NULL,
    nome text NOT NULL,
    slug text NOT NULL,
    cnpj text,
    logo text,
    endereco text,
    telefone text,
    email text,
    site text,
    "regimeTributario" public."RegimeTributario" DEFAULT 'SIMPLES_NACIONAL'::public."RegimeTributario" NOT NULL,
    configuracoes jsonb,
    ativo boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Workspace" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 22019)
-- Name: WorkspaceMembro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WorkspaceMembro" (
    id text NOT NULL,
    "workspaceId" text NOT NULL,
    "usuarioId" text NOT NULL,
    funcao public."PerfilUsuario" DEFAULT 'ADVOGADO'::public."PerfilUsuario" NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."WorkspaceMembro" OWNER TO postgres;

--
-- TOC entry 5439 (class 0 OID 22121)
-- Dependencies: 228
-- Data for Name: AndamentoProcessual; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5456 (class 0 OID 22276)
-- Dependencies: 245
-- Data for Name: ArtigoEmbedding; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5455 (class 0 OID 22267)
-- Dependencies: 244
-- Data for Name: ArtigoLei; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ArtigoLei" VALUES ('de23209c-6e1d-4efc-8863-ed51d85769cc', 'ed747b46-325f-4189-bea7-4c784a35e91e', '1', 'Parte Geral', 'Das Pessoas Naturais', 'Da Personalidade e da Capacidade', NULL, NULL, 'Toda pessoa e capaz de direitos e deveres na ordem civil.', 'Toda pessoa e capaz de direitos e deveres na ordem civil.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.11', '2025-12-07 20:03:07.11') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('890b9fef-d668-41ae-b1aa-23b70df6c00d', 'ed747b46-325f-4189-bea7-4c784a35e91e', '2', 'Parte Geral', 'Das Pessoas Naturais', 'Da Personalidade e da Capacidade', NULL, NULL, 'A personalidade civil da pessoa comeca do nascimento com vida; mas a lei poe a salvo, desde a concepcao, os direitos do nascituro.', 'A personalidade civil da pessoa comeca do nascimento com vida; mas a lei poe a salvo, desde a concepcao, os direitos do nascituro.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.111', '2025-12-07 20:03:07.111') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('b4642df8-0b32-4f6d-aead-30a9fca319a6', 'ed747b46-325f-4189-bea7-4c784a35e91e', '3', 'Parte Geral', 'Das Pessoas Naturais', 'Da Personalidade e da Capacidade', NULL, NULL, 'Sao absolutamente incapazes de exercer pessoalmente os atos da vida civil os menores de 16 (dezesseis) anos.', 'Sao absolutamente incapazes de exercer pessoalmente os atos da vida civil os menores de 16 (dezesseis) anos.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.112', '2025-12-07 20:03:07.112') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('6f8dbc5b-5c60-4500-acb5-65d5553951f7', 'ed747b46-325f-4189-bea7-4c784a35e91e', '4', 'Parte Geral', 'Das Pessoas Naturais', 'Da Personalidade e da Capacidade', NULL, NULL, 'Sao incapazes, relativamente a certos atos ou a maneira de os exercer: I - os maiores de dezesseis e menores de dezoito anos; II - os ebrios habituais e os viciados em toxico; III - aqueles que, por causa transitoria ou permanente, nao puderem exprimir sua vontade; IV - os prodigos.', 'Sao incapazes, relativamente a certos atos ou a maneira de os exercer: I - os maiores de dezesseis e menores de dezoito anos; II - os ebrios habituais e os viciados em toxico; III - aqueles que, por causa transitoria ou permanente, nao puderem exprimir sua vontade; IV - os prodigos.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.112', '2025-12-07 20:03:07.112') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('eb0fba0a-d807-405d-a480-7ebfa6e925a7', 'ed747b46-325f-4189-bea7-4c784a35e91e', '5', 'Parte Geral', 'Das Pessoas Naturais', 'Da Personalidade e da Capacidade', NULL, NULL, 'A menoridade cessa aos dezoito anos completos, quando a pessoa fica habilitada a pratica de todos os atos da vida civil.', 'A menoridade cessa aos dezoito anos completos, quando a pessoa fica habilitada a pratica de todos os atos da vida civil.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.113', '2025-12-07 20:03:07.113') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('b9ecebfa-d4fd-46ac-a4bf-c0e25d17ae8d', 'ed747b46-325f-4189-bea7-4c784a35e91e', '11', 'Parte Geral', 'Das Pessoas Naturais', 'Dos Direitos da Personalidade', NULL, NULL, 'Com excecao dos casos previstos em lei, os direitos da personalidade sao intransmissiveis e irrenunciaveis, nao podendo o seu exercicio sofrer limitacao voluntaria.', 'Com excecao dos casos previstos em lei, os direitos da personalidade sao intransmissiveis e irrenunciaveis, nao podendo o seu exercicio sofrer limitacao voluntaria.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.113', '2025-12-07 20:03:07.113') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('693650c9-702c-42e6-8aa3-8b079664891b', 'ed747b46-325f-4189-bea7-4c784a35e91e', '12', 'Parte Geral', 'Das Pessoas Naturais', 'Dos Direitos da Personalidade', NULL, NULL, 'Pode-se exigir que cesse a ameaca, ou a lesao, a direito da personalidade, e reclamar perdas e danos, sem prejuizo de outras sancoes previstas em lei.', 'Pode-se exigir que cesse a ameaca, ou a lesao, a direito da personalidade, e reclamar perdas e danos, sem prejuizo de outras sancoes previstas em lei.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.114', '2025-12-07 20:03:07.114') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('3e298752-7db2-410b-97fd-b4f2d539670a', 'ed747b46-325f-4189-bea7-4c784a35e91e', '13', 'Parte Geral', 'Das Pessoas Naturais', 'Dos Direitos da Personalidade', NULL, NULL, 'Salvo por exigencia medica, e defeso o ato de disposicao do proprio corpo, quando importar diminuicao permanente da integridade fisica, ou contrariar os bons costumes.', 'Salvo por exigencia medica, e defeso o ato de disposicao do proprio corpo, quando importar diminuicao permanente da integridade fisica, ou contrariar os bons costumes.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.114', '2025-12-07 20:03:07.114') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('aebb46db-c71d-4f51-afd0-a04ca1c587bf', 'ed747b46-325f-4189-bea7-4c784a35e91e', '17', 'Parte Geral', 'Das Pessoas Naturais', 'Dos Direitos da Personalidade', NULL, NULL, 'O nome da pessoa nao pode ser empregado por outrem em publicacoes ou representacoes que a exponham ao desprezo publico, ainda quando nao haja intencao difamatoria.', 'O nome da pessoa nao pode ser empregado por outrem em publicacoes ou representacoes que a exponham ao desprezo publico, ainda quando nao haja intencao difamatoria.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.115', '2025-12-07 20:03:07.115') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('39097e1e-9f19-4b8a-8e57-f5586b51a0b6', 'ed747b46-325f-4189-bea7-4c784a35e91e', '20', 'Parte Geral', 'Das Pessoas Naturais', 'Dos Direitos da Personalidade', NULL, NULL, 'Salvo se autorizadas, ou se necessarias a administracao da justica ou a manutencao da ordem publica, a divulgacao de escritos, a transmissao da palavra, ou a publicacao, a exposicao ou a utilizacao da imagem de uma pessoa poderao ser proibidas, a seu requerimento e sem prejuizo da indenizacao que couber, se lhe atingirem a honra, a boa fama ou a respeitabilidade, ou se se destinarem a fins comerciais.', 'Salvo se autorizadas, ou se necessarias a administracao da justica ou a manutencao da ordem publica, a divulgacao de escritos, a transmissao da palavra, ou a publicacao, a exposicao ou a utilizacao da imagem de uma pessoa poderao ser proibidas, a seu requerimento e sem prejuizo da indenizacao que couber, se lhe atingirem a honra, a boa fama ou a respeitabilidade, ou se se destinarem a fins comerciais.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.115', '2025-12-07 20:03:07.115') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('3aa575de-af7d-4f53-93e1-1f4f4038baf1', 'ed747b46-325f-4189-bea7-4c784a35e91e', '104', 'Parte Geral', 'Dos Fatos Juridicos', 'Do Negocio Juridico', NULL, NULL, 'A validade do negocio juridico requer: I - agente capaz; II - objeto licito, possivel, determinado ou determinavel; III - forma prescrita ou nao defesa em lei.', 'A validade do negocio juridico requer: I - agente capaz; II - objeto licito, possivel, determinado ou determinavel; III - forma prescrita ou nao defesa em lei.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.115', '2025-12-07 20:03:07.115') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('87236bfb-c224-4a19-9963-b160da89a925', 'ed747b46-325f-4189-bea7-4c784a35e91e', '105', 'Parte Geral', 'Dos Fatos Juridicos', 'Do Negocio Juridico', NULL, NULL, 'A incapacidade relativa de uma das partes nao pode ser invocada pela outra em beneficio proprio, nem aproveita aos co-interessados capazes, salvo se, neste caso, for indivisivel o objeto do direito ou da obrigacao comum.', 'A incapacidade relativa de uma das partes nao pode ser invocada pela outra em beneficio proprio, nem aproveita aos co-interessados capazes, salvo se, neste caso, for indivisivel o objeto do direito ou da obrigacao comum.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.116', '2025-12-07 20:03:07.116') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('ac0f4cff-a09d-48c0-94a5-a50d80803872', 'ed747b46-325f-4189-bea7-4c784a35e91e', '107', 'Parte Geral', 'Dos Fatos Juridicos', 'Do Negocio Juridico', NULL, NULL, 'A validade da declaracao de vontade nao dependera de forma especial, senao quando a lei expressamente a exigir.', 'A validade da declaracao de vontade nao dependera de forma especial, senao quando a lei expressamente a exigir.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.116', '2025-12-07 20:03:07.116') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('4468f4f7-717c-49af-b4b0-f8ce5f52b964', 'ed747b46-325f-4189-bea7-4c784a35e91e', '110', 'Parte Geral', 'Dos Fatos Juridicos', 'Do Negocio Juridico', NULL, NULL, 'A manifestacao de vontade subsiste ainda que o seu autor haja feito a reserva mental de nao querer o que manifestou, salvo se dela o destinatario tinha conhecimento.', 'A manifestacao de vontade subsiste ainda que o seu autor haja feito a reserva mental de nao querer o que manifestou, salvo se dela o destinatario tinha conhecimento.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.117', '2025-12-07 20:03:07.117') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('8b5632d9-e8aa-40cc-8caa-da031be72721', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '3', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'Nao se excluira da apreciacao jurisdicional ameaca ou lesao a direito.', 'Nao se excluira da apreciacao jurisdicional ameaca ou lesao a direito.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.137', '2025-12-07 20:03:07.137') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('8c5eca5e-290e-42ff-ae7c-06e4d51b0f4b', 'ed747b46-325f-4189-bea7-4c784a35e91e', '138', 'Parte Geral', 'Dos Fatos Juridicos', 'Dos Defeitos do Negocio Juridico', NULL, NULL, 'Sao anulaveis os negocios juridicos, quando as declaracoes de vontade emanarem de erro substancial que poderia ser percebido por pessoa de diligencia normal, em face das circunstancias do negocio.', 'Sao anulaveis os negocios juridicos, quando as declaracoes de vontade emanarem de erro substancial que poderia ser percebido por pessoa de diligencia normal, em face das circunstancias do negocio.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.117', '2025-12-07 20:03:07.117') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('cd05924c-e9cb-4582-b70f-ce60f34aa8a1', 'ed747b46-325f-4189-bea7-4c784a35e91e', '145', 'Parte Geral', 'Dos Fatos Juridicos', 'Dos Defeitos do Negocio Juridico', NULL, NULL, 'Sao os negocios juridicos anulaveis por dolo, quando este for a sua causa.', 'Sao os negocios juridicos anulaveis por dolo, quando este for a sua causa.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.118', '2025-12-07 20:03:07.118') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('61f9b7fe-a532-45ab-85ae-c53c1fafee4f', 'ed747b46-325f-4189-bea7-4c784a35e91e', '151', 'Parte Geral', 'Dos Fatos Juridicos', 'Dos Defeitos do Negocio Juridico', NULL, NULL, 'A coacao, para viciar a declaracao da vontade, ha de ser tal que incuta ao paciente fundado temor de dano iminente e consideravel a sua pessoa, a sua familia, ou aos seus bens.', 'A coacao, para viciar a declaracao da vontade, ha de ser tal que incuta ao paciente fundado temor de dano iminente e consideravel a sua pessoa, a sua familia, ou aos seus bens.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.119', '2025-12-07 20:03:07.119') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('6657c13d-801f-450b-b498-e08bd9aaae57', 'ed747b46-325f-4189-bea7-4c784a35e91e', '157', 'Parte Geral', 'Dos Fatos Juridicos', 'Dos Defeitos do Negocio Juridico', NULL, NULL, 'Ocorre a lesao quando uma pessoa, sob premente necessidade, ou por inexperiencia, se obriga a prestacao manifestamente desproporcional ao valor da prestacao oposta.', 'Ocorre a lesao quando uma pessoa, sob premente necessidade, ou por inexperiencia, se obriga a prestacao manifestamente desproporcional ao valor da prestacao oposta.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.119', '2025-12-07 20:03:07.119') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('08e66941-dd08-4e40-b276-61b5f4491309', 'ed747b46-325f-4189-bea7-4c784a35e91e', '186', 'Parte Geral', 'Dos Atos Ilicitos', 'Dos Atos Ilicitos', NULL, NULL, 'Aquele que, por acao ou omissao voluntaria, negligencia ou imprudencia, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilicito.', 'Aquele que, por acao ou omissao voluntaria, negligencia ou imprudencia, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilicito.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.12', '2025-12-07 20:03:07.12') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('5faacc24-ca93-44d3-b28a-e5ac8cb8a0a0', 'ed747b46-325f-4189-bea7-4c784a35e91e', '187', 'Parte Geral', 'Dos Atos Ilicitos', 'Dos Atos Ilicitos', NULL, NULL, 'Tambem comete ato ilicito o titular de um direito que, ao exerce-lo, excede manifestamente os limites impostos pelo seu fim economico ou social, pela boa-fe ou pelos bons costumes.', 'Tambem comete ato ilicito o titular de um direito que, ao exerce-lo, excede manifestamente os limites impostos pelo seu fim economico ou social, pela boa-fe ou pelos bons costumes.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.12', '2025-12-07 20:03:07.12') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('e259ab46-2540-4361-b08a-60feff408cbd', 'ed747b46-325f-4189-bea7-4c784a35e91e', '188', 'Parte Geral', 'Dos Atos Ilicitos', 'Dos Atos Ilicitos', NULL, NULL, 'Nao constituem atos ilicitos: I - os praticados em legitima defesa ou no exercicio regular de um direito reconhecido; II - a deterioracao ou destruicao da coisa alheia, ou a lesao a pessoa, a fim de remover perigo iminente.', 'Nao constituem atos ilicitos: I - os praticados em legitima defesa ou no exercicio regular de um direito reconhecido; II - a deterioracao ou destruicao da coisa alheia, ou a lesao a pessoa, a fim de remover perigo iminente.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.12', '2025-12-07 20:03:07.12') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('fd99b1e5-fe70-475b-a2db-07e0914c9996', 'ed747b46-325f-4189-bea7-4c784a35e91e', '189', 'Parte Geral', 'Da Prescricao e da Decadencia', 'Da Prescricao', NULL, NULL, 'Violado o direito, nasce para o titular a pretensao, a qual se extingue, pela prescricao, nos prazos a que aludem os arts. 205 e 206.', 'Violado o direito, nasce para o titular a pretensao, a qual se extingue, pela prescricao, nos prazos a que aludem os arts. 205 e 206.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.121', '2025-12-07 20:03:07.121') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('97e2de68-eaf2-44f9-b748-113942778347', 'ed747b46-325f-4189-bea7-4c784a35e91e', '190', 'Parte Geral', 'Da Prescricao e da Decadencia', 'Da Prescricao', NULL, NULL, 'A excecao prescreve no mesmo prazo em que a pretensao.', 'A excecao prescreve no mesmo prazo em que a pretensao.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.121', '2025-12-07 20:03:07.121') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('658dbe46-5f77-4a68-b495-9662c3453296', 'ed747b46-325f-4189-bea7-4c784a35e91e', '205', 'Parte Geral', 'Da Prescricao e da Decadencia', 'Dos Prazos da Prescricao', NULL, NULL, 'A prescricao ocorre em dez anos, quando a lei nao lhe haja fixado prazo menor.', 'A prescricao ocorre em dez anos, quando a lei nao lhe haja fixado prazo menor.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.122', '2025-12-07 20:03:07.122') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('b6858fd9-ce53-4fe2-8921-7f16a704c58b', 'ed747b46-325f-4189-bea7-4c784a35e91e', '206', 'Parte Geral', 'Da Prescricao e da Decadencia', 'Dos Prazos da Prescricao', NULL, NULL, 'Prescreve: §1o Em um ano: I - a pretensao dos hospedeiros ou fornecedores de viveres destinados a consumo no proprio estabelecimento, para o pagamento da hospedagem ou dos alimentos; II - a pretensao do segurado contra o segurador, ou a deste contra aquele, contado o prazo: a) para o segurado, no caso de seguro de responsabilidade civil, da data em que e citado para responder a acao de indenizacao proposta pelo terceiro prejudicado, ou da data que a este indeniza, com a anuencia do segurador; b) quanto aos demais seguros, da ciencia do fato gerador da pretensao.', 'Prescreve: §1o Em um ano: I - a pretensao dos hospedeiros ou fornecedores de viveres destinados a consumo no proprio estabelecimento, para o pagamento da hospedagem ou dos alimentos; II - a pretensao do segurado contra o segurador, ou a deste contra aquele, contado o prazo: a) para o segurado, no caso de seguro de responsabilidade civil, da data em que e citado para responder a acao de indenizacao proposta pelo terceiro prejudicado, ou da data que a este indeniza, com a anuencia do segurador; b) quanto aos demais seguros, da ciencia do fato gerador da pretensao.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.122', '2025-12-07 20:03:07.122') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('4ba380a1-415c-4f24-8412-aefa8cb47baf', 'ed747b46-325f-4189-bea7-4c784a35e91e', '233', 'Parte Especial', 'Do Direito das Obrigacoes', 'Das Obrigacoes de Dar', NULL, NULL, 'A obrigacao de dar coisa certa abrange os acessorios dela embora nao mencionados, salvo se o contrario resultar do titulo ou das circunstancias do caso.', 'A obrigacao de dar coisa certa abrange os acessorios dela embora nao mencionados, salvo se o contrario resultar do titulo ou das circunstancias do caso.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.123', '2025-12-07 20:03:07.123') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('d32bb3c8-def9-4e68-929b-7a6041510346', 'ed747b46-325f-4189-bea7-4c784a35e91e', '234', 'Parte Especial', 'Do Direito das Obrigacoes', 'Das Obrigacoes de Dar', NULL, NULL, 'Se, no caso do artigo antecedente, a coisa se perder, sem culpa do devedor, antes da tradicao, ou pendente a condicao suspensiva, fica resolvida a obrigacao para ambas as partes; se a perda resultar de culpa do devedor, respondera este pelo equivalente e mais perdas e danos.', 'Se, no caso do artigo antecedente, a coisa se perder, sem culpa do devedor, antes da tradicao, ou pendente a condicao suspensiva, fica resolvida a obrigacao para ambas as partes; se a perda resultar de culpa do devedor, respondera este pelo equivalente e mais perdas e danos.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.123', '2025-12-07 20:03:07.123') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('8bd9ff51-e724-413f-ae27-9a36ef7d2331', 'ed747b46-325f-4189-bea7-4c784a35e91e', '247', 'Parte Especial', 'Do Direito das Obrigacoes', 'Das Obrigacoes de Fazer', NULL, NULL, 'Incorre na obrigacao de indenizar perdas e danos o devedor que recusar a prestacao a ele so imposta, ou so por ele exequivel.', 'Incorre na obrigacao de indenizar perdas e danos o devedor que recusar a prestacao a ele so imposta, ou so por ele exequivel.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.124', '2025-12-07 20:03:07.124') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('0c75db46-a1dc-4ac9-8a17-0fef6376cc89', 'ed747b46-325f-4189-bea7-4c784a35e91e', '249', 'Parte Especial', 'Do Direito das Obrigacoes', 'Das Obrigacoes de Fazer', NULL, NULL, 'Se o fato puder ser executado por terceiro, sera livre ao credor manda-lo executar a custa do devedor, havendo recusa ou mora deste, sem prejuizo da indenizacao cabivel.', 'Se o fato puder ser executado por terceiro, sera livre ao credor manda-lo executar a custa do devedor, havendo recusa ou mora deste, sem prejuizo da indenizacao cabivel.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.125', '2025-12-07 20:03:07.125') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('613c772a-ca92-42ce-afbd-96419d25fe66', 'ed747b46-325f-4189-bea7-4c784a35e91e', '389', 'Parte Especial', 'Do Direito das Obrigacoes', 'Do Inadimplemento das Obrigacoes', NULL, NULL, 'Nao cumprida a obrigacao, responde o devedor por perdas e danos, mais juros e atualizacao monetaria segundo indices oficiais regularmente estabelecidos, e honorarios de advogado.', 'Nao cumprida a obrigacao, responde o devedor por perdas e danos, mais juros e atualizacao monetaria segundo indices oficiais regularmente estabelecidos, e honorarios de advogado.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.125', '2025-12-07 20:03:07.125') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('61b994e9-b2a9-4a14-876d-b206fa5e1f23', 'ed747b46-325f-4189-bea7-4c784a35e91e', '390', 'Parte Especial', 'Do Direito das Obrigacoes', 'Do Inadimplemento das Obrigacoes', NULL, NULL, 'Nas obrigacoes negativas o devedor e havido por inadimplente desde o dia em que executou o ato de que se devia abster.', 'Nas obrigacoes negativas o devedor e havido por inadimplente desde o dia em que executou o ato de que se devia abster.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.126', '2025-12-07 20:03:07.126') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('a7091fe7-4880-4181-a54b-f1401c9c4c97', 'ed747b46-325f-4189-bea7-4c784a35e91e', '394', 'Parte Especial', 'Do Direito das Obrigacoes', 'Da Mora', NULL, NULL, 'Considera-se em mora o devedor que nao efetuar o pagamento e o credor que nao quiser recebe-lo no tempo, lugar e forma que a lei ou a convencao estabelecer.', 'Considera-se em mora o devedor que nao efetuar o pagamento e o credor que nao quiser recebe-lo no tempo, lugar e forma que a lei ou a convencao estabelecer.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.126', '2025-12-07 20:03:07.126') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('752398af-0417-4ff0-ae3c-7b88460043ba', 'ed747b46-325f-4189-bea7-4c784a35e91e', '395', 'Parte Especial', 'Do Direito das Obrigacoes', 'Da Mora', NULL, NULL, 'Responde o devedor pelos prejuizos a que sua mora der causa, mais juros, atualizacao dos valores monetarios segundo indices oficiais regularmente estabelecidos, e honorarios de advogado.', 'Responde o devedor pelos prejuizos a que sua mora der causa, mais juros, atualizacao dos valores monetarios segundo indices oficiais regularmente estabelecidos, e honorarios de advogado.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.126', '2025-12-07 20:03:07.126') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('e466b067-0cc9-46ef-8216-e1bc04963699', 'ed747b46-325f-4189-bea7-4c784a35e91e', '402', 'Parte Especial', 'Do Direito das Obrigacoes', 'Das Perdas e Danos', NULL, NULL, 'Salvo as excecoes expressamente previstas em lei, as perdas e danos devidas ao credor abrangem, alem do que ele efetivamente perdeu, o que razoavelmente deixou de lucrar.', 'Salvo as excecoes expressamente previstas em lei, as perdas e danos devidas ao credor abrangem, alem do que ele efetivamente perdeu, o que razoavelmente deixou de lucrar.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.127', '2025-12-07 20:03:07.127') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('332031e0-6212-42d3-b3d0-35a08a8cd1de', 'ed747b46-325f-4189-bea7-4c784a35e91e', '403', 'Parte Especial', 'Do Direito das Obrigacoes', 'Das Perdas e Danos', NULL, NULL, 'Ainda que a inexecucao resulte de dolo do devedor, as perdas e danos so incluem os prejuizos efetivos e os lucros cessantes por efeito dela direto e imediato, sem prejuizo do disposto na lei processual.', 'Ainda que a inexecucao resulte de dolo do devedor, as perdas e danos so incluem os prejuizos efetivos e os lucros cessantes por efeito dela direto e imediato, sem prejuizo do disposto na lei processual.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.127', '2025-12-07 20:03:07.127') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('bcfd4bd6-23a8-4f4a-9001-336e2596a3ca', 'ed747b46-325f-4189-bea7-4c784a35e91e', '421', 'Parte Especial', 'Dos Contratos em Geral', 'Disposicoes Gerais', NULL, NULL, 'A liberdade contratual sera exercida nos limites da funcao social do contrato.', 'A liberdade contratual sera exercida nos limites da funcao social do contrato.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.128', '2025-12-07 20:03:07.128') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('e3431e32-143b-4835-b604-8fcad9408620', 'ed747b46-325f-4189-bea7-4c784a35e91e', '422', 'Parte Especial', 'Dos Contratos em Geral', 'Disposicoes Gerais', NULL, NULL, 'Os contratantes sao obrigados a guardar, assim na conclusao do contrato, como em sua execucao, os principios de probidade e boa-fe.', 'Os contratantes sao obrigados a guardar, assim na conclusao do contrato, como em sua execucao, os principios de probidade e boa-fe.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.128', '2025-12-07 20:03:07.128') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('52b36860-9eb9-4a68-b9b8-8152397448bc', 'ed747b46-325f-4189-bea7-4c784a35e91e', '423', 'Parte Especial', 'Dos Contratos em Geral', 'Disposicoes Gerais', NULL, NULL, 'Quando houver no contrato de adesao clausulas ambiguas ou contraditorias, dever-se-a adotar a interpretacao mais favoravel ao aderente.', 'Quando houver no contrato de adesao clausulas ambiguas ou contraditorias, dever-se-a adotar a interpretacao mais favoravel ao aderente.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.129', '2025-12-07 20:03:07.129') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('47c50644-1b35-45c5-9e23-1f5fd4ceee7b', 'ed747b46-325f-4189-bea7-4c784a35e91e', '424', 'Parte Especial', 'Dos Contratos em Geral', 'Disposicoes Gerais', NULL, NULL, 'Nos contratos de adesao, sao nulas as clausulas que estipulem a renuncia antecipada do aderente a direito resultante da natureza do negocio.', 'Nos contratos de adesao, sao nulas as clausulas que estipulem a renuncia antecipada do aderente a direito resultante da natureza do negocio.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.129', '2025-12-07 20:03:07.129') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('cef3ccad-3244-4338-88d9-8e2dbd66bad9', 'ed747b46-325f-4189-bea7-4c784a35e91e', '425', 'Parte Especial', 'Dos Contratos em Geral', 'Disposicoes Gerais', NULL, NULL, 'E licito as partes estipular contratos atipicos, observadas as normas gerais fixadas neste Codigo.', 'E licito as partes estipular contratos atipicos, observadas as normas gerais fixadas neste Codigo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.129', '2025-12-07 20:03:07.129') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('a8bed459-f92b-4310-b100-132d70253d79', 'ed747b46-325f-4189-bea7-4c784a35e91e', '927', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Obrigacao de Indenizar', NULL, NULL, 'Aquele que, por ato ilicito (arts. 186 e 187), causar dano a outrem, fica obrigado a repara-lo.', 'Aquele que, por ato ilicito (arts. 186 e 187), causar dano a outrem, fica obrigado a repara-lo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.13', '2025-12-07 20:03:07.13') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('83c57118-dfa6-443f-9042-f0258cfb4940', 'ed747b46-325f-4189-bea7-4c784a35e91e', '928', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Obrigacao de Indenizar', NULL, NULL, 'O incapaz responde pelos prejuizos que causar, se as pessoas por ele responsaveis nao tiverem obrigacao de faze-lo ou nao dispuserem de meios suficientes.', 'O incapaz responde pelos prejuizos que causar, se as pessoas por ele responsaveis nao tiverem obrigacao de faze-lo ou nao dispuserem de meios suficientes.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.13', '2025-12-07 20:03:07.13') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('050d6b4d-1e00-4e94-b1ec-08692eaea7b9', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '1', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'O processo civil sera ordenado, disciplinado e interpretado conforme os valores e as normas fundamentais estabelecidos na Constituicao da Republica Federativa do Brasil, observando-se as disposicoes deste Codigo.', 'O processo civil sera ordenado, disciplinado e interpretado conforme os valores e as normas fundamentais estabelecidos na Constituicao da Republica Federativa do Brasil, observando-se as disposicoes deste Codigo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.136', '2025-12-07 20:03:07.136') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('c7909398-6991-4bf3-9f2c-c412c25dce6c', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '2', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'O processo comeca por iniciativa da parte e se desenvolve por impulso oficial, salvo as excecoes previstas em lei.', 'O processo comeca por iniciativa da parte e se desenvolve por impulso oficial, salvo as excecoes previstas em lei.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.137', '2025-12-07 20:03:07.137') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('b0a33f33-332c-4f94-ad88-d9517468a85d', 'ed747b46-325f-4189-bea7-4c784a35e91e', '932', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Obrigacao de Indenizar', NULL, NULL, 'Sao tambem responsaveis pela reparacao civil: I - os pais, pelos filhos menores que estiverem sob sua autoridade e em sua companhia; II - o tutor e o curador, pelos pupilos e curatelados, que se acharem nas mesmas condicoes; III - o empregador ou comitente, por seus empregados, servicals e prepostos, no exercicio do trabalho que lhes competir, ou em razao dele; IV - os donos de hoteis, hospedarias, casas ou estabelecimentos onde se albergue por dinheiro, mesmo para fins de educacao, pelos seus hospedes, moradores e educandos; V - os que gratuitamente houverem participado nos produtos do crime, ate a concorrente quantia.', 'Sao tambem responsaveis pela reparacao civil: I - os pais, pelos filhos menores que estiverem sob sua autoridade e em sua companhia; II - o tutor e o curador, pelos pupilos e curatelados, que se acharem nas mesmas condicoes; III - o empregador ou comitente, por seus empregados, servicals e prepostos, no exercicio do trabalho que lhes competir, ou em razao dele; IV - os donos de hoteis, hospedarias, casas ou estabelecimentos onde se albergue por dinheiro, mesmo para fins de educacao, pelos seus hospedes, moradores e educandos; V - os que gratuitamente houverem participado nos produtos do crime, ate a concorrente quantia.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.131', '2025-12-07 20:03:07.131') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('cfa2b0a6-1c27-4df1-815f-9714a9e76850', 'ed747b46-325f-4189-bea7-4c784a35e91e', '933', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Obrigacao de Indenizar', NULL, NULL, 'As pessoas indicadas nos incisos I a V do artigo antecedente, ainda que nao haja culpa de sua parte, responderao pelos atos praticados pelos terceiros ali referidos.', 'As pessoas indicadas nos incisos I a V do artigo antecedente, ainda que nao haja culpa de sua parte, responderao pelos atos praticados pelos terceiros ali referidos.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.131', '2025-12-07 20:03:07.131') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('af149c66-b91d-4f79-9b9c-b26530a69aba', 'ed747b46-325f-4189-bea7-4c784a35e91e', '944', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Indenizacao', NULL, NULL, 'A indenizacao mede-se pela extensao do dano.', 'A indenizacao mede-se pela extensao do dano.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.132', '2025-12-07 20:03:07.132') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('b3761594-ffcb-4bbd-8f39-8ab7aed14d8b', 'ed747b46-325f-4189-bea7-4c784a35e91e', '945', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Indenizacao', NULL, NULL, 'Se a vitima tiver concorrido culposamente para o evento danoso, a sua indenizacao sera fixada tendo-se em conta a gravidade de sua culpa em confronto com a do autor do dano.', 'Se a vitima tiver concorrido culposamente para o evento danoso, a sua indenizacao sera fixada tendo-se em conta a gravidade de sua culpa em confronto com a do autor do dano.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.132', '2025-12-07 20:03:07.132') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('05124a91-74c1-4377-8be5-0eee5a3fb779', 'ed747b46-325f-4189-bea7-4c784a35e91e', '949', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Indenizacao', NULL, NULL, 'No caso de lesao ou outra ofensa a saude, o ofensor indenizara o ofendido das despesas do tratamento e dos lucros cessantes ate ao fim da convalescenca, alem de algum outro prejuizo que o ofendido prove haver sofrido.', 'No caso de lesao ou outra ofensa a saude, o ofensor indenizara o ofendido das despesas do tratamento e dos lucros cessantes ate ao fim da convalescenca, alem de algum outro prejuizo que o ofendido prove haver sofrido.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.133', '2025-12-07 20:03:07.133') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('9b26c1f6-3896-4d54-a8f6-e4b73192fbe1', 'ed747b46-325f-4189-bea7-4c784a35e91e', '950', 'Parte Especial', 'Da Responsabilidade Civil', 'Da Indenizacao', NULL, NULL, 'Se da ofensa resultar defeito pelo qual o ofendido nao possa exercer o seu oficio ou profissao, ou se lhe diminua a capacidade de trabalho, a indenizacao, alem das despesas do tratamento e lucros cessantes ate ao fim da convalescenca, incluira pensao correspondente a importancia do trabalho para que se inabilitou, ou da depreciacao que ele sofreu.', 'Se da ofensa resultar defeito pelo qual o ofendido nao possa exercer o seu oficio ou profissao, ou se lhe diminua a capacidade de trabalho, a indenizacao, alem das despesas do tratamento e lucros cessantes ate ao fim da convalescenca, incluira pensao correspondente a importancia do trabalho para que se inabilitou, ou da depreciacao que ele sofreu.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.133', '2025-12-07 20:03:07.133') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('85da7b27-1ab9-41b3-8dc2-7b127ff0200d', 'ed747b46-325f-4189-bea7-4c784a35e91e', '1196', 'Parte Especial', 'Do Direito das Coisas', 'Da Posse', NULL, NULL, 'Considera-se possuidor todo aquele que tem de fato o exercicio, pleno ou nao, de algum dos poderes inerentes a propriedade.', 'Considera-se possuidor todo aquele que tem de fato o exercicio, pleno ou nao, de algum dos poderes inerentes a propriedade.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.134', '2025-12-07 20:03:07.134') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('f5ad50a0-ab4d-49e8-9dd1-b2d48b829720', 'ed747b46-325f-4189-bea7-4c784a35e91e', '1197', 'Parte Especial', 'Do Direito das Coisas', 'Da Posse', NULL, NULL, 'A posse direta, de pessoa que tem a coisa em seu poder, temporariamente, em virtude de direito pessoal, ou real, nao anula a indireta, de quem aquela foi havida, podendo o possuidor direto defender a sua posse contra o indireto.', 'A posse direta, de pessoa que tem a coisa em seu poder, temporariamente, em virtude de direito pessoal, ou real, nao anula a indireta, de quem aquela foi havida, podendo o possuidor direto defender a sua posse contra o indireto.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.134', '2025-12-07 20:03:07.134') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('2fa80ba9-aa28-454b-bf29-d9ff80692701', 'ed747b46-325f-4189-bea7-4c784a35e91e', '1210', 'Parte Especial', 'Do Direito das Coisas', 'Dos Efeitos da Posse', NULL, NULL, 'O possuidor tem direito a ser mantido na posse em caso de turbacao, restituido no de esbulho, e segurado de violencia iminente, se tiver justo receio de ser molestado.', 'O possuidor tem direito a ser mantido na posse em caso de turbacao, restituido no de esbulho, e segurado de violencia iminente, se tiver justo receio de ser molestado.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.135', '2025-12-07 20:03:07.135') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('8c1eb6e7-8379-4987-bcdd-543c9bd7f9f9', 'ed747b46-325f-4189-bea7-4c784a35e91e', '1211', 'Parte Especial', 'Do Direito das Coisas', 'Dos Efeitos da Posse', NULL, NULL, 'Quando mais de uma pessoa se disser possuidora, manter-se-a provisoriamente a que tiver a coisa, se nao estiver manifesto que a obteve de alguma das outras por modo vicioso.', 'Quando mais de uma pessoa se disser possuidora, manter-se-a provisoriamente a que tiver a coisa, se nao estiver manifesto que a obteve de alguma das outras por modo vicioso.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.135', '2025-12-07 20:03:07.135') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('580b9d5b-1f7d-4de0-a808-0a96fb790c00', 'ed747b46-325f-4189-bea7-4c784a35e91e', '1228', 'Parte Especial', 'Do Direito das Coisas', 'Da Propriedade', NULL, NULL, 'O proprietario tem a faculdade de usar, gozar e dispor da coisa, e o direito de reave-la do poder de quem quer que injustamente a possua ou detenha.', 'O proprietario tem a faculdade de usar, gozar e dispor da coisa, e o direito de reave-la do poder de quem quer que injustamente a possua ou detenha.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.135', '2025-12-07 20:03:07.135') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('ad86fb33-49c1-4a9e-90ed-b3be264cd23a', 'ed747b46-325f-4189-bea7-4c784a35e91e', '1238', 'Parte Especial', 'Do Direito das Coisas', 'Da Aquisicao da Propriedade Imovel', NULL, NULL, 'Aquele que, por quinze anos, sem interrupcao, nem oposicao, possuir como seu um imovel, adquire-lhe a propriedade, independentemente de titulo e boa-fe; podendo requerer ao juiz que assim o declare por sentenca, a qual servira de titulo para o registro no Cartorio de Registro de Imoveis.', 'Aquele que, por quinze anos, sem interrupcao, nem oposicao, possuir como seu um imovel, adquire-lhe a propriedade, independentemente de titulo e boa-fe; podendo requerer ao juiz que assim o declare por sentenca, a qual servira de titulo para o registro no Cartorio de Registro de Imoveis.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.136', '2025-12-07 20:03:07.136') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('6f4bb474-4184-4d4c-ae11-d3e1d850cb49', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '4', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'As partes tem o direito de obter em prazo razoavel a solucao integral do merito, incluida a atividade satisfativa.', 'As partes tem o direito de obter em prazo razoavel a solucao integral do merito, incluida a atividade satisfativa.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.138', '2025-12-07 20:03:07.138') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('01d50ae5-cd9f-4038-b224-30f7fa15cd1c', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '5', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'Aquele que de qualquer forma participa do processo deve comportar-se de acordo com a boa-fe.', 'Aquele que de qualquer forma participa do processo deve comportar-se de acordo com a boa-fe.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.139', '2025-12-07 20:03:07.139') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('22207ae9-3431-4dde-a535-2b1d9aca95d7', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '6', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'Todos os sujeitos do processo devem cooperar entre si para que se obtenha, em tempo razoavel, decisao de merito justa e efetiva.', 'Todos os sujeitos do processo devem cooperar entre si para que se obtenha, em tempo razoavel, decisao de merito justa e efetiva.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.139', '2025-12-07 20:03:07.139') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('14cc4300-e509-40a8-8a4d-236827fdbe83', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '7', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'E assegurada as partes paridade de tratamento em relacao ao exercicio de direitos e faculdades processuais, aos meios de defesa, aos onus, aos deveres e a aplicacao de sancoes processuais, competindo ao juiz zelar pelo efetivo contraditorio.', 'E assegurada as partes paridade de tratamento em relacao ao exercicio de direitos e faculdades processuais, aos meios de defesa, aos onus, aos deveres e a aplicacao de sancoes processuais, competindo ao juiz zelar pelo efetivo contraditorio.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.14', '2025-12-07 20:03:07.14') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('ad2b9b59-fb91-4b54-9a23-714d13b72afb', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '8', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'Ao aplicar o ordenamento juridico, o juiz atendera aos fins sociais e as exigencias do bem comum, resguardando e promovendo a dignidade da pessoa humana e observando a proporcionalidade, a razoabilidade, a legalidade, a publicidade e a eficiencia.', 'Ao aplicar o ordenamento juridico, o juiz atendera aos fins sociais e as exigencias do bem comum, resguardando e promovendo a dignidade da pessoa humana e observando a proporcionalidade, a razoabilidade, a legalidade, a publicidade e a eficiencia.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.14', '2025-12-07 20:03:07.14') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('f788bcd4-b90f-4c69-bb4e-2c92c5811fdb', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '9', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'Nao se proferira decisao contra uma das partes sem que ela seja previamente ouvida.', 'Nao se proferira decisao contra uma das partes sem que ela seja previamente ouvida.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.14', '2025-12-07 20:03:07.14') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('bee84baf-7245-4463-887b-2ceb8218a0dc', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '10', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'O juiz nao pode decidir, em grau algum de jurisdicao, com base em fundamento a respeito do qual nao se tenha dado as partes oportunidade de se manifestar, ainda que se trate de materia sobre a qual deva decidir de oficio.', 'O juiz nao pode decidir, em grau algum de jurisdicao, com base em fundamento a respeito do qual nao se tenha dado as partes oportunidade de se manifestar, ainda que se trate de materia sobre a qual deva decidir de oficio.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.141', '2025-12-07 20:03:07.141') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('76e2064b-8fc6-4796-b728-fd45b4e241c3', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '11', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'Todos os julgamentos dos orgaos do Poder Judiciario serao publicos, e fundamentadas todas as decisoes, sob pena de nulidade.', 'Todos os julgamentos dos orgaos do Poder Judiciario serao publicos, e fundamentadas todas as decisoes, sob pena de nulidade.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.141', '2025-12-07 20:03:07.141') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('bdbca8fa-c9c2-4406-b35f-ed7e0fa513d3', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '12', 'Parte Geral', 'Das Normas Fundamentais do Processo Civil', NULL, NULL, NULL, 'Os juizes e os tribunais atenderao, preferencialmente, a ordem cronologica de conclusao para proferir sentenca ou acordao.', 'Os juizes e os tribunais atenderao, preferencialmente, a ordem cronologica de conclusao para proferir sentenca ou acordao.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.142', '2025-12-07 20:03:07.142') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('da6a0270-8e3e-42b5-afb2-a44e761f1991', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '16', 'Parte Geral', 'Da Jurisdicao e da Acao', 'Da Jurisdicao', NULL, NULL, 'A jurisdicao civil e exercida pelos juizes e pelos tribunais em todo o territorio nacional, conforme as disposicoes deste Codigo.', 'A jurisdicao civil e exercida pelos juizes e pelos tribunais em todo o territorio nacional, conforme as disposicoes deste Codigo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.142', '2025-12-07 20:03:07.142') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('3ddaf4fe-69fe-4dbf-aa66-20e474501f00', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '17', 'Parte Geral', 'Da Jurisdicao e da Acao', 'Da Acao', NULL, NULL, 'Para postular em juizo e necessario ter interesse e legitimidade.', 'Para postular em juizo e necessario ter interesse e legitimidade.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.143', '2025-12-07 20:03:07.143') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('2520d194-88fb-441c-9b9f-84829646a420', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '18', 'Parte Geral', 'Da Jurisdicao e da Acao', 'Da Acao', NULL, NULL, 'Ninguem podera pleitear direito alheio em nome proprio, salvo quando autorizado pelo ordenamento juridico.', 'Ninguem podera pleitear direito alheio em nome proprio, salvo quando autorizado pelo ordenamento juridico.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.143', '2025-12-07 20:03:07.143') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('a96fc351-1737-4ed3-8a26-e02f381cb9fd', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '42', 'Parte Geral', 'Da Competencia Interna', 'Das Disposicoes Gerais', NULL, NULL, 'As causas civeis serao processadas e decididas pelo juiz nos limites de sua competencia, ressalvado as partes o direito de instituir juizo arbitral, na forma da lei.', 'As causas civeis serao processadas e decididas pelo juiz nos limites de sua competencia, ressalvado as partes o direito de instituir juizo arbitral, na forma da lei.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.143', '2025-12-07 20:03:07.143') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('585ba51b-fcce-4bab-8518-870cc23b2f27', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '43', 'Parte Geral', 'Da Competencia Interna', 'Das Disposicoes Gerais', NULL, NULL, 'Determina-se a competencia no momento do registro ou da distribuicao da peticao inicial, sendo irrelevantes as modificacoes do estado de fato ou de direito ocorridas posteriormente, salvo quando suprimirem orgao judiciario ou alterarem a competencia absoluta.', 'Determina-se a competencia no momento do registro ou da distribuicao da peticao inicial, sendo irrelevantes as modificacoes do estado de fato ou de direito ocorridas posteriormente, salvo quando suprimirem orgao judiciario ou alterarem a competencia absoluta.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.144', '2025-12-07 20:03:07.144') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('f1f5f6f9-8159-4508-a9f9-3d0dc6736fb7', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '46', 'Parte Geral', 'Da Competencia Interna', 'Da Competencia Territorial', NULL, NULL, 'A acao fundada em direito pessoal ou em direito real sobre bens moveis sera proposta, em regra, no foro de domicilio do reu.', 'A acao fundada em direito pessoal ou em direito real sobre bens moveis sera proposta, em regra, no foro de domicilio do reu.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.144', '2025-12-07 20:03:07.144') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('092b9922-b181-4863-921a-c1d59e050f24', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '47', 'Parte Geral', 'Da Competencia Interna', 'Da Competencia Territorial', NULL, NULL, 'Para as acoes fundadas em direito real sobre imoveis e competente o foro de situacao da coisa.', 'Para as acoes fundadas em direito real sobre imoveis e competente o foro de situacao da coisa.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.145', '2025-12-07 20:03:07.145') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('ed98061c-c835-4fdf-961a-2ff2c7a7095e', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '70', 'Parte Geral', 'Das Partes e dos Procuradores', 'Da Capacidade Processual', NULL, NULL, 'Toda pessoa que se encontre no exercicio de seus direitos tem capacidade para estar em juizo.', 'Toda pessoa que se encontre no exercicio de seus direitos tem capacidade para estar em juizo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.145', '2025-12-07 20:03:07.145') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('bd9520de-74f4-46a1-afa9-4d828a6435a1', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '71', 'Parte Geral', 'Das Partes e dos Procuradores', 'Da Capacidade Processual', NULL, NULL, 'O incapaz sera representado ou assistido por seus pais, por tutor ou por curador, na forma da lei.', 'O incapaz sera representado ou assistido por seus pais, por tutor ou por curador, na forma da lei.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.146', '2025-12-07 20:03:07.146') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('921edf79-a825-4430-8318-1269505c54a0', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '77', 'Parte Geral', 'Das Partes e dos Procuradores', 'Dos Deveres das Partes e de seus Procuradores', NULL, NULL, 'Alem de outros previstos neste Codigo, sao deveres das partes, de seus procuradores e de todos aqueles que de qualquer forma participem do processo: I - expor os fatos em juizo conforme a verdade; II - nao formular pretensao ou de apresentar defesa quando cientes de que sao destituidas de fundamento; III - nao produzir provas e nao praticar atos inuteis ou desnecessarios a declaracao ou a defesa do direito; IV - cumprir com exatidao as decisoes jurisdicionais, de natureza provisoria ou final, e nao criar embaracos a sua efetivacao.', 'Alem de outros previstos neste Codigo, sao deveres das partes, de seus procuradores e de todos aqueles que de qualquer forma participem do processo: I - expor os fatos em juizo conforme a verdade; II - nao formular pretensao ou de apresentar defesa quando cientes de que sao destituidas de fundamento; III - nao produzir provas e nao praticar atos inuteis ou desnecessarios a declaracao ou a defesa do direito; IV - cumprir com exatidao as decisoes jurisdicionais, de natureza provisoria ou final, e nao criar embaracos a sua efetivacao.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.146', '2025-12-07 20:03:07.146') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('d2a5bc37-83db-4775-927c-7de1df0e411b', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '78', 'Parte Geral', 'Das Partes e dos Procuradores', 'Dos Deveres das Partes e de seus Procuradores', NULL, NULL, 'E vedado as partes, a seus procuradores, aos juizes, aos membros do Ministerio Publico e da Defensoria Publica e a qualquer pessoa que participe do processo empregar expressoes ofensivas nos escritos apresentados.', 'E vedado as partes, a seus procuradores, aos juizes, aos membros do Ministerio Publico e da Defensoria Publica e a qualquer pessoa que participe do processo empregar expressoes ofensivas nos escritos apresentados.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.147', '2025-12-07 20:03:07.147') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('d91b8cd6-1f7a-4e4c-a26b-54e7a8a424cd', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '79', 'Parte Geral', 'Das Partes e dos Procuradores', 'Da Responsabilidade das Partes por Dano Processual', NULL, NULL, 'Responde por perdas e danos aquele que litigar de ma-fe como autor, reu ou interveniente.', 'Responde por perdas e danos aquele que litigar de ma-fe como autor, reu ou interveniente.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.147', '2025-12-07 20:03:07.147') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('e3732048-0af5-43f3-9dca-f35a82195360', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '80', 'Parte Geral', 'Das Partes e dos Procuradores', 'Da Responsabilidade das Partes por Dano Processual', NULL, NULL, 'Considera-se litigante de ma-fe aquele que: I - deduzir pretensao ou defesa contra texto expresso de lei ou fato incontroverso; II - alterar a verdade dos fatos; III - usar do processo para conseguir objetivo ilegal; IV - opuser resistencia injustificada ao andamento do processo; V - proceder de modo temerario em qualquer incidente ou ato do processo; VI - provocar incidente manifestamente infundado; VII - interpuser recurso com intuito manifestamente protatorio.', 'Considera-se litigante de ma-fe aquele que: I - deduzir pretensao ou defesa contra texto expresso de lei ou fato incontroverso; II - alterar a verdade dos fatos; III - usar do processo para conseguir objetivo ilegal; IV - opuser resistencia injustificada ao andamento do processo; V - proceder de modo temerario em qualquer incidente ou ato do processo; VI - provocar incidente manifestamente infundado; VII - interpuser recurso com intuito manifestamente protatorio.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.148', '2025-12-07 20:03:07.148') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('7ead1681-55c4-4c21-915b-4f6c65defe71', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '218', 'Parte Geral', 'Dos Atos Processuais', 'Do Tempo e do Lugar dos Atos Processuais', NULL, NULL, 'Os atos processuais serao realizados nos prazos prescritos em lei.', 'Os atos processuais serao realizados nos prazos prescritos em lei.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.148', '2025-12-07 20:03:07.148') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('6909e69c-7752-40ee-832e-200e402c1272', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '219', 'Parte Geral', 'Dos Atos Processuais', 'Dos Prazos', NULL, NULL, 'Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ao somente os dias uteis.', 'Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ao somente os dias uteis.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.149', '2025-12-07 20:03:07.149') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('66adf380-0ff0-4ef5-978e-98a2710fb853', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '220', 'Parte Geral', 'Dos Atos Processuais', 'Dos Prazos', NULL, NULL, 'Suspende-se o curso do prazo processual nos dias compreendidos entre 20 de dezembro e 20 de janeiro, inclusive.', 'Suspende-se o curso do prazo processual nos dias compreendidos entre 20 de dezembro e 20 de janeiro, inclusive.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.149', '2025-12-07 20:03:07.149') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('39e34871-0672-4ab3-942b-5bb6923d78a6', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '224', 'Parte Geral', 'Dos Atos Processuais', 'Dos Prazos', NULL, NULL, 'Salvo disposicao em contrario, os prazos serao contados excluindo o dia do comeco e incluindo o dia do vencimento.', 'Salvo disposicao em contrario, os prazos serao contados excluindo o dia do comeco e incluindo o dia do vencimento.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.149', '2025-12-07 20:03:07.149') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('ed8472eb-b90c-4429-aaeb-d15943151ddb', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '294', 'Parte Geral', 'Da Tutela Provisoria', 'Disposicoes Gerais', NULL, NULL, 'A tutela provisoria pode fundamentar-se em urgencia ou evidencia.', 'A tutela provisoria pode fundamentar-se em urgencia ou evidencia.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.15', '2025-12-07 20:03:07.15') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('54d0a19f-addd-4c66-85b3-2d8c04e9049e', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '295', 'Parte Geral', 'Da Tutela Provisoria', 'Disposicoes Gerais', NULL, NULL, 'A tutela provisoria requerida em carater incidental independe do pagamento de custas.', 'A tutela provisoria requerida em carater incidental independe do pagamento de custas.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.15', '2025-12-07 20:03:07.15') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('d1571098-96b0-4ef3-8792-7e66c1c6a6eb', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '300', 'Parte Geral', 'Da Tutela Provisoria', 'Da Tutela de Urgencia', NULL, NULL, 'A tutela de urgencia sera concedida quando houver elementos que evidenciem a probabilidade do direito e o perigo de dano ou o risco ao resultado util do processo.', 'A tutela de urgencia sera concedida quando houver elementos que evidenciem a probabilidade do direito e o perigo de dano ou o risco ao resultado util do processo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.151', '2025-12-07 20:03:07.151') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('edb067b9-18e0-47cd-af4f-285c444512d9', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '301', 'Parte Geral', 'Da Tutela Provisoria', 'Da Tutela de Urgencia', NULL, NULL, 'A tutela de urgencia de natureza cautelar pode ser efetivada mediante arresto, sequestro, arrolamento de bens, registro de protesto contra alienacao de bem e qualquer outra medida idonea para asseguracao do direito.', 'A tutela de urgencia de natureza cautelar pode ser efetivada mediante arresto, sequestro, arrolamento de bens, registro de protesto contra alienacao de bem e qualquer outra medida idonea para asseguracao do direito.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.151', '2025-12-07 20:03:07.151') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('3f0bb9de-cc3b-4076-9687-4d84897989c5', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '502', 'Parte Especial', 'Do Processo de Conhecimento e do Cumprimento de Sentenca', 'Da Coisa Julgada', NULL, NULL, 'Denomina-se coisa julgada material a autoridade que torna imutavel e indiscutivel a decisao de merito nao mais sujeita a recurso.', 'Denomina-se coisa julgada material a autoridade que torna imutavel e indiscutivel a decisao de merito nao mais sujeita a recurso.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.155', '2025-12-07 20:03:07.155') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('a3a1043c-341d-415c-b971-9f67f9010b4d', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '302', 'Parte Geral', 'Da Tutela Provisoria', 'Da Tutela de Urgencia', NULL, NULL, 'Independentemente da reparacao por dano processual, a parte responde pelo prejuizo que a efetivacao da tutela de urgencia causar a parte adversa, se: I - a sentenca lhe for desfavoravel; II - obtida liminarmente a tutela em carater antecedente, nao fornecer os meios necessarios para a citacao do requerido no prazo de 5 (cinco) dias; III - ocorrer a cessacao da eficacia da medida em qualquer hipotese legal; IV - o juiz acolher a alegacao de decadencia ou prescricao da pretensao do autor.', 'Independentemente da reparacao por dano processual, a parte responde pelo prejuizo que a efetivacao da tutela de urgencia causar a parte adversa, se: I - a sentenca lhe for desfavoravel; II - obtida liminarmente a tutela em carater antecedente, nao fornecer os meios necessarios para a citacao do requerido no prazo de 5 (cinco) dias; III - ocorrer a cessacao da eficacia da medida em qualquer hipotese legal; IV - o juiz acolher a alegacao de decadencia ou prescricao da pretensao do autor.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.152', '2025-12-07 20:03:07.152') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('4a2921b4-135f-4125-95d5-f8a88ae91c2b', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '303', 'Parte Geral', 'Da Tutela Provisoria', 'Da Tutela de Urgencia', NULL, NULL, 'Nos casos em que a urgencia for contemporanea a propositura da acao, a peticao inicial pode limitar-se ao requerimento da tutela antecipada e a indicacao do pedido de tutela final, com a exposicao da lide, do direito que se busca realizar e do perigo de dano ou do risco ao resultado util do processo.', 'Nos casos em que a urgencia for contemporanea a propositura da acao, a peticao inicial pode limitar-se ao requerimento da tutela antecipada e a indicacao do pedido de tutela final, com a exposicao da lide, do direito que se busca realizar e do perigo de dano ou do risco ao resultado util do processo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.152', '2025-12-07 20:03:07.152') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('280c8dcc-eaef-407c-9cc0-02df46369fc6', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '311', 'Parte Geral', 'Da Tutela Provisoria', 'Da Tutela da Evidencia', NULL, NULL, 'A tutela da evidencia sera concedida, independentemente da demonstracao de perigo de dano ou de risco ao resultado util do processo, quando: I - ficar caracterizado o abuso do direito de defesa ou o manifesto proposito protatorio da parte; II - as alegacoes de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em sumula vinculante; III - se tratar de pedido reipersecutorio fundado em prova documental adequada do contrato de deposito, caso em que sera decretada a ordem de entrega do objeto custodiado, sob cominacao de multa; IV - a peticao inicial for instruida com prova documental suficiente dos fatos constitutivos do direito do autor, a que o reu nao oponha prova capaz de gerar duvida razoavel.', 'A tutela da evidencia sera concedida, independentemente da demonstracao de perigo de dano ou de risco ao resultado util do processo, quando: I - ficar caracterizado o abuso do direito de defesa ou o manifesto proposito protatorio da parte; II - as alegacoes de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em sumula vinculante; III - se tratar de pedido reipersecutorio fundado em prova documental adequada do contrato de deposito, caso em que sera decretada a ordem de entrega do objeto custodiado, sob cominacao de multa; IV - a peticao inicial for instruida com prova documental suficiente dos fatos constitutivos do direito do autor, a que o reu nao oponha prova capaz de gerar duvida razoavel.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.153', '2025-12-07 20:03:07.153') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('7db37332-9c2b-4f27-9c91-ee453b2bd999', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '485', 'Parte Especial', 'Do Processo de Conhecimento e do Cumprimento de Sentenca', 'Da Extincao do Processo', NULL, NULL, 'O juiz nao resolvera o merito quando: I - indeferir a peticao inicial; II - o processo ficar parado durante mais de 1 (um) ano por negligencia das partes; III - por nao promover os atos e as diligencias que lhe incumbir, o autor abandonar a causa por mais de 30 (trinta) dias; IV - verificar a ausencia de pressupostos de constituicao e de desenvolvimento valido e regular do processo; V - reconhecer a existencia de perempção, de litispendencia ou de coisa julgada; VI - verificar ausencia de legitimidade ou de interesse processual; VII - acolher a alegacao de existencia de convencao de arbitragem ou quando o juizo arbitral reconhecer sua competencia; VIII - homologar a desistencia da acao; IX - em caso de morte da parte, a acao for considerada intransmissivel por disposicao legal; X - nos demais casos prescritos neste Codigo.', 'O juiz nao resolvera o merito quando: I - indeferir a peticao inicial; II - o processo ficar parado durante mais de 1 (um) ano por negligencia das partes; III - por nao promover os atos e as diligencias que lhe incumbir, o autor abandonar a causa por mais de 30 (trinta) dias; IV - verificar a ausencia de pressupostos de constituicao e de desenvolvimento valido e regular do processo; V - reconhecer a existencia de perempção, de litispendencia ou de coisa julgada; VI - verificar ausencia de legitimidade ou de interesse processual; VII - acolher a alegacao de existencia de convencao de arbitragem ou quando o juizo arbitral reconhecer sua competencia; VIII - homologar a desistencia da acao; IX - em caso de morte da parte, a acao for considerada intransmissivel por disposicao legal; X - nos demais casos prescritos neste Codigo.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.153', '2025-12-07 20:03:07.153') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('ce5fc2f9-2cc5-4d2f-9b72-93b7b315b3fa', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '487', 'Parte Especial', 'Do Processo de Conhecimento e do Cumprimento de Sentenca', 'Do Julgamento do Merito', NULL, NULL, 'Havera resolucao de merito quando o juiz: I - acolher ou rejeitar o pedido formulado na acao ou na reconvencao; II - decidir, de oficio ou a requerimento, sobre a ocorrencia de decadencia ou prescricao; III - homologar: a) o reconhecimento da procedencia do pedido formulado na acao ou na reconvencao; b) a transacao; c) a renuncia a pretensao formulada na acao ou na reconvencao.', 'Havera resolucao de merito quando o juiz: I - acolher ou rejeitar o pedido formulado na acao ou na reconvencao; II - decidir, de oficio ou a requerimento, sobre a ocorrencia de decadencia ou prescricao; III - homologar: a) o reconhecimento da procedencia do pedido formulado na acao ou na reconvencao; b) a transacao; c) a renuncia a pretensao formulada na acao ou na reconvencao.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.154', '2025-12-07 20:03:07.154') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('61ed9913-e44d-4072-917f-3dbdedbe32d6', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '489', 'Parte Especial', 'Do Processo de Conhecimento e do Cumprimento de Sentenca', 'Dos Elementos e dos Efeitos da Sentenca', NULL, NULL, 'Sao elementos essenciais da sentenca: I - o relatorio, que contera os nomes das partes, a identificacao do caso, com a suma do pedido e da contestacao, e o registro das principais ocorrencias havidas no andamento do processo; II - os fundamentos, em que o juiz analisara as questoes de fato e de direito; III - o dispositivo, em que o juiz resolvera as questoes principais que as partes lhe submeterem.', 'Sao elementos essenciais da sentenca: I - o relatorio, que contera os nomes das partes, a identificacao do caso, com a suma do pedido e da contestacao, e o registro das principais ocorrencias havidas no andamento do processo; II - os fundamentos, em que o juiz analisara as questoes de fato e de direito; III - o dispositivo, em que o juiz resolvera as questoes principais que as partes lhe submeterem.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.154', '2025-12-07 20:03:07.154') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('7a20f2b2-0ed5-4ad4-a8d8-cc8cc0eed07e', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '503', 'Parte Especial', 'Do Processo de Conhecimento e do Cumprimento de Sentenca', 'Da Coisa Julgada', NULL, NULL, 'A decisao que julgar total ou parcialmente o merito tem forca de lei nos limites da questao principal expressamente decidida.', 'A decisao que julgar total ou parcialmente o merito tem forca de lei nos limites da questao principal expressamente decidida.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.155', '2025-12-07 20:03:07.155') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('4d15bcd1-5a31-40ce-ad0c-994a298dd92f', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '994', 'Parte Especial', 'Dos Processos nos Tribunais e dos Meios de Impugnacao das Decisoes Judiciais', 'Disposicoes Gerais', NULL, NULL, 'Sao cabiveis os seguintes recursos: I - apelacao; II - agravo de instrumento; III - agravo interno; IV - embargos de declaracao; V - recurso ordinario; VI - recurso especial; VII - recurso extraordinario; VIII - agravo em recurso especial ou extraordinario; IX - embargos de divergencia.', 'Sao cabiveis os seguintes recursos: I - apelacao; II - agravo de instrumento; III - agravo interno; IV - embargos de declaracao; V - recurso ordinario; VI - recurso especial; VII - recurso extraordinario; VIII - agravo em recurso especial ou extraordinario; IX - embargos de divergencia.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.156', '2025-12-07 20:03:07.156') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('0dbbf509-5e31-4226-9803-b87f62eed92f', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '1.009', 'Parte Especial', 'Da Apelacao', 'Da Apelacao', NULL, NULL, 'Da sentenca cabe apelacao.', 'Da sentenca cabe apelacao.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.156', '2025-12-07 20:03:07.156') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('c0e8ffd3-9fb9-4238-9f97-a356afc042b0', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '1.010', 'Parte Especial', 'Da Apelacao', 'Da Apelacao', NULL, NULL, 'A apelacao, interposta por peticao dirigida ao juizo de primeiro grau, contera: I - os nomes e a qualificacao das partes; II - a exposicao do fato e do direito; III - as razoes do pedido de reforma ou de decretacao de nulidade; IV - o pedido de nova decisao.', 'A apelacao, interposta por peticao dirigida ao juizo de primeiro grau, contera: I - os nomes e a qualificacao das partes; II - a exposicao do fato e do direito; III - as razoes do pedido de reforma ou de decretacao de nulidade; IV - o pedido de nova decisao.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.157', '2025-12-07 20:03:07.157') ON CONFLICT DO NOTHING;
INSERT INTO public."ArtigoLei" VALUES ('5400ee2b-221c-48f5-a66b-d77ae385ec97', 'c9ccfdac-0a28-4c01-8067-744eee14d734', '1.015', 'Parte Especial', 'Do Agravo de Instrumento', 'Do Agravo de Instrumento', NULL, NULL, 'Cabe agravo de instrumento contra as decisoes interlocutorias que versarem sobre: I - tutelas provisorias; II - merito do processo; III - rejeicao da alegacao de convencao de arbitragem; IV - incidente de desconsideracao da personalidade juridica; V - rejeicao do pedido de gratuidade da justica ou acolhimento do pedido de sua revogacao; VI - exibicao ou posse de documento ou coisa; VII - exclusao de litisconsorte; VIII - rejeicao do pedido de limitacao do litisconsorcio; IX - admissao ou inadmissao de intervencao de terceiros; X - concessao, modificacao ou revogacao do efeito suspensivo aos embargos a execucao; XI - redistribuicao do onus da prova nos termos do art. 373, § 1o; XII - (VETADO); XIII - outros casos expressamente referidos em lei.', 'Cabe agravo de instrumento contra as decisoes interlocutorias que versarem sobre: I - tutelas provisorias; II - merito do processo; III - rejeicao da alegacao de convencao de arbitragem; IV - incidente de desconsideracao da personalidade juridica; V - rejeicao do pedido de gratuidade da justica ou acolhimento do pedido de sua revogacao; VI - exibicao ou posse de documento ou coisa; VII - exclusao de litisconsorte; VIII - rejeicao do pedido de limitacao do litisconsorcio; IX - admissao ou inadmissao de intervencao de terceiros; X - concessao, modificacao ou revogacao do efeito suspensivo aos embargos a execucao; XI - redistribuicao do onus da prova nos termos do art. 373, § 1o; XII - (VETADO); XIII - outros casos expressamente referidos em lei.', NULL, NULL, NULL, true, NULL, '2025-12-07 20:03:07.157', '2025-12-07 20:03:07.157') ON CONFLICT DO NOTHING;


--
-- TOC entry 5440 (class 0 OID 22129)
-- Dependencies: 229
-- Data for Name: Audiencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Audiencia" VALUES ('131e24af-e325-45e4-9664-ddad8e7ab0fb', 'b79c93ac-0fc8-49d2-8ef1-76647aed34b2', 'UNA', '2025-01-10 00:00:00', '09:30', 'Sala 203 - Foro Regional de Santana', NULL, NULL, 'AGENDADA', NULL, NULL, NULL, '2025-12-07 20:03:07.092', '2025-12-07 20:03:07.092') ON CONFLICT DO NOTHING;
INSERT INTO public."Audiencia" VALUES ('44949493-f63a-428d-8369-6752c8dfb972', '076bf8ce-bcbe-45db-b1fc-49bc11f482ac', 'INSTRUCAO', '2025-02-15 00:00:00', '10:00', 'Sala 105 - Foro Regional de Pinheiros', NULL, 'Dra. Fernanda Lima Santos', 'AGENDADA', 'Audiencia de instrucao e julgamento - arrolar testemunhas', NULL, NULL, '2025-12-07 20:03:07.092', '2025-12-07 20:03:07.092') ON CONFLICT DO NOTHING;
INSERT INTO public."Audiencia" VALUES ('6c8f8ed7-c0b1-4f92-9f18-961607b30be7', 'd09b3001-dc14-46a8-a203-a7505f7433be', 'CONCILIACAO', '2025-01-20 00:00:00', '14:00', 'Sala 301 - Foro Central Civel', NULL, 'Dr. Antonio Carlos Pereira', 'AGENDADA', 'Levar proposta de acordo - valor minimo R$ 45.000,00', NULL, NULL, '2025-12-07 20:03:07.092', '2025-12-07 20:03:07.092') ON CONFLICT DO NOTHING;


--
-- TOC entry 5460 (class 0 OID 22310)
-- Dependencies: 249
-- Data for Name: Automacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Automacao" VALUES ('6f56a1b6-2ae9-4abb-a96b-ef68e8abc908', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Notificacao de Prazos', 'NOTIFICACAO_PRAZO', 'Envia notificacao automatica 3 dias antes do vencimento de prazos', '{"canais": ["email", "sistema"], "diasAntecedencia": 3}', 'ATIVA', NULL, NULL, '2025-12-07 20:03:07.107', '2025-12-07 20:03:07.107') ON CONFLICT DO NOTHING;


--
-- TOC entry 5452 (class 0 OID 22238)
-- Dependencies: 241
-- Data for Name: CalculoIRPF; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5450 (class 0 OID 22221)
-- Dependencies: 239
-- Data for Name: CentroCusto; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CentroCusto" VALUES ('5b854560-60cf-46a4-8ff4-5cd929d1a95c', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Area Consumidor', 'Processos de direito do consumidor', true, '2025-12-07 20:03:07.038', '2025-12-07 20:03:07.038') ON CONFLICT DO NOTHING;
INSERT INTO public."CentroCusto" VALUES ('fa9b6646-4682-4c16-9f0a-3d214f9c2be9', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Consultoria', 'Servicos de consultoria juridica', true, '2025-12-07 20:03:07.038', '2025-12-07 20:03:07.038') ON CONFLICT DO NOTHING;
INSERT INTO public."CentroCusto" VALUES ('9bef2467-1703-40b2-a441-1aae369c2dcf', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Area Civil', 'Processos da area civel', true, '2025-12-07 20:03:07.038', '2025-12-07 20:03:07.038') ON CONFLICT DO NOTHING;
INSERT INTO public."CentroCusto" VALUES ('a2946293-e0e4-43d4-a953-01d0d73b4ee6', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Area Familia', 'Processos de direito de familia', true, '2025-12-07 20:03:07.038', '2025-12-07 20:03:07.038') ON CONFLICT DO NOTHING;


--
-- TOC entry 5445 (class 0 OID 22176)
-- Dependencies: 234
-- Data for Name: ChecklistItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ChecklistItem" VALUES ('fa4a2d30-3f53-4aec-9b89-8a537d9e836c', 'f97772e0-2bd4-4334-b692-6686885d25c0', 'Consultar SISBAJUD', false, 1, '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."ChecklistItem" VALUES ('1b24411e-7df5-4456-9c4e-8dd81bd8ff4d', 'f97772e0-2bd4-4334-b692-6686885d25c0', 'Consultar RENAJUD', false, 2, '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."ChecklistItem" VALUES ('0060a8df-5125-419d-84cc-8f4050c7182d', 'f97772e0-2bd4-4334-b692-6686885d25c0', 'Consultar Cartorio de Imoveis', false, 3, '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."ChecklistItem" VALUES ('93b7e1ca-02f2-4803-bc04-7b9d284aa162', '8a8fc088-1210-435f-a190-d8be85fe058b', 'Analisar contestacao', true, 1, '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."ChecklistItem" VALUES ('ae037ede-a3f7-4e06-8369-705c58d15ffb', '8a8fc088-1210-435f-a190-d8be85fe058b', 'Reunir documentos de resposta', true, 2, '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."ChecklistItem" VALUES ('d194d098-34c6-414d-8f0a-f1e39451c27d', '8a8fc088-1210-435f-a190-d8be85fe058b', 'Redigir replica', false, 3, '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."ChecklistItem" VALUES ('9436c590-5a46-4349-996f-e075cf1bf0f2', '8a8fc088-1210-435f-a190-d8be85fe058b', 'Revisar e protocolar', false, 4, '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;


--
-- TOC entry 5432 (class 0 OID 22057)
-- Dependencies: 221
-- Data for Name: Cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Cliente" VALUES ('41eb19a5-ca31-4457-9c56-080856e257a2', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'FISICA', 'Marcos Vinicius Pereira', NULL, NULL, '654.987.321-00', '65.498.732-1', '1982-06-08 00:00:00', 'marcos.pereira@email.com', NULL, '(11) 99444-5555', 'Contador', 'Casado', NULL, '{Familia}', true, '2025-12-07 20:03:07.041', '2025-12-07 20:03:07.041') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('87d644c1-ecd9-4d60-86b2-32f080d9b89f', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'FISICA', 'Fernanda Cristina Alves', NULL, NULL, '321.654.987-00', '32.165.498-7', '1995-02-14 00:00:00', 'fernanda.alves@email.com', NULL, '(11) 99555-4444', 'Arquiteta', 'Casada', NULL, '{Consumidor}', true, '2025-12-07 20:03:07.04', '2025-12-07 20:03:07.04') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('60378a44-e3a9-4d58-9e32-d861555e8d7a', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'FISICA', 'Roberto Augusto Mendes', NULL, NULL, '456.789.123-00', '45.678.912-3', '1978-11-30 00:00:00', 'roberto.mendes@email.com', NULL, '(11) 99666-3333', 'Empresario', 'Divorciado', NULL, '{Empresarial}', true, '2025-12-07 20:03:07.04', '2025-12-07 20:03:07.04') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('44c4dd55-773c-43fa-ba8e-217041f4fe43', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'FISICA', 'Carlos Eduardo Ferreira', NULL, NULL, '123.456.789-00', '12.345.678-9', '1985-03-15 00:00:00', 'carlos.ferreira@email.com', '(11) 3333-1111', '(11) 99888-1111', 'Engenheiro Civil', 'Casado', NULL, '{VIP,Recorrente}', true, '2025-12-07 20:03:07.04', '2025-12-07 20:03:07.04') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('a88c9d69-7fcc-4ed9-a657-42b1da707b50', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'FISICA', 'Ana Paula de Souza Lima', NULL, NULL, '987.654.321-00', '98.765.432-1', '1990-08-22 00:00:00', 'ana.lima@email.com', NULL, '(11) 99777-2222', 'Medica', 'Solteira', NULL, '{Novo}', true, '2025-12-07 20:03:07.04', '2025-12-07 20:03:07.04') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('52b54a12-d400-4755-a3a9-b3cf03f4989c', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'JURIDICA', 'Restaurante Bom Sabor Ltda', 'Restaurante Bom Sabor', 'Restaurante Bom Sabor Gastronomia Ltda', '55.666.777/0001-88', NULL, NULL, 'contato@bomsabor.com.br', '(11) 3000-5000', NULL, NULL, NULL, NULL, '{Empresa,Trabalhista}', true, '2025-12-07 20:03:07.041', '2025-12-07 20:03:07.041') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('9adcc65c-bc5d-4e0a-998d-d6a5476e0726', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'JURIDICA', 'Tech Solutions Ltda', 'TechSol', 'Tech Solutions Tecnologia da Informacao Ltda', '12.345.678/0001-90', NULL, NULL, 'juridico@techsol.com.br', '(11) 3000-2000', NULL, NULL, NULL, NULL, '{Empresa,VIP}', true, '2025-12-07 20:03:07.041', '2025-12-07 20:03:07.041') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('6686ce37-f59e-44ba-8a1e-f237fae7c2b1', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'JURIDICA', 'Clinica Medica Saude Total', 'Clinica Saude Total', 'Clinica Medica Saude Total S/S Ltda', '99.888.777/0001-66', NULL, NULL, 'administrativo@saudetotal.com.br', '(11) 3000-6000', NULL, NULL, NULL, NULL, '{Empresa,Saude}', true, '2025-12-07 20:03:07.041', '2025-12-07 20:03:07.041') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('d6909d34-e6f9-4996-b1b5-b45c777d543b', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'JURIDICA', 'Comercio ABC Ltda', 'Loja ABC', 'Comercio ABC de Eletronicos Ltda', '98.765.432/0001-10', NULL, NULL, 'contato@lojaabc.com.br', '(11) 3000-3000', NULL, NULL, NULL, NULL, '{Empresa,Consumidor}', true, '2025-12-07 20:03:07.041', '2025-12-07 20:03:07.041') ON CONFLICT DO NOTHING;
INSERT INTO public."Cliente" VALUES ('651c3bdb-1c84-471a-b102-04dda979014a', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'JURIDICA', 'Construtora Delta S.A.', 'Delta Construcoes', 'Construtora Delta Empreendimentos Imobiliarios S.A.', '11.222.333/0001-44', NULL, NULL, 'juridico@deltaconstrucoes.com.br', '(11) 3000-4000', NULL, NULL, NULL, NULL, '{Empresa,Imobiliario}', true, '2025-12-07 20:03:07.041', '2025-12-07 20:03:07.041') ON CONFLICT DO NOTHING;


--
-- TOC entry 5446 (class 0 OID 22186)
-- Dependencies: 235
-- Data for Name: Comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5453 (class 0 OID 22249)
-- Dependencies: 242
-- Data for Name: ConfiguracaoFiscal; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ConfiguracaoFiscal" VALUES ('d4283186-335a-4cc6-b7a4-00874ec5b7c5', 2024, 'LUCRO_PRESUMIDO', '{"faixas": [{"ate": 2259.2, "deducao": 0, "aliquota": 0}, {"ate": 2826.65, "deducao": 169.44, "aliquota": 7.5}, {"ate": 3751.05, "deducao": 381.44, "aliquota": 15}, {"ate": 4664.68, "deducao": 662.77, "aliquota": 22.5}, {"ate": null, "deducao": 896, "aliquota": 27.5}]}', 5, 15, 9, NULL, NULL, NULL, '2025-12-07 20:03:07.158', '2025-12-07 20:03:07.158') ON CONFLICT DO NOTHING;


--
-- TOC entry 5463 (class 0 OID 22336)
-- Dependencies: 252
-- Data for Name: ConfiguracaoIA; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ConfiguracaoIA" VALUES ('6144a222-a41b-425c-b516-656a93a68f69', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'gpt-4o', 'text-embedding-3-small', 0.3, 4000, NULL, 1000, 0, '2025-12-07 20:03:07.159', '2025-12-07 20:03:07.159') ON CONFLICT DO NOTHING;


--
-- TOC entry 5442 (class 0 OID 22148)
-- Dependencies: 231
-- Data for Name: Documento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Documento" VALUES ('1f9cab94-79d7-4910-8aee-d55403d25611', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Contrato de Prestacao de Servicos', 'CONTRATO', 'Contrato firmado entre as partes', '/uploads/docs/contrato-servicos.pdf', NULL, NULL, NULL, 1, 'd09b3001-dc14-46a8-a203-a7505f7433be', '44c4dd55-773c-43fa-ba8e-217041f4fe43', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', NULL, NULL, NULL, NULL, NULL, '2025-12-07 20:03:07.095', '2025-12-07 20:03:07.095') ON CONFLICT DO NOTHING;
INSERT INTO public."Documento" VALUES ('1b06a5d2-94c4-4908-a63a-f7d9902c99e0', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Peticao Inicial - Acao de Cobranca', 'PETICAO_INICIAL', 'Peticao inicial da acao de cobranca contra Empresa XYZ', '/uploads/docs/peticao-inicial-cobranca.pdf', NULL, NULL, NULL, 1, 'd09b3001-dc14-46a8-a203-a7505f7433be', '44c4dd55-773c-43fa-ba8e-217041f4fe43', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', NULL, NULL, NULL, 'Peticao inicial pleiteando cobranca de R$ 50.000,00 decorrentes de contrato de prestacao de servicos.', NULL, '2025-12-07 20:03:07.095', '2025-12-07 20:03:07.095') ON CONFLICT DO NOTHING;
INSERT INTO public."Documento" VALUES ('55edecba-36de-4387-beb9-fc65b8fca20c', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Procuracao Ad Judicia', 'PROCURACAO', 'Procuracao outorgada pelo cliente', '/uploads/docs/procuracao-carlos.pdf', NULL, NULL, NULL, 1, NULL, '44c4dd55-773c-43fa-ba8e-217041f4fe43', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', NULL, NULL, NULL, NULL, NULL, '2025-12-07 20:03:07.095', '2025-12-07 20:03:07.095') ON CONFLICT DO NOTHING;


--
-- TOC entry 5433 (class 0 OID 22066)
-- Dependencies: 222
-- Data for Name: Endereco; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Endereco" VALUES ('047ad00d-a65f-40ab-9626-36117f83f522', '60378a44-e3a9-4d58-9e32-d861555e8d7a', 'RESIDENCIAL', '01451-001', 'Rua Haddock Lobo', '1200', NULL, 'Cerqueira Cesar', 'Sao Paulo', 'SP', true, '2025-12-07 20:03:07.04', '2025-12-07 20:03:07.04') ON CONFLICT DO NOTHING;
INSERT INTO public."Endereco" VALUES ('ee063438-32f8-41e3-b0d1-f9214b3e89d2', '44c4dd55-773c-43fa-ba8e-217041f4fe43', 'RESIDENCIAL', '01310-100', 'Av. Paulista', '1000', 'Apto 1501', 'Bela Vista', 'Sao Paulo', 'SP', true, '2025-12-07 20:03:07.04', '2025-12-07 20:03:07.04') ON CONFLICT DO NOTHING;
INSERT INTO public."Endereco" VALUES ('38adb560-47bb-4784-89cc-e2d4ce6648eb', 'a88c9d69-7fcc-4ed9-a657-42b1da707b50', 'RESIDENCIAL', '04543-000', 'Av. Engenheiro Luis Carlos Berrini', '500', 'Apto 2001', 'Brooklin', 'Sao Paulo', 'SP', true, '2025-12-07 20:03:07.04', '2025-12-07 20:03:07.04') ON CONFLICT DO NOTHING;
INSERT INTO public."Endereco" VALUES ('dc290a7f-e134-4cc7-8c70-573cabeb2c8c', '9adcc65c-bc5d-4e0a-998d-d6a5476e0726', 'COMERCIAL', '04538-132', 'Av. Brigadeiro Faria Lima', '3477', '18o andar', 'Itaim Bibi', 'Sao Paulo', 'SP', true, '2025-12-07 20:03:07.041', '2025-12-07 20:03:07.041') ON CONFLICT DO NOTHING;


--
-- TOC entry 5447 (class 0 OID 22194)
-- Dependencies: 236
-- Data for Name: Honorario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Honorario" VALUES ('38d9bdd5-8ebe-448b-8ea3-752db41d7305', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'CONTRATUAL', 'Honorarios advocaticios - Acao de Cobranca', 8000.00, NULL, 'PARCIAL', 'd09b3001-dc14-46a8-a203-a7505f7433be', '44c4dd55-773c-43fa-ba8e-217041f4fe43', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', '9bef2467-1703-40b2-a441-1aae369c2dcf', '2024-12-15 00:00:00', NULL, 4000.00, NULL, '2025-12-07 20:03:07.097', '2025-12-07 20:03:07.097') ON CONFLICT DO NOTHING;
INSERT INTO public."Honorario" VALUES ('ad8930d4-cee3-46d2-bfc7-0225ede665b3', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'EXITO', 'Honorarios de exito - Execucao de Titulo', 24000.00, 20, 'PENDENTE', 'ce11fbe2-ef1e-4340-8323-17559ee561d4', '9adcc65c-bc5d-4e0a-998d-d6a5476e0726', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', '9bef2467-1703-40b2-a441-1aae369c2dcf', NULL, NULL, NULL, NULL, '2025-12-07 20:03:07.097', '2025-12-07 20:03:07.097') ON CONFLICT DO NOTHING;
INSERT INTO public."Honorario" VALUES ('ba02334a-7dab-42a1-a1f4-8250168ab912', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'CONTRATUAL', 'Honorarios advocaticios - Acao de Indenizacao', 3000.00, NULL, 'PAGO', '076bf8ce-bcbe-45db-b1fc-49bc11f482ac', 'a88c9d69-7fcc-4ed9-a657-42b1da707b50', '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', '5b854560-60cf-46a4-8ff4-5cd929d1a95c', NULL, '2024-02-25 00:00:00', 3000.00, NULL, '2025-12-07 20:03:07.097', '2025-12-07 20:03:07.097') ON CONFLICT DO NOTHING;
INSERT INTO public."Honorario" VALUES ('9d60ba50-7fb0-406e-81ac-56fc2649dfa7', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'CONSULTORIA', 'Consultoria juridica mensal - Tech Solutions', 5000.00, NULL, 'PAGO', NULL, '9adcc65c-bc5d-4e0a-998d-d6a5476e0726', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', 'fa9b6646-4682-4c16-9f0a-3d214f9c2be9', NULL, '2024-11-30 00:00:00', 5000.00, NULL, '2025-12-07 20:03:07.097', '2025-12-07 20:03:07.097') ON CONFLICT DO NOTHING;


--
-- TOC entry 5434 (class 0 OID 22076)
-- Dependencies: 223
-- Data for Name: InteracaoCliente; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5458 (class 0 OID 22293)
-- Dependencies: 247
-- Data for Name: Jurisprudencia; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5459 (class 0 OID 22301)
-- Dependencies: 248
-- Data for Name: JurisprudenciaEmbedding; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5454 (class 0 OID 22258)
-- Dependencies: 243
-- Data for Name: Legislacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Legislacao" VALUES ('ed747b46-325f-4189-bea7-4c784a35e91e', 'CC', 'Codigo Civil Brasileiro', 'Lei no 10.406, de 10 de janeiro de 2002 - Institui o Codigo Civil.', '2002-01-10 00:00:00', true, '2025-12-07 20:03:07.108', '2025-12-07 20:03:07.108') ON CONFLICT DO NOTHING;
INSERT INTO public."Legislacao" VALUES ('c9ccfdac-0a28-4c01-8067-744eee14d734', 'CPC', 'Codigo de Processo Civil', 'Lei no 13.105, de 16 de marco de 2015 - Codigo de Processo Civil.', '2015-03-16 00:00:00', true, '2025-12-07 20:03:07.109', '2025-12-07 20:03:07.109') ON CONFLICT DO NOTHING;


--
-- TOC entry 5464 (class 0 OID 22349)
-- Dependencies: 253
-- Data for Name: LogAuditoria; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5461 (class 0 OID 22319)
-- Dependencies: 250
-- Data for Name: LogAutomacao; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5462 (class 0 OID 22327)
-- Dependencies: 251
-- Data for Name: LogIA; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5449 (class 0 OID 22212)
-- Dependencies: 238
-- Data for Name: MovimentacaoFinanceira; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MovimentacaoFinanceira" VALUES ('ad68b35f-c010-40bc-9fdc-4029353739b3', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'RECEITA', 'HONORARIOS', 'Consultoria mensal - Tech Solutions', 5000.00, '2024-11-30 00:00:00', 'CONFIRMADO', NULL, NULL, '9adcc65c-bc5d-4e0a-998d-d6a5476e0726', 'fa9b6646-4682-4c16-9f0a-3d214f9c2be9', '2025-12-07 20:03:07.101', '2025-12-07 20:03:07.101') ON CONFLICT DO NOTHING;
INSERT INTO public."MovimentacaoFinanceira" VALUES ('9d7bbf6d-6bab-4127-ab61-03b1a06bfa38', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'DESPESA', 'CUSTAS', 'Custas judiciais - Acao de Cobranca', 350.00, '2024-01-15 00:00:00', 'CONFIRMADO', NULL, 'd09b3001-dc14-46a8-a203-a7505f7433be', NULL, '9bef2467-1703-40b2-a441-1aae369c2dcf', '2025-12-07 20:03:07.101', '2025-12-07 20:03:07.101') ON CONFLICT DO NOTHING;
INSERT INTO public."MovimentacaoFinanceira" VALUES ('80b85b96-c331-4627-8c6c-84bd19c0acb3', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'RECEITA', 'HONORARIOS', 'Recebimento honorarios - Carlos Ferreira', 4000.00, '2024-11-15 00:00:00', 'CONFIRMADO', NULL, 'd09b3001-dc14-46a8-a203-a7505f7433be', '44c4dd55-773c-43fa-ba8e-217041f4fe43', '9bef2467-1703-40b2-a441-1aae369c2dcf', '2025-12-07 20:03:07.101', '2025-12-07 20:03:07.101') ON CONFLICT DO NOTHING;


--
-- TOC entry 5451 (class 0 OID 22230)
-- Dependencies: 240
-- Data for Name: NotaFiscal; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5465 (class 0 OID 22357)
-- Dependencies: 254
-- Data for Name: Notificacao; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5448 (class 0 OID 22203)
-- Dependencies: 237
-- Data for Name: ParcelaHonorario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ParcelaHonorario" VALUES ('176a40ce-52c5-47d8-a673-aa2b8d38da7e', '38d9bdd5-8ebe-448b-8ea3-752db41d7305', 1, 4000.00, '2024-11-15 00:00:00', true, '2024-11-15 00:00:00', '2025-12-07 20:03:07.097') ON CONFLICT DO NOTHING;
INSERT INTO public."ParcelaHonorario" VALUES ('92f56784-ff3c-4c7a-b515-406c9a9931a4', '38d9bdd5-8ebe-448b-8ea3-752db41d7305', 2, 4000.00, '2024-12-15 00:00:00', false, NULL, '2025-12-07 20:03:07.097') ON CONFLICT DO NOTHING;


--
-- TOC entry 5437 (class 0 OID 22105)
-- Dependencies: 226
-- Data for Name: ParteProcesso; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ParteProcesso" VALUES ('d8601847-6794-40b7-aaa7-ee52eabb5599', '076bf8ce-bcbe-45db-b1fc-49bc11f482ac', 'Magazine Popular S.A.', '22.222.222/0001-22', 'REU', NULL, NULL, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ParteProcesso" VALUES ('75d90e17-902c-43da-845c-226cb982d24b', 'd09b3001-dc14-46a8-a203-a7505f7433be', 'Empresa XYZ Comercio Ltda', '11.111.111/0001-11', 'REU', NULL, NULL, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ParteProcesso" VALUES ('5661f9f3-b9b3-4e82-a1cd-abf4fd9c6e7e', 'b79c93ac-0fc8-49d2-8ef1-76647aed34b2', 'Maria Jose da Silva', '555.666.777-88', 'REU', NULL, NULL, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ParteProcesso" VALUES ('67a22cbd-2206-47ef-be82-3faf862fdfe0', 'a29c5ccf-1b30-47ab-9161-a152b71f6bd1', 'Banco Nacional S.A.', '44.444.444/0001-44', 'REU', NULL, NULL, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ParteProcesso" VALUES ('e12a637b-a6bb-4ea7-b01e-04dea8a5790e', 'ce11fbe2-ef1e-4340-8323-17559ee561d4', 'Jose da Silva ME', '33.333.333/0001-33', 'REU', NULL, NULL, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;


--
-- TOC entry 5441 (class 0 OID 22138)
-- Dependencies: 230
-- Data for Name: Prazo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Prazo" VALUES ('b55d4765-38ad-49f4-b6c1-c2a3314f13ef', '076bf8ce-bcbe-45db-b1fc-49bc11f482ac', 'RECURSO', 'Prazo para embargos de declaracao', '2025-01-08 00:00:00', NULL, 'PENDENTE', '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', 'URGENTE', NULL, '2025-12-07 20:03:07.093', '2025-12-07 20:03:07.093') ON CONFLICT DO NOTHING;
INSERT INTO public."Prazo" VALUES ('81ad2b16-e60e-45c7-875e-ac4f1212a605', 'ce11fbe2-ef1e-4340-8323-17559ee561d4', 'CUMPRIMENTO', 'Cumprir diligencia - pesquisa patrimonial', '2025-01-15 00:00:00', NULL, 'PENDENTE', '9d9ce1e6-c333-4b9a-abc4-8409aed4eb41', 'MEDIA', NULL, '2025-12-07 20:03:07.093', '2025-12-07 20:03:07.093') ON CONFLICT DO NOTHING;
INSERT INTO public."Prazo" VALUES ('864f6d51-e76c-499c-9fc5-868a16a42e6d', 'd09b3001-dc14-46a8-a203-a7505f7433be', 'MANIFESTACAO', 'Manifestar sobre documentos juntados pelo reu', '2025-01-05 00:00:00', NULL, 'PENDENTE', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', 'ALTA', NULL, '2025-12-07 20:03:07.093', '2025-12-07 20:03:07.093') ON CONFLICT DO NOTHING;
INSERT INTO public."Prazo" VALUES ('e87928bb-e968-4dd2-96fd-a4762f1cc0b9', 'a29c5ccf-1b30-47ab-9161-a152b71f6bd1', 'CONTESTACAO', 'Apresentar replica a contestacao do banco', '2025-01-12 00:00:00', NULL, 'PENDENTE', '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', 'ALTA', NULL, '2025-12-07 20:03:07.093', '2025-12-07 20:03:07.093') ON CONFLICT DO NOTHING;


--
-- TOC entry 5435 (class 0 OID 22085)
-- Dependencies: 224
-- Data for Name: Processo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Processo" VALUES ('d09b3001-dc14-46a8-a203-a7505f7433be', '2485cc54-3c72-4c4d-994b-002d1fc36941', '0001234-56.2024.8.26.0100', NULL, 'Acao de Cobranca', 'Procedimento Comum Civel', 'Cobranca de divida - inadimplemento contratual', 'CIVIL', 'ATIVO', 'CONHECIMENTO', '5a Vara Civel', 'Foro Central Civel', 'Sao Paulo', 'SP', 'TJSP', 1, 50000.00, NULL, 'Cobranca de valores devidos em razao de contrato de prestacao de servicos nao adimplido pelo reu.', '2024-01-15 00:00:00', NULL, NULL, NULL, 'Acao de cobranca fundamentada em contrato de prestacao de servicos. Cliente busca receber valores nao pagos pelo reu. Documentacao robusta. Probabilidade de exito alta.', '{"Possivel alegacao de prescricao","Contestacao sobre qualidade do servico"}', 0.85, '{"Verificar prazo prescricional","Reunir todas as notas fiscais"}', NULL, '{"CC Art. 389","CC Art. 395","CC Art. 402"}', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', '2025-12-07 20:03:07.085', '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."Processo" VALUES ('a29c5ccf-1b30-47ab-9161-a152b71f6bd1', '2485cc54-3c72-4c4d-994b-002d1fc36941', '0003333-22.2024.8.26.0100', NULL, 'Acao Revisional de Contrato', 'Procedimento Comum Civel', 'Revisao de contrato bancario - juros abusivos', 'CIVIL', 'ATIVO', 'CONHECIMENTO', '15a Vara Civel', 'Foro Central Civel', 'Sao Paulo', 'SP', 'TJSP', 1, 80000.00, NULL, 'Revisao de clausulas contratuais abusivas em contrato de financiamento bancario.', '2024-03-10 00:00:00', NULL, NULL, NULL, 'Acao revisional de contrato bancario. Cliente alega juros abusivos e capitalizacao indevida. Jurisprudencia favoravel no TJSP para casos similares.', '{"Necessidade de pericia contabil","Sumula 596 do STF"}', 0.75, '{"Requerer pericia contabil","Analisar CET do contrato"}', NULL, '{"CC Art. 421","CC Art. 422","CDC Art. 51"}', '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', '2025-12-07 20:03:07.085', '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."Processo" VALUES ('ce11fbe2-ef1e-4340-8323-17559ee561d4', '2485cc54-3c72-4c4d-994b-002d1fc36941', '0009876-54.2023.8.26.0100', NULL, 'Execucao de Titulo Extrajudicial', 'Execucao de Titulo Extrajudicial', 'Execucao de cheque prescrito', 'CIVIL', 'ATIVO', 'EXECUCAO', '10a Vara Civel', 'Foro Central Civel', 'Sao Paulo', 'SP', 'TJSP', 1, 120000.00, NULL, 'Execucao de titulo extrajudicial (cheques) emitidos pelo devedor e nao honrados.', '2023-10-05 00:00:00', NULL, NULL, NULL, 'Execucao de titulo extrajudicial fundamentada em cheques prescritos. Devedor nao localizou bens penhora eis. Sugestao: pesquisa patrimonial ampla.', '{"Devedor sem patrimonio","Possivel insolvencia"}', 0.7, '{"Realizar pesquisa SISBAJUD","Verificar bens em nome de terceiros"}', NULL, '{"CPC Art. 771","CPC Art. 784","CC Art. 206"}', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', '2025-12-07 20:03:07.085', '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."Processo" VALUES ('b79c93ac-0fc8-49d2-8ef1-76647aed34b2', '2485cc54-3c72-4c4d-994b-002d1fc36941', '0007777-11.2024.8.26.0100', NULL, 'Acao de Despejo por Falta de Pagamento', 'Procedimento Comum Civel', 'Despejo - inadimplemento de alugueis', 'CIVIL', 'ATIVO', 'CONHECIMENTO', '3a Vara Civel', 'Foro Regional de Santana', 'Sao Paulo', 'SP', 'TJSP', 1, 25000.00, NULL, 'Despejo do inquilino por falta de pagamento de alugueis e encargos locaticios.', '2024-04-01 00:00:00', NULL, NULL, NULL, 'Acao de despejo fundamentada na Lei 8.245/91. Inquilino inadimplente ha 4 meses. Alta probabilidade de liminar de despejo.', '{"Inquilino pode purgar a mora"}', 0.95, '{"Calcular todos os alugueis em atraso","Incluir multa e juros"}', NULL, '{"Lei 8.245 Art. 59","Lei 8.245 Art. 62","CC Art. 394"}', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', '2025-12-07 20:03:07.085', '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."Processo" VALUES ('076bf8ce-bcbe-45db-b1fc-49bc11f482ac', '2485cc54-3c72-4c4d-994b-002d1fc36941', '0005678-90.2024.8.26.0100', NULL, 'Acao de Indenizacao por Danos Morais e Materiais', 'Procedimento Comum Civel', 'Responsabilidade civil - danos ao consumidor', 'CONSUMIDOR', 'ATIVO', 'CONHECIMENTO', '2a Vara do Juizado Especial Civel', 'Foro Regional de Pinheiros', 'Sao Paulo', 'SP', 'TJSP', 1, 15000.00, NULL, 'Indenizacao por danos morais e materiais decorrentes de produto defeituoso adquirido pelo consumidor.', '2024-02-20 00:00:00', NULL, NULL, NULL, 'Acao de indenizacao por vicio do produto. Cliente adquiriu eletrodomestico que apresentou defeito. Aplicacao do CDC. Inversao do onus da prova favoravel.', '{"Necessidade de pericia tecnica"}', 0.9, '{"Guardar produto defeituoso","Solicitar inversao do onus da prova"}', NULL, '{"CDC Art. 12","CDC Art. 18","CC Art. 927"}', '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', '2025-12-07 20:03:07.085', '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;


--
-- TOC entry 5436 (class 0 OID 22096)
-- Dependencies: 225
-- Data for Name: ProcessoCliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ProcessoCliente" VALUES ('6862d1a9-0873-48c9-98fc-7e84ce173e08', '076bf8ce-bcbe-45db-b1fc-49bc11f482ac', 'a88c9d69-7fcc-4ed9-a657-42b1da707b50', 'AUTOR', true, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ProcessoCliente" VALUES ('f65d7cc9-9a49-448c-94f5-feb83459bb90', 'a29c5ccf-1b30-47ab-9161-a152b71f6bd1', '41eb19a5-ca31-4457-9c56-080856e257a2', 'AUTOR', true, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ProcessoCliente" VALUES ('9266945b-c592-4554-8aa7-5653885f5179', 'd09b3001-dc14-46a8-a203-a7505f7433be', '44c4dd55-773c-43fa-ba8e-217041f4fe43', 'AUTOR', true, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ProcessoCliente" VALUES ('ff0791d9-9d7b-4b02-8fec-8e090a8eec3b', 'ce11fbe2-ef1e-4340-8323-17559ee561d4', '9adcc65c-bc5d-4e0a-998d-d6a5476e0726', 'AUTOR', true, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;
INSERT INTO public."ProcessoCliente" VALUES ('4ec9d453-bac8-4d69-b39b-1ae0ab3ee84f', 'b79c93ac-0fc8-49d2-8ef1-76647aed34b2', '9adcc65c-bc5d-4e0a-998d-d6a5476e0726', 'AUTOR', true, '2025-12-07 20:03:07.085') ON CONFLICT DO NOTHING;


--
-- TOC entry 5438 (class 0 OID 22113)
-- Dependencies: 227
-- Data for Name: ProcessoEquipe; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5457 (class 0 OID 22285)
-- Dependencies: 246
-- Data for Name: ReferenciaJuridica; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5431 (class 0 OID 22048)
-- Dependencies: 220
-- Data for Name: RefreshToken; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5430 (class 0 OID 22040)
-- Dependencies: 219
-- Data for Name: SessaoLogin; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5444 (class 0 OID 22165)
-- Dependencies: 233
-- Data for Name: Tarefa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Tarefa" VALUES ('3d28de60-f948-4031-98fc-32f29a021081', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Revisar peticao inicial', 'Revisar peticao inicial antes do protocolo', 'A_FAZER', 'URGENTE', '2025-01-05 00:00:00', NULL, 0, '{revisao,peticao}', '076bf8ce-bcbe-45db-b1fc-49bc11f482ac', NULL, '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', '2025-12-07 20:03:07.103', '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."Tarefa" VALUES ('fbb5d849-19ae-4148-8a28-9b4627c050b3', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Preparar documentos para audiencia', 'Separar e organizar todos os documentos necessarios para a audiencia de conciliacao', 'A_FAZER', 'ALTA', '2025-01-18 00:00:00', NULL, 0, '{audiencia,documentos}', 'd09b3001-dc14-46a8-a203-a7505f7433be', NULL, '9d9ce1e6-c333-4b9a-abc4-8409aed4eb41', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', '2025-12-07 20:03:07.103', '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."Tarefa" VALUES ('8a8fc088-1210-435f-a190-d8be85fe058b', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Elaborar replica a contestacao', 'Elaborar replica refutando os argumentos apresentados na contestacao do reu', 'EM_ANDAMENTO', 'ALTA', '2025-01-10 00:00:00', NULL, 0, '{replica,urgente}', 'd09b3001-dc14-46a8-a203-a7505f7433be', NULL, '50a11da8-fe2e-430a-bcf5-940c4bb214ff', 'f0b8d69d-8dc7-4b23-9e6b-5a9a1864506d', '2025-12-07 20:03:07.103', '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;
INSERT INTO public."Tarefa" VALUES ('f97772e0-2bd4-4334-b692-6686885d25c0', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'Pesquisa de bens do devedor', 'Realizar pesquisa patrimonial completa do devedor para penhora', 'A_FAZER', 'MEDIA', '2025-01-15 00:00:00', NULL, 0, '{pesquisa,execucao}', 'ce11fbe2-ef1e-4340-8323-17559ee561d4', NULL, '9d9ce1e6-c333-4b9a-abc4-8409aed4eb41', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', '2025-12-07 20:03:07.103', '2025-12-07 20:03:07.103') ON CONFLICT DO NOTHING;


--
-- TOC entry 5429 (class 0 OID 22029)
-- Dependencies: 218
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Usuario" VALUES ('f0b8d69d-8dc7-4b23-9e6b-5a9a1864506d', 'admin@officebrain.com.br', '$2b$10$6VOedtkAGAgV7jcBQ.I3Mu8ApcWnmpokuIflvxYE09GGe08ES0S2m', 'Administrador do Sistema', NULL, NULL, 'ADMIN', true, NULL, true, NULL, '2025-12-07 20:03:06.995', '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."Usuario" VALUES ('50a11da8-fe2e-430a-bcf5-940c4bb214ff', 'joao.silva@silvaassociados.adv.br', '$2b$10$6VOedtkAGAgV7jcBQ.I3Mu8ApcWnmpokuIflvxYE09GGe08ES0S2m', 'Dr. Joao Carlos da Silva', 'SP 123.456', '(11) 99999-1111', 'SOCIO', true, NULL, true, NULL, '2025-12-07 20:03:06.995', '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."Usuario" VALUES ('644a0c04-467b-4f54-9450-a0792441bc37', 'ana.costa@silvaassociados.adv.br', '$2b$10$6VOedtkAGAgV7jcBQ.I3Mu8ApcWnmpokuIflvxYE09GGe08ES0S2m', 'Ana Paula Costa', NULL, '(11) 99999-4444', 'FINANCEIRO', true, NULL, true, NULL, '2025-12-07 20:03:06.995', '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."Usuario" VALUES ('5c2c13cc-8e3e-47ef-b4fa-9b582148b127', 'maria.santos@silvaassociados.adv.br', '$2b$10$6VOedtkAGAgV7jcBQ.I3Mu8ApcWnmpokuIflvxYE09GGe08ES0S2m', 'Dra. Maria Fernanda Santos', 'SP 654.321', '(11) 99999-2222', 'ADVOGADO', true, NULL, true, NULL, '2025-12-07 20:03:06.995', '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."Usuario" VALUES ('9d9ce1e6-c333-4b9a-abc4-8409aed4eb41', 'pedro.oliveira@silvaassociados.adv.br', '$2b$10$6VOedtkAGAgV7jcBQ.I3Mu8ApcWnmpokuIflvxYE09GGe08ES0S2m', 'Pedro Henrique Oliveira', 'SP 789.012', '(11) 99999-3333', 'ESTAGIARIO', true, NULL, true, NULL, '2025-12-07 20:03:06.995', '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;


--
-- TOC entry 5443 (class 0 OID 22157)
-- Dependencies: 232
-- Data for Name: VersaoDocumento; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5427 (class 0 OID 22009)
-- Dependencies: 216
-- Data for Name: Workspace; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Workspace" VALUES ('2485cc54-3c72-4c4d-994b-002d1fc36941', 'Silva e Associados Advocacia', 'silva-associados', '12.345.678/0001-90', NULL, 'Av. Paulista, 1000, 10o andar, Bela Vista, Sao Paulo/SP', '(11) 3000-1000', 'contato@silvaassociados.adv.br', 'https://silvaassociados.adv.br', 'LUCRO_PRESUMIDO', '{"corPrimaria": "#2563eb", "fusoHorario": "America/Sao_Paulo", "corSecundaria": "#7c3aed"}', true, '2025-12-07 20:03:06.946', '2025-12-07 20:03:06.946') ON CONFLICT DO NOTHING;


--
-- TOC entry 5428 (class 0 OID 22019)
-- Dependencies: 217
-- Data for Name: WorkspaceMembro; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."WorkspaceMembro" VALUES ('3eabaf0c-4cdb-49c5-ac83-c83e63c6b086', '2485cc54-3c72-4c4d-994b-002d1fc36941', 'f0b8d69d-8dc7-4b23-9e6b-5a9a1864506d', 'ADMIN', true, '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."WorkspaceMembro" VALUES ('2a0178f7-734e-40ca-a4de-c245563ca4b0', '2485cc54-3c72-4c4d-994b-002d1fc36941', '50a11da8-fe2e-430a-bcf5-940c4bb214ff', 'SOCIO', true, '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."WorkspaceMembro" VALUES ('19441888-6fb4-47a9-8396-34b33d44e9d2', '2485cc54-3c72-4c4d-994b-002d1fc36941', '644a0c04-467b-4f54-9450-a0792441bc37', 'FINANCEIRO', true, '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."WorkspaceMembro" VALUES ('f16e89fa-95a7-4821-a183-3951eced0fe2', '2485cc54-3c72-4c4d-994b-002d1fc36941', '5c2c13cc-8e3e-47ef-b4fa-9b582148b127', 'ADVOGADO', true, '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;
INSERT INTO public."WorkspaceMembro" VALUES ('727b68c4-5ff5-41a4-ae07-ab0fab1dced0', '2485cc54-3c72-4c4d-994b-002d1fc36941', '9d9ce1e6-c333-4b9a-abc4-8409aed4eb41', 'ESTAGIARIO', true, '2025-12-07 20:03:06.995') ON CONFLICT DO NOTHING;


--
-- TOC entry 5106 (class 2606 OID 22128)
-- Name: AndamentoProcessual AndamentoProcessual_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AndamentoProcessual"
    ADD CONSTRAINT "AndamentoProcessual_pkey" PRIMARY KEY (id);


--
-- TOC entry 5187 (class 2606 OID 22284)
-- Name: ArtigoEmbedding ArtigoEmbedding_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArtigoEmbedding"
    ADD CONSTRAINT "ArtigoEmbedding_pkey" PRIMARY KEY (id);


--
-- TOC entry 5183 (class 2606 OID 22275)
-- Name: ArtigoLei ArtigoLei_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArtigoLei"
    ADD CONSTRAINT "ArtigoLei_pkey" PRIMARY KEY (id);


--
-- TOC entry 5110 (class 2606 OID 22137)
-- Name: Audiencia Audiencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audiencia"
    ADD CONSTRAINT "Audiencia_pkey" PRIMARY KEY (id);


--
-- TOC entry 5202 (class 2606 OID 22318)
-- Name: Automacao Automacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Automacao"
    ADD CONSTRAINT "Automacao_pkey" PRIMARY KEY (id);


--
-- TOC entry 5171 (class 2606 OID 22248)
-- Name: CalculoIRPF CalculoIRPF_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CalculoIRPF"
    ADD CONSTRAINT "CalculoIRPF_pkey" PRIMARY KEY (id);


--
-- TOC entry 5162 (class 2606 OID 22229)
-- Name: CentroCusto CentroCusto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CentroCusto"
    ADD CONSTRAINT "CentroCusto_pkey" PRIMARY KEY (id);


--
-- TOC entry 5137 (class 2606 OID 22185)
-- Name: ChecklistItem ChecklistItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChecklistItem"
    ADD CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY (id);


--
-- TOC entry 5074 (class 2606 OID 22065)
-- Name: Cliente Cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cliente"
    ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY (id);


--
-- TOC entry 5140 (class 2606 OID 22193)
-- Name: Comentario Comentario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_pkey" PRIMARY KEY (id);


--
-- TOC entry 5174 (class 2606 OID 22257)
-- Name: ConfiguracaoFiscal ConfiguracaoFiscal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ConfiguracaoFiscal"
    ADD CONSTRAINT "ConfiguracaoFiscal_pkey" PRIMARY KEY (id);


--
-- TOC entry 5215 (class 2606 OID 22348)
-- Name: ConfiguracaoIA ConfiguracaoIA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ConfiguracaoIA"
    ADD CONSTRAINT "ConfiguracaoIA_pkey" PRIMARY KEY (id);


--
-- TOC entry 5121 (class 2606 OID 22156)
-- Name: Documento Documento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documento"
    ADD CONSTRAINT "Documento_pkey" PRIMARY KEY (id);


--
-- TOC entry 5078 (class 2606 OID 22075)
-- Name: Endereco Endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Endereco"
    ADD CONSTRAINT "Endereco_pkey" PRIMARY KEY (id);


--
-- TOC entry 5145 (class 2606 OID 22202)
-- Name: Honorario Honorario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Honorario"
    ADD CONSTRAINT "Honorario_pkey" PRIMARY KEY (id);


--
-- TOC entry 5082 (class 2606 OID 22084)
-- Name: InteracaoCliente InteracaoCliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InteracaoCliente"
    ADD CONSTRAINT "InteracaoCliente_pkey" PRIMARY KEY (id);


--
-- TOC entry 5200 (class 2606 OID 22309)
-- Name: JurisprudenciaEmbedding JurisprudenciaEmbedding_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JurisprudenciaEmbedding"
    ADD CONSTRAINT "JurisprudenciaEmbedding_pkey" PRIMARY KEY (id);


--
-- TOC entry 5193 (class 2606 OID 22300)
-- Name: Jurisprudencia Jurisprudencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Jurisprudencia"
    ADD CONSTRAINT "Jurisprudencia_pkey" PRIMARY KEY (id);


--
-- TOC entry 5178 (class 2606 OID 22266)
-- Name: Legislacao Legislacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Legislacao"
    ADD CONSTRAINT "Legislacao_pkey" PRIMARY KEY (id);


--
-- TOC entry 5221 (class 2606 OID 22356)
-- Name: LogAuditoria LogAuditoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogAuditoria"
    ADD CONSTRAINT "LogAuditoria_pkey" PRIMARY KEY (id);


--
-- TOC entry 5209 (class 2606 OID 22326)
-- Name: LogAutomacao LogAutomacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogAutomacao"
    ADD CONSTRAINT "LogAutomacao_pkey" PRIMARY KEY (id);


--
-- TOC entry 5212 (class 2606 OID 22335)
-- Name: LogIA LogIA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogIA"
    ADD CONSTRAINT "LogIA_pkey" PRIMARY KEY (id);


--
-- TOC entry 5156 (class 2606 OID 22220)
-- Name: MovimentacaoFinanceira MovimentacaoFinanceira_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovimentacaoFinanceira"
    ADD CONSTRAINT "MovimentacaoFinanceira_pkey" PRIMARY KEY (id);


--
-- TOC entry 5167 (class 2606 OID 22237)
-- Name: NotaFiscal NotaFiscal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotaFiscal"
    ADD CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY (id);


--
-- TOC entry 5226 (class 2606 OID 22365)
-- Name: Notificacao Notificacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notificacao"
    ADD CONSTRAINT "Notificacao_pkey" PRIMARY KEY (id);


--
-- TOC entry 5151 (class 2606 OID 22211)
-- Name: ParcelaHonorario ParcelaHonorario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParcelaHonorario"
    ADD CONSTRAINT "ParcelaHonorario_pkey" PRIMARY KEY (id);


--
-- TOC entry 5097 (class 2606 OID 22112)
-- Name: ParteProcesso ParteProcesso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParteProcesso"
    ADD CONSTRAINT "ParteProcesso_pkey" PRIMARY KEY (id);


--
-- TOC entry 5115 (class 2606 OID 22147)
-- Name: Prazo Prazo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prazo"
    ADD CONSTRAINT "Prazo_pkey" PRIMARY KEY (id);


--
-- TOC entry 5093 (class 2606 OID 22104)
-- Name: ProcessoCliente ProcessoCliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProcessoCliente"
    ADD CONSTRAINT "ProcessoCliente_pkey" PRIMARY KEY (id);


--
-- TOC entry 5100 (class 2606 OID 22120)
-- Name: ProcessoEquipe ProcessoEquipe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProcessoEquipe"
    ADD CONSTRAINT "ProcessoEquipe_pkey" PRIMARY KEY (id);


--
-- TOC entry 5088 (class 2606 OID 22095)
-- Name: Processo Processo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Processo"
    ADD CONSTRAINT "Processo_pkey" PRIMARY KEY (id);


--
-- TOC entry 5190 (class 2606 OID 22292)
-- Name: ReferenciaJuridica ReferenciaJuridica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReferenciaJuridica"
    ADD CONSTRAINT "ReferenciaJuridica_pkey" PRIMARY KEY (id);


--
-- TOC entry 5065 (class 2606 OID 22056)
-- Name: RefreshToken RefreshToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY (id);


--
-- TOC entry 5060 (class 2606 OID 22047)
-- Name: SessaoLogin SessaoLogin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SessaoLogin"
    ADD CONSTRAINT "SessaoLogin_pkey" PRIMARY KEY (id);


--
-- TOC entry 5131 (class 2606 OID 22175)
-- Name: Tarefa Tarefa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tarefa"
    ADD CONSTRAINT "Tarefa_pkey" PRIMARY KEY (id);


--
-- TOC entry 5058 (class 2606 OID 22039)
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- TOC entry 5127 (class 2606 OID 22164)
-- Name: VersaoDocumento VersaoDocumento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersaoDocumento"
    ADD CONSTRAINT "VersaoDocumento_pkey" PRIMARY KEY (id);


--
-- TOC entry 5050 (class 2606 OID 22028)
-- Name: WorkspaceMembro WorkspaceMembro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkspaceMembro"
    ADD CONSTRAINT "WorkspaceMembro_pkey" PRIMARY KEY (id);


--
-- TOC entry 5046 (class 2606 OID 22018)
-- Name: Workspace Workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workspace"
    ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY (id);


--
-- TOC entry 5104 (class 1259 OID 22403)
-- Name: AndamentoProcessual_data_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "AndamentoProcessual_data_idx" ON public."AndamentoProcessual" USING btree (data);


--
-- TOC entry 5107 (class 1259 OID 22402)
-- Name: AndamentoProcessual_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "AndamentoProcessual_processoId_idx" ON public."AndamentoProcessual" USING btree ("processoId");


--
-- TOC entry 5184 (class 1259 OID 22449)
-- Name: ArtigoEmbedding_artigoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ArtigoEmbedding_artigoId_idx" ON public."ArtigoEmbedding" USING btree ("artigoId");


--
-- TOC entry 5185 (class 1259 OID 22448)
-- Name: ArtigoEmbedding_artigoId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ArtigoEmbedding_artigoId_key" ON public."ArtigoEmbedding" USING btree ("artigoId");


--
-- TOC entry 5179 (class 1259 OID 22445)
-- Name: ArtigoLei_legislacaoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ArtigoLei_legislacaoId_idx" ON public."ArtigoLei" USING btree ("legislacaoId");


--
-- TOC entry 5180 (class 1259 OID 22447)
-- Name: ArtigoLei_legislacaoId_numeroArtigo_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ArtigoLei_legislacaoId_numeroArtigo_key" ON public."ArtigoLei" USING btree ("legislacaoId", "numeroArtigo");


--
-- TOC entry 5181 (class 1259 OID 22446)
-- Name: ArtigoLei_numeroArtigo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ArtigoLei_numeroArtigo_idx" ON public."ArtigoLei" USING btree ("numeroArtigo");


--
-- TOC entry 5108 (class 1259 OID 22405)
-- Name: Audiencia_data_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Audiencia_data_idx" ON public."Audiencia" USING btree (data);


--
-- TOC entry 5111 (class 1259 OID 22404)
-- Name: Audiencia_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Audiencia_processoId_idx" ON public."Audiencia" USING btree ("processoId");


--
-- TOC entry 5112 (class 1259 OID 22406)
-- Name: Audiencia_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Audiencia_status_idx" ON public."Audiencia" USING btree (status);


--
-- TOC entry 5203 (class 1259 OID 22459)
-- Name: Automacao_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Automacao_status_idx" ON public."Automacao" USING btree (status);


--
-- TOC entry 5204 (class 1259 OID 22458)
-- Name: Automacao_tipo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Automacao_tipo_idx" ON public."Automacao" USING btree (tipo);


--
-- TOC entry 5205 (class 1259 OID 22457)
-- Name: Automacao_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Automacao_workspaceId_idx" ON public."Automacao" USING btree ("workspaceId");


--
-- TOC entry 5168 (class 1259 OID 22440)
-- Name: CalculoIRPF_competencia_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "CalculoIRPF_competencia_idx" ON public."CalculoIRPF" USING btree (competencia);


--
-- TOC entry 5169 (class 1259 OID 22441)
-- Name: CalculoIRPF_pago_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "CalculoIRPF_pago_idx" ON public."CalculoIRPF" USING btree (pago);


--
-- TOC entry 5160 (class 1259 OID 22437)
-- Name: CentroCusto_nome_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "CentroCusto_nome_idx" ON public."CentroCusto" USING btree (nome);


--
-- TOC entry 5163 (class 1259 OID 22436)
-- Name: CentroCusto_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "CentroCusto_workspaceId_idx" ON public."CentroCusto" USING btree ("workspaceId");


--
-- TOC entry 5138 (class 1259 OID 22422)
-- Name: ChecklistItem_tarefaId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ChecklistItem_tarefaId_idx" ON public."ChecklistItem" USING btree ("tarefaId");


--
-- TOC entry 5069 (class 1259 OID 22383)
-- Name: Cliente_cpfCnpj_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Cliente_cpfCnpj_idx" ON public."Cliente" USING btree ("cpfCnpj");


--
-- TOC entry 5070 (class 1259 OID 22381)
-- Name: Cliente_cpfCnpj_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cliente_cpfCnpj_key" ON public."Cliente" USING btree ("cpfCnpj");


--
-- TOC entry 5071 (class 1259 OID 22385)
-- Name: Cliente_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Cliente_email_idx" ON public."Cliente" USING btree (email);


--
-- TOC entry 5072 (class 1259 OID 22384)
-- Name: Cliente_nome_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Cliente_nome_idx" ON public."Cliente" USING btree (nome);


--
-- TOC entry 5075 (class 1259 OID 22382)
-- Name: Cliente_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Cliente_workspaceId_idx" ON public."Cliente" USING btree ("workspaceId");


--
-- TOC entry 5141 (class 1259 OID 22423)
-- Name: Comentario_tarefaId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Comentario_tarefaId_idx" ON public."Comentario" USING btree ("tarefaId");


--
-- TOC entry 5172 (class 1259 OID 22442)
-- Name: ConfiguracaoFiscal_ano_regime_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ConfiguracaoFiscal_ano_regime_key" ON public."ConfiguracaoFiscal" USING btree (ano, regime);


--
-- TOC entry 5216 (class 1259 OID 22464)
-- Name: ConfiguracaoIA_workspaceId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ConfiguracaoIA_workspaceId_key" ON public."ConfiguracaoIA" USING btree ("workspaceId");


--
-- TOC entry 5119 (class 1259 OID 22413)
-- Name: Documento_clienteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Documento_clienteId_idx" ON public."Documento" USING btree ("clienteId");


--
-- TOC entry 5122 (class 1259 OID 22412)
-- Name: Documento_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Documento_processoId_idx" ON public."Documento" USING btree ("processoId");


--
-- TOC entry 5123 (class 1259 OID 22414)
-- Name: Documento_tipo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Documento_tipo_idx" ON public."Documento" USING btree (tipo);


--
-- TOC entry 5124 (class 1259 OID 22411)
-- Name: Documento_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Documento_workspaceId_idx" ON public."Documento" USING btree ("workspaceId");


--
-- TOC entry 5076 (class 1259 OID 22386)
-- Name: Endereco_clienteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Endereco_clienteId_idx" ON public."Endereco" USING btree ("clienteId");


--
-- TOC entry 5142 (class 1259 OID 22428)
-- Name: Honorario_advogadoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Honorario_advogadoId_idx" ON public."Honorario" USING btree ("advogadoId");


--
-- TOC entry 5143 (class 1259 OID 22425)
-- Name: Honorario_clienteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Honorario_clienteId_idx" ON public."Honorario" USING btree ("clienteId");


--
-- TOC entry 5146 (class 1259 OID 22426)
-- Name: Honorario_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Honorario_processoId_idx" ON public."Honorario" USING btree ("processoId");


--
-- TOC entry 5147 (class 1259 OID 22427)
-- Name: Honorario_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Honorario_status_idx" ON public."Honorario" USING btree (status);


--
-- TOC entry 5148 (class 1259 OID 22424)
-- Name: Honorario_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Honorario_workspaceId_idx" ON public."Honorario" USING btree ("workspaceId");


--
-- TOC entry 5079 (class 1259 OID 22387)
-- Name: InteracaoCliente_clienteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "InteracaoCliente_clienteId_idx" ON public."InteracaoCliente" USING btree ("clienteId");


--
-- TOC entry 5080 (class 1259 OID 22388)
-- Name: InteracaoCliente_data_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "InteracaoCliente_data_idx" ON public."InteracaoCliente" USING btree (data);


--
-- TOC entry 5197 (class 1259 OID 22456)
-- Name: JurisprudenciaEmbedding_jurisprudenciaId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "JurisprudenciaEmbedding_jurisprudenciaId_idx" ON public."JurisprudenciaEmbedding" USING btree ("jurisprudenciaId");


--
-- TOC entry 5198 (class 1259 OID 22455)
-- Name: JurisprudenciaEmbedding_jurisprudenciaId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "JurisprudenciaEmbedding_jurisprudenciaId_key" ON public."JurisprudenciaEmbedding" USING btree ("jurisprudenciaId");


--
-- TOC entry 5194 (class 1259 OID 22453)
-- Name: Jurisprudencia_temas_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Jurisprudencia_temas_idx" ON public."Jurisprudencia" USING btree (temas);


--
-- TOC entry 5195 (class 1259 OID 22452)
-- Name: Jurisprudencia_tribunal_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Jurisprudencia_tribunal_idx" ON public."Jurisprudencia" USING btree (tribunal);


--
-- TOC entry 5196 (class 1259 OID 22454)
-- Name: Jurisprudencia_tribunal_numero_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Jurisprudencia_tribunal_numero_key" ON public."Jurisprudencia" USING btree (tribunal, numero);


--
-- TOC entry 5175 (class 1259 OID 22443)
-- Name: Legislacao_codigo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Legislacao_codigo_idx" ON public."Legislacao" USING btree (codigo);


--
-- TOC entry 5176 (class 1259 OID 22444)
-- Name: Legislacao_codigo_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Legislacao_codigo_key" ON public."Legislacao" USING btree (codigo);


--
-- TOC entry 5217 (class 1259 OID 22466)
-- Name: LogAuditoria_acao_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogAuditoria_acao_idx" ON public."LogAuditoria" USING btree (acao);


--
-- TOC entry 5218 (class 1259 OID 22468)
-- Name: LogAuditoria_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogAuditoria_createdAt_idx" ON public."LogAuditoria" USING btree ("createdAt");


--
-- TOC entry 5219 (class 1259 OID 22467)
-- Name: LogAuditoria_entidade_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogAuditoria_entidade_idx" ON public."LogAuditoria" USING btree (entidade);


--
-- TOC entry 5222 (class 1259 OID 22465)
-- Name: LogAuditoria_usuarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogAuditoria_usuarioId_idx" ON public."LogAuditoria" USING btree ("usuarioId");


--
-- TOC entry 5206 (class 1259 OID 22460)
-- Name: LogAutomacao_automacaoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogAutomacao_automacaoId_idx" ON public."LogAutomacao" USING btree ("automacaoId");


--
-- TOC entry 5207 (class 1259 OID 22461)
-- Name: LogAutomacao_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogAutomacao_createdAt_idx" ON public."LogAutomacao" USING btree ("createdAt");


--
-- TOC entry 5210 (class 1259 OID 22463)
-- Name: LogIA_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogIA_createdAt_idx" ON public."LogIA" USING btree ("createdAt");


--
-- TOC entry 5213 (class 1259 OID 22462)
-- Name: LogIA_tipo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LogIA_tipo_idx" ON public."LogIA" USING btree (tipo);


--
-- TOC entry 5153 (class 1259 OID 22435)
-- Name: MovimentacaoFinanceira_clienteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MovimentacaoFinanceira_clienteId_idx" ON public."MovimentacaoFinanceira" USING btree ("clienteId");


--
-- TOC entry 5154 (class 1259 OID 22433)
-- Name: MovimentacaoFinanceira_data_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MovimentacaoFinanceira_data_idx" ON public."MovimentacaoFinanceira" USING btree (data);


--
-- TOC entry 5157 (class 1259 OID 22434)
-- Name: MovimentacaoFinanceira_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MovimentacaoFinanceira_processoId_idx" ON public."MovimentacaoFinanceira" USING btree ("processoId");


--
-- TOC entry 5158 (class 1259 OID 22432)
-- Name: MovimentacaoFinanceira_tipo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MovimentacaoFinanceira_tipo_idx" ON public."MovimentacaoFinanceira" USING btree (tipo);


--
-- TOC entry 5159 (class 1259 OID 22431)
-- Name: MovimentacaoFinanceira_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MovimentacaoFinanceira_workspaceId_idx" ON public."MovimentacaoFinanceira" USING btree ("workspaceId");


--
-- TOC entry 5164 (class 1259 OID 22438)
-- Name: NotaFiscal_honorarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "NotaFiscal_honorarioId_idx" ON public."NotaFiscal" USING btree ("honorarioId");


--
-- TOC entry 5165 (class 1259 OID 22439)
-- Name: NotaFiscal_numero_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "NotaFiscal_numero_idx" ON public."NotaFiscal" USING btree (numero);


--
-- TOC entry 5223 (class 1259 OID 22472)
-- Name: Notificacao_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notificacao_createdAt_idx" ON public."Notificacao" USING btree ("createdAt");


--
-- TOC entry 5224 (class 1259 OID 22471)
-- Name: Notificacao_lida_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notificacao_lida_idx" ON public."Notificacao" USING btree (lida);


--
-- TOC entry 5227 (class 1259 OID 22470)
-- Name: Notificacao_usuarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notificacao_usuarioId_idx" ON public."Notificacao" USING btree ("usuarioId");


--
-- TOC entry 5228 (class 1259 OID 22469)
-- Name: Notificacao_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notificacao_workspaceId_idx" ON public."Notificacao" USING btree ("workspaceId");


--
-- TOC entry 5149 (class 1259 OID 22429)
-- Name: ParcelaHonorario_honorarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ParcelaHonorario_honorarioId_idx" ON public."ParcelaHonorario" USING btree ("honorarioId");


--
-- TOC entry 5152 (class 1259 OID 22430)
-- Name: ParcelaHonorario_vencimento_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ParcelaHonorario_vencimento_idx" ON public."ParcelaHonorario" USING btree (vencimento);


--
-- TOC entry 5098 (class 1259 OID 22398)
-- Name: ParteProcesso_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ParteProcesso_processoId_idx" ON public."ParteProcesso" USING btree ("processoId");


--
-- TOC entry 5113 (class 1259 OID 22408)
-- Name: Prazo_dataLimite_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Prazo_dataLimite_idx" ON public."Prazo" USING btree ("dataLimite");


--
-- TOC entry 5116 (class 1259 OID 22407)
-- Name: Prazo_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Prazo_processoId_idx" ON public."Prazo" USING btree ("processoId");


--
-- TOC entry 5117 (class 1259 OID 22410)
-- Name: Prazo_responsavelId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Prazo_responsavelId_idx" ON public."Prazo" USING btree ("responsavelId");


--
-- TOC entry 5118 (class 1259 OID 22409)
-- Name: Prazo_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Prazo_status_idx" ON public."Prazo" USING btree (status);


--
-- TOC entry 5091 (class 1259 OID 22396)
-- Name: ProcessoCliente_clienteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProcessoCliente_clienteId_idx" ON public."ProcessoCliente" USING btree ("clienteId");


--
-- TOC entry 5094 (class 1259 OID 22397)
-- Name: ProcessoCliente_processoId_clienteId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProcessoCliente_processoId_clienteId_key" ON public."ProcessoCliente" USING btree ("processoId", "clienteId");


--
-- TOC entry 5095 (class 1259 OID 22395)
-- Name: ProcessoCliente_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProcessoCliente_processoId_idx" ON public."ProcessoCliente" USING btree ("processoId");


--
-- TOC entry 5101 (class 1259 OID 22399)
-- Name: ProcessoEquipe_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProcessoEquipe_processoId_idx" ON public."ProcessoEquipe" USING btree ("processoId");


--
-- TOC entry 5102 (class 1259 OID 22401)
-- Name: ProcessoEquipe_processoId_usuarioId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProcessoEquipe_processoId_usuarioId_key" ON public."ProcessoEquipe" USING btree ("processoId", "usuarioId");


--
-- TOC entry 5103 (class 1259 OID 22400)
-- Name: ProcessoEquipe_usuarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProcessoEquipe_usuarioId_idx" ON public."ProcessoEquipe" USING btree ("usuarioId");


--
-- TOC entry 5083 (class 1259 OID 22394)
-- Name: Processo_advogadoResponsavelId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Processo_advogadoResponsavelId_idx" ON public."Processo" USING btree ("advogadoResponsavelId");


--
-- TOC entry 5084 (class 1259 OID 22393)
-- Name: Processo_area_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Processo_area_idx" ON public."Processo" USING btree (area);


--
-- TOC entry 5085 (class 1259 OID 22391)
-- Name: Processo_numeroCnj_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Processo_numeroCnj_idx" ON public."Processo" USING btree ("numeroCnj");


--
-- TOC entry 5086 (class 1259 OID 22389)
-- Name: Processo_numeroCnj_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Processo_numeroCnj_key" ON public."Processo" USING btree ("numeroCnj");


--
-- TOC entry 5089 (class 1259 OID 22392)
-- Name: Processo_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Processo_status_idx" ON public."Processo" USING btree (status);


--
-- TOC entry 5090 (class 1259 OID 22390)
-- Name: Processo_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Processo_workspaceId_idx" ON public."Processo" USING btree ("workspaceId");


--
-- TOC entry 5188 (class 1259 OID 22451)
-- Name: ReferenciaJuridica_artigoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ReferenciaJuridica_artigoId_idx" ON public."ReferenciaJuridica" USING btree ("artigoId");


--
-- TOC entry 5191 (class 1259 OID 22450)
-- Name: ReferenciaJuridica_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ReferenciaJuridica_processoId_idx" ON public."ReferenciaJuridica" USING btree ("processoId");


--
-- TOC entry 5066 (class 1259 OID 22380)
-- Name: RefreshToken_token_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "RefreshToken_token_idx" ON public."RefreshToken" USING btree (token);


--
-- TOC entry 5067 (class 1259 OID 22378)
-- Name: RefreshToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RefreshToken_token_key" ON public."RefreshToken" USING btree (token);


--
-- TOC entry 5068 (class 1259 OID 22379)
-- Name: RefreshToken_usuarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "RefreshToken_usuarioId_idx" ON public."RefreshToken" USING btree ("usuarioId");


--
-- TOC entry 5061 (class 1259 OID 22377)
-- Name: SessaoLogin_token_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SessaoLogin_token_idx" ON public."SessaoLogin" USING btree (token);


--
-- TOC entry 5062 (class 1259 OID 22375)
-- Name: SessaoLogin_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SessaoLogin_token_key" ON public."SessaoLogin" USING btree (token);


--
-- TOC entry 5063 (class 1259 OID 22376)
-- Name: SessaoLogin_usuarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "SessaoLogin_usuarioId_idx" ON public."SessaoLogin" USING btree ("usuarioId");


--
-- TOC entry 5128 (class 1259 OID 22419)
-- Name: Tarefa_clienteId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tarefa_clienteId_idx" ON public."Tarefa" USING btree ("clienteId");


--
-- TOC entry 5129 (class 1259 OID 22421)
-- Name: Tarefa_dataLimite_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tarefa_dataLimite_idx" ON public."Tarefa" USING btree ("dataLimite");


--
-- TOC entry 5132 (class 1259 OID 22418)
-- Name: Tarefa_processoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tarefa_processoId_idx" ON public."Tarefa" USING btree ("processoId");


--
-- TOC entry 5133 (class 1259 OID 22420)
-- Name: Tarefa_responsavelId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tarefa_responsavelId_idx" ON public."Tarefa" USING btree ("responsavelId");


--
-- TOC entry 5134 (class 1259 OID 22417)
-- Name: Tarefa_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tarefa_status_idx" ON public."Tarefa" USING btree (status);


--
-- TOC entry 5135 (class 1259 OID 22416)
-- Name: Tarefa_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tarefa_workspaceId_idx" ON public."Tarefa" USING btree ("workspaceId");


--
-- TOC entry 5054 (class 1259 OID 22373)
-- Name: Usuario_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Usuario_email_idx" ON public."Usuario" USING btree (email);


--
-- TOC entry 5055 (class 1259 OID 22372)
-- Name: Usuario_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Usuario_email_key" ON public."Usuario" USING btree (email);


--
-- TOC entry 5056 (class 1259 OID 22374)
-- Name: Usuario_perfil_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Usuario_perfil_idx" ON public."Usuario" USING btree (perfil);


--
-- TOC entry 5125 (class 1259 OID 22415)
-- Name: VersaoDocumento_documentoId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VersaoDocumento_documentoId_idx" ON public."VersaoDocumento" USING btree ("documentoId");


--
-- TOC entry 5051 (class 1259 OID 22370)
-- Name: WorkspaceMembro_usuarioId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WorkspaceMembro_usuarioId_idx" ON public."WorkspaceMembro" USING btree ("usuarioId");


--
-- TOC entry 5052 (class 1259 OID 22369)
-- Name: WorkspaceMembro_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WorkspaceMembro_workspaceId_idx" ON public."WorkspaceMembro" USING btree ("workspaceId");


--
-- TOC entry 5053 (class 1259 OID 22371)
-- Name: WorkspaceMembro_workspaceId_usuarioId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WorkspaceMembro_workspaceId_usuarioId_key" ON public."WorkspaceMembro" USING btree ("workspaceId", "usuarioId");


--
-- TOC entry 5044 (class 1259 OID 22367)
-- Name: Workspace_cnpj_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Workspace_cnpj_key" ON public."Workspace" USING btree (cnpj);


--
-- TOC entry 5047 (class 1259 OID 22368)
-- Name: Workspace_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Workspace_slug_idx" ON public."Workspace" USING btree (slug);


--
-- TOC entry 5048 (class 1259 OID 22366)
-- Name: Workspace_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Workspace_slug_key" ON public."Workspace" USING btree (slug);


--
-- TOC entry 5243 (class 2606 OID 22543)
-- Name: AndamentoProcessual AndamentoProcessual_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AndamentoProcessual"
    ADD CONSTRAINT "AndamentoProcessual_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5274 (class 2606 OID 22698)
-- Name: ArtigoEmbedding ArtigoEmbedding_artigoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArtigoEmbedding"
    ADD CONSTRAINT "ArtigoEmbedding_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES public."ArtigoLei"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5273 (class 2606 OID 22693)
-- Name: ArtigoLei ArtigoLei_legislacaoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArtigoLei"
    ADD CONSTRAINT "ArtigoLei_legislacaoId_fkey" FOREIGN KEY ("legislacaoId") REFERENCES public."Legislacao"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5244 (class 2606 OID 22548)
-- Name: Audiencia Audiencia_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audiencia"
    ADD CONSTRAINT "Audiencia_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5278 (class 2606 OID 22718)
-- Name: Automacao Automacao_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Automacao"
    ADD CONSTRAINT "Automacao_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5272 (class 2606 OID 22688)
-- Name: CalculoIRPF CalculoIRPF_movimentacaoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CalculoIRPF"
    ADD CONSTRAINT "CalculoIRPF_movimentacaoId_fkey" FOREIGN KEY ("movimentacaoId") REFERENCES public."MovimentacaoFinanceira"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5270 (class 2606 OID 22678)
-- Name: CentroCusto CentroCusto_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CentroCusto"
    ADD CONSTRAINT "CentroCusto_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5257 (class 2606 OID 22613)
-- Name: ChecklistItem ChecklistItem_tarefaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChecklistItem"
    ADD CONSTRAINT "ChecklistItem_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES public."Tarefa"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5233 (class 2606 OID 22493)
-- Name: Cliente Cliente_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cliente"
    ADD CONSTRAINT "Cliente_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5258 (class 2606 OID 22623)
-- Name: Comentario Comentario_autorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5259 (class 2606 OID 22618)
-- Name: Comentario Comentario_tarefaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES public."Tarefa"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5280 (class 2606 OID 22728)
-- Name: ConfiguracaoIA ConfiguracaoIA_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ConfiguracaoIA"
    ADD CONSTRAINT "ConfiguracaoIA_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5247 (class 2606 OID 22573)
-- Name: Documento Documento_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documento"
    ADD CONSTRAINT "Documento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5248 (class 2606 OID 22568)
-- Name: Documento Documento_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documento"
    ADD CONSTRAINT "Documento_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5249 (class 2606 OID 22578)
-- Name: Documento Documento_uploadPorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documento"
    ADD CONSTRAINT "Documento_uploadPorId_fkey" FOREIGN KEY ("uploadPorId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5250 (class 2606 OID 22563)
-- Name: Documento Documento_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documento"
    ADD CONSTRAINT "Documento_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5234 (class 2606 OID 22498)
-- Name: Endereco Endereco_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Endereco"
    ADD CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5260 (class 2606 OID 22643)
-- Name: Honorario Honorario_advogadoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Honorario"
    ADD CONSTRAINT "Honorario_advogadoId_fkey" FOREIGN KEY ("advogadoId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5261 (class 2606 OID 22648)
-- Name: Honorario Honorario_centroCustoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Honorario"
    ADD CONSTRAINT "Honorario_centroCustoId_fkey" FOREIGN KEY ("centroCustoId") REFERENCES public."CentroCusto"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5262 (class 2606 OID 22638)
-- Name: Honorario Honorario_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Honorario"
    ADD CONSTRAINT "Honorario_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5263 (class 2606 OID 22633)
-- Name: Honorario Honorario_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Honorario"
    ADD CONSTRAINT "Honorario_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5264 (class 2606 OID 22628)
-- Name: Honorario Honorario_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Honorario"
    ADD CONSTRAINT "Honorario_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5235 (class 2606 OID 22503)
-- Name: InteracaoCliente InteracaoCliente_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InteracaoCliente"
    ADD CONSTRAINT "InteracaoCliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5277 (class 2606 OID 22713)
-- Name: JurisprudenciaEmbedding JurisprudenciaEmbedding_jurisprudenciaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JurisprudenciaEmbedding"
    ADD CONSTRAINT "JurisprudenciaEmbedding_jurisprudenciaId_fkey" FOREIGN KEY ("jurisprudenciaId") REFERENCES public."Jurisprudencia"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5281 (class 2606 OID 22733)
-- Name: LogAuditoria LogAuditoria_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogAuditoria"
    ADD CONSTRAINT "LogAuditoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5279 (class 2606 OID 22723)
-- Name: LogAutomacao LogAutomacao_automacaoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogAutomacao"
    ADD CONSTRAINT "LogAutomacao_automacaoId_fkey" FOREIGN KEY ("automacaoId") REFERENCES public."Automacao"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5266 (class 2606 OID 22673)
-- Name: MovimentacaoFinanceira MovimentacaoFinanceira_centroCustoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovimentacaoFinanceira"
    ADD CONSTRAINT "MovimentacaoFinanceira_centroCustoId_fkey" FOREIGN KEY ("centroCustoId") REFERENCES public."CentroCusto"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5267 (class 2606 OID 22668)
-- Name: MovimentacaoFinanceira MovimentacaoFinanceira_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovimentacaoFinanceira"
    ADD CONSTRAINT "MovimentacaoFinanceira_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5268 (class 2606 OID 22663)
-- Name: MovimentacaoFinanceira MovimentacaoFinanceira_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovimentacaoFinanceira"
    ADD CONSTRAINT "MovimentacaoFinanceira_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5269 (class 2606 OID 22658)
-- Name: MovimentacaoFinanceira MovimentacaoFinanceira_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovimentacaoFinanceira"
    ADD CONSTRAINT "MovimentacaoFinanceira_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5271 (class 2606 OID 22683)
-- Name: NotaFiscal NotaFiscal_honorarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotaFiscal"
    ADD CONSTRAINT "NotaFiscal_honorarioId_fkey" FOREIGN KEY ("honorarioId") REFERENCES public."Honorario"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5282 (class 2606 OID 22743)
-- Name: Notificacao Notificacao_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notificacao"
    ADD CONSTRAINT "Notificacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5283 (class 2606 OID 22738)
-- Name: Notificacao Notificacao_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notificacao"
    ADD CONSTRAINT "Notificacao_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5265 (class 2606 OID 22653)
-- Name: ParcelaHonorario ParcelaHonorario_honorarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParcelaHonorario"
    ADD CONSTRAINT "ParcelaHonorario_honorarioId_fkey" FOREIGN KEY ("honorarioId") REFERENCES public."Honorario"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5240 (class 2606 OID 22528)
-- Name: ParteProcesso ParteProcesso_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParteProcesso"
    ADD CONSTRAINT "ParteProcesso_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5245 (class 2606 OID 22553)
-- Name: Prazo Prazo_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prazo"
    ADD CONSTRAINT "Prazo_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5246 (class 2606 OID 22558)
-- Name: Prazo Prazo_responsavelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prazo"
    ADD CONSTRAINT "Prazo_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5238 (class 2606 OID 22523)
-- Name: ProcessoCliente ProcessoCliente_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProcessoCliente"
    ADD CONSTRAINT "ProcessoCliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5239 (class 2606 OID 22518)
-- Name: ProcessoCliente ProcessoCliente_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProcessoCliente"
    ADD CONSTRAINT "ProcessoCliente_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5241 (class 2606 OID 22533)
-- Name: ProcessoEquipe ProcessoEquipe_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProcessoEquipe"
    ADD CONSTRAINT "ProcessoEquipe_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5242 (class 2606 OID 22538)
-- Name: ProcessoEquipe ProcessoEquipe_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProcessoEquipe"
    ADD CONSTRAINT "ProcessoEquipe_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5236 (class 2606 OID 22513)
-- Name: Processo Processo_advogadoResponsavelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Processo"
    ADD CONSTRAINT "Processo_advogadoResponsavelId_fkey" FOREIGN KEY ("advogadoResponsavelId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5237 (class 2606 OID 22508)
-- Name: Processo Processo_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Processo"
    ADD CONSTRAINT "Processo_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5275 (class 2606 OID 22708)
-- Name: ReferenciaJuridica ReferenciaJuridica_artigoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReferenciaJuridica"
    ADD CONSTRAINT "ReferenciaJuridica_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES public."ArtigoLei"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5276 (class 2606 OID 22703)
-- Name: ReferenciaJuridica ReferenciaJuridica_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReferenciaJuridica"
    ADD CONSTRAINT "ReferenciaJuridica_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5232 (class 2606 OID 22488)
-- Name: RefreshToken RefreshToken_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5231 (class 2606 OID 22483)
-- Name: SessaoLogin SessaoLogin_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SessaoLogin"
    ADD CONSTRAINT "SessaoLogin_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5252 (class 2606 OID 22598)
-- Name: Tarefa Tarefa_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tarefa"
    ADD CONSTRAINT "Tarefa_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5253 (class 2606 OID 22608)
-- Name: Tarefa Tarefa_criadorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tarefa"
    ADD CONSTRAINT "Tarefa_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5254 (class 2606 OID 22593)
-- Name: Tarefa Tarefa_processoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tarefa"
    ADD CONSTRAINT "Tarefa_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES public."Processo"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5255 (class 2606 OID 22603)
-- Name: Tarefa Tarefa_responsavelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tarefa"
    ADD CONSTRAINT "Tarefa_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5256 (class 2606 OID 22588)
-- Name: Tarefa Tarefa_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tarefa"
    ADD CONSTRAINT "Tarefa_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5251 (class 2606 OID 22583)
-- Name: VersaoDocumento VersaoDocumento_documentoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersaoDocumento"
    ADD CONSTRAINT "VersaoDocumento_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES public."Documento"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5229 (class 2606 OID 22478)
-- Name: WorkspaceMembro WorkspaceMembro_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkspaceMembro"
    ADD CONSTRAINT "WorkspaceMembro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5230 (class 2606 OID 22473)
-- Name: WorkspaceMembro WorkspaceMembro_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkspaceMembro"
    ADD CONSTRAINT "WorkspaceMembro_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5472 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-12-08 11:27:30

--
-- PostgreSQL database dump complete
--

\unrestrict EbwFc6a4bEZ0O2AHa4WSShssWSvcWnOCQqFiuv0zOclB07jgkl9Vr8oJB8pfxnS

