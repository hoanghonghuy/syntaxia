---
id: css-01-syntax
track: css-basics
locale: en
slug: css-syntax
title: Rules, selectors, and declarations
order: 1
published: true
can_do: "Write a complete CSS rule with a selector and multiple property-value declarations and diagnose malformed declaration syntax"
objectives:
  - Read the boundary between selector and declaration block
  - Write property-value pairs with colons and semicolons
  - Distinguish CSS source from HTML markup
exercise:
  mode: both
  starterHtml: |
    <p class="note">Read me</p>
  starter: |
    /* TODO: make .note blue and bold */
  hints:
    - A class selector starts with a dot: .note.
    - Put both declarations inside one pair of braces.
    - Use color: blue; and font-weight: bold;.
  solution: |
    .note {
      color: blue;
      font-weight: bold;
    }
  expected:
    type: cssRules
    rules:
      - selector: .note
        declarations:
          color: blue
          font-weight: bold
---

CSS syntax is small, but punctuation defines the structure the parser reads.

## Mental model

```text
selector {
  property: value;
  property: value;
}
```

The selector chooses targets; braces contain a declaration block; a colon separates a property from its value; semicolons separate declarations.

## Predict the rendered result

```css
.note {
  color: blue;
  font-weight: bold;
}
```

Predict two independent computed traits on the matching paragraph: blue text and bold weight.

## Worked example

```css
.note {
  color: navy;
  line-height: 1.5;
}
```

An external stylesheet and an internal `<style>` element use the same CSS rule syntax; only the location differs.

## Debug this

```css
.note {
  color = blue
  font-weight: bold;
}
```

`color = blue` is not a CSS declaration. Use a colon. Missing separators can also cause following declarations to be ignored.

## Common mistakes

- Using `=` instead of `:`.
- Mixing HTML tags into a `.css` file.
- Assuming a declaration is enough without a selector and rule block.

## Your turn

Write one `.note` rule that sets both required properties. The structured grader checks both declarations on that selector.

## Quick check

What does the selector decide, and what do declarations decide?

**Answer:** the selector decides which elements match; declarations decide which style properties those matches receive.
