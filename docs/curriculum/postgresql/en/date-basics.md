---
id: pg-06-date
track: postgresql
locale: en
slug: date-basics
title: Filtering dates
order: 6
published: true
objectives:
  - Compare DATE columns in WHERE
  - Write a date literal with DATE '…'
exercise:
  starter: "SELECT title, released FROM movies;"
  hints:
    - "Compare released to a date literal, not a bare string alone."
    - "Use >= to keep releases on or after that day."
    - "Try: SELECT title FROM movies WHERE released >= DATE '2010-01-01';"
  solution: "SELECT title FROM movies WHERE released >= DATE '2010-01-01';"
  preview:
    columns: ["id", "title", "released"]
    rows:
      - [1, "The Matrix", "1999-03-31"]
      - [2, "Inception", "2010-07-16"]
      - [3, "Dune", "2021-10-22"]
      - [4, "Arrival", "2016-11-11"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Dune"]
      - ["Arrival"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, released DATE);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', DATE '1999-03-31'), (2, 'Inception', DATE '2010-07-16'), (3, 'Dune', DATE '2021-10-22'), (4, 'Arrival', DATE '2016-11-11');"
---

Release calendars store calendar days. In PostgreSQL, a `DATE` column holds a year-month-day value. You filter it with comparisons, using a date literal such as `DATE '2010-01-01'`.

| id | title | released |
| --- | --- | --- |
| 1 | The Matrix | 1999-03-31 |
| 2 | Inception | 2010-07-16 |
| 3 | Dune | 2021-10-22 |
| 4 | Arrival | 2016-11-11 |

## Worked example

```sql
SELECT title FROM movies WHERE released >= DATE '2010-01-01';
```

- `released` is a `DATE` column.
- `DATE '2010-01-01'` is a typed date literal (ISO order: year-month-day).
- `>=` keeps movies released on that day or later — The Matrix (1999) is excluded.

Result:

| title |
| --- |
| Inception |
| Dune |
| Arrival |

`TIMESTAMP` stores date **and** time; for day-only filters, `DATE` is enough.

## Common mistakes

- Writing dates as `01/01/2010` — prefer ISO `YYYY-MM-DD`.
- Comparing dates as plain text without a clear date type.
- Using `>` when the task says “on or after” (`>=`).

## Your turn

Return the `title` of every movie released on or after `2010-01-01`.
