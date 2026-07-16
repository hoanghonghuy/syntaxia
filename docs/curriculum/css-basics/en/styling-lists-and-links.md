---
id: css-11-lists-links
track: css-basics
locale: en
slug: styling-lists-and-links
title: Styling lists and links
order: 11
published: true
objectives:
  - Change list markers with list-style properties
  - Style navigation lists without default bullets
  - Combine link pseudo-classes with list layout
exercise:
  mode: both
  starterHtml: |
    <ul class="menu"><li><a href="#">Home</a></li></ul>
  starter: |
    /* Remove bullets and link underline */
    
  hints:
    - "list-style: none removes bullets."
    - Target links with .menu a.
    - "text-decoration: none removes underlines."
  solution: |
    .menu { list-style: none; }
    .menu a { text-decoration: none; }
  expected:
    type: cssIncludes
    needles:
      - list-style
      - text-decoration
---

Lists and links appear on almost every page. CSS lets you change **markers** (bullets and numbers), spacing inside lists, and the look of anchors — especially inside a navigation list where default underlines and bullets often get in the way.

Think of a printed agenda: you might use dots, numbers, or no markers at all for a horizontal menu. The items are still a list in meaning; only the presentation changes.

| Property / pattern | Role | Example |
| --- | --- | --- |
| `list-style-type` | Marker shape | `disc`, `decimal`, `none` |
| `list-style-position` | Marker inside or outside the text block | `outside` (default), `inside` |
| `list-style` | Shorthand | `none` |
| `padding-left` on `ul`/`ol` | Indent for markers | `1.25rem` |
| Link + list combo | Nav pattern | `nav ul { list-style: none; }` plus `a:hover` |

## Worked example

```css
ul.plain {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

ul.plain li {
  margin-bottom: 0.5rem;
}

nav a {
  color: #0b57d0;
  text-decoration: none;
}

nav a:hover,
nav a:focus {
  text-decoration: underline;
}
```

- `list-style-type: none` removes bullets. Resetting `padding-left` removes the empty indent the browser kept for those markers.
- Spacing between items comes from `margin` on `li`, not from inventing extra empty paragraphs.
- Nav links drop the default underline for a cleaner menu, then restore an underline on `:hover` and `:focus` so interaction stays obvious.

Keep the HTML as a real `ul`/`ol`/`li` structure for accessibility — style away the bullets; do not replace a list with unrelated `div`s just for looks.

## Common mistakes

- Setting `list-style: none` but leaving a large default padding — the list looks oddly indented with no markers.
- Removing underlines from links *and* providing no hover/focus cue — visitors cannot tell what is clickable.
- Styling only `a:hover` inside nav and forgetting `:focus` — keyboard users get no feedback.

## Your turn

Use the sandbox below to style the menu list and links. When the checker shows **Correct**, mark this lesson complete.
