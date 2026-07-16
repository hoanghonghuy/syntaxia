---
id: html-03-emphasis
track: html-basics
locale: en
slug: emphasis-and-importance
title: Emphasis and importance
order: 3
published: true
objectives:
  - Mark stress in a sentence with em
  - Mark strong importance with strong
  - Prefer semantic emphasis over presentational tags
---

Sometimes a word needs extra weight in meaning, not just a different look. HTML has elements for **emphasis** and **strong importance**. Browsers often italicize `em` and bold `strong`, but the real job of these tags is to carry meaning — including for screen readers that may change voice stress.

Printed books use italics for stress (“I *did* lock the door”) and bold for warnings. HTML’s `em` and `strong` play those roles in markup.

| Element | Meaning | Typical display |
| --- | --- | --- |
| `em` | Stress or emphasis in context | Italic |
| `strong` | Strong importance or urgency | Bold |

## Worked example

```html
<p>Submit the form <em>before</em> midnight.</p>
<p><strong>Warning:</strong> unsaved changes will be lost.</p>
```

- `<em>before</em>` stresses *when* the action must happen.
- `<strong>Warning:</strong>` marks the label as strongly important, not merely decorative.
- Surrounding text stays in ordinary `p` elements.

Older pages sometimes use `<i>` and `<b>` for looks alone. For stress and importance in learning material, prefer `em` and `strong`.

## Common mistakes

- Wrapping a whole paragraph in `strong` to make it look bold — reserve `strong` for words that truly matter more.
- Nesting emphasis without a reason — one clear stress per phrase is enough for beginners.
- Using `em` or `strong` instead of a heading — section titles still belong in `h1`–`h6`.

## Your turn

In the worked example, say aloud which phrase is stress (`em`) and which is importance (`strong`). When the difference is clear, mark this lesson complete.
