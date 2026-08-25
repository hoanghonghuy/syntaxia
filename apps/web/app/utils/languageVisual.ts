export const LANGUAGE_VISUAL_KEYS = [
  'classmates-meeting',
  'student-leaving',
  'student-studying',
  'shop-counter-request',
  'home-room',
  'weekend-plan',
  'tech-repair-desk',
  'qr-code-login',
  'ai-project-flow',
  'model-training-monitor',
  'nlp-context-window',
  'china-tech-hubs',
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
  'home-room': {
    key: 'home-room',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'A simple bedroom places a bed, table, chair, and book in clear spatial relationships for existence and location language.',
  },
  'weekend-plan': {
    key: 'weekend-plan',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'Two friends connect a familiar free-time activity with a park and clock cue to form a concrete shared plan.',
  },
  'tech-repair-desk': {
    key: 'tech-repair-desk',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'A repair desk shows a computer, a physical chip, and a software screen so hardware and software can be contrasted.',
  },
  'qr-code-login': {
    key: 'qr-code-login',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'A phone scans a QR code to enter an online service, linking WeChat, scanning, and Internet access.',
  },
  'ai-project-flow': {
    key: 'ai-project-flow',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'A simple project flow connects data, an algorithm, and a model to show how basic AI terms relate.',
  },
  'model-training-monitor': {
    key: 'model-training-monitor',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'A training monitor shows two diverging learning curves, giving a concrete cue for training and overfitting.',
  },
  'nlp-context-window': {
    key: 'nlp-context-window',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'A sequence of text tokens highlights a central token and its surrounding context for an NLP discussion.',
  },
  'china-tech-hubs': {
    key: 'china-tech-hubs',
    kind: 'scene',
    provenance: 'syntaxia-original',
    learningSignal: 'Two location markers connect a hardware-market cue and a technology-company cue to compare major Chinese tech hubs.',
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
