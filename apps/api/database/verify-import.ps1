# Script para verificar importação do banco
Write-Host "Verificando importação do banco de dados..." -ForegroundColor Cyan

$tables = @("Usuario", "Cliente", "Processo", "Documento", "Tarefa", "Workspace")

foreach ($table in $tables) {
    $result = docker exec officebrain-postgres psql -U officebrain -d officebrain -t -c "SELECT COUNT(*) FROM `"$table`";"
    $count = $result.Trim()
    Write-Host "$table`: $count registros" -ForegroundColor $(if ($count -gt 0) { "Green" } else { "Yellow" })
}

Write-Host "`nVerificação concluída!" -ForegroundColor Cyan

