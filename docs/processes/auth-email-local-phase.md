# Auth phase: email + local curriculum

## Purpose

Current product phase uses email/password accounts in Postgres and local Markdown under `docs/curriculum/`. Google login and Drive sync stay coded but disabled until explicitly enabled via env.

## When to use

- Onboarding learners without Google Cloud setup
- Day-to-day polish and verification
- Before turning on OAuth/Drive

## Steps

1. Leave `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_DRIVE_*` empty.
2. Register via `/register` (email + password ≥ 8 chars). After success, land on **home** (or `?redirect=` lesson path if present).
3. Optional admin: set `BOOTSTRAP_ADMIN_EMAIL` then register that email, or SQL promote.
4. Curriculum: edit `docs/curriculum/...` → Admin **Sync from local files** (or API restart sync).
5. UI hides Google buttons when `GET /api/v1/auth/providers` returns `google: false`.
6. Guests may read lessons; login is required to run sandbox, save notes, or mark progress (soft prompts on the lesson page).

## Do

- Treat Postgres as source of truth for users, progress, notes.
- Treat `docs/curriculum` as source of truth for lessons in this phase.
- Re-run `/opsx-research` before enabling Google/Drive.
- Follow [`onboarding.md`](./onboarding.md) for redirect, i18n errors, and guest soft gates.

## Don't

- Block learning UX on Google verification or Drive quotas in this phase.
- Show Google CTA when OAuth is not configured.
- Block reading published lessons behind auth.

## Related

- [`onboarding.md`](./onboarding.md)
- [`product-baseline.md`](./product-baseline.md)
- [`environment.md`](./environment.md)
- [`google-drive-curriculum.md`](./google-drive-curriculum.md) (later)
