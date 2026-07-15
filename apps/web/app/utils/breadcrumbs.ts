export type BreadcrumbItem = {
  label: string
  /** Omit or empty = current page (no link). */
  to?: string | null
}

/** Normalize crumbs: drop empties; last item without `to` is current. */
export function normalizeBreadcrumbs(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return items
    .map((item) => ({
      label: item.label.trim(),
      to: item.to ? String(item.to) : null,
    }))
    .filter((item) => item.label.length > 0)
}

export type LearnCrumbInput = {
  homeLabel: string
  homeTo: string
  tracksLabel: string
  tracksTo: string
  categoryLabel?: string
  categoryTo?: string
  trackLabel?: string
  trackTo?: string
  lessonLabel?: string
}

/** Home → Tracks → [Category] → [Track] → [Lesson]. */
export function buildLearnBreadcrumbs(input: LearnCrumbInput): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { label: input.homeLabel, to: input.homeTo },
    { label: input.tracksLabel, to: input.tracksTo },
  ]
  if (input.categoryLabel) {
    crumbs.push({ label: input.categoryLabel, to: input.categoryTo || null })
  }
  if (input.trackLabel) {
    crumbs.push({ label: input.trackLabel, to: input.trackTo || null })
  }
  if (input.lessonLabel) {
    crumbs.push({ label: input.lessonLabel, to: null })
  }
  return normalizeBreadcrumbs(crumbs)
}

export type HubCrumbInput = {
  homeLabel: string
  homeTo: string
  pageLabel: string
}

/** Home → Hub page (current). */
export function buildHubBreadcrumbs(input: HubCrumbInput): BreadcrumbItem[] {
  return normalizeBreadcrumbs([
    { label: input.homeLabel, to: input.homeTo },
    { label: input.pageLabel, to: null },
  ])
}
