# Build Linux API binary and start full stack (postgres + api + web).
# Reuses local images only: postgres:16-alpine, node:22-alpine (pull_policy: never).

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "==> Cross-compile API (linux/amd64, CGO off)"
$apiDir = Join-Path $Root "apps\api"
New-Item -ItemType Directory -Force -Path (Join-Path $apiDir "bin") | Out-Null
Push-Location $apiDir
$env:CGO_ENABLED = "0"
$env:GOOS = "linux"
$env:GOARCH = "amd64"
go build -o "bin/server-linux" ./cmd/server/
Pop-Location

Write-Host "==> docker compose up -d --pull never"
docker compose up -d --pull never

Write-Host "==> Ensure sandbox role (idempotent)"
$sqlPath = Join-Path $Root "apps\api\migrations\002_sandbox_harden.sql"
docker cp $sqlPath "syntaxia-postgres-1:/tmp/002_sandbox_harden.sql"
docker compose exec -T postgres psql -U syntaxia -d syntaxia -f /tmp/002_sandbox_harden.sql
if ($LASTEXITCODE -ne 0) {
  Write-Host "    sandbox SQL skipped or failed; check postgres logs"
}

Write-Host "==> Ensure track taxonomy + code scaffold (idempotent)"
foreach ($mig in @("003_track_taxonomy.sql", "004_code_track.sql", "005_web_tracks.sql")) {
  $migPath = Join-Path $Root "apps\api\migrations\$mig"
  docker cp $migPath "syntaxia-postgres-1:/tmp/$mig"
  docker compose exec -T postgres psql -U syntaxia -d syntaxia -f "/tmp/$mig"
  if ($LASTEXITCODE -ne 0) {
    Write-Host "    $mig skipped or failed; check postgres logs"
  }
}

Write-Host ""
Write-Host "Syntaxia:"
Write-Host "  Web  http://localhost:3001"
Write-Host "  API  http://localhost:8082/health"
Write-Host "  DB   localhost:5432 (syntaxia/syntaxia)"
Write-Host ""
Write-Host "Promote admin example:"
Write-Host '  docker compose exec postgres psql -U syntaxia -d syntaxia -c "UPDATE users SET role = ''admin'' WHERE email = ''you@example.com'';"'
