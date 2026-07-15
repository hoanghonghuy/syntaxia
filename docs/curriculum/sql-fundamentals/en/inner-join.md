---
id: sql-03-join
track: sql-fundamentals
locale: en
slug: inner-join
title: Combining tables with INNER JOIN
order: 19
published: true
objectives:
  - Join two related tables on a key
  - Select columns from both tables
exercise:
  starter: "SELECT movies.title FROM movies;"
  hints:
    - "movies.director_id matches directors.id — that link is the JOIN key."
    - "Use INNER JOIN … ON to connect the two tables."
    - "Try: SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id;"
  solution: "SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id;"
  preview:
    columns: ["movies.title", "directors.name"]
    rows:
      - ["Inception", "Nolan"]
      - ["The Matrix", "Wachowski"]
  expected:
    columns: ["title", "name"]
    rows:
      - ["Inception", "Nolan"]
      - ["The Matrix", "Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'The Matrix', 2);"
---

Real data is often split across sheets. One table lists movies; another lists directors. A shared id links them — like a VLOOKUP in a spreadsheet.

**movies**

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |
| 2 | The Matrix | 2 |

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |

## Worked example

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors ON movies.director_id = directors.id;
```

- `INNER JOIN directors` brings in the second table.
- `ON movies.director_id = directors.id` is the matching rule (the **key**).
- `INNER JOIN` keeps only rows where the link matches on both sides.

Result:

| title | name |
| --- | --- |
| Inception | Nolan |
| The Matrix | Wachowski |

## Common mistakes

- Joining on the wrong columns (`movies.id = directors.id`) — here the link is `director_id`, not the movie’s own `id`.
- Selecting only from one table when the task asks for both `title` and `name`.
- Forgetting `ON …` after `JOIN` — SQL needs an explicit match condition for this pattern.

## Your turn

Return each movie `title` with its director `name`.
