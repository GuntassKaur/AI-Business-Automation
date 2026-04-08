$ErrorActionPreference = "Stop"

function Test-Command($name) {
    return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

Write-Host "AI Business Automation OS - startup check" -ForegroundColor Cyan

$missing = @()
if (-not (Test-Command "node")) { $missing += "Node.js (node/npm)" }
if (-not (Test-Command "python")) { $missing += "Python 3.11+" }
if (-not (Test-Command "docker")) { $missing += "Docker (optional, for containerized run)" }

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "Missing prerequisites detected:" -ForegroundColor Yellow
    $missing | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
    Write-Host ""
    Write-Host "Install links:" -ForegroundColor Gray
    Write-Host " - Node.js LTS: https://nodejs.org/en/download"
    Write-Host " - Python: https://www.python.org/downloads/"
    Write-Host " - Docker Desktop: https://www.docker.com/products/docker-desktop/"
    Write-Host ""
    Write-Host "After install, restart terminal and run: .\start.ps1" -ForegroundColor Cyan
    exit 1
}

if (-not (Test-Path ".\backend\.env")) {
    Copy-Item ".\backend\.env.example" ".\backend\.env"
}
if (-not (Test-Path ".\frontend\.env.local")) {
    Copy-Item ".\frontend\.env.example" ".\frontend\.env.local"
}

Write-Host "Starting backend dependencies and services..." -ForegroundColor Cyan

if (Test-Command "docker") {
    docker compose up -d postgres | Out-Null
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; if (-not (Test-Path .venv)) { python -m venv .venv }; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; uvicorn app.main:app --reload --port 8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm install; npm run dev"

Write-Host ""
Write-Host "Services are launching in new terminals." -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend docs: http://localhost:8000/docs" -ForegroundColor Green

