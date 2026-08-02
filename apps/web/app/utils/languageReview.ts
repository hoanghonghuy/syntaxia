/** Build review practice items from completed language lessons’ steps. */

import {
  practiceFromStep,
  type LanguageExercise,
  type LanguageStep,
} from './languageLesson.ts'

export const REVIEW_SESSION_SIZE = 8

export function extractReviewExercisesFromLesson(lesson: {
  exercise?: Record<string, unknown> | null
}): LanguageExercise[] {
  const ex = lesson.exercise
  if (!ex || typeof ex !== 'object') return []
  const steps = ex.steps
  if (!Array.isArray(steps)) return []
  const out: LanguageExercise[] = []
  for (const raw of steps) {
    if (!raw || typeof raw !== 'object') continue
    const step = raw as LanguageStep
    const practice = practiceFromStep(step)
    if (practice) out.push(practice)
    if (step.type === 'checkpoint' && Array.isArray((step as { items?: unknown }).items)) {
      for (const item of (step as { items: unknown[] }).items) {
        if (!item || typeof item !== 'object') continue
        const nested = practiceFromStep({
          ...(item as object),
          type: 'practice',
        } as LanguageStep)
        if (nested) out.push(nested)
      }
    }
  }
  return out
}

export function dedupeReviewExercises(items: LanguageExercise[]): LanguageExercise[] {
  const seen = new Set<string>()
  const out: LanguageExercise[] = []
  for (const item of items) {
    const key = `${item.prompt}\0${item.answer}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(item)
  }
  return out
}

/** Deterministic shuffle when `rng` provided; otherwise Math.random. */
export function shuffleReviewExercises(
  items: LanguageExercise[],
  rng: () => number = Math.random,
): LanguageExercise[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = copy[i]!
    copy[i] = copy[j]!
    copy[j] = tmp
  }
  return copy
}

export function buildReviewSession(
  lessons: { exercise?: Record<string, unknown> | null }[],
  options: { size?: number; rng?: () => number } = {},
): LanguageExercise[] {
  const size = options.size ?? REVIEW_SESSION_SIZE
  const pooled: LanguageExercise[] = []
  for (const lesson of lessons) {
    pooled.push(...extractReviewExercisesFromLesson(lesson))
  }
  const unique = dedupeReviewExercises(pooled)
  return shuffleReviewExercises(unique, options.rng).slice(0, size)
}

export function completedLessonSummaries(
  lessons: { id: string; slug: string; sortOrder: number }[],
  progress: { lessonId: string; locale: string; completed: boolean }[],
  locale: string,
): { id: string; slug: string; sortOrder: number }[] {
  const done = new Set(
    progress
      .filter((p) => p.locale === locale && p.completed)
      .map((p) => p.lessonId),
  )
  return [...lessons]
    .filter((l) => done.has(l.id))
    .sort((a, b) => a.sortOrder - b.sortOrder)
}
