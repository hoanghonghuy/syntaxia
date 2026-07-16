# SQL Fundamentals — full path + closure

## Purpose

Define **what one lesson is**, the **complete learner path** for `sql-fundamentals` (existing + new), and the **polish pass** for lessons already published — so work stays one track until this track is truly closed.

**Status:** **locked** (owner confirm 2026-07-16).  
**Research base:** `/opsx-research` 2026-07-16 + W3Schools SQL Tutorial sidebar.

## When to use

- Before adding or rewriting any Fundamentals lesson
- Before marking SQL Fundamentals “closed”
- When deciding Fundamentals vs PostgreSQL ownership

---

## What counts as **one lesson** (locked)

One slug = **one concept**. Must ship **en + vi** together. Shape = Depth B ([`curriculum-pedagogy.md`](./curriculum-pedagogy.md)):

| # | Part | Required |
|---|------|----------|
| 1 | Frontmatter `title` only (no body `#` H1) | yes |
| 2 | Plain-language hook + **full** sample Markdown table(s) (every column used in the lesson; name each table) | yes |
| 3 | `## Worked example` / `## Ví dụ mẫu` + keyword gloss + **result table** showing the answer rows | yes |
| 4 | `## Common mistakes` / `## Lỗi thường gặp` (2–3) | yes |
| 5 | `## Your turn` / `## Thử ngay` pointing at sandbox | yes |
| 6 | `exercise`: starter, **3 hints**, solution, preview, expected | yes |
| 7 | `sandbox_seed` (TEMP DDL; `allow_mutations` + `verify_sql` if DML) | yes |
| 8 | Objectives (2–3) | yes |

**Do not** merge two W3 chapters into one lesson unless both are tiny and share one exercise (exception already used: AND/OR/NOT).

---

## Full path after closure (**42 lessons**)

Orders **0–35** = current published set (keep slugs/ids).  
Orders **36–41** = closure additions (portable W3 gaps only).

### Block A — Intro & SELECT (0–7)

| Order | Slug | Topic (W3 map) | Work |
|------:|------|----------------|------|
| 0 | `what-is-sql` | Intro | polish |
| 1 | `sql-syntax` | Syntax | polish |
| 2 | `select-queries` | Select | polish |
| 3 | `select-distinct` | Select Distinct | polish |
| 4 | `filtering-with-where` | Where | polish |
| 5 | `and-or-not` | And / Or / Not | polish |
| 6 | `order-by` | Order By | polish |
| 7 | `limit-rows` | Select Top / LIMIT | polish |

### Block B — NULL & DML (8–11)

| Order | Slug | Topic | Work |
|------:|------|-------|------|
| 8 | `null-values` | Null Values | polish |
| 9 | `inserting-rows` | Insert Into | polish |
| 10 | `updating-rows` | Update | polish |
| 11 | `deleting-rows` | Delete | polish |

### Block C — Aggregates & filters (12–18)

| Order | Slug | Topic | Work |
|------:|------|-------|------|
| 12 | `min-and-max` | Min and Max | polish |
| 13 | `count-rows` | Count | polish |
| 14 | `sum-and-avg` | Sum / Avg | polish |
| 15 | `like-pattern` | Like | polish (+ cross-link wildcards) |
| 16 | `in-list` | In | polish |
| 17 | `between-range` | Between | polish |
| 18 | `column-aliases` | Aliases | polish |

### Block D — Joins & set ops (19–25)

| Order | Slug | Topic | Work |
|------:|------|-------|------|
| 19 | `inner-join` | Inner Join | polish |
| 20 | `left-join` | Left Join | polish |
| 21 | `right-join` | Right Join | polish |
| 22 | `full-join` | Full Join | polish |
| 23 | `self-join` | Self Join | polish |
| 24 | `union-queries` | Union | polish (+ contrast UNION ALL) |
| 25 | `group-by-aggregate` | Group By | polish |

### Block E — Advanced query (26–28)

| Order | Slug | Topic | Work |
|------:|------|-------|------|
| 26 | `having-filter` | Having | polish |
| 27 | `exists-subquery` | Exists | polish |
| 28 | `case-expression` | Case | polish |

### Block F — Schema (29–35)

