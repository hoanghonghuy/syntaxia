# Auth and onboarding polish

## Purpose

How Syntaxia handles first-run, email login/register, and soft auth gates so learners can read publicly while sandbox/progress/notes stay authenticated. Google OAuth stays deferred unless configured.

## When to use

- Changing login/register copy, redirects, or error i18n
- Adjusting guest vs authenticated lesson UX
- Before enabling Google OAuth (still follow `auth-email-local-phase.md`)

## Steps

1. **Providers:** UI calls `GET /api/v1/auth/providers`. Show Google CTA only when `google: true` (env credentials present). Do not enable OAuth in this phase by default.
2. **Post-auth redirect:** After login/register, use `resolvePostAuthRedirect` (`apps/web/app/utils/postAuthRedirect.ts`):
   - Safe relative `?redirect=` wins (e.g. return to the lesson the user was reading).
   - Otherwise go **home** (`/`) where Start / Continue CTAs live.
   - Optional `preferResume` for direct lesson jump — default off.
3. **Errors:** API still returns English messages; map via `authErrorI18nKey` → `auth.errors.*` (vi+en).
4. **Password:** Minimum 8 characters (Go `validate.Password` + register hint `auth.passwordHint`).
5. **Lesson gates:**
   - Lesson body remains **public** (no auth middleware on `GET /lessons/:slug`).
   - Sandbox run, progress, notes require auth (API `authed` group).
   - Guest UX: soft prompt under the lesson + sandbox Run replaced by login CTA; `?redirect=` preserves return path.
6. **Home (logged out):** Primary CTA = Start SQL Fundamentals; secondary = Log in to save progress.
7. **Tests:** `go test ./pkg/validate/` and `npm run test:auth` in `apps/web`.
8. **Account:** Signed-in learners update display name / password on `/account` — see [`account-profile-password.md`](./account-profile-password.md). After API/web auth changes, rebuild API binary + clear web `.nuxt` / restart web.

## Do

- Keep reading public; require auth only for sandbox / progress / notes.
- Ship vi+en auth strings together.
- Prefer home after bare login/register so Continue / Start is obvious.
- Hide Google when providers say `google: false`.

## Don't

- Force login before reading a published lesson.
- Open-redirect via absolute/`//` redirect query values.
- Turn on Google OAuth or Drive without owner request and `/opsx-research`.

## Related

- [`auth-email-local-phase.md`](./auth-email-local-phase.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) (#5)
- [`learning-path-progress.md`](./learning-path-progress.md)
- [`product-quality-lock.md`](./product-quality-lock.md)
