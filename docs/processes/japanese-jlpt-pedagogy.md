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

`kana ↔ sound -> hiragana decoding -> katakana decoding -> mora timing / long vowels / small っ -> high-frequency general vocabulary -> basic sentence order / particles / polite forms -> listening + speaking -> kana + gradual basic-kanji reading/writing -> checkpoint -> FSRS review`

Communicative units then prove that foundation in practical tasks. Can-Do scenes do not replace kana, sound, vocabulary or grammar prerequisites.

## Foundation Unit 0

A backward-compatible seven-node Unit 0 precedes the published N5 communicative units without renumbering them:

1. `kana-sounds` — establish the direct sound↔kana principle with the five vowel sounds; do not pretend this equals full kana mastery;
2. `hiragana-patterns` — decode hiragana through recurring sound rows, dakuten, `ん`, and small `ゃ・ゅ・ょ` combinations;
3. `katakana-patterns` — reuse the same Japanese sound system in katakana and read common beginner loanwords without romaji;
4. `mora-length` — hear/read long-vowel timing, katakana `ー`, and small-`っ` consonant timing;
5. `core-sentences` — build a small productive grammar core with `です / ます`, concrete beginner particle roles, particle pronunciation, and explicitly taught polite verb pairs;
6. `foundation-checkpoint` — mixed hiragana, katakana, timing, particle-pronunciation and sentence-form retrieval;
7. `foundation-review` — delayed retrieval before communicative Unit 1 through the same FSRS system.

Unit 0 uses exact authored sort orders `-7..-1`. Unit 0 focuses on prerequisites; Units 1+ remain the practical N5 application path.

## Target × explanation languages

| Role | Languages |
|---|---|
| Target | `ja` — modern standard Japanese |
| Explanation | `en` and `vi` |

Target Japanese, kana readings and examples remain Japanese. Instructions, explanations, hints, glosses and alt text must be natural in the selected explanation locale.

## Authoring contract

- Prefer `surface` + kana `reading` + localized `gloss` for vocabulary.
- Every assessed node has stable IDs shared between EN/VI.
- Every node includes listening and reaches controlled recall/production (`type_answer`, `listen_type`, `order_words`, or another semantic production type).
- New content does not use generic authored `mcq` where a specific Language V3 task fits.
- Readings are support, not a permanent substitute for learning kana/kanji.
- Natural Japanese word order, particles, politeness and register must be reviewed explicitly.
- Semantic visuals are app-owned; external image hotlinks are not allowed.
- FSRS is part of the current production product; it is not an out-of-scope future feature.

## Kana and pronunciation rules

- Teach kana as sound-bearing writing, not as a chart to memorize before any real words.
- Do not test a kana form before its sound/shape pattern has been introduced. A lesson may preview a form, but assessed production must follow instruction.
- Teach hiragana and katakana as two scripts for the same Japanese sound system. Katakana is not a second pronunciation system and is not described as “foreign words only”.
- Use audio/listening discrimination for long vowels and small `っ`; these contrasts affect word form and cannot be reduced to typography notes.
- Distinguish common hiragana long-vowel spellings from katakana `ー` rather than presenting a single fake orthographic rule.
- Do not over-promise one fixed pitch-accent pattern as necessary for beginner intelligibility; lexical/phrase audio may model natural pronunciation without turning N5 foundation into a pitch-accent course.
- Romaji may appear as temporary input help only when technically necessary; learner-facing Japanese identity remains kana/kanji.

## Grammar rules

Teach grammar as productive sentence building:

- `です` for basic nominal/adjectival identification where appropriate;
- common polite `ます` verb forms as they enter the curriculum;
- particles such as `は`, `を`, `に`, `で` through concrete roles and reusable patterns;
- explicitly explain beginner pronunciation traps: topic `は` is pronounced `わ`, and object `を` is commonly pronounced `お`;
- teach concrete verb pairs such as `行く → 行きます` and `飲む → 飲みます` before asking learners to produce them, without presenting two examples as a complete conjugation rule;
- questions and response patterns inside meaningful exchanges.

Do not dump a particle table without listening and production.

## Product boundary

The declared course is a **practical N5 foundation**, not exhaustive JLPT N5 exam preparation, not every N5 word/kanji/grammar point, and not a certification claim. JLPT itself does not publish a complete official vocabulary/kanji/grammar syllabus, so community datasets remain provenance/cross-check inputs rather than official authority.

## Verification

The Japanese checker must lock exact **35-node EN/VI inventory**, exact Unit 0 sequence/sort order, V3 steps, readings, stable assessed IDs, no generic authored MCQ, self-grading fallback answers and EN/VI identity parity. Cold Go smoke must parse exactly **70 Japanese Markdown files (35×2)** including **14 Unit 0 files (7×2)**. Canonical Product CI must also verify exact runtime inventory and PostgreSQL-backed progress/notes/FSRS persistence.

## Related

- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
