---
id: css-03-combinators
track: css-basics
locale: en
slug: combinators-and-groups
title: Combinators and selector lists
order: 3
published: true
objectives:
  - Read descendant and child combinators
  - Recognize adjacent and general sibling combinators
  - Group selectors with a comma list
exercise:
  mode: both
  starterHtml: |
    <article><p>A</p></article>
  starter: |
    /* Style paragraphs inside article */
    
  hints:
    - "Descendant selector: article then a space then p."
    - Add a color declaration.
    - The space means “inside”, not direct child only.
  solution: |
    article p { color: green; }
  expected:
    type: cssIncludes
    needles:
      - article p
---

Often you need to style an element only when it sits in a certain place in the HTML tree. **Combinators** connect selectors to describe that relationship. A **selector list** (comma-separated) applies the same declarations to several targets at once.

Imagine a filing cabinet: “documents inside the Projects drawer” is a descendant idea. “Only the folders directly in that drawer, not nested deeper” is a child idea. “Label A and label B the same way” is a group.

| Pattern | Syntax idea | Meaning |
| --- | --- | --- |
| Descendant | `article p` | A `p` anywhere inside `article` |
| Child | `ul > li` | An `li` that is a direct child of `ul` |
| Adjacent sibling | `h2 + p` | A `p` immediately after an `h2` |
| General sibling | `h2 ~ p` | Any `p` that follows an `h2` as a sibling |
| Selector list | `h1, h2, h3` | All of those elements get the same rule |

## Worked example

```css
article p {
  line-height: 1.6;
}

nav > a {
  text-decoration: none;
}

h2 + p {
  margin-top: 0.25rem;
}

h1, h2, h3 {
  font-family: Georgia, serif;
}
```

- `article p` styles paragraphs nested inside an `article`, even if other elements sit between them.
- `nav > a` styles only anchors that are **direct** children of `nav`, not links buried deeper.
- `h2 + p` styles the first paragraph right after a heading — useful for tightening that first line.
- `h1, h2, h3` is a **selector list**: one rule, three targets.

Combinators describe structure already present in HTML. They do not create new elements.

## Common mistakes

- Using a space (`article p`) when you meant a direct child (`article > p`) — the space matches nested descendants too.
- Writing `h1 h2 h3` without commas when you wanted a list — without commas, that means an `h3` inside an `h2` inside an `h1`.
- Over-nesting selectors (`body div article section p`) — hard to maintain; prefer a clear class when the structure is complex.

## Your turn

Use the sandbox below to target p inside article. When the checker shows **Correct**, mark this lesson complete.
