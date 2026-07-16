#Requires -Version 5.1
<#
.SYNOPSIS
  SQL Fundamentals API E2E smoke gate (checklist #8).

.DESCRIPTION
  Register -> list intro lessons -> load what-is-sql (hints/solutionAvailable/table) ->
  authed solution reveal -> sandbox SELECT pass (server-side grading) ->
  set progress -> next lesson available.

  Auth cookie: syntaxia_token (HttpOnly, path /) via -SessionVariable.

.PARAMETER BaseUrl
  API base URL. Default http://127.0.0.1:8082

.EXAMPLE
  powershell -File scripts/e2e-sql-fundamentals.ps1
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

function Read-ErrorBody($Exception) {
  if (-not $Exception.Response) { return "" }
  try {
    $stream = $Exception.Response.GetResponseStream()
    if (-not $stream) { return "" }
    $reader = New-Object System.IO.StreamReader($stream)
    $text = $reader.ReadToEnd()
    $reader.Close()
    return $text
  }
  catch {
    return ""
  }
}

function Invoke-Api {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$Path,
    [string]$JsonBody = "",
    [Microsoft.PowerShell.Commands.WebRequestSession]$Session = $null,
    [int[]]$ExpectStatus = @(200)
  )

  $uri = "$BaseUrl$Path"
  $params = @{
    Uri             = $uri
    Method          = $Method
    UseBasicParsing = $true
    TimeoutSec      = 60
  }
  if ($Session) {
    $params.WebSession = $Session
  }
  if ($JsonBody -and $JsonBody.Length -gt 0) {
    $params.ContentType = "application/json; charset=utf-8"
    $params.Body = $JsonBody
  }

  try {
    $resp = Invoke-WebRequest @params
  }
  catch {
    $ex = $_.Exception
    $status = $null
    if ($ex.Response) {
      $status = [int]$ex.Response.StatusCode
    }
    Fail "$Method $Path -> HTTP $status $($ex.Message) $(Read-ErrorBody $ex)"
  }

  if ($ExpectStatus -notcontains [int]$resp.StatusCode) {
    Fail "$Method $Path -> unexpected status $($resp.StatusCode); body=$($resp.Content)"
  }

  $json = $null
  if ($resp.Content -and $resp.Content.Trim().Length -gt 0) {
    try {
      $json = $resp.Content | ConvertFrom-Json
    }
    catch {
      Fail "$Method $Path -> invalid JSON: $($resp.Content)"
    }
  }
  return @{ Response = $resp; Json = $json }
}

Write-Host "=== Syntaxia SQL Fundamentals E2E ==="
Write-Host "BaseUrl: $BaseUrl"

# 1) Health
$health = Invoke-Api -Method GET -Path "/health"
if ($health.Json.status -ne "ok") {
  Fail "/health status is not ok: $($health.Response.Content)"
}
Ok "/health status=ok backend=$($health.Json.backend)"

# 2) Register unique user — cookie jar via SessionVariable
$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$email = "e2e+$ts@syntaxia.test"
$password = "e2e-pass-12"
$displayName = "E2E $ts"
$regJson = (@{
  email       = $email
  password    = $password
  displayName = $displayName
} | ConvertTo-Json -Compress)

try {
  $regResp = Invoke-WebRequest -Uri "$BaseUrl/api/v1/auth/register" -Method POST `
    -ContentType "application/json; charset=utf-8" `
    -Body $regJson `
    -SessionVariable session `
    -UseBasicParsing -TimeoutSec 60
}
catch {
  Fail "POST /api/v1/auth/register -> $($_.Exception.Message) $(Read-ErrorBody $_.Exception)"
}

if ([int]$regResp.StatusCode -ne 201) {
  Fail "register unexpected status $($regResp.StatusCode): $($regResp.Content)"
}

$cookie = $session.Cookies.GetCookies($BaseUrl) | Where-Object { $_.Name -eq "syntaxia_token" }
if (-not $cookie -or [string]::IsNullOrWhiteSpace($cookie.Value)) {
  # Fallback: login to populate cookie jar
  try {
    $null = Invoke-WebRequest -Uri "$BaseUrl/api/v1/auth/login" -Method POST `
      -ContentType "application/json; charset=utf-8" `
      -Body (@{ email = $email; password = $password } | ConvertTo-Json -Compress) `
      -WebSession $session `
      -UseBasicParsing -TimeoutSec 60
  }
  catch {
    Fail "login fallback failed: $($_.Exception.Message) $(Read-ErrorBody $_.Exception)"
  }
  $cookie = $session.Cookies.GetCookies($BaseUrl) | Where-Object { $_.Name -eq "syntaxia_token" }
}
if (-not $cookie -or [string]::IsNullOrWhiteSpace($cookie.Value)) {
  Fail "syntaxia_token cookie missing after register/login (expected Set-Cookie name=syntaxia_token; Path=/)"
}
Ok "register cookie syntaxia_token present for $email"

$me = Invoke-Api -Method GET -Path "/api/v1/auth/me" -Session $session
if ($me.Json.email -ne $email) {
  Fail "/auth/me email mismatch: $($me.Response.Content)"
}
Ok "/auth/me ok id=$($me.Json.id)"

