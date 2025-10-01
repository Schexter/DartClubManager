# ========================================
# DartClubManager - Setup Check Script
# ========================================
# Erstellt von Hans Hahn - Alle Rechte vorbehalten
# Datum: 30.09.2025
#
# Dieses Script prüft, ob alle Voraussetzungen erfüllt sind.

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DartClubManager - Setup Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Funktion zum Prüfen von Befehlen
function Test-Command {
    param (
        [string]$Command,
        [string]$Name,
        [string]$ExpectedPattern,
        [string]$DownloadUrl
    )
    
    Write-Host "Prüfe $Name..." -NoNewline
    
    try {
        $result = & $Command --version 2>&1
        
        if ($result -match $ExpectedPattern) {
            Write-Host " ✓ OK" -ForegroundColor Green
            Write-Host "  Version: $($matches[0])" -ForegroundColor Gray
            return $true
        } else {
            Write-Host " ✗ Version zu alt!" -ForegroundColor Yellow
            Write-Host "  Gefunden: $result" -ForegroundColor Gray
            Write-Host "  Benötigt: $ExpectedPattern" -ForegroundColor Gray
            Write-Host "  Download: $DownloadUrl" -ForegroundColor Blue
            return $false
        }
    } catch {
        Write-Host " ✗ NICHT INSTALLIERT" -ForegroundColor Red
        Write-Host "  Download: $DownloadUrl" -ForegroundColor Blue
        return $false
    }
}

# Java prüfen
Write-Host ""
Write-Host "1. JAVA JDK" -ForegroundColor Yellow
if (-not (Test-Command -Command "java" -Name "Java" -ExpectedPattern "21\.\d+\.\d+" -DownloadUrl "https://adoptium.net/")) {
    $allGood = $false
}

# Docker prüfen
Write-Host ""
Write-Host "2. DOCKER" -ForegroundColor Yellow
if (-not (Test-Command -Command "docker" -Name "Docker" -ExpectedPattern "\d+\.\d+\.\d+" -DownloadUrl "https://www.docker.com/products/docker-desktop/")) {
    $allGood = $false
} else {
    # Prüfe, ob Docker läuft
    Write-Host "   Prüfe Docker Daemon..." -NoNewline
    try {
        $dockerTest = docker ps 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host " ✓ Läuft" -ForegroundColor Green
        } else {
            Write-Host " ✗ Docker Desktop nicht gestartet!" -ForegroundColor Red
            Write-Host "   Bitte starte Docker Desktop" -ForegroundColor Yellow
            $allGood = $false
        }
    } catch {
        Write-Host " ✗ Docker Daemon nicht erreichbar!" -ForegroundColor Red
        $allGood = $false
    }
}

# Node.js prüfen
Write-Host ""
Write-Host "3. NODE.JS" -ForegroundColor Yellow
if (-not (Test-Command -Command "node" -Name "Node.js" -ExpectedPattern "v20\.\d+\.\d+" -DownloadUrl "https://nodejs.org/")) {
    $allGood = $false
}

# npm prüfen
Write-Host ""
Write-Host "4. NPM" -ForegroundColor Yellow
if (-not (Test-Command -Command "npm" -Name "npm" -ExpectedPattern "\d+\.\d+\.\d+" -DownloadUrl "https://nodejs.org/")) {
    $allGood = $false
}

# Git prüfen
Write-Host ""
Write-Host "5. GIT" -ForegroundColor Yellow
if (-not (Test-Command -Command "git" -Name "Git" -ExpectedPattern "\d+\.\d+\.\d+" -DownloadUrl "https://git-scm.com/")) {
    $allGood = $false
}

# Ergebnis
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "✓ ALLE VORAUSSETZUNGEN ERFÜLLT!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Du kannst jetzt mit der Installation fortfahren:" -ForegroundColor White
    Write-Host "  1. docker compose up -d" -ForegroundColor Gray
    Write-Host "  2. cd backend && ./gradlew bootRun" -ForegroundColor Gray
    Write-Host "  3. cd frontend && npm install && npm run dev" -ForegroundColor Gray
} else {
    Write-Host "✗ EINIGE VORAUSSETZUNGEN FEHLEN!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Bitte installiere die fehlende Software und" -ForegroundColor Yellow
    Write-Host "führe dieses Script erneut aus." -ForegroundColor Yellow
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
