export type LanguageTrackProfile = {
  targetLang: string
  speechLang: string
}

const LANGUAGE_TRACK_PROFILES: Readonly<Record<string, LanguageTrackProfile>> = {
  'english-basics': { targetLang: 'en', speechLang: 'en-US' },
  'chinese-hsk': { targetLang: 'zh-Hans', speechLang: 'zh-CN' },
  'chinese-it-vocab': { targetLang: 'zh-Hans', speechLang: 'zh-CN' },
  'japanese-jlpt': { targetLang: 'ja', speechLang: 'ja-JP' },
}

const UNKNOWN_LANGUAGE_PROFILE: LanguageTrackProfile = {
  targetLang: 'und',
  speechLang: '',
}

export function languageTrackProfile(trackId: string): LanguageTrackProfile {
  return LANGUAGE_TRACK_PROFILES[trackId] ?? UNKNOWN_LANGUAGE_PROFILE
}

export function languageTargetLangForTrack(trackId: string): string {
  return languageTrackProfile(trackId).targetLang
}

export function languageSpeechLangForTrack(trackId: string): string {
  return languageTrackProfile(trackId).speechLang
}
