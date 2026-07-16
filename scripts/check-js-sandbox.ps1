#Requires -Version 5.1
<#
.SYNOPSIS
  JavaScript sandbox API smoke: grade all 9 basics lessons.

.PARAMETER BaseUrl
  API base URL. Default http://127.0.0.1:8082
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

function Invoke-Api {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$Path,
    [string]$JsonBody = "",
    [Microsoft.PowerShell.Commands.WebRequestSession]$Session = $null
  )
  $uri = "$BaseUrl$Path"
  $params = @{
    Uri             = $uri
    Method          = $Method
    UseBasicParsing = $true
    TimeoutSec      = 60
  }
  if ($Session) { $params.WebSession = $Session }
  if ($JsonBody) {
    $params.ContentType = "application/json; charset=utf-8"
    $params.Body = $JsonBody
  }
  try {
    $resp = Invoke-WebRequest @params
  } catch {
    Fail "$Method $Path -> $($_.Exception.Message)"
  }
  return $resp.Content | ConvertFrom-Json
}

Write-Host "=== JS sandbox smoke (9 lessons) ==="

$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$email = "js-sandbox+$ts@syntaxia.test"
$regJson = (@{
  email       = $email
  password    = "e2e-pass-12"
  displayName = "JS $ts"
} | ConvertTo-Json -Compress)

try {
  $null = Invoke-WebRequest -Uri "$BaseUrl/api/v1/auth/register" -Method POST `
    -ContentType "application/json; charset=utf-8" `
    -Body $regJson `
    -SessionVariable session `
    -UseBasicParsing -TimeoutSec 60
} catch {
  Fail "register failed: $($_.Exception.Message)"
}
Ok "registered $email"

# slug -> passing grade payload (canonical answers from curriculum en)
$gradeCases = @(
  @{ slug = "what-is-javascript"; returnValue = $null; consoleLines = @("Hello, Ada") }
  @{ slug = "variables"; returnValue = 8; consoleLines = @() }
  @{ slug = "numbers-and-operators"; returnValue = 36; consoleLines = @() }
  @{ slug = "strings"; returnValue = "Hello, Sam!"; consoleLines = @() }
  @{ slug = "string-methods"; returnValue = "Syn"; consoleLines = @() }
  @{ slug = "arrays"; returnValue = 4; consoleLines = @() }
  @{ slug = "conditionals"; returnValue = $null; consoleLines = @("Game over") }
  @{ slug = "loops"; returnValue = 6; consoleLines = @() }
  @{ slug = "functions"; returnValue = $null; consoleLines = @("9") }
)

foreach ($case in $gradeCases) {
  $lesson = Invoke-Api -Method GET -Path "/api/v1/lessons/$($case.slug)?locale=en" -Session $session
  if (-not $lesson.exercise) { Fail "$($case.slug) missing exercise" }
  if ($lesson.exercise.expected) { Fail "$($case.slug) exposes exercise.expected" }

  $body = @{
    lessonId     = $lesson.id
    locale       = "en"
    returnValue  = $case.returnValue
    consoleLines = $case.consoleLines
  }
  $gradeJson = $body | ConvertTo-Json -Compress
  $grade = Invoke-Api -Method POST -Path "/api/v1/sandbox/js/grade" -Session $session -JsonBody $gradeJson
  if (-not $grade.passed) {
    Fail "$($case.slug) grade should pass: $($grade.message)"
  }
  Ok "$($case.slug) grade passed"
}

Write-Host "PASS: JS sandbox smoke (all 9 lessons)"
exit 0
