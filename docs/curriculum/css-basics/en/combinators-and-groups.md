---
id: css-03-combinators
track: css-basics
locale: en
slug: combinators-and-groups
title: Relationships in selectors
order: 3
published: true
can_do: "Read descendant and child relationships from the HTML tree and write a selector that targets only elements in the intended structural context"
objectives:
  - Distinguish descendant and direct-child relationships
  - Recognize adjacent/general sibling relationships
  - Understand selector lists as shared declarations for multiple targets
exercise:
  mode: both
  starterHtml: |
    <article>
      <p>Inside article</p>
      <div><p>Nested deeper</p></div>
    </article>
    <p>Outside article</p>
  starter: |
    /* TODO: make paragraphs anywhere inside article green */
  hints:
    - The target relation is descendant, not only direct child.
    - A space between selectors means “inside at any depth”.
    - Use: article p { color: green; }
  solution: |
    article p { color: green; }
  expected:
    type: cssRules
    rules:
      - selector: article p
        declarations:
          color: green
---

Combinators turn the HTML tree into a selector condition.

## Mental model

| Selector | Relationship |
| --- | --- |
| `article p` | p anywhere inside article |
| `article > p` | p whose direct parent is article |
| `h2 + p` | p immediately following h2 as a sibling |
| `h2 ~ p` | following p siblings of h2 |
| `h1, h2` | selector list: same declarations for both targets |

The space in a descendant selector is meaningful syntax.

## Predict the rendered result

For an `article` containing a direct paragraph and another paragraph nested inside a `div`, predict that `article p` matches both. `article > p` would match only the direct child.

## Worked example

```css
article p { color: green; }
article > h2 { margin-top: 0; }
h1, h2 { font-family: sans-serif; }
```

Read the HTML relationship before choosing a combinator; do not select based only on current visual position.

## Debug this

```css
article > p { color: green; }
```

If the requirement says “all paragraphs anywhere inside article”, the child combinator is too narrow: nested paragraphs under another element are missed.

## Common mistakes

- Treating descendant space and child `>` as equivalent.
- Building extremely long selectors tied to incidental markup depth.
- Confusing a selector list comma with a descendant relationship.

## Your turn

Target every paragraph inside `article`, including the nested one, while leaving the outside paragraph alone.

## Quick check

Which selector is broader inside an article: `article p` or `article > p`?

**Answer:** `article p` because it matches descendants at any depth.
