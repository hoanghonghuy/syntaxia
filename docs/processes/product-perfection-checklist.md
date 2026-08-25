# Product perfection checklist

Ordered work to reach the quality bar in [`product-quality-lock.md`](./product-quality-lock.md).

## How to execute

1. Do **one row at a time** (one subagent or one focused session).  
2. If the row needs a direction choice → `/opsx-research` first, then update process docs.  
3. Implement with **TDD**; mark **done** only after tests green + smoke check.  
4. Do not start the next row until the current row is done or explicitly blocked.

> The numbered rows below are historical delivery milestones. Current product scope/status lives in [`curriculum-product-completion.md`](./curriculum-product-completion.md); do not infer present lesson counts from old milestone notes.

| # | Item | Status | Depends on | Notes |
|---|------|--------|------------|-------|
| 0 | Quality lock + this checklist | done | — | Owner Q&A 2026-07-11 |
| 1 | **Learning path IA + progress UX** | done | 0 | Category/level on tracks; Continue CTA; track %; next highlight; see `learning-path-progress.md` |
| 2 | **Sandbox feedback loop** | done | 1 | Fail copy, progressive hints, solution reveal after 3 / button, clearer SQL errors (vi+en); see `sandbox-feedback.md` |
| 3 | **Curriculum voice pass (SQL Fundamentals)** | done | 2 | Historical milestone; current SQL product is 42 lessons and is locked separately by `verify-sql-fundamentals.mjs` |
| 4 | **Lesson reader polish** | done | 3 | TOC from headings (`extractToc`), mobile Lessons drawer, prose-lesson typography; see `lesson-reader.md` |
| 5 | **Auth + onboarding polish** | done | 1 | First-run → home Continue; email flows vi+en; soft guest gates; Google still deferred; see `onboarding.md` |
| 6 | **Admin + sync reliability** | done | — | Empty states, local/Drive sync labels, success/error banners + count; see `admin-content-crud.md` |
| 7 | **i18n parity audit** | done | 3–5 | Locale key parity script + lesson pairs; see `i18n.md` |
| 8 | **API/E2E smoke suite** | done | 1–7 | `e2e-all.ps1` (catalog + SQL + languages); see `e2e-smoke.md` |
| 9 | **PostgreSQL track (basic→advanced)** | done | 8 | Historical scaffold milestone; current product is 19 lessons; see `postgresql-track.md` |
| 10 | **Category architecture (SQL + Code)** | done | 9 | `javascript-basics` scaffold; see `catalog-architecture.md` |
| 11 | **First code track (basics)** | done | 10 | Historical JS scaffold milestone; current Basics product is 9 lessons; see `javascript-track.md` |
| 12 | **Hardening + release checklist** | done | 8+ | Release smoke process, html `lang`, env docs; see `release-hardening.md` |
| 13 | **UI skeleton + shell foundation** | done | 12 | Skeletons on load; scaffold `/notes` `/search`; live `/progress` `/account` shells; see `ui-skeleton-and-shell.md` |
| 14 | **Progress hub (real)** | done | 13 | Cross-track %, Continue, guest gate; see `progress-hub.md` |
| 15 | **Notes hub + catalog search** | done | 14 | `GET /notes`, `/notes` list API + catalog title search; see `notes-hub-and-search.md` |
| 16 | **Account profile + password** | done | 15 | `PATCH /auth/me`, `POST /auth/password`, account forms; see `account-profile-password.md` |
| 17 | **Appearance theme system** | done | 16 | system/light/dark + accent presets/hex; see `appearance-theme.md` |
| 18 | **Home + hub UI polish** | done | 17 | Shared hub CSS, SkeletonHub, card/empty/error unify; see `home-hub-ui-polish.md` |
| 19 | **Track hub + account shell** | done | 18 | HubHeader on track hub, account shared CSS, load error + retry; see `home-hub-ui-polish.md` |
| 20 | **Release smoke verification** | done | 19 | `scripts/release-smoke.ps1` green 2026-07-15; see `release-hardening.md` |
| 21 | **JavaScript Basics expansion** | done | 20 | Lessons 3–5 (strings, string-methods, arrays) en+vi; see `javascript-track.md` |
| 22 | **JavaScript Basics completion** | done | 21 | Lessons 6–8 (conditionals, loops, functions) en+vi; see `curriculum-track-completion.md` |
| 23 | **Production deploy readiness** | done | 22 | `check-javascript-basics.ps1` + `production-deploy.md`; release smoke green |
| 24 | **JS code sandbox** | done | 23 | Web Worker + grade API; **9/9** lessons with exercise; see `javascript-basics-w3schools-map.md` |
| 25 | **Progress ↔ sandbox sync** | done | 24 | Auto-complete on grade pass (JS+SQL); lesson checklist on `/progress`; see `progress-sandbox-sync.md` |
| 26 | **HTML + CSS basics tracks** | done | 25 | Category `web`; `html-basics` **12** + `css-basics` **14**; see `html-css-basics-tracks.md` |
| 27 | **HTML / CSS sandbox** | done | 26 | iframe `srcdoc` + `POST /sandbox/htmlcss/grade`; **26/26** exercises; see `html-css-sandbox.md` |
| — | **Audit remediation (26 items)** | done | 12+ | Security/UX TDD batch; see `audit-remediation-checklist.md` |

