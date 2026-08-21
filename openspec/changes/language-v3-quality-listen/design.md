# Design — language-v3-quality-listen

## Listen state

`LanguageLessonSteps.vue` owns transient state for the active dedicated listen step:

- `listenAttempted`: at least one playback attempt occurred
- `listenMode`: `audio | tts | none`
- `listenRevealed`: transcript is visible

On `LanguageListenButton.activated(mode)`:

- set attempted + mode
- reveal automatically only when `mode === 'none'`
- keep transcript hidden for `audio` and `tts`

After a successful attempt, show a secondary transcript-reveal control. Step changes reset all three values.

`languageAudio.ts` exposes `LanguageAudioMode` and a pure `shouldRevealTranscriptAfterListen` helper so the accessibility fallback is unit-testable without mounting Vue.

## Copy

The reveal control uses Vue I18n's documented default-message overload. Current locales receive explicit en/vi fallback copy in the component so this focused change does not rewrite large locale JSON files solely for one key. A later broad player-copy pass may promote the key into global locale files.

## Quality contract

`docs/processes/language-content-quality-v3.md` is the canonical authoring QA layer under the broader v3 pedagogy. It covers:

- communicative/natural wording
- semantic visuals and asset rules
- audio/listening-first behavior
- exercise mix and feedback
- accessibility
- English/Mandarin/Japanese adaptations
- vi/en parity

It intentionally does not mandate an image quota; visuals must teach something.

## Verification

- Node built-in test covers audio/TTS/none and transcript-reveal policy.
- Structural regression checks prevent the old direct `listenRevealed = true` event wiring.
- Process docs/checklist are updated together so the implementation and roadmap have one source of truth.
