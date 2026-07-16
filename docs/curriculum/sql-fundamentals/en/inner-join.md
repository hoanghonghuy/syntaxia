---
id: sql-03-join
track: sql-fundamentals
locale: en
slug: inner-join
title: Combining tables with INNER JOIN
order: 19
published: true
objectives:
  - Join two related tables on a shared key
  - Select columns from both tables in one result
  - See that INNER JOIN drops rows with no match
exercise:
  starter: "SELECT movies.title FROM movies;"
  hints:
    - "movies.director_id matches directors.id — that link is the JOIN key."
    - "Use INNER JOIN … ON to connect the two tables."
    - "Try: SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  solution: "SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "The Matrix", 2]
      - [3, "Interstellar", 1]
  expected:
    columns: ["title", "name"]
    rows:
      - ["Inception", "Nolan"]
      - ["Interstellar", "Nolan"]
      - ["The Matrix", "Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

Real data is often split across sheets. One table lists movies; another lists directors. A shared id links them — like a VLOOKUP in a spreadsheet.

**directors** (full table)

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |

**movies** (full table)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | The Matrix | 1999 | 2 |
| 3 | Interstellar | 2014 | 1 |

| title | director_id | Matches director? |
| --- | --- | --- |
| Inception | 1 | Nolan |
| The Matrix | 2 | Wachowski |
| Interstellar | 1 | Nolan |

## Worked example

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors ON movies.director_id = directors.id
ORDER BY movies.title;
```

- `INNER JOIN directors` brings in the second table.
- `ON movies.director_id = directors.id` is the matching rule (the **key**).
- `INNER JOIN` keeps only rows where the link matches on both sides.
- If a movie had `director_id` with no director row, that movie would **disappear** from the result (see the next lesson, `left-join`).

Result:

| title | name |
| --- | --- |
| Inception | Nolan |
| Interstellar | Nolan |
| The Matrix | Wachowski |

## Common mistakes

- Joining on the wrong columns (`movies.id = directors.id`) — here the link is `director_id`, not the movie’s own `id`.
- Selecting only from one table when the task asks for both `title` and `name`.
- Forgetting `ON …` after `JOIN` — SQL needs an explicit match condition for this pattern.

## Your turn

Return each movie `title` with its director `name`, ordered by `movies.title`.
