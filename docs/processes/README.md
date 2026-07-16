# Process documentation

English playbooks for how work is done on **Syntaxia**. Agents and humans must keep this folder current.

Canonical rule: see **Process documentation (mandatory)** in [`AGENTS.md`](../AGENTS.md).

## Index

| File | Topic |
|------|--------|
| [research-and-decisions.md](./research-and-decisions.md) | `/opsx-research` gate and how to lock decisions |
| [product-baseline.md](./product-baseline.md) | Locked product/stack/design/curriculum baseline |
| [monorepo-dev.md](./monorepo-dev.md) | Local dev: Docker, API, web, curriculum sync |
| [mvp-completion-checklist.md](./mvp-completion-checklist.md) | Historical MVP (complete) |
| [product-perfection-checklist.md](./product-perfection-checklist.md) | Ordered perfection work (active) |
| [product-quality-lock.md](./product-quality-lock.md) | Owner quality bar + IA locks |
| [learning-path-progress.md](./learning-path-progress.md) | Category/level catalog + Continue/progress |
| [google-drive-curriculum.md](./google-drive-curriculum.md) | Drive vs local curriculum sync |
| [admin-content-crud.md](./admin-content-crud.md) | Admin lesson CRUD UI/API |
| [sql-sandbox.md](./sql-sandbox.md) | Isolated Postgres sandbox runner |
| [sandbox-feedback.md](./sandbox-feedback.md) | Fail copy, hints, solution reveal |
| [curriculum-pedagogy.md](./curriculum-pedagogy.md) | Lesson depth, voice, mistakes/hints/solution |
| [sql-fundamentals-w3schools-map.md](./sql-fundamentals-w3schools-map.md) | W3Schools-density SQL Fundamentals outline |
| [sql-fundamentals-closure.md](./sql-fundamentals-closure.md) | Full path 42 lessons + polish pass (**locked**) |
| [lesson-reader.md](./lesson-reader.md) | TOC from headings, mobile nav, prose typography |
| [responsive-lesson-layout.md](./responsive-lesson-layout.md) | Learn shell: shared sidebar, hamburger, scroll panes |
| [learn-navigation-ia.md](./learn-navigation-ia.md) | Sidebar = current lessons; `/tracks` catalog + pagination |
| [homepage-path-first.md](./homepage-path-first.md) | Home brand/Continue/progress + catalog preview (not full dump) |
| [snackbar-and-breadcrumb.md](./snackbar-and-breadcrumb.md) | Hand-rolled snackbar + WAI-ARIA breadcrumb |
| [ui-skeleton-and-shell.md](./ui-skeleton-and-shell.md) | Loading skeletons + scaffold routes for future features |
| [progress-hub.md](./progress-hub.md) | Cross-track progress page + learningPath helpers |
| [notes-hub-and-search.md](./notes-hub-and-search.md) | Notes list API + catalog title search |
| [account-profile-password.md](./account-profile-password.md) | Account display name + password change |
| [appearance-theme.md](./appearance-theme.md) | Light/dark mode + accent presets/hex picker |
| [home-hub-ui-polish.md](./home-hub-ui-polish.md) | Shared home/tracks/hub layout + card polish |
| [curriculum-track-completion.md](./curriculum-track-completion.md) | Finish one track before starting the next |
| [production-deploy.md](./production-deploy.md) | Production env + release gates |
| [audit-remediation-checklist.md](./audit-remediation-checklist.md) | Ordered TDD fixes from security/UX audit |
| [future-guest-static-learning.md](./future-guest-static-learning.md) | **Deferred** guest FE-only vs member full-stack |
| [environment.md](./environment.md) | Syntaxia `.env` + Compose ports |
| [auth-email-local-phase.md](./auth-email-local-phase.md) | Email + local curriculum phase (Google deferred) |
| [onboarding.md](./onboarding.md) | Auth redirect, guest soft gates, login/register polish |
| [i18n.md](./i18n.md) | en/vi locale + lesson pair parity gate |
| [e2e-smoke.md](./e2e-smoke.md) | SQL Fundamentals API E2E smoke gate |
| [release-hardening.md](./release-hardening.md) | Ordered release smoke + light a11y/env gate |
| [postgresql-track.md](./postgresql-track.md) | PostgreSQL track levels + scaffold lessons |
| [javascript-track.md](./javascript-track.md) | JS Basics (MDN map) + code sandbox (row #24) |
| [javascript-basics-w3schools-map.md](./javascript-basics-w3schools-map.md) | JS Basics: one exercise per lesson (W3Schools map) |
| [javascript-sandbox.md](./javascript-sandbox.md) | JS Web Worker runner + server-side grade |
| [catalog-architecture.md](./catalog-architecture.md) | Category → Level → Track → Lessons; add a track |

Add a row here whenever you create a new process file.

## Template for new process files

```markdown
# <Title>

## Purpose
One short paragraph.

## When to use
- Bullet triggers

## Steps
1. …
2. …

## Do
- …

## Don't
- …

## Related
- `docs/processes/…`
- OpenSpec / skills / paths
```

## Naming

- `docs/processes/<kebab-case-topic>.md`
- One primary workflow per file; link related files instead of duplicating.
