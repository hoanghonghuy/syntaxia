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
  - Link inner and outer rows with a shared key
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "EXISTS checks whether the inner SELECT finds at least one row."
    - "Link the inner movies row to the outer director with m.director_id = d.id."
    - "Try: SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  solution: "SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2);"
---

Sometimes you only care whether a related row **exists**, not which one. `EXISTS` runs a small inner query for each outer row and keeps the outer row when the inner query finds at least one match — like checking “does this director have any movie?” without listing the movies.

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
| 2 | Interstellar | 2014 | 1 |
| 3 | The Matrix | 1999 | 2 |

| name | Any movie? | `EXISTS`? |
| --- | --- | --- |
| Nolan | Inception, Interstellar | true |
| Wachowski | The Matrix | true |
| Villeneuve | none | false |

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
- `SELECT 1` inside `EXISTS` is enough — only “any row?” matters, not the columns.

Result:

| name |
| --- |
| Nolan |
| Wachowski |

## Common mistakes

- Forgetting the correlation (`m.director_id = d.id`) — then every director may match or none may.
- Using `SELECT *` inside `EXISTS` and worrying about columns — `EXISTS` only cares whether any row appears; `SELECT 1` is a clear habit.
- Confusing `EXISTS` with `IN` — both can work here; this lesson practices the `EXISTS` form.
- Comparing many values at once with `ANY` / `ALL` is covered later in `any-all-subquery`.

## Your turn

List the `name` of every director who has at least one movie. Order by `name`.
