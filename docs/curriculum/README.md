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
| `chinese-hsk` | Languages · foundation | Practical Mandarin Level 1, **Pronunciation Unit 0 + 11 communicative units / 41 nodes per locale** |
| `english-basics` | Languages · foundation | CEFR A1 language foundation, **Foundation Unit 0 + 8 communicative units / 39 nodes per locale** |
| `japanese-jlpt` | Languages · foundation | JLPT N5 practical foundation, **Foundation Unit 0 + 9 communicative units / 35 nodes per locale** |
| `chinese-it-vocab` | Languages · specialty | Chinese IT workplace mini-course, **6 V3 guided lessons per locale** |

The exact inventories above are locked by static curriculum/language tests and by the PostgreSQL-backed release E2E.

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

`javascript-basics` deliberately ends at functions. DOM/events/fetch/async belong to a separately researched continuation product rather than silently widening this Basics scope.

## Mandarin foundation entry

Mandarin begins with five pronunciation nodes before communicative Unit 1:

```text
pinyin-syllables
→ tones
→ tone-changes
→ pronunciation-checkpoint
→ pronunciation-review
→ communicative Unit 1
```

These nodes use `unit_order: 0` and internal sort orders `-5..-1` without renumbering existing published units. Returning learners keep their established continuation frontier; inserted earlier foundation nodes remain available for catch-up.

## English foundation entry

English begins with a nine-node language foundation before communicative Unit 1:

```text
sound-spelling
→ vowel-contrasts
→ consonant-clarity
→ word-stress
→ sentence-melody
→ core-sentences
→ basic-questions
→ foundation-checkpoint
→ foundation-review
→ communicative Unit 1
```

The first five nodes build bounded intelligibility foundations: sound↔spelling, high-value vowel/consonant contrasts, word stress, and sentence melody. The next two establish the minimal productive grammar used by later A1 units (`be`, subject pronouns, simple `be`/wh/`do` question frames). Vocabulary is learned as sound + meaning + spelling + usable chunk rather than a standalone glossary.

These nodes use `unit_order: 0` and internal sort orders `-9..-1` without renumbering published Units 1–8. The generic language-frontier logic keeps returning learners on their established continuation path while the inserted foundation remains available for catch-up.

## Japanese foundation entry

Japanese begins with a seven-node foundation before communicative Unit 1:

```text
kana-sounds
→ hiragana-patterns
→ katakana-patterns
→ mora-length
→ core-sentences
→ foundation-checkpoint
→ foundation-review
→ communicative Unit 1
```

The foundation first establishes sound↔kana mapping, then expands hiragana and katakana as readable systems before later tasks depend on them. It makes long-vowel, katakana `ー`, and small-`っ` timing contrasts audible/readable, then introduces a small productive sentence core with `です / ます` plus concrete uses of `は / を / に / で`. High-risk beginner details such as topic `は` pronounced `わ`, object `を` commonly pronounced `お`, and the taught pairs `行く → 行きます` / `飲む → 飲みます` are explained directly rather than left for the learner to infer.

Checkpoint and delayed review mix hiragana, katakana, timing, particle pronunciation and sentence construction so script work is part of the same retrieval loop instead of a disposable alphabet page.

These nodes use `unit_id: ja-n5-foundation-00`, `unit_order: 0`, and exact internal sort orders `-7..-1`. Existing published Units 1–9 keep their IDs/orders. Returning learners are not silently rewound; the earlier foundation remains available for catch-up through the generic language-frontier behavior.

JLPT defines the N5 ability boundary but does not publish an official vocabulary/kanji/grammar syllabus. Open lists used in authoring are provenance/cross-check inputs, not official JLPT authority.

## Verification

IT curriculum structure/pedagogy is enforced by `scripts/verify-*-v2.mjs` plus the SQL Fundamentals verifier. These gates require the relevant mental/execution model, prediction, worked example, debugging, common mistakes, learner task, recall, exercise/hints/solution, and EN/VI parity for every declared IT lesson.

Language tracks are enforced by Language V3 web tests, including exact **Mandarin 41 / English 39 / Japanese 35** per-locale inventories, specialty Chinese IT contracts, EN/VI assessed-ID parity, learner-frontier compatibility, audio, visuals, feedback, locale quality, and FSRS review identity.

Release E2E then exercises exact runtime inventories, built-in track reconciliation for long-lived databases, SQL/JavaScript/HTML/CSS sandboxes, progress, notes, and FSRS persistence against PostgreSQL. Go curriculum-backed smoke tests are run cold with `go test -count=1` so external curriculum changes cannot be hidden by the Go package test cache.