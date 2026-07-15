---
id: sql-15-like
track: sql-fundamentals
locale: en
slug: like-pattern
title: Matching text with LIKE
order: 15
published: true
objectives:
  - Filter text with a pattern
  - Use % as a wildcard for any characters
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "LIKE compares text to a pattern; % means “any characters here”."
    - "Titles that start with In match the pattern 'In%'."
    - "Try: SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  preview:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
      - ["The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception'), (2, 'Interstellar'), (3, 'The Matrix');"
---

Exact equality (`=`) needs the whole string. `LIKE` lets you match a pattern — for example “titles that start with In”, like a spreadsheet “begins with” filter.

| title |
| --- |
| Inception |
| Interstellar |
| The Matrix |

## Worked example

```sql
SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;
```

- `'In%'` means: starts with `In`, then any characters (or none).
- Inception and Interstellar match; The Matrix does not.
- `ORDER BY title` sorts the matching titles A→Z.

Result:

| title |
| --- |
| Inception |
| Interstellar |

## Common mistakes

- Using `=` with a pattern — `=` needs an exact match; patterns need `LIKE`.
- Forgetting `%` — `'In'` alone only matches the exact word `In`.
- Putting `%` in the wrong place — `'%In'` means “ends with In”, not “starts with In”.

## Your turn

List `title` values that start with `In`. Sort them with `ORDER BY title`.
