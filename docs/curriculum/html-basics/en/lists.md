---
id: html-04-lists
track: html-basics
locale: en
slug: lists
title: Lists
order: 4
published: true
objectives:
  - Build unordered and ordered lists
  - Place each item in an li
  - Recognize a simple description list
---

Lists turn a pile of related items into a clear sequence or bullet set. HTML has **unordered lists** (bullets), **ordered lists** (numbers), and **description lists** (term + definition pairs). Choosing the right list tells readers — and assistive tools — how the items relate.

A shopping list does not need numbers. A recipe’s steps do. A glossary needs a term beside its meaning.

| List type | Elements | Best for |
| --- | --- | --- |
| Unordered | `ul` > `li` | Items with no required order |
| Ordered | `ol` > `li` | Steps or rankings |
| Description | `dl` > `dt` + `dd` | Terms and definitions |

## Worked example

```html
<ul>
  <li>Water</li>
  <li>Flour</li>
  <li>Salt</li>
</ul>

<ol>
  <li>Mix the dough.</li>
  <li>Rest for 30 minutes.</li>
  <li>Bake until golden.</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>Markup that structures a web page.</dd>
</dl>
```

- `ul` / `ol` wrap the whole list; each item is an `li`.
- Order in the file becomes the bullet or number order on the page.
- `dt` is the term; `dd` is the description that follows it.

Never put bare text as a direct child of `ul` or `ol` — always use `li`.

## Common mistakes

- Using numbered paragraphs instead of `ol` when order matters — ordered lists expose the sequence to assistive tech.
- Forgetting `li` and writing only text inside `ul` — invalid structure and unpredictable display.
- Nesting lists incorrectly — put a nested `ul`/`ol` *inside* an `li`, not beside it.

## Your turn

Decide which sample above should stay bullets, which should stay numbers, and why. Re-read the table if unsure, then mark this lesson complete.
