---
id: sql-33-fk
track: sql-fundamentals
locale: en
slug: foreign-key
title: Foreign keys
order: 33
published: true
can_do: "Trace a foreign-key reference from child to parent and insert only references that preserve referential integrity"
objectives:
  - Distinguish child identity from a parent reference
  - Trace director_id to directors.id
  - Predict valid and invalid foreign-key inserts
exercise:
  starter: "INSERT INTO movies (id, title, director_id) VALUES "
  hints:
    - "director_id must reference an id that already exists in directors."
    - "The parent table contains Nolan at directors.id = 1."
    - "Use: INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);"
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

A foreign key protects a relationship between tables. It says a reference stored in a child row must point to a valid key in the parent table.

## Mental model

Relationship:

```text
movies.director_id  ----references---->  directors.id
```

Parent data:

| directors.id | name |
| ---: | --- |
| 1 | Nolan |

Evaluate candidate child rows:

| movie id | director_id | valid? | reason |
| ---: | ---: | --- | --- |
| 1 | 1 | yes | parent key 1 exists |
| 2 | 99 | no | no director 99 |

`movies.id` is the movie's own identity. `movies.director_id` is a reference to someone else's identity.

## Predict before you run

Predict whether an Inception row with `director_id = 1` passes the relationship contract, then predict the same row with `director_id = 99`.

## Worked example

```sql
INSERT INTO movies (id, title, director_id)
VALUES (1, 'Inception', 1);
```

The foreign key accepts the row because parent key `directors.id = 1` already exists.

## Debug this

```sql
INSERT INTO movies (id, title, director_id)
VALUES (1, 'Inception', 99);
```

The SQL shape is valid, but referential integrity fails. Debug foreign-key errors by tracing the child reference to the exact parent key it claims exists.

## Common mistakes

- Confusing a row's own primary key with its foreign-key reference.
- Referencing a parent id that has not been inserted.
- Thinking a foreign key copies the parent row; it stores a key relationship, not duplicated parent data.

## Your turn

Insert Inception with movie `id = 1` and `director_id = 1`. Trace the reference to Nolan before running.

## Quick check

Which table must contain `director_id = 1` as a valid parent key before the movie insert succeeds?

**Answer:** `directors`, specifically `directors.id = 1`.
