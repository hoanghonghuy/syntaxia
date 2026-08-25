import type { Lesson, LessonSummary, Progress } from '~/types/api'

export type LanguageUnitRole = 'lesson' | 'checkpoint' | 'review'
export type LanguageUnitNodeState = 'done' | 'current' | 'available' | 'locked'

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
  sortOrder: number | null
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

function nonNegativeInt(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value >= 0) return value
  if (typeof value === 'string' && /^\d+$/.test(value.trim())) {
    const parsed = Number(value)
    return parsed >= 0 ? parsed : null
  }
  return null
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

function completedLessonIds(progress: Progress[], locale: string): Set<string> {
  return new Set(
    progress
      .filter((item) => item.locale === locale && item.completed)
      .map((item) => item.lessonId),
  )
}

export function languageUnitMeta(lesson: LanguageUnitLesson): LanguageUnitMeta {
  const exercise = asRecord(lesson.exercise)
  return {
    id: text(lesson.unitId) || text(exercise?.unitId),
    title: text(lesson.unitTitle) || text(exercise?.unitTitle),
    canDo: text(lesson.unitCanDo) || text(exercise?.unitCanDo),
    sortOrder: nonNegativeInt(lesson.unitOrder) ?? nonNegativeInt(exercise?.unitOrder),
    role: normalizeRole(lesson.unitRole || exercise?.unitRole),
  }
}

/**
 * Return the learner-facing sequence for a language track.
 *
 * Explicit units are ordered by unit_order, including an authored foundation
 * unit at order 0. Inside one unit, acquisition lessons come first, followed by
 * its checkpoint and then its review node. Lessons with the same role keep
 * their authored lesson order. Unmigrated content is a singleton unit keyed
 * only by stable lesson identity/order, never by slug/title.
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
    const order = meta.sortOrder ?? lesson.sortOrder
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
 * Pick the learner's continuation point without rewinding established progress.
 *
 * If curriculum is inserted before lessons a returning learner has already
 * completed, continue after their furthest completed node. Earlier inserted
 * gaps stay available for optional catch-up. Once there is no unfinished node
 * ahead of the learner's frontier, the earliest remaining gap becomes current.
 */
export function nextLanguageLesson<T extends LanguageUnitLesson>(
  lessons: T[],
  progress: Progress[],
  locale: string,
): T | null {
  const ordered = orderLanguageLessons(lessons)
  const completed = completedLessonIds(progress, locale)
  let furthestCompletedIndex = -1

  ordered.forEach((lesson, index) => {
    if (completed.has(lesson.id)) furthestCompletedIndex = index
  })

  if (furthestCompletedIndex >= 0) {
    for (let index = furthestCompletedIndex + 1; index < ordered.length; index += 1) {
      const lesson = ordered[index]
      if (lesson && !completed.has(lesson.id)) return lesson
    }
  }

  return ordered.find((lesson) => !completed.has(lesson.id)) || null
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
  const completed = completedLessonIds(progress, locale)
  const currentId = nextLanguageLesson(ordered, progress, locale)?.id || ''
  let furthestCompletedIndex = -1

  ordered.forEach((lesson, index) => {
    if (completed.has(lesson.id)) furthestCompletedIndex = index
  })

  const units = new Map<string, LanguageUnit>()

  ordered.forEach((lesson, lessonIndex) => {
    const meta = languageUnitMeta(lesson)
    const unitId = meta.id || `lesson:${lesson.id}`
    const unitTitle = meta.title || lesson.title
    const unitOrder = meta.sortOrder ?? lesson.sortOrder
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
    else if (furthestCompletedIndex >= 0 && lessonIndex < furthestCompletedIndex) state = 'available'

    unit.nodes.push({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      sortOrder: lesson.sortOrder,
      role: meta.role,
      state,
      clickable: state !== 'locked',
    })
    units.set(unitId, unit)
  })

  return [...units.values()].sort((a, b) => a.sortOrder - b.sortOrder)
}
