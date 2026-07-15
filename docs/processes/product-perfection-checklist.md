# Product perfection checklist

Ordered work to reach the quality bar in [`product-quality-lock.md`](./product-quality-lock.md).

## How to execute

1. Do **one row at a time** (one subagent or one focused session).  
2. If the row needs a direction choice → `/opsx-research` first, then update process docs.  
3. Implement with **TDD**; mark **done** only after tests green + smoke check.  
4. Do not start the next row until the current row is done or explicitly blocked.

| # | Item | Status | Depends on | Notes |
|---|------|--------|------------|-------|
| 0 | Quality lock + this checklist | done | — | Owner Q&A 2026-07-11 |
| 1 | **Learning path IA + progress UX** | done | 0 | Category/level on tracks; Continue CTA; track %; next highlight; see `learning-path-progress.md` |
| 2 | **Sandbox feedback loop** | done | 1 | Fail copy, progressive hints, solution reveal after 3 / button, clearer SQL errors (vi+en); see `sandbox-feedback.md` |
| 3 | **Curriculum voice pass (SQL Fundamentals)** | done | 2 | All 10 lessons en+vi depth B (mistakes, 3 hints, solution); see `curriculum-pedagogy.md` |
| 4 | **Lesson reader polish** | done | 3 | TOC from headings (`extractToc`), mobile Lessons drawer, prose-lesson typography; see `lesson-reader.md` |
| 5 | **Auth + onboarding polish** | done | 1 | First-run → home Continue; email flows vi+en; soft guest gates; Google still deferred; see `onboarding.md` |
| 6 | **Admin + sync reliability** | done | — | Empty states, local/Drive sync labels, success/error banners + count; see `admin-content-crud.md` |
| 7 | **i18n parity audit** | done | 3–5 | Locale key parity script + lesson pairs; see `i18n.md` |
| 8 | **SQL Fundamentals E2E gate** | done | 1–7 | API smoke `scripts/e2e-sql-fundamentals.ps1`; see `e2e-smoke.md` |
| 9 | **PostgreSQL track (basic→advanced)** | done | 8 | Scaffold: process outline + 3 basic lessons en+vi; see `postgresql-track.md` |
| 10 | **Category architecture (SQL + Code)** | done | 9 | `javascript-basics` scaffold; see `catalog-architecture.md` |
| 11 | **First code track (basics)** | done | 10 | `javascript-basics` 3 lessons en+vi; sandbox deferred — see `javascript-track.md` |
| 12 | **Hardening + release checklist** | done | 8+ | Release smoke process, html `lang`, env docs; see `release-hardening.md` |
| 13 | **UI skeleton + shell foundation** | done | 12 | Skeletons on load; scaffold `/notes` `/search`; live `/progress` `/account` shells; see `ui-skeleton-and-shell.md` |
| 14 | **Progress hub (real)** | done | 13 | Cross-track %, Continue, guest gate; see `progress-hub.md` |
| 15 | **Notes hub + catalog search** | done | 14 | `GET /notes`, `/notes` list, `/search` title filter, HubHeader polish; see `notes-hub-and-search.md` |
| 16 | **Account profile + password** | done | 15 | `PATCH /auth/me`, `POST /auth/password`, account forms; see `account-profile-password.md` |
| 17 | **Appearance theme system** | done | 16 | system/light/dark + accent presets/hex; see `appearance-theme.md` |
| 18 | **Home + hub UI polish** | done | 17 | Shared hub CSS, SkeletonHub, card/empty/error unify; see `home-hub-ui-polish.md` |
| 19 | **Track hub + account shell** | done | 18 | HubHeader on track hub, account shared CSS, load error + retry; see `home-hub-ui-polish.md` |
| — | **Audit remediation (26 items)** | done | 12+ | Security/UX TDD batch; see `audit-remediation-checklist.md` |

## Current focus

**Full-stack perfection.** Rows **0–19** and audit remediation are done. Google/Drive and **guest static learning** remain deferred — see [`future-guest-static-learning.md`](./future-guest-static-learning.md). Next candidate: **release smoke** (`release-hardening.md`) or curriculum expansion per track docs.

## Related

- [`product-quality-lock.md`](./product-quality-lock.md)  
- [`mvp-completion-checklist.md`](./mvp-completion-checklist.md) (historical MVP — complete)  
- [`release-hardening.md`](./release-hardening.md)  
- [`e2e-smoke.md`](./e2e-smoke.md)  
- [`postgresql-track.md`](./postgresql-track.md)  
- [`javascript-track.md`](./javascript-track.md)  
- [`catalog-architecture.md`](./catalog-architecture.md)  
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)  
- [`lesson-reader.md`](./lesson-reader.md)  
- [`ui-skeleton-and-shell.md`](./ui-skeleton-and-shell.md)  
- [`progress-hub.md`](./progress-hub.md)  
- [`onboarding.md`](./onboarding.md)  
- [`i18n.md`](./i18n.md)
- [`future-guest-static-learning.md`](./future-guest-static-learning.md) (deferred)
