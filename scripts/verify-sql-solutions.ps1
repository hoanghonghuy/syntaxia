# Smoke-grade every published SQL Fundamentals lesson solution (en).
# Requires API at http://127.0.0.1:8082

$ErrorActionPreference = "Stop"
$Base = if ($env:SYNTAXIA_API) { $env:SYNTAXIA_API } else { "http://127.0.0.1:8082" }
$s = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$email = "verify_sql_$(Get-Random)@test.local"
$body = @{ email = $email; password = "password123"; displayName = "Verify" } | ConvertTo-Json
Invoke-WebRequest -Uri "$Base/api/v1/auth/register" -Method POST -Body $body -ContentType "application/json" -WebSession $s -UseBasicParsing | Out-Null

$lessons = (Invoke-WebRequest -Uri "$Base/api/v1/lessons?track=sql-fundamentals&locale=en" -WebSession $s -UseBasicParsing).Content | ConvertFrom-Json
Write-Host "Lessons:" $lessons.Count
$fail = @()
foreach ($sum in ($lessons | Sort-Object sortOrder)) {
  $lesson = (Invoke-WebRequest -Uri "$Base/api/v1/lessons/$($sum.slug)?locale=en" -WebSession $s -UseBasicParsing).Content | ConvertFrom-Json
  $sol = $lesson.exercise.solution
  if (-not $sol) {
    $fail += "$($sum.slug): no solution"
    continue
  }
  $payload = @{
    sql      = $sol
    seed     = $lesson.sandboxSeed
    expected = $lesson.exercise.expected
  } | ConvertTo-Json -Depth 12
  try {
    $r = Invoke-WebRequest -Uri "$Base/api/v1/sandbox/run" -Method POST -Body ([Text.Encoding]::UTF8.GetBytes($payload)) -ContentType "application/json; charset=utf-8" -WebSession $s -UseBasicParsing
    $j = $r.Content | ConvertFrom-Json
    if (-not $j.passed) {
      $fail += "$($sum.slug): $($j.message)"
      Write-Host "FAIL" $sum.slug $j.message
    } else {
      Write-Host "OK  " $sum.slug
    }
  } catch {
    $fail += "$($sum.slug): $($_.Exception.Message)"
    Write-Host "ERR " $sum.slug $_.Exception.Message
  }
}

if ($fail.Count) {
  Write-Host "FAILED $($fail.Count)"
  $fail | ForEach-Object { Write-Host $_ }
  exit 1
}
Write-Host "PASS all $($lessons.Count) solutions"
