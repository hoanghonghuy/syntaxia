---
id: css-08-text
track: css-basics
locale: en
slug: text-and-fonts
title: Text and fonts
order: 8
published: true
objectives:
  - Set font-family with a fallback stack
  - Control size, weight, line-height, and alignment
  - Keep body text readable for long reading
---

Text styling covers the **font family**, **size**, **weight**, **line height**, and **alignment**. Good defaults make lessons and articles comfortable to read; flashy settings often hurt long-form text.

Compare a paperback page: the typeface, how large the letters are, how heavy the strokes feel, and how much air sits between lines. CSS exposes those same choices for the screen.

| Property | Controls | Beginner values |
| --- | --- | --- |
| `font-family` | Typeface stack | `"Source Serif 4", Georgia, serif` |
| `font-size` | Text size | `1rem`, `1.125rem` |
| `font-weight` | Thickness | `normal`, `bold`, `600` |
| `line-height` | Space between lines | `1.5`, `1.6` (unitless is fine) |
| `text-align` | Horizontal alignment | `left`, `center`, `right` |
| `text-decoration` | Underlines and more | `none`, `underline` |

## Worked example

```css
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #222;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  line-height: 1.2;
}

.intro {
  font-size: 1.125rem;
  text-align: left;
}
```

- `font-family` lists a **stack**: the browser uses the first available font, then falls back.
- Body text uses a comfortable `line-height` (around 1.5–1.6) for reading; headings often use a tighter line height.
- `font-weight: 700` is another way to say bold. Not every font file includes every weight.
- Keep long paragraphs left-aligned for languages that read left to right — centered body text is harder to scan.

Font choice and spacing matter more for readability than decorative effects.

## Common mistakes

- Listing only one fancy font with no fallback — if it fails to load, the browser may substitute an awkward default.
- Setting `line-height` too tight on body copy — lines collide and reading slows down.
- Centering large blocks of paragraph text — reserve center alignment for short titles or captions.

## Your turn

Re-read the worked example and identify the font stack, the body line-height, and how the heading weight differs from normal text. Then mark this lesson complete.
