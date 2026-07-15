# Audit remediation checklist (TDD)

## Purpose

Ordered, test-first fixes from the post-MVP security/UX audit (session after sandbox server-side grading). Each item: **Red → Green → Refactor**, then check off here.

## When to use

- Continuing audit remediation work
- Verifying all gates before release
- Onboarding agents to what was fixed and how it is tested

## Checklist

| # | ID | Severity | Item | Tests | Status |
|---|-----|----------|------|-------|--------|
| 1 | B1 | High | Strip `exercise.expected`, `exercise.solution`, `sandboxSeed` from public `GET /lessons/:slug`; authed `GET /lessons/:slug/solution` for reveal | `content/lesson_public_test.go` | ☑ |
| 2 | F1 | High | Reset `SqlSandbox` state on lesson change (`:key` + util) | `scripts/check-sandbox-state.mjs` | ☑ |
| 3 | F2 | High | `loadLesson` sequence guard (no stale response) | `scripts/check-lesson-load.mjs` | ☑ |
| 4 | F3 | High | Note save upsert: PUT when note exists | `scripts/check-note-save.mjs` | ☑ |
| 5 | B3 | Medium | `GET /notes` hub excludes unpublished lesson metadata | `repository/notes_query_test.go` | ☑ |
| 6 | F5 | Medium | Login reads `?error=` from OAuth callback | `scripts/check-auth-redirect.mjs` | ☑ |
| 7 | F6 | Medium | Locale switch reloads progress (home, tracks catalog, track hub) | `scripts/check-locale-reload.mjs` | ☑ |

### Batch 2 (security + polish)

| # | ID | Severity | Item | Tests | Status |
|---|-----|----------|------|-------|--------|
| 8 | B2 | High | Fail fast when `JWT_SECRET` is dev default in production | `config/config_test.go` | ☑ |
| 9 | B4 | Medium | Session/OAuth cookies use `Secure` on HTTPS `WEB_BASE_URL` | `config/config_test.go` | ☑ |
| 10 | B5 | Medium | `UpdateNote` missing → 404 not 500 | `service` (via learning UpdateNote) | ☑ |
| 11 | B6 | Medium | `BOOTSTRAP_ADMIN_EMAIL` applies to Google OAuth | `service/auth_google_test.go` | ☑ |
| 12 | B7 | Medium | Rate-limit `POST /auth/login` and `/register` | `middleware/ratelimit_test.go` | ☑ |
| 13 | B8 | Low | `GET /progress` excludes unpublished lessons | `repository/progress_query_test.go` | ☑ |
| 14 | B9 | Low | Validate note body max length | `validate/validate_test.go` | ☑ |
| 15 | B10 | Low | Public `/health` returns `{status}` only | — | ☑ |
| 16 | B12 | Low | Validate `locale` query on public lesson list/get | `validate` (existing) | ☑ |
| 17 | B15 | Low | Google callback checks userinfo HTTP status + fields | `validate/redirect_test.go` | ☑ |
| 18 | F4 | Medium | Google OAuth preserves safe `?redirect=` | `check-catalog-load.mjs` | ☑ |
| 19 | F7 | Medium | Catalog store exposes load error (not blank silent fail) | `check-catalog-load.mjs` | ☑ |
| 20 | F8 | Medium | Notes hub shows API error + retry | — | ☑ |
| 21 | F9 | Medium | Admin lesson editor loading/error on fetch | — | ☑ |
| 22 | F10 | Low | Sandbox gate waits for `auth.loading` | — | ☑ |

### Batch 3 (hardening + UX polish)

| # | ID | Severity | Item | Tests | Status |
|---|-----|----------|------|-------|--------|
| 23 | B11 | Low | Sandbox SQL prefix allowlist; block `COPY`/`DO`/`CALL` | `sandbox/runner_test.go` | ☑ |
| 24 | F12 | Low | i18n locale switch `aria-label` + account locale display | `check-locale-switch.mjs` | ☑ |
| 25 | F13 | Medium | `hasPassword` on user API; hide password form for Google-only | `auth_user_test.go` | ☑ |
| 26 | F14 | Medium | Progress + Search hubs show catalog load error + retry | — | ☑ |

1. Write failing test(s) for the behavior.
2. Implement minimal fix.
3. Run targeted tests + full gates (see below).
4. Mark ☐ → ☑ in the table above.

## Verification gates

```bash
# API
cd apps/api && go test ./...

# Web (audit remediation + existing)
cd apps/web && npm run test:audit-remediation
cd apps/web && npm run test:i18n && npm run test:auth && npm run test:feedback-nav
```

## Do

- Keep learner grading inputs server-side only (`sql-sandbox.md`).
- Fetch solution only via authed endpoint after local attempt gate (UX), never in public lesson JSON.
- Use pure utils + Node `--test` for FE logic; Go `_test.go` for API transforms.

## Don't

- Re-expose `expected` / `solution` / `sandboxSeed` on public lesson responses.
- `POST` a new note on every Save when a note already exists.
- Ship locale switches without reloading locale-scoped progress.

## Related

- [`sql-sandbox.md`](./sql-sandbox.md)
- [`sandbox-feedback.md`](./sandbox-feedback.md)
- [`onboarding.md`](./onboarding.md)
- [`i18n.md`](./i18n.md)
