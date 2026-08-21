---
id: sql-24-union
track: sql-fundamentals
locale: en
slug: union-queries
title: Combining result sets with UNION
order: 24
published: true
can_do: "Stack compatible SELECT results vertically with UNION and predict duplicate elimination"
objectives:
  - Contrast UNION with JOIN
  - Check column-count/type compatibility between UNION inputs
  - Explain why UNION removes duplicate result rows
exercise:
  starter: "SELECT name FROM a;"
  hints:
    - "You need rows from both result sets stacked into one column."
    - "Use UNION between two compatible SELECT name queries; UNION removes duplicate names."
    - "Use: SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  solution: "SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE a (name TEXT);"
    - "CREATE TEMP TABLE b (name TEXT);"
    - "INSERT INTO a VALUES ('Ann'), ('Bob'), ('Cara');"
    - "INSERT INTO b VALUES ('Bob'), ('Cara'), ('Dee');"
---

JOIN and UNION both combine data, but along different axes. JOIN builds **wider rows from related inputs**; UNION stacks **more rows from compatible results**.

## Mental model

Think vertical stacking:

**Result A**: Ann, Bob, Cara  
**Result B**: Bob, Cara, Dee

`UNION` stacks them and then removes duplicate result rows:

| name |
| --- |
| Ann |
| Bob |
| Cara |
| Dee |

The two SELECTs must produce the same number of columns, with corresponding types that can be combined.

## Predict before you run

```sql
SELECT name FROM a
UNION
SELECT name FROM b;
```

There are 3 + 3 input rows, but predict **4 output rows**, because Bob and Cara appear in both inputs and UNION eliminates those duplicates.

## Worked example

```sql
SELECT name FROM a
UNION
SELECT name FROM b
ORDER BY name;
```

| name |
| --- |
| Ann |
| Bob |
| Cara |
| Dee |

`ORDER BY` applies to the combined result. A later lesson uses `UNION ALL` when duplicates must be preserved.

## Debug this

Why can this not form one rectangular result?

```sql
SELECT name FROM a
UNION
SELECT name, age FROM b;
```

The first SELECT produces one column and the second produces two. UNION needs compatible result shapes so every stacked row has the same number of fields.

## Common mistakes

- Confusing UNION (vertical stacking) with JOIN (horizontal relationship matching).
- Assuming UNION preserves duplicates.
- Returning different column counts from the two SELECT branches.

## Your turn

Return one alphabetically sorted unique list of names from `a` and `b`. Predict which duplicate input rows disappear.

## Quick check

If duplicate rows must be preserved, which operator will the later lesson use?

**Answer:** `UNION ALL`.
