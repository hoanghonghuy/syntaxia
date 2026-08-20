# Language learning pedagogy v3

## Purpose

Define the production learning model for every Syntaxia language track. Language lessons are not IT articles with quizzes attached: they are guided sessions that move from meaningful input to interaction, production, and scheduled retrieval.

This document supersedes the lesson-shape and review sections of `language-learning-pedagogy-v2.md`. Existing v2 lessons remain readable through compatibility rules while content is upgraded.

## When to use

- Designing or reviewing any language lesson, unit, exercise, review flow, or player UI
- Changing English, Chinese, Japanese, or specialty-language curriculum
- Adding a new language track
- Changing language progress, audio, review, or memory scheduling

## Standards and research lock

Syntaxia uses standards as constraints, not as copied syllabi:

- **CEFR / Can-Do** for communicative goals and progression
- **ACTFL communication modes** as a useful coverage check: interpretive, interpersonal, presentational
- **HSK** for Mandarin coverage and level membership
- **JLPT** for Japanese coverage and level membership
- **FSRS v6** for spaced-repetition scheduling

Reference products such as Duolingo, Busuu, HelloChinese, graded readers, and language classrooms may inform interaction patterns. Syntaxia does not clone their UI or copyrighted lesson prose.

## Product model

### IT learning

`explain -> example -> code -> sandbox -> reflect`

### Language learning

`scene -> notice/listen -> understand -> manipulate -> respond -> produce -> retrieve later`

The two domains may share authentication, catalog, progress, notes, design tokens, and APIs. They must not share a single lesson presentation model when that harms learning.

## Unit model

A language track is organized into communicative **units**. Each unit has one practical Can-Do outcome and contains short lessons that build toward it.

Examples:

- English A1: "Meet someone and exchange names"
- Mandarin: "Greet someone and respond politely"
- Japanese N5: "Introduce yourself with appropriate politeness"
- Chinese IT: "Describe whether a problem is hardware or software"

Themes such as `food`, `family`, or `devices` are vocabulary domains, not sufficient learning goals by themselves.

## Lesson contract

Every new v3 lesson MUST declare:

- a learner-facing `can_do`
- a short `pattern` when a reusable form is taught
- ordered `steps`
- stable IDs on assessed/reviewable steps when authored manually
- no more new lexical items than the learner can use in the lesson context

A lesson should normally take about 5–12 focused minutes. Length is controlled by meaningful attempts, not prose volume.

## Step model

Supported instructional steps:

| Step | Purpose |
|---|---|
| `scene` | Establish a concrete situation and goal |
| `dialogue` | Show meaningful target-language interaction |
| `listen` | Focus attention on audio/input before explanation |
| `tip` | Give one short explicit grammar, pronunciation, tone, or politeness note |
| `teach` | Introduce a small set of forms in context |
| `practice` | One retrieval/manipulation task |
| `checkpoint` | Mixed end-of-lesson retrieval, including prior material |

Do not require every lesson to use every explanatory step. Practice and checkpoint coverage matters more than a fixed decorative sequence.

## Exercise ladder

A complete unit MUST include tasks across the following ladder:

1. **Recognition** — identify a form or meaning
2. **Comprehension** — understand a sentence, audio clip, or situation
3. **Controlled recall** — fill, match, or assemble language
4. **Interaction** — select or create an appropriate response
5. **Production** — type or speak a meaningful answer where technically supported
6. **Delayed retrieval** — encounter the item again through scheduled review

Core v3 exercise types:

- `meaning_choice`
- `image_choice`
- `audio_choice`
- `dialogue_choice`
- `match_pairs`
- `order_words`
- `fill_blank`
- `type_answer`
- `listen_type`
- legacy `mcq` (compatibility only; new content should use a more specific type)

Speech recognition and handwriting may be added as additional exercise types; they are not allowed to block the rest of the production-quality learning loop.

## Feedback

Wrong answers are learning events.

