---
id: css-06-box
track: css-basics
locale: en
slug: box-model
title: The box model
order: 6
published: true
objectives:
  - Name content, padding, border, and margin
  - Explain how width relates to the box by default
  - Use box-sizing: border-box for predictable sizing
---

Every element is drawn as a rectangular **box**. From the inside out you have **content**, **padding** (inner space), **border**, and **margin** (outer space that separates this box from neighbors). Understanding this model is the key to controlling size and spacing.

Picture a framed photograph. The picture is the content. The mat around the picture is padding. The wooden frame is the border. The empty wall space between this frame and the next one is margin.

| Layer | What it is | Typical properties |
| --- | --- | --- |
| Content | Text, image, or child boxes | `width`, `height` |
| Padding | Space inside the border | `padding`, `padding-top`, … |
| Border | Edge around the padding | `border`, `border-width` |
| Margin | Space outside the border | `margin`, `margin-bottom`, … |

## Worked example

```css
.card {
  width: 300px;
  padding: 16px;
  border: 2px solid #ccc;
  margin: 12px;
  box-sizing: border-box;
}
```

- `width: 300px` sets the target width of the box.
- `padding: 16px` adds space on all four sides inside the border.
- `border: 2px solid #ccc` draws a 2-pixel gray edge.
- `margin: 12px` pushes neighboring boxes away.
- `box-sizing: border-box` makes the declared `width` include padding and border, so the outer size stays closer to what you expect. Without it (the older default `content-box`), padding and border are added *on top of* the width.

Margins can collapse between stacked block boxes — adjacent vertical margins may combine into one. Padding and borders do not collapse that way.

## Common mistakes

- Setting `width` and large `padding` without `border-box` — the element grows wider than you planned and may overflow its parent.
- Using margin when you meant padding (or the reverse) — margin is outside the border; padding is inside.
- Expecting background color to fill the margin — backgrounds cover content and padding (and the border area), not the margin.

## Your turn

Re-read the layers table and the `.card` rule. Name the four layers from inside out, and notice what `box-sizing: border-box` is for. Then mark this lesson complete.
