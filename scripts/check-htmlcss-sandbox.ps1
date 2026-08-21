#Requires -Version 5.1
<#
.SYNOPSIS
  HTML/CSS sandbox API smoke: grade every authored html-basics + css-basics solution.

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

function Grade-AuthoredSolution {
  param(
    [Parameter(Mandatory)]$Session,
    [Parameter(Mandatory)][string]$Track,
    [Parameter(Mandatory)][string]$Slug
  )

  $detailPath = "/api/v1/lessons/$Slug`?locale=en&track=$Track"
  $lesson = Invoke-Api -Method GET -Path $detailPath -Session $Session
  if (-not $lesson.exercise) { Fail "$Track/$Slug missing exercise" }
  if ($lesson.exercise.expected) { Fail "$Track/$Slug exposes exercise.expected" }
  if (-not $lesson.exercise.solutionAvailable) { Fail "$Track/$Slug missing solutionAvailable" }

  $solutionPath = "/api/v1/lessons/$Slug/solution`?locale=en&track=$Track"
  $solutionPayload = Invoke-Api -Method GET -Path $solutionPath -Session $Session
  $solution = [string]$solutionPayload.solution
  if ([string]::IsNullOrWhiteSpace($solution)) { Fail "$Track/$Slug returned an empty authored solution" }

  $mode = [string]$lesson.exercise.mode
  $html = ""
  $css = ""
  switch ($mode) {
    "html" {
      $html = $solution
    }
    "css" {
      $html = [string]$lesson.exercise.starterHtml
      $css = $solution
    }
    "both" {
      $html = [string]$lesson.exercise.starterHtml
      $css = $solution
    }
    default {
      Fail "$Track/$Slug has unsupported HTML/CSS exercise mode '$mode'"
    }
  }

  if (($mode -eq "css" -or $mode -eq "both") -and [string]::IsNullOrWhiteSpace($html)) {
    Fail "$Track/$Slug mode=$mode is missing starterHtml"
  }

  $body = @{
    lessonId = $lesson.id
    slug     = $Slug
    locale   = "en"
    html     = $html
    css      = $css
  } | ConvertTo-Json -Compress -Depth 5

  $grade = Invoke-Api -Method POST -Path "/api/v1/sandbox/htmlcss/grade" -Session $Session -JsonBody $body
  if (-not $grade.passed) {
    Fail "$Track/$Slug authored solution should pass: $($grade.message) code=$($grade.code)"
  }
  Ok "$Track/$Slug authored solution passed"
}

function Grade-Track {
  param(
    [Parameter(Mandatory)]$Session,
    [Parameter(Mandatory)][string]$Track,
    [Parameter(Mandatory)][int]$ExpectedCount
  )

  $lessons = @(Invoke-Api -Method GET -Path "/api/v1/lessons?track=$Track&locale=en" -Session $Session)
  if ($lessons.Count -ne $ExpectedCount) {
    Fail "$Track expected $ExpectedCount published lessons, got $($lessons.Count)"
  }
  Ok "$Track exact published inventory=$ExpectedCount"

  foreach ($lesson in $lessons) {
    $slug = [string]$lesson.slug
    if ([string]::IsNullOrWhiteSpace($slug)) { Fail "$Track returned a lesson without slug" }
    Grade-AuthoredSolution -Session $Session -Track $Track -Slug $slug
  }
}

Write-Host "=== HTML/CSS authored-solution smoke (26 lessons) ==="

$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$email = "htmlcss-sandbox+$ts@syntaxia.test"
$regJson = (@{
  email       = $email
  password    = "e2e-pass-12"
  displayName = "HTMLCSS $ts"
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

Grade-Track -Session $session -Track "html-basics" -ExpectedCount 12
Grade-Track -Session $session -Track "css-basics" -ExpectedCount 14

Write-Host "PASS: HTML/CSS authored-solution smoke (all 26 lessons)"
exit 0
