# English Basics pedagogy

## Purpose

Define **how Syntaxia teaches English as a target language** on `english-basics`. This is the pedagogy contract behind the CEFR A1 curriculum map; it supersedes the earlier MVP/starter assumptions.

## Product principle

English is a core language course, not English-for-IT and not a collection of situations with hidden grammar.

The learner should repeatedly move through:

`sound / stress -> vocabulary -> grammar / sentence pattern -> listening -> interaction -> controlled production -> checkpoint -> delayed retrieval`

Can-Do outcomes still determine what the learner should ultimately be able to do. Pronunciation, vocabulary and grammar are the language system that makes those outcomes possible.

## Standards

Primary proficiency boundary: **CEFR A1**.

Relevant Council of Europe guidance:

- A1 uses a very basic repertoire of words and simple phrases for concrete situations.
- Control is limited to a few simple grammatical structures and sentence patterns.
- Spoken production is short and often needs pauses/support.
- Phonological work should aim at intelligibility with a limited familiar repertoire rather than forcing one native accent.
- Language-specific Reference Level Descriptions make words, grammar, pronunciation/spelling and other forms explicit underneath generic CEFR Can-Do descriptors.

See [`english-basics-a1-map.md`](./english-basics-a1-map.md) for source links and the current progression matrix.

## Target and explanation languages

| Role | Language |
|------|----------|
| Target language | English (`en`, speech profile `en-US` for the current product) |
| Explanation locales | Vietnamese (`vi`) and English (`en`) |

The explanation locale never changes the target answers or stable grading identities.

## Foundation Unit 0

Before the eight existing communicative units, English teaches a small explicit foundation:

1. **Sound–spelling awareness** — listen first; use spelling and optional IPA as support.
2. **Word stress** — recognise and reproduce the strongest beat in familiar words.
3. **Core `be` sentences** — subject pronouns, `am/is/are`, common contractions, a basic negative and yes/no question.
4. **Checkpoint** — mixed sound/stress/sentence retrieval.
5. **Review** — delayed recall before entering Unit 1.

The foundation is intentionally small. It does not dump the full phoneme chart or full English grammar syllabus on a beginner.

## Communicative units

The existing eight units remain the core everyday A1 path:

1. first meeting;
2. people/family;
3. numbers and finding a place;
4. café ordering;
5. time and daily routine;
6. shopping;
7. home and object location;
8. hobbies and a simple invitation/plan.

Each unit introduces a small vocabulary set and one or more reusable sentence patterns, then requires the learner to hear, understand and produce them.

## Vocabulary policy

- Prefer high-frequency, familiar beginner vocabulary supported by the cited YLE-derived open dataset when choosing between alternatives.
- Reuse known words before adding synonyms.
- Teach words in a sentence/action, not as a detached glossary.
- Keep functional chunks (`I'd like …`, `Where's …?`, `Do you want to …?`) intact when that is how a beginner can actually use them.
- Do not copy Cambridge tasks, textbook paragraphs or proprietary example sets.

## Grammar policy

Grammar must be **explicit but light**:

- name the usable pattern in learner-friendly language;
- show the form in a mental model/example;
- contrast a likely error when useful;
- require the pattern in listening or interaction;
- require controlled production;
- retrieve it later through checkpoint/review.

Do not make the learner infer core grammar accidentally, but do not turn a lesson into a long terminology lecture either.

Current progression includes `be`, contractions, `this/that`, `he/she`, location questions, polite `would like` chunks, present-simple routine questions with `do`, `there is/are`, concrete prepositions, preference questions and invitation patterns.

## Pronunciation policy

- Goal: **intelligibility**, not accent erasure.
- Audio comes before spelling assumptions when they conflict.
- IPA is optional support, not a memorisation target.
- Start with a very limited set of useful contrasts and familiar word stress.
- Encourage imitation/repetition of short target chunks.
- Do not grade a learner against one native accent.

## Language V3 lesson shape

A published node should normally contain:

- semantic scene/visual context;
- target-language dialogue;
- a listen step;
- a teach/tip stage that exposes the sound, vocabulary or grammar pattern;
- semantic practice (`audio_choice`, `dialogue_choice`, `order_words`, `fill_blank`, `type_answer`, etc.);
- controlled production;
- checkpoint;
- stable authored IDs for FSRS review.

Generic authored `mcq` is not the default when a more meaningful exercise type exists.

## Progress and backward compatibility

Published lesson identities are stable. Adding Unit 0 uses negative internal sort orders and `unit_order: 0` without renumbering Units 1–8.

A new learner starts from Unit 0. A returning learner who already progressed in the historical course keeps the established Continue frontier; Unit 0 remains available for catch-up instead of silently rewinding them.

## Current declared scope

**9 units / 35 nodes per locale**:

- 5 Foundation Unit 0 nodes;
- 30 existing nodes across 8 communicative units.

This is a bounded CEFR A1 foundation. It is not exhaustive CEFR A1, a full pronunciation course, a full grammar reference, or an exam-preparation product.

## Verification

```bash
cd apps/web
npm run test:english-basics
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

The canonical DB-backed release gate additionally verifies exact 35-node runtime inventory, Unit 0 serialization/order, progress/notes persistence and an English FSRS card from a stable authored ID.

## Related

- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
