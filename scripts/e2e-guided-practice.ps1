#Requires -Version 5.1
<#
.SYNOPSIS
  English Guided Practice P2.0 E2E: published curriculum + progress -> deterministic unit eligibility.
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

Invoke-SyntaxiaApi -Method POST -Path "/api/v1/auth/logout" -Session $session -ExpectStatus @(200, 204) | Out-Null
Write-Host "PASS: English Guided Practice P2.0 E2E gate"
exit 0
