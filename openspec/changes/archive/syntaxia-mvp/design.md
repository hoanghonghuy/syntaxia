# Design: Syntaxia MVP

## Architecture

```
apps/web (Nuxt 4) ──HTTP──► apps/api (Gin)
                                ├── handler → service → repository
                                ├── sandbox runner (pgx)
                                └── drive client (Google / local dev)
                                └── Postgres (pgxpool)
```

## Layers (Go)

| Package | Responsibility |
|---------|----------------|
| `cmd/server` | Bootstrap, DI wiring |
| `internal/handler` | HTTP, binding, response |
| `internal/service` | Business logic |
| `internal/repository` | SQL via pgx |
| `internal/middleware` | request-id, recover, auth, CORS |
| `internal/sandbox` | Isolated SQL execution |
| `internal/drive` | Drive sync + local fallback |
| `pkg/*` | logger, errors, validate, constants |

## Frontend domains

`auth`, `catalog`, `lesson`, `sandbox`, `admin` — Pinia stores per domain.

## Security

- Sandbox: restricted DB role, `statement_timeout`, single-statement, TEMP + ROLLBACK
- Auth: httpOnly JWT cookie, bcrypt passwords
- Drive: `drive.file` scope, encrypted refresh tokens server-side

## Design system

Mintlify IA (nav / lesson / TOC). CSS custom properties. Fonts: Fraunces (display) + Source Sans 3 (body). Emerald accent on light canvas.
