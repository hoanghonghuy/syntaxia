#Requires -Version 5.1
<#
.SYNOPSIS
  Adaptive Daily Session E2E: deterministic English evidence -> weak skill -> bounded Today plan.
#>
param(
  [string]$BaseUrl = "http://127.0.0.1:8082"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

. (Join-Path $PSScriptRoot "lib\Invoke-SyntaxiaApi.ps1")
$script:SyntaxiaApiBaseUrl = $BaseUrl

Write-Host "=== Syntaxia Adaptive Today E2E ==="

$health = Invoke-SyntaxiaApi -Method GET -Path "/health"
if ($health.Json.status -ne "ok") { Fail "/health not ok" }

$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$email = "e2e-today+$ts@syntaxia.test"
$password = "e2e-" + [Guid]::NewGuid().ToString("N").Substring(0, 12)
$regBody = (@{ email = $email; password = $password; displayName = "E2E Today $ts" } | ConvertTo-Json -Compress)

$session = $null
$reg = Invoke-WebRequest -Uri "$BaseUrl/api/v1/auth/register" -Method POST `
  -ContentType "application/json; charset=utf-8" -Body $regBody `
  -SessionVariable session -UseBasicParsing -TimeoutSec 60
if ([int]$reg.StatusCode -ne 201) { Fail "register status $($reg.StatusCode)" }

$lesson = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/sound-spelling?locale=en&track=english-basics" -Session $session
$lessonId = $lesson.Json.id
if (-not $lessonId) { Fail "missing English foundation lesson id" }

$progBody = (@{ locale = "en"; completed = $true } | ConvertTo-Json -Compress)
$prog = Invoke-SyntaxiaApi -Method PUT -Path "/api/v1/progress/$lessonId" -JsonBody $progBody -Session $session
if (-not $prog.Json.completed) { Fail "English foundation progress not completed" }

$itemKey = "en-fnd-sound-hear-meet"
$due = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/language/review/due?track=english-basics&locale=en&limit=50" -Session $session
$seed = @(@($due.Json) | Where-Object { $_.lessonId -eq $lessonId -and $_.itemKey -eq $itemKey }) | Select-Object -First 1
if (-not $seed) { Fail "Today E2E could not seed stable English review card" }

$goodBody = (@{ lessonId = $lessonId; locale = "en"; itemKey = $itemKey; submission = "Meet!"; responseMs = 900 } | ConvertTo-Json -Compress)
$good = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/attempt" -JsonBody $goodBody -Session $session
if (-not $good.Json.correct) { Fail "Today E2E correct answer was rejected" }

$wrongBody = (@{ lessonId = $lessonId; locale = "en"; itemKey = $itemKey; submission = "Goodbye"; responseMs = 800 } | ConvertTo-Json -Compress)
$wrong = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/attempt" -JsonBody $wrongBody -Session $session
if ($wrong.Json.correct) { Fail "Today E2E wrong answer was accepted" }

$today = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/learning/today?track=english-basics&locale=en&targetMinutes=15" -Session $session
if ($today.Json.trackId -ne "english-basics" -or $today.Json.locale -ne "en") { Fail "Today plan scope mismatch" }
if ([int]$today.Json.targetMinutes -ne 15) { Fail "Today target budget mismatch" }
if ([int]$today.Json.estimatedMinutes -gt 15 -or [int]$today.Json.estimatedMinutes -lt 1) { Fail "Today estimated budget is not bounded" }
if ([int]$today.Json.weakSkillCount -lt 2) { Fail "Today plan lost P1.2 weak-skill signals" }

$items = @($today.Json.items)
$repair = @($items | Where-Object { $_.type -eq "repair" -and $_.skillId -eq "en.sound.spelling" }) | Select-Object -First 1
if (-not $repair) { Fail "Today plan missing high-priority spelling repair" }
if ($repair.priority -ne "high" -or [double]$repair.masteryScore -ne 50) { Fail "Today repair priority/mastery mismatch" }
if (-not (@($repair.reasons) -contains "recent_incorrect_attempt")) { Fail "Today repair lost recent-mistake explanation" }
if (-not $repair.lesson -or $repair.lesson.lessonId -ne $lessonId) { Fail "Today repair escaped completed curriculum frontier" }

$newLesson = @($items | Where-Object { $_.type -eq "lesson" }) | Select-Object -First 1
if (-not $newLesson -or -not $newLesson.lesson) { Fail "Today plan missing next curriculum action" }
if ($newLesson.lesson.lessonId -eq $lessonId) { Fail "Today next lesson points back to completed lesson" }
if ([int]$newLesson.lesson.sortOrder -le [int]$repair.lesson.sortOrder) { Fail "Today next lesson did not advance curriculum order" }

$serialized = $today.Json | ConvertTo-Json -Depth 10 -Compress
if ($serialized -match "Meet!" -or $serialized -match "Goodbye") { Fail "Today plan leaked raw learner submissions" }

Ok "Adaptive Today plan composes weakness + next curriculum action inside a 15-minute budget"

Invoke-SyntaxiaApi -Method POST -Path "/api/v1/auth/logout" -Session $session -ExpectStatus @(200, 204) | Out-Null
Write-Host "PASS: Adaptive Today E2E gate"
exit 0
