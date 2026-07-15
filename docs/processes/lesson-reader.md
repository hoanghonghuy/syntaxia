# Lesson reader polish

## Purpose

How the Mintlify-style lesson page builds its right-rail TOC, mobile lesson nav, and long-read typography — without duplicating chrome.

## When to use

- Changing lesson page layout (`tracks/[track]/lessons/[slug].vue`)
- Adjusting `prose-lesson` / TOC CSS
- Debugging missing TOC entries (heading ids)
- Adding i18n keys for TOC vs objectives

## Steps

1. **Heading ids (API):** `markdown.SimpleRender` emits `<h2 id="…">` / `<h3 id="…">` via `slugify`. Leading `#` H1 is skipped so the page title owns H1. Verify with `go test ./internal/markdown/`.
2. **TOC util (web):** `extractToc(html)` in `apps/web/app/utils/toc.ts` parses `bodyHtml` for h2/h3 that already have `id`. Run `npm run test:toc` in `apps/web`.
3. **Lesson page:** Right aside primary list = TOC anchors (`#id` + smooth scroll). If `lesson.objectives` exist, show them under a small **Objectives** label below the TOC — do not replace headings with objectives.
4. **Mobile/tablet (`<1100px`):** Header hamburger + bottom footer open the shared sidebar drawer. Sidebar and lesson scroll independently. Clicking a lesson/track link closes the drawer. Prev/next stay in the main column pager only.
5. **Desktop (`≥1100px`):** Fixed sidebar + lesson (+ TOC). No hamburger/footer.
6. **Scroll panes:** See [`responsive-lesson-layout.md`](./responsive-lesson-layout.md).
7. **Typography:** Long-read rules live in `layout.css` under `.prose-lesson`.
8. **Layout:** Track hub and lesson pages use `layout: 'learn'` + `LearnSidebar` — do not reintroduce a lesson-only toolbar/drawer or a giant in-page lesson list on mobile/tablet.

## Do

- Prefer heading TOC from rendered HTML; keep objectives secondary
- Ship `lesson.toc`, `lesson.tocEmpty`, `lesson.objectives`, `nav.lessons` in en + vi together
- Keep Fraunces / Source Sans / emerald tokens; no Inter/Roboto
- Use `scroll-margin-top` on headings so sticky header does not cover anchors

## Don't

- Invent a second sidebar TOC on mobile that duplicates the lesson list
- Add a lesson-only hamburger toolbar (use learn layout header)
- Add sticky bottom prev/next that repeats the in-page pager
- Rewrite curriculum content when only polishing the reader chrome
- Rely on client-side slug generation — ids come from SimpleRender

## Related

- [`product-perfection-checklist.md`](./product-perfection-checklist.md) — row #4
- [`product-quality-lock.md`](./product-quality-lock.md) — Mintlify IA
- [`learning-path-progress.md`](./learning-path-progress.md) — sidebar lesson list
- `apps/api/internal/markdown/render.go`
- `apps/web/app/utils/toc.ts`
- `apps/web/scripts/check-toc.mjs`
