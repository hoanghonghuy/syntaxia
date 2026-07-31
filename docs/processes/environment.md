# Environment variables (Syntaxia)

## Purpose

Document required and optional env vars for Docker Compose and host runs.

## When to use

- First setup
- Changing ports, Google OAuth, or Drive credentials
- Debugging “wrong API URL” from the browser
- Before release smoke ([`release-hardening.md`](./release-hardening.md))

## Steps

1. Keep the Synapse block in `.env` if present.
2. Ensure the **Syntaxia** block exists (see `.env.example`).
3. Defaults for this machine (verified 2026-07-11):
   - Web: `http://localhost:3001` (`SYNTAXIA_WEB_PORT` → container 3000)
   - API: `http://localhost:8082` (`SYNTAXIA_API_PORT` → container 8080; `NUXT_PUBLIC_API_BASE`)
   - Postgres: `localhost:5432` (`DATABASE_URL`, `SANDBOX_DATABASE_URL` use `syntaxia` / `syntaxia_sandbox` roles)
4. Optional `BOOTSTRAP_ADMIN_EMAIL` — registering or Google-signing in with that email creates an `admin` user.
5. Production: set `APP_ENV=production` and a strong `JWT_SECRET` (API refuses the dev default).
6. Leave `GOOGLE_*` / `GOOGLE_DRIVE_*` empty for local curriculum; fill when ready (deferred).
7. Restart: `powershell -File scripts/docker-up.ps1` (or `docker compose up -d --pull never` after rebuilding the API binary).
8. Cloud deploy (Vercel + Render + Neon): see [`production-deploy.md`](./production-deploy.md) and [`infra/deploy.env.example`](../../infra/deploy.env.example). API honors PaaS `PORT` (falls back to `API_PORT`).

## Do

- Put secrets only in `.env` (gitignored).
- Keep Compose DB URLs pointing at service hostname `postgres` inside the network (compose overrides localhost from `.env`).
- Keep browser `NUXT_PUBLIC_API_BASE` on the **host** port (`http://localhost:8082`).
- Use `WEB_BASE_URL=https://…` in production so session cookies get `Secure`.
- On Neon: pooler for `DATABASE_URL`, **direct** host for `SANDBOX_DATABASE_URL`.

## Don't

- Point the browser `NUXT_PUBLIC_API_BASE` at `http://api:8080` (browser cannot resolve Docker DNS).
- Commit filled Google credentials.
- Point SQL sandbox at a Neon transaction pooler.

## Related

- [`monorepo-dev.md`](./monorepo-dev.md)
- [`release-hardening.md`](./release-hardening.md)
- `.env.example`
- `docker-compose.yml`
