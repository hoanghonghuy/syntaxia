---
id: pg-12-jsonb
track: postgresql
locale: en
slug: jsonb-basics
title: Querying structured documents with JSONB
order: 12
published: true
can_do: "Extract JSONB scalar fields and filter documents with JSONB containment while recognizing when relational columns are a better model"
objectives:
  - Distinguish JSONB extraction with -> and ->>
  - Filter documents with the @> containment operator
  - Explain a sensible use boundary for JSONB
exercise:
  starter: "SELECT data FROM profiles;"
  hints:
    - "Filter structured content by asking whether data contains city Hanoi."
    - "Use @> with a JSONB object, then ->> to return name as text."
    - "Use: SELECT data->>'name' AS name FROM profiles WHERE data @> '{\"city\":\"Hanoi\"}'::jsonb ORDER BY name;"
  solution: "SELECT data->>'name' AS name FROM profiles WHERE data @> '{\"city\":\"Hanoi\"}'::jsonb ORDER BY name;"
  preview:
    columns: ["id", "data"]
    rows:
      - [1, "{\"name\":\"Ana\",\"city\":\"Hanoi\"}"]
      - [2, "{\"name\":\"Ben\",\"city\":\"Hue\"}"]
      - [3, "{\"name\":\"Cara\",\"city\":\"Hanoi\"}"]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Cara"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE profiles (id INTEGER, data JSONB);"
    - "INSERT INTO profiles VALUES (1, '{\"name\":\"Ana\",\"city\":\"Hanoi\"}'::jsonb), (2, '{\"name\":\"Ben\",\"city\":\"Hue\"}'::jsonb), (3, '{\"name\":\"Cara\",\"city\":\"Hanoi\"}'::jsonb);"
---

`JSONB` is useful when one relational row genuinely owns a flexible structured document. PostgreSQL can query its structure directly and can index common JSONB search operators.

## Mental model

Keep extraction and filtering separate:

| operator | result |
| --- | --- |
| `data->'name'` | JSON value |
| `data->>'name'` | SQL text |
| `data @> '{"city":"Hanoi"}'::jsonb` | boolean containment test |

With the lesson data, the containment predicate keeps Ana and Cara, then `->>` projects their names as normal text.

JSONB is not a reason to abandon relational modeling. Stable fields that need foreign keys, strong column constraints, joins, or frequent independent updates are often clearer as regular columns/tables.

## Predict before you run

The inner JSON documents for Ana and Cara contain the exact city pair `"city":"Hanoi"`; Ben does not. Predict two names in alphabetical order.

## Worked example

```sql
SELECT data->>'name' AS name
FROM profiles
WHERE data @> '{"city":"Hanoi"}'::jsonb
ORDER BY name;
```

| name |
| --- |
| Ana |
| Cara |

PostgreSQL can support `@>` with GIN indexes when the workload and document shape justify it.

## Debug this

```sql
WHERE data::text LIKE '%Hanoi%'
```

This ignores JSON structure and searches a serialized representation. It can produce accidental matches and cannot express JSON containment semantics as clearly as JSONB operators.

## Common mistakes

- Using `->` when downstream logic expects SQL text from `->>`.
- Treating JSONB as an unstructured dumping ground for fields that should have relational constraints.
- Searching JSON by casting the entire document to text instead of using structural operators.

## Your turn

Return names of profiles whose JSONB data contains city Hanoi, ordered by name.

## Quick check

When is `->>` preferable to `->`?

**Answer:** when you want the extracted JSON scalar as SQL text rather than as a JSON value.
