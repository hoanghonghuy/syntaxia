import type { LessonSummary, Track } from '~/types/api'
import {
  type LearningDomainFilter,
  filterTracksByDomain,
} from './learningDomains.ts'

export type NoteListItem = {
  id: string
  lessonId: string
  locale: string
  body: string
  updatedAt: string
  slug: string
  title: string
  trackId: string
  preview?: string
}

export function normalizeQuery(q: string): string {
  return q.trim().toLowerCase()
}

export function filterCatalog(
  tracks: Track[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  locale: string,
  query: string,
  domain: LearningDomainFilter = 'all',
): { tracks: Track[]; lessons: LessonSummary[] } {
  const q = normalizeQuery(query)
  if (!q) return { tracks: [], lessons: [] }

  const scoped = filterTracksByDomain(tracks, domain)

  const matchedTracks = scoped.filter((tr) => {
    const title = (tr.title[locale] || tr.title.en || tr.id).toLowerCase()
    const desc = (tr.description[locale] || tr.description.en || '').toLowerCase()
    return title.includes(q) || desc.includes(q) || tr.id.toLowerCase().includes(q)
  })

  const lessons: LessonSummary[] = []
  for (const tr of scoped) {
    const list = lessonsByTrack[tr.id] || []
    for (const lesson of list) {
      if (lesson.title.toLowerCase().includes(q) || lesson.slug.toLowerCase().includes(q)) {
        lessons.push(lesson)
      }
    }
  }

  return { tracks: matchedTracks, lessons }
}

export function filterNotes(notes: NoteListItem[], query: string): NoteListItem[] {
  const q = normalizeQuery(query)
  if (!q) return notes
  return notes.filter((n) => {
    const hay = `${n.title} ${n.body} ${n.slug} ${n.trackId}`.toLowerCase()
    return hay.includes(q)
  })
}
