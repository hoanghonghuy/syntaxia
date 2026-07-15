# Syntaxia monorepo

## Quick start (Docker — recommended)

```powershell
powershell -File scripts/docker-up.ps1
```

Opens **http://localhost:3001** (API **:8082**). Reuses local `postgres:16-alpine` + `node:22-alpine` only (`pull_policy: never`).

## Quick start (host processes)

```bash
docker compose up -d postgres --pull never
cp .env.example .env   # Syntaxia API vars if you keep a separate file

# API
cd apps/api && go run ./cmd/server

# Web
cd apps/web && npm install && npm run dev
```

## Layout

- `apps/web` — Nuxt 4 + Pinia + i18n
- `apps/api` — Go Gin + pgx
- `docs/curriculum` — seed lesson Markdown (synced to Drive / local mirror)
- `docs/processes` — agent playbooks

See [AGENTS.md](./AGENTS.md).
