---
id: html-07-landmarks
track: html-basics
locale: en
slug: semantic-landmarks
title: Semantic page landmarks
order: 7
published: true
can_do: "Map page regions to semantic landmarks and keep a single main content landmark instead of building the document from anonymous layout containers"
objectives:
  - Use header, nav, main, article, section, and footer by role
  - Keep one main landmark for the page's primary content
  - Distinguish self-contained article content from a themed section
exercise:
  mode: html
  starter: |
    <!-- TODO: structure a small page with header/nav, one main article, and footer -->
  hints:
    - Start with header and put navigation links inside a nav region.
    - Put the unique page content in one main element and use article for the self-contained story.
    - Finish with footer; the target contains header, nav, exactly one main, article, and footer.
  solution: |
    <header>
      <nav><a href="/">Home</a></nav>
    </header>
    <main>
      <article><h1>News</h1><p>Today's update.</p></article>
    </main>
    <footer>Contact</footer>
  expected:
    type: htmlTags
    tags:
      - tag: header
        minCount: 1
      - tag: nav
        minCount: 1
      - tag: main
        minCount: 1
        maxCount: 1
      - tag: article
        minCount: 1
      - tag: footer
        minCount: 1
---

Semantic landmarks name the major regions of a page. They create a useful document map before any CSS layout is applied.

## Mental model

```text
page
├─ header
│  └─ nav
├─ main              <- unique primary content
│  └─ article/section
└─ footer
```

Use `article` when the content can reasonably stand on its own; use `section` for a thematic grouping that belongs to a larger whole and normally has a heading.

## Predict the rendered structure

If every region is replaced with `<div>`, the page may look identical after CSS, but its built-in region semantics disappear. Predict what a screen-reader landmark list can identify before and after that replacement.

## Worked example

```html
<header>
  <h1>City Library</h1>
  <nav><a href="/events">Events</a></nav>
</header>
<main>
  <article>
    <h2>Weekend reading club</h2>
    <p>Meet Saturday at 10:00.</p>
  </article>
</main>
<footer>Contact the library desk.</footer>
```

The source order is meaningful on its own; CSS can rearrange presentation later without requiring anonymous markup everywhere.

## Debug this

```html
<main>Article A</main>
<main>Article B</main>
```

The document now exposes two main landmarks. Put the unique primary region in one `main`, then structure the content inside it with `article`, `section`, headings, and other elements.

## Common mistakes

- Using `div` for every region even when a semantic landmark fits.
- Creating multiple `main` landmarks.
- Using `section` as a generic styling wrapper with no thematic meaning.

## Your turn

Structure a small page with header/nav, exactly one main containing an article, and footer.

## Quick check

What is the practical difference between `article` and `section`?

**Answer:** an article is intended to be self-contained; a section groups a themed part of a larger document.
