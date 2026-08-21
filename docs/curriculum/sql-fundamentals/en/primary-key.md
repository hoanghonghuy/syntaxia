---
id: sql-32-pk
track: sql-fundamentals
locale: en
slug: primary-key
title: Primary keys
order: 32
published: true
can_do: "Reason about row identity and insert data that satisfies PRIMARY KEY uniqueness and non-null requirements"
objectives:
  - Treat a primary key as stable row identity
  - Predict duplicate and NULL key violations
  - Insert a row that satisfies the key contract
exercise:
  starter: "INSERT INTO actors (id, name) VALUES "
  hints:
    - "The id column is the row identity and must be unique and non-null."
    - "The empty table can accept id 1 exactly once."
    - "Use: INSERT INTO actors (id, name) VALUES (1, 'Ada');"
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

A primary key is not merely “an indexed column”. Its main job is **row identity**: each row must be distinguishable by a key value that is present and unique.

## Mental model

```sql
CREATE TABLE actors (
  id INT PRIMARY KEY,
  name TEXT
);
```

| Candidate row | Valid? | Reason |
| --- | --- | --- |
| `(1, 'Ada')` | yes | first use of key 1 |
| `(1, 'Grace')` after Ada | no | duplicate identity |
| `(NULL, 'Linus')` | no | primary key cannot be NULL |

The key belongs to the row's identity; descriptive fields such as `name` can change without changing which row it is.

## Predict before you run

The table is empty. Predict whether `id = 1` can be inserted once, then whether the same id could be inserted again.

## Worked example

```sql
INSERT INTO actors (id, name)
VALUES (1, 'Ada');
```

| id | name |
| ---: | --- |
| 1 | Ada |

The prepared schema enforces the key; your INSERT does not need to repeat `PRIMARY KEY`.

## Debug this

If the table already contained `id = 1`, this would fail:

```sql
INSERT INTO actors (id, name) VALUES (1, 'Grace');
```

The problem is not that Grace duplicates a name; the identity value `1` already belongs to another row.

## Common mistakes

- Thinking duplicate primary-key values are acceptable if other columns differ.
- Treating a nullable descriptive column as equivalent to row identity.
- Recreating the constraint in an INSERT instead of satisfying the schema that already enforces it.

## Your turn

Insert actor `id = 1`, `name = 'Ada'`. Explain why this id is valid in the current empty table.

## Quick check

Can two primary-key rows share the same key value?

**Answer:** no. A primary key uniquely identifies each row and cannot be NULL.
