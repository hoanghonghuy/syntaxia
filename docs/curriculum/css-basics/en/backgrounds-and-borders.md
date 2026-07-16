---
id: css-09-backgrounds
track: css-basics
locale: en
slug: backgrounds-and-borders
title: Backgrounds and borders
order: 9
published: true
objectives:
  - Set background-color and simple background images
  - Draw borders with width, style, and color
  - Round corners with border-radius
exercise:
  mode: both
  starterHtml: |
    <div class="card">Card</div>
  starter: |
    /* Style .card background and corners */
    
  hints:
    - background fills the box behind content.
    - border-radius rounds corners.
    - "Hex colors like #eef work for backgrounds."
  solution: |
    .card { background: #eef; border-radius: 8px; }
  expected:
    type: cssIncludes
    needles:
      - border-radius
      - background
---

**Backgrounds** fill the area behind content (and padding). **Borders** draw an edge around the box. Together they define surfaces: cards, callouts, buttons, and page sections. `border-radius` softens sharp corners.

Think of a corkboard: the board color is the background, the tape edge around a note is the border, and rounded sticky notes use a curved corner — `border-radius`.

| Property | Role | Example |
| --- | --- | --- |
| `background-color` | Solid fill | `#f5f5f5` |
| `background-image` | Image or gradient fill | `url("hero.jpg")` |
| `background-size` / `position` | How the image sits | `cover`, `center` |
| `border` | Shorthand for width, style, color | `1px solid #ccc` |
| `border-radius` | Corner rounding | `8px` or `50%` (circle-ish) |

## Worked example

```css
.card {
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 1rem;
}

.hero {
  background-color: #0b3d2e;
  background-image: url("leaves.jpg");
  background-size: cover;
  background-position: center;
  color: #fff;
}
```

- `.card` uses a light fill, a thin gray border, and `8px` rounded corners — a common pattern for grouped content.
- `.hero` layers a dark fallback `background-color` under an image. If the image fails, the solid color still shows. `cover` scales the image to fill the box; `center` keeps the focal area in the middle.
- Text on a busy image needs enough contrast — here the text color is white on a dark green fallback.

You can set each border side separately (`border-top`, and so on) when only one edge should show.

## Common mistakes

- Putting important text on a busy `background-image` without a solid fallback or overlay — contrast collapses and text becomes unreadable.
- Using only `border: 1px` without a style — borders need a style such as `solid`, or nothing visible appears.
- Making every box a large `border-radius` “pill” — reserve strong rounding for controls that need it; content cards often use modest radii.

## Your turn

Use the sandbox below to add background and border-radius to .card. When the checker shows **Correct**, mark this lesson complete.
