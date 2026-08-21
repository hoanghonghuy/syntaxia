---
id: sql-37-union-all
track: sql-fundamentals
locale: en
slug: union-all
title: Keeping duplicates with UNION ALL
order: 37
published: true
can_do: "Choose UNION ALL when combining compatible result sets must preserve every source row, including duplicates"
objectives:
  - Stack compatible result sets vertically
  - Predict duplicate preservation with UNION ALL
  - Choose UNION versus UNION ALL from result semantics
exercise:
  starter: "SELECT name FROM east;"
  hints:
    - "The requirement says keep every source row, including repeated Ann."
    - "Stack the two compatible SELECTs with UNION ALL."
    - "Use: SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  solution: "SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE east (id INT, name TEXT);"
    - "CREATE TEMP TABLE west (id INT, name TEXT);"
    - "INSERT INTO east VALUES (1, 'Ann'), (2, 'Bo');"
    - "INSERT INTO west VALUES (1, 'Ann'), (2, 'Cy');"
---

`UNION` and `UNION ALL` both combine rows **vertically**. The decision is whether duplicate result rows are part of the data you must preserve.

## Mental model

Source results:

| east | west |
| --- | --- |
| Ann | Ann |
| Bo | Cy |

After stacking:

| operation | output rows | count |
| --- | --- | ---: |
| `UNION` | Ann, Bo, Cy | 3 |
| `UNION ALL` | Ann, Ann, Bo, Cy | 4 |

Contrast this with a JOIN: JOIN combines related columns horizontally; UNION-family operators stack compatible row shapes.

## Predict before you run

The same name `Ann` appears in both sources. Because the requirement says every occurrence matters, predict **4 rows**, not 3.

## Worked example

```sql
SELECT name FROM east
UNION ALL
SELECT name FROM west
ORDER BY name;
```

| name |
| --- |
| Ann |
| Ann |
| Bo |
| Cy |

Choose semantics first. `UNION ALL` can also avoid duplicate-elimination work, but performance is not a reason to silently change required result semantics.

## Debug this

```sql
SELECT name FROM east
UNION
SELECT name FROM west;
```

The query runs, but one Ann disappears. This is a logical data-loss bug when duplicate occurrences represent meaningful source rows.

## Common mistakes

- Using `UNION` by habit when duplicates must be preserved.
- Combining SELECTs with incompatible column counts/shapes.
- Confusing vertical stacking with JOIN-based relationship matching.

## Your turn

Combine every name from `east` and `west`, keep both Ann rows, and order the final result by name.

## Quick check

If duplicate rows must remain observable, which operator should you reach for first?

**Answer:** `UNION ALL`.
