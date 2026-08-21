---
id: html-05-links
track: html-basics
locale: en
slug: links
title: Creating links
order: 5
published: true
can_do: "Create a real hyperlink with a meaningful destination and descriptive link text, choosing absolute or relative href values appropriately"
objectives:
  - Create an anchor with a real href attribute
  - Distinguish absolute URLs, relative paths, and fragments
  - Write link text that makes sense outside surrounding prose
exercise:
  mode: html
  starter: |
    <!-- TODO: add a descriptive link to https://example.com -->
  hints:
    - A real hyperlink uses an a element with an href attribute.
    - Use the full absolute URL https://example.com for this task.
    - Put descriptive visible text between <a ...> and </a>.
  solution: |
    <a href="https://example.com">Visit Example</a>
  expected:
    type: htmlTags
    tags:
      - tag: a
        minCount: 1
        requiredAttrs: [href]
---

A link is both content and navigation. The `a` element provides link semantics; `href` identifies the destination; the link text tells a human what that destination is.

## Mental model

```text
<a href="destination">meaningful label</a>
         |                 |
      navigation        user-facing
       target             purpose
```

Absolute URLs name a complete web address; relative paths resolve from the current site/document; fragments point to an `id` in the current document.

## Predict the rendered structure

```html
<a href="/guides/forms">HTML forms guide</a>
```

Predict two things before preview: it is keyboard-focusable navigation, and `/guides/forms` resolves relative to the current site's origin. The visible label should still make sense in a screen reader's list of links.

## Worked example

```html
<p>
  Read the
  <a href="https://developer.mozilla.org/">MDN Web Docs</a>
  for reference.
</p>
```

The `a` element creates the link role; the absolute `href` names another site; the text names the destination instead of saying only “click here”.

## Debug this

```html
<a>Documentation</a>
```

Without `href`, this anchor is not a normal hyperlink to a destination. Do not imitate navigation with styling alone; provide a real destination when the control is a link.

## Common mistakes

- Writing vague labels such as “click here” with no destination context.
- Confusing site-relative paths with full absolute URLs.
- Adding `href` text to the wrong element instead of using an anchor.

## Your turn

Create a descriptive anchor to `https://example.com`. The grader now parses the HTML and requires `href` on an actual `a` element.

## Quick check

What is the difference between `<a>Docs</a>` and `<a href="/docs">Docs</a>`?

**Answer:** the second is a hyperlink with a navigation destination; the first has no `href` destination.
