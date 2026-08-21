import type { Lesson, LessonSummary, Progress } from '~/types/api'

export type LanguageUnitRole = 'lesson' | 'checkpoint' | 'review'
export type LanguageUnitNodeState = 'done' | 'current' | 'locked'

export type LanguageUnitLesson = LessonSummary & {
  exercise?: Lesson['exercise']
}

export type LanguageUnitNode = {
  id: string
  slug: string
  title: string
  sortOrder: number
  role: LanguageUnitRole
  state: LanguageUnitNodeState
  clickable: boolean
}

export type LanguageUnit = {
  id: string
  title: string
  canDo: string
  sortOrder: number
  nodes: LanguageUnitNode[]
}

type LanguageUnitMeta = {
  id: string
  title: string
  canDo: string
  sortOrder: number
  role: LanguageUnitRole
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function positiveInt(value: unknown): number {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) return value
  if (typeof value === 'string' && /^\d+$/.test(value.trim())) {
    const parsed = Number(value)
    return parsed > 0 ? parsed : 0
  }
  return 0
}

function normalizeRole(value: unknown): LanguageUnitRole {
  if (value === 'checkpoint' || value === 'review') return value
  return 'lesson'
}

export function languageUnitMeta(lesson: LanguageUnitLesson): LanguageUnitMeta {
  const exercise = asRecord(lesson.exercise)
  return {
    id: text(lesson.unitId) || text(exercise?.unitId),
    title: text(lesson.unitTitle) || text(exercise?.unitTitle),
    canDo: text(lesson.unitCanDo) || text(exercise?.unitCanDo),
    sortOrder: positiveInt(lesson.unitOrder) || positiveInt(exercise?.unitOrder),
    role: normalizeRole(lesson.unitRole || exercise?.unitRole),
  }
}

/**
 * Build the language path from explicit content-owned unit metadata.
 *
 * Lessons that have not been migrated yet remain visible as singleton units.
 * The fallback uses only the stable lesson id/order; it never guesses grouping
 * from a slug or a localized title.
 */
export function buildLanguageUnits(
  lessons: LanguageUnitLesson[],
  progress: Progress[],
  locale: string,
): LanguageUnit[] {
  const sorted = [...lessons].sort((a, b) => a.sortOrder - b.sortOrder)
  const completed = new Set(
    progress
      .filter((item) => item.locale === locale && item.completed)
      .map((item) => item.lessonId),
  )
  const currentId = sorted.find((lesson) => !completed.has(lesson.id))?.id || ''
  const units = new Map<string, LanguageUnit>()

  for (const lesson of sorted) {
    const meta = languageUnitMeta(lesson)
    const unitId = meta.id || `lesson:${lesson.id}`
    const unitTitle = meta.title || lesson.title
    const unitOrder = meta.sortOrder || lesson.sortOrder
    const existing = units.get(unitId)
    const unit = existing || {
      id: unitId,
      title: unitTitle,
      canDo: meta.canDo,
      sortOrder: unitOrder,
      nodes: [],
    }

    if (!unit.title && unitTitle) unit.title = unitTitle
    if (!unit.canDo && meta.canDo) unit.canDo = meta.canDo
    if (unitOrder < unit.sortOrder) unit.sortOrder = unitOrder

    let state: LanguageUnitNodeState = 'locked'
    if (completed.has(lesson.id)) state = 'done'
    else if (lesson.id === currentId) state = 'current'

    unit.nodes.push({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      sortOrder: lesson.sortOrder,
      role: meta.role,
      state,
      clickable: state === 'done' || state === 'current',
    })
    units.set(unitId, unit)
  }

  return [...units.values()]
    .map((unit) => ({
      ...unit,
      nodes: [...unit.nodes].sort((a, b) => a.sortOrder - b.sortOrder),
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder)
}
