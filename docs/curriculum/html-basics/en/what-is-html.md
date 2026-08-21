---
id: html-00-intro
track: html-basics
locale: en
slug: what-is-html
title: What is HTML?
order: 0
published: true
can_do: "Read a small HTML fragment as semantic elements, attributes, and text instead of treating it as visual formatting"
objectives:
  - Explain HTML as the semantic structure of a document
  - Distinguish an element, tag, attribute, and text content
  - Predict the basic document structure a browser receives from a fragment
exercise:
  mode: html
  starter: |
    <!-- TODO: add one paragraph explaining what HTML does -->
  hints:
    - Use a p element because the requested content is a paragraph.
    - Put the sentence between an opening <p> and closing </p> tag.
    - A valid pattern is: <p>Your sentence here.</p>
  solution: |
    <p>HTML describes the meaning and structure of content.</p>
  expected:
    type: htmlTags
    tags:
      - tag: p
        minCount: 1
---

HTML is the layer that gives web content **meaning and structure**. Before thinking about colors or click behavior, learn to read source as a tree of elements the browser can understand.

## Mental model

Think **source -> elements -> document structure -> browser/assistive meaning**.

```html
<p class="note">Read the structure first.</p>
```

This fragment contains one `p` element. Its opening tag carries a `class` attribute; the sentence is text content; the closing tag ends the element.

| Part | In the example | Job |
| --- | --- | --- |
| element | the whole `<p>...</p>` | gives the content a paragraph role |
| tag | `<p>` / `</p>` | marks the element boundaries |
| attribute | `class="note"` | adds information to the opening tag |
| text | `Read the structure first.` | content inside the element |

## Predict the rendered structure

Before previewing this:

```html
<p>Hello <strong>web</strong>.</p>
```

predict the tree: one paragraph contains text, then one `strong` child element, then more text. The browser may draw `strong` as bold, but its semantic role is strong importance.

## Worked example

```html
<p class="note">HTML marks up meaning.</p>
```

The tag name decides the semantic role. The class does not turn a paragraph into another kind of element; it is metadata that CSS or JavaScript can use later.

## Debug this

```html
<p href="/docs">Documentation</p>
```

The browser still has a paragraph, not a link. Adding a link-only attribute to the wrong element does not create link semantics. Use the correct element for the job: `<a href="/docs">Documentation</a>`.

## Common mistakes

- Treating HTML as a programming language that executes business logic.
- Choosing elements only by their default appearance instead of their meaning.
- Assuming any attribute can create behavior on any tag.

## Your turn

Add one real paragraph in the sandbox. Choose `p` because the content is prose, not because of how the default style looks.

## Quick check

What decides whether content is a paragraph: its `class`, its text, or the element name?

**Answer:** the `p` element gives it paragraph semantics.
