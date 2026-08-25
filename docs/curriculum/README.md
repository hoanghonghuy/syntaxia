# Curriculum source files

Markdown lessons synced to Postgres (and Google Drive when configured).

## Path pattern

```text
docs/curriculum/<track>/<locale>/<slug>.md
```

## Quality contracts

- IT / code / web pedagogy: [`docs/processes/curriculum-pedagogy.md`](../processes/curriculum-pedagogy.md)
- Language V3 pedagogy: [`docs/processes/language-learning-pedagogy-v3.md`](../processes/language-learning-pedagogy-v3.md)
- Language content quality: [`docs/processes/language-content-quality-v3.md`](../processes/language-content-quality-v3.md)
- Product-level scope/status: [`docs/processes/curriculum-product-completion.md`](../processes/curriculum-product-completion.md)

“Complete” always means complete **within the declared track scope**. A foundation/starter CEFR/HSK/JLPT path is not the same claim as full certification-level coverage.

## Tracks

| Track | Domain / level | Current declared scope |
|-------|----------------|------------------------|
| `sql-fundamentals` | IT · basic | Portable SQL fundamentals, **42** lessons — closed |
| `postgresql` | IT · intermediate | PostgreSQL-specific basic→advanced, **19** lessons |
| `javascript-basics` | IT · basic | MDN-mapped JavaScript fundamentals, **9** lessons; JS sandbox shipped |
| `html-basics` | IT · basic | Semantic HTML fundamentals, **12** lessons; HTML/CSS sandbox shipped |
| `css-basics` | IT · basic | CSS fundamentals through Flexbox, **14** lessons; HTML/CSS sandbox shipped |
| `chinese-hsk` | Languages · starter | HSK 3.0 Band 1 starter path, **9 units / 30 nodes per locale** |
| `english-basics` | Languages · foundation | CEFR A1 foundation course, **8 units / 30 nodes per locale** |
| `japanese-jlpt` | Languages · starter | JLPT N5 starter path, **5 units / 16 nodes per locale** |
| `chinese-it-vocab` | Languages · specialty | Chinese IT workplace mini-course, **6 V3 guided lessons per locale** |

## SQL Fundamentals (published order)

| Order | Slug |
|------:|------|
| 0 | what-is-sql |
| 1 | sql-syntax |
| 2 | select-queries |
| 3 | select-distinct |
| 4 | filtering-with-where |
| 5 | and-or-not |
| 6 | order-by |
| 7 | limit-rows |
| 8 | null-values |
| 9 | inserting-rows |
| 10 | updating-rows |
| 11 | deleting-rows |
| 12 | min-and-max |
| 13 | count-rows |
| 14 | sum-and-avg |
| 15 | like-pattern |
| 16 | in-list |
| 17 | between-range |
| 18 | column-aliases |
| 19 | inner-join |
| 20 | left-join |
| 21 | right-join |
| 22 | full-join |
| 23 | self-join |
| 24 | union-queries |
| 25 | group-by-aggregate |
| 26 | having-filter |
| 27 | exists-subquery |
| 28 | case-expression |
| 29 | creating-tables |
| 30 | alter-table |
| 31 | drop-table |
| 32 | primary-key |
| 33 | foreign-key |
| 34 | create-index |
| 35 | create-view |
| 36 | sql-wildcards |
| 37 | union-all |
| 38 | insert-into-select |
| 39 | any-all-subquery |
| 40 | table-constraints |
| 41 | sql-comments |

Full path + polish rules: [`docs/processes/sql-fundamentals-closure.md`](../processes/sql-fundamentals-closure.md).

## JavaScript Basics (published order)

| Order | Slug |
|------:|------|
| 0 | what-is-javascript |
| 1 | variables |
| 2 | numbers-and-operators |
| 3 | strings |
| 4 | string-methods |
| 5 | arrays |
| 6 | conditionals |
| 7 | loops |
| 8 | functions |

## Verification

IT curriculum structure/pedagogy is enforced by `scripts/verify-*-v2.mjs` plus the SQL Fundamentals verifier. Language tracks are enforced by the Language V3 web tests, including the English 8-unit foundation and specialty Chinese IT contract. Release E2E then exercises exact runtime inventories, sandboxes, progress, notes, and FSRS persistence against PostgreSQL.
