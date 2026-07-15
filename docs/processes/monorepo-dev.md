# Monorepo development

## Purpose

How to run Syntaxia locally: Postgres, API, web, and curriculum sync.

## When to use

- First-time setup
- Day-to-day local development
- After pulling curriculum changes under `docs/curriculum/`

## Preferred: full stack via Docker Compose

Uses **only images already on the machine** (`postgres:16-alpine`, `node:22-alpine`) with `pull_policy: never` — no new base image pulls.

1. From repo root: `powershell -File scripts/docker-up.ps1`
   - Cross-compiles `apps/api/bin/server-linux` (linux/amd64)
   - `docker compose up -d --pull never`
2. Open **http://localhost:3001** (host port **3001** — avoids clash with other apps on 3000)
3. API: **http://localhost:8082/health** (host **8082** — avoids clash when 8080 is busy)
4. Promote admin if needed:
   ```bash
   docker compose exec postgres psql -U syntaxia -d syntaxia -c "UPDATE users SET role = 'admin' WHERE email = 'you@example.com';"
   ```

Manual equivalent:

```powershell
cd apps/api
$env:CGO_ENABLED=0; $env:GOOS="linux"; $env:GOARCH="amd64"
go build -o bin/server-linux ./cmd/server/
cd ../..
docker compose up -d --pull never
```

Rebuild API after Go changes: re-run the `go build` line (or `docker-up.ps1`), then `docker compose restart api`.

## Alternative: run API/web on the host

1. `docker compose up -d postgres --pull never`
2. API: `cd apps/api && go run ./cmd/server`
3. Web: `cd apps/web && npm install && npm run dev`
4. Open `http://localhost:3000` (or whatever Nuxt prints)

## SQL Fundamentals E2E smoke

With API healthy on **8082**:

```powershell
powershell -File scripts/e2e-sql-fundamentals.ps1
```

Exit **0** = gate green (register → intro → sandbox pass → progress → next). Details: [`e2e-smoke.md`](./e2e-smoke.md).

Full release ordered smoke (E2E + catalog + i18n/toc + Go tests + manual UI): [`release-hardening.md`](./release-hardening.md).

One command for automated gates:

```powershell
powershell -File scripts/release-smoke.ps1
```

There is no root `package.json` npm script for this gate yet — run the PowerShell file from the repo root (Windows). Optional: wrap later as `npm run e2e:sql` if a monorepo root package is added.

## Do

- Prefer `docker compose … --pull never` so Compose does not fetch newer tags.
- Keep lesson Markdown under `docs/curriculum/<track>/<locale>/<slug>.md`.
- Document workflow changes under `docs/processes/`.
- Re-run `scripts/e2e-sql-fundamentals.ps1` after auth/sandbox/curriculum/progress changes.

## Don't

- Add new base images to Compose without checking `docker images` first.
- Commit `.env` secrets or `apps/api/bin/`.

## Related

- [`product-baseline.md`](./product-baseline.md)
- [`sql-sandbox.md`](./sql-sandbox.md)
- [`e2e-smoke.md`](./e2e-smoke.md)
- [`README.md`](../../README.md)
