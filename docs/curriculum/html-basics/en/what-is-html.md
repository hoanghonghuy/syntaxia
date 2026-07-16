---
id: html-00-intro
track: html-basics
locale: en
slug: what-is-html
title: What is HTML?
order: 0
published: true
objectives:
  - Explain HTML as the structure of a web page
  - Recognize elements, tags, and attributes
  - Read a short piece of HTML and name its parts
exercise:
  mode: html
  starter: |
    <!-- Add a paragraph about HTML -->
    
  hints:
    - Use a p element to mark a paragraph.
    - Put text between opening and closing p tags.
    - Your paragraph can describe what HTML does.
  solution: |
    <p>HTML marks up meaning.</p>
  expected:
    type: htmlTags
    tags:
      - tag: p
        minCount: 1
---

A web page is more than plain text. Browsers need **labels** that say “this is a heading,” “this is a paragraph,” or “this is a link.” **HTML** (HyperText Markup Language) is that labeling system. It does not style colors or make buttons interactive — it describes the *structure* of content.

Think of a printed handout with clear section titles and body text. HTML gives the browser those roles so it can show the page correctly and help tools (such as screen readers) understand it.

Here are the three words you will see everywhere:

| Word | Plain meaning | Example |
| --- | --- | --- |
| Element | A unit of content with a meaning | A paragraph |
| Tag | The markers that open and close an element | `<p>` and `</p>` |
| Attribute | Extra information on the opening tag | `lang="en"` |

## Worked example

```html
<p class="note">HTML marks up meaning.</p>
```

- `<p>` opens a **paragraph** element.
- `class="note"` is an **attribute**: a name (`class`) and a value (`note`).
- `HTML marks up meaning.` is the text content.
- `</p>` closes the paragraph.

Most elements have an opening tag and a closing tag. A few (you will meet later) are empty and use a single tag, such as images.

## Common mistakes

- Treating HTML like a programming language that “runs” logic — HTML describes structure; scripts and styles are separate.
- Leaving out the closing tag when one is required — the browser may guess wrong and the page can look broken.
- Confusing the tag name with the attribute — in `<p class="note">`, `p` is the element; `class` is extra data on that tag.

## Your turn

Use the sandbox below to add a paragraph about HTML. When the checker shows **Correct**, mark this lesson complete.
