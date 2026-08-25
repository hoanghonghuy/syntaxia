# Language learning pedagogy v3

## Purpose

Define the production learning model for every Syntaxia language track. Language lessons are not IT articles with quizzes attached, and a collection of attractive communicative scenes is not by itself a language syllabus.

For a **core foreign-language track**, Syntaxia teaches the language foundation first and then proves that foundation through practical Can-Do use.

## When to use

- Designing or reviewing any language lesson, unit, exercise, review flow, or player UI
- Changing English, Mandarin, Japanese, or specialty-language curriculum
- Adding a new language track
- Changing language progress, audio, review, or memory scheduling

## Standards and research lock

Syntaxia uses standards as constraints, not copied syllabi:

- **CEFR / Can-Do** for communicative goals and capability boundaries
- **ACTFL communication modes** as a useful interpretive/interpersonal/presentational coverage check
- **2021 International Chinese Language Education Chinese Proficiency Grading Standards** plus current HSK transition evidence for Mandarin
- **JLPT official level descriptors** for Japanese ability boundaries; JLPT does not publish an official vocabulary/kanji/grammar syllabus
- **FSRS v6** for spaced-repetition scheduling

A standard can define what a learner should be able to do without prescribing a complete teaching order. Syntaxia therefore owns an explicit foundation progression.

## Product model

### IT learning

`explain -> example -> code -> sandbox -> reflect`

### Core language foundation

`pronunciation / sound -> high-frequency general vocabulary & chunks -> basic productive grammar / patterns -> listening -> interaction / speaking -> reading & writing -> mixed checkpoint -> delayed retrieval`

### Communicative application

`scene -> notice/listen -> understand -> manipulate -> respond -> produce -> checkpoint -> retrieve later`

The second sequence **applies** the first; it does not replace it. `scene -> dialogue -> quiz -> next lesson` is insufficient when the learner has not been given the sound, lexical, grammatical, reading, and writing tools needed to understand and produce the language.

## Required foundation coverage

Every core language curriculum map MUST deliberately account for all eight dimensions:

| Dimension | Requirement |
|---|---|
| Pronunciation / sound | Teach the sound system needed for intelligibility and listening discrimination |
| Vocabulary / chunks | Build high-frequency **general-language** words and reusable chunks in context |
| Grammar / patterns | Teach the smallest productive structures needed to build new sentences |
| Listening | Move from sound/form discrimination to extracting meaning from short input |
| Speaking / interaction | Require appropriate responses and controlled production, not only recognition |
| Reading | Teach the writing-system support required by the target language and reduce scaffolding gradually |
| Writing | Require controlled typing/writing or sentence construction where technically supported |
| Review | Mix vocabulary, grammar, listening and production through checkpoints and FSRS |

A course may distribute these dimensions across prerequisite and communicative units. It must not leave one absent merely because its Can-Do scenes look realistic.

## Core vs specialty tracks

Core tracks teach **general language**. Specialist/domain terminology belongs in a separate optional specialty path.

Examples:

```text
Languages
├── Mandarin
├── English
├── Japanese
└── Specialty
    └── Chinese for IT
```

Everyday words such as phone/computer may appear in a core course when the learning objective is ordinary language use. Terms such as algorithm, neural network, overfitting, or NLP do not define core Mandarin progression.

## Unit model

Foundation Unit 0/prerequisite nodes may organize sound, writing-system, vocabulary, and grammar progression. Later units use practical Can-Do outcomes to prove that the learner can use those tools.

Themes such as `food`, `family`, `devices`, or `travel` are vocabulary domains, not sufficient goals by themselves.

Every new V3 node MUST declare:

- learner-facing `can_do`
- a reusable `pattern` when a form is taught
- ordered `steps`
- stable IDs on assessed/reviewable steps
- a lexical load small enough to use in context
- explanation copy in the selected explanation locale

## Step model

| Step | Purpose |
|---|---|
| `scene` | Establish a concrete situation and goal |
| `dialogue` | Show meaningful target-language interaction |
| `listen` | Focus attention on target audio/input |
| `tip` | Give one concise grammar/pronunciation/writing-system/politeness note |
| `teach` | Introduce a small set of forms in context |
| `practice` | Retrieval, manipulation, discrimination, or response task |
| `checkpoint` | Mixed retrieval of current and earlier material |

Do not add steps decoratively. The learner must do meaningful work.

## Exercise ladder

A complete foundation + communicative path reaches:

1. recognition
2. comprehension
3. controlled recall
4. interaction
5. production
6. delayed retrieval

