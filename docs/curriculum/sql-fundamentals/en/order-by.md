---
id: sql-05-order
track: sql-fundamentals
locale: en
slug: order-by
title: Sorting with ORDER BY
order: 6
published: true
objectives:
  - Sort result rows
  - Use ASC and DESC
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Add ORDER BY column_name at the end of the query."
    - "DESC means newest or largest first; ASC means oldest or smallest first."
    - "Try: SELECT title, year FROM movies ORDER BY year DESC;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010);"
---

Without sorting, rows can appear in any order. `ORDER BY` is like sorting a spreadsheet column — A→Z, or newest first.

| title | year |
| --- | --- |
| The Matrix | 1999 |
| Inception | 2010 |

## Worked example

```sql
SELECT title, year FROM movies ORDER BY year DESC;
```

- `ORDER BY year` sorts using the `year` column.
- `DESC` means descending (2010 before 1999).
- `ASC` means ascending (default if you omit it).

Result:

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |

## Common mistakes

- Forgetting `DESC` when the task asks for newest first — default `ASC` puts 1999 before 2010.
- Placing `ORDER BY` before `WHERE` (when both exist) — `ORDER BY` belongs at the end.
- Sorting by `title` when the task asks to sort by `year`.

## Your turn

List every movie’s `title` and `year`, sorted by `year` from newest to oldest.
