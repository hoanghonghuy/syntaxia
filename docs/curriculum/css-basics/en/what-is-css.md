---
id: css-00-intro
track: css-basics
locale: en
slug: what-is-css
title: What is CSS?
order: 0
published: true
objectives:
  - Explain CSS as the presentation layer of a web page
  - Distinguish HTML structure from CSS style
  - Recognize how a stylesheet attaches to a page
---

HTML labels *what* content is (a heading, a paragraph, a link). **CSS** (Cascading Style Sheets) describes *how* that content should look: colors, spacing, fonts, and layout. Without CSS, pages are readable but plain. With CSS, the same HTML can look like a newspaper, a product card, or a quiet reading layout.

Think of a printed flyer. The words and section titles are the content (HTML). The choice of typeface, ink color, and margins is the design (CSS). You can redesign the flyer without rewriting every sentence.

| Layer | Job | Example |
| --- | --- | --- |
| HTML | Structure and meaning | `<h1>Welcome</h1>` |
| CSS | Presentation | Make that heading green and larger |
| How they connect | Stylesheet linked or embedded | A `.css` file, or a `<style>` block |

## Worked example

```css
h1 {
  color: teal;
  font-size: 2rem;
}
```

- `h1` is the **selector**: it targets every `h1` element in the HTML.
- Inside the curly braces, each line is a **declaration**: a property (`color`) and a value (`teal`).
- Together, the selector and its declarations form a **rule**. The browser applies matching rules when it paints the page.

CSS does not replace HTML. It only styles elements that already exist in the document.

## Common mistakes

- Trying to “write content” in CSS — headings and paragraphs still belong in HTML; CSS only styles them.
- Expecting one stylesheet to magically invent missing markup — if there is no `h1` in the HTML, a `h1 { ... }` rule has nothing to style.
- Confusing CSS with JavaScript — CSS changes appearance; it does not run click logic or fetch data.

## Your turn

Re-read the table and the worked example. In your own words, say what HTML does, what CSS does, and which part of the rule is the selector. Then mark this lesson complete.