Prefer semantic exercise types (`meaning_choice`, `audio_choice`, `dialogue_choice`, `match_pairs`, `order_words`, `type_answer`, `listen_type`, etc.). Legacy generic `mcq` is compatibility-only for new content.

## Feedback, review, audio and visuals

Wrong answers are learning events: keep the learner on the item, reveal help progressively, explain the relevant contrast, and retrieve failed material again.

Lesson completion and memory are separate. Signed-in learners use server-side FSRS with stable item keys and append-only review history.

Audio is first-class input. Prefer curated recordings where pronunciation quality matters; TTS is a graceful fallback. Never autoplay on navigation and never hard-code a shared player to one target language.

Visuals must carry learning information: scene relationships, concrete meaning, word order, tone/stress, kana/character structure, or other real contrasts. Shared instructional assets must not leak one explanation locale into another.

## Language-specific adaptation

### English

Foundation order:

`sound ↔ spelling -> high-value vowel/consonant contrasts -> word stress/prosody -> reusable chunks -> small productive grammar core -> listening/interaction -> reading/writing production -> review`

- Target intelligibility, not accent imitation.
- IPA is reference support, not a prerequisite alphabet.
- Teach high-frequency general language before specialty terminology.
- Accept harmless case/spacing/punctuation variants when grading equivalent production.

### Mandarin Chinese

Foundation order:

`Pinyin syllables + initials/finals -> four tones + neutral tone -> relevant connected-speech tone changes -> high-frequency general vocabulary -> sentence order/grammar patterns -> listening/speaking -> gradual Hanzi reading/writing -> review`

- Coordinate Hanzi, tone-marked canonical Pinyin, audio, and meaning.
- Teach questions, negation, possession, quantity/measure words, time expressions and basic particles/aspect as level-appropriate productive tools.
- Early Pinyin support may be heavier, but character recognition must grow and scaffolding should reduce deliberately.
- Do not call the current regular HSK Level 1 150-word boundary the vocabulary boundary of the new 2021 three-band/nine-level standard.

### Japanese

Foundation order:

`kana ↔ sound -> mora timing / long vowels / small っ and other beginner sound-length contrasts -> high-frequency general vocabulary -> basic sentence order + particles + polite forms -> listening/speaking -> kana + gradual basic kanji reading/writing -> review`

- Coordinate surface form, kana reading, basic kanji, particles, and register.
- Treat hiragana/katakana as a real prerequisite instead of permanent reading decoration.
- Long-vowel/small-っ distinctions must be taught through listening and reading/typing, not just described.
- Reading support may reduce only after the relevant forms have been taught.
- JLPT N5 is an ability boundary, not an official word/kanji/grammar checklist.

### Specialty language tracks

Embed terminology in realistic actions such as ask, identify, describe, compare, report, or troubleshoot. Specialty tracks are optional and never prerequisites for the core language foundation.

## Authoring voice and locale rule

- Write original, natural language.
- Target-language examples, IPA/Pinyin/kana and target forms stay in the target language.
- Learner-facing instructions, explanations, hints, glosses and accessibility descriptions belong in the selected `vi` or `en` explanation locale.
- EN/VI variants preserve learning intent and stable assessment identity but should sound natural rather than mirror word order.
- Avoid AI filler, fake enthusiasm, emoji clusters, glossary dumps and textbook bureaucracy.

## Compatibility

V2 lessons remain readable. Missing practice IDs may receive deterministic fallback keys and legacy MCQ can be normalized by the renderer, but compatibility is a migration tool, not the target format.

## Quality gates

A core-language slice is not done until:

1. its public map covers pronunciation, vocabulary, grammar, listening, speaking, reading, writing and review
2. target-language naturalness has been reviewed
3. explanation-locale purity and EN/VI identity parity pass
4. stable reviewable items exist and fallback answers grade correctly
5. keyboard/screen-reader/mobile paths remain usable
6. static Language V3 + track-specific gates pass
7. API/cold parser tests pass where curriculum parsing is involved
8. PostgreSQL-backed E2E verifies exact live inventory, progress/notes and FSRS persistence on the exact release commit

## Don't

- Do not replace language foundations with attractive situation-only sequencing.
- Do not replace core language with IT/specialty vocabulary.
- Do not author a new lesson as a word list plus one generic MCQ.
- Do not call random completed-question sampling spaced repetition.
- Do not hard-code Mandarin behavior in shared language controls.
- Do not mass-generate curriculum while the player/content contract has known quality gaps.

## Related

- `language-content-quality-v3.md`
- `language-review-session.md`
- `language-step-audio.md`
- `languages-tracks.md`
- `language-learning-pedagogy-v2.md` (historical compatibility)
