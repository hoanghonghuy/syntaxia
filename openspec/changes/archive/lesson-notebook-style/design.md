# Design — Lesson notebook style — digital bullet journal theme for .prose-lesson

## Approach

CSS-only theme applied to `.prose-lesson` via custom properties and style overrides. No Vue components, no backend changes, no HTML structure changes.

### 1. Design tokens (new)

Add to `tokens.css`:

```css
--color-pastel-blue: #d1e8ff;
--color-pastel-yellow: #fff4d1;
--color-pastel-pink: #ffd1e8;
--color-pastel-green: #d1ffd7;
--color-pastel-purple: #e8d1ff;
--font-hand: 'Playpen Sans', 'Comic Neue', cursive;
--radius-pill: 999px;
--radius-card: 16px;
```

Dark mode: desaturate pastels slightly, keep readable contrast.

### 2. Grid paper background

```css
.prose-lesson {
  background-image:
    linear-gradient(var(--color-hairline) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: center center;
}
```

Light mode: `--color-hairline` (#e2e8f0) at low opacity. Dark mode: same pattern with darker hairline.

### 3. Pill headings (h2, h3)

```css
.prose-lesson h2 {
  display: inline-block;
  background: var(--color-pastel-blue);
  color: var(--color-ink);
  padding: 0.25em 0.75em;
  border-radius: var(--radius-pill);
  font-family: var(--font-hand);
  font-size: 1.25rem;
  border: 1px solid var(--color-hairline);
}

.prose-lesson h3 {
  font-family: var(--font-hand);
  /* no pill — just handwritten font */
}
```

### 4. Inline code tags

```css
.prose-lesson code {
  background: var(--color-pastel-yellow);
  border: 1px solid var(--color-hairline);
  border-radius: 6px;
  padding: 0.1em 0.4em;
  font-family: var(--font-mono);
  font-size: 0.9em;
}
```

### 5. Terminal blocks (pre)

Already dark-themed. Keep existing `#1c1c1e` background. Add subtle border-radius increase to `var(--radius-card)`.

### 6. Font import

Add to `nuxt.config.ts` or `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

### 7. Card-like section spacing

No actual card wrapper — use generous `h2` margin-top + visual separation via background pattern to create section feel.

```css
.prose-lesson h2 {
  margin-top: var(--space-8);
}
.prose-lesson h2:first-of-type {
  margin-top: 0;
}
```

## Risks

- **Playpen Sans load time:** ~30KB woff2, acceptable for a learning app. Fallback: Comic Neue (also Google Fonts).
- **Grid background performance:** Two linear-gradients, negligible paint cost.
- **Dark mode contrast:** Pastels need desaturation; test with `data-theme='dark'`.
- **Mobile readability:** Pill headings may wrap on narrow screens — test at 320px.

## Change

- ID: `lesson-notebook-style`
- Files touched: `apps/web/app/assets/css/tokens.css`, `apps/web/app/assets/css/layout.css`, `apps/web/nuxt.config.ts` (or `app.vue` head)
