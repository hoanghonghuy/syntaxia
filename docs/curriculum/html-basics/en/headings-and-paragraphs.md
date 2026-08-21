---
id: html-02-headings
track: html-basics
locale: en
slug: headings-and-paragraphs
title: Headings and paragraphs
order: 2
published: true
can_do: "Turn prose into a logical heading outline and paragraph structure without using heading levels as visual-size controls"
objectives:
  - Build a logical heading hierarchy
  - Use paragraphs for ordinary prose
  - Separate document semantics from later CSS presentation
exercise:
  mode: html
  starter: |
    <!-- TODO: add the page h1 and one paragraph below it -->
  hints:
    - Use h1 for the page-level heading in this small document.
    - Put the supporting sentence in a p element.
    - A valid shape is an h1 followed by a p; styling does not choose the heading level.
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

Heading levels describe an **outline**, not a font-size menu. Good source structure remains understandable even before CSS loads.

## Mental model

```text
h1  Page topic
├─ h2  Major section
│  └─ h3  Subsection
└─ h2  Another major section
```

Paragraphs are content blocks under those headings. A browser or screen reader can use headings as navigation signposts.

## Predict the rendered structure

```html
<h1>Garden journal</h1>
<p>Weekend notes.</p>
<h2>Soil</h2>
<p>The bed was dry.</p>
```

Predict the outline before previewing: one page topic, then one child section. The two `p` elements are prose; they are not part of the heading hierarchy themselves.

## Worked example

```html
<h1>Garden journal</h1>
<p>Notes from the weekend planting.</p>

<h2>Soil</h2>
<p>The bed was dry after three sunny days.</p>
```

The heading level answers “where is this section in the outline?” CSS later answers “how large or colorful should it look?”.

## Debug this

```html
<h1>Garden journal</h1>
<h4>Soil</h4>
<p>The bed was dry.</p>
```

Using `h4` just because its default size looks right creates a false hierarchy. If Soil is a direct section of the page, use `h2` and style it later.

## Common mistakes

- Picking heading levels by appearance.
- Skipping logical levels without an actual nested structure.
- Using line breaks instead of paragraphs for ordinary prose.

## Your turn

Add one page heading and one paragraph. Read the source outline first, then check the preview.

## Quick check

If an `h2` looks too large, should you replace it with `h4`?

**Answer:** no. Keep the semantic level and change presentation with CSS later.
