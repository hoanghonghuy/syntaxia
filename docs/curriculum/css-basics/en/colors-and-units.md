---
id: css-07-units
track: css-basics
locale: en
slug: colors-and-units
title: Colors and relative units
order: 7
published: true
can_do: "Choose a color representation and a relative length unit, then predict how rem-based text sizing responds to the root font size"
objectives:
  - Recognize common color syntaxes
  - Distinguish fixed and relative length units
  - Use rem for scalable text sizing
exercise:
  mode: both
  starterHtml: |
    <p class="note">Readable note</p>
  starter: |
    /* TODO: make .note #0b57d0 and 1.25rem */
  hints:
    - Put both declarations on the .note selector.
    - Use color for the hex color and font-size for text size.
    - Use .note { color: #0b57d0; font-size: 1.25rem; }.
  solution: |
    .note { color: #0b57d0; font-size: 1.25rem; }
  expected:
    type: cssRules
    rules:
      - selector: .note
        declarations:
          color: "#0b57d0"
          font-size: 1.25rem
---

CSS values are not just numbers. Their **type and reference point** determine how the browser resolves them.

## Mental model

| Value | Reference |
| --- | --- |
| `16px` | CSS pixel length |
| `1em` | current element's font size |
| `1rem` | root element's font size |
| `50%` | percentage basis depends on the property |
| `#0b57d0`, `rgb(...)`, color keyword | color value |

Relative units encode a relationship instead of a single fixed measurement.

## Predict the rendered result

If the root font size is `16px`, `1.25rem` resolves to `20px`. If a user's environment makes the root larger, the rem-sized text scales with it.

## Worked example

```css
.note {
  color: #0b57d0;
  font-size: 1.25rem;
}
```

Use units because of what they are relative to, not because one syntax is universally “responsive”. Percentages, `em`, and `rem` can resolve against different bases.

## Debug this

```css
.note { font-size: 1.25; }
```

Most length properties require a unit for non-zero lengths. The number alone does not mean `rem` or `px` automatically.

## Common mistakes

- Treating every percentage as relative to the same thing.
- Removing units from non-zero lengths.
- Choosing tiny fixed text sizes that do not respect scalable typography.

## Your turn

Apply the exact color and rem-based size to `.note`, then predict the resolved size before previewing.

## Quick check

What is `rem` relative to?

**Answer:** the root element's font size.
