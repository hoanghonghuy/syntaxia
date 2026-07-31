# Layout shell simplify

## Purpose

Keep mobile app chrome to **four footer tabs**, slim the home page, and fix lesson/progress/notes rhythm so the notebook theme does not fight the IA.

## When to use

- Changing `default.vue` / `learn.vue` footers or header hub links
- Changing home featured tracks vs `/tracks` catalog
- Reordering lesson reader sections (prose → sandbox → complete/pager → notes)
- Adjusting progress/notes guest empty states

## Steps

1. Keep footers aligned in both layouts:
   - **Tracks** · **Search** (hubs) or **Lessons** (in-track drawer) · **Progress** · **Profile** (`nav.profile`)
   - Profile label is stable for guest and signed-in users; destination stays guest-aware (`/login` vs `/account`)
   - Home is the brand link only — do not put Home or Notes in the footer
   - Do not put a search field in the header — use footer Search (or Lessons→…) and `/search`; `/` shortcut remains
   - Do not label the footer tab “Log in” (login stays in the header)
2. Prefer one lesson-nav control on mobile: header hamburger **and** footer Lessons are OK (Mintlify); do **not** add a third ghost “Open lessons” on the track hub
3. Home: one primary CTA + `featuredTracks()` (≤3); full catalog stays on `/tracks`
4. Lesson order: title → mobile objectives (when TOC hidden) → prose → sandbox → complete → pager → notes/auth soft-prompt
5. Progress: overall + per-track bars + open track; lesson lists live in track hub / sidebar
6. Ship en+vi keys together (`home.featured`, `notes.guestBrowse`, …)
7. Run:

```bash
cd apps/web
npm run test:catalog-browse
npm run test:shell-ux
npm run test:i18n
```

## Do / Don’t

- **Do** keep the footer Profile tab guest-aware (`/account` if signed in, else `/login`) but always label it Profile / Hồ sơ
- **Do** keep Notes reachable from the lesson page (and `/notes` URL)
- **Don’t** restore a 5–6 tab footer or dump the full catalog on home
- **Don’t** duplicate track-hub open-lessons with footer + hamburger + ghost button
- **Don’t** put “Log in” on the footer when the header already exposes login

## Related

- OpenSpec: `openspec/changes/layout-shell-simplify/`
- [learn-navigation-ia.md](./learn-navigation-ia.md)
- [homepage-path-first.md](./homepage-path-first.md)
- [progress-hub.md](./progress-hub.md)
- [app-notebook-theme.md](./app-notebook-theme.md)
