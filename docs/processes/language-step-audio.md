# Language step audio (listen)

## Purpose

How learners hear dialogue/teach content: optional `audioUrl`, otherwise browser TTS.

## When to use

- Adding Listen controls or speech language mapping
- Authoring curriculum with optional recorded audio

## Steps

1. Prefer `audioUrl` on a dialogue line or teach item when a hosted file exists.
2. Otherwise `playLanguageAudio` → Web Speech API with `speechLangForTrack(trackId)`.
3. UI: `LanguageListenButton` inside `LanguageLessonSteps` (dialogue + teach).

## Do / Don't

### Do

- Fail softly if Speech API / autoplay is blocked
- Keep `audioUrl` optional — TTS covers the default path

### Don't

- Require CDN audio for every lemma before shipping listen
- Autoplay on step change (user gesture only)

## Related

- [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)
- OpenSpec: `openspec/changes/archive/language-step-audio/`
