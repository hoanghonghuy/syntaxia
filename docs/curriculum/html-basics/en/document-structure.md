---
id: html-01-document
track: html-basics
locale: en
slug: document-structure
title: Document structure and the head
order: 1
published: true
can_do: "Build a complete HTML document skeleton and place metadata in head while keeping visible page content in body"
objectives:
  - Trace the parent-child shape of a minimal HTML document
  - Place language, charset, and title metadata correctly
  - Distinguish document metadata from visible body content
exercise:
  mode: html
  starter: |
    <!DOCTYPE html>
    <!-- TODO: add html lang, head metadata, title, and body -->
  hints:
    - The root is <html lang="en"> with head and body as its main children.
    - Put <meta charset="utf-8"> and <title> inside head; visible content belongs in body.
    - Complete the skeleton with doctype, html, head, meta charset, title, body, and closing html tag.
  solution: |
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>My Page</title>
    </head>
    <body>
      <p>Hello</p>
    </body>
    </html>
  expected:
    type: htmlTags
    sourceIncludes:
      - "<!DOCTYPE html>"
    tags:
      - tag: html
        minCount: 1
        requiredAttrs: [lang]
      - tag: head
        minCount: 1
      - tag: meta
        minCount: 1
        requiredAttrs: [charset]
        attrEquals:
          charset: utf-8
      - tag: title
        minCount: 1
      - tag: body
        minCount: 1
---

A browser document has two different concerns: **metadata about the document** and **content rendered in the page**. A predictable skeleton keeps those concerns in the right place.

## Mental model

```text
Document
├─ <!DOCTYPE html>
└─ html[lang]
   ├─ head
   │  ├─ meta charset
   │  └─ title
   └─ body
      └─ visible content
```

`head` and `body` are siblings under the root `html` element. The tab title is metadata; an `h1` in the body is visible page content.

## Predict the rendered structure

For this skeleton, predict which text appears **inside the page** and which appears in the **browser tab**:

```html
<head><title>Garden notes</title></head>
<body><h1>Tomatoes</h1></body>
```

`Tomatoes` is page content; `Garden notes` is document metadata used for the tab/bookmark.

## Worked example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Garden notes</title>
  </head>
  <body>
    <h1>Tomatoes</h1>
  </body>
</html>
```

`lang` helps language-aware tools; UTF-8 safely represents modern text; `title` identifies the document outside the page body.

## Debug this

```html
<body>
  <meta charset="utf-8">
  <title>Garden notes</title>
  <h1>Tomatoes</h1>
</body>
```

The metadata is in the visible-content region. Move document metadata into `head`; keep body for content users interact with or read on the page.

## Common mistakes

- Treating `<title>` and `<h1>` as interchangeable.
- Omitting the page language even when it is known.
- Placing metadata inside body because it does not visibly break the preview.

## Your turn

Build the complete minimal document skeleton. The checker now verifies doctype, language, UTF-8 metadata, title, head, and body instead of only counting container tags.

## Quick check

Where should the character encoding declaration live?

**Answer:** in `head`, using a charset meta element such as `<meta charset="utf-8">`.
