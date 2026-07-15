# Responsive learn layout

## Purpose

How Syntaxia splits the learning shell (track hub + lesson reader) into scroll regions and breakpoints (mobile-first, Mintlify-style).

## When to use

- Changing learn chrome, hamburger, sidebar, footer, or pane scrolling
- After layout changes look “stuck” on old UI: restart web / clear `.nuxt` (Windows Docker volume HMR can lag)

## Layout model

| Region | Scrolls? | Notes |
|--------|----------|-------|
| `.learn-header` | No | Hamburger (mobile/tablet) + brand + locale/auth |
| `.learn-sidebar` | Yes (own pane) | **Current track lessons only** (+ back to `/tracks`) — never all tracks or hub menus |
| `.lesson-center` / `.learn-scroll` | Yes (own pane) | Article / hub body — never scrolls the sidebar |
| `.lesson-toc` | Yes | Desktop lesson only |
| `.learn-footer` | No | Mobile + tablet only (`< 1100px`): Tracks · Lessons · Progress · Account |

Pages under `/tracks/**` use `layout: 'learn'`.

## Breakpoints

| Width | Behavior |
|-------|----------|
| `< 1100px` | Mobile/tablet: header hamburger + drawer sidebar + bottom footer; hub hides full lesson list (use drawer) |
| `≥ 1100px` | Desktop: fixed sidebar + main (+ TOC on lesson); no hamburger, no footer |

## Independent scroll (required)

- Sidebar and lesson are **separate scrollports** (`overflow-y: auto` + `overscroll-behavior: contain` + `touch-action: pan-y`).
- Parent `.learn-body` / `.learn-main` / `.lesson-reader` use `overflow: hidden` and `min-height: 0` so only the panes scroll.
- TOC anchors scroll inside `.lesson-center`, not `window`.

## Hamburger + footer

- Hamburger lives in the **learn header** (not a giant in-page menu).
- Footer: Tracks · Lessons (toggles drawer) · Progress · Account.
- Drawer sits between header and footer (`top: header`, `bottom: footer`).
- Track switching and category browse live on `/tracks` (paginated) — see [`learn-navigation-ia.md`](./learn-navigation-ia.md).

## Do

- Keep drawer mode through tablet (`isNarrow` = `< 1100px`)
- Reuse `LearnSidebar` for track hub and lesson pages (lesson list for the **active** track only)
- Ship `nav.home`, `nav.track`, `nav.footerNav`, `nav.openMenu` / `closeMenu`, `nav.backToTracks` en+vi

## Don't

- Fix the sidebar open full-width on tablet (that becomes a “giant menu”)
- Duplicate a full lesson list on the mobile/tablet track hub
- Let sidebar scroll move the lesson content (or vice versa)
- Put an all-tracks switcher or Progress/Notes/Account list inside the learn sidebar

## Related

- [`learn-navigation-ia.md`](./learn-navigation-ia.md)
- [`lesson-reader.md`](./lesson-reader.md)
- `apps/web/app/layouts/learn.vue`
- `apps/web/app/composables/useLearnNav.ts`
- `apps/web/app/assets/css/layout.css`
