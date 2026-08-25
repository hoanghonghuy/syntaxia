import type { LanguageExercise } from './languageLesson.ts'

export const LANGUAGE_SOLUTION_REVEAL_ATTEMPTS = 3

export function progressiveLanguageHintCount(
  failedAttempts: number,
  manuallyRevealed: number,
  totalHints: number,
): number {
  const total = Math.max(0, Math.trunc(totalHints))
  const automatic = Math.max(0, Math.trunc(failedAttempts))
  const manual = Math.max(0, Math.trunc(manuallyRevealed))
  return Math.min(total, Math.max(automatic, manual))
}

export function canRevealLanguageSolution(failedAttempts: number): boolean {
  return Math.max(0, Math.trunc(failedAttempts)) >= LANGUAGE_SOLUTION_REVEAL_ATTEMPTS
}

export function languageExerciseSolution(exercise: LanguageExercise): string {
  if (exercise.type === 'match_pairs' && exercise.pairs?.length) {
    return exercise.pairs.map((pair) => `${pair.left} → ${pair.right}`).join(' · ')
  }

  if (exercise.type === 'image_choice') {
    const media = exercise.choiceMedia?.find((item) => item.value === exercise.answer)
    const accessible = media?.alt?.trim()
    if (accessible) return accessible
  }

  return exercise.answer
}
