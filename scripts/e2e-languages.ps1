#Requires -Version 5.1
<#
.SYNOPSIS
  Languages domain E2E: register -> lesson(?track=) -> progress -> notes for ZH/EN/JA.

.PARAMETER BaseUrl
  API base URL. Default http://127.0.0.1:8082

.EXAMPLE
  powershell -File scripts/e2e-languages.ps1
#>
param(
  [string]$BaseUrl = "http://127.0.0.1:8082"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

. (Join-Path $PSScriptRoot "lib\Invoke-SyntaxiaApi.ps1")
$script:SyntaxiaApiBaseUrl = $BaseUrl

Write-Host "=== Syntaxia Languages E2E ==="
Write-Host "BaseUrl: $BaseUrl"

$health = Invoke-SyntaxiaApi -Method GET -Path "/health"
if ($health.Json.status -ne "ok") {
  Fail "/health not ok"
}
Ok "/health"

$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$email = "e2e-lang+$ts@syntaxia.test"
$password = "e2e-pass-12"
$regBody = (@{
  email       = $email
  password    = $password
  displayName = "E2E Lang $ts"
} | ConvertTo-Json -Compress)

$session = $null
$reg = Invoke-WebRequest -Uri "$BaseUrl/api/v1/auth/register" -Method POST `
  -ContentType "application/json; charset=utf-8" -Body $regBody `
  -SessionVariable session -UseBasicParsing -TimeoutSec 60
if ([int]$reg.StatusCode -ne 201) {
  Fail "register status $($reg.StatusCode)"
}
Ok "register $email"

$me = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/auth/me" -Session $session
if ($me.Json.email -ne $email) {
  Fail "me email mismatch"
}
Ok "auth/me"

$flows = @(
  @{ Track = "chinese-hsk"; Slug = "greetings"; MinLessons = 12 },
  @{ Track = "english-basics"; Slug = "greetings"; MinLessons = 6 },
  @{ Track = "japanese-jlpt"; Slug = "politeness"; MinLessons = 6 },
  @{ Track = "chinese-it-vocab"; Slug = "hardware-software"; MinLessons = 6 }
)

foreach ($flow in $flows) {
  $track = $flow.Track
  $slug = $flow.Slug
  Write-Host "--- $track / $slug ---"

  $list = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons?track=$track&locale=en" -Session $session
  $lessons = @($list.Json)
  if ($lessons.Count -lt $flow.MinLessons) {
    Fail "$track lesson count $($lessons.Count) < $($flow.MinLessons)"
  }

  $lesson = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/${slug}?locale=en&track=$track" -Session $session
  if ($lesson.Json.trackId -ne $track) {
    Fail "$track getLesson trackId=$($lesson.Json.trackId)"
  }
  if (-not $lesson.Json.id) {
    Fail "$track missing lesson id"
  }
  $lessonId = $lesson.Json.id
  Ok "$track lesson id=$lessonId"

  $progBody = (@{ locale = "en"; completed = $true } | ConvertTo-Json -Compress)
  $prog = Invoke-SyntaxiaApi -Method PUT -Path "/api/v1/progress/$lessonId" -JsonBody $progBody -Session $session
  if (-not $prog.Json.completed) {
    Fail "$track progress not completed"
  }
  Ok "$track progress completed"

  $noteBody = (@{
    locale = "en"
    body   = "e2e note $track $ts"
    track  = $track
  } | ConvertTo-Json -Compress)
  $note = Invoke-SyntaxiaApi -Method POST `
    -Path "/api/v1/lessons/${slug}/notes?track=$track" `
    -JsonBody $noteBody -Session $session -ExpectStatus @(201)
  if (-not $note.Json.id) {
    Fail "$track note create missing id"
  }
  Ok "$track note id=$($note.Json.id)"

  $notes = Invoke-SyntaxiaApi -Method GET `
    -Path "/api/v1/lessons/${slug}/notes?locale=en&track=$track" `
    -Session $session
  $arr = @($notes.Json)
  if ($arr.Count -lt 1) {
    Fail "$track notes empty after create"
  }
  Ok "$track notes count=$($arr.Count)"
}

$allProg = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/progress" -Session $session
$progRows = @($allProg.Json)
if ($progRows.Count -lt 3) {
  Fail "expected >= 3 progress rows, got $($progRows.Count)"
}
Ok "progress rows=$($progRows.Count)"

Invoke-SyntaxiaApi -Method POST -Path "/api/v1/auth/logout" -Session $session -ExpectStatus @(200, 204) | Out-Null
Ok "logout"

Write-Host "PASS: Languages E2E gate"
exit 0
