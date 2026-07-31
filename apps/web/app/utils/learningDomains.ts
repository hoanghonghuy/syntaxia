import type { Track } from '~/types/api'

/** Top-level learning domains (UI orientation). Categories nest under a domain. */
export type LearningDomainId = 'it' | 'languages'

export const LEARNING_DOMAIN_IDS: LearningDomainId[] = ['it', 'languages']

export type LearningDomainFilter = LearningDomainId | 'all'

/** Map catalog category → domain. Unknown categories default to IT. */
export function domainForCategory(category: string | undefined | null): LearningDomainId {
  if (category === 'languages') return 'languages'
  return 'it'
}

export function domainForTrack(track: Pick<Track, 'category'>): LearningDomainId {
  return domainForCategory(track.category)
}

export function filterTracksByDomain(
  tracks: Track[],
  domain: LearningDomainFilter,
): Track[] {
  const sorted = [...tracks].sort((a, b) => a.sortOrder - b.sortOrder)
  if (!domain || domain === 'all') return sorted
  return sorted.filter((tr) => domainForTrack(tr) === domain)
}

/** Categories present in a domain (sorted), for chips inside that domain. */
export function categoriesInDomain(tracks: Track[], domain: LearningDomainId): string[] {
  const set = new Set<string>()
  for (const tr of filterTracksByDomain(tracks, domain)) {
    set.add(tr.category || 'sql')
  }
  return [...set].sort()
}

export function isLearningDomainId(value: string): value is LearningDomainId {
  return (LEARNING_DOMAIN_IDS as string[]).includes(value)
}

export function parseDomainQuery(raw: unknown): LearningDomainFilter {
  if (typeof raw !== 'string' || !raw.trim()) return 'it'
  const v = raw.trim()
  if (v === 'all') return 'all'
  if (isLearningDomainId(v)) return v
  return 'it'
}
