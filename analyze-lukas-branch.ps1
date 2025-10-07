# Compare Lukas branch with main to find scoreboard differences
# Erstellt von Hans Hahn - Alle Rechte vorbehalten

Set-Location "C:\SoftwareEntwicklung\DartClubManager\Dart App"

Write-Host "Fetching latest changes..." -ForegroundColor Cyan
git fetch origin

Write-Host "`n=== FILES CHANGED IN LUKAS BRANCH ===" -ForegroundColor Yellow
Write-Host "Comparing origin/Lukas with main:" -ForegroundColor Cyan
git diff --name-status main origin/Lukas

Write-Host "`n=== DETAILED CHANGES IN FRONTEND ===" -ForegroundColor Yellow
git diff main origin/Lukas -- frontend/

Write-Host "`n=== COMMIT MESSAGES IN LUKAS BRANCH ===" -ForegroundColor Yellow
git log main..origin/Lukas --oneline

Write-Host "`nAnalysis complete!" -ForegroundColor Green
