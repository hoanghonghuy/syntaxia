/** Language-track lesson helpers for the production language player. */

export type LanguageTargetLang = 'en' | 'zh-Hans' | 'ja'

export type LanguageVocabItem = {
  form: string
  reading: string
  gloss: string
  lang: string
}

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

export type LanguageExerciseType =
  | 'mcq'
  | 'meaning_choice'
  | 'image_choice'
  | 'audio_choice'
  | 'dialogue_choice'
  | 'match_pairs'
  | 'order_words'
  | 'fill_blank'
  | 'type_answer'
  | 'listen_type'

export type LanguageChoiceMedia = {
  value: string
  imageUrl?: string
  alt?: string
}

export type LanguageMatchPair = {
  left: string
  right: string
}

export type LanguageExercise = {
  id?: string
  type: LanguageExerciseType
  prompt: string
  answer: string
  acceptedAnswers?: string[]
  choices?: string[]
  choiceMedia?: LanguageChoiceMedia[]
  tokens?: string[]
  pairs?: LanguageMatchPair[]
  hints?: string[]
  explanation?: string
  audioText?: string
  audioUrl?: string
  vocab?: LanguageVocabItem[]
  hskBand?: number
  cefrLevel?: string
  jlptLevel?: string
}

export function languageTargetLang(trackId: string): LanguageTargetLang {
  if (trackId === 'english-basics') return 'en'
  if (trackId === 'japanese-jlpt') return 'ja'
  return 'zh-Hans'
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

function stringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out = value.filter((item): item is string => typeof item === 'string')
  return out.length ? out : undefined
}

function normalizeExerciseType(value: unknown): LanguageExerciseType {
  switch (value) {
    case 'meaning_choice':
    case 'image_choice':
    case 'audio_choice':
    case 'dialogue_choice':
    case 'match_pairs':
    case 'order_words':
    case 'fill_blank':
    case 'type_answer':
    case 'listen_type':
      return value
    default:
      return 'mcq'
  }
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
  const prompt = typeof ex.prompt === 'string' ? ex.prompt : ''
  const type = normalizeExerciseType(ex.type)
  let answer = typeof ex.answer === 'string' ? ex.answer : ''
  if (!answer && type === 'match_pairs' && Array.isArray(ex.pairs)) {
    answer = canonicalPairAnswer(ex.pairs)
  }
  if (!prompt || !answer) return null
  return exerciseFromRecord(ex, type, prompt, answer)
}

function canonicalPairAnswer(rawPairs: unknown[]): string {
  return rawPairs.flatMap((raw) => {
    const row = asRecord(raw)
    if (!row || typeof row.left !== 'string' || typeof row.right !== 'string') return []
    return [`${row.left}=${row.right}`]
  }).sort().join('|')
}

function exerciseFromRecord(
  rec: Record<string, unknown>,
  type: LanguageExerciseType,
  prompt: string,
  answer: string,
): LanguageExercise {
  const choiceMedia = Array.isArray(rec.choiceMedia)
    ? rec.choiceMedia.flatMap((raw) => {
        const row = asRecord(raw)
        if (!row || typeof row.value !== 'string') return []
        return [{
          value: row.value,
          imageUrl: typeof row.imageUrl === 'string' ? row.imageUrl : undefined,
          alt: typeof row.alt === 'string' ? row.alt : undefined,
        }]
      })
    : undefined
  const pairs = Array.isArray(rec.pairs)
    ? rec.pairs.flatMap((raw) => {
        const row = asRecord(raw)
        if (!row || typeof row.left !== 'string' || typeof row.right !== 'string') return []
        return [{ left: row.left, right: row.right }]
      })
    : undefined
  return {
    id: typeof rec.id === 'string' ? rec.id : undefined,
    type,
    prompt,
    answer,
    acceptedAnswers: stringArray(rec.acceptedAnswers),
    choices: stringArray(rec.choices),
    choiceMedia: choiceMedia?.length ? choiceMedia : undefined,
    tokens: stringArray(rec.tokens),
    pairs: pairs?.length ? pairs : undefined,
    hints: stringArray(rec.hints),
    explanation: typeof rec.explanation === 'string' ? rec.explanation : undefined,
    audioText: typeof rec.audioText === 'string' ? rec.audioText : undefined,
    audioUrl: typeof rec.audioUrl === 'string' ? rec.audioUrl : undefined,
  }
}

