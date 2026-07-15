---
id: pg-24-tx
track: postgresql
locale: en
slug: transactions-basics
title: "Transactions: all or nothing"
order: 24
published: true
objectives:
  - Explain BEGIN / COMMIT / ROLLBACK in plain words
  - Practice a safe UPDATE (sandbox already wraps one transaction)
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "UPDATE … SET … WHERE … changes one targeted row."
    - "Always include WHERE so you do not update every row."
    - "Try: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2010]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'Interstellar', 2010);"
---

A **transaction** groups several changes so they succeed together or not at all — like saving a whole form only when every field is valid. In PostgreSQL you write:

```sql
BEGIN;
UPDATE …;
COMMIT;   -- keep the changes
-- or ROLLBACK;  -- undo everything since BEGIN
```

- `BEGIN` starts the group.
- `COMMIT` makes the changes permanent.
- `ROLLBACK` discards them.

This learning sandbox already runs each exercise inside one transaction for safety, so you do **not** type `BEGIN`/`COMMIT` in the graded statement. Still, you should know the words: real apps use them when several updates must stay consistent.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Interstellar | 2010 |

## Worked example

```sql
UPDATE movies SET year = 2014 WHERE title = 'Interstellar';
```

- One clear change inside the sandbox transaction.
- `WHERE` limits the update to Interstellar.
- After commit (automatic here), a verify `SELECT` shows the new year.

## Common mistakes

- Omitting `WHERE` and updating every row.
- Trying to grade `BEGIN`/`COMMIT` as the only statement — this exercise grades the `UPDATE`.
- Confusing “transaction” with “table” — a transaction is a unit of work, not a storage object.

## Your turn

Set `year` to `2014` for the movie titled `Interstellar`.
