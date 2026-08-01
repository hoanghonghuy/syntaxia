# Design — Layout shell simplify

## Approach

IA-first shell simplification. Keep Mintlify desktop (sidebar + TOC). Fix mobile chrome and page rhythms.

### 1. Unified mobile footer (4 tabs)

Both `default.vue` and `learn.vue`:

| Tab | Destination | Notes |
|-----|-------------|-------|
| Tracks | `/tracks` | Primary learn entry |
| Search | `/search` | Always available |
| Progress | `/progress` | Or Continue when authenticated + resume exists |
| Account | `/account` if authed, else `/login` | Guest-aware |

- Drop Home + Notes from footer (Home via brand; Notes from lesson / More later).
- In track context: replace Search with **Lessons** (opens sidebar) — only one lesson-nav control (footer Lessons **or** hamburger, not both + ghost button). Prefer: keep hamburger in header **or** footer Lessons, remove duplicate `open-lessons-btn` on track hub.

### 2. Home slim

`pages/index.vue`:

- Hero: brand + one headline + one supporting line + **one** primary CTA (Continue / Start).
- Optional secondary: Login (guest) or View tracks.
- Featured: max 2–3 track rows (not full multi-category card dump).
- Full catalog remains `/tracks`.

### 3. Lesson vertical rhythm

`tracks/[track]/lessons/[slug].vue` order:

1. Title / breadcrumb (minimal)
2. Prose (`.prose-lesson`)
3. Sandbox (practice)
4. Pager + complete / incomplete (navigation & progress)
5. Notes (authed) or compact auth soft-prompt (guest) — not replacing the whole zone with a large wall

Mobile: surface objectives as a short chip/list under title if TOC hidden.

### 4. Progress / Notes hubs

- Progress: overall summary + per-track bars + link into track hub; avoid dumping every lesson in one mega-card when list lives in sidebar/hub.
- Notes: list + empty state; guest gets short CTA + link to tracks, not only auth wall.

### 5. Spacing / touch

- Footer items min ~44px height; slightly larger type.
- Hub page gap ~1.25–1.5rem.
- List rows preferred over stacked pastel cards for dense lists.

## Risks

- **i18n:** footer label changes need en+vi keys together.
- **Regression:** shell UX tests (`test:shell-ux`) assert footer/active patterns — update tests with behavior.
- **Users expecting Notes in footer:** discoverability via lesson notes + account/hub; document in process.

## Change

- ID: `layout-shell-simplify`
- Files: `layouts/default.vue`, `layouts/learn.vue`, `pages/index.vue`, lesson slug page, progress/notes pages, `layout.css`, i18n, `scripts/check-shell-ux.mjs`, `docs/processes/`
