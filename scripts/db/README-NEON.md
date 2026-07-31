# Neon PostgreSQL — schema bootstrap for Syntaxia

Apply ordered SQL under `apps/api/migrations/` to a Neon project (same idea as iris-app `scripts/db`).

| File | Purpose |
|------|---------|
| `migrate-neon.ps1` | Apply `init.sql` → `005_*.sql` via `psql` (or Docker) |
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

## After migrate (Render)

| Env | Value |
|-----|--------|
| `DATABASE_URL` | Neon pooler URL (owner / app role) |
| `SANDBOX_DATABASE_URL` | Direct host + `syntaxia_sandbox` + strong password |

Curriculum sync runs when the API container starts (`CURRICULUM_LOCAL_PATH=/app/curriculum` in the Docker image).

## Related

- [`docs/processes/production-deploy.md`](../../docs/processes/production-deploy.md)
- iris-app: `scripts/db/README-NEON.md`
