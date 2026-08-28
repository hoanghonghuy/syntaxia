#Requires -Version 5.1
<#
.SYNOPSIS
  Languages domain E2E: register -> lesson(?track=) -> progress -> notes -> persisted review/mastery for Mandarin, English, Japanese, and Chinese IT specialty.

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
if ($health.Json.status -ne "ok") { Fail "/health not ok" }
Ok "/health"

$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$email = "e2e-lang+$ts@syntaxia.test"
$password = "e2e-" + [Guid]::NewGuid().ToString("N").Substring(0, 12)
$regBody = (@{ email = $email; password = $password; displayName = "E2E Lang $ts" } | ConvertTo-Json -Compress)

$session = $null
$reg = Invoke-WebRequest -Uri "$BaseUrl/api/v1/auth/register" -Method POST `
  -ContentType "application/json; charset=utf-8" -Body $regBody `
  -SessionVariable session -UseBasicParsing -TimeoutSec 60
if ([int]$reg.StatusCode -ne 201) { Fail "register status $($reg.StatusCode)" }
Ok "register $email"

$me = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/auth/me" -Session $session
if ($me.Json.email -ne $email) { Fail "me email mismatch" }
Ok "auth/me"

$flows = @(
  @{ Track = "chinese-hsk"; Slug = "greetings"; ExpectedLessons = 41 },
  @{ Track = "english-basics"; Slug = "sound-spelling"; ExpectedLessons = 43 },
  @{ Track = "japanese-jlpt"; Slug = "kana-sounds"; ExpectedLessons = 35 },
  @{ Track = "chinese-it-vocab"; Slug = "hardware-software"; ExpectedLessons = 6 }
)

$reviewLessonId = $null
$englishLessonId = $null
$japaneseLessonId = $null
$specialtyLessonId = $null
foreach ($flow in $flows) {
  $track = $flow.Track
  $slug = $flow.Slug
  Write-Host "--- $track / $slug ---"

  $list = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons?track=$track&locale=en" -Session $session
  $lessons = @($list.Json)
  if ($lessons.Count -ne $flow.ExpectedLessons) { Fail "$track lesson count $($lessons.Count) != expected $($flow.ExpectedLessons)" }
  Ok "$track exact lesson inventory=$($lessons.Count)"

  $unitRows = @($lessons | Where-Object { $_.unitId })
  if ($unitRows.Count -ne $lessons.Count) { Fail "$track has $($lessons.Count - $unitRows.Count) lesson summaries without unitId" }
  $roles = @($lessons | ForEach-Object { $_.unitRole } | Where-Object { $_ })
  if ($roles.Count -ne $lessons.Count) { Fail "$track has $($lessons.Count - $roles.Count) lesson summaries without unitRole" }
  if ($track -eq "chinese-it-vocab") {
    $unexpectedRoles = @($roles | Where-Object { $_ -ne "lesson" })
    if ($unexpectedRoles.Count -gt 0) { Fail "$track specialty summaries contain non-lesson unit roles: $($unexpectedRoles -join ', ')" }
    Ok "$track specialty-unit summary metadata"
  } else {
    if (-not ($roles -contains "checkpoint") -or -not ($roles -contains "review")) { Fail "$track summary is missing checkpoint/review unit roles" }
    Ok "$track communicative-unit summary metadata"
  }

  $lesson = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/${slug}?locale=en&track=$track" -Session $session
  if ($lesson.Json.trackId -ne $track) { Fail "$track getLesson trackId=$($lesson.Json.trackId)" }
  if (-not $lesson.Json.id) { Fail "$track missing lesson id" }
  $lessonId = $lesson.Json.id
  Ok "$track lesson id=$lessonId"

  $progBody = (@{ locale = "en"; completed = $true } | ConvertTo-Json -Compress)
  $prog = Invoke-SyntaxiaApi -Method PUT -Path "/api/v1/progress/$lessonId" -JsonBody $progBody -Session $session
  if (-not $prog.Json.completed) { Fail "$track progress not completed" }
  Ok "$track progress completed"

  if ($track -eq "chinese-hsk") { $reviewLessonId = $lessonId }
  if ($track -eq "english-basics") { $englishLessonId = $lessonId }
  if ($track -eq "japanese-jlpt") { $japaneseLessonId = $lessonId }
  if ($track -eq "chinese-it-vocab") { $specialtyLessonId = $lessonId }

  $noteBody = (@{ locale = "en"; body = "e2e note $track $ts"; track = $track } | ConvertTo-Json -Compress)
  $note = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/lessons/${slug}/notes?track=$track" -JsonBody $noteBody -Session $session -ExpectStatus @(201)
  if (-not $note.Json.id) { Fail "$track note create missing id" }
  Ok "$track note id=$($note.Json.id)"

  $notes = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/lessons/${slug}/notes?locale=en&track=$track" -Session $session
  $arr = @($notes.Json)
  if ($arr.Count -lt 1) { Fail "$track notes empty after create" }
  Ok "$track notes count=$($arr.Count)"
}

