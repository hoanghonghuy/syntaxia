# Language tracks — current product scope

## Purpose

Define the current **languages** catalog in Syntaxia and the authored product boundary of each track. “Production-ready” always refers to a declared product boundary and requires exact-head Product CI + DB-backed release evidence; it does **not** mean Syntaxia covers an entire CEFR, HSK, or JLPT certification system.

Core foreign-language tracks teach the language itself first. Specialty language such as Chinese for IT remains a separate optional product and never replaces pronunciation, vocabulary, grammar, listening, speaking, reading/writing, and review foundations.

## Current tracks

| Track | Declared scope | Current authored inventory | Learning model |
|-------|----------------|----------------------------|----------------|
| `chinese-hsk` | Practical Mandarin Level 1 foundation | **Pronunciation Unit 0 + 11 communicative units / 41 nodes per locale** | Pinyin/tones + core language + Language V3 communicative units + FSRS |
| `english-basics` | CEFR A1 language foundation | **Foundation Unit 0 + 8 communicative units / 39 nodes per locale** | Pronunciation + core sentence grammar + communicative units + FSRS |
| `japanese-jlpt` | JLPT N5 practical foundation | **Foundation Unit 0 + 9 communicative units / 35 nodes per locale** | Sound↔kana + hiragana/katakana + mora timing + core grammar + communicative units + FSRS |
| `chinese-it-vocab` | Chinese IT specialty mini-course | **6 guided lessons per locale** | Optional Language V3 specialty sessions + FSRS-assessed items |

All four tracks ship paired `en` and `vi` explanation locales. Exact inventories are locked by static Language V3 tests and PostgreSQL-backed runtime E2E.

## Architecture lock

