import type { LessonSummary, Progress, Track } from '~/types/api'

export function trackProgress(
  lessons: LessonSummary[],
  progress: Progress[],
  locale: string,
): { done: number; total: number; percent: number } {
  const total = lessons.length
  if (total === 0) return { done: 0, total: 0, percent: 0 }
  const done = lessons.filter((l) =>
    progress.some((p) => p.lessonId === l.id && p.locale === locale && p.completed),
  ).length
  return { done, total, percent: Math.floor((done * 100) / total) }
}

export function nextIncompleteLesson(
  lessons: LessonSummary[],
  progress: Progress[],
  locale: string,
): LessonSummary | null {
  const sorted = [...lessons].sort((a, b) => a.sortOrder - b.sortOrder)
  for (const lesson of sorted) {
    const done = progress.some(
      (p) => p.lessonId === lesson.id && p.locale === locale && p.completed,
    )
    if (!done) return lesson
  }
  return null
}

export function overallProgress(
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
): { done: number; total: number; percent: number } {
  let done = 0
  let total = 0
  for (const lessons of Object.values(lessonsByTrack)) {
    const stats = trackProgress(lessons, progress, locale)
    done += stats.done
    total += stats.total
  }
  if (total === 0) return { done: 0, total: 0, percent: 0 }
  return { done, total, percent: Math.floor((done * 100) / total) }
}

export type TrackProgressRow = {
  trackId: string
  title: string
  category: string
  level: string
  done: number
  total: number
  percent: number
  next: LessonSummary | null
}

export function trackProgressRows(
  tracks: Track[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
): TrackProgressRow[] {
  return [...tracks]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((tr) => {
      const lessons = lessonsByTrack[tr.id] || []
      const stats = trackProgress(lessons, progress, locale)
      return {
        trackId: tr.id,
        title: tr.title[locale] || tr.title.en || tr.id,
        category: tr.category || 'sql',
        level: tr.level || 'basic',
        done: stats.done,
        total: stats.total,
        percent: stats.percent,
        next: nextIncompleteLesson(lessons, progress, locale),
      }
    })
    .filter((row) => row.total > 0)
}
