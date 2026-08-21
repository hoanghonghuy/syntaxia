#Requires -Version 5.1
<#
.SYNOPSIS
  Orchestrate all API/E2E smoke gates (fail-closed).

.DESCRIPTION
  Runs runtime curriculum integrity, catalog API smoke, SQL Fundamentals E2E, and Languages E2E.
  Optional -IncludeSandboxes also runs JS/HTMLCSS sandbox scripts.

.PARAMETER BaseUrl
  API base URL. Default http://127.0.0.1:8082

.PARAMETER IncludeSandboxes
  Also run check-js-sandbox.ps1 and check-htmlcss-sandbox.ps1

.EXAMPLE
  powershell -File scripts/e2e-all.ps1 -BaseUrl http://127.0.0.1:8082
#>
param(
  [string]$BaseUrl = "http://127.0.0.1:8082",
  [switch]$IncludeSandboxes
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Fail([string]$Message) {
  Write-Host "FAIL: $Message" -ForegroundColor Red
  exit 1
}

function Step([string]$Title) {
  Write-Host ""
  Write-Host "==> $Title" -ForegroundColor Cyan
}

Write-Host "=== Syntaxia E2E all ===" -ForegroundColor Cyan
Write-Host "BaseUrl: $BaseUrl"

Step "Curriculum runtime integrity"
& (Join-Path $PSScriptRoot "e2e-curriculum-integrity.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "e2e-curriculum-integrity.ps1 exited $LASTEXITCODE" }

Step "API catalog smoke"
& (Join-Path $PSScriptRoot "e2e-api-catalog.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "e2e-api-catalog.ps1 exited $LASTEXITCODE" }

Step "SQL Fundamentals E2E"
& (Join-Path $PSScriptRoot "e2e-sql-fundamentals.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "e2e-sql-fundamentals.ps1 exited $LASTEXITCODE" }

Step "Languages E2E"
& (Join-Path $PSScriptRoot "e2e-languages.ps1") -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) { Fail "e2e-languages.ps1 exited $LASTEXITCODE" }

if ($IncludeSandboxes) {
  Step "JavaScript sandbox"
  & (Join-Path $PSScriptRoot "check-js-sandbox.ps1") -BaseUrl $BaseUrl
  if ($LASTEXITCODE -ne 0) { Fail "check-js-sandbox.ps1 exited $LASTEXITCODE" }

  Step "HTML/CSS sandbox"
  & (Join-Path $PSScriptRoot "check-htmlcss-sandbox.ps1") -BaseUrl $BaseUrl
  if ($LASTEXITCODE -ne 0) { Fail "check-htmlcss-sandbox.ps1 exited $LASTEXITCODE" }
}

Write-Host ""
Write-Host "PASS: E2E all gates" -ForegroundColor Green
exit 0
