# Account profile and password

## Purpose

How signed-in learners update display name and email password on `/account`.

## When to use

- Changing account forms or auth profile APIs
- Mapping new auth error messages to i18n
- After API auth changes: rebuild linux binary + recreate API; clear web `.nuxt` / restart web

## API

| Method | Path | Body | Result |
|--------|------|------|--------|
| `PATCH` | `/api/v1/auth/me` | `{ displayName }` | Updated user JSON |
| `POST` | `/api/v1/auth/password` | `{ currentPassword, newPassword }` | `204` |

Rules (Go `validate` + `AuthService`):

- Display name required, trim, max 80 runes
- New password ≥ 8 runes; must differ from current
- Wrong current password → `current password is incorrect`
- Google-only accounts (empty hash) → `use Google login for this account`

## Web

- Page: `apps/web/app/pages/account.vue` (`layout: 'learn'`)
- Store: `updateProfile` / `changePassword` on `useAuthStore`
- Errors: `authErrorI18nKey` → `auth.errors.*`

## Tests

```bash
cd apps/api
# clear cross-compile env if set
$env:GOOS=''; $env:GOARCH=''
go test ./pkg/validate/ -count=1

cd apps/web
npm run test:auth
npm run test:i18n
```

## Deploy local (required after change)

```powershell
cd apps/api
$env:GOOS='linux'; $env:GOARCH='amd64'; $env:CGO_ENABLED='0'
go build -o bin/server-linux ./cmd/server/
cd ../..
docker compose up -d --pull never --force-recreate --no-deps api
docker compose exec web sh -c "rm -rf /app/.nuxt /app/node_modules/.cache"
docker compose restart web
```

Then hard-refresh the browser (`Ctrl+Shift+R`).

## Do

- Ship en+vi account + auth error keys together
- Keep email read-only on the account page (change email deferred)
- Prefer clear success/error text over silent forms

## Don't

- Allow password change without verifying current password
- Leave Windows `GOOS=linux` set when running local `go test`

## Related

- [`onboarding.md`](./onboarding.md)
- [`auth-email-local-phase.md`](./auth-email-local-phase.md)
- [`ui-skeleton-and-shell.md`](./ui-skeleton-and-shell.md)
