# Production deploy (Vercel + Render + Neon)

## Purpose

Deploy Syntaxia from GitHub the same way as iris-app: **Nuxt on Vercel**, **Go API on Render (Docker)**, **Postgres on Neon**. Local Docker Compose remains the default for development.

## When to use

- First production / staging cloud deploy
- After pushing deployable commits to GitHub
- When rotating Neon credentials or changing web/API domains

## Architecture

| Layer | Platform | Source |
|-------|----------|--------|
| Web (Nuxt) | Vercel | GitHub → Root Directory `apps/web` |
| API (Go) | Render | GitHub → `Dockerfile` + `render.yaml` |
| Postgres | Neon | Connection strings in Render env |
| Schema | Local script | `scripts/db/migrate-neon.ps1` (once per empty DB) |

## Prerequisites

- Repo on GitHub
- Neon project created
- Render + Vercel accounts linked to the repo
- Strong `JWT_SECRET` (API refuses the dev default when `APP_ENV=production`)

## Steps

### 1. Neon schema + sandbox role

```powershell
copy scripts\db\.env.neon.example scripts\db\.env.neon
# Paste Neon pooler URL into NEON_DATABASE_URL
# Optional: NEON_SANDBOX_PASSWORD=<strong-password>

.\scripts\db\migrate-neon.ps1
```

Details: [`scripts/db/README-NEON.md`](../../scripts/db/README-NEON.md).

Build Render `SANDBOX_DATABASE_URL` with the **direct** (non-pooler) host and user `syntaxia_sandbox`. Pooler + TEMP tables will break the SQL sandbox.

### 2. Render (API)

1. New → Blueprint (or Web Service) → select this repo.
2. Use `render.yaml` / `Dockerfile` at repo root.
3. Set secret env vars (see [`infra/deploy.env.example`](../../infra/deploy.env.example)):

| Variable | Notes |
|----------|--------|
| `APP_ENV` | `production` |
| `JWT_SECRET` | Long random string |
| `DATABASE_URL` | Neon **pooler** URL |
| `SANDBOX_DATABASE_URL` | Neon **direct** + `syntaxia_sandbox` |
| `CORS_ORIGINS` | Vercel origin(s), comma-separated |
| `WEB_BASE_URL` | Same as public web URL (`https://…`) for Secure cookies |
| `BOOTSTRAP_ADMIN_EMAIL` | Optional |

4. Deploy → confirm `GET /health` returns `{ "status": "ok" }` (or equivalent).
5. Copy the public API URL (e.g. `https://syntaxia-api.onrender.com`).

Curriculum is baked into the image at `/app/curriculum` and synced on API startup.

### 3. Vercel (web)

1. Import the same GitHub repo.
2. **Root Directory:** `apps/web` (uses `apps/web/vercel.json`).
3. Framework: Nuxt (auto).
4. Env:

| Variable | Value |
|----------|--------|
| `NUXT_PUBLIC_API_BASE` | Public Render API URL (no trailing slash) |

5. Deploy → open the Vercel URL.

### 4. Wire cross-origin

1. Update Render `CORS_ORIGINS` and `WEB_BASE_URL` to the final Vercel URL (and custom domain if any).
2. Redeploy API if those env vars changed.
3. Confirm login cookie works over HTTPS (`WEB_BASE_URL` must be `https://…`).

### 5. Smoke

Prefer local gates before go-live:

```powershell
powershell -File scripts/release-smoke.ps1 -SkipDocker
```

Then manually on production URLs:

1. Register / login → home Continue
2. SQL lesson → sandbox pass
3. Theme + locale switch

### 6. Post-deploy

- Promote admin via `BOOTSTRAP_ADMIN_EMAIL` or SQL on Neon
- After curriculum edits: push → Render rebuild (image includes `docs/curriculum`)

## Local Compose (unchanged)

```powershell
powershell -File scripts/docker-up.ps1
```

See [`monorepo-dev.md`](./monorepo-dev.md) and [`environment.md`](./environment.md).

## Do

- Push to GitHub, then let Vercel/Render build from the connected branch.
- Keep `SANDBOX_DATABASE_URL` on Neon **direct** endpoint.
- Run `migrate-neon.ps1` on an **empty** Neon database before the first API boot.
- Store secrets only in platform dashboards / gitignored `.env.neon`.

## Don't

- Point browser `NUXT_PUBLIC_API_BASE` at an internal hostname.
- Use Neon pooler for `SANDBOX_DATABASE_URL`.
- Ship `JWT_SECRET=change-me-in-production-use-long-random-string` with `APP_ENV=production`.
- Expect re-running `init.sql` on a non-empty DB without a reset (script is one-shot bootstrap).

## Related

- [`environment.md`](./environment.md)
- [`release-hardening.md`](./release-hardening.md)
- [`sql-sandbox.md`](./sql-sandbox.md)
- [`scripts/db/README-NEON.md`](../../scripts/db/README-NEON.md)
- iris-app: `Dockerfile`, `scripts/db/README-NEON.md`, `infra/docker/deploy.env.example`
- Files: `Dockerfile`, `render.yaml`, `apps/web/vercel.json`, `infra/deploy.env.example`
