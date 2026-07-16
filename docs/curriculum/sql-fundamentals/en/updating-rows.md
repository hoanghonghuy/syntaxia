---
id: sql-07-update
track: sql-fundamentals
locale: en
slug: updating-rows
title: Changing rows with UPDATE
order: 10
published: true
objectives:
  - Change existing values with UPDATE
  - Always target rows with WHERE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "UPDATE ... SET column = value WHERE condition."
    - "Always include WHERE so you change only the intended row."
    - "Try: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "Interstellar", 2010, "Nolan"]
      - [3, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
      - [3, "The Matrix", 1999]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'Interstellar', 2010, 'Nolan'), (3, 'The Matrix', 1999, 'Wachowski');"
---

`UPDATE` edits cells that already exist. Always use `WHERE` — without it you would change **every** row.

**movies** — before the fix (Interstellar year is wrong: 2010)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | Interstellar | 2010 | Nolan |
| 3 | The Matrix | 1999 | Wachowski |

Interstellar should be **2014**. Only that one cell should change.

## Worked example

```sql
UPDATE movies
SET year = 2014
WHERE title = 'Interstellar';
```

- `SET year = 2014` is the new value.
- `WHERE title = 'Interstellar'` limits the change to one row.
- Inception stays at 2010; The Matrix stays at 1999; only Interstellar becomes 2014.

**movies** — after the update (what the checker reads)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Interstellar | 2014 |
| 3 | The Matrix | 1999 |

## Common mistakes

- Omitting `WHERE` — that updates every row’s `year` to 2014.
- Matching the title with the wrong quotes or spelling (`Intersteller`).
- Using `INSERT` instead of `UPDATE` when the row already exists.

## Your turn

Set `year` to `2014` for the movie titled `Interstellar`.
