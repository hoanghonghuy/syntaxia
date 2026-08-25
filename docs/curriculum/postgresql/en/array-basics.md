---
id: pg-13-array
track: postgresql
locale: en
slug: array-basics
title: Array membership with ANY
order: 13
published: true
can_do: "Model a small same-type list with a PostgreSQL array and test element membership with operator ANY(array)"
objectives:
  - Read TEXT[] as an array of text values
  - Evaluate scalar = ANY(array) membership
  - Recognize when a related table is better than an array column
exercise:
  starter: "SELECT title, tags FROM courses;"
  hints:
    - "The question is whether one scalar value sql equals any element of tags."
    - "Put the scalar on the left and ANY(tags) on the right."
    - "Use: SELECT title FROM courses WHERE 'sql' = ANY(tags) ORDER BY title;"
  solution: "SELECT title FROM courses WHERE 'sql' = ANY(tags) ORDER BY title;"
  preview:
    columns: ["id", "title", "tags"]
    rows:
      - [1, "SQL Basics", "{sql,beginner}"]
      - [2, "Vue Intro", "{vue,frontend}"]
      - [3, "Postgres Tips", "{sql,postgres}"]
  expected:
    columns: ["title"]
    rows:
      - ["Postgres Tips"]
      - ["SQL Basics"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE courses (id INTEGER, title TEXT, tags TEXT[]);"
    - "INSERT INTO courses VALUES (1, 'SQL Basics', ARRAY['sql','beginner']), (2, 'Vue Intro', ARRAY['vue','frontend']), (3, 'Postgres Tips', ARRAY['sql','postgres']);"
---

PostgreSQL arrays can model a small ordered collection of values of the same type inside one row. For membership, the scalar-versus-array form of `ANY` compares the scalar to each element.

## Mental model

```sql
'sql' = ANY(tags)
```

means conceptually:

```text
'sql' = tags[1] OR 'sql' = tags[2] OR ...
```

Trace the rows:

| course | tags | contains sql? |
| --- | --- | --- |
| SQL Basics | `{sql,beginner}` | yes |
| Vue Intro | `{vue,frontend}` | no |
| Postgres Tips | `{sql,postgres}` | yes |

Arrays are useful, but a many-to-many entity with its own attributes, constraints, ownership, or frequent independent queries usually deserves a related table rather than an ever-growing array column.

## Predict before you run

Predict two matching titles, then order them alphabetically: Postgres Tips, SQL Basics.

## Worked example

```sql
SELECT title
FROM courses
WHERE 'sql' = ANY(tags)
ORDER BY title;
```

| title |
| --- |
| Postgres Tips |
| SQL Basics |

## Debug this

```sql
WHERE tags = 'sql'
```

The left side is an array while the right side is one text scalar. The requirement is membership, not whole-array equality.

## Common mistakes

- Confusing whole-array equality with element membership.
- Storing comma-separated text and losing array semantics.
- Using an array where normalized related rows need their own keys, metadata, or constraints.

## Your turn

Return course titles whose tags array contains `sql`, ordered by title.

## Quick check

What question does `'sql' = ANY(tags)` answer?

**Answer:** whether at least one element of `tags` equals the text value `sql`.
