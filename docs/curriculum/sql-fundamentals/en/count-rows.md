---
id: sql-13-count
track: sql-fundamentals
locale: en
slug: count-rows
title: Counting rows with COUNT
order: 13
published: true
objectives:
  - Count how many rows a table has
  - Name the result column with AS
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "COUNT(*) counts every row in the table."
    - "You usually want one named column, such as movie_count."
    - "Try: SELECT COUNT(*) AS movie_count FROM movies;"
  solution: "SELECT COUNT(*) AS movie_count FROM movies;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
      - ["Dune", 2021]
  expected:
    columns: ["movie_count"]
    rows:
      - [3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Dune', 2021);"
---

A spreadsheet can tell you how many filled rows you have. In SQL, `COUNT` answers “how many?” without listing every row.

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |
| Dune | 2021 |

## Worked example

```sql
SELECT COUNT(*) AS movie_count FROM movies;
```

- `COUNT(*)` counts every row in `movies`.
- The table has three movies, so the result is `3`.
- `AS movie_count` labels that single number clearly.

Result:

| movie_count |
| --- |
| 3 |

## Common mistakes

- Writing `COUNT(title)` when you meant “all rows” — `COUNT(*)` counts rows; `COUNT(column)` skips `NULL` in that column.
- Expecting a list of titles — `COUNT` returns one number, not the movie names.
- Forgetting `AS` when the grader expects a specific column name like `movie_count`.

## Your turn

Count how many movies are in the table. Return one column named `movie_count`.
