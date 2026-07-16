---
id: sql-33-fk
track: sql-fundamentals
locale: en
slug: foreign-key
title: Foreign keys
order: 33
published: true
objectives:
  - Explain how a FOREIGN KEY links tables
  - Insert a child row that references a valid parent
  - See why unknown parent ids are rejected
exercise:
  starter: "INSERT INTO movies (id, title, director_id) VALUES "
  hints:
    - "A foreign key points at a primary key in another table."
    - "directors already has id = 1 ('Nolan') — use that director_id."
    - "Try: INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);"
  solution: "INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies;"
  ddl:
    - "CREATE TEMP TABLE directors (id INT PRIMARY KEY, name TEXT);"
    - "INSERT INTO directors VALUES (1, 'Nolan');"
    - "CREATE TEMP TABLE movies (id INT PRIMARY KEY, title TEXT, director_id INT REFERENCES directors(id));"
---

A **foreign key** is a column that points to a primary key in another table — like writing an employee ID on a timesheet so each line ties back to one person.

**directors** (parent — already filled)

| id | name |
| --- | --- |
| 1 | Nolan |

**movies** (child — empty; `director_id` must match a `directors.id`)

| id | title | director_id |
| --- | --- | --- |
|  |  |  |

```sql
CREATE TABLE movies (
  id INT PRIMARY KEY,
  title TEXT,
  director_id INT REFERENCES directors(id)
);
```

| `director_id` | Allowed? |
| --- | --- |
| 1 | yes — Nolan exists |
| 99 | no — no such director |
| NULL | depends on column nullability (not used in this exercise) |

Both tables already exist in the sandbox; `directors` already has Nolan.

## Worked example

```sql
INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);
```

- `id = 1` is this movie’s own primary key.
- `director_id = 1` matches Nolan in `directors`.
- The foreign key accepts the row because the parent key exists.

Result in `movies`:

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |

## Common mistakes

- Using a `director_id` that is not in `directors` — the foreign key rejects it.
- Confusing the movie `id` with `director_id` — they are different columns.
- Trying to insert into `directors` instead of `movies`.

## Your turn

Insert movie `id = 1`, `title = 'Inception'`, `director_id = 1`.
