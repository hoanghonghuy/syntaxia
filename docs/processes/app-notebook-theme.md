# App-wide notebook theme

## Purpose

How the digital bullet journal visual language extends from `.prose-lesson` to the full Syntaxia UI chrome and shared surfaces — while keeping Mintlify IA.

## When to use

- Changing global canvas grid, card radius, heading font scope
- Restyling shell (header/footer/sidebar/TOC) or shared `.card` / `.btn`
- Deciding whether a new surface should use pastel decoration vs brand accent

## Steps

1. **Tokens** (`tokens.css`): pastels, `--font-hand`, `--radius-card`, `--radius-pill`, `--notebook-grid-size`, `--notebook-grid-opacity`.
2. **Canvas**: `body` uses a low-opacity grid (`--notebook-grid-opacity`); `.prose-lesson` keeps a stronger grid.
3. **Typography**: brand wordmark = Fraunces (`--font-display`); page/section headings = Playpen Sans (`--font-hand`); body = Source Sans 3.
4. **Chrome**: header/footer/sidebar/TOC use soft pastel surface mixes; primary CTA stays `--color-brand`.
5. **Cards / chips / ghost buttons**: `--radius-card` / `--radius-pill` + pastel soft fills.
6. **Sandbox**: only panel/toolbar chrome; CodeMirror/terminal stay dark.

## Do

- Keep Mintlify IA (sidebar / lesson / TOC / mobile drawer)
- Prefer soft surface + hairline over loud pastel on every list row
- Test light + dark + accent presets together

## Don't

- Handwritten body text
- Stickers / doodles / mascots
- Pastel as the sole primary CTA fill
- Restyle sandbox editors into pastel

## Related

- [`lesson-notebook-style.md`](./lesson-notebook-style.md)
- [`product-baseline.md`](./product-baseline.md)
- [`appearance-theme.md`](./appearance-theme.md)
- `openspec/changes/app-notebook-theme/`
