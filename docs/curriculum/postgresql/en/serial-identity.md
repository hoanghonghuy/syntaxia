---
id: pg-03-serial
track: postgresql
locale: en
slug: serial-identity
title: Auto-generated ids with SERIAL
order: 3
published: true
objectives:
  - Insert a row without supplying the id
  - Confirm PostgreSQL filled SERIAL for you
exercise:
  starter: "SELECT id, title FROM movies ORDER BY id;"
  hints:
    - "You do not need to list id — SERIAL fills it."
    - "INSERT only the title column, then let the sandbox verify with SELECT."
    - "Try: INSERT INTO movies (title) VALUES ('Dune');"
  solution: "INSERT INTO movies (title) VALUES ('Dune');"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
      - [3, "Dune"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id SERIAL PRIMARY KEY, title TEXT);"
    - "INSERT INTO movies (title) VALUES ('Inception'), ('The Matrix');"
---

In a paper form, you might leave the “row number” blank and let someone stamp it later. In PostgreSQL, a `SERIAL` column does that for you: each new row gets the next whole number automatically.

| id | title |
| --- | --- |
| 1 | Inception |
| 2 | The Matrix |

The `id` column is `SERIAL`. You insert only `title`; PostgreSQL assigns `id`.

## Worked example

```sql
INSERT INTO movies (title) VALUES ('Dune');
```

- `SERIAL` means “auto-number this column”.
- You omit `id` from the column list and from `VALUES`.
- The next id becomes `3` for `'Dune'`.

After insert, a follow-up `SELECT` shows the new row with its generated id. Modern PostgreSQL also offers `GENERATED … AS IDENTITY`; `SERIAL` is the classic shorthand you will still see often.

## Common mistakes

- Supplying `id` yourself when the lesson asks you to let `SERIAL` fill it.
- Using double quotes for the title (`"Dune"`) — string values use single quotes.
- Running only `SELECT` without `INSERT` — the grader looks for the new row.

## Your turn

Insert a movie with `title = 'Dune'` and let `SERIAL` create the `id`.
