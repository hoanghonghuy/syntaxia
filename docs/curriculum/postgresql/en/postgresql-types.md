---
id: pg-00-types
track: postgresql
locale: en
slug: postgresql-types
title: Reading PostgreSQL column types
order: 0
published: true
can_do: "Read a PostgreSQL schema as a type contract and inspect the runtime type of stored expressions"
objectives:
  - Distinguish INTEGER, TEXT, NUMERIC, and BOOLEAN by the values they model
  - Read column types as constraints on data meaning
  - Inspect expression types with PostgreSQL pg_typeof
exercise:
  starter: "SELECT name, price FROM catalog;"
  hints:
    - "This task asks what types PostgreSQL sees, not which product rows match a filter."
    - "pg_typeof(expression)::text returns a readable PostgreSQL type name."
    - "Use pg_typeof on id, name, price, and in_stock, alias the four results, and LIMIT 1."
  solution: "SELECT pg_typeof(id)::text AS id_type, pg_typeof(name)::text AS name_type, pg_typeof(price)::text AS price_type, pg_typeof(in_stock)::text AS stock_type FROM catalog LIMIT 1;"
  preview:
    columns: ["id", "name", "price", "in_stock"]
    rows:
      - [1, "Notebook", 13.50, true]
      - [2, "Pencil", 1.25, false]
  expected:
    columns: ["id_type", "name_type", "price_type", "stock_type"]
    rows:
      - ["integer", "text", "numeric", "boolean"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE catalog (id INTEGER, name TEXT, price NUMERIC(8,2), in_stock BOOLEAN);"
    - "INSERT INTO catalog VALUES (1, 'Notebook', 13.50, true), (2, 'Pencil', 1.25, false);"
---

PostgreSQL types are part of the data model. They tell the database—and future developers—what a value means and which operations make sense for it.

## Mental model

Treat a schema as a type contract:

| column | PostgreSQL type | models |
| --- | --- | --- |
| `id` | `INTEGER` | whole-number identifier |
| `name` | `TEXT` | variable-length text |
| `price` | `NUMERIC(8,2)` | exact decimal amount |
| `in_stock` | `BOOLEAN` | true / false / unknown (`NULL`) |

PostgreSQL also exposes `pg_typeof(expression)`, which is useful for inspecting the type the server assigned to an expression.

## Predict before you run

Given the schema above, predict the four type names PostgreSQL should report: `integer`, `text`, `numeric`, and `boolean`.

## Worked example

```sql
SELECT
  pg_typeof(id)::text AS id_type,
  pg_typeof(name)::text AS name_type,
  pg_typeof(price)::text AS price_type,
  pg_typeof(in_stock)::text AS stock_type
FROM catalog
LIMIT 1;
```

| id_type | name_type | price_type | stock_type |
| --- | --- | --- | --- |
| integer | text | numeric | boolean |

`NUMERIC(8,2)` still reports the base type name `numeric`; its precision and scale are type modifiers on the column definition.

## Debug this

If money is stored as `TEXT`, comparisons and arithmetic stop expressing the domain clearly. A value that *looks* numeric is not the same as a column modeled with a numeric type.

```sql
CREATE TABLE bad_catalog (price TEXT);
```

The schema is syntactically valid, but it is a poor contract if prices must be added, compared, and validated as decimal amounts.

## Common mistakes

- Choosing a type only from how a value looks rather than what operations and constraints it needs.
- Treating exact decimal business values as arbitrary text.
- Assuming a quoted literal and a typed value are interchangeable in every context.

## Your turn

Inspect the runtime types of `id`, `name`, `price`, and `in_stock` with `pg_typeof`, returning the four requested aliases.

## Quick check

Why is a database type more than a display format?

**Answer:** it defines data semantics and which operations, comparisons, and constraints PostgreSQL can apply correctly.
