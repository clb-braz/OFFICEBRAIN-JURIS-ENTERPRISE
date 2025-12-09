# ============================================
# Script de Testes Automáticos Docker
# OfficeBrain Juris Enterprise (Windows)
# ============================================

Write-Host "🧪 Iniciando testes automáticos..." -ForegroundColor Cyan
Write-Host ""

# Função para testar endpoint
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [string]$Data = "",
        [string]$AuthHeader = ""
    )
    
    Write-Host "  Testando $Name... " -NoNewline
    
    try {
        $headers = @{}
        if ($AuthHeader) {
            $headers["Authorization"] = $AuthHeader
        }
        
        if ($Method -eq "GET") {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -UseBasicParsing -ErrorAction Stop
        } else {
            $body = $Data | ConvertFrom-Json | ConvertTo-Json
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
        }
        
        if ($response.StatusCode -eq 200 -or $response.StatusCode -eq 201) {
            Write-Host "✓ OK" -ForegroundColor Green -NoNewline
            Write-Host " (HTTP $($response.StatusCode))"
            return $true
        } else {
            Write-Host "✗ FALHOU" -ForegroundColor Red -NoNewline
            Write-Host " (HTTP $($response.StatusCode))"
            return $false
        }
    } catch {
        Write-Host "✗ FALHOU" -ForegroundColor Red -NoNewline
        Write-Host " ($($_.Exception.Message))"
        return $false
    }
}

# Aguardar serviços
Write-Host "⏳ Aguardando serviços iniciarem..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Variáveis
$API_URL = "http://localhost:3001/api"
$FRONTEND_URL = "http://localhost:3000"
$OCR_URL = "http://localhost:8080"

# ============================================
# 1. Testes de Health Checks
# ============================================
Write-Host ""
Write-Host "📊 1. Testes de Health Checks" -ForegroundColor Cyan
Write-Host "================================"

Test-Endpoint -Name "Backend Health" -Url "$API_URL/health"
Test-Endpoint -Name "OCR Health" -Url "$OCR_URL/health"
Test-Endpoint -Name "Frontend" -Url "$FRONTEND_URL"

# ============================================
# 2. Testes de Banco de Dados
# ============================================
Write-Host ""
Write-Host "🗄️  2. Testes de Banco de Dados" -ForegroundColor Cyan
Write-Host "================================"

Write-Host "  Testando conexão PostgreSQL... " -NoNewline
try {
    $result = docker exec officebrain-postgres pg_isready -U postgres 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ OK" -ForegroundColor Green
    } else {
        Write-Host "✗ FALHOU" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ FALHOU" -ForegroundColor Red
}

Write-Host "  Testando extensão pgvector... " -NoNewline
try {
    $result = docker exec officebrain-postgres psql -U postgres -d officebrain -c "SELECT * FROM pg_extension WHERE extname = 'vector';" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ OK" -ForegroundColor Green
    } else {
        Write-Host "✗ FALHOU" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ FALHOU" -ForegroundColor Red
}

# ============================================
# 3. Testes de API - Autenticação
# ============================================
Write-Host ""
Write-Host "🔐 3. Testes de Autenticação" -ForegroundColor Cyan
Write-Host "================================"

# Criar usuário de teste
Write-Host "  Criando usuário de teste... " -NoNewline
try {
    $registerData = @{
        email = "teste@officebrain.com"
        senha = "Teste123!"
        nome = "Usuário Teste"
    } | ConvertTo-Json
    
    $registerResponse = Invoke-WebRequest -Uri "$API_URL/auth/register" -Method POST -Body $registerData -ContentType "application/json" -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "✓ OK" -ForegroundColor Green
} catch {
    Write-Host "⚠ Usuário pode já existir" -ForegroundColor Yellow
}

# Login
Write-Host "  Testando login... " -NoNewline
$TOKEN = ""
try {
    $loginData = @{
        email = "teste@officebrain.com"
        senha = "Teste123!"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-WebRequest -Uri "$API_URL/auth/login" -Method POST -Body $loginData -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    $loginJson = $loginResponse.Content | ConvertFrom-Json
    $TOKEN = $loginJson.access_token
    Write-Host "✓ OK" -ForegroundColor Green
} catch {
    Write-Host "✗ FALHOU" -ForegroundColor Red
}

# ============================================
# 4. Testes de API - CRUDs
# ============================================
if ($TOKEN) {
    Write-Host ""
    Write-Host "📝 4. Testes de CRUDs" -ForegroundColor Cyan
    Write-Host "================================"
    
    $authHeader = "Bearer $TOKEN"
    
    # Clientes
    Test-Endpoint -Name "Listar Clientes" -Url "$API_URL/clients" -AuthHeader $authHeader
    
    # Processos
    Test-Endpoint -Name "Listar Processos" -Url "$API_URL/processes" -AuthHeader $authHeader
    
    # Documentos
    Test-Endpoint -Name "Listar Documentos" -Url "$API_URL/documents" -AuthHeader $authHeader
    
    # Financeiro
    Test-Endpoint -Name "Listar Financeiro" -Url "$API_URL/finance" -AuthHeader $authHeader
    
    # Agenda
    Test-Endpoint -Name "Listar Agenda" -Url "$API_URL/agenda" -AuthHeader $authHeader
    
    # Prazos
    Test-Endpoint -Name "Listar Prazos" -Url "$API_URL/deadlines" -AuthHeader $authHeader
}

# ============================================
# 5. Testes de OCR
# ============================================
Write-Host ""
Write-Host "👁️  5. Testes de OCR" -ForegroundColor Cyan
Write-Host "================================"

Test-Endpoint -Name "OCR Health Check" -Url "$OCR_URL/health"

# ============================================
# 6. Testes de Redis
# ============================================
Write-Host ""
Write-Host "💾 6. Testes de Redis" -ForegroundColor Cyan
Write-Host "================================"

Write-Host "  Testando conexão Redis... " -NoNewline
try {
    $result = docker exec officebrain-redis redis-cli ping 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ OK" -ForegroundColor Green
    } else {
        Write-Host "✗ FALHOU" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ FALHOU" -ForegroundColor Red
}

# ============================================
# Resumo Final
# ============================================
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Testes concluídos!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para ver os logs dos containers:" -ForegroundColor Yellow
Write-Host "  docker compose logs -f" -ForegroundColor White
Write-Host ""
Write-Host "Para parar os containers:" -ForegroundColor Yellow
Write-Host "  docker compose down" -ForegroundColor White
Write-Host ""

