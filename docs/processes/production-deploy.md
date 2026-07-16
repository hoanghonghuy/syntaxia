# Production deploy readiness

## Purpose

Ordered steps to deploy Syntaxia (Docker Compose stack) for a real host with HTTPS, strong secrets, and green automated gates. Google OAuth and Drive remain optional/deferred.

## When to use

- After all curriculum tracks are complete (`curriculum-track-completion.md`)
- Before handing off a build to production or a VPS
- Product-perfection checklist **#23**

## Prerequisites

- All three tracks published: `sql-fundamentals` (42), `postgresql` (19), `javascript-basics` (9)
- Local `release-smoke.ps1` green on the commit you deploy

## Steps

### 1. Environment (production)

Copy `.env.example` → `.env` on the host. Set at minimum:

| Variable | Production value |
|----------|------------------|
| `APP_ENV` | `production` |
| `JWT_SECRET` | Long random string (API **refuses** dev default when `APP_ENV=production`) |
| `WEB_BASE_URL` | `https://your-domain` (enables `Secure` session cookies) |
| `CORS_ORIGINS` | `https://your-domain` |
| `NUXT_PUBLIC_API_BASE` | Public API URL learners' browsers reach (e.g. `https://api.your-domain` or same host :8082) |
| `DATABASE_URL` / `SANDBOX_DATABASE_URL` | Production Postgres (Compose uses `postgres` hostname inside network) |

Leave `GOOGLE_*` and `GOOGLE_DRIVE_*` empty until those phases unlock.

### 2. Build and start

```powershell
powershell -File scripts/docker-up.ps1
```

On Linux host: cross-compile `apps/api/bin/server-linux` (see `monorepo-dev.md`) then `docker compose up -d`.

### 3. Automated gates (fail-closed)

```powershell
powershell -File scripts/release-smoke.ps1 -SkipDocker
```

Includes: health, SQL Fundamentals E2E, catalog architecture, **javascript-basics (9 lessons)**, Go tests, frontend test gates.

### 4. Manual UI (light)

At production URLs (see `release-hardening.md`):

1. Register / login → home **Continue** works
2. SQL lesson → sandbox pass + hints
3. JavaScript Basics lesson → reads without sandbox; mark complete works when logged in
4. Theme + locale switch

### 5. Post-deploy

- Promote admin if needed (`BOOTSTRAP_ADMIN_EMAIL` or SQL `UPDATE users SET role = 'admin'`)
- Monitor `/health` only returns `{status}` (no secrets)
- After curriculum edits on server: restart `api` container to re-sync

## Ordered roadmap after deploy

| # | Slice | Status |
|---|--------|--------|
| 23 | Production deploy readiness (this doc + gates) | active |
| 24 | JS code sandbox | `/opsx-research` + OpenSpec first |
| — | Guest static FE | deferred — `future-guest-static-learning.md` |
| — | Google / Drive | deferred — `auth-email-local-phase.md` |

## Do

- Run `release-smoke.ps1` on the deploy commit before go-live.
- Use HTTPS `WEB_BASE_URL` in production.
- Keep curriculum source in `docs/curriculum/`; API syncs on startup.

## Don't

- Ship with `JWT_SECRET=change-me-in-production-use-long-random-string` when `APP_ENV=production`.
- Point browser `NUXT_PUBLIC_API_BASE` at Docker internal hostname `api:8080`.
- Skip E2E because UI “looks fine”.

## Related

- [`release-hardening.md`](./release-hardening.md)
- [`environment.md`](./environment.md)
- [`monorepo-dev.md`](./monorepo-dev.md)
- [`curriculum-track-completion.md`](./curriculum-track-completion.md)
- Scripts: `scripts/release-smoke.ps1`, `scripts/check-javascript-basics.ps1`
