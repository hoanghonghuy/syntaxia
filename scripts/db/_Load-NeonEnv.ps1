# Dot-source helper: load scripts/db/.env.neon into process environment.

function Import-NeonEnvFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$EnvFile
    )

    if (-not (Test-Path $EnvFile)) {
        return $false
    }

    Get-Content $EnvFile -Encoding UTF8 | ForEach-Object {
        $line = $_.Trim()
        if ($line -eq '' -or $line.StartsWith('#')) {
            return
        }

        if ($line -match '^\s*(?:export\s+)?([^#=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            if (-not [string]::IsNullOrWhiteSpace($name)) {
                Set-Item -Path "env:$name" -Value $value
            }
        }
    }

    return $true
}

function Resolve-NeonDatabaseUrl {
    param(
        [string]$DatabaseUrl,
        [string]$ScriptDir
    )

    if (-not [string]::IsNullOrWhiteSpace($DatabaseUrl)) {
        return $DatabaseUrl
    }

    $EnvFile = Join-Path $ScriptDir ".env.neon"
    $ExampleFile = Join-Path $ScriptDir ".env.neon.example"

    $null = Import-NeonEnvFile -EnvFile $EnvFile

    if (-not [string]::IsNullOrWhiteSpace($env:NEON_DATABASE_URL)) {
        return $env:NEON_DATABASE_URL
    }

    Write-Host "[ERROR] NEON_DATABASE_URL not configured" -ForegroundColor Red
    Write-Host ""
    Write-Host "Choose one:" -ForegroundColor Yellow
    Write-Host "  1. Copy $ExampleFile to $EnvFile and set NEON_DATABASE_URL"
    Write-Host "  2. Pass -DatabaseUrl '<connection-string-from-neon-console>'"
    Write-Host "  3. Set environment variable: `$env:NEON_DATABASE_URL = '<connection-string>'"
    exit 1
}