$allProg = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/progress" -Session $session
$progRows = @($allProg.Json)
if ($progRows.Count -lt 4) { Fail "expected >= 4 progress rows, got $($progRows.Count)" }
Ok "progress rows=$($progRows.Count)"

if (-not $reviewLessonId) { Fail "missing completed Mandarin lesson for review smoke" }
if (-not $englishLessonId) { Fail "missing completed English lesson for review smoke" }
if (-not $japaneseLessonId) { Fail "missing completed Japanese lesson for review smoke" }
if (-not $specialtyLessonId) { Fail "missing completed Chinese IT specialty lesson for review smoke" }

# Mandarin legacy compatibility path
$due = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/language/review/due?track=chinese-hsk&locale=en&limit=50" -Session $session
$dueCards = @($due.Json)
$reviewItemKey = "zh-greet-reply-1"
$seedCard = @($dueCards | Where-Object { $_.lessonId -eq $reviewLessonId -and $_.itemKey -eq $reviewItemKey }) | Select-Object -First 1
if (-not $seedCard) { Fail "review due sync did not create $reviewItemKey for $reviewLessonId" }
Ok "Mandarin review card synced from authored item id"

$reviewBody = (@{ lessonId = $reviewLessonId; locale = "en"; itemKey = $reviewItemKey; rating = 3; responseMs = 1200 } | ConvertTo-Json -Compress)
$firstReview = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/review" -JsonBody $reviewBody -Session $session
if ($firstReview.Json.itemKey -ne $reviewItemKey -or [int64]$firstReview.Json.reps -lt 1) { Fail "first persisted Mandarin review response invalid" }
$firstReps = [int64]$firstReview.Json.reps
Ok "Mandarin review persisted reps=$firstReps"

$reviewBody2 = (@{ lessonId = $reviewLessonId; locale = "en"; itemKey = $reviewItemKey; rating = 4; responseMs = 900 } | ConvertTo-Json -Compress)
$secondReview = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/review" -JsonBody $reviewBody2 -Session $session
$secondReps = [int64]$secondReview.Json.reps
if ($secondReps -le $firstReps) { Fail "Mandarin review state was not loaded/persisted across requests: $firstReps -> $secondReps" }
Ok "Mandarin review state persisted across requests reps=$secondReps"

# English foundation: authoritative raw-answer grading path.
$englishDue = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/language/review/due?track=english-basics&locale=en&limit=50" -Session $session
$englishCards = @($englishDue.Json)
$englishItemKey = "en-fnd-sound-hear-meet"
$englishSeedCard = @($englishCards | Where-Object { $_.lessonId -eq $englishLessonId -and $_.itemKey -eq $englishItemKey }) | Select-Object -First 1
if (-not $englishSeedCard) { Fail "English review due sync did not create $englishItemKey for $englishLessonId" }
Ok "English foundation review card synced from authored stable item id"

