import type { LessonSummary, Progress, Track } from '~/types/api'
import { languageTargetLangForTrack } from './languageTrackProfile.ts'
import { trackProgress } from './learningPath.ts'

export type HomeLearningMapKey = 'sql' | 'web' | 'js' | 'en' | 'zh' | 'ja'

export type HomeLearningMapItem = {
  key: HomeLearningMapKey
  label: string
  domain: 'it' | 'languages'
  category?: string
  trackIds: string[]
  primaryTrackId?: string
  progressPercent: number
}

type MapSlot = {
  key: HomeLearningMapKey
  label: string
  domain: 'it' | 'languages'
  category?: string
  targetLang?: string
}

// Labels/positions are part of the homepage visual design. Catalog matches,
// track IDs and progress values are resolved from live data rather than fixed routes.
const MAP_SLOTS: readonly MapSlot[] = [
  { key: 'sql', label: 'SQL', domain: 'it', category: 'sql' },
  { key: 'web', label: 'Web', domain: 'it', category: 'web' },
  { key: 'js', label: 'JS', domain: 'it', category: 'code' },
  { key: 'en', label: 'EN', domain: 'languages', targetLang: 'en' },
  { key: 'zh', label: '中文', domain: 'languages', targetLang: 'zh-Hans' },
  { key: 'ja', label: '日本語', domain: 'languages', targetLang: 'ja' },
]

function sortedTracks(tracks: Track[]): Track[] {
  return [...tracks].sort((a, b) => a.sortOrder - b.sortOrder)
}

function tracksForSlot(tracks: Track[], slot: MapSlot): Track[] {
  const sorted = sortedTracks(tracks)
  if (slot.domain === 'languages' && slot.targetLang) {
    const core = sorted.find(
      (track) =>
        track.category === 'languages' &&
        languageTargetLangForTrack(track.id) === slot.targetLang,
    )
    // The earliest catalog track for a target language is the core path. This
    // intentionally keeps later specialty tracks (for example Chinese IT) out
    // of the homepage language chip without hard-coding a track ID.
    return core ? [core] : []
  }
  return sorted.filter((track) => (track.category || 'sql') === slot.category)
}

function aggregateProgress(
  trackIds: string[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
): number {
  let done = 0
  let total = 0
  for (const trackId of trackIds) {
    const summary = trackProgress(lessonsByTrack[trackId] || [], progress, locale)
    done += summary.done
    total += summary.total
  }
  return total > 0 ? Math.round((done / total) * 100) : 0
}

export function resolveHomeLearningMap(
  tracks: Track[],
  lessonsByTrack: Record<string, LessonSummary[]>,
  progress: Progress[],
  locale: string,
): HomeLearningMapItem[] {
  return MAP_SLOTS.flatMap((slot) => {
    const matches = tracksForSlot(tracks, slot)
    if (matches.length === 0) return []
    const trackIds = matches.map((track) => track.id)
    return [{
      key: slot.key,
      label: slot.label,
      domain: slot.domain,
      category: slot.category,
      trackIds,
      primaryTrackId: matches.length === 1 ? matches[0].id : undefined,
      progressPercent: aggregateProgress(trackIds, lessonsByTrack, progress, locale),
    }]
  })
}
