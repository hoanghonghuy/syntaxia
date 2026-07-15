---
id: sql-20-left-join
track: sql-fundamentals
locale: en
slug: left-join
title: Keeping unmatched rows with LEFT JOIN
order: 20
published: true
objectives:
  - Keep every row from the left table even when the right side has no match
  - Find orphan rows with LEFT JOIN and IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "LEFT JOIN keeps every movie, even when director_id has no matching director."
    - "After the join, rows with no director have directors.id as NULL."
    - "Try: SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  solution: "SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  preview:
    columns: ["movies.title", "directors.name"]
    rows:
      - ["Inception", "Nolan"]
      - ["Orphan", null]
  expected:
    columns: ["title"]
    rows:
      - ["Orphan"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'Orphan', NULL);"
---

Sometimes a movie has no director listed yet — like a blank lookup cell in a spreadsheet. `INNER JOIN` would drop that row. `LEFT JOIN` keeps every row from the left table and fills the right side with `NULL` when there is no match.

**movies**

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |
| 2 | Orphan |  |

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |

## Worked example

```sql
SELECT movies.title, directors.name
FROM movies
LEFT JOIN directors ON movies.director_id = directors.id
ORDER BY movies.title;
```

- `LEFT JOIN directors` starts from `movies` and adds matching directors.
- Orphan has no `director_id`, so `directors.name` is `NULL`.
- Filtering with `WHERE directors.id IS NULL` keeps only movies that failed to match.

Result of the full join (before the orphan filter):

| title | name |
| --- | --- |
| Inception | Nolan |
| Orphan |  |

## Common mistakes

- Using `INNER JOIN` when you need unmatched left rows — orphans disappear.
- Writing `WHERE directors.id = NULL` instead of `IS NULL`.
- Joining on `movies.id = directors.id` instead of `movies.director_id = directors.id`.

## Your turn

List the `title` of every movie that has no matching director (`directors.id IS NULL`).
