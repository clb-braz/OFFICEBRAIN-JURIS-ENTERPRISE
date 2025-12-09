# Script para processar SQL e remover comandos incompatíveis com Docker
$inputFile = "database/init/01-import-database.sql"
$outputFile = "database/init/01-import-database-processed.sql"

$content = Get-Content $inputFile -Raw

# Remover comandos incompatíveis
$content = $content -replace '(?m)^DROP DATABASE.*$', ''
$content = $content -replace '(?m)^CREATE DATABASE.*$', ''
$content = $content -replace '(?m)^ALTER DATABASE.*$', ''
$content = $content -replace '(?m)^\\connect.*$', ''
$content = $content -replace '(?m)^\\restrict.*$', ''
$content = $content -replace '(?m)^\\unrestrict.*$', ''
$content = $content -replace '(?m)^-- TOC entry.*$', ''
$content = $content -replace '(?m)^-- Name:.*$', ''
$content = $content -replace '(?m)^-- Type:.*$', ''
$content = $content -replace '(?m)^-- Schema:.*$', ''
$content = $content -replace '(?m)^-- Owner:.*$', ''
$content = $content -replace '(?m)^-- Dependencies:.*$', ''
$content = $content -replace '(?m)^-- Completed on.*$', ''
$content = $content -replace '(?m)^-- PostgreSQL database dump complete.*$', ''

# Adicionar comando para usar o schema public
$processedContent = @"
-- Processed SQL for Docker PostgreSQL import
-- Original file: 01-import-database.sql
-- Processed on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

SET search_path = public;

$content
"@

Set-Content -Path $outputFile -Value $processedContent
Write-Host "SQL processado salvo em: $outputFile"

