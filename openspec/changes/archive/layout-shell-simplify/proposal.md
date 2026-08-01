# Layout shell simplify — friendlier IA for notebook learning

Simplify Syntaxia mobile/desktop shell and page IA for a friendlier notebook learning UX. Unify footer to 4 tabs with guest-aware Account/Login; slim home to hero + primary CTA + few featured tracks (full catalog stays on `/tracks`); reduce chrome competition (one mobile lesson-nav entry); restructure lesson page vertical rhythm (read → practice → pager/complete → notes); make progress/notes summary hubs. Keep Mintlify desktop sidebar+TOC. No backend changes.

## Context

- Change ID: `layout-shell-simplify`
- Flow: `sdd`
- Prior: `app-notebook-theme` (visual skin) — layout structure still unfriendly
- Audit: footer 5–6 tabs, guest auth walls, chrome stack, home≈tracks, lesson notes+complete+auth blob

## Motivation

Notebook CSS made surfaces warmer, but structure still feels like a crowded LMS: too many footer destinations, guest dead-ends, competing open-menu affordances, and lesson pages that stack practice + notes + progress + auth. Learners need a calmer “one job per section” path.

## Scope

- **In:** `default.vue` / `learn.vue` footers + guest-aware account tab; home slim-down; track hub mobile nav de-dupe; lesson page section order/DOM; progress/notes hub density; touch/spacing for footer
- **Out:** Backend APIs, curriculum content, notebook color tokens (already done), full single-shell merge (optional later)
- **Non-goal:** Removing Mintlify desktop sidebar + TOC
