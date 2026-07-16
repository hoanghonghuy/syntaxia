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

In the worked example, identify which `href` is absolute and which is relative, and notice how the visible text names the target. Then mark this lesson complete.
