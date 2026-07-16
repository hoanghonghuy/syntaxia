---
id: css-07-units
track: css-basics
locale: en
slug: colors-and-units
title: Colors and units
order: 7
published: true
objectives:
  - Write colors with keywords, hex, and rgb
  - Choose among px, em, rem, and percentages
  - Prefer rem for scalable text sizing
exercise:
  mode: both
  starterHtml: |
    <p class="note">Hi</p>
  starter: |
    /* Set color and font-size on .note */
    
  hints:
    - font-size accepts rem values like 1.25rem.
    - color can be a named color or hex.
    - Both go inside one .note rule.
  solution: |
    .note { color: teal; font-size: 1.25rem; }
  expected:
    type: cssIncludes
    needles:
      - rem
      - color
---

CSS values need both a **color** language and a set of **units** for length. Colors can be named keywords, hex codes, or `rgb()` functions. Lengths may be absolute (`px`) or relative (`em`, `rem`, `%`) so layouts can adapt.

Think of paint swatches and measuring tape. A keyword like `teal` is a named swatch. A hex code is a precise recipe for that swatch. Relative units are like “half the parent’s width” or “based on the root text size,” not a fixed number of millimeters.

| Kind | Examples | Beginner tip |
| --- | --- | --- |
| Color keyword | `teal`, `black`, `transparent` | Fine for learning; limited palette |
| Hex | `#0b57d0`, `#333` | Common in real stylesheets |
| `rgb()` / `rgba()` | `rgb(11, 87, 208)` | Same idea as hex, different spelling |
| `px` | `16px` | Absolute on the screen; easy but less flexible for text |
| `em` | `1.25em` | Relative to the element’s own font size |
| `rem` | `1rem` | Relative to the root (`html`) font size — good default for type |
| `%` | `50%` | Relative to a parent measurement (often width) |

## Worked example

```css
body {
  color: #222222;
  font-size: 1rem;
  background-color: rgb(250, 250, 248);
}

.lead {
  font-size: 1.25rem;
  color: teal;
}

.sidebar {
  width: 30%;
  padding: 1em;
}
```

- `#222222` and `rgb(250, 250, 248)` set text and page background with precise colors; `teal` is a keyword on `.lead`.
- `1rem` on `body` ties the base size to the root. `.lead` at `1.25rem` scales with that root, not with every nested parent.
- `30%` width makes the sidebar a fraction of its parent. `1em` padding on `.sidebar` scales with that element’s font size.

When sizing text, prefer `rem` so nested elements do not multiply sizes accidentally the way chained `em` values can.

## Common mistakes

- Mixing up `#fff` (white) with invalid shorthand — hex needs 3 or 6 hex digits (or newer forms you will meet later); random lengths fail silently.
- Nesting many `em` font sizes — each level multiplies the last, and text can become huge or tiny.
- Using `%` height without a parent that has a defined height — the percentage may resolve to nothing useful.

## Your turn

Use the sandbox below to set color and font-size with rem. When the checker shows **Correct**, mark this lesson complete.
