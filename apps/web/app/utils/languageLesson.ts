/** Language-track lesson helpers (HSK / English / Japanese / non-IT sandboxes). */

export type LanguageVocabItem = {
  /** Display form: hanzi, English lemma, or Japanese surface */
  form: string
  /** Reading aid: pinyin, IPA, or kana (may be empty) */
  reading: string
  gloss: string
  /** BCP 47-ish tag for the form column */
  lang: string
}

/** @deprecated Prefer LanguageVocabItem.form — kept for call-site clarity in tests */
export type LanguageVocabItemLegacy = {
  hanzi?: string
  pinyin?: string
  word?: string
  ipa?: string
  surface?: string
  reading?: string
  kanji?: string
  kana?: string
  gloss?: string
}

export type LanguageExercise = {
  type: 'mcq' | 'fill_blank'
  prompt: string
  answer: string
  choices?: string[]
  hints?: string[]
  vocab?: LanguageVocabItem[]
  hskBand?: number
  cefrLevel?: string
  jlptLevel?: string
}

export function isLanguageTrack(
  trackId: string,
  category?: string | null,
): boolean {
  if (category === 'languages') return true
  return (
    trackId === 'chinese-hsk' ||
    trackId === 'english-basics' ||
    trackId === 'japanese-jlpt' ||
    trackId === 'chinese-it-vocab'
  )
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
    const word = typeof item.word === 'string' ? item.word.trim() : ''
    const surface = typeof item.surface === 'string' ? item.surface.trim() : ''
    const kanji = typeof item.kanji === 'string' ? item.kanji.trim() : ''
    const kana = typeof item.kana === 'string' ? item.kana.trim() : ''
    const form = hanzi || word || surface || kanji || kana
    if (!form) continue
    const readingField = typeof item.reading === 'string' ? item.reading : ''
    const reading =
      (typeof item.pinyin === 'string' && item.pinyin) ||
      (typeof item.ipa === 'string' && item.ipa) ||
      readingField ||
      ((surface || kanji) && kana ? kana : '') ||
      ''
    let lang = 'en'
    if (hanzi) lang = 'zh-Hans'
    else if (surface || kanji || (kana && !word)) lang = 'ja'
    out.push({
      form,
      reading,
      gloss: typeof item.gloss === 'string' ? item.gloss : '',
      lang,
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
  const cefrLevel = typeof ex.cefrLevel === 'string' ? ex.cefrLevel : undefined
  const jlptLevel = typeof ex.jlptLevel === 'string' ? ex.jlptLevel : undefined
  return {
    type,
    prompt,
    answer,
    choices,
    hints,
    vocab: languageVocabFromLesson(lesson),
    hskBand,
    cefrLevel,
    jlptLevel,
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

export type LanguageStepDialogue = {
  type: 'dialogue'
  lines: { speaker?: string; text: string; reading?: string }[]
}

export type LanguageStepTip = {
  type: 'tip'
  title: string
  body: string
}

export type LanguageStepTeach = {
  type: 'teach'
  items: { form: string; reading?: string; gloss?: string; example?: string }[]
}

export type LanguageStepPractice = {
  type: 'practice' | 'checkpoint'
  kind?: 'mcq' | 'fill_blank'
  prompt?: string
  answer?: string
  choices?: string[]
  hints?: string[]
  /** checkpoint may nest items */
  items?: LanguageStepPractice[]
}

export type LanguageStep =
  | LanguageStepDialogue
  | LanguageStepTip
  | LanguageStepTeach
  | LanguageStepPractice
  | { type: string }

export function languageStepsFromLesson(lesson: {
  exercise?: Record<string, unknown> | null
}): LanguageStep[] {
  const ex = asRecord(lesson.exercise)
  const raw = ex?.steps
  if (!Array.isArray(raw)) return []
  const out: LanguageStep[] = []
  for (const row of raw) {
    const item = asRecord(row)
    if (!item || typeof item.type !== 'string') continue
    out.push(item as LanguageStep)
  }
  return out
}

export function languageHasSteps(lesson: {
  exercise?: Record<string, unknown> | null
}): boolean {
  return languageStepsFromLesson(lesson).length > 0
}

export function practiceFromStep(step: LanguageStep): LanguageExercise | null {
  const rec = step as LanguageStepPractice
  if (rec.type !== 'practice' && rec.type !== 'checkpoint') return null
  if (rec.type === 'checkpoint' && Array.isArray(rec.items) && rec.items.length) {
    return null
  }
  const kind = rec.kind === 'fill_blank' ? 'fill_blank' : 'mcq'
  const prompt = typeof rec.prompt === 'string' ? rec.prompt : ''
  const answer = typeof rec.answer === 'string' ? rec.answer : ''
  if (!prompt || !answer) return null
  return {
    type: kind,
    prompt,
    answer,
    choices: Array.isArray(rec.choices)
      ? rec.choices.filter((c): c is string => typeof c === 'string')
      : undefined,
    hints: Array.isArray(rec.hints)
      ? rec.hints.filter((h): h is string => typeof h === 'string')
      : undefined,
  }
}
