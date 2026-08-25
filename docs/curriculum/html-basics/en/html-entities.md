---
id: html-11-entities
track: html-basics
locale: en
slug: html-entities
title: Character references and text helpers
order: 11
published: true
can_do: "Represent reserved markup characters safely in text and distinguish text-level helpers such as br, hr, abbr, and time from ordinary paragraph structure"
objectives:
  - Use character references when literal source characters would be ambiguous with markup
  - Use br and hr only for their actual text/thematic roles
  - Recognize machine-readable meaning in abbr and time
exercise:
  mode: html
  starter: |
    <!-- TODO: show AT&T in a paragraph using &amp; for the ampersand -->
  hints:
    - The exercise checks the HTML source, not only the final visible text.
    - Write the ampersand character reference as &amp;.
    - Put the company name inside a p element: AT&amp;T.
  solution: |
    <p>AT&amp;T</p>
  expected:
    type: htmlIncludes
    needles:
      - "&amp;"
---

HTML source uses characters such as `<` and `&` as part of its own syntax. When you need those characters as literal text, **character references** make the intent unambiguous.

## Mental model

```text
source syntax character     literal text representation
<                            &lt;
>                            &gt;
&                            &amp;
```

Small text elements solve different problems: `br` is a line break inside content; `hr` is a thematic break; `abbr` can expose an expansion; `time` can pair readable text with a machine-readable datetime.

## Predict the rendered structure

```html
<p>Write <code>&lt;p&gt;</code> to discuss the paragraph tag.</p>
```

Predict what is text and what is markup: `code` is a real element, while `&lt;p&gt;` becomes the visible characters `<p>` instead of creating another paragraph.

## Worked example

```html
<p>Sugar &amp; flour go in first.</p>
<p>Line one<br>Line two</p>
<hr>
<p>Meet <time datetime="2026-08-21">21 August 2026</time>.</p>
```

Use real paragraphs for separate prose blocks; do not stack `br` tags just to create visual spacing.

## Debug this

```html
<p>Use <p> for paragraphs.</p>
```

The inner `<p>` is parsed as markup, not shown as literal documentation text. Write `&lt;p&gt;` when the angle brackets themselves are content.

## Common mistakes

- Typing literal markup syntax into documentation text and expecting it to stay text.
- Using repeated `br` elements as a layout-spacing system.
- Treating `time` or `abbr` as decorative styling hooks instead of meaning-bearing elements.

## Your turn

Render `AT&T` from source that uses `&amp;`. The exercise deliberately checks the encoded source form.

## Quick check

Why write `&lt;p&gt;` in an HTML tutorial instead of raw `<p>` when you want readers to see the tag characters?

**Answer:** raw angle brackets are markup syntax; character references make them literal text.
