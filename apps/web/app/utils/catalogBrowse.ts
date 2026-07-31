import type { Track } from '~/types/api'
import {
  type LearningDomainFilter,
  filterTracksByDomain,
  parseDomainQuery,
} from './learningDomains.ts'

/** Client page size for the tracks catalog; raise only with UX review. */
export const TRACKS_PAGE_SIZE = 12

/** Home shows a short flat featured list; full catalog lives on `/tracks`. */
export const HOME_FEATURED_TRACKS = 3

/** @deprecated Prefer `featuredTracks` for home; kept for category preview helpers. */
export const HOME_TRACKS_PER_CATEGORY = 3

export type CatalogCategoryFilter = 'all' | string

export type TrackCategoryGroup = {
  category: string
  tracks: Track[]
}

export function filterTracksByCategory(
  tracks: Track[],
  category: CatalogCategoryFilter,
): Track[] {
  const sorted = [...tracks].sort((a, b) => a.sortOrder - b.sortOrder)
  if (!category || category === 'all') return sorted
  return sorted.filter((tr) => (tr.category || 'sql') === category)
}

/**
 * Domain first, then optional category. Category chips only apply within the domain scope.
 */
export function filterTracksByDomainAndCategory(
  tracks: Track[],
  domain: LearningDomainFilter,
  category: CatalogCategoryFilter,
): Track[] {
  return filterTracksByCategory(filterTracksByDomain(tracks, domain), category)
}

export function groupTracksByCategory(tracks: Track[]): TrackCategoryGroup[] {
  const byCat = new Map<string, Track[]>()
  for (const track of [...tracks].sort((a, b) => a.sortOrder - b.sortOrder)) {
    const cat = track.category || 'sql'
    const list = byCat.get(cat) || []
    list.push(track)
    byCat.set(cat, list)
  }
  return [...byCat.entries()].map(([category, list]) => ({
    category,
    tracks: list,
  }))
}

export type TrackCategoryPreview = TrackCategoryGroup & {
  total: number
  hasMore: boolean
}

/** Cap tracks per category for previews; full browse is `/tracks`. */
export function previewTracksByCategory(
  tracks: Track[],
  limit: number = HOME_TRACKS_PER_CATEGORY,
): TrackCategoryPreview[] {
  const cap = Math.max(1, Math.floor(limit) || HOME_TRACKS_PER_CATEGORY)
  return groupTracksByCategory(tracks).map((group) => ({
    category: group.category,
    tracks: group.tracks.slice(0, cap),
    total: group.tracks.length,
    hasMore: group.tracks.length > cap,
  }))
}

/** Flat featured tracks for home (sortOrder, capped). Prefer passing an IT-scoped list. */
export function featuredTracks(
  tracks: Track[],
  limit: number = HOME_FEATURED_TRACKS,
): Track[] {
  const cap = Math.max(1, Math.floor(limit) || HOME_FEATURED_TRACKS)
  return [...tracks].sort((a, b) => a.sortOrder - b.sortOrder).slice(0, cap)
}

/** First track by sortOrder — guest CTA target when catalog is loaded. */
export function firstTrackId(tracks: Track[]): string | null {
  const sorted = [...tracks].sort((a, b) => a.sortOrder - b.sortOrder)
  return sorted[0]?.id ?? null
}

export type PageSlice<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

/** 1-based page index; clamps out-of-range pages. */
export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number = TRACKS_PAGE_SIZE,
): PageSlice<T> {
  const size = Math.max(1, Math.floor(pageSize) || TRACKS_PAGE_SIZE)
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / size))
  const safePage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages)
  const start = (safePage - 1) * size
  return {
    items: items.slice(start, start + size),
    page: safePage,
    pageSize: size,
    total,
    totalPages,
  }
}

export function parseTracksQuery(query: Record<string, unknown>): {
  domain: LearningDomainFilter
  category: CatalogCategoryFilter
  page: number
} {
  const domain = parseDomainQuery(query.domain)
  const rawCat = query.category
  const category =
    typeof rawCat === 'string' && rawCat.trim() ? rawCat.trim() : 'all'
  const rawPage = query.page
  const pageNum =
    typeof rawPage === 'string' || typeof rawPage === 'number'
      ? Number(rawPage)
      : 1
  return {
    domain,
    category,
    page: Number.isFinite(pageNum) && pageNum > 0 ? Math.floor(pageNum) : 1,
  }
}
