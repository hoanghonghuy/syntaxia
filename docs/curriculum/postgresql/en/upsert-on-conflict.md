---
id: pg-11-upsert
track: postgresql
locale: en
slug: upsert-on-conflict
title: Atomic upserts with ON CONFLICT
order: 11
published: true
can_do: "Use INSERT ... ON CONFLICT to define an atomic alternative when a unique key conflicts"
objectives:
  - Identify the unique key acting as conflict arbiter
  - Distinguish proposed EXCLUDED values from the existing row
  - Verify the final state after DO UPDATE
exercise:
  starter: "SELECT code, title FROM movies ORDER BY code;"
  hints:
    - "code is the primary key, so inserting INC again hits that conflict target."
    - "EXCLUDED.title refers to the title from the proposed insert row."
    - "Use: INSERT INTO movies (code, title) VALUES ('INC', 'Inception Remastered') ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;"
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

An upsert means “try to insert; if a declared uniqueness conflict happens, take an alternative action”. PostgreSQL's `ON CONFLICT` makes that decision inside one write statement.

## Mental model

Proposed row:

```text
(code='INC', title='Inception Remastered')
```

Existing state already contains `code='INC'`. The primary key is the conflict arbiter, so PostgreSQL takes the `DO UPDATE` path.

Inside that path:

| reference | means |
| --- | --- |
| `movies.title` | value on the existing conflicting row |
| `EXCLUDED.title` | value from the row we attempted to insert |

## Predict before you run

Predict the complete after-state: INC changes to `Inception Remastered`; MTX remains untouched. No duplicate INC row is created.

## Worked example

```sql
INSERT INTO movies (code, title)
VALUES ('INC', 'Inception Remastered')
ON CONFLICT (code)
DO UPDATE SET title = EXCLUDED.title;
```

| code | title |
| --- | --- |
| INC | Inception Remastered |
| MTX | The Matrix |

The conflict handling is part of the INSERT operation, which is important when concurrent writes make “check first, then insert/update” application logic unsafe.

## Debug this

```text
SELECT whether INC exists -> application decides UPDATE or INSERT
```

Between the read and the later write, another transaction can change the state. A uniqueness constraint plus `ON CONFLICT` lets PostgreSQL arbitrate the conflict at write time.

## Common mistakes

- Choosing a conflict target that is not backed by a suitable uniqueness rule.
- Confusing `EXCLUDED` proposed values with values already stored in the target row.
- Implementing a fragile read-then-write upsert in application code when database conflict handling fits the requirement.

## Your turn

Upsert `INC` so its title becomes `Inception Remastered`, then verify MTX stayed unchanged.

## Quick check

What does `EXCLUDED.title` mean inside `DO UPDATE`?

**Answer:** the title value from the row that was proposed for insertion but conflicted.
