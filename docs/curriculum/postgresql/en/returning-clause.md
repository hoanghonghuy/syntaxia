---
id: pg-10-returning
track: postgresql
locale: en
slug: returning-clause
title: Seeing results with RETURNING
order: 10
published: true
objectives:
  - Append RETURNING to an INSERT
  - Read the values the statement just wrote
exercise:
  starter: "INSERT INTO movies (title) VALUES ('Dune');"
  hints:
    - "RETURNING asks PostgreSQL to send back columns from the new row."
    - "After VALUES, add RETURNING and the column you want to see."
    - "Try: INSERT INTO movies (title) VALUES ('Dune') RETURNING title;"
  solution: "INSERT INTO movies (title) VALUES ('Dune') RETURNING title;"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
sandbox_seed:
  allow_mutations: true
  ddl:
    - "CREATE TEMP TABLE movies (id SERIAL PRIMARY KEY, title TEXT);"
    - "INSERT INTO movies (title) VALUES ('Inception'), ('The Matrix');"
---

After an insert, you often want to see what was stored — especially an auto-generated id. PostgreSQL lets you add `RETURNING` to `INSERT`, `UPDATE`, or `DELETE` so the statement itself returns those columns, like a receipt after a form submit.

| id | title |
| --- | --- |
| 1 | Inception |
| 2 | The Matrix |

## Worked example

```sql
INSERT INTO movies (title) VALUES ('Dune') RETURNING title;
```

- The `INSERT` adds the row as usual.
- `RETURNING title` sends back the title that was just written.
- You can also `RETURNING id, title` to see the generated serial id.

Result of the statement:

| title |
| --- |
| Dune |

## Common mistakes

- Ending the statement after `VALUES` and forgetting `RETURNING`.
- Selecting from the table in a second statement when the task asks for `RETURNING` on the insert.
- Returning a column that was not part of the insert and does not exist.

## Your turn

Insert `'Dune'` into `movies` and return the new `title` with `RETURNING`.
