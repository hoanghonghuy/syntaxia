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
| 8 | **API/E2E smoke suite** | done | 1–7 | `e2e-all.ps1` (catalog + SQL + languages); see `e2e-smoke.md` |
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
| 20 | **Release smoke verification** | done | 19 | `scripts/release-smoke.ps1` green 2026-07-15; see `release-hardening.md` |
| 21 | **JavaScript Basics expansion** | done | 20 | Lessons 3–5 (strings, string-methods, arrays) en+vi; see `javascript-track.md` |
| 22 | **JavaScript Basics completion** | done | 21 | Lessons 6–8 (conditionals, loops, functions) en+vi; see `curriculum-track-completion.md` |
| 23 | **Production deploy readiness** | done | 22 | `check-javascript-basics.ps1` + `production-deploy.md`; release smoke green |
| 24 | **JS code sandbox** | done | 23 | Web Worker + grade API; **9/9** lessons with exercise (W3Schools map); see `javascript-basics-w3schools-map.md` |
| 25 | **Progress ↔ sandbox sync** | done | 24 | Auto-complete on grade pass (JS+SQL); lesson checklist on `/progress`; see `progress-sandbox-sync.md` |
| 26 | **HTML + CSS basics tracks** | done | 25 | Category `web`; `html-basics` **12** + `css-basics` **14** Phase 1 — see `html-css-basics-tracks.md` |
| 27 | **HTML / CSS sandbox** | done | 26 | iframe `srcdoc` + `POST /sandbox/htmlcss/grade`; **26/26** exercises — see `html-css-sandbox.md` |
| — | **Audit remediation (26 items)** | done | 12+ | Security/UX TDD batch; see `audit-remediation-checklist.md` |

## Current focus

**Checklist rows 0–27 complete** (2026-07-16). Guest static FE and Google/Drive remain deferred.

**Next platform arc:** multi-domain — Phase 0–3 **done** (domain IA + `chinese-hsk` Band 1 MVP archived). See [`multi-domain-roadmap.md`](./multi-domain-roadmap.md).

**Current focus:** Language path v2 + hub + Listen + **Review** done. Next: FSRS or Phase 5 domain. OpenSpec skills only.

## Related

- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md)
- [`learning-domains.md`](./learning-domains.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`product-quality-lock.md`](./product-quality-lock.md)  
- [`mvp-completion-checklist.md`](./mvp-completion-checklist.md) (historical MVP — complete)  
- [`release-hardening.md`](./release-hardening.md)  
- [`e2e-smoke.md`](./e2e-smoke.md)  
- [`postgresql-track.md`](./postgresql-track.md)  
- [`javascript-track.md`](./javascript-track.md)
- [`javascript-sandbox.md`](./javascript-sandbox.md)  
- [`catalog-architecture.md`](./catalog-architecture.md)  
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)  
- [`lesson-reader.md`](./lesson-reader.md)  
- [`ui-skeleton-and-shell.md`](./ui-skeleton-and-shell.md)  
- [`progress-hub.md`](./progress-hub.md)  
- [`onboarding.md`](./onboarding.md)  
- [`i18n.md`](./i18n.md)
- [`future-guest-static-learning.md`](./future-guest-static-learning.md) (deferred)
