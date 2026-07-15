---
id: sql-32-pk
track: sql-fundamentals
locale: en
slug: primary-key
title: Primary keys
order: 32
published: true
objectives:
  - Explain what a PRIMARY KEY does
  - Insert a row that respects the primary key
exercise:
  starter: "INSERT INTO actors (id, name) VALUES "
  hints:
    - "A primary key uniquely identifies each row — often an id."
    - "Insert one row with a unique id and a name."
    - "Try: INSERT INTO actors (id, name) VALUES (1, 'Ada');"
  solution: "INSERT INTO actors (id, name) VALUES (1, 'Ada');"
  preview:
    columns: ["id", "name"]
    rows: []
  expected:
    columns: ["id", "name"]
    rows:
      - [1, "Ada"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, name FROM actors ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE actors (id INT PRIMARY KEY, name TEXT);"
---

A **primary key** is a column (or set of columns) that uniquely identifies each row — like an employee ID that must never repeat.

```sql
CREATE TABLE actors (
  id INT PRIMARY KEY,
  name TEXT
);
```

- `PRIMARY KEY` on `id` means every row needs a non-null `id`.
- Two rows cannot share the same `id`.
- Databases use the key to find a row quickly and to link tables later.

Empty `actors` table in this sandbox (already created with a primary key on `id`):

| id | name |
| --- | --- |
|  |  |

Your task is not to create the key — it is already there. Insert one valid row.

## Worked example

```sql
INSERT INTO actors (id, name) VALUES (1, 'Ada');
```

- `id = 1` satisfies the primary key (unique and not null).
- A second insert with `id = 1` would fail — duplicate key.
- `name` is ordinary text; it is not the primary key here.

## Common mistakes

- Inserting the same `id` twice — the primary key rejects duplicates.
- Leaving `id` out or setting it to `NULL` — primary keys require a value.
- Trying to `ALTER` or recreate the table — the sandbox already defined the key.

## Your turn

Insert actor `id = 1`, `name = 'Ada'` into `actors`.
