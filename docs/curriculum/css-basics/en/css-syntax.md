---
id: css-01-syntax
track: css-basics
locale: en
slug: css-syntax
title: CSS rules and stylesheets
order: 1
published: true
objectives:
  - Read a CSS rule as selector plus declarations
  - Recognize property–value pairs and the semicolon
  - Compare external and internal stylesheets
---

A **CSS rule** always has the same shape: a selector, then curly braces, then one or more declarations. A **stylesheet** is simply a file (or a block) that holds many rules. Browsers read those rules and apply them to matching HTML.

Compare it to a recipe card: the title names the dish (selector), and each step lists an ingredient and amount (property and value). Miss a punctuation mark and the instructions become unclear.

| Piece | Role | Example |
| --- | --- | --- |
| Selector | What to style | `p` |
| Property | Which trait | `color` |
| Value | The setting | `navy` |
| Declaration | Property + value | `color: navy;` |
| Stylesheet kinds | Where rules live | External `.css` file, or `<style>` in the HTML `head` |

## Worked example

```css
p {
  color: navy;
  line-height: 1.5;
}

.note {
  font-weight: bold;
}
```

- The first rule styles every `p`. Two declarations sit inside the braces; each ends with a **semicolon**.
- The second rule styles elements with `class="note"`. Class selectors start with a **dot** (covered next lesson).
- An **external** stylesheet is a separate `.css` file linked from HTML. An **internal** stylesheet is a `<style>` element in the document `head`. Both use the same rule syntax.

Keep one declaration per line when you are learning — it is easier to spot missing colons or semicolons.

## Common mistakes

- Forgetting the semicolon after a declaration — later properties in the same rule may be ignored.
- Writing `color = navy` instead of `color: navy` — CSS uses a colon between property and value.
- Mixing HTML tags into the stylesheet (`<p>color: navy</p>`) — a `.css` file contains only CSS, not HTML tags.

## Your turn

Look at the worked example and point to the selector, one property, one value, and the closing brace of the first rule. When you can name each piece, mark this lesson complete.
