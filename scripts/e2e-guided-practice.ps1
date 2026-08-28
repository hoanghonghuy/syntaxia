#Requires -Version 5.1
<#
.SYNOPSIS
  English Guided Practice P2.0 E2E: published curriculum + progress -> deterministic eligibility -> authoritative exit-check evidence.
#>
param(
  [string]$BaseUrl = "http://127.0.0.1:8082"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

. (Join-Path $PSScriptRoot "lib\Invoke-SyntaxiaApi.ps1")
$script:SyntaxiaApiBaseUrl = $BaseUrl

Write-Host "=== Syntaxia English Guided Practice P2.0 E2E ==="

$health = Invoke-SyntaxiaApi -Method GET -Path "/health"
if ($health.Json.status -ne "ok") { Fail "/health not ok" }

$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$email = "e2e-guided+$ts@syntaxia.test"
$password = [Guid]::NewGuid().ToString("N")
$regBody = (@{ email = $email; password = $password; displayName = "E2E Guided $ts" } | ConvertTo-Json -Compress)

$session = $null
$reg = Invoke-WebRequest -Uri "$BaseUrl/api/v1/auth/register" -Method POST `
  -ContentType "application/json; charset=utf-8" -Body $regBody `
  -SessionVariable session -UseBasicParsing -TimeoutSec 60
if ([int]$reg.StatusCode -ne 201) { Fail "register status $($reg.StatusCode)" }

function Get-Eligibility {
  return Invoke-SyntaxiaApi -Method GET -Path "/api/v1/language/guided-practice/eligibility?track=english-basics&locale=en" -Session $session
}

$initial = Get-Eligibility
if ($initial.Json.trackId -ne "english-basics" -or $initial.Json.locale -ne "en") { Fail "guided-practice scope mismatch" }
$units = @($initial.Json.units)
if ($units.Count -ne 9) { Fail "expected exactly 9 Unit 1-9 blueprints, got $($units.Count)" }
if (@($units | Where-Object { [int]$_.blueprint.unitOrder -eq 0 }).Count -ne 0) { Fail "Unit 0 must not appear in text guided practice" }

$u1 = @($units | Where-Object { [int]$_.blueprint.unitOrder -eq 1 }) | Select-Object -First 1
if (-not $u1) { Fail "missing Unit 1 guided-practice blueprint" }
if ($u1.eligible) { Fail "fresh learner must not have Unit 1 guided practice unlocked" }
if (-not $u1.curriculumReady) { Fail "Unit 1 published curriculum should be ready" }
if (-not (@($u1.missingPrerequisiteSlugs) -contains "greetings")) { Fail "Unit 1 should require greetings" }
if (-not (@($u1.missingPrerequisiteSlugs) -contains "meeting-checkpoint")) { Fail "Unit 1 should require meeting checkpoint" }
if (@($u1.blueprint.requiredLessonSlugs) -contains "meeting-review") { Fail "delayed review must not gate guided practice" }
if (-not (@($u1.blueprint.exitCheckItemKeys) -contains "en-u01-check-produce")) { Fail "Unit 1 lost stable exit-check item identity" }
if (-not (@($u1.blueprint.targetSkills) -contains "en.communication.self-introduction")) { Fail "Unit 1 lost authored target skill" }

$greetings = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/greetings?locale=en&track=english-basics" -Session $session
$checkpoint = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/meeting-checkpoint?locale=en&track=english-basics" -Session $session
if (-not $greetings.Json.id -or -not $checkpoint.Json.id) { Fail "missing Unit 1 lesson identities" }

$progBody = (@{ locale = "en"; completed = $true } | ConvertTo-Json -Compress)
Invoke-SyntaxiaApi -Method PUT -Path "/api/v1/progress/$($greetings.Json.id)" -JsonBody $progBody -Session $session | Out-Null

$afterLesson = Get-Eligibility
$u1AfterLesson = @(@($afterLesson.Json.units) | Where-Object { [int]$_.blueprint.unitOrder -eq 1 }) | Select-Object -First 1
if ($u1AfterLesson.eligible) { Fail "Unit 1 must remain locked before checkpoint completion" }
if (@($u1AfterLesson.missingPrerequisiteSlugs).Count -ne 1 -or $u1AfterLesson.missingPrerequisiteSlugs[0] -ne "meeting-checkpoint") {
  Fail "Unit 1 prerequisite reduction is not deterministic"
}

Invoke-SyntaxiaApi -Method PUT -Path "/api/v1/progress/$($checkpoint.Json.id)" -JsonBody $progBody -Session $session | Out-Null

$afterCheckpoint = Get-Eligibility
$u1Ready = @(@($afterCheckpoint.Json.units) | Where-Object { [int]$_.blueprint.unitOrder -eq 1 }) | Select-Object -First 1
if (-not $u1Ready.eligible -or -not $u1Ready.curriculumReady) { Fail "Unit 1 should unlock after lesson + checkpoint completion" }
if (@($u1Ready.missingPrerequisiteSlugs).Count -ne 0) { Fail "eligible Unit 1 still reports missing prerequisites" }

$u2 = @(@($afterCheckpoint.Json.units) | Where-Object { [int]$_.blueprint.unitOrder -eq 2 }) | Select-Object -First 1
if (-not $u2 -or $u2.eligible) { Fail "completing Unit 1 must not unlock Unit 2 guided practice" }

Ok "English guided-practice eligibility is frontier-safe and unlocks only after authored lesson + checkpoint completion"

# Completing the checkpoint must expose the existing stable exit items to the P1
# review engine. P2 does not grade these itself; it delegates raw answers to the
# authoritative server-graded attempt path.
$due = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/language/review/due?track=english-basics&locale=en&limit=50" -Session $session
$dueCards = @($due.Json)
$produceKey = "en-u01-check-produce"
$closeKey = "en-u01-check-close"
$produceCard = @($dueCards | Where-Object { $_.lessonId -eq $checkpoint.Json.id -and $_.itemKey -eq $produceKey }) | Select-Object -First 1
$closeCard = @($dueCards | Where-Object { $_.lessonId -eq $checkpoint.Json.id -and $_.itemKey -eq $closeKey }) | Select-Object -First 1
if (-not $produceCard -or -not $closeCard) { Fail "Unit 1 stable exit checks were not synced into the P1 review engine" }

$produceBody = (@{ lessonId = $checkpoint.Json.id; locale = "en"; itemKey = $produceKey; submission = "Hi, I'm Nam."; responseMs = 900 } | ConvertTo-Json -Compress)
$produceAttempt = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/attempt" -JsonBody $produceBody -Session $session
if (-not $produceAttempt.Json.correct -or [int]$produceAttempt.Json.rating -ne 3 -or [double]$produceAttempt.Json.confidence -ne 1) {
  Fail "Unit 1 self-introduction exit check was not authoritatively graded Good"
}
if ($produceAttempt.Json.PSObject.Properties.Name -contains "submission") { Fail "exit-check response echoed raw learner text" }

$closeBody = (@{ lessonId = $checkpoint.Json.id; locale = "en"; itemKey = $closeKey; submission = "See you later."; responseMs = 700 } | ConvertTo-Json -Compress)
$closeAttempt = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/attempt" -JsonBody $closeBody -Session $session
if (-not $closeAttempt.Json.correct -or [int]$closeAttempt.Json.rating -ne 3 -or [double]$closeAttempt.Json.confidence -ne 1) {
  Fail "Unit 1 closing exit check was not authoritatively graded Good"
}
if ($closeAttempt.Json.PSObject.Properties.Name -contains "submission") { Fail "closing exit-check response echoed raw learner text" }

$mastery = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/learning/mastery?track=english-basics&locale=en" -Session $session
$masteryRows = @($mastery.Json)
foreach ($skillId in @("en.communication.greeting", "en.communication.self-introduction", "en.communication.closing")) {
  $row = @($masteryRows | Where-Object { $_.skillId -eq $skillId }) | Select-Object -First 1
  if (-not $row) { Fail "guided-practice exit check did not create mastery for $skillId" }
  if ([double]$row.score -ne 80 -or [double]$row.evidenceWeight -ne 1 -or [int64]$row.evidenceCount -lt 1) {
    Fail "unexpected P1 mastery for guided-practice target $skillId"
  }
}

Ok "Guided-practice exit checks reuse P1 server grading and persist high-confidence target-skill mastery"

Invoke-SyntaxiaApi -Method POST -Path "/api/v1/auth/logout" -Session $session -ExpectStatus @(200, 204) | Out-Null
Write-Host "PASS: English Guided Practice P2.0 E2E gate"
exit 0
