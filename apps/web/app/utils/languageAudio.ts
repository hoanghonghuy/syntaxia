import { languageSpeechLangForTrack } from './languageTrackProfile.ts'

/** Client-side listen helpers for language lesson steps. */

export type LanguageAudioMode = 'audio' | 'tts' | 'none'

export function speechLangForTrack(trackId: string): string {
  return languageSpeechLangForTrack(trackId)
}

export function canUseSpeechSynthesis(
  speech: Pick<SpeechSynthesis, 'speak'> | null | undefined,
): boolean {
  return Boolean(speech && typeof speech.speak === 'function')
}

/**
 * Audio-first listen steps keep the transcript hidden after successful
 * playback. If playback is unavailable, reveal text immediately so the step
 * never becomes an accessibility dead end.
 */
export function shouldRevealTranscriptAfterListen(mode: LanguageAudioMode): boolean {
  return mode === 'none'
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
): Promise<LanguageAudioMode> {
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
