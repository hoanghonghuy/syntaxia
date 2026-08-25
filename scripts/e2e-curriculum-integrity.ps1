#Requires -Version 5.1
param(
  [string]$BaseUrl = "http://127.0.0.1:8082"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

. (Join-Path $PSScriptRoot "lib\Invoke-SyntaxiaApi.ps1")
$script:SyntaxiaApiBaseUrl = $BaseUrl

function Fail([string]$Message) {
  Write-Host "FAIL: $Message" -ForegroundColor Red
  exit 1
}

function Ok([string]$Message) {
  Write-Host "OK: $Message" -ForegroundColor Green
}

$expected = [ordered]@{
  "sql-fundamentals"  = 42
  "postgresql"        = 19
  "javascript-basics" = 9
  "html-basics"       = 12
  "css-basics"        = 14
  "chinese-hsk"       = 41
  "english-basics"    = 37
  "japanese-jlpt"     = 28
  "chinese-it-vocab"  = 6
}

$unitTracks = @("chinese-hsk", "english-basics", "japanese-jlpt")

Write-Host "=== Curriculum runtime integrity ===" -ForegroundColor Cyan

foreach ($track in $expected.Keys) {
  $expectedCount = [int]$expected[$track]
  $byLocale = @{}

  foreach ($locale in @("en", "vi")) {
    $response = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons?track=$track&locale=$locale"
    $lessons = @($response.Json)
    $byLocale[$locale] = $lessons

    if ($lessons.Count -ne $expectedCount) {
      Fail "$track/$locale runtime count $($lessons.Count) != expected $expectedCount"
    }

    foreach ($lesson in $lessons) {
      if (-not $lesson.id -or -not $lesson.slug -or -not $lesson.title) {
        Fail "$track/$locale contains a summary without id/slug/title"
      }
      if ($lesson.published -eq $false) {
        Fail "$track/$locale public endpoint exposed unpublished lesson $($lesson.id)"
      }
    }

    if ($unitTracks -contains $track) {
      $withoutUnit = @($lessons | Where-Object { -not $_.unitId -or $null -eq $_.unitOrder -or -not $_.unitRole })
      if ($withoutUnit.Count -gt 0) {
        Fail "$track/$locale has $($withoutUnit.Count) runtime lessons without complete unit metadata"
      }
    }

    Ok "$track/$locale exact inventory=$($lessons.Count)"
  }

  if (@($byLocale.en).Count -ne @($byLocale.vi).Count) {
    Fail "$track EN/VI runtime parity mismatch"
  }
}

Write-Host "PASS: curriculum runtime integrity" -ForegroundColor Green
exit 0