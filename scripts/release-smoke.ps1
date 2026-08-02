#Requires -Version 5.1
<#
.SYNOPSIS
  Automated release smoke gate (fail-closed).

.DESCRIPTION
  Runs health check, SQL Fundamentals E2E, catalog smoke, Go package tests,
  and frontend test gates. See docs/processes/release-hardening.md.

.PARAMETER SkipDocker
  Do not run docker-up.ps1 (stack already running).

.PARAMETER BaseUrl
  API base URL for HTTP smokes. Default http://127.0.0.1:8082

.EXAMPLE
  powershell -File scripts/release-smoke.ps1

.EXAMPLE
  powershell -File scripts/release-smoke.ps1 -SkipDocker
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

function Invoke-NodeTest([string]$Label, [string[]]$NodeArgs) {
  Step $Label
  Push-Location (Join-Path $Root "apps\web")
  try {
    & node @NodeArgs
    if ($LASTEXITCODE -ne 0) { Fail "$Label failed" }
  } finally {
    Pop-Location
  }
}

Write-Host "=== Syntaxia release smoke ===" -ForegroundColor Cyan
Write-Host "Root: $Root"

if (-not $SkipDocker) {
  Step "Stack up (docker-up.ps1)"
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

Step "API + E2E suite (catalog + SQL + languages)"
& (Join-Path $PSScriptRoot "e2e-all.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "e2e-all.ps1 exited $LASTEXITCODE" }

Step "Catalog architecture (legacy IT categories)"
& (Join-Path $PSScriptRoot "check-catalog.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "check-catalog.ps1 exited $LASTEXITCODE" }

Step "JavaScript Basics curriculum"
& (Join-Path $PSScriptRoot "check-javascript-basics.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "check-javascript-basics.ps1 exited $LASTEXITCODE" }

Step "JavaScript sandbox grade"
& (Join-Path $PSScriptRoot "check-js-sandbox.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "check-js-sandbox.ps1 exited $LASTEXITCODE" }

Step "HTML/CSS sandbox grade"
& (Join-Path $PSScriptRoot "check-htmlcss-sandbox.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "check-htmlcss-sandbox.ps1 exited $LASTEXITCODE" }

Step "Go package tests"
Remove-Item Env:GOOS -ErrorAction SilentlyContinue
Remove-Item Env:GOARCH -ErrorAction SilentlyContinue
Push-Location (Join-Path $Root "apps\api")
try {
  go test ./internal/learning ./internal/sandbox ./internal/markdown ./internal/content ./internal/service/...
  if ($LASTEXITCODE -ne 0) { Fail "go test exited $LASTEXITCODE" }
} finally {
  Pop-Location
}

Invoke-NodeTest "Frontend: i18n" @("--test", "scripts/check-i18n-parity.mjs")
Invoke-NodeTest "Frontend: TOC" @("--experimental-strip-types", "--test", "scripts/check-toc.mjs")
Invoke-NodeTest "Frontend: shell UX" @("--test", "scripts/check-shell-ux.mjs")
Invoke-NodeTest "Frontend: theme" @("--experimental-strip-types", "--test", "scripts/check-theme-accent.mjs")
Invoke-NodeTest "Frontend: audit remediation" @("scripts/run-audit-remediation-tests.mjs")

Write-Host ""
Write-Host "PASS: release smoke (automated gates)" -ForegroundColor Green
Write-Host "Manual UI pass: home Continue, lesson TOC, sandbox hints - see release-hardening.md" -ForegroundColor DarkGray
exit 0
