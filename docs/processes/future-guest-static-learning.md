# Future: guest static learning (deferred)

## Purpose

Record a **future** product direction discussed 2026-07-15: two learning modes in one app — guests learn with minimal infrastructure; signed-in learners use the full Syntaxia stack.

**Not in scope for current work.** Continue perfecting the existing full-stack product until the owner explicitly prioritizes this change.

## When to use

- Planning a major architecture shift (static guest path + API member path)
- Evaluating deploy options (CDN/static guest site vs full Compose stack)
- Before `/opsx-research` on curriculum bundling, offline guest UX, or guest sandbox

## Locked intent (owner, 2026-07-15)

| Mode | Infrastructure | Experience |
|------|----------------|------------|
| **Guest (not signed in)** | Primarily **FE** — curriculum shipped with the web app | Read lessons, browse tracks; no server required for core reading flow |
| **Signed in** | **FE + API + Postgres** (current architecture) | Sandbox SQL (real Postgres grading), progress, notes, account, admin/Drive sync |

Progressive enhancement: try/learn immediately as guest; sign in when the learner wants persistence and exercises.

## Open decisions (not locked)

Resolve via `/opsx-research` before implementation:

1. **Guest sandbox** — recommended default for true FE-only guest: **read-only lessons, no sandbox**; sandbox unlocks after login. Alternatives: client-side SQL demo (sql.js) with different grading semantics, or public API sandbox (still needs BE).
2. **Curriculum source of truth** — single tree `docs/curriculum/`; guest bundle at Nuxt build time; member path continues API sync into Postgres (avoid content drift).
3. **Guest → member transition** — whether to merge any local-only guest state after login (likely none if guest has no progress API).

## Current state (today)

- Guests still **require API + DB** to load tracks/lessons (Postgres cache).
- UX already **soft-gates** sandbox, notes, and progress behind login (`onboarding.md`).
- This doc describes a **deeper** split: guest path should not depend on API for reading.

## Steps (when prioritized)

1. Run `/opsx-research` — guest sandbox choice, Nuxt content/build pipeline, SEO/static hosting.
2. `/opsx-propose` change folder with delta specs (catalog loader abstraction: `static` vs `api`).
3. Implement with TDD; add smoke for guest-offline reading + member full path.
4. Update [`monorepo-dev.md`](./monorepo-dev.md) and [`environment.md`](./environment.md) for split deploy.

## Do

- Keep `docs/curriculum/` as the single authoring tree when this ships.
- Preserve server-side sandbox grading for signed-in learners (`sql-sandbox.md`).
- Treat this as a deliberate phase — not a side refactor during current polish.

## Don't

- Start guest-static work while current full-stack perfection and audit gates are the active focus.
- Duplicate curriculum in ad-hoc JSON without a build/sync story.
- Weaken authenticated sandbox security to simplify guest mode.

## Related

- [`product-perfection-checklist.md`](./product-perfection-checklist.md) — active work stays full-stack
- [`onboarding.md`](./onboarding.md) — current guest gates
- [`monorepo-dev.md`](./monorepo-dev.md) — today's required stack
- [`google-drive-curriculum.md`](./google-drive-curriculum.md) — member/admin curriculum sync
- [`audit-remediation-checklist.md`](./audit-remediation-checklist.md) — security/UX fixes (complete)