1. **One application shell, separate pedagogy by learning domain.** IT article/sandbox tracks and language tracks share navigation/progress infrastructure but do not share one lesson presentation model when that harms learning.
2. **Language V3 is the active language contract.** New or rewritten language content follows [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md) and [`language-content-quality-v3.md`](./language-content-quality-v3.md).
3. **Map before content.** Core maps remain the scope source of truth:
   - Mandarin: [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md)
   - English: [`english-basics-a1-map.md`](./english-basics-a1-map.md)
   - Japanese: [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
   - Specialty Chinese IT: [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
4. **Track-scoped lookup is mandatory.** Database uniqueness is `(track_id, slug, locale)`, so lesson, notes, and solution requests include the track when slugs can overlap.
5. **EN/VI parity is a grading contract, not literal translation.** Stable assessed IDs and learning intent stay aligned; learner-facing explanations must sound natural in their locale.
6. **Semantic visuals and listening are first-class inputs.** App-owned visual keys/assets replace decorative hotlinks and hard-coded Mandarin behavior. Shared assets must not contain explanation-language prose.
7. **Foundation prerequisites own the beginning of a core-language path; Can-Do outcomes validate use afterward.** Communicative situations cannot substitute for sound, lexical, grammatical, reading, and writing foundations.
8. **Inserted curriculum is backward-compatible.** New earlier units may become available for catch-up but must not silently rewind a returning learner's established Continue frontier.
9. **Specialty tracks stay optional.** `chinese-it-vocab` is not a prerequisite for core Mandarin.
10. **The runtime catalog is application-owned.** API startup reconciles built-in track metadata before lesson sync so a long-lived DB cannot expose only older tracks.

## Core-language progression

The common product principle is:

`pronunciation / sound -> high-frequency vocabulary & chunks -> basic productive grammar -> listening -> interaction / speaking -> reading & writing -> checkpoint -> spaced retrieval`

Individual languages adapt this order to their writing and sound system instead of forcing an identical syllabus shape.

## Mandarin Level 1 foundation

Mandarin begins with a pronunciation foundation before communicative Unit 1:

1. `pinyin-syllables` — initial/final/tone mental model;
2. `tones` — four lexical tones plus neutral tone;
3. `tone-changes` — connected-speech awareness while preserving canonical Pinyin spelling;
4. `pronunciation-checkpoint` — listening/Pinyin assessment;
5. `pronunciation-review` — delayed retrieval before communicative work.

Unit 0 uses `unit_id: zh-hsk-b1-pronunciation-00`, `unit_order: 0`, and authored sort orders `-5..-1`. Published Units 1–11 keep their IDs/orders.

The course distinguishes canonical written Pinyin from connected-speech tone changes, grows Hanzi recognition gradually, and requires normal communicative lesson nodes to carry a reusable pattern plus enough general lexical/chunk material to complete the Can-Do.

The 2021 international-Chinese proficiency standard and the current HSK exam transition are kept separate. Syntaxia does not call the current regular HSK Level 1 150-word boundary the Level 1 vocabulary boundary of the newer three-band/nine-level standard.

## English A1 foundation

English begins with **Unit 0 — English foundation** before the eight communicative units:

1. `sound-spelling` — sound, meaning and standard spelling; IPA is reference support;
2. `vowel-contrasts` — `/ɪ/ ↔ /iː/` and `/æ/ ↔ /ʌ/`;
3. `consonant-clarity` — `/θ/ ↔ /ð/`, `/r/ ↔ /l/`, `/v/ ↔ /f/`;
4. `word-stress`;
5. `sentence-melody`;
6. `core-sentences` — pronouns + `am/is/are`, contractions, one-clause `be` sentences;
7. `basic-questions` — `be` inversion, wh + `be`, and `Do you like …?`;
8. `foundation-checkpoint`;
9. `foundation-review`.

Unit 0 uses `unit_id: en-a1-foundation-00`, `unit_order: 0`, and sort orders `-9..-1`; published Units 1–8 keep their IDs/orders.

The later outcomes remain meeting people, family, numbers/navigation, café ordering, daily routine/time, shopping, home/location, and free-time planning. Vocabulary is learned as **sound + meaning + spelling + usable chunk** and grammar is a productive sentence-building tool. Pronunciation targets intelligibility rather than accent imitation.

## Japanese N5 foundation

Japanese now begins with **Unit 0 — Japanese foundation** before the nine published communicative units:

1. `kana-sounds` — establish direct sound↔kana mapping with the five vowel sounds;
2. `hiragana-patterns` — decode hiragana through recurring rows, dakuten, `ん`, and small `ゃ・ゅ・ょ` combinations;
3. `katakana-patterns` — reuse the same Japanese sound system in katakana and read common beginner loanwords without romaji;
4. `mora-length` — hear/read long-vowel timing, katakana `ー`, and small-`っ` consonant timing;
5. `core-sentences` — build starter sentences with `です / ます`, concrete `は / を / に / で` uses, particle pronunciation, and a few explicitly taught polite verb pairs;
6. `foundation-checkpoint` — integrate hiragana, katakana, timing, particle pronunciation and sentence construction;
7. `foundation-review` — delayed retrieval before Unit 1 through the same FSRS system.

Unit 0 uses `unit_id: ja-n5-foundation-00`, `unit_order: 0`, and exact sort orders `-7..-1`. Published Units 1–9 keep their existing identities and order.

The grammar foundation explicitly tells beginners that topic `は` is pronounced `わ` and object `を` is commonly pronounced `お`; it also teaches concrete pairs such as `行く → 行きます` and `飲む → 飲みます` without pretending those examples are a complete conjugation system.

After Unit 0, the nine observable outcomes remain:

1. make one simple polite request;
2. identify and introduce people/family;
3. understand and produce basic numbers in context;
4. request a simple food/drink item;
5. ask where a familiar place is;
6. ask/tell a simple daily-routine time;
7. follow a read/write classroom instruction and ask for repetition;
8. confirm a train destination and understand where to get off;
9. state a preference and make a simple free-time plan.

The course is aligned to the official N5 ability boundary—basic reading and extracting necessary information from short, slowly spoken daily-life/classroom conversations—but JLPT does not publish an official vocabulary/kanji/grammar syllabus. Open vocabulary datasets are authoring provenance/cross-checks, not JLPT authority.

This is a practical N5 foundation, not exhaustive exam preparation, all N5 vocabulary, all kanji, or every grammar point.

## What counts as a complete language node

A normal V3 communicative node makes the learner do something observable:

`scene -> listen / notice -> understand -> interact -> controlled recall / production -> checkpoint -> later retrieval`

Foundation nodes may emphasize sound discrimination, writing-system decoding, or sentence construction earlier in the sequence, but still require listening, stable assessed identity, controlled recall/production, checkpoint evidence, and later review.

Core nodes keep explicit `unit_id`, `unit_order`, `unit_role`, `unit_can_do`, and stable assessed IDs. Chinese IT uses guided workplace sessions with stable IDs, listening, production, semantic visuals, and checkpoint evidence while remaining optional.

## Learner-frontier compatibility

Language sequencing separates **curriculum order** from **returning-learner continuation**:

- a learner with no progress starts at the first current curriculum node;
- a returning learner continues after the furthest completed node when earlier curriculum is newly inserted;
- incomplete inserted nodes behind that frontier remain `available` and clickable rather than being falsified as completed;
- if the forward frontier is exhausted, the earliest remaining gap becomes current.

This avoids fabricating progress/FSRS rows and avoids an unexpected rewind after curriculum expansion.

## Runtime catalog compatibility

All bundled curriculum tracks are application-owned catalog entries. API startup reconciles them before curriculum sync. The DB-backed release gate reproduces an older-database state by deleting English, Japanese, and Chinese IT track rows before API startup; startup must recreate them and `/api/v1/tracks` must expose all required tracks before exact inventory checks proceed.

## Content paths

```text
docs/curriculum/chinese-hsk/{en,vi}/
docs/curriculum/english-basics/{en,vi}/
docs/curriculum/japanese-jlpt/{en,vi}/
docs/curriculum/chinese-it-vocab/{en,vi}/
```

## Do

- Extend a track only after updating/researching its curriculum map.
- Establish pronunciation/sound, reusable vocabulary/chunks, and minimal productive grammar before situation-only sequencing.
- Keep naturalness, audio target language, semantic visuals, locale-pure copy, accessibility, and mobile behavior in the review bar.
- Ship EN/VI together and preserve stable assessed IDs.
- Preserve established learner frontiers when inserting earlier content.
- Use `?track=` for lesson-scoped API reads where slugs overlap.

## Don't

- Call the current scopes “full HSK”, “exhaustive CEFR A1”, or “full JLPT N5 exam preparation”.
- Replace language foundations with IT/specialty vocabulary.
- Turn the course into grammar-table memorization without listening/production.
- Fall back to generic authored `mcq` when a semantic exercise type fits.
- Publish glossary-only specialty lessons.
- Put explanation-language prose into shared pronunciation/writing-system SVGs.
- Renumber old published identities merely to insert a prerequisite unit.

## Verification

Canonical Language V3 regression locks:

- Mandarin: **41 nodes per locale**, including pronunciation Unit 0;
- English: **9 units / 39 nodes per locale**, including foundation Unit 0;
- Japanese: **10 units / 35 nodes per locale**, including seven-node foundation Unit 0;
- Chinese IT: **6 optional specialty lessons per locale**;
- EN/VI identity + stable assessed-ID parity;
- locale quality, language path ordering, backward-compatible continuation, audio, visuals, feedback, and review behavior.

The DB-backed release E2E verifies exact live inventories, runtime track reconciliation, persisted progress, notes, and FSRS rows across Mandarin, English, Japanese, and Chinese IT. Exact branch release evidence is recorded only after canonical Product CI passes for the exact candidate commit.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`language-review-session.md`](./language-review-session.md)
- [`language-step-audio.md`](./language-step-audio.md)
- [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)