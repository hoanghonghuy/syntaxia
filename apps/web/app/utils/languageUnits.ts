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

function roleRank(role: LanguageUnitRole): number {
  if (role === 'checkpoint') return 1
  if (role === 'review') return 2
  return 0
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
 * Return the learner-facing sequence for a language track.
 *
 * Explicit units are ordered by unit_order. Inside one unit, acquisition lessons
 * come first, followed by its checkpoint and then its review node. Lessons with
 * the same role keep their authored lesson order. Unmigrated content is a
 * singleton unit keyed only by stable lesson identity/order, never by slug/title.
 */
export function orderLanguageLessons<T extends LanguageUnitLesson>(lessons: T[]): T[] {
  type IndexedLesson = { lesson: T; index: number; role: LanguageUnitRole }
  type Group = {
    key: string
    order: number
    firstIndex: number
    lessons: IndexedLesson[]
  }

  const groups = new Map<string, Group>()

  lessons.forEach((lesson, index) => {
    const meta = languageUnitMeta(lesson)
    const key = meta.id || `lesson:${lesson.id}`
    const order = meta.sortOrder || lesson.sortOrder
    const existing = groups.get(key)
    const group = existing || { key, order, firstIndex: index, lessons: [] }
    if (order < group.order) group.order = order
    group.lessons.push({ lesson, index, role: meta.role })
    groups.set(key, group)
  })

  return [...groups.values()]
    .sort((a, b) => a.order - b.order || a.firstIndex - b.firstIndex)
    .flatMap((group) =>
      [...group.lessons]
        .sort((a, b) =>
          roleRank(a.role) - roleRank(b.role)
          || a.lesson.sortOrder - b.lesson.sortOrder
          || a.index - b.index,
        )
        .map((item) => item.lesson),
    )
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
  const ordered = orderLanguageLessons(lessons)
  const completed = new Set(
    progress
      .filter((item) => item.locale === locale && item.completed)
      .map((item) => item.lessonId),
  )
  const currentId = ordered.find((lesson) => !completed.has(lesson.id))?.id || ''
  const units = new Map<string, LanguageUnit>()

  for (const lesson of ordered) {
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

  return [...units.values()].sort((a, b) => a.sortOrder - b.sortOrder)
}
