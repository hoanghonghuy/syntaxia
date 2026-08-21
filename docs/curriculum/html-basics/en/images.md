---
id: html-06-images
track: html-basics
locale: en
slug: images
title: Images with text alternatives
order: 6
published: true
can_do: "Embed an image with a valid source and choose an appropriate text alternative based on whether the image is informative or decorative"
objectives:
  - Use img with src and an alt attribute
  - Write useful alt text for informative images
  - Recognize empty alt as the intentional pattern for purely decorative images
exercise:
  mode: html
  starter: |
    <!-- TODO: add cat.png with an informative alt description -->
  hints:
    - Use an img element; it does not wrap child text.
    - src identifies the file and alt provides the text alternative.
    - A valid pattern is <img src="cat.png" alt="A cat sitting by a window">.
  solution: |
    <img src="cat.png" alt="A cat sitting by a window">
  expected:
    type: htmlTags
    tags:
      - tag: img
        minCount: 1
        requiredAttrs: [src, alt]
---

An image has two parallel representations: the visual resource loaded from `src` and the **text alternative** exposed when the image cannot or should not be perceived visually.

## Mental model

```text
img
├─ src -> visual resource
└─ alt -> text alternative / semantic fallback
```

`img` is a void element: it has attributes but no child content or closing `</img>` tag in HTML.

## Predict the rendered structure

```html
<img src="seedling.jpg" alt="Young tomato seedling in a clay pot">
```

Predict what remains meaningful if the image fails to load or is announced non-visually: the alt text still communicates the image's content. For a purely decorative image that adds no information, `alt=""` can intentionally hide it from assistive reading.

## Worked example

```html
<img
  src="tomato-seedling.jpg"
  alt="Young tomato seedling in a clay pot"
  width="640"
  height="480">
```

`width` and `height` can help the browser reserve the image's aspect space while it loads. They do not replace responsive CSS later.

## Debug this

```html
<img src="chart.png" alt="image">
```

The attribute exists, but the description throws away the chart's meaning. Alt quality depends on the image's purpose in context, not on merely satisfying an attribute checklist.

## Common mistakes

- Omitting `alt` entirely.
- Writing file names or generic words such as “image” instead of the useful meaning.
- Filling decorative images with noisy alt text instead of deliberately using empty alt when appropriate.

## Your turn

Add `cat.png` with an informative text alternative. The grader now requires both `src` and `alt` on an actual `img` element.

## Quick check

Should every image have a long non-empty alt description?

**Answer:** no. Informative images need useful alternatives; purely decorative images commonly use `alt=""`.