$englishAttemptBody = (@{ lessonId = $englishLessonId; locale = "en"; itemKey = $englishItemKey; submission = "Meet!"; responseMs = 1000 } | ConvertTo-Json -Compress)
$englishAttempt = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/attempt" -JsonBody $englishAttemptBody -Session $session
if (-not $englishAttempt.Json.correct) { Fail "server grader rejected normalized correct English submission" }
if ([int]$englishAttempt.Json.rating -ne 3 -or [double]$englishAttempt.Json.confidence -ne 1) { Fail "server-graded English attempt rating/confidence mismatch" }
if ($englishAttempt.Json.card.itemKey -ne $englishItemKey -or [int64]$englishAttempt.Json.card.reps -lt 1) { Fail "server-graded English attempt did not persist FSRS card" }
if ($englishAttempt.Json.PSObject.Properties.Name -contains "submission") { Fail "attempt response must not echo raw learner submission" }
Ok "English raw answer server-graded and persisted without echoing submission"

$masteryResponse = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/learning/mastery?track=english-basics&locale=en" -Session $session
$masteryRows = @($masteryResponse.Json)
$soundMastery = @($masteryRows | Where-Object { $_.skillId -eq "en.sound.spelling" }) | Select-Object -First 1
$listeningMastery = @($masteryRows | Where-Object { $_.skillId -eq "en.listening.word-recognition" }) | Select-Object -First 1
if (-not $soundMastery -or -not $listeningMastery) { Fail "English attempt did not produce authored skill mastery rows" }
if ([int64]$soundMastery.evidenceCount -lt 1 -or [double]$soundMastery.score -ne 80 -or [double]$soundMastery.evidenceWeight -ne 1) { Fail "unexpected sound mastery after server-graded Good attempt" }
if ([int64]$listeningMastery.evidenceCount -lt 1 -or [double]$listeningMastery.score -ne 80 -or [double]$listeningMastery.evidenceWeight -ne 1) { Fail "unexpected listening mastery after server-graded Good attempt" }
Ok "English server-graded attempt persisted high-confidence skill evidence/mastery"

# P1.2: a recent deterministic mistake must become an explainable weak-skill repair candidate.
$englishWrongBody = (@{ lessonId = $englishLessonId; locale = "en"; itemKey = $englishItemKey; submission = "Goodbye"; responseMs = 850 } | ConvertTo-Json -Compress)
$englishWrong = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/attempt" -JsonBody $englishWrongBody -Session $session
if ($englishWrong.Json.correct) { Fail "server grader accepted intentionally wrong English submission" }
if ([int]$englishWrong.Json.rating -ne 1 -or [double]$englishWrong.Json.confidence -ne 1) { Fail "wrong server-graded English attempt rating/confidence mismatch" }
Ok "English deterministic mistake persisted for weak-skill signals"

$weakResponse = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/learning/weak-skills?track=english-basics&locale=en&limit=5" -Session $session
if ($weakResponse.Json.trackId -ne "english-basics" -or $weakResponse.Json.locale -ne "en") { Fail "weak-skill read model scope mismatch" }
if ([int]$weakResponse.Json.recentWindowDays -ne 14) { Fail "weak-skill recent window mismatch" }
if (-not $weakResponse.Json.frontier -or $weakResponse.Json.frontier.lessonId -ne $englishLessonId) { Fail "weak-skill frontier did not stay on completed English curriculum" }
$weakCandidates = @($weakResponse.Json.candidates)
$soundWeak = @($weakCandidates | Where-Object { $_.skillId -eq "en.sound.spelling" }) | Select-Object -First 1
$listeningWeak = @($weakCandidates | Where-Object { $_.skillId -eq "en.listening.word-recognition" }) | Select-Object -First 1
if (-not $soundWeak -or -not $listeningWeak) { Fail "recent English mistake did not produce both authored weak-skill candidates" }
if ($soundWeak.priority -ne "high" -or [int64]$soundWeak.recentMistakes -lt 1) { Fail "sound weak-skill priority/recent mistake mismatch" }
if ([double]$soundWeak.masteryScore -ne 50 -or [double]$soundWeak.evidenceWeight -ne 2) { Fail "sound weak-skill confidence-weighted mastery mismatch" }
if (-not (@($soundWeak.reasons) -contains "recent_incorrect_attempt")) { Fail "sound weak-skill explanation missing recent mistake reason" }
if (-not (@($soundWeak.reasons) -contains "mastery_below_60")) { Fail "sound weak-skill explanation missing low-mastery reason" }
if (-not $soundWeak.repairLesson -or $soundWeak.repairLesson.lessonId -ne $englishLessonId) { Fail "sound weak-skill repair lesson escaped completed frontier" }
if (-not $soundWeak.nextReviewAt) { Fail "sound weak-skill read model missing review schedule state" }
Ok "weak-skill read model explains recent mistake + mastery + review + curriculum frontier"