## Language V3 production-quality arc

The earlier language MVP/v2 work is a foundation, not the completion bar for the language product.

| ID | Item | Status | Depends on | Done means |
|---|---|---|---|---|
| L0 | **FSRS review persistence + concurrency hardening** | done | language review foundation | Durable server-side cards/logs, due scheduling, CAS conflict semantics, reproducible Go CI |
| L1 | **V3 pedagogy + content-quality source of truth** | done | L0 | V3 active in process index; naturalness/visual/audio/accessibility QA contract exists; listen-first behavior regression-locked |
| L2 | **Dedicated language player correctness + feedback loop** | done | L1 | Progressive hints, delayed non-passing solution reveal, structured solutions, keyboard/mobile/screen-reader guards |
| L3 | **Semantic visual asset pipeline** | done | L1–L2 | App-owned semantic visual registry/rendering with safe fallbacks and regression coverage |
| L4 | **True communicative unit model** | done | L1–L2 | Content-owned unit metadata, Can-Do grouping, lesson/checkpoint/review roles and ordered navigation |
| L5 | **Golden units: English / Mandarin / Japanese** | done | L2–L4 | Reference units for all three languages pass interaction, audio, review, mobile and accessibility contracts |
| L6 | **Curriculum migration + full release QA** | done | L5 | Starter language content migrated; parity/content gates, DB-backed E2E, mobile/a11y and FSRS persistence verified |

### L5/L6 release evidence

- PR #3 merged into `develop` as `68802c531e04b86ae2d4bf9a6f95ffd47d6ce465`.
- Final pre-merge head `c493376564baa76d0874b7ac25d78db55e26588a`.
- Language v3 CI #511: API, web/regression and PostgreSQL-backed E2E all green.
- IT Curriculum V2 CI #244: curriculum, API and production web build all green.
- The DB-backed E2E verifies register → lesson inventory → progress → notes → repeated FSRS review and persisted review rows.

## Post-stabilization curriculum completion

The stabilization technical gate is now green:

- PR #4 head `d677c898d49f01fcaa9e79e4c6bcfaf010f3020d` passed Product CI #11 including DB-backed E2E and FSRS persistence;
- PR #4 is Ready for review and remains unmerged pending the explicit merge action.

The active curriculum-quality branch is `feature/curriculum-product-completion`. Its declared products and current evidence are tracked in [`curriculum-product-completion.md`](./curriculum-product-completion.md).

Completed product slices on that branch:

1. Chinese IT specialty — 6 Language V3 workplace lessons / locale;
2. English A1 foundation — 8 units / 30 nodes / locale;
3. Japanese N5 foundation — 9 units / 28 nodes / locale;
4. Mandarin practical Level 1 foundation — pronunciation Unit 0 + 11 communicative units / **41 nodes / locale**;
5. CI hardening — cold Go curriculum smoke, exact runtime inventories, PostgreSQL-backed cross-domain E2E and persisted FSRS rows;
6. learner-frontier compatibility — inserting new earlier language content does not rewind returning learners or fabricate progress.

Product CI #88 is fully green at `8610a2b0435ae502863836d32716adf58ece9c44`.

### Current ordered focus

1. **Keep PR #4 isolated and merge-ready** — stabilization stays free of curriculum expansion.
2. **Keep PR #5 source-of-truth synchronized** — exact counts, maps, quality gates and release evidence must match the current branch head.
3. **Do not widen existing declared products silently.** New DOM/events/fetch/async JavaScript, higher CEFR/HSK/JLPT levels, capstones, or new tracks require their own researched curriculum map/scope.
4. **After PR #4 merges**, revalidate PR #5 against the updated `develop` merge head before marking PR #5 Ready.
5. **Only then choose the next product expansion** as a separate scope/branch.

## Related

- [`branch-release-policy.md`](./branch-release-policy.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`language-review-session.md`](./language-review-session.md)
- [`language-step-audio.md`](./language-step-audio.md)
- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md)
- [`learning-domains.md`](./learning-domains.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`product-quality-lock.md`](./product-quality-lock.md)
- [`release-hardening.md`](./release-hardening.md)
- [`e2e-smoke.md`](./e2e-smoke.md)