# 3) List lessons
$lessonsResp = Invoke-Api -Method GET -Path "/api/v1/lessons?track=sql-fundamentals&locale=en" -Session $session
$lessons = @($lessonsResp.Json)
if ($lessons.Count -lt 10) {
  Fail "expected >= 10 sql-fundamentals lessons, got $($lessons.Count)"
}
$intro = $lessons | Where-Object { $_.slug -eq "what-is-sql" } | Select-Object -First 1
if (-not $intro) {
  Fail "what-is-sql not in lesson list"
}
Ok "lessons count=$($lessons.Count); intro id=$($intro.id)"

# 4) GET lesson what-is-sql
$lessonResp = Invoke-Api -Method GET -Path "/api/v1/lessons/what-is-sql?locale=en" -Session $session
$lesson = $lessonResp.Json
if (-not $lesson.exercise) {
  Fail "lesson missing exercise"
}
$hints = @($lesson.exercise.hints)
if ($hints.Count -lt 1) {
  Fail "exercise.hints missing or empty"
}
if ($lesson.exercise.solution) {
  Fail "exercise.solution must not be exposed on public lesson GET"
}
if (-not $lesson.exercise.solutionAvailable) {
  Fail "exercise.solutionAvailable missing (lesson has a solution server-side)"
}
if (-not $lesson.bodyHtml -or ($lesson.bodyHtml -notmatch "(?i)<table")) {
  Fail "bodyHtml missing or has no <table>"
}
if ($null -ne $lesson.sandboxSeed) {
  Fail "sandboxSeed must not be exposed on public lesson GET"
}
if ($lesson.exercise.expected) {
  Fail "exercise.expected must not be exposed on public lesson GET"
}
Ok "what-is-sql has hints($($hints.Count)), solutionAvailable, table in bodyHtml; grading fields stripped"

# 4b) Solution reveal (authed only)
$solResp = Invoke-Api -Method GET -Path "/api/v1/lessons/what-is-sql/solution?locale=en" -Session $session
if (-not $solResp.Json.solution -or [string]::IsNullOrWhiteSpace([string]$solResp.Json.solution)) {
  Fail "GET /lessons/what-is-sql/solution missing solution text"
}
Ok "solution reveal returns SQL ($($solResp.Json.solution.Length) chars)"

# 5) Sandbox run — server loads seed/expected from lesson id
$sandboxObj = [ordered]@{
  sql      = "SELECT * FROM movies;"
  lessonId = $lesson.id
  locale   = "en"
}
$sandboxJson = $sandboxObj | ConvertTo-Json -Depth 20 -Compress
$sandbox = Invoke-Api -Method POST -Path "/api/v1/sandbox/run" -JsonBody $sandboxJson -Session $session
if (-not $sandbox.Json.passed) {
  Fail "sandbox did not pass: $($sandbox.Response.Content)"
}
Ok "sandbox/run passed=true"

# 6) PUT progress completed
$progressJson = (@{
  locale    = "en"
  completed = $true
} | ConvertTo-Json -Compress)
$progressPut = Invoke-Api -Method PUT -Path "/api/v1/progress/$($lesson.id)" -JsonBody $progressJson -Session $session
if (-not $progressPut.Json.completed) {
  Fail "PUT progress did not return completed=true: $($progressPut.Response.Content)"
}
Ok "PUT progress completed for $($lesson.id)"

# 7) GET progress — expect completed
$progressList = Invoke-Api -Method GET -Path "/api/v1/progress" -Session $session
$items = @($progressList.Json)
$mine = $items | Where-Object { $_.lessonId -eq $lesson.id -and $_.locale -eq "en" } | Select-Object -First 1
if (-not $mine -or -not $mine.completed) {
  Fail "GET progress missing completed entry for $($lesson.id): $($progressList.Response.Content)"
}
Ok "GET progress shows $($lesson.id) completed"

# 8) Next lesson available (first incomplete by sortOrder)
$sorted = $lessons | Sort-Object sortOrder
$completedIds = @{}
foreach ($p in $items) {
  if ($p.locale -eq "en" -and $p.completed) {
    $completedIds[$p.lessonId] = $true
  }
}
$next = $null
foreach ($l in $sorted) {
  if (-not $completedIds.ContainsKey($l.id)) {
    $next = $l
    break
  }
}
if (-not $next) {
  Fail "no next incomplete lesson after completing intro"
}
if ($next.slug -eq "what-is-sql") {
  Fail "next incomplete still what-is-sql (progress not applied)"
}
$nextLesson = Invoke-Api -Method GET -Path "/api/v1/lessons/$($next.slug)?locale=en" -Session $session
if (-not $nextLesson.Json.id) {
  Fail "next lesson GET failed for slug=$($next.slug)"
}
Ok "next lesson available: $($next.slug) (id=$($next.id))"

Write-Host ""
Write-Host "PASS: SQL Fundamentals E2E gate" -ForegroundColor Green
exit 0
