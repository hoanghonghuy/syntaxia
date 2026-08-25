#Requires -Version 5.1
<#
.SYNOPSIS
  Automated release smoke gate (fail-closed).

.DESCRIPTION
  Runs the full existing-product release contract: health, exact runtime curriculum inventory,
  catalog/domain E2E, SQL/language flows, JS + HTML/CSS sandboxes, complete Go tests/vet,
  frontend production build, product-flow/UI/language/i18n regressions.

.PARAMETER SkipDocker
  Do not run docker-up.ps1 (stack already running).

.PARAMETER BaseUrl
  API base URL for HTTP smokes. Default http://127.0.0.1:8082
#>
param(
  [switch]$SkipDocker,
  [string]$BaseUrl = "http://127.0.0.1:8082"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
$Root = Split-Path -Parent $PSScriptRoot

function Fail([string]$Message) {
  Write-Host "FAIL: $Message" -ForegroundColor Red
  exit 1
}

function Step([string]$Title) {
  Write-Host ""
  Write-Host "==> $Title" -ForegroundColor Cyan
}

function Invoke-Npm([string]$Script) {
  & npm run $Script
  if ($LASTEXITCODE -ne 0) { Fail "npm run $Script failed" }
}

Write-Host "=== Syntaxia release smoke ===" -ForegroundColor Cyan
Write-Host "Root: $Root"

if (-not $SkipDocker) {
  Step "Stack up"
  & (Join-Path $PSScriptRoot "docker-up.ps1")
  if ($LASTEXITCODE -ne 0) { Fail "docker-up.ps1 exited $LASTEXITCODE" }
}

Step "API health"
try {
  $health = Invoke-RestMethod -Uri "$BaseUrl/health"
} catch {
  Fail "GET $BaseUrl/health - $($_.Exception.Message)"
}
if ($health.status -ne "ok") { Fail "/health status=$($health.status)" }
Write-Host "OK: /health status=ok backend=$($health.backend)" -ForegroundColor Green

Step "Full DB-backed domain E2E + sandboxes"
& (Join-Path $PSScriptRoot "e2e-all.ps1") -BaseUrl $BaseUrl -IncludeSandboxes
if ($LASTEXITCODE -ne 0) { Fail "e2e-all.ps1 exited $LASTEXITCODE" }

Step "Legacy catalog compatibility"
& (Join-Path $PSScriptRoot "check-catalog.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "check-catalog.ps1 exited $LASTEXITCODE" }

Step "JavaScript Basics compatibility"
& (Join-Path $PSScriptRoot "check-javascript-basics.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "check-javascript-basics.ps1 exited $LASTEXITCODE" }

Step "Go module, test and vet gate"
Remove-Item Env:GOOS -ErrorAction SilentlyContinue
Remove-Item Env:GOARCH -ErrorAction SilentlyContinue
Push-Location (Join-Path $Root "apps\api")
try {
  & go mod verify
  if ($LASTEXITCODE -ne 0) { Fail "go mod verify failed" }
  & go test -mod=readonly ./...
  if ($LASTEXITCODE -ne 0) { Fail "go test failed" }
  & go vet -mod=readonly ./...
  if ($LASTEXITCODE -ne 0) { Fail "go vet failed" }
} finally {
  Pop-Location
}

Step "Frontend production build + regression contract"
Push-Location (Join-Path $Root "apps\web")
try {
  Invoke-Npm "build"
  Invoke-Npm "test:product-flows"
  Invoke-Npm "test:shell-ux"
  Invoke-Npm "test:ui-refresh"
  Invoke-Npm "test:ui-system"
  Invoke-Npm "test:language-v3"
  Invoke-Npm "test:language-path-v2"
  Invoke-Npm "test:language-audio"
  Invoke-Npm "test:language-review"
  Invoke-Npm "test:i18n"
  Invoke-Npm "test:e2e-suite"
  Invoke-Npm "test:audit-remediation"
} finally {
  Pop-Location
}

Write-Host ""
Write-Host "PASS: release smoke (full existing-product gate)" -ForegroundColor Green
Write-Host "Before develop -> main: confirm Product CI + deployment provider checks are green." -ForegroundColor DarkGray
exit 0
