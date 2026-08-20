import { languageSpeechLangForTrack } from './languageTrackProfile.ts'

/** Client-side listen helpers for language lesson steps. */

export function speechLangForTrack(trackId: string): string {
  return languageSpeechLangForTrack(trackId)
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
  const normalizedLang = lang.trim()
  if (!trimmed || !normalizedLang) return false
  if (!canUseSpeechSynthesis(speech) || !Utterance || !speech) return false
  try {
    speech.cancel()
    const utterance = new Utterance(trimmed)
    utterance.lang = normalizedLang
    speech.speak(utterance)
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
        const audio = new Audio(url)
        await audio.play()
      } else return 'none'
      return 'audio'
    } catch {
      /* fall through to TTS */
    }
  }
  const ok = speakLanguageText(text, lang, deps.speech, deps.Utterance)
  return ok ? 'tts' : 'none'
}
