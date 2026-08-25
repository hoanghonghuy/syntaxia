# Language step audio (listen)

## Purpose

Define how learners hear target-language content and how dedicated listening steps preserve an audio-first experience without becoming an accessibility dead end.

## When to use

- Adding Listen controls or speech-language mapping
- Authoring curriculum with optional recorded audio
- Changing transcript reveal behavior
- Reviewing language-player accessibility

## Playback contract

1. Prefer a curated `audioUrl` when a hosted recording exists and pronunciation quality matters.
2. Otherwise `playLanguageAudio` falls back to Web Speech using `speechLangForTrack(trackId)`.
3. Audio is always user-triggered; never autoplay on navigation or step change.
4. Shared speech language comes from `languageTrackProfile.ts`; unknown tracks do not guess a language.

## Dedicated `listen` step

A `listen` step is different from dialogue/teach text with an attached audio button.

- Before playback, the transcript stays hidden.
- When recorded audio or TTS starts successfully, the transcript remains hidden.
- After the first listen attempt, the learner receives an explicit transcript-reveal control.
- If playback returns `none`, the transcript is revealed immediately so the learner can continue.
- Moving to another step resets listen/transcript state.

This preserves listening-first pedagogy while keeping text available when audio cannot be used.

## Dialogue and teach steps

Dialogue and teach steps may display target-language text while offering `LanguageListenButton`. Their goal is contextualized input or form study rather than blind listening.

## Do

- Prefer recorded audio for pronunciation-sensitive material.
- Keep text/transcript available as an accessibility fallback.
- Keep playback initiated by a user gesture.
- Test `audio`, `tts`, and `none` modes.
- Test that successful playback does not auto-reveal a dedicated listen transcript.

## Don't

- Do not require CDN audio for every item before a lesson can work.
- Do not auto-reveal the transcript simply because Listen was clicked.
- Do not hard-code `zh-Hans` or `zh-CN` in shared language controls.
- Do not hide the transcript permanently when playback is unavailable.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- `apps/web/app/utils/languageAudio.ts`
- `apps/web/app/components/LanguageLessonSteps.vue`
