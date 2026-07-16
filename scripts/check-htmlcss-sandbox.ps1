#Requires -Version 5.1
<#
.SYNOPSIS
  HTML/CSS sandbox API smoke: grade all html-basics + css-basics lessons.

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

function Grade-Lesson {
  param(
    $Session,
    [string]$Slug,
    [string]$Html,
    [string]$Css
  )
  $lesson = Invoke-Api -Method GET -Path "/api/v1/lessons/$Slug`?locale=en" -Session $Session
  if (-not $lesson.exercise) { Fail "$Slug missing exercise" }
  if ($lesson.exercise.expected) { Fail "$Slug exposes exercise.expected" }

  $body = @{
    lessonId = $lesson.id
    locale   = "en"
    html     = $Html
    css      = $Css
  } | ConvertTo-Json -Compress -Depth 5
  $grade = Invoke-Api -Method POST -Path "/api/v1/sandbox/htmlcss/grade" -Session $Session -JsonBody $body
  if (-not $grade.passed) {
    Fail "$Slug grade should pass: $($grade.message) code=$($grade.code)"
  }
  Ok "$Slug grade passed"
}

Write-Host "=== HTML/CSS sandbox smoke (26 lessons) ==="

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

Grade-Lesson $session "what-is-html" "<p>HTML marks up meaning.</p>" ""
Grade-Lesson $session "document-structure" "<!DOCTYPE html><html lang=`"en`"><head><meta charset=`"utf-8`"><title>My Page</title></head><body><p>Hello</p></body></html>" ""
Grade-Lesson $session "headings-and-paragraphs" "<h1>Welcome</h1><p>This is a short paragraph.</p>" ""
Grade-Lesson $session "emphasis-and-importance" "<p><em>quietly</em> and <strong>important</strong></p>" ""
Grade-Lesson $session "lists" "<ul><li>One</li><li>Two</li></ul>" ""
Grade-Lesson $session "links" '<a href="https://example.com">Example</a>' ""
Grade-Lesson $session "images" '<img src="cat.png" alt="A cat">' ""
Grade-Lesson $session "semantic-landmarks" "<header>Top</header><main>Content</main><footer>Bottom</footer>" ""
Grade-Lesson $session "tables" "<table><tr><th>Name</th><td>Alex</td></tr></table>" ""
Grade-Lesson $session "forms-basics" '<form><label for="email">Email</label><input id="email" name="email" type="email"><button type="submit">Send</button></form>' ""
Grade-Lesson $session "form-controls" '<label><input type="checkbox"> Agree</label><select><option>One</option></select>' ""
Grade-Lesson $session "html-entities" "<p>AT&amp;T</p>" ""

Grade-Lesson $session "what-is-css" "<h1>Welcome</h1>" "h1 { color: teal; }"
Grade-Lesson $session "css-syntax" '<p class="note">Hi</p>' ".note { color: blue; }"
Grade-Lesson $session "type-class-id-selectors" '<p class="note" id="hero">Hi</p>' ".note { color: navy; }`n#hero { font-weight: bold; }"
Grade-Lesson $session "combinators-and-groups" "<article><p>A</p></article>" "article p { color: green; }"
Grade-Lesson $session "pseudo-classes" '<a href="#">Link</a>' "a:hover { color: orange; }"
Grade-Lesson $session "cascade-and-specificity" '<p class="note">Hi</p>' ".note { color: purple; }"
Grade-Lesson $session "box-model" '<div class="box">Box</div>' ".box { padding: 1rem; margin: 1rem; }"
Grade-Lesson $session "colors-and-units" '<p class="note">Hi</p>' ".note { color: teal; font-size: 1.25rem; }"
Grade-Lesson $session "text-and-fonts" '<p class="note">Hi</p>' ".note { font-family: Georgia, serif; }"
Grade-Lesson $session "backgrounds-and-borders" '<div class="card">Card</div>' ".card { background: #eef; border-radius: 8px; }"
Grade-Lesson $session "display-and-flow" '<span class="box">A</span>' ".box { display: inline-block; }"
Grade-Lesson $session "styling-lists-and-links" '<ul class="menu"><li><a href="#">Home</a></li></ul>' ".menu { list-style: none; }`n.menu a { text-decoration: none; }"
Grade-Lesson $session "sizing-and-overflow" '<div class="panel">Long text here</div>' ".panel { max-width: 12rem; overflow: auto; }"
Grade-Lesson $session "flexbox-basics" '<div class="row"><span>A</span><span>B</span></div>' ".row { display: flex; gap: 1rem; }"

Write-Host "PASS: HTML/CSS sandbox smoke (all 26 lessons)"
exit 0
