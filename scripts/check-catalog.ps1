#Requires -Version 5.1
<#
.SYNOPSIS
  Catalog architecture smoke: GET /tracks has sql + web + code categories.

.DESCRIPTION
  Asserts tracks including sql-fundamentals, postgresql, html-basics, css-basics,
  and javascript-basics; categories must include sql, web, and code.

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

if (-not $tracks -or $tracks.Count -lt 5) {
  Fail "Expected at least 5 tracks, got $($tracks.Count)"
}

$ids = @($tracks | ForEach-Object { $_.id })
foreach ($need in @("sql-fundamentals", "postgresql", "html-basics", "css-basics", "javascript-basics")) {
  if ($ids -notcontains $need) {
    Fail "Missing track id '$need'. Got: $($ids -join ', ')"
  }
}

$categories = @($tracks | ForEach-Object { $_.category } | Select-Object -Unique)
foreach ($needCat in @("sql", "web", "code")) {
  if ($categories -notcontains $needCat) {
    Fail "Missing category '$needCat'. Got: $($categories -join ', ')"
  }
}

$codeTrack = $tracks | Where-Object { $_.id -eq "javascript-basics" } | Select-Object -First 1
if ($codeTrack.category -ne "code") {
  Fail "javascript-basics category should be 'code', got '$($codeTrack.category)'"
}
if ($codeTrack.level -ne "basic") {
  Fail "javascript-basics level should be 'basic', got '$($codeTrack.level)'"
}

$htmlTrack = $tracks | Where-Object { $_.id -eq "html-basics" } | Select-Object -First 1
if ($htmlTrack.category -ne "web") {
  Fail "html-basics category should be 'web', got '$($htmlTrack.category)'"
}

$cssTrack = $tracks | Where-Object { $_.id -eq "css-basics" } | Select-Object -First 1
if ($cssTrack.category -ne "web") {
  Fail "css-basics category should be 'web', got '$($cssTrack.category)'"
}

Ok "tracks=$($ids -join ', ') categories=$($categories -join ', ')"
Write-Host "PASS: catalog architecture"
exit 0