| Order | Slug | Topic | Work |
|------:|------|-------|------|
| 29 | `creating-tables` | Create Table | polish |
| 30 | `alter-table` | Alter Table | polish |
| 31 | `drop-table` | Drop Table | polish |
| 32 | `primary-key` | Primary Key | polish |
| 33 | `foreign-key` | Foreign Key | polish |
| 34 | `create-index` | Create Index | polish |
| 35 | `create-view` | Create View | polish |

### Block G — Closure (new, 36–41)

| Order | Slug | Topic (W3 map) | Work |
|------:|------|----------------|------|
| 36 | `sql-wildcards` | Wildcards (`%`, `_`) | **new** |
| 37 | `union-all` | Union All | **new** |
| 38 | `insert-into-select` | Insert Into Select | **new** |
| 39 | `any-all-subquery` | Any, All | **new** |
| 40 | `table-constraints` | Constraints (UNIQUE / CHECK / DEFAULT) | **new** |
| 41 | `sql-comments` | Comments (`--`, `/* */`) | **new** |

**Total published target:** **42** lessons × en/vi.

---

## Out of scope (still deferred)

Do **not** add to Fundamentals:

- Stored procedures / CREATE PROCEDURE  
- SELECT INTO (vendor-specific)  
- SQL injection essay  
- MySQL-only / SQL Server-only function catalogs  
- CREATE DATABASE / DROP DATABASE / BACKUP  
- Postgres-only (ILIKE, JSONB, WINDOW, CTE, …) → `postgresql` track  

---

## Polish pass — “hoàn thiện lại bài đã có”

For **every** order 0–35 (en + vi), one checklist row per lesson:

1. **Concept clarity** — hook + table still match the single concept; no second concept sneaking in.  
2. **Worked example** — one canonical query; gloss matches keywords used in exercise.  
3. **Exercise quality** — starter is incomplete enough to practice; expected grades; 3 hints escalate; solution matches expected.  
4. **Seed realism** — TEMP tables enough to show the concept (joins need ≥2 tables; aggregates need enough rows).  
5. **Your turn** — points at sandbox, not “read and mark complete”.  
6. **Cross-links** — after new lessons land: `like-pattern` ↔ `sql-wildcards`; `union-queries` ↔ `union-all`; `creating-tables` / keys ↔ `table-constraints`; `exists-subquery` ↔ `any-all-subquery`.  
7. **i18n** — vi body + hints same depth as en (not a thin translation stub).

Polish is **TDD-gated**: after each batch, `verify-sql-solutions` (or release smoke SQL gates) must stay green.

---

## Execution order (one slice at a time)

| Phase | Scope | Done when |
|------:|-------|-----------|
| **0** | Owner confirms this file | **done** (locked) |
| **1** | Write 6 new lessons (36–41) en+vi + smoke count=42 | **done** |
| **2** | Polish Blocks A–B (0–11) | **in progress** (0, 3, 4 enriched; continue 1–2, 5–11) |
| **3** | Polish Blocks C–D (12–25) | idem |
| **4** | Polish Blocks E–F (26–35) + cross-links | idem |
| **5** | Update maps, `curriculum-track-completion.md`, freeze Fundamentals | Track **closed** |

Do **not** start PostgreSQL expansion or JS curriculum while phases 1–5 are open.

---

## Definition of done — track closed

1. `GET /api/v1/lessons?track=sql-fundamentals&locale=en` returns **42** lessons in order 0–41.  
2. Every lesson passes Depth B + exercise/seed rules above.  
3. en/vi slug parity; solutions smoke green.  
4. This file + `sql-fundamentals-w3schools-map.md` say **closed**.  
5. PostgreSQL stays at current 19 until a separate `/opsx-research` for PG denser Mode Advanced.

---

## Do / Don't

**Do**

- Confirm path before writing Markdown.  
- Ship en+vi per lesson (or per small batch of related lessons).  
- Keep portable SQL only.

**Don't**

- Reorder 0–35 slugs without a migration note (stable `id` / slug).  
- Invent topics outside the tables above.  
- Touch JS / guest static / Drive in this track closure.

## Related

- [`sql-fundamentals-w3schools-map.md`](./sql-fundamentals-w3schools-map.md)  
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)  
- [`curriculum-track-completion.md`](./curriculum-track-completion.md)  
- [`postgresql-track.md`](./postgresql-track.md)  
- [W3Schools SQL Tutorial](https://www.w3schools.com/sql/)
