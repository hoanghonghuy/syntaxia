import type { Lesson, LessonSummary, Note, NoteListItem, Progress, SandboxResult, Track, User } from '~/types/api'

export function useApi() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string

  async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers)
    if (!headers.has('Content-Type') && options.body) {
      headers.set('Content-Type', 'application/json')
    }
    const res = await fetch(`${base}${path}`, {
      ...options,
      headers,
      credentials: 'include',
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || res.statusText)
    }
    if (res.status === 204) {
      return undefined as T
    }
    return res.json() as Promise<T>
  }

  return {
    register: (email: string, password: string, displayName?: string) =>
      request<User>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, displayName }),
      }),
    login: (email: string, password: string) =>
      request<User>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    logout: () => request<void>('/api/v1/auth/logout', { method: 'POST' }),
    me: () => request<User>('/api/v1/auth/me'),
    updateProfile: (displayName: string) =>
      request<User>('/api/v1/auth/me', {
        method: 'PATCH',
        body: JSON.stringify({ displayName }),
      }),
    changePassword: (currentPassword: string, newPassword: string) =>
      request<void>('/api/v1/auth/password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      }),
    tracks: () => request<Track[]>('/api/v1/tracks'),
    lessons: (track: string, locale: string) =>
      request<LessonSummary[]>(`/api/v1/lessons?track=${track}&locale=${locale}`),
    lesson: (slug: string, locale: string, track: string) =>
      request<Lesson>(`/api/v1/lessons/${slug}?locale=${locale}&track=${encodeURIComponent(track)}`),
    lessonSolution: (slug: string, locale: string, track: string) =>
      request<{ solution: string }>(
        `/api/v1/lessons/${slug}/solution?locale=${locale}&track=${encodeURIComponent(track)}`,
      ),
    runSandbox: (sql: string, lessonId: string, locale: string) =>
      request<SandboxResult>('/api/v1/sandbox/run', {
        method: 'POST',
        body: JSON.stringify({ sql, lessonId, locale }),
      }),
    gradeJsSandbox: (
      lessonId: string,
      locale: string,
      returnValue: unknown,
      consoleLines: string[],
    ) =>
      request<SandboxResult>('/api/v1/sandbox/js/grade', {
        method: 'POST',
        body: JSON.stringify({ lessonId, locale, returnValue, consoleLines }),
      }),
    gradeHtmlCssSandbox: (lessonId: string, locale: string, html: string, css: string) =>
      request<SandboxResult>('/api/v1/sandbox/htmlcss/grade', {
        method: 'POST',
        body: JSON.stringify({ lessonId, locale, html, css }),
      }),
    listProgress: () => request<Progress[]>('/api/v1/progress'),
    setProgress: (lessonId: string, locale: string, completed: boolean) =>
      request<Progress>(`/api/v1/progress/${lessonId}`, {
        method: 'PUT',
        body: JSON.stringify({ locale, completed }),
      }),
    listNotes: (slug: string, locale: string, track: string) =>
      request<Note[]>(
        `/api/v1/lessons/${slug}/notes?locale=${locale}&track=${encodeURIComponent(track)}`,
      ),
    listAllNotes: (locale: string) =>
      request<NoteListItem[]>(`/api/v1/notes?locale=${locale}`),
    createNote: (slug: string, locale: string, body: string, track: string) =>
      request<Note>(`/api/v1/lessons/${slug}/notes?track=${encodeURIComponent(track)}`, {
        method: 'POST',
        body: JSON.stringify({ locale, body, track }),
      }),
    updateNote: (noteId: string, body: string) =>
      request<Note>(`/api/v1/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({ body }),
      }),
    syncContent: () => request<{ synced: number }>('/api/v1/admin/content/sync', { method: 'POST' }),
    adminBackend: () => request<{ backend: string }>('/api/v1/admin/content/backend'),
    adminLessons: (track = '', locale = '') => {
      const q = new URLSearchParams()
      if (track) q.set('track', track)
      if (locale) q.set('locale', locale)
      const qs = q.toString()
      return request<LessonSummary[]>(`/api/v1/admin/lessons${qs ? `?${qs}` : ''}`)
    },
    adminLesson: (id: string, locale: string) =>
      request<Lesson>(`/api/v1/admin/lessons/${id}?locale=${locale}`),
    upsertLesson: (payload: { lesson: Lesson; bodyMd: string }) =>
      request<Lesson>('/api/v1/admin/lessons', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    deleteLesson: (id: string, locale: string, fileId?: string) => {
      const q = new URLSearchParams({ locale })
      if (fileId) q.set('fileId', fileId)
      return request<void>(`/api/v1/admin/lessons/${id}?${q}`, { method: 'DELETE' })
    },
    providers: () =>
      request<{ email: boolean; google: boolean; contentBackend: string }>('/api/v1/auth/providers'),
    googleAuthUrl: () => `${base}/api/v1/auth/google`,
  }
}
