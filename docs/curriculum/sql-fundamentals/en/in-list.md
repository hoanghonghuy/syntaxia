---
id: sql-16-in
track: sql-fundamentals
locale: en
slug: in-list
title: Matching a list with IN
order: 16
published: true
objectives:
  - Keep rows whose value is in a short list
  - Prefer IN over many OR comparisons
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "IN (a, b) keeps rows where the column equals a or b."
    - "Filter on year with IN (1999, 2010), then select title."
    - "Try: SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Sometimes you want several exact values at once — “year is 1999 or 2010”. `IN` is a short way to write that list, instead of chaining many `OR`s.

**movies** (full table)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

| title | year in (1999, 2010)? |
| --- | --- |
| Inception | yes (2010) |
| The Matrix | yes (1999) |
| Dune | no (2021) |
| Interstellar | no (2014) |

## Worked example

```sql
SELECT title
FROM movies
WHERE year IN (1999, 2010)
ORDER BY title;
```

- `year IN (1999, 2010)` keeps a row if `year` equals either value.
- Same idea as `year = 1999 OR year = 2010`, but shorter.
- `ORDER BY title` sorts the result alphabetically.

Result:

| title |
| --- |
| Inception |
| The Matrix |

## Common mistakes

- Writing `year = (1999, 2010)` — use `IN`, not `=`, for a list.
- Mixing up `IN` (exact values) with `BETWEEN` (a continuous range).
- Forgetting parentheses around the list: `IN (1999, 2010)`.

## Your turn

List the `title` of movies whose `year` is `1999` or `2010`. Sort with `ORDER BY title`.