# Japanese foundation: prove Unit 0 stable IDs enter the same generic FSRS engine.
$japaneseDue = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/language/review/due?track=japanese-jlpt&locale=en&limit=50" -Session $session
$japaneseCards = @($japaneseDue.Json)
$japaneseItemKey = "ja-fnd-kana-hear-asa"
$japaneseSeedCard = @($japaneseCards | Where-Object { $_.lessonId -eq $japaneseLessonId -and $_.itemKey -eq $japaneseItemKey }) | Select-Object -First 1
if (-not $japaneseSeedCard) { Fail "Japanese review due sync did not create $japaneseItemKey for $japaneseLessonId" }
Ok "Japanese foundation review card synced from authored stable item id"

$japaneseReviewBody = (@{ lessonId = $japaneseLessonId; locale = "en"; itemKey = $japaneseItemKey; rating = 3; responseMs = 1050 } | ConvertTo-Json -Compress)
$japaneseReview = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/review" -JsonBody $japaneseReviewBody -Session $session
if ($japaneseReview.Json.itemKey -ne $japaneseItemKey -or [int64]$japaneseReview.Json.reps -lt 1) { Fail "persisted Japanese foundation review response invalid" }
Ok "Japanese foundation review persisted reps=$($japaneseReview.Json.reps)"

# Chinese IT specialty
$specialtyDue = Invoke-SyntaxiaApi -Method GET -Path "/api/v1/language/review/due?track=chinese-it-vocab&locale=en&limit=50" -Session $session
$specialtyCards = @($specialtyDue.Json)
$specialtyItemKey = "zh-it-hw-context-1"
$specialtySeedCard = @($specialtyCards | Where-Object { $_.lessonId -eq $specialtyLessonId -and $_.itemKey -eq $specialtyItemKey }) | Select-Object -First 1
if (-not $specialtySeedCard) { Fail "Chinese IT review due sync did not create $specialtyItemKey for $specialtyLessonId" }
Ok "Chinese IT specialty review card synced from authored stable item id"

$specialtyReviewBody = (@{ lessonId = $specialtyLessonId; locale = "en"; itemKey = $specialtyItemKey; rating = 3; responseMs = 1100 } | ConvertTo-Json -Compress)
$specialtyReview = Invoke-SyntaxiaApi -Method POST -Path "/api/v1/language/review" -JsonBody $specialtyReviewBody -Session $session
if ($specialtyReview.Json.itemKey -ne $specialtyItemKey -or [int64]$specialtyReview.Json.reps -lt 1) { Fail "persisted Chinese IT specialty review response invalid" }
Ok "Chinese IT review persisted reps=$($specialtyReview.Json.reps)"

Invoke-SyntaxiaApi -Method POST -Path "/api/v1/auth/logout" -Session $session -ExpectStatus @(200, 204) | Out-Null
Ok "logout"

Write-Host "PASS: Languages E2E gate"
exit 0
