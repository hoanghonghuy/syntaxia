---
id: pg-20-window
track: postgresql
locale: en
slug: window-functions
title: Ranking rows with window functions
order: 20
published: true
objectives:
  - Number rows with ROW_NUMBER()
  - Use OVER (ORDER BY …) without collapsing groups
exercise:
  starter: "SELECT title, year FROM movies ORDER BY year;"
  hints:
    - "ROW_NUMBER() assigns 1, 2, 3… across the ordered rows."
    - "Put the numbering rule in OVER (ORDER BY year)."
    - "Try: SELECT title, year, ROW_NUMBER() OVER (ORDER BY year) AS rn FROM movies;"
  solution: "SELECT title, year, ROW_NUMBER() OVER (ORDER BY year) AS rn FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
  expected:
    columns: ["title", "year", "rn"]
    rows:
      - ["The Matrix", 1999, 1]
      - ["Inception", 2010, 2]
      - ["Arrival", 2016, 3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016);"
---

Sometimes you want a rank next to every row — first, second, third — without folding the table into one summary line. A **window function** does that: it looks across related rows while still returning one result row per input row.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Arrival | 2016 |

## Worked example

```sql
SELECT title, year, ROW_NUMBER() OVER (ORDER BY year) AS rn
FROM movies;
```

- `ROW_NUMBER()` assigns 1, 2, 3… in order.
- `OVER (ORDER BY year)` sets the order for numbering (oldest first here).
- Unlike `GROUP BY`, every movie row still appears.

Result:

| title | year | rn |
| --- | --- | --- |
| The Matrix | 1999 | 1 |
| Inception | 2010 | 2 |
| Arrival | 2016 | 3 |

Related functions include `RANK()`, `LAG()`, and `LEAD()` — same `OVER` idea, different calculations.

## Common mistakes

- Using `GROUP BY` when you still need every row.
- Forgetting `OVER (…)` — window functions require it.
- Omitting the `rn` alias when the expected columns include it.

## Your turn

Return `title`, `year`, and a row number `rn` ordered by `year` ascending.
