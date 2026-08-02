# Language step audio (listen)

Add listen controls on dialogue/teach steps: prefer optional `audioUrl`, else browser TTS (Web Speech API).

## Context

- Change ID: `language-step-audio`
- Pedagogy: [`language-learning-pedagogy-v2.md`](../../../docs/processes/language-learning-pedagogy-v2.md) — audio was deferred; unlock now
- Player: `LanguageLessonSteps.vue`

## Scope

### In

1. `speakLanguageText` / `playLanguageAudio` helpers (client-only)
2. Listen button on dialogue lines + teach forms/examples
3. Optional frontmatter `audioUrl` on line/item; TTS fallback by track (`zh-CN` / `en-US` / `ja-JP`)
4. Tests + process note; no requirement to re-author all curriculum with URLs

### Out

Speech recognition, recorded asset CDN pipeline, autoplay on step enter

## Decision

TTS-first with `audioUrl` override — ships listening practice without hosting audio files yet.
