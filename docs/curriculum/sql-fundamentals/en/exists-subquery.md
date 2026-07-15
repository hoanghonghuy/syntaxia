---
id: sql-27-exists
track: sql-fundamentals
locale: en
slug: exists-subquery
title: Testing related rows with EXISTS
order: 27
published: true
objectives:
  - Use EXISTS with a correlated subquery
  - Return only parent rows that have at least one child match
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "EXISTS checks whether the inner SELECT finds at least one row."
    - "Link the inner movies row to the outer director with m.director_id = d.id."
    - "Try: SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  solution: "SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  preview:
    columns: ["directors.name", "has_movies"]
    rows:
      - ["Nolan", "yes"]
      - ["Villeneuve", "no"]
      - ["Wachowski", "yes"]
  expected:
    columns: ["name"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'The Matrix', 2);"
---

Sometimes you only care whether a related row **exists**, not which one. `EXISTS` runs a small inner query for each outer row and keeps the outer row when the inner query finds at least one match — like checking “does this director have any movie?” without listing the movies.

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |
| 3 | Villeneuve |

**movies**

| id | title | director_id |
| --- | --- |
| 1 | Inception | 1 |
| 2 | The Matrix | 2 |

## Worked example

```sql
SELECT name
FROM directors d
WHERE EXISTS (
  SELECT 1
  FROM movies m
  WHERE m.director_id = d.id
)
ORDER BY name;
```

- The outer query walks each director (`d`).
- The inner query looks for any movie whose `director_id` matches `d.id`.
- Villeneuve has no movies, so `EXISTS` is false for that row.

Result:

| name |
| --- |
| Nolan |
| Wachowski |

## Common mistakes

- Forgetting the correlation (`m.director_id = d.id`) — then every director may match or none may.
- Using `SELECT *` inside `EXISTS` and worrying about columns — `EXISTS` only cares whether any row appears; `SELECT 1` is a clear habit.
- Confusing `EXISTS` with `IN` — both can work here; this lesson practices the `EXISTS` form.

## Your turn

List the `name` of every director who has at least one movie. Order by `name`.
