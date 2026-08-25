# Language tracks — current production scope

## Purpose

Define the current **languages** catalog in Syntaxia and the actual product scope of each track. “Production-ready” always refers to the declared product boundary; it does **not** mean Syntaxia covers an entire CEFR, HSK, or JLPT certification system.

## Current tracks

| Track | Declared scope | Current authored inventory | Learning model |
|-------|----------------|----------------------------|----------------|
| `chinese-hsk` | HSK 3.0 Band 1 starter path | **9 communicative units / 30 nodes per locale** | Language V3 units with lesson/checkpoint/review roles + FSRS |
| `english-basics` | CEFR A1 foundation course | **8 communicative units / 30 nodes per locale** | Language V3 Can-Do units with lesson/checkpoint/review roles + FSRS |
| `japanese-jlpt` | JLPT N5 practical foundation | **9 communicative units / 28 nodes per locale** | Language V3 daily-life/classroom units with lesson/checkpoint/review roles + FSRS |
| `chinese-it-vocab` | Chinese IT specialty mini-course | **6 guided lessons per locale** | Language V3 specialty sessions with inline checkpoints + FSRS-assessed items |

All four tracks ship paired `en` and `vi` explanation locales.

## Architecture lock

1. **One application shell, separate pedagogy by learning domain.** IT article/sandbox tracks and language tracks share navigation/progress infrastructure but do not share the same lesson player.
2. **Language V3 is the active language contract.** New or rewritten language content must follow [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md) and [`language-content-quality-v3.md`](./language-content-quality-v3.md).
3. **Map before content.** Core maps remain the scope source of truth:
   - Chinese: [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md)
   - English: [`english-basics-a1-map.md`](./english-basics-a1-map.md)
   - Japanese: [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
   - Specialty Chinese IT: [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
4. **Track-scoped lookup is mandatory.** Database uniqueness is `(track_id, slug, locale)`, so lesson, notes, and solution requests must include the track when slugs can overlap.
5. **EN/VI parity is a grading contract, not literal translation.** Stable assessed IDs and learning intent stay aligned; learner-facing explanations must sound natural in their locale.
6. **Semantic visuals and listening are first-class inputs.** App-owned visual keys/assets and correct speech-language profiles replace decorative hotlinks and hard-coded Mandarin behavior.
7. **Can-Do outcomes own sequencing.** Foundation courses are organized around observable interaction and useful information extraction, not grammar-table progression.

## English A1 foundation outcomes

The current English foundation has eight product outcomes:

1. meet someone;
2. introduce people close to you;
3. use numbers/place language to find your way;
4. order one item politely at a café;
5. ask/tell simple times and describe a short daily routine;
6. ask a price and buy one simple item;
7. describe a familiar room and locate a common object;
8. state a preference and make a simple free-time plan.

This is a bounded foundation product, not exhaustive CEFR A1 coverage or exam preparation.

## Japanese N5 foundation outcomes

The Japanese foundation is aligned to the official N5 ability boundary: basic reading plus extracting necessary information from short, slowly spoken daily-life/classroom conversations. Its nine product outcomes are:

1. make one simple polite request;
2. identify and introduce people/family;
3. understand and produce basic numbers in context;
4. request a simple food/drink item;
5. ask where a familiar place is;
6. ask/tell a simple daily routine time;
7. follow a read/write classroom instruction and ask for repetition;
8. confirm a train destination and understand where to get off;
9. state a preference and make a simple free-time plan.

This is a practical N5 foundation, not exhaustive exam preparation, all N5 vocabulary, kanji, or grammar.

## What counts as a complete language lesson

A normal V3 learning node must make the learner do something observable rather than just read a vocabulary list:

`scene -> listen / notice -> understand -> interact -> controlled recall / production -> checkpoint -> later retrieval`

Core unit nodes additionally keep explicit `unit_id`, `unit_order`, `unit_role`, `unit_can_do`, and stable assessed IDs. The Chinese IT specialty mini-course uses one V3 guided session per mapped workplace topic and still requires stable IDs, listening, production, semantic visuals, and checkpoint evidence.

## Content paths

```text
docs/curriculum/chinese-hsk/{en,vi}/
docs/curriculum/english-basics/{en,vi}/
docs/curriculum/japanese-jlpt/{en,vi}/
docs/curriculum/chinese-it-vocab/{en,vi}/
```

## Do

- Extend a track only after updating/researching its curriculum map
- Keep naturalness, audio target language, semantic visuals, accessibility, and mobile behavior in the review bar
- Ship EN/VI together and preserve stable assessed IDs
- Keep specialty terminology inside realistic actions such as identify, explain, report, compare, or troubleshoot
- Use `?track=` for lesson-scoped API reads where slugs overlap

## Don't

- Call the current scopes “full HSK”, “exhaustive CEFR A1”, or “full JLPT N5 exam preparation”
- Fall back to generic `mcq` authoring when a semantic exercise type fits
- Force SQL/JS/HTML sandbox UX into language tracks
- Publish glossary-only specialty lessons
- Hotlink language visuals from external domains
- Invent new curriculum outlines without a source map

## Verification

The canonical web regression runs Language V3 contracts for all current language tracks. English locks the exact **8-unit / 30-node** inventory; Japanese locks the exact **9-unit / 28-node** inventory; both require EN/VI assessed-ID parity. The DB-backed release E2E verifies exact live inventories, persisted progress, notes, and FSRS rows across Mandarin, English, Japanese, and Chinese IT.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`language-review-session.md`](./language-review-session.md)
- [`language-step-audio.md`](./language-step-audio.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
