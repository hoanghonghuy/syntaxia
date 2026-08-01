# ============================================================================
# Apply Syntaxia SQL migrations to Neon PostgreSQL (iris-app style)
# ============================================================================
# Usage (from repo root):
#   .\scripts\db\migrate-neon.ps1
#   .\scripts\db\migrate-neon.ps1 -DatabaseUrl $env:NEON_DATABASE_URL
#
# Requires: psql on PATH, or Docker (postgres:16-alpine).

param(
    [string]$DatabaseUrl
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $ScriptDir "_Load-NeonEnv.ps1")
$DatabaseUrl = Resolve-NeonDatabaseUrl -DatabaseUrl $DatabaseUrl -ScriptDir $ScriptDir
$null = Import-NeonEnvFile -EnvFile (Join-Path $ScriptDir ".env.neon")

$ProjectRoot = Split-Path -Parent (Split-Path -Parent $ScriptDir)
$MigrationsDir = Join-Path $ProjectRoot "apps\api\migrations"

$OrderedFiles = @(
    "init.sql",
    "002_sandbox_harden.sql",
    "003_track_taxonomy.sql",
    "004_code_track.sql",
    "005_web_tracks.sql",
    "006_languages_tracks.sql",
    "007_chinese_hsk_band1_copy.sql"
)

Write-Host "Syntaxia Neon migrate" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "Migrations: $MigrationsDir" -ForegroundColor Gray
Write-Host ""

function Invoke-PsqlFile {
    param(
        [string]$Url,
        [string]$FilePath
    )

    $psql = Get-Command psql -ErrorAction SilentlyContinue
    if ($psql) {
        # Force UTF-8 client encoding (Windows consoles often default to a legacy code page).
        & psql $Url -v ON_ERROR_STOP=1 --set=client_encoding=UTF8 -f $FilePath
        if ($LASTEXITCODE -ne 0) {
            throw "psql failed for $FilePath (exit $LASTEXITCODE)"
        }
        return
    }

    $docker = Get-Command docker -ErrorAction SilentlyContinue
    if (-not $docker) {
        throw "Neither psql nor docker found. Install PostgreSQL client or Docker."
    }

    # Mount the file — do NOT pipe through PowerShell (corrupts Vietnamese UTF-8 to '?').
    $absFile = (Resolve-Path $FilePath).Path
    $absDir = Split-Path -Parent $absFile
    $leaf = Split-Path -Leaf $absFile
    docker run --rm `
        -e PGCLIENTENCODING=UTF8 `
        -e LANG=C.UTF-8 `
        -v "${absDir}:/sql:ro" `
        postgres:16-alpine `
        psql $Url -v ON_ERROR_STOP=1 --set=client_encoding=UTF8 -f "/sql/$leaf"
    if ($LASTEXITCODE -ne 0) {
        throw "docker psql failed for $FilePath (exit $LASTEXITCODE)"
    }
}

function Invoke-PsqlCommand {
    param(
        [string]$Url,
        [string]$Sql
    )

    $psql = Get-Command psql -ErrorAction SilentlyContinue
    if ($psql) {
        & psql $Url -v ON_ERROR_STOP=1 --set=client_encoding=UTF8 -c $Sql
        if ($LASTEXITCODE -ne 0) {
            throw "psql -c failed (exit $LASTEXITCODE)"
        }
        return
    }

    $tmp = Join-Path $env:TEMP ("syntaxia-psql-" + [guid]::NewGuid().ToString() + ".sql")
    try {
        [System.IO.File]::WriteAllText($tmp, $Sql, (New-Object System.Text.UTF8Encoding $false))
        Invoke-PsqlFile -Url $Url -FilePath $tmp
    } finally {
        Remove-Item -Force $tmp -ErrorAction SilentlyContinue
    }
}

foreach ($name in $OrderedFiles) {
    $path = Join-Path $MigrationsDir $name
    if (-not (Test-Path $path)) {
        throw "Missing migration file: $path"
    }
    Write-Host "[UP] $name" -ForegroundColor Green
    Invoke-PsqlFile -Url $DatabaseUrl -FilePath $path
}

if (-not [string]::IsNullOrWhiteSpace($env:NEON_SANDBOX_PASSWORD)) {
    $pwd = $env:NEON_SANDBOX_PASSWORD.Replace("'", "''")
    Write-Host "[ROLE] ALTER ROLE syntaxia_sandbox password" -ForegroundColor Yellow
    Invoke-PsqlCommand -Url $DatabaseUrl -Sql "ALTER ROLE syntaxia_sandbox WITH LOGIN PASSWORD '$pwd';"
}

Write-Host ""
Write-Host "[OK] Neon schema + sandbox role ready." -ForegroundColor Green
Write-Host "Set Render DATABASE_URL to the pooler URL." -ForegroundColor Gray
Write-Host "Set Render SANDBOX_DATABASE_URL to the direct host + syntaxia_sandbox user." -ForegroundColor Gray
