#Requires -Version 5.1
<#
.SYNOPSIS
  Catalog architecture smoke: GET /tracks has sql + code categories.

.DESCRIPTION
  Asserts at least three tracks including sql-fundamentals, postgresql, and
  javascript-basics; categories must include both sql and code.

.PARAMETER BaseUrl
  API base URL. Default http://127.0.0.1:8082

.EXAMPLE
  powershell -File scripts/check-catalog.ps1
#>
param(
  [string]$BaseUrl = "http://127.0.0.1:8082"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Fail([string]$Message) {
  Write-Host "FAIL: $Message" -ForegroundColor Red
  exit 1
}

function Ok([string]$Message) {
  Write-Host "OK: $Message" -ForegroundColor Green
}

$uri = "$BaseUrl/api/v1/tracks"
try {
  $tracks = Invoke-RestMethod -Uri $uri -Method Get
} catch {
  Fail "GET $uri failed: $($_.Exception.Message)"
}

if (-not $tracks -or $tracks.Count -lt 3) {
  Fail "Expected at least 3 tracks, got $($tracks.Count)"
}

$ids = @($tracks | ForEach-Object { $_.id })
foreach ($need in @("sql-fundamentals", "postgresql", "javascript-basics")) {
  if ($ids -notcontains $need) {
    Fail "Missing track id '$need'. Got: $($ids -join ', ')"
  }
}

$categories = @($tracks | ForEach-Object { $_.category } | Select-Object -Unique)
if ($categories -notcontains "sql") {
  Fail "Missing category 'sql'. Got: $($categories -join ', ')"
}
if ($categories -notcontains "code") {
  Fail "Missing category 'code'. Got: $($categories -join ', ')"
}

$codeTrack = $tracks | Where-Object { $_.id -eq "javascript-basics" } | Select-Object -First 1
if ($codeTrack.category -ne "code") {
  Fail "javascript-basics category should be 'code', got '$($codeTrack.category)'"
}
if ($codeTrack.level -ne "basic") {
  Fail "javascript-basics level should be 'basic', got '$($codeTrack.level)'"
}

Ok "tracks=$($ids -join ', ') categories=$($categories -join ', ')"
Write-Host "PASS: catalog architecture"
exit 0
