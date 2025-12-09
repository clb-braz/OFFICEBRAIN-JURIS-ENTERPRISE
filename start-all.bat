@echo off
echo ========================================
echo   OFFICEBRAIN JURIS ENTERPRISE
echo   Iniciando todos os servicos...
echo ========================================
echo.

echo [1/3] Verificando PostgreSQL...
docker ps | findstr "officebrain-postgres" >nul
if %errorlevel% neq 0 (
    echo PostgreSQL nao esta rodando. Iniciando...
    cd apps\api
    docker compose up -d postgres
    timeout /t 5 /nobreak >nul
    cd ..\..
) else (
    echo PostgreSQL ja esta rodando.
)

echo.
echo [2/3] Iniciando API (porta 3001)...
start "OfficeBrain API" cmd /k "cd apps\api && npm run start:dev"

echo.
echo [3/3] Iniciando Frontend (porta 3000)...
timeout /t 3 /nobreak >nul
start "OfficeBrain Frontend" cmd /k "cd apps\frontend && npm run dev"

echo.
echo ========================================
echo   Servicos iniciados!
echo   API: http://localhost:3001/api
echo   Frontend: http://localhost:3000
echo   Swagger: http://localhost:3001/api/docs
echo ========================================
echo.
echo Pressione qualquer tecla para sair...
pause >nul

