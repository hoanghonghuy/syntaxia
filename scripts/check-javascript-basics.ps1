#Requires -Version 5.1
<#
.SYNOPSIS
  JavaScript Basics curriculum smoke: 9 published lessons in MDN order.

.PARAMETER BaseUrl
  API base URL. Default http://127.0.0.1:8082

.EXAMPLE
  powershell -File scripts/check-javascript-basics.ps1
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

$expected = @(
  "what-is-javascript",
  "variables",
  "numbers-and-operators",
  "strings",
  "string-methods",
  "arrays",
  "conditionals",
  "loops",
  "functions"
)

$uri = "$BaseUrl/api/v1/lessons?track=javascript-basics&locale=en"
try {
  $lessons = Invoke-RestMethod -Uri $uri -Method Get
} catch {
  Fail "GET $uri failed: $($_.Exception.Message)"
}

if ($lessons.Count -ne $expected.Count) {
  Fail "Expected $($expected.Count) lessons, got $($lessons.Count)"
}

$sorted = @($lessons | Sort-Object { [int]$_.sortOrder })
for ($i = 0; $i -lt $expected.Count; $i++) {
  $slug = $sorted[$i].slug
  if ($slug -ne $expected[$i]) {
    Fail "Order $i expected '$($expected[$i])', got '$slug'"
  }
}

foreach ($slug in $expected) {
  $lessonUri = "$BaseUrl/api/v1/lessons/$slug`?locale=en"
  try {
    $lesson = Invoke-RestMethod -Uri $lessonUri -Method Get
  } catch {
    Fail "GET $lessonUri failed: $($_.Exception.Message)"
  }
  if (-not $lesson.exercise) {
    Fail "$slug lesson missing exercise"
  }
  if ($lesson.exercise.expected) {
    Fail "$slug exposes exercise.expected on public GET"
  }
  if (-not $lesson.exercise.solutionAvailable) {
    Fail "$slug missing exercise.solutionAvailable"
  }
  $hints = @($lesson.exercise.hints)
  if ($hints.Count -lt 3) {
    Fail "$slug exercise needs at least 3 hints, got $($hints.Count)"
  }
}
Ok "all $($expected.Count) lessons have sandbox exercise (no grading leak)"

Ok "javascript-basics lessons=$($expected.Count) slugs=$($expected -join ', ')"
Write-Host "PASS: javascript-basics curriculum"
exit 0
