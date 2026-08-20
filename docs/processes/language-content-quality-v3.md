# Language content quality v3

## Purpose

Define the authoring and review bar for production language content in Syntaxia. This file turns the pedagogy in `language-learning-pedagogy-v3.md` into concrete checks for wording, visuals, audio, exercises, accessibility, and locale parity.

Language lessons are guided communicative sessions. They are not IT articles, vocabulary dumps, or decorative quiz pages.

## When to use

- Writing or reviewing any English, Mandarin, Japanese, or specialty-language lesson
- Adding `scene`, `dialogue`, `listen`, `teach`, `practice`, or `checkpoint` steps
- Adding image or audio assets
- Reviewing vi/en lesson parity
- Migrating v2 language content to v3

## Authoring contract

Every published v3 lesson MUST:

1. Declare one learner-facing `can_do` that describes an action the learner can perform.
2. Put target language inside a believable situation before explaining it.
3. Use natural dialogue that still makes pragmatic sense when the vocabulary list is hidden.
4. Include multiple assessed attempts with stable IDs.
5. Reach controlled recall or production, not stop at recognition.
6. End with a checkpoint that retrieves the lesson goal or earlier material.
7. Keep explanations shorter than the interaction they support.
8. Preserve the same learning intent in vi/en without literal machine-style translation.

A theme such as `food`, `family`, or `places` is not a goal by itself. Prefer goals such as “order a drink politely” or “say where a family member lives”.

## Wording and naturalness

### Target-language copy

- Prefer high-frequency, context-appropriate chunks.
- Do not insert a word only so every vocabulary item appears once.
- Avoid unnatural exchanges assembled from isolated beginner words.
- Keep register, politeness, tense, particles, collocations, and word order internally consistent.
- Distractors must be plausible enough to test understanding but must not teach malformed language as if it were valid.
- Production answers should accept harmless variants where meaning and form are equivalent.

### Explanation-locale copy

- Use short, direct sentences.
- Explain one contrast at a time.
- Define terminology only when it helps the learner perform the task.
- Avoid hype, filler, emoji clusters, “AI buddy” phrasing, and textbook bureaucracy.
- Vietnamese and English explanation variants should sound native in their own language.

## Visual learning

Visuals MUST carry learning information. They are not page decoration.

### Use a visual when it helps the learner infer

- who is speaking and their relationship
- where the interaction happens
- what object/action is being referred to
- a concrete contrast between meanings
- word order, stress, tone, kana, or character structure

### Prefer UI-native visual forms when an illustration is unnecessary

- contrast cards
- token ordering
- highlighted sentence parts
- tone/stress markers
- character/kana structure cues
- small diagrams

### Media rules

- Do not hotlink random stock images or unstable third-party URLs.
- Prefer app-owned/static assets with stable paths and documented provenance.
- `scene.imageUrl` must have useful `imageAlt`.
- `image_choice` choices must have accessible alternatives.
- Alt text must describe the learning-relevant visual information. If accurate alt text would trivially reveal the assessed answer, provide an equivalent accessible task instead of hiding information from assistive-technology users.
- Do not force abstract grammar or courtesy functions into misleading pictures.

A concrete golden-unit scene should normally include a semantic visual. A lesson may intentionally use no image when text/audio/diagram is the better representation; that decision should be reviewable rather than accidental.

## Audio and listening-first behavior

Audio is first-class input.

- Prefer curated `audioUrl` where pronunciation quality matters.
- Browser TTS is a fallback, not the pronunciation gold standard.
- Never autoplay on navigation or step change.
- For a dedicated `listen` step, successful audio/TTS playback MUST NOT automatically reveal the transcript.
- After one listen attempt, the learner may explicitly reveal the transcript.
- If both recorded audio and TTS are unavailable, reveal the text immediately so the learner is not trapped.
- Dialogue and teach steps may show text while also offering Listen because their instructional purpose is not blind listening.
- Target speech language comes from the track profile; never hard-code Mandarin in shared controls.

## Exercise mix

A complete unit should cover:

`recognition -> comprehension -> controlled recall -> interaction -> production -> delayed retrieval`

Use the most specific exercise type available. New content should not author generic `mcq` when `meaning_choice`, `audio_choice`, `dialogue_choice`, or another semantic type fits.

Within a lesson:

- do not make every item a choice question
- include at least one recall/production task where suitable
- do not reuse the same distractor pattern until answers become guessable
- do not expose the correct answer in nearby UI or image alt text

## Feedback

Wrong answers are learning events.

- Keep the learner on the item until resolved or intentionally skipped.
- Reveal hints progressively.
- Prefer corrective feedback that names the contrast: word order, meaning, register, particle, tone, spelling, or context.
- An explanation should tell the learner why the expected answer fits, not merely repeat it.
- Failed review material should remain eligible for same-session and scheduled retrieval.

## Language-specific review

### English

- Check natural conversational chunks and collocations.
- IPA is optional support, not the main task.
- Accept sensible case, spacing, and terminal-punctuation variants.

### Mandarin Chinese

- Verify Hanzi, pinyin, tones, tone sandhi where represented, and audio.
- Pinyin supports early reading but must not replace character recognition.
- Avoid dense character-only beginner screens.

### Japanese

- Verify kana/kanji readings, particles, word order, politeness, and register.
- Reading support can reduce only after the relevant forms have been taught.

### Specialty language

- Put terminology inside realistic work actions: ask, identify, describe, compare, report, or troubleshoot.
- Do not ship glossary-only lessons.

## Quality review checklist

Before publishing or migrating a lesson, verify:

- Can-Do is an observable communicative action.
- Scene/dialogue is pragmatically coherent.
- New lexical load is small enough to use during the lesson.
- Audio target language is correct.
- Dedicated listen steps preserve audio-first transcript gating.
- Visuals are semantic, accessible, stable, and not decorative.
- Assessed items have stable IDs.
- Exercise ladder reaches recall/production.
- Hints and explanations teach the error contrast.
- vi/en learning intent matches.
- Mobile layout has no required horizontal scrolling.
- Keyboard and screen-reader paths remain usable.
- Automated curriculum/player checks pass.

## Don't

- Do not write language lessons using the SQL article template.
- Do not call a text-only `scene` “visual learning”.
- Do not add stock art merely to satisfy an image quota.
- Do not auto-reveal listening transcripts after successful playback.
- Do not hide essential information from accessibility users to make an exercise harder.
- Do not mass-generate more curriculum while the player/content contract has known quality gaps.

## Related

- `language-learning-pedagogy-v3.md`
- `language-step-audio.md`
- `language-review-session.md`
- `product-quality-lock.md`
