---
id: html-03-emphasis
track: html-basics
locale: en
slug: emphasis-and-importance
title: Emphasis and importance
order: 3
published: true
can_do: "Choose em for contextual stress and strong for importance instead of selecting inline elements only for italic or bold appearance"
objectives:
  - Distinguish contextual emphasis from strong importance
  - Keep text-level semantics inside normal prose
  - Avoid replacing structural headings with emphasis elements
exercise:
  mode: html
  starter: |
    <!-- TODO: create one paragraph with one em and one strong phrase -->
  hints:
    - Use em for a word whose stress changes the meaning of the sentence.
    - Use strong for information that is especially important or urgent.
    - Keep both elements inside a p element.
  solution: |
    <p>Submit <em>before</em> midnight. <strong>Do not miss the deadline.</strong></p>
  expected:
    type: htmlTags
    tags:
      - tag: p
        minCount: 1
      - tag: em
        minCount: 1
      - tag: strong
        minCount: 1
---

Text semantics can change without changing the document outline. `em` marks contextual stress; `strong` marks strong importance. Their default italic/bold appearance is only presentation.

## Mental model

Ask what the author means:

| Intent | Element |
| --- | --- |
| stress a word so the sentence is read differently | `em` |
| mark information as especially important or urgent | `strong` |
| create a section title | heading (`h1`–`h6`) |
| merely choose an italic/bold visual style | CSS is usually the styling tool |

## Predict the rendered structure

```html
<p>I said <em>today</em>, not tomorrow.</p>
<p><strong>Warning:</strong> save your work.</p>
```

Predict both meaning and likely default rendering: `today` receives stress; `Warning:` receives importance. The browser commonly displays them italic and bold respectively.

## Worked example

```html
<p>Submit the form <em>before</em> midnight.</p>
<p><strong>Warning:</strong> unsaved changes will be lost.</p>
```

A screen reader or other consumer can use the semantic element even when visual CSS changes later.

## Debug this

```html
<p><b>Warning:</b> unsaved changes will be lost.</p>
```

`b` can draw attention without expressing strong importance. If the message is genuinely important, `strong` communicates that meaning directly.

## Common mistakes

- Wrapping large blocks in `strong` only to get bold text.
- Using `em` as a replacement for a heading.
- Assuming default italic/bold appearance is the semantic definition.

## Your turn

Create one paragraph containing both contextual emphasis and strong importance.

## Quick check

If CSS later removes bold styling from `strong`, does the semantic importance disappear?

**Answer:** no. The element still carries strong-importance semantics.
