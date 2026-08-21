---
id: css-06-box
track: css-basics
locale: en
slug: box-model
title: Box model and predictable sizing
order: 6
published: true
can_do: "Trace content, padding, border, and margin and use border-box sizing to keep declared width inclusive of padding and border"
objectives:
  - Distinguish the four box-model layers
  - Predict total size under content-box versus border-box
  - Use box-sizing for predictable component dimensions
exercise:
  mode: both
  starterHtml: |
    <div class="box">Box</div>
  starter: |
    /* TODO: make .box 200px wide including 20px padding and a 2px border */
  hints:
    - With the default content-box model, padding and border add outside the declared width.
    - Set box-sizing: border-box so width includes content, padding, and border.
    - Use width: 200px; padding: 20px; border: 2px solid black; box-sizing: border-box;.
  solution: |
    .box {
      width: 200px;
      padding: 20px;
      border: 2px solid black;
      box-sizing: border-box;
    }
  expected:
    type: cssRules
    rules:
      - selector: .box
        declarations:
          width: 200px
          padding: 20px
          border: 2px solid black
          box-sizing: border-box
---

Every rendered element participates in a box model. The important skill is predicting which dimensions are **inside** the declared size and which add outside it.

## Mental model

```text
margin
  border
    padding
      content
```

Default `box-sizing: content-box` makes `width` describe only content width. `border-box` makes the declared width include content + padding + border.

## Predict the rendered result

For `width: 200px; padding: 20px; border: 2px solid`, content-box produces an outer border-box width of `244px` (200 + 40 padding + 4 border). With `border-box`, the outer border-box remains `200px`.

## Worked example

```css
.card {
  width: 20rem;
  padding: 1rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
```

Margin stays outside either sizing model; it separates this box from neighboring boxes.

## Debug this

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
```

If a design requires the visible border box to stay exactly 200px wide, the default content-box behavior overshoots. Change the sizing model instead of subtracting padding by hand everywhere.

## Common mistakes

- Calling margin “space inside the box”.
- Forgetting that two horizontal padding sides and two border sides contribute to content-box outer width.
- Hard-coding compensating widths instead of choosing the intended box-sizing model.

## Your turn

Build a 200px border box with padding and border included in that width.

## Quick check

Does margin become part of the declared width when using `border-box`?

**Answer:** no. Margin remains outside the border box.
