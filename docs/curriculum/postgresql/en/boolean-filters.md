---
id: pg-04-boolean
track: postgresql
locale: en
slug: boolean-filters
title: BOOLEAN filters and unknown values
order: 4
published: true
can_do: "Filter PostgreSQL BOOLEAN values while distinguishing TRUE, FALSE, and unknown NULL"
objectives:
  - Treat BOOLEAN as true / false with NULL representing unknown
  - Use IS TRUE to select only known-true rows
  - Explain how WHERE handles unknown boolean results
exercise:
  starter: "SELECT name, active FROM members;"
  hints:
    - "The requirement wants only known active members, not false or unknown rows."
    - "IS TRUE is explicit about keeping only TRUE."
    - "Use: SELECT name FROM members WHERE active IS TRUE ORDER BY name;"
  solution: "SELECT name FROM members WHERE active IS TRUE ORDER BY name;"
  preview:
    columns: ["id", "name", "active"]
    rows:
      - [1, "Ana", true]
      - [2, "Ben", false]
      - [3, "Chi", true]
      - [4, "Dee", false]
      - [5, "Eve", null]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Chi"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE members (id INTEGER, name TEXT, active BOOLEAN);"
    - "INSERT INTO members VALUES (1, 'Ana', TRUE), (2, 'Ben', FALSE), (3, 'Chi', TRUE), (4, 'Dee', FALSE), (5, 'Eve', NULL);"
---

A PostgreSQL boolean column can hold known `TRUE`, known `FALSE`, or `NULL` when the state is unknown.

## Mental model

| active | meaning | `active IS TRUE` |
| --- | --- | --- |
| `TRUE` | known active | true |
| `FALSE` | known inactive | false |
| `NULL` | activity state unknown | false |

`WHERE active` is concise and keeps rows where the expression evaluates true. `IS TRUE` is useful while learning because it makes the treatment of NULL explicit.

## Predict before you run

Ana and Chi are known true. Ben and Dee are false; Eve is unknown. Predict exactly Ana and Chi in the result.

## Worked example

```sql
SELECT name
FROM members
WHERE active IS TRUE
ORDER BY name;
```

| name |
| --- |
| Ana |
| Chi |

## Debug this

```sql
WHERE active IS NOT FALSE
```

This includes both TRUE **and NULL**. If the business rule says “confirmed active”, unknown status must not be silently treated as active.

## Common mistakes

- Collapsing NULL into FALSE even when “unknown” has different business meaning.
- Storing boolean state as arbitrary `1/0` conventions when a BOOLEAN column expresses the domain directly.
- Choosing a null-aware predicate without checking whether unknown should be included or excluded.

## Your turn

Return only members whose active state is explicitly true, ordered by name.

## Quick check

Does a NULL boolean mean the same thing as FALSE?

**Answer:** no. FALSE is known false; NULL represents an unknown boolean state.
