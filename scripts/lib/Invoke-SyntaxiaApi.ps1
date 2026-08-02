#Requires -Version 5.1
<#
.SYNOPSIS
  Shared HTTP helpers for Syntaxia API E2E / smoke scripts.

.DESCRIPTION
  Dot-source from other scripts:
    . (Join-Path $PSScriptRoot "lib\Invoke-SyntaxiaApi.ps1")
  Caller must set $script:SyntaxiaApiBaseUrl before Invoke-SyntaxiaApi.
#>

function Fail([string]$Message) {
  Write-Host "FAIL: $Message" -ForegroundColor Red
  exit 1
}

function Ok([string]$Message) {
  Write-Host "OK: $Message" -ForegroundColor Green
}

function Read-SyntaxiaErrorBody($Exception) {
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

function Invoke-SyntaxiaApi {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$Path,
    [string]$JsonBody = "",
    [Microsoft.PowerShell.Commands.WebRequestSession]$Session = $null,
    [int[]]$ExpectStatus = @(200),
    [string]$BaseUrl = ""
  )

  if (-not $BaseUrl) {
    $BaseUrl = $script:SyntaxiaApiBaseUrl
  }
  if (-not $BaseUrl) {
    Fail "SyntaxiaApiBaseUrl is not set"
  }

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
    Fail "$Method $Path -> HTTP $status $($ex.Message) $(Read-SyntaxiaErrorBody $ex)"
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
