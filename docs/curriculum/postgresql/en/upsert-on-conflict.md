---
id: pg-11-upsert
track: postgresql
locale: en
slug: upsert-on-conflict
title: Upsert with ON CONFLICT
order: 11
published: true
objectives:
  - Insert or update in one statement with ON CONFLICT
  - Update an existing row when a unique key already exists
exercise:
  starter: "SELECT code, title FROM movies ORDER BY code;"
  hints:
    - "ON CONFLICT names the unique column that might already exist."
    - "DO UPDATE SET … changes the existing row instead of failing."
    - "Try: INSERT INTO movies (code, title) VALUES ('INC', 'Inception Remastered') ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;"
  solution: "INSERT INTO movies (code, title) VALUES ('INC', 'Inception Remastered') ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;"
  preview:
    columns: ["code", "title"]
    rows:
      - ["INC", "Inception"]
      - ["MTX", "The Matrix"]
  expected:
    columns: ["code", "title"]
    rows:
      - ["INC", "Inception Remastered"]
      - ["MTX", "The Matrix"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT code, title FROM movies ORDER BY code;"
  ddl:
    - "CREATE TEMP TABLE movies (code TEXT PRIMARY KEY, title TEXT);"
    - "INSERT INTO movies VALUES ('INC', 'Inception'), ('MTX', 'The Matrix');"
---

Sometimes you want “insert if new, otherwise update” — like editing a cell if the key already exists in a sheet. PostgreSQL calls this an **upsert**: `INSERT … ON CONFLICT … DO UPDATE`.

| code | title |
| --- | --- |
| INC | Inception |
| MTX | The Matrix |

`code` is unique (primary key). Inserting `'INC'` again would normally fail; `ON CONFLICT` handles that.

## Worked example

```sql
INSERT INTO movies (code, title)
VALUES ('INC', 'Inception Remastered')
ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;
```

- `ON CONFLICT (code)` watches the unique `code` column.
- `DO UPDATE` changes the existing row instead of erroring.
- `EXCLUDED.title` is the title from the row you tried to insert.

After the statement, `INC` shows the new title; `MTX` is unchanged.

## Common mistakes

- Omitting `ON CONFLICT` so a duplicate key raises an error.
- Forgetting `EXCLUDED.` when referring to the proposed insert values.
- Running only `UPDATE` when the lesson asks for the upsert form.

## Your turn

Upsert code `'INC'` with title `'Inception Remastered'` using `ON CONFLICT (code) DO UPDATE`.
