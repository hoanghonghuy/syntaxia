/** Client-side listen helpers for language lesson steps. */

export function speechLangForTrack(trackId: string): string {
  if (trackId === 'chinese-hsk' || trackId === 'chinese-it-vocab') return 'zh-CN'
  if (trackId === 'japanese-jlpt') return 'ja-JP'
  if (trackId === 'english-basics') return 'en-US'
  return 'en-US'
}

export function canUseSpeechSynthesis(
  speech: Pick<SpeechSynthesis, 'speak'> | null | undefined,
): boolean {
  return Boolean(speech && typeof speech.speak === 'function')
}

/** Stop any ongoing utterance, then speak `text` (or no-op). */
export function speakLanguageText(
  text: string,
  lang: string,
  speech: SpeechSynthesis | null | undefined = typeof globalThis !== 'undefined'
    ? globalThis.speechSynthesis
    : undefined,
  Utterance: typeof SpeechSynthesisUtterance | undefined = typeof globalThis !==
  'undefined'
    ? globalThis.SpeechSynthesisUtterance
    : undefined,
): boolean {
  const trimmed = text.trim()
  if (!trimmed) return false
  if (!canUseSpeechSynthesis(speech) || !Utterance || !speech) return false
  try {
    speech.cancel()
    const u = new Utterance(trimmed)
    u.lang = lang
    speech.speak(u)
    return true
  } catch {
    return false
  }
}

export async function playLanguageAudio(
  audioUrl: string | undefined,
  text: string,
  lang: string,
  deps: {
    speech?: SpeechSynthesis | null
    Utterance?: typeof SpeechSynthesisUtterance
    playUrl?: (url: string) => Promise<void>
  } = {},
): Promise<'audio' | 'tts' | 'none'> {
  const url = typeof audioUrl === 'string' ? audioUrl.trim() : ''
  if (url) {
    try {
      if (deps.playUrl) await deps.playUrl(url)
      else if (typeof Audio !== 'undefined') {
        const a = new Audio(url)
        await a.play()
      } else return 'none'
      return 'audio'
    } catch {
      /* fall through to TTS */
    }
  }
  const ok = speakLanguageText(text, lang, deps.speech, deps.Utterance)
  return ok ? 'tts' : 'none'
}
