---
id: html-11-entities
track: html-basics
locale: en
slug: html-entities
title: Entities and small text helpers
order: 11
published: true
objectives:
  - Write reserved characters with HTML entities
  - Use br and hr for a line break and a thematic break
  - Recognize light helpers such as abbr and time
exercise:
  mode: html
  starter: |
    <!-- Show AT&amp;T using an entity for & -->
    
  hints:
    - Ampersand in text needs an entity.
    - "Write &amp; to show & safely."
    - Wrap the company name in a paragraph.
  solution: |
    <p>AT&amp;T</p>
  expected:
    type: htmlIncludes
    needles:
      - "&amp;"
---

Some characters are special in HTML source. The less-than sign starts a tag, so you cannot type raw `<` inside ordinary text and expect it to show as a symbol. **Character entities** (and numeric character references) let you include those symbols safely. A few small elements — `br`, `hr`, `abbr`, `time` — help with line breaks, breaks in topic, abbreviations, and dates.

When the keyboard character would be read as markup, use an entity instead.

| Need | Common writing | Resulting idea |
| --- | --- | --- |
| Less-than | `&lt;` | `<` |
| Greater-than | `&gt;` | `>` |
| Ampersand | `&amp;` | `&` |
| Non-breaking space | `&nbsp;` | Space that should not wrap |
| Line break | `<br />` | Force a new line inside text |
| Thematic break | `<hr />` | A break between topics |
| Abbreviation | `<abbr title="...">` | Short form with expansion |
| Date/time | `<time datetime="...">` | Human text + machine value |

## Worked example

```html
<p>Write a tag like <code>&lt;p&gt;</code> in documentation.</p>
<p>Sugar &amp; flour go in first.</p>
<p>Line one<br />Line two</p>
<hr />
<p>
  We meet on
  <time datetime="2026-07-16">16 July 2026</time>.
  The club is run by the
  <abbr title="HyperText Markup Language">HTML</abbr> study group.
</p>
```

- `&lt;p&gt;` displays the characters `<p>` instead of starting a real paragraph tag.
- `&amp;` is required when you need a literal `&` in text.
- `br` breaks the line without starting a new paragraph; `hr` marks a thematic split.
- `time` keeps a machine-readable `datetime` beside readable text; `abbr` stores the full expansion in `title`.

Prefer new paragraphs (`p`) over many `br` breaks for ordinary prose.

## Common mistakes

- Pasting raw `<` or `&` into page text — the browser may treat them as markup and break the page.
- Using `br` to create fake paragraphs or spacing — structure with `p` (and CSS later) instead.
- Omitting `datetime` on `time` when you care about sorting or calendars — visible text alone is ambiguous for machines.

## Your turn

Use the sandbox below to show AT&T with an HTML entity. When the checker shows **Correct**, mark this lesson complete.
