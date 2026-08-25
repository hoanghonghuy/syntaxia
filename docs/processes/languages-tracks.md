# Language tracks — current production scope

## Purpose

Define the current **languages** catalog in Syntaxia and the actual bounded product scope of each track. “Production-ready” refers only to the declared product boundary; it never means complete CEFR, HSK, or JLPT certification coverage.

## Current tracks

| Track | Declared scope | Current authored inventory | Learning model |
|-------|----------------|----------------------------|----------------|
| `chinese-hsk` | Practical Mandarin Level 1 foundation | **Pronunciation Unit 0 + 11 communicative units / 41 nodes per locale** | Pinyin/tones foundation + Language V3 communicative units + FSRS |
| `english-basics` | CEFR A1 foundation | **Language Foundation Unit 0 + 8 communicative units / 35 nodes per locale** | Sound/stress + core grammar + Language V3 communicative units + FSRS |
| `japanese-jlpt` | JLPT N5 practical foundation | **9 communicative units / 28 nodes per locale** | Language V3 daily-life/classroom units + FSRS |
| `chinese-it-vocab` | Chinese IT specialty mini-course | **6 guided lessons per locale** | Language V3 workplace specialty sessions + FSRS |

All tracks ship paired `en` and `vi` explanation locales.

## Architecture lock

1. **Core language before specialty.** Mandarin, English and Japanese teach the target language itself. `chinese-it-vocab` is optional specialty content and must not drive the core Mandarin sequence.
2. **One shell, domain-appropriate pedagogy.** IT sandboxes and language players share navigation/progress infrastructure but not lesson mechanics.
3. **Map before content.** Curriculum maps are the source of truth for scope and progression.
4. **Language foundations are explicit.** Sound/pronunciation, vocabulary and grammar are prerequisites and recurring inputs to communicative work; Can-Do outcomes remain the observable destination.
5. **EN/VI parity is a grading contract.** Stable assessed IDs, answers, units and learning intent remain aligned without requiring literal translation.
6. **Listening and semantic visuals are first-class.** Use correct target speech profiles and app-owned semantic assets.
7. **Track-scoped API lookup is mandatory.** Shared slugs must include the track.
8. **Inserted earlier curriculum is backward-compatible.** New foundation nodes are available for catch-up but do not silently rewind a returning learner’s established Continue frontier.

## Core language progression

The default core sequence is:

`sound / pronunciation -> vocabulary -> grammar / sentence patterns -> listening -> interaction -> controlled speaking/writing -> checkpoint -> delayed retrieval`

Communicative nodes then repeatedly combine those layers:

`scene -> listen / notice -> understand -> interact -> controlled production -> checkpoint -> later retrieval`

This avoids two bad extremes: glossary/grammar-table-only study and situation-only study where the learner is expected to infer the language system by accident.

## Mandarin foundation

Mandarin begins with five Unit 0 nodes for Pinyin syllable structure, tones, connected-speech tone changes, checkpoint and delayed review. Canonical written Pinyin is kept separate from surface tone realization. Existing Units 1–11 retain their published identities.

Declared scope: **41 nodes/locale**. This is a practical Level 1 foundation, not exhaustive HSK preparation.

## English A1 foundation

English now begins with five Unit 0 nodes before the eight existing communicative units:

1. `sound-spelling` — listen before relying on spelling; a small guided sound contrast;
2. `word-stress` — identify and reproduce the main beat in familiar A1 words;
3. `core-be` — subject pronouns + `am/is/are`, contractions, a basic negative and yes/no question;
4. `foundation-checkpoint` — mixed sound/stress/grammar gate;
5. `foundation-review` — delayed retrieval before the first meeting unit.

The eight communicative outcomes remain meeting, people/family, navigation, café ordering, routine/time, shopping, home/location, and free-time planning. Their existing IDs/orders are unchanged. Grammar progression is explicit in [`english-basics-a1-map.md`](./english-basics-a1-map.md), rather than being incidental phrase exposure.

Declared scope: **9 units / 35 nodes per locale**. This is a bounded CEFR A1 foundation, not exhaustive A1 grammar, phonetics, vocabulary or exam preparation.

## Japanese N5 foundation

Japanese currently has nine practical units covering requests/politeness, people/family, numbers, food/drink, places, routine/time, classroom interaction, train travel and free-time planning. The product is bounded to basic reading plus short daily-life/classroom listening outcomes; it does not claim all N5 vocabulary, kanji or grammar.

Declared scope: **9 units / 28 nodes per locale**.

## Specialty Chinese IT

`chinese-it-vocab` is a separate **6-lesson specialty mini-course**. Terminology must be embedded in realistic actions such as identify, explain, report, compare or troubleshoot. A glossary with selection questions is not a complete specialty lesson.

## Learner-frontier compatibility

Language sequencing separates curriculum order from a returning learner’s continuation:

- a new learner starts at the first current node;
- a returning learner continues after the furthest completed frontier when earlier curriculum is inserted;
- inserted gaps behind the frontier remain available/clickable, not falsely marked complete;
- when the forward frontier is exhausted, the earliest remaining gap becomes current.

## Content paths

```text
docs/curriculum/chinese-hsk/{en,vi}/
docs/curriculum/english-basics/{en,vi}/
docs/curriculum/japanese-jlpt/{en,vi}/
docs/curriculum/chinese-it-vocab/{en,vi}/
```

## Verification

Canonical language gates lock:

- Mandarin: **41 nodes/locale**, including Unit 0;
- English: **9 units / 35 nodes/locale**, including sound/stress/core-grammar Unit 0;
- Japanese: **9 units / 28 nodes/locale**;
- Chinese IT: **6 specialty lessons/locale**;
- exact EN/VI identities and stable assessed IDs;
- language path ordering/backward-compatible continuation;
- audio, visuals, feedback and FSRS review behavior;
- PostgreSQL-backed live inventory, progress, notes and review persistence.

## Do

- research/update a curriculum map before expansion;
- teach core language before optional professional terminology;
- keep vocabulary and grammar cumulative and reusable;
- ship EN/VI together with stable assessment IDs;
- use app-owned visuals and correct target speech language;
- preserve published IDs and returning-learner frontiers.

## Don’t

- call bounded products “full HSK”, “full A1” or “full JLPT N5”;
- make specialty vocabulary the core language course;
- rely on generic `mcq` when a semantic exercise fits better;
- publish glossary-only language lessons;
- hotlink language visuals;
- renumber historical lesson identities just to insert prerequisites.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
