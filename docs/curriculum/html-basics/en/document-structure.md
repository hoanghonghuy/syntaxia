---
id: html-01-document
track: html-basics
locale: en
slug: document-structure
title: Document structure and the head
order: 1
published: true
objectives:
  - Sketch the skeleton of an HTML document
  - Explain what the head and body are for
  - Set lang, charset, and title correctly
exercise:
  mode: html
  starter: |
    <!DOCTYPE html>
    <!-- Complete html, head with title, and body -->
    
  hints:
    - Add html, head, body, and title elements.
    - Put charset meta and title inside head.
    - Put visible content inside body.
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
    tags:
      - tag: html
        minCount: 1
      - tag: head
        minCount: 1
      - tag: body
        minCount: 1
      - tag: title
        minCount: 1
---

Every HTML page follows a shared **document skeleton**. The browser expects a doctype, an `html` root, a `head` for metadata, and a `body` for what the visitor sees. Without this shape, tools and browsers cannot treat the file as a complete page.

Compare it to a book: the cover and copyright page are not the story, but they identify the book. The `head` is like that front matter; the `body` holds the chapters you read on screen.

| Part | Role | Visible on the page? |
| --- | --- | --- |
| `<!DOCTYPE html>` | Declares HTML5 | No |
| `<html lang="...">` | Root of the document; language hint | No (wraps everything) |
| `<head>` | Title, character set, links to styles | Mostly no (title shows in the tab) |
| `<body>` | Visible content | Yes |

## Worked example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My first page</title>
  </head>
  <body>
    <p>Hello, web.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` tells the browser to use modern HTML rules.
- `lang="en"` on `<html>` helps browsers and assistive tools know the page language.
- `<meta charset="utf-8" />` sets the character encoding so letters and symbols display correctly.
- `<title>` sets the text in the browser tab and bookmarks — it belongs in the `head`, not as a heading in the body.
- Everything the visitor should see goes inside `<body>`.

## Common mistakes

- Putting the page title only as an `<h1>` and leaving `<title>` empty or missing — tabs and search results need `<title>`.
- Forgetting `charset` early in the `head` — unusual characters may show as garbage.
- Nesting content outside `<body>` or closing tags in the wrong order — keep `head` and `body` as siblings inside `html`.

## Your turn

Use the sandbox below to complete the minimal document skeleton. When the checker shows **Correct**, mark this lesson complete.
