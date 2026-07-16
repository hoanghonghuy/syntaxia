---
id: html-05-links
track: html-basics
locale: en
slug: links
title: Creating links
order: 5
published: true
objectives:
  - Create an anchor with href
  - Tell absolute URLs from relative paths
  - Write link text that describes the destination
exercise:
  mode: html
  starter: |
    <!-- Add a link to https://example.com -->
    
  hints:
    - Use an a element for the link.
    - Set href to the full URL.
    - Put visible text between the anchor tags.
  solution: |
    <a href="https://example.com">Example</a>
  expected:
    type: htmlIncludes
    needles:
      - href=
---

**Links** connect pages. The `a` (anchor) element wraps the clickable text or content, and the `href` attribute holds the destination address. Without good link text, visitors cannot tell where a click will take them.

A street sign that says “Museum →” is clearer than “Click here.” The same idea applies on the web.

| Kind of `href` | Meaning | Example |
| --- | --- | --- |
| Absolute URL | Full address, including site | `https://example.com/about` |
| Relative path | Path from the current page or site root | `about.html` or `/guides/lists` |
| Same-page fragment | Jump to an id on this page | `#ingredients` |

## Worked example

```html
<p>
  Read the
  <a href="https://developer.mozilla.org/">MDN Web Docs</a>
  for reference.
</p>
<p>
  Next lesson:
  <a href="images.html">Images with alt text</a>
</p>
```

- `<a href="...">` opens the link; the text between the tags is what the user reads and activates.
- The absolute URL points to another website by its full address.
- The relative `images.html` points to a file beside the current page (exact resolution depends on where the page is hosted).

Keep link text short and specific. Avoid empty “click here” when you can name the destination.

## Common mistakes

- Leaving out `href` or misspelling it — without a destination, the control is not a real link.
- Using vague link text (“click here”, “more”) — screen-reader users often browse by link list alone.
- Putting a full page of text inside one giant link — link the meaningful phrase only.

## Your turn

Use the sandbox below to add a link with href. When the checker shows **Correct**, mark this lesson complete.