- Never show only "wrong" and advance.
- Keep the learner on the current task until it is resolved or intentionally skipped.
- Reveal hints progressively.
- Prefer an explanation of the contrast that caused the error.
- Re-present failed material later in the same session and through scheduled review.
- Record the result for signed-in learners.

## Review and memory

Lesson completion and memory are separate concepts.

- `lesson_progress` answers: "Did the learner finish this lesson?"
- language memory state answers: "When should this specific item be retrieved again?"

Signed-in learners use server-side FSRS scheduling. Each reviewable item has a stable key and persistent card state. Review history is append-only. Due review is derived from card state, not from randomly sampling completed lessons.

Guest learners can practice normally but do not receive cross-device scheduled memory persistence.

## Audio

Audio is first-class input, not decoration.

1. Prefer curated/recorded `audioUrl` where pronunciation quality matters.
2. Browser speech synthesis may be used as a graceful fallback.
3. Never autoplay lesson audio on navigation.
4. The language tag/voice must be derived from the target language, never hard-coded to Mandarin.
5. Text must remain available for accessibility and environments without audio.

## Visual learning

Visuals must carry semantic value.

Good uses:

- image choice for concrete nouns/actions
- scene illustrations that establish who is speaking and why
- contrast cards for grammar or politeness
- word-order/token layouts
- tone, stress, kana, or character structure cues

Bad uses:

- decorative stock imagery unrelated to the answer
- forcing abstract words into misleading pictures
- showing an icon when text contrast would teach the pattern more clearly

## Language-specific adaptation

### English

- Prefer high-frequency chunks and natural conversational turns.
- Use IPA as optional support, not the core task.
- Accept sensible case/spacing variants when grading text.
- Progress toward listening and sentence production, not vocabulary translation only.

### Mandarin Chinese

- Coordinate Hanzi, pinyin, tones, and audio.
- Early lessons may expose more pinyin; support should reduce as recognition improves.
- Tone information must be accurate and visible where pronunciation is being taught.
- Do not overload beginners with dense character-only screens.

### Japanese

- Coordinate surface form, kana reading, kanji, particles, and politeness/register.
- Reading support may reduce over time but must not be removed before the unit has taught it.
- Sentence examples must preserve natural Japanese word order and register.

### Specialty language tracks

- Domain terminology must be embedded in realistic tasks (describe, compare, ask, report), not glossary dumps.

## Authoring voice

- Write original, natural language.
- A dialogue must make pragmatic sense even if the vocabulary list is removed from view.
- Never insert a word merely so every vocabulary item appears once.
- Explanations are concise and adult-appropriate.
- Avoid AI filler, fake enthusiasm, emoji clusters, and textbook bureaucracy.
- `vi` and `en` explanation locales must communicate the same learning intent, but should read naturally in each language rather than mirror word order.

## Compatibility

V2 `dialogue/tip/teach/practice/checkpoint` lessons remain supported.

- Missing practice IDs receive deterministic fallback keys derived from step/checkpoint position.
- Legacy `mcq` is normalized to the v3 choice renderer.
- Bare vocab + one-exercise lessons remain readable but MUST NOT be authored as new content.

Compatibility is a migration tool, not the target format.

## Quality gates

A language feature or curriculum slice is not done until:

1. pedagogy/schema documented
2. content has stable reviewable items
3. target-language text has a naturalness pass
4. vi/en parity passes where both explanation locales are required
5. keyboard and screen-reader paths are usable
6. mobile layout is usable without horizontal overflow
7. unit/component tests pass
8. API tests pass when persistence changes
9. E2E language smoke passes
10. review state survives reload/device changes for signed-in learners

## Don't

- Do not reuse SQL lesson-shape rules for language content.
- Do not call random completed-question sampling "spaced repetition".
- Do not hard-code `zh-Hans` in shared language controls.
- Do not ship a new language lesson containing only a word list and one MCQ.
- Do not mass-generate curriculum before the player and authoring contract are stable.

## Related

- `language-content-quality-v3.md`
- `language-review-session.md`
- `language-step-audio.md`
- `language-learning-pedagogy-v2.md` (historical compatibility)
- `openspec/changes/language-learning-v3/`
