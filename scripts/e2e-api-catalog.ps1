#Requires -Version 5.1
<#
.SYNOPSIS
  Catalog + public API smoke: tracks, lesson counts, track-scoped slug disambiguation.

.PARAMETER BaseUrl
  API base URL. Default http://127.0.0.1:8082

.EXAMPLE
  powershell -File scripts/e2e-api-catalog.ps1
#>
param(
  [string]$BaseUrl = "http://127.0.0.1:8082"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

. (Join-Path $PSScriptRoot "lib\Invoke-SyntaxiaApi.ps1")
$script:SyntaxiaApiBaseUrl = $BaseUrl

Write-Host "=== Syntaxia API catalog smoke ==="
Write-Host "BaseUrl: $BaseUrl"

$health = Invoke-SyntaxiaApi -Method GET -Path "/health"
if ($health.Json.status -ne "ok") {
  Fail "/health status is not ok: $($health.Response.Content)"
}
Ok "/health status=ok"

$providers = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/auth/providers"
if ($null -eq $providers.Json.email) {
  Fail "/auth/providers missing email flag"
}
Ok "auth/providers email=$($providers.Json.email) google=$($providers.Json.google)"

$tracksResp = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/tracks"
$tracks = @($tracksResp.Json)
if ($tracks.Count -lt 7) {
  Fail "Expected >= 7 tracks, got $($tracks.Count)"
}
$ids = @($tracks | ForEach-Object { $_.id })
foreach ($need in @(
    "sql-fundamentals", "postgresql", "html-basics", "css-basics", "javascript-basics",
    "chinese-hsk", "english-basics", "japanese-jlpt", "chinese-it-vocab"
  )) {
  if ($ids -notcontains $need) {
    Fail "Missing track '$need'. Got: $($ids -join ', ')"
  }
}
$categories = @($tracks | ForEach-Object { $_.category } | Select-Object -Unique)
foreach ($needCat in @("sql", "web", "code", "languages")) {
  if ($categories -notcontains $needCat) {
    Fail "Missing category '$needCat'. Got: $($categories -join ', ')"
  }
}
Ok "tracks include IT + languages ($($ids.Count) total)"

$expectCounts = @{
  "chinese-hsk"     = 12
  "english-basics"  = 6
  "japanese-jlpt"   = 6
  "chinese-it-vocab" = 6
  "sql-fundamentals" = 10
}
foreach ($trackId in $expectCounts.Keys) {
  $min = [int]$expectCounts[$trackId]
  $list = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons?track=$trackId&locale=en"
  $lessons = @($list.Json)
  if ($lessons.Count -lt $min) {
    Fail "$trackId expected >= $min lessons, got $($lessons.Count)"
  }
  Ok "$trackId lessons=$($lessons.Count) (>= $min)"
}

$zh = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/greetings?locale=en&track=chinese-hsk"
$en = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/greetings?locale=en&track=english-basics"
if ($zh.Json.trackId -ne "chinese-hsk" -or $en.Json.trackId -ne "english-basics") {
  Fail "track query not applied: zh=$($zh.Json.trackId) en=$($en.Json.trackId)"
}
if ($zh.Json.id -eq $en.Json.id) {
  Fail "slug collision: chinese and english greetings share id $($zh.Json.id)"
}
Ok "greetings disambiguated zh=$($zh.Json.id) en=$($en.Json.id)"

$ja = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/politeness?locale=en&track=japanese-jlpt"
if ($ja.Json.trackId -ne "japanese-jlpt" -or $ja.Json.id -ne "ja-n5-01-politeness") {
  Fail "japanese politeness unexpected: track=$($ja.Json.trackId) id=$($ja.Json.id)"
}
if (-not $ja.Json.exercise) {
  Fail "japanese politeness missing exercise"
}
Ok "japanese politeness id=$($ja.Json.id)"

$fdZh = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/food-drink?locale=en&track=chinese-hsk"
$fdJa = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/food-drink?locale=en&track=japanese-jlpt"
if ($fdZh.Json.id -eq $fdJa.Json.id) {
  Fail "food-drink collision zh/ja same id"
}
Ok "food-drink disambiguated zh=$($fdZh.Json.id) ja=$($fdJa.Json.id)"

Write-Host "PASS: API catalog smoke"
exit 0
