export type User = {
  id: string
  email: string
  displayName: string
  role: 'admin' | 'learner'
  hasPassword?: boolean
}

export type Track = {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  category: string
  level: string
  sortOrder: number
}

export type LessonSummary = {
  id: string
  locale: string
  trackId: string
  slug: string
  title: string
  sortOrder: number
  published: boolean
  unitId?: string
  unitTitle?: string
  unitOrder?: number
  unitCanDo?: string
  unitRole?: 'lesson' | 'checkpoint' | 'review'
}

export type Lesson = LessonSummary & {
  objectives: string[]
  bodyHtml: string
  bodyMd?: string
  driveFileId?: string
  exercise?: Record<string, unknown>
  sandboxSeed?: Record<string, unknown>
}

export type SandboxResult = {
  columns: string[]
  rows: unknown[][]
  passed: boolean
  code?: string
  message?: string
}

export type Note = {
  id: string
  lessonId: string
  locale: string
  body: string
  updatedAt: string
}

export type NoteListItem = Note & {
  slug: string
  title: string
  trackId: string
  preview?: string
}

export type Progress = {
  lessonId: string
  locale: string
  completed: boolean
  completedAt?: string
}

export type LanguageReviewCard = {
  trackId: string
  lessonId: string
  locale: string
  itemKey: string
  dueAt: string
  stability: number
  difficulty: number
  scheduledDays: number
  reps: number
  lapses: number
  state: number
  lastReviewAt?: string
  remainingSteps: number
}

export type LanguageAttemptResult = {
  correct: boolean
  rating: 1 | 3
  confidence: number
  card: LanguageReviewCard
}
