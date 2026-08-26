import type { LessonSummary, Progress, Track } from '~/types/api'
import { isLanguageTrack } from './languageLesson.ts'
import { nextLanguageLesson } from './languageUnits.ts'
import {
  type LearningDomainFilter,
  filterTracksByDomain,
} from './learningDomains.ts'

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

/** One continuation rule for cards, Progress and Home. Language tracks preserve
 * the learner frontier when an earlier prerequisite Unit 0 is inserted. */
export function nextLessonForTrack(
  trackId: string,
  lessons: LessonSummary[],
  progress: Progress[],
  locale: string,
): LessonSummary | null {
  return isLanguageTrack(trackId)
    ? nextLanguageLesson(lessons, progress, locale)
    : nextIncompleteLesson(lessons, progress, locale)
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

/**
 * Order tracks for a global "Continue" action. Tracks with completed work in the
 * active locale come first, newest completion first. Learners with no history keep
 * the catalog order. This prevents unrelated earlier tracks from stealing the
 * resume CTA merely because their sortOrder is lower.
 */
export function prioritizeTracksByRecentProgress(
  tracks: Track[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
): Track[] {
  const lessonToTrack = new Map<string, string>()
  for (const [trackId, lessons] of Object.entries(lessonsByTrack)) {
    for (const lesson of lessons) lessonToTrack.set(lesson.id, trackId)
  }

  const latestByTrack = new Map<string, number>()
  for (const row of progress) {
    if (!row.completed || row.locale !== locale) continue
    const trackId = lessonToTrack.get(row.lessonId)
    if (!trackId) continue
    const parsed = row.completedAt ? Date.parse(row.completedAt) : Number.NaN
    const timestamp = Number.isFinite(parsed) ? parsed : 0
    const current = latestByTrack.get(trackId)
    if (current === undefined || timestamp > current) latestByTrack.set(trackId, timestamp)
  }

  return [...tracks].sort((a, b) => {
    const aRecent = latestByTrack.get(a.id)
    const bRecent = latestByTrack.get(b.id)
    if (aRecent !== undefined && bRecent === undefined) return -1
    if (aRecent === undefined && bRecent !== undefined) return 1
    if (aRecent !== undefined && bRecent !== undefined && aRecent !== bRecent) {
      return bRecent - aRecent
    }
    return a.sortOrder - b.sortOrder
  })
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

export type LessonStatusRow = {
  id: string
  slug: string
  title: string
  sortOrder: number
  completed: boolean
  isNext: boolean
}

export function trackLessonStatusRows(
  lessons: LessonSummary[],
  progress: Progress[],
  locale: string,
): LessonStatusRow[] {
  const sorted = [...lessons].sort((a, b) => a.sortOrder - b.sortOrder)
  const next = nextIncompleteLesson(lessons, progress, locale)
  return sorted.map((lesson) => ({
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    sortOrder: lesson.sortOrder,
    completed: progress.some(
      (p) => p.lessonId === lesson.id && p.locale === locale && p.completed,
    ),
    isNext: next?.id === lesson.id,
  }))
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
        next: nextLessonForTrack(tr.id, lessons, progress, locale),
      }
    })
    .filter((row) => row.total > 0)
}

export function trackProgressRowsForDomain(
  tracks: Track[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
  domain: LearningDomainFilter,
): TrackProgressRow[] {
  return trackProgressRows(
    filterTracksByDomain(tracks, domain),
    lessonsByTrack,
    progress,
    locale,
  )
}

export function overallProgressForDomain(
  tracks: Track[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
  domain: LearningDomainFilter,
): { done: number; total: number; percent: number } {
  const scoped: Record<string, LessonSummary[]> = {}
  for (const tr of filterTracksByDomain(tracks, domain)) {
    scoped[tr.id] = lessonsByTrack[tr.id] || []
  }
  return overallProgress(scoped, progress, locale)
}

export function resumeTargetForDomain(
  tracks: Track[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
  domain: LearningDomainFilter,
): { trackId: string; lesson: LessonSummary } | null {
  const scopedTracks = filterTracksByDomain(tracks, domain)
  const ordered = prioritizeTracksByRecentProgress(scopedTracks, lessonsByTrack, progress, locale)
  for (const track of ordered) {
    const next = nextLessonForTrack(
      track.id,
      lessonsByTrack[track.id] || [],
      progress,
      locale,
    )
    if (next) return { trackId: track.id, lesson: next }
  }
  return null
}

export type LanguageUnitPathState = 'done' | 'current' | 'locked'

export type LanguageUnitPathNode = {
  id: string
  slug: string
  title: string
  sortOrder: number
  state: LanguageUnitPathState
  clickable: boolean
}

/** Linear path nodes for language track hubs (Duolingo-style sequential unlock). */
export function buildLanguageUnitPath(
  lessons: LessonSummary[],
  progress: Progress[],
  locale: string,
): LanguageUnitPathNode[] {
  const sorted = [...lessons].sort((a, b) => a.sortOrder - b.sortOrder)
  const next = nextIncompleteLesson(sorted, progress, locale)
  return sorted.map((lesson) => {
    const completed = progress.some(
      (p) => p.lessonId === lesson.id && p.locale === locale && p.completed,
    )
    let state: LanguageUnitPathState = 'locked'
    if (completed) state = 'done'
    else if (next && lesson.id === next.id) state = 'current'
    return {
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      sortOrder: lesson.sortOrder,
      state,
      clickable: state === 'done' || state === 'current',
    }
  })
}
