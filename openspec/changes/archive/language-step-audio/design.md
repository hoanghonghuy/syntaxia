# Design — language-step-audio

## Playback

1. If `audioUrl` present → `new Audio(url).play()`
2. Else → `speechSynthesis.speak(SpeechSynthesisUtterance)` with BCP-47 from track
3. No-op / soft fail if Speech API missing (SSR or unsupported browser)

## Track → voice lang

| Track | Lang tag |
|-------|----------|
| chinese-hsk, chinese-it-vocab | `zh-CN` |
| english-basics | `en-US` |
| japanese-jlpt | `ja-JP` |
| other | `en-US` |

## UI

Compact ghost button “Listen” beside each speakable string; stop previous utterance before new one.
