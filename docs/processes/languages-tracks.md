# Language tracks — current production scope

## Purpose

Define the current **languages** catalog in Syntaxia and the actual production scope of each track. “Production-ready” here means the declared starter/mini-course scope is complete and quality-gated; it does **not** mean Syntaxia already covers an entire CEFR, HSK, or JLPT certification level.

## Current tracks

| Track | Declared scope | Current authored inventory | Learning model |
|-------|----------------|----------------------------|----------------|
| `chinese-hsk` | HSK 3.0 Band 1 starter path | **9 communicative units / 30 nodes per locale** | Language V3 units with lesson/checkpoint/review roles + FSRS |
| `english-basics` | CEFR A1 starter path | **4 communicative units / 14 nodes per locale** | Language V3 units with lesson/checkpoint/review roles + FSRS |
| `japanese-jlpt` | JLPT N5 starter path | **5 communicative units / 16 nodes per locale** | Language V3 units with lesson/checkpoint/review roles + FSRS |
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
6. **Semantic visuals and listening are first-class inputs.** App-owned visual keys and correct speech-language profiles replace decorative hotlinks and hard-coded Mandarin behavior.

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

- Call the current starter scope “full HSK”, “full CEFR A1”, or “full JLPT N5”
- Fall back to generic `mcq` authoring when a semantic exercise type fits
- Force SQL/JS/HTML sandbox UX into language tracks
- Publish glossary-only specialty lessons
- Hotlink language visuals from external domains
- Invent new curriculum outlines without a source map

## Verification

The canonical web regression runs Language V3 contracts for all current language tracks, including the Chinese IT specialty track. The DB-backed release E2E additionally verifies persisted progress, notes, repeated review actions, and FSRS rows.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`language-review-session.md`](./language-review-session.md)
- [`language-step-audio.md`](./language-step-audio.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
