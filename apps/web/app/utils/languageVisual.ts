export const LANGUAGE_VISUAL_KEYS = [
  'classmates-meeting',
  'student-leaving',
  'student-studying',
  'shop-counter-request',
] as const

export type LanguageVisualKey = (typeof LANGUAGE_VISUAL_KEYS)[number]

export type LanguageVisualAsset = {
  key: LanguageVisualKey
  kind: 'scene' | 'choice'
  provenance: 'syntaxia-original'
  learningSignal: string
}

const LANGUAGE_VISUAL_ASSETS: Readonly<Record<LanguageVisualKey, LanguageVisualAsset>> = {
  'classmates-meeting': {
    key: 'classmates-meeting',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'Two learners face each other and begin a short classroom interaction.',
  },
  'student-leaving': {
    key: 'student-leaving',
    kind: 'choice',
    provenance: 'syntaxia-original',
    learningSignal: 'One learner is leaving the classroom.',
  },
  'student-studying': {
    key: 'student-studying',
    kind: 'choice',
    provenance: 'syntaxia-original',
    learningSignal: 'One learner studies alone at a desk.',
  },
  'shop-counter-request': {
    key: 'shop-counter-request',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'A customer points to a chosen item at a small shop counter while speaking to the clerk.',
  },
}

export function isLanguageVisualKey(value: unknown): value is LanguageVisualKey {
  return typeof value === 'string' && LANGUAGE_VISUAL_KEYS.includes(value as LanguageVisualKey)
}

export function languageVisualAsset(value: unknown): LanguageVisualAsset | null {
  return isLanguageVisualKey(value) ? LANGUAGE_VISUAL_ASSETS[value] : null
}

export function isAppOwnedLanguageImageUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const normalized = value.trim()
  if (!normalized.startsWith('/language/') || normalized.startsWith('//')) return false
  if (/[\\?#\u0000-\u001F]/.test(normalized)) return false

  let decoded: string
  try {
    decoded = decodeURIComponent(normalized)
  } catch {
    return false
  }

  return decoded.startsWith('/language/') && !decoded.includes('..') && !decoded.includes('\\')
}
