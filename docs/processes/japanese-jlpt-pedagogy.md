# Japanese (JLPT) pedagogy — production N5 foundation

## Purpose

Define how Syntaxia teaches Japanese as the target language on `japanese-jlpt`. This replaces the old placeholder/MVP-era decisions: the track is now a real Language V3 + FSRS product and must follow a foundation-first progression rather than a thematic vocabulary slice alone.

## Standards and sources

- [JLPT official level summary](https://www.jlpt.jp/e/about/levelsummary.html): N5 means understanding some basic Japanese; reading includes typical expressions/sentences in hiragana, katakana and basic kanji, while listening requires necessary information from short, slowly spoken daily-life/classroom conversations.
- [JLPT FAQ](https://www.jlpt.jp/e/faq/): vocabulary and grammar knowledge are required, but JLPT does not publish official vocabulary/kanji/grammar lists as a test-content syllabus.
- [Japan Foundation Irodori Starter](https://www.irodori.jpf.go.jp/starter/pdf.html): beginner materials explicitly teach kana plus long-vowel and small-っ/long-consonant distinctions.
- [evanclan/OpenJLPT](https://github.com/evanclan/OpenJLPT) (CC BY-SA 4.0): open vocabulary/readings provenance used by the authored N5 scope; it is not presented as an official JLPT list.

## Core progression

Japanese core learning follows:

`kana ↔ sound -> mora timing / long vowels / small っ -> high-frequency general vocabulary -> basic sentence order / particles / polite forms -> listening + speaking -> kana + gradual basic-kanji reading/writing -> checkpoint -> FSRS review`

Communicative units then prove that foundation in practical tasks. Can-Do scenes do not replace kana, sound, vocabulary or grammar prerequisites.

## Foundation Unit 0

A backward-compatible Unit 0 precedes the published N5 communicative units without renumbering them:

1. `kana-sounds` — connect common hiragana/katakana forms to Japanese sounds and type/read them without relying on romaji as the final representation;
2. `mora-length` — hear/read length contrasts, especially long vowels and small `っ`;
3. `core-sentences` — build a small productive grammar core with `です / ます` plus beginner particles in concrete sentence patterns;
4. `foundation-checkpoint` — mixed sound, kana and sentence-form retrieval;
5. `foundation-review` — delayed retrieval before communicative Unit 1.

Unit 0 focuses on prerequisites; Units 1+ remain the practical N5 application path.

## Target × explanation languages

| Role | Languages |
|---|---|
| Target | `ja` — modern standard Japanese |
| Explanation | `en` and `vi` |

Target Japanese, kana readings and examples remain Japanese. Instructions, explanations, hints, glosses and alt text must be natural in the selected explanation locale.

## Authoring contract

- Prefer `surface` + hiragana `reading` + localized `gloss` for vocabulary.
- Every assessed node has stable IDs shared between EN/VI.
- Every node includes listening and reaches controlled recall/production (`type_answer`, `listen_type`, `order_words`, or another semantic production type).
- New content does not use generic authored `mcq` where a specific Language V3 task fits.
- Readings are support, not a permanent substitute for learning kana/kanji.
- Natural Japanese word order, particles, politeness and register must be reviewed explicitly.
- Semantic visuals are app-owned; external image hotlinks are not allowed.
- FSRS is part of the current production product; it is not an out-of-scope future feature.

## Kana and pronunciation rules

- Teach kana as sound-bearing writing, not as a chart to memorize before any real words.
- Use audio/listening discrimination for long vowels and small `っ`; these contrasts affect word form and cannot be reduced to typography notes.
- Do not over-promise one fixed pitch-accent pattern as necessary for beginner intelligibility; lexical/phrase audio may model natural pronunciation without turning N5 foundation into a pitch-accent course.
- Romaji may appear as temporary input help only when technically necessary; learner-facing Japanese identity remains kana/kanji.

## Grammar rules

Teach grammar as productive sentence building:

- `です` for basic nominal/adjectival identification where appropriate;
- common polite `ます` verb forms as they enter the curriculum;
- particles such as `は`, `を`, `に`, `で` through concrete roles and reusable patterns;
- questions and response patterns inside meaningful exchanges.

Do not dump a particle table without listening and production.

## Product boundary

The declared course is a **practical N5 foundation**, not exhaustive JLPT N5 exam preparation, not every N5 word/kanji/grammar point, and not a certification claim. JLPT itself does not publish a complete official vocabulary/kanji/grammar syllabus, so community datasets remain provenance/cross-check inputs rather than official authority.

## Verification

The Japanese checker must lock exact EN/VI inventory, Unit 0 order/roles, V3 steps, readings, stable assessed IDs, no generic authored MCQ, self-grading fallback answers and EN/VI identity parity. Canonical Product CI must also verify exact runtime inventory and PostgreSQL-backed progress/notes/FSRS persistence.

## Related

- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
