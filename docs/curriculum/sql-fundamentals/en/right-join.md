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
  - Read NULL on the left side as “no match”
  - Find directors with no movies using RIGHT JOIN and IS NULL
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "RIGHT JOIN keeps every director, even when no movie points to them."
    - "After the join, directors with no movies have movies.id as NULL."
    - "Try: SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  solution: "SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Villeneuve"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

`RIGHT JOIN` is the mirror of `LEFT JOIN`: every row from the **right** table is kept. If the left table has no match, left-side columns become `NULL`. Use it when the table you must keep is written on the right of `JOIN`.

**directors** (full table)

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |
| 3 | Villeneuve |

**movies** (full table)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | The Matrix | 1999 | 2 |
| 3 | Interstellar | 2014 | 1 |

| name | Has a movie? |
| --- | --- |
| Nolan | yes (Inception, Interstellar) |
| Wachowski | yes (The Matrix) |
| Villeneuve | no → left side `NULL` |

## Worked example

```sql
SELECT movies.title, directors.name
FROM movies
RIGHT JOIN directors ON movies.director_id = directors.id
ORDER BY directors.name, movies.title;
```

- `RIGHT JOIN directors` keeps every director.
- Villeneuve has no movie, so `movies.title` is `NULL`.
- `WHERE movies.id IS NULL` isolates directors with no films.
- Many teams rewrite this as a `LEFT JOIN` with the tables swapped — same idea.

Result of the full join (before the filter):

| title | name |
| --- | --- |
| Inception | Nolan |
| Interstellar | Nolan |
| The Matrix | Wachowski |
|  | Villeneuve |

Directors with no movies:

| name |
| --- |
| Villeneuve |

## Common mistakes

- Expecting `RIGHT JOIN` to keep unmatched **left** rows — that is `LEFT JOIN`.
- Filtering with `WHERE movies.id = NULL` instead of `IS NULL`.
- Forgetting that `LEFT JOIN` with tables swapped is often clearer than `RIGHT JOIN`.

## Your turn

List the `name` of every director who has no matching movie (`movies.id IS NULL`).
