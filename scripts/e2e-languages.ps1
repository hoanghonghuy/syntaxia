#Requires -Version 5.1
<#
.SYNOPSIS
  Languages domain E2E: register -> lesson(?track=) -> progress -> notes -> persisted review for ZH/EN/JA.

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

# Exact EN-locale inventories after the Language V3 starter migration.
# Static curriculum tests lock file parity; this live API check verifies the
# synced DB/read model exposes exactly the same published node inventory.
$flows = @(
  @{ Track = "chinese-hsk"; Slug = "greetings"; ExpectedLessons = 30 },
  @{ Track = "english-basics"; Slug = "greetings"; ExpectedLessons = 14 },
  @{ Track = "japanese-jlpt"; Slug = "politeness"; ExpectedLessons = 16 },
  @{ Track = "chinese-it-vocab"; Slug = "hardware-software"; ExpectedLessons = 6 }
)

$reviewLessonId = $null
foreach ($flow in $flows) {
  $track = $flow.Track
  $slug = $flow.Slug
  Write-Host "--- $track / $slug ---"

  $list = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons?track=$track&locale=en" -Session $session
  $lessons = @($list.Json)
  if ($lessons.Count -ne $flow.ExpectedLessons) {
    Fail "$track lesson count $($lessons.Count) != expected $($flow.ExpectedLessons)"
  }
  Ok "$track exact lesson inventory=$($lessons.Count)"

  if ($track -ne "chinese-it-vocab") {
    $unitRows = @($lessons | Where-Object { $_.unitId })
    if ($unitRows.Count -ne $lessons.Count) {
      Fail "$track has $($lessons.Count - $unitRows.Count) lesson summaries without unitId"
    }
    $roles = @($lessons | ForEach-Object { $_.unitRole } | Where-Object { $_ })
    if (-not ($roles -contains "checkpoint") -or -not ($roles -contains "review")) {
      Fail "$track summary is missing checkpoint/review unit roles"
    }
    Ok "$track communicative-unit summary metadata"
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

  if ($track -eq "chinese-hsk") {
    $reviewLessonId = $lessonId
  }

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

if (-not $reviewLessonId) {
  Fail "missing completed Mandarin lesson for review smoke"
}

# GET /due creates missing cards from the completed lesson's authored stable item IDs.
$due = Invoke-SyntaxiaApi -Method GET `
  -Path "/api/v1/language/review/due?track=chinese-hsk&locale=en&limit=50" `
  -Session $session
$dueCards = @($due.Json)
$reviewItemKey = "zh-greet-reply-1"
$seedCard = @($dueCards | Where-Object {
  $_.lessonId -eq $reviewLessonId -and $_.itemKey -eq $reviewItemKey
}) | Select-Object -First 1
if (-not $seedCard) {
  Fail "review due sync did not create $reviewItemKey for $reviewLessonId"
}
Ok "review card synced from authored item id"

$reviewBody = (@{
  lessonId   = $reviewLessonId
  locale     = "en"
  itemKey    = $reviewItemKey
  rating     = 3
  responseMs = 1200
} | ConvertTo-Json -Compress)
$firstReview = Invoke-SyntaxiaApi -Method POST `
  -Path "/api/v1/language/review" -JsonBody $reviewBody -Session $session
if ($firstReview.Json.itemKey -ne $reviewItemKey -or [int64]$firstReview.Json.reps -lt 1) {
  Fail "first persisted review response invalid"
}
$firstReps = [int64]$firstReview.Json.reps
Ok "review persisted reps=$firstReps"

$reviewBody2 = (@{
  lessonId   = $reviewLessonId
  locale     = "en"
  itemKey    = $reviewItemKey
  rating     = 4
  responseMs = 900
} | ConvertTo-Json -Compress)
$secondReview = Invoke-SyntaxiaApi -Method POST `
  -Path "/api/v1/language/review" -JsonBody $reviewBody2 -Session $session
$secondReps = [int64]$secondReview.Json.reps
if ($secondReps -le $firstReps) {
  Fail "review state was not loaded/persisted across requests: $firstReps -> $secondReps"
}
Ok "review state persisted across requests reps=$secondReps"

Invoke-SyntaxiaApi -Method POST -Path "/api/v1/auth/logout" -Session $session -ExpectStatus @(200, 204) | Out-Null
Ok "logout"

Write-Host "PASS: Languages E2E gate"
exit 0