export function normalizeLanguageAnswer(
  value: string,
  targetLang: LanguageTargetLang = 'zh-Hans',
): string {
  let normalized = value
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
  if (targetLang === 'en') {
    normalized = normalized
      .toLocaleLowerCase('en-US')
      .replace(/[.!?]+$/g, '')
      .trim()
  }
  return normalized
}

export function gradeLanguageExercise(
  exercise: Pick<LanguageExercise, 'answer' | 'acceptedAnswers'> | null | undefined,
  submission: string,
  targetLang: LanguageTargetLang = 'zh-Hans',
): boolean {
  if (!exercise || typeof exercise.answer !== 'string') return false
  const got = normalizeLanguageAnswer(submission, targetLang)
  if (!got) return false
  const accepted = [exercise.answer, ...(exercise.acceptedAnswers || [])]
  return accepted.some((value) => normalizeLanguageAnswer(value, targetLang) === got)
}

export type LanguageStepScene = {
  type: 'scene'
  title?: string
  body?: string
  imageUrl?: string
  imageAlt?: string
}

export type LanguageStepDialogue = {
  type: 'dialogue'
  lines: { speaker?: string; text: string; reading?: string; audioUrl?: string }[]
}

export type LanguageStepListen = {
  type: 'listen'
  text: string
  reading?: string
  prompt?: string
  audioUrl?: string
}

export type LanguageStepTip = {
  type: 'tip'
  title: string
  body: string
}

export type LanguageStepTeach = {
  type: 'teach'
  items: {
    form: string
    reading?: string
    gloss?: string
    example?: string
    audioUrl?: string
  }[]
}

export type LanguageStepPractice = {
  type: 'practice' | 'checkpoint'
  id?: string
  kind?: LanguageExerciseType
  prompt?: string
  answer?: string
  acceptedAnswers?: string[]
  choices?: string[]
  choiceMedia?: LanguageChoiceMedia[]
  tokens?: string[]
  pairs?: LanguageMatchPair[]
  hints?: string[]
  explanation?: string
  audioText?: string
  audioUrl?: string
  items?: LanguageStepPractice[]
}

export type LanguageStep =
  | LanguageStepScene
  | LanguageStepDialogue
  | LanguageStepListen
  | LanguageStepTip
  | LanguageStepTeach
  | LanguageStepPractice
  | { type: string; [key: string]: unknown }

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
  if (rec.type === 'checkpoint' && Array.isArray(rec.items) && rec.items.length) return null
  const prompt = typeof rec.prompt === 'string' ? rec.prompt : ''
  const kind = normalizeExerciseType(rec.kind)
  let answer = typeof rec.answer === 'string' ? rec.answer : ''
  if (!answer && kind === 'match_pairs' && Array.isArray(rec.pairs)) {
    answer = [...rec.pairs].map((pair) => `${pair.left}=${pair.right}`).sort().join('|')
  }
  if (!prompt || !answer) return null
  return exerciseFromRecord(
    rec as unknown as Record<string, unknown>,
    kind,
    prompt,
    answer,
  )
}

export function reviewKeyForStep(
  step: LanguageStepPractice,
  stepIndex: number,
  checkpointIndex?: number,
): string {
  if (typeof step.id === 'string' && step.id.trim()) return step.id.trim()
  if (typeof checkpointIndex === 'number') {
    return `step-${stepIndex + 1}-item-${checkpointIndex + 1}`
  }
  return `step-${stepIndex + 1}`
}
