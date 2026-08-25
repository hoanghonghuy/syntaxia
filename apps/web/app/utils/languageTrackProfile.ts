export type LanguageTrackProfile = {
  targetLang: string
  speechLang: string
  homeLabel?: string
  specialty?: boolean
}

const LANGUAGE_TRACK_PROFILES: Readonly<Record<string, LanguageTrackProfile>> = {
  'english-basics': { targetLang: 'en', speechLang: 'en-US', homeLabel: 'EN' },
  'chinese-hsk': { targetLang: 'zh-Hans', speechLang: 'zh-CN', homeLabel: '中文' },
  'chinese-it-vocab': { targetLang: 'zh-Hans', speechLang: 'zh-CN', specialty: true },
  'japanese-jlpt': { targetLang: 'ja', speechLang: 'ja-JP', homeLabel: '日本語' },
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
