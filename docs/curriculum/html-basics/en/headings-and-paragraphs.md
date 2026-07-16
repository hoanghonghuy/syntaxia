---
id: html-02-headings
track: html-basics
locale: en
slug: headings-and-paragraphs
title: Headings and paragraphs
order: 2
published: true
objectives:
  - Use h1–h6 to outline a page
  - Wrap ordinary text in p elements
  - Avoid skipping heading levels for looks
exercise:
  mode: html
  starter: |
    <!-- Add an h1 and a paragraph -->
    
  hints:
    - Use h1 for the main heading.
    - Use p for the paragraph below it.
    - Wrap text inside each tag pair.
  solution: |
    <h1>Welcome</h1>
    <p>This is a short paragraph.</p>
  expected:
    type: htmlTags
    tags:
      - tag: h1
        minCount: 1
      - tag: p
        minCount: 1
---

Long pages need a clear outline. **Headings** (`h1` through `h6`) mark titles and section names. **Paragraphs** (`p`) hold ordinary blocks of text. Together they give the page a readable structure — for people scanning with their eyes and for tools that jump by heading.

Think of a table of contents: level 1 is the document title, level 2 are main sections, level 3 are subsections. Skipping from `h1` straight to `h4` is like jumping from chapter title to a tiny footnote label with nothing in between.

| Element | Typical use |
| --- | --- |
| `h1` | Main title of the page (usually one) |
| `h2` | Major section |
| `h3`–`h6` | Nested subsections |
| `p` | A block of body text |

## Worked example

```html
<h1>Garden journal</h1>
<p>Notes from the weekend planting.</p>

<h2>Soil</h2>
<p>The bed was dry after three sunny days.</p>

<h3>Watering plan</h3>
<p>Water early in the morning twice a week.</p>
```

- One `h1` names the whole page.
- `h2` starts a major section; `h3` sits under that section.
- Each idea in running prose sits in its own `p`.

Headings are for structure, not for making text large. Size and color come later with CSS.

## Common mistakes

- Using headings only to change font size — choose the level that matches the outline, then style with CSS.
- Skipping levels (`h1` then `h3` with no `h2`) — screen-reader users lose the hierarchy.
- Putting multiple sentences in one giant block without `p` — paragraphs keep text readable and styled consistently.

## Your turn

Use the sandbox below to add a main heading and a paragraph. When the checker shows **Correct**, mark this lesson complete.
