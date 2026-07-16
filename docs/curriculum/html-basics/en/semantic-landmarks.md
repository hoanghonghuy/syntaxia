---
id: html-07-landmarks
track: html-basics
locale: en
slug: semantic-landmarks
title: Page landmarks
order: 7
published: true
objectives:
  - Place header, nav, main, and footer landmarks
  - Use section and article for meaningful chunks
  - Prefer semantic regions over anonymous divs for page layout roles
---

A long page is easier to navigate when major regions have names. HTML’s **landmark** elements — such as `header`, `nav`, `main`, and `footer` — mark those regions. Assistive tools can jump between them; future CSS can target them cleanly.

Imagine a building map: entrance, corridors, main hall, exit. Landmarks are that map for a web page.

| Element | Typical role |
| --- | --- |
| `header` | Introductory block (branding, title area) |
| `nav` | Primary navigation links |
| `main` | The unique main content of this page (one per page) |
| `section` | A themed grouping with its own heading |
| `article` | A self-contained piece (post, card, story) |
| `footer` | Closing info (credits, contact, secondary links) |

## Worked example

```html
<header>
  <h1>City Library</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/events">Events</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Weekend reading club</h2>
    <p>Meet on Saturday at 10:00.</p>
  </article>
</main>

<footer>
  <p>Contact: desk@example.com</p>
</footer>
```

- `header` introduces the site area; `nav` holds the menu links.
- `main` wraps the primary content for this URL — keep one `main` per page.
- `article` groups a self-contained story; a `section` would fit a titled subsection that is not standalone.
- `footer` closes with supporting information.

Generic `div` boxes still have a place for styling hooks, but they do not name a region the way these elements do.

## Common mistakes

- Using several `main` elements on one page — one main landmark is the rule.
- Wrapping the whole site in `article` by habit — reserve `article` for content that could stand alone.
- Skipping headings inside `section` — a section without a heading is harder to understand.

## Your turn

Trace the worked example from top to bottom and name each landmark out loud (`header`, `nav`, `main`, `footer`). When the map feels settled, mark this lesson complete.
