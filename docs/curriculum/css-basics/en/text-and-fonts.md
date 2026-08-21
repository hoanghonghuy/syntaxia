---
id: css-08-text
track: css-basics
locale: en
slug: text-and-fonts
title: Readable typography
order: 8
published: true
can_do: "Build a fallback font stack and set readable line-height while distinguishing inherited typography from box layout properties"
objectives:
  - Write a font-family fallback stack
  - Use unitless line-height for readable body text
  - Recognize common inherited text properties
exercise:
  mode: both
  starterHtml: |
    <article class="copy"><p>Long-form reading should stay comfortable.</p></article>
  starter: |
    /* TODO: give .copy a Georgia/serif stack and line-height 1.6 */
  hints:
    - A font stack lists candidates from preferred to fallback.
    - Put the generic family serif last.
    - Use .copy { font-family: Georgia, serif; line-height: 1.6; }.
  solution: |
    .copy { font-family: Georgia, serif; line-height: 1.6; }
  expected:
    type: cssRules
    rules:
      - selector: .copy
        declarations:
          font-family: Georgia, serif
          line-height: "1.6"
---

Typography affects how text is read, not only how it looks. A font stack provides fallback behavior; line height controls vertical rhythm.

## Mental model

```text
font-family: first available font -> next fallback -> generic family
line-height: distance between line boxes
```

Properties such as `font-family`, `font-size`, and `color` commonly inherit to descendants; box properties such as margin do not inherit by default.

## Predict the rendered result

If Georgia is unavailable, `Georgia, serif` falls back to the browser's serif family. A unitless `line-height: 1.6` scales with the element's font size.

## Worked example

```css
.copy {
  font-family: Georgia, serif;
  line-height: 1.6;
}
```

A child paragraph can inherit these text settings from the article without repeating the same declarations.

## Debug this

```css
.copy { font-family: Georgia serif; }
```

Font-family candidates are a comma-separated list. Without the comma, the value is not the intended two-step fallback stack.

## Common mistakes

- Omitting a generic fallback family.
- Using extremely tight line height for long-form text.
- Repeating inherited typography on every descendant unnecessarily.

## Your turn

Set the fallback stack and line height on the parent `.copy`, then inspect the paragraph that inherits them.

## Quick check

Why put `serif` last in `Georgia, serif`?

**Answer:** it is a generic fallback if the preferred face is unavailable.
