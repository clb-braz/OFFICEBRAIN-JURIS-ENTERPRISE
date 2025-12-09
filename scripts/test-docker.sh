#!/bin/bash
# ============================================
# Script de Testes Automáticos Docker
# OfficeBrain Juris Enterprise
# ============================================

set -e

echo "🧪 Iniciando testes automáticos..."

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para testar endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    local data=${4:-""}
    
    echo -n "  Testando $name... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    else
        response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$url" || echo "000")
    fi
    
    if [ "$response" = "200" ] || [ "$response" = "201" ]; then
        echo -e "${GREEN}✓ OK${NC} (HTTP $response)"
        return 0
    else
        echo -e "${RED}✗ FALHOU${NC} (HTTP $response)"
        return 1
    fi
}

# Aguardar serviços estarem prontos
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

# Variáveis
API_URL="http://localhost:3001/api"
FRONTEND_URL="http://localhost:3000"
OCR_URL="http://localhost:8080"

# ============================================
# 1. Testes de Health Checks
# ============================================
echo ""
echo "📊 1. Testes de Health Checks"
echo "================================"

test_endpoint "Backend Health" "$API_URL/health"
test_endpoint "OCR Health" "$OCR_URL/health"
test_endpoint "Frontend" "$FRONTEND_URL"

# ============================================
# 2. Testes de Banco de Dados
# ============================================
echo ""
echo "🗄️  2. Testes de Banco de Dados"
echo "================================"

echo -n "  Testando conexão PostgreSQL... "
if docker exec officebrain-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo -e "${GREEN}✓ OK${NC}"
else
    echo -e "${RED}✗ FALHOU${NC}"
fi

echo -n "  Testando extensão pgvector... "
if docker exec officebrain-postgres psql -U postgres -d officebrain -c "SELECT * FROM pg_extension WHERE extname = 'vector';" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ OK${NC}"
else
    echo -e "${RED}✗ FALHOU${NC}"
fi

# ============================================
# 3. Testes de API - Autenticação
# ============================================
echo ""
echo "🔐 3. Testes de Autenticação"
echo "================================"

# Criar usuário de teste
echo -n "  Criando usuário de teste... "
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d '{"email":"teste@officebrain.com","senha":"Teste123!","nome":"Usuário Teste"}' || echo "")

if echo "$REGISTER_RESPONSE" | grep -q "id"; then
    echo -e "${GREEN}✓ OK${NC}"
else
    echo -e "${YELLOW}⚠ Usuário pode já existir${NC}"
fi

# Login
echo -n "  Testando login... "
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"teste@officebrain.com","senha":"Teste123!"}' || echo "")

if echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
    echo -e "${GREEN}✓ OK${NC}"
else
    echo -e "${RED}✗ FALHOU${NC}"
    TOKEN=""
fi

# ============================================
# 4. Testes de API - CRUDs
# ============================================
if [ -n "$TOKEN" ]; then
    echo ""
    echo "📝 4. Testes de CRUDs"
    echo "================================"
    
    AUTH_HEADER="Authorization: Bearer $TOKEN"
    
    # Clientes
    test_endpoint "Listar Clientes" "$API_URL/clients" "GET" "" "$AUTH_HEADER"
    
    # Processos
    test_endpoint "Listar Processos" "$API_URL/processes" "GET" "" "$AUTH_HEADER"
    
    # Documentos
    test_endpoint "Listar Documentos" "$API_URL/documents" "GET" "" "$AUTH_HEADER"
    
    # Financeiro
    test_endpoint "Listar Financeiro" "$API_URL/finance" "GET" "" "$AUTH_HEADER"
    
    # Agenda
    test_endpoint "Listar Agenda" "$API_URL/agenda" "GET" "" "$AUTH_HEADER"
    
    # Prazos
    test_endpoint "Listar Prazos" "$API_URL/deadlines" "GET" "" "$AUTH_HEADER"
fi

# ============================================
# 5. Testes de OCR
# ============================================
echo ""
echo "👁️  5. Testes de OCR"
echo "================================"

test_endpoint "OCR Health Check" "$OCR_URL/health"

# ============================================
# 6. Testes de Redis
# ============================================
echo ""
echo "💾 6. Testes de Redis"
echo "================================"

echo -n "  Testando conexão Redis... "
if docker exec officebrain-redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✓ OK${NC}"
else
    echo -e "${RED}✗ FALHOU${NC}"
fi

# ============================================
# Resumo Final
# ============================================
echo ""
echo "================================"
echo "✅ Testes concluídos!"
echo "================================"
echo ""
echo "Para ver os logs dos containers:"
echo "  docker compose logs -f"
echo ""
echo "Para parar os containers:"
echo "  docker compose down"
echo ""

