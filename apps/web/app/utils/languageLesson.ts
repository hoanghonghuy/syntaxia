/** Language-track lesson helpers (HSK / non-IT sandboxes). */

export type LanguageVocabItem = {
  hanzi: string
  pinyin: string
  gloss: string
}

export type LanguageExercise = {
  type: 'mcq' | 'fill_blank'
  prompt: string
  answer: string
  choices?: string[]
  hints?: string[]
  vocab?: LanguageVocabItem[]
  hskBand?: number
}

export function isLanguageTrack(trackId: string): boolean {
  return trackId === 'chinese-hsk'
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

export function languageVocabFromLesson(lesson: {
  exercise?: Record<string, unknown> | null
}): LanguageVocabItem[] {
  const ex = asRecord(lesson.exercise)
  const raw = ex?.vocab
  if (!Array.isArray(raw)) return []
  const out: LanguageVocabItem[] = []
  for (const row of raw) {
    const item = asRecord(row)
    if (!item) continue
    const hanzi = typeof item.hanzi === 'string' ? item.hanzi.trim() : ''
    if (!hanzi) continue
    out.push({
      hanzi,
      pinyin: typeof item.pinyin === 'string' ? item.pinyin : '',
      gloss: typeof item.gloss === 'string' ? item.gloss : '',
    })
  }
  return out
}

export function languageExerciseFromLesson(lesson: {
  exercise?: Record<string, unknown> | null
}): LanguageExercise | null {
  const ex = asRecord(lesson.exercise)
  if (!ex) return null
  const type = ex.type
  if (type !== 'mcq' && type !== 'fill_blank') return null
  const prompt = typeof ex.prompt === 'string' ? ex.prompt : ''
  const answer = typeof ex.answer === 'string' ? ex.answer : ''
  if (!prompt || !answer) return null
  const choices = Array.isArray(ex.choices)
    ? ex.choices.filter((c): c is string => typeof c === 'string')
    : undefined
  const hints = Array.isArray(ex.hints)
    ? ex.hints.filter((h): h is string => typeof h === 'string')
    : undefined
  const hskBand = typeof ex.hskBand === 'number' ? ex.hskBand : undefined
  return {
    type,
    prompt,
    answer,
    choices,
    hints,
    vocab: languageVocabFromLesson(lesson),
    hskBand,
  }
}

export function gradeLanguageExercise(
  exercise: { type?: string; answer?: string } | null | undefined,
  submission: string,
): boolean {
  if (!exercise || typeof exercise.answer !== 'string') return false
  const expected = exercise.answer.trim()
  const got = submission.trim()
  if (!expected || !got) return false
  return expected === got
}
