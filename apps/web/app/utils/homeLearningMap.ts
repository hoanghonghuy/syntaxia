import type { Track } from '~/types/api'
import { languageTrackProfile } from '~/utils/languageTrackProfile'

export type HomeLearningMapTarget =
  | { kind: 'category'; domain: 'it'; category: string }
  | { kind: 'track'; trackId: string }

export type HomeLearningMapItem = {
  key: string
  label: string
  trackIds: string[]
  target: HomeLearningMapTarget
}

const CATEGORY_ITEMS: ReadonlyArray<{ category: string; label: string }> = [
  { category: 'sql', label: 'SQL' },
  { category: 'web', label: 'Web' },
]

function shortCodeLabel(track: Track): string {
  const stem = track.id.split('-')[0]?.toLowerCase() || ''
  if (stem === 'javascript') return 'JS'
  if (stem === 'typescript') return 'TS'
  if (stem === 'python') return 'PY'
  if (stem === 'golang' || stem === 'go') return 'Go'

  const words = (track.title.en || track.id)
    .replace(/\b(?:basics?|fundamentals?|introduction|intro)\b/gi, '')
    .trim()
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)

  if (words.length === 1) return words[0].slice(0, 3)
  return words.slice(0, 2).map((word) => word[0]).join('').toUpperCase()
}

/**
 * Build the homepage orbit from the live catalog rather than from template literals.
 * Category chips exist only when that category exists; code/language chips are derived
 * from the tracks currently returned by the API. Specialty language tracks opt out via
 * their central language profile so they do not displace the core language courses.
 */
export function buildHomeLearningMapItems(tracks: Track[]): HomeLearningMapItem[] {
  const sorted = [...tracks].sort((a, b) => a.sortOrder - b.sortOrder)
  const items: HomeLearningMapItem[] = []

  for (const config of CATEGORY_ITEMS) {
    const matches = sorted.filter((track) => track.category === config.category)
    if (!matches.length) continue
    items.push({
      key: `category:${config.category}`,
      label: config.label,
      trackIds: matches.map((track) => track.id),
      target: { kind: 'category', domain: 'it', category: config.category },
    })
  }

  for (const track of sorted.filter((item) => item.category === 'code')) {
    items.push({
      key: `track:${track.id}`,
      label: shortCodeLabel(track),
      trackIds: [track.id],
      target: { kind: 'track', trackId: track.id },
    })
  }

  for (const track of sorted.filter((item) => item.category === 'languages')) {
    const profile = languageTrackProfile(track.id)
    if (!profile.homeLabel || profile.specialty) continue
    items.push({
      key: `track:${track.id}`,
      label: profile.homeLabel,
      trackIds: [track.id],
      target: { kind: 'track', trackId: track.id },
    })
  }

  return items
}
