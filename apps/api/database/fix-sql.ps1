# Script para remover comandos problemáticos do SQL
$inputFile = "database/init/01-import-database-processed.sql"
$content = Get-Content $inputFile -Raw

# Remover todos os comandos ALTER ... OWNER TO
$content = $content -replace '(?m)^ALTER .* OWNER TO .*;?\s*$', ''

# Remover linhas vazias múltiplas
$content = $content -replace '(?m)^\s*$\n', ''

Set-Content -Path $inputFile -Value $content
Write-Host "SQL corrigido!"

