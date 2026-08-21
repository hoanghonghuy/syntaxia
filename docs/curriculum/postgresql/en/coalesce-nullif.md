---
id: pg-14-coalesce
track: postgresql
locale: en
slug: coalesce-nullif
title: Normalizing missing values with NULLIF and COALESCE
order: 14
published: true
can_do: "Normalize sentinel values to NULL with NULLIF and choose the first usable fallback with COALESCE"
objectives:
  - Turn an empty-string sentinel into NULL with NULLIF
  - Apply COALESCE left-to-right fallback semantics
  - Distinguish data normalization from display fallback
exercise:
  starter: "SELECT name, nickname FROM people;"
  hints:
    - "Treat empty nickname as missing before choosing a fallback."
    - "NULLIF(nickname, '') converts only the empty string to NULL; COALESCE can then use name."
    - "Use: SELECT COALESCE(NULLIF(nickname, ''), name) AS label FROM people ORDER BY id;"
  solution: "SELECT COALESCE(NULLIF(nickname, ''), name) AS label FROM people ORDER BY id;"
  preview:
    columns: ["id", "name", "nickname"]
    rows:
      - [1, "Ana Nguyen", "Ana"]
      - [2, "Ben Tran", null]
      - [3, "Chi Le", ""]
  expected:
    columns: ["label"]
    rows:
      - ["Ana"]
      - ["Ben Tran"]
      - ["Chi Le"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE people (id INTEGER, name TEXT, nickname TEXT);"
    - "INSERT INTO people VALUES (1, 'Ana Nguyen', 'Ana'), (2, 'Ben Tran', NULL), (3, 'Chi Le', '');"
---

Real datasets often contain more than one representation of “no useful value”. `NULLIF` and `COALESCE` can be composed to normalize a sentinel and then choose a fallback.

## Mental model

Evaluate from the inside out:

```text
nickname -> NULLIF(nickname, '') -> normalized nickname or NULL
         -> COALESCE(..., name)  -> first non-NULL value
```

| person | nickname | after `NULLIF(...,'')` | final label |
| --- | --- | --- | --- |
| Ana | `Ana` | `Ana` | Ana |
| Ben | NULL | NULL | Ben Tran |
| Chi | empty string | NULL | Chi Le |

## Predict before you run

Predict labels in id order: Ana, Ben Tran, Chi Le.

## Worked example

```sql
SELECT COALESCE(NULLIF(nickname, ''), name) AS label
FROM people
ORDER BY id;
```

| label |
| --- |
| Ana |
| Ben Tran |
| Chi Le |

`NULLIF(a,b)` returns NULL when `a = b`; otherwise it returns `a`. `COALESCE` then returns the first non-NULL expression.

## Debug this

```sql
COALESCE(nickname, name)
```

This handles actual NULL but not the empty string, because `''` is a known non-NULL value and therefore wins immediately. Normalize known sentinel values deliberately if your domain treats them as missing.

## Common mistakes

- Assuming empty text and NULL have the same semantics automatically.
- Reversing COALESCE argument priority so the fallback always wins.
- Using display-time normalization to hide a data-quality issue that should actually be fixed at ingestion/schema boundaries.

## Your turn

Return a `label` that prefers a non-empty nickname and otherwise falls back to name.

## Quick check

Why does plain `COALESCE(nickname, name)` not replace an empty string nickname?

**Answer:** because an empty string is non-NULL, so COALESCE considers it a valid first value.
