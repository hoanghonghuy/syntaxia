---
id: html-06-images
track: html-basics
locale: en
slug: images
title: Images with alt text
order: 6
published: true
objectives:
  - Embed an image with img, src, and alt
  - Write alt text that describes the image’s role
  - Optionally set width and height for layout stability
exercise:
  mode: html
  starter: |
    <!-- Add an image with src and alt -->
    
  hints:
    - Use a single img tag (self-closing).
    - src points to the image file.
    - alt describes the image for accessibility.
  solution: |
    <img src="cat.png" alt="A cat">
  expected:
    type: htmlIncludes
    needles:
      - alt=
      - <img
---

Images are empty elements: they do not wrap text the way a paragraph does. The `img` tag points to a file with `src` and describes the image for people who cannot see it with `alt`. Good `alt` text is part of accessible HTML, not an optional caption trick.

If the photo were removed, what short sentence would still carry its meaning? That sentence is usually your `alt`.

| Attribute | Role |
| --- | --- |
| `src` | Path or URL of the image file |
| `alt` | Text alternative for the image |
| `width` / `height` | Intrinsic size hints (pixels); help reserve space |

## Worked example

```html
<img
  src="tomato-seedling.jpg"
  alt="Young tomato seedling in a clay pot"
  width="640"
  height="480"
/>
```

- `src` tells the browser which file to load.
- `alt` describes the content so it can be announced or shown if the image fails.
- `width` and `height` match the image’s pixel size so the page does not jump while loading.

If an image is purely decorative, `alt=""` (empty) can be appropriate. For learning pages, prefer real descriptions when the picture teaches something.

## Common mistakes

- Omitting `alt` — assistive tools then have nothing useful to announce.
- Stuffing keywords into `alt` (“tomato SEO plant garden buy”) — write a clear description, not a search list.
- Using huge images without size hints — the layout may shift as each file arrives.

## Your turn

Use the sandbox below to add an image with src and alt. When the checker shows **Correct**, mark this lesson complete.
