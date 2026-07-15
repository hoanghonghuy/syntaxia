---
id: pg-13-array
track: postgresql
locale: en
slug: array-basics
title: Filtering with arrays
order: 13
published: true
objectives:
  - Store a list of values in an ARRAY column
  - Test membership with ANY
exercise:
  starter: "SELECT title, tags FROM courses;"
  hints:
    - "ANY checks whether a value appears in an array."
    - "Put the search value on the left: 'sql' = ANY(tags)."
    - "Try: SELECT title FROM courses WHERE 'sql' = ANY(tags);"
  solution: "SELECT title FROM courses WHERE 'sql' = ANY(tags);"
  preview:
    columns: ["id", "title", "tags"]
    rows:
      - [1, "SQL Basics", "{sql,beginner}"]
      - [2, "Vue Intro", "{vue,frontend}"]
      - [3, "Postgres Tips", "{sql,postgres}"]
  expected:
    columns: ["title"]
    rows:
      - ["SQL Basics"]
      - ["Postgres Tips"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE courses (id INTEGER, title TEXT, tags TEXT[]);"
    - "INSERT INTO courses VALUES (1, 'SQL Basics', ARRAY['sql','beginner']), (2, 'Vue Intro', ARRAY['vue','frontend']), (3, 'Postgres Tips', ARRAY['sql','postgres']);"
---

A tag list is often several labels on one row. PostgreSQL can store that as an **array** column (`TEXT[]`). To ask “does this list contain `sql`?”, use `= ANY(tags)`.

| id | title | tags |
| --- | --- | --- |
| 1 | SQL Basics | sql, beginner |
| 2 | Vue Intro | vue, frontend |
| 3 | Postgres Tips | sql, postgres |

## Worked example

```sql
SELECT title FROM courses WHERE 'sql' = ANY(tags);
```

- `tags` is a `TEXT[]` array column.
- `'sql' = ANY(tags)` is true when `sql` appears somewhere in the array.
- Vue Intro is excluded because its tags do not include `sql`.

Result:

| title |
| --- |
| SQL Basics |
| Postgres Tips |

## Common mistakes

- Writing `tags = 'sql'` — that compares the whole array to one string.
- Putting `ANY` on the wrong side of the comparison.
- Using comma-separated text instead of a real array type.

## Your turn

Return the `title` of every course whose `tags` array contains `'sql'`.
