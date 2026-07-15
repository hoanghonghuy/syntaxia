---
id: sql-21-right-join
track: sql-fundamentals
locale: en
slug: right-join
title: Keeping unmatched rows with RIGHT JOIN
order: 21
published: true
objectives:
  - Keep every row from the right table even when the left side has no match
  - Find directors with no movies using RIGHT JOIN and IS NULL
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "RIGHT JOIN keeps every director, even when no movie points to them."
    - "After the join, directors with no movies have movies.id as NULL."
    - "Try: SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  solution: "SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  preview:
    columns: ["movies.title", "directors.name"]
    rows:
      - ["Inception", "Nolan"]
      - ["The Matrix", "Wachowski"]
      - [null, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Villeneuve"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'The Matrix', 2);"
---

`RIGHT JOIN` is the mirror of `LEFT JOIN`: every row from the **right** table is kept. If the left table has no match, left-side columns become `NULL`. Use it when the table you must keep is written on the right of `JOIN`.

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |
| 3 | Villeneuve |

**movies**

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |
| 2 | The Matrix | 2 |

## Worked example

```sql
SELECT movies.title, directors.name
FROM movies
RIGHT JOIN directors ON movies.director_id = directors.id
ORDER BY directors.name;
```

- `RIGHT JOIN directors` keeps every director.
- Villeneuve has no movie, so `movies.title` is `NULL`.
- `WHERE movies.id IS NULL` isolates directors with no films.

Result of the full join (before the filter):

| title | name |
| --- | --- |
| Inception | Nolan |
| The Matrix | Wachowski |
|  | Villeneuve |

## Common mistakes

- Expecting `RIGHT JOIN` to keep unmatched **left** rows — that is `LEFT JOIN`.
- Filtering with `WHERE movies.id = NULL` instead of `IS NULL`.
- Forgetting that many teams rewrite a `RIGHT JOIN` as a `LEFT JOIN` with the tables swapped — both ideas are valid.

## Your turn

List the `name` of every director who has no matching movie (`movies.id IS NULL`).
