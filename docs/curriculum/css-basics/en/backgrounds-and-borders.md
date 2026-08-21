---
id: css-09-backgrounds
track: css-basics
locale: en
slug: backgrounds-and-borders
title: Surfaces, borders, and corners
order: 9
published: true
can_do: "Build a card surface by predicting which box layers receive background, border, and corner rounding"
objectives:
  - Distinguish background fill from border edge
  - Use border shorthand as width-style-color
  - Round the border box with border-radius
exercise:
  mode: both
  starterHtml: |
    <div class="card">Card content</div>
  starter: |
    /* TODO: give .card a light background, 1px border, and 8px rounded corners */
  hints:
    - background-color fills behind content and padding.
    - Border shorthand can combine width, style, and color.
    - Use background-color: #eef; border: 1px solid #ccd; border-radius: 8px;.
  solution: |
    .card {
      background-color: #eef;
      border: 1px solid #ccd;
      border-radius: 8px;
    }
  expected:
    type: cssRules
    rules:
      - selector: .card
        declarations:
          background-color: "#eef"
          border: 1px solid #ccd
          border-radius: 8px
---

Background and border occupy different parts of the box. Understanding the layer prevents random “try another property” styling.

## Mental model

```text
border edge
└─ background paints behind content + padding (and beneath border area depending on clipping)
```

`border-radius` changes the geometry of the rounded border box and clips backgrounds to the rounded shape according to background clipping rules.

## Predict the rendered result

A card with a background but no border still has a filled surface. Adding a `1px solid` border creates a visible edge. Adding radius rounds the corners of that edge.

## Worked example

```css
.card {
  background-color: #eef;
  border: 1px solid #ccd;
  border-radius: 8px;
}
```

Shorthands are useful when all components are intentionally set together; longhands are clearer when changing only one part.

## Debug this

```css
.card { border: #ccd; }
```

A useful visible border needs a style such as `solid`; shorthand components are not just a color value.

## Common mistakes

- Expecting background color to create a border edge.
- Forgetting a border style in shorthand.
- Using huge radius values without understanding the box geometry being rounded.

## Your turn

Build the three-layer card surface exactly as specified.

## Quick check

Which property creates space inside the border: background, padding, or margin?

**Answer:** padding.
