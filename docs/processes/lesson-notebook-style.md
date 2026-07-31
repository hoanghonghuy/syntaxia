# Lesson notebook style

## Purpose

How the digital bullet journal / cheat sheet visual theme is applied to `.prose-lesson` — CSS-only, no backend or Vue component changes.

## When to use

- Adding new pastel tokens or adjusting the notebook theme
- Debugging grid background or pill heading rendering
- Changing the handwritten font
- Adding dark mode pastel variants

## Steps

### 1. Design tokens (`tokens.css`)

Pastel palette and notebook-specific tokens live in `:root` / `html[data-theme='light']` and `html[data-theme='dark']` blocks:

```css
--color-pastel-blue: #d1e8ff;
--color-pastel-yellow: #fff4d1;
--color-pastel-pink: #ffd1e8;
--color-pastel-green: #d1ffd7;
--color-pastel-purple: #e8d1ff;
--font-hand: 'Playpen Sans', 'Comic Neue', cursive;
--radius-card: 16px;
--radius-pill: 999px;
```

Dark mode uses richer tinted pastels (e.g. `#243b55` for pastel-blue) so chips/pills still read as color, plus dedicated **code island** tokens:

```css
--color-code-bg / --color-code-fg / --color-code-border / --color-code-gutter
```

In dark: `#0d1117` editor surface (GitHub/VS Code pattern) — distinct from page canvas/surface so fences and sandboxes do not look muddy.

### 2. Font import (`nuxt.config.ts`)

Playpen Sans is loaded via Google Fonts in the `link` array:

```ts
href: 'https://fonts.googleapis.com/css2?family=...&family=Playpen+Sans:wght@400;600;700&...'
```

### 3. Grid paper background

`.prose-lesson` gets a two-axis linear-gradient grid:

```css
background-image:
  linear-gradient(var(--color-hairline) 1px, transparent 1px),
  linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px);
background-size: 24px 24px;
```

### 4. Pill headings (h2)

```css
.prose-lesson h2 {
  display: inline-block;
  font-family: var(--font-hand);
  background: var(--color-pastel-blue);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  padding: 0.25em 0.75em;
}
```

First h2 has no extra top margin via `:first-of-type`.

### 5. Handwritten h3

```css
.prose-lesson h3 {
  font-family: var(--font-hand);
}
```

### 6. Inline code tags

```css
.prose-lesson code {
  background: var(--color-pastel-yellow);
  border: 1px solid var(--color-hairline);
  border-radius: 6px;
  padding: 0.1em 0.4em;
}
```

### 7. Example fences (`pre`)

Use code-island tokens (soft gray in light; elevated dark island in dark):

```css
.prose-lesson pre {
  background: var(--color-code-bg);
  color: var(--color-code-fg);
  border: 1px solid var(--color-code-border);
  border-radius: var(--radius-card);
}
.prose-lesson pre code {
  border: none;
  background: transparent;
}
```

## Do

- Keep all notebook styles scoped to `.prose-lesson`
- Use CSS custom properties for all colors and radii
- Test both light and dark themes
- Test mobile (320px) for pill heading wrapping

## Don't

- Add Vue components or JS for section wrapping (future enhancement)
- Change the Go markdown renderer
- Touch shell layout (sidebar, TOC, sandbox, prev/next)
- Use hardcoded colors outside tokens.css
- Add icon decorations or diagram components

## Related

- [`lesson-reader.md`](./lesson-reader.md) — TOC, mobile nav, prose typography
- [`appearance-theme.md`](./appearance-theme.md) — theme switching
- [`product-baseline.md`](./product-baseline.md) — Mintlify IA, design tokens
- `openspec/changes/lesson-notebook-style/` — change artifacts
- `apps/web/app/assets/css/tokens.css`
- `apps/web/app/assets/css/layout.css`
- `apps/web/nuxt.config.ts`
