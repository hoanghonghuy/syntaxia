# Neon PostgreSQL — schema bootstrap for Syntaxia

Apply ordered SQL under `apps/api/migrations/` to a Neon project (same idea as iris-app `scripts/db`).

| File | Purpose |
|------|---------|
| `migrate-neon.ps1` | Apply `init.sql` → `006_*.sql` via `psql` (or Docker) |
| `fix-tracks-utf8.sql` | Repair corrupted Vietnamese track titles/descriptions |
| `.env.neon.example` | Credential template (copy → `.env.neon`) |
| `_Load-NeonEnv.ps1` | Helper to read `.env.neon` |

## Setup

```powershell
copy scripts\db\.env.neon.example scripts\db\.env.neon
```

From [Neon Console](https://console.neon.tech) → Connection string:

1. **Pooler** → `NEON_DATABASE_URL` (app `DATABASE_URL` on Render)
2. **Direct** → build `SANDBOX_DATABASE_URL` as `postgres://syntaxia_sandbox:<password>@<direct-host>/<db>?sslmode=require`

SQL sandbox uses TEMP tables inside a transaction — **do not** point `SANDBOX_DATABASE_URL` at a transaction-mode pooler.

Optional: set `NEON_SANDBOX_PASSWORD` in `.env.neon` so migrate alters the role password away from the local default.

## Migrate

From repo root:

```powershell
.\scripts\db\migrate-neon.ps1
```

Or:

```powershell
$env:NEON_DATABASE_URL = '<paste-pooler-url>'
.\scripts\db\migrate-neon.ps1
```

Requires `psql` on PATH, or Docker (`postgres:16-alpine`).

**UTF-8:** `migrate-neon.ps1` mounts SQL files into Docker (does not pipe via PowerShell). Piping on Windows corrupted Vietnamese to `?` in Neon. To repair track titles only:

```powershell
.\scripts\db\migrate-neon.ps1   # after pull — or apply scripts/db/fix-tracks-utf8.sql via the same helper
```

Quick repair (from repo root, with `scripts/db/.env.neon` set):

```powershell
. .\scripts\db\_Load-NeonEnv.ps1
$null = Import-NeonEnvFile -EnvFile scripts\db\.env.neon
# Re-use migrate's Docker mount path by running:
docker run --rm -e PGCLIENTENCODING=UTF8 -e LANG=C.UTF-8 `
  -v "${PWD}/scripts/db:/sql:ro" postgres:16-alpine `
  psql $env:NEON_DATABASE_URL -v ON_ERROR_STOP=1 --set=client_encoding=UTF8 -f /sql/fix-tracks-utf8.sql
```

On Neon, `ALTER ROLE … NOSUPERUSER` is denied; migrations fall back to `NOCREATEDB NOCREATEROLE` only. If a previous migrate aborted mid-file, reset schema then re-run:

```powershell
# destructive — empty Neon public schema
Get-Content scripts/db/.env.neon | ForEach-Object { if ($_ -match '^NEON_DATABASE_URL=(.+)$') { $env:NEON_DATABASE_URL = $matches[1].Trim() } }
@"
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO neondb_owner;
GRANT ALL ON SCHEMA public TO public;
"@ | docker run --rm -i postgres:16-alpine psql $env:NEON_DATABASE_URL -v ON_ERROR_STOP=1
.\scripts\db\migrate-neon.ps1
```

## After migrate (Render)

| Env | Value |
|-----|--------|
| `DATABASE_URL` | Neon pooler URL (owner / app role) |
| `SANDBOX_DATABASE_URL` | Direct host + `syntaxia_sandbox` + strong password |

Curriculum sync runs when the API container starts (`CURRICULUM_LOCAL_PATH=/app/curriculum` in the Docker image).

## Related

- [`docs/processes/production-deploy.md`](../../docs/processes/production-deploy.md)
- iris-app: `scripts/db/README-NEON.md`
