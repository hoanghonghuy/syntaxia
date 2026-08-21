import { defineStore } from 'pinia'
import type { LessonSummary, Progress, Track } from '~/types/api'
import { formatCatalogLoadError } from '~/utils/catalogLoad'
import { isLanguageTrack } from '~/utils/languageLesson'
import { orderLanguageLessons } from '~/utils/languageUnits'
import { nextIncompleteLesson, trackProgress } from '~/utils/learningPath'

export const useCatalogStore = defineStore('catalog', () => {
  const tracks = ref<Track[]>([])
  const lessons = ref<LessonSummary[]>([])
  const progress = ref<Progress[]>([])
  const lessonsByTrack = ref<Record<string, LessonSummary[]>>({})
  const loadError = ref<string | null>(null)
  const api = useApi()

  async function loadTracks() {
    try {
      tracks.value = await api.tracks()
      loadError.value = null
    } catch (e) {
      loadError.value = formatCatalogLoadError(e)
      throw e
    }
  }

  async function loadLessons(trackId: string, locale: string) {
    try {
      const loaded = await api.lessons(trackId, locale)
      lessons.value = isLanguageTrack(trackId) ? orderLanguageLessons(loaded) : loaded
      lessonsByTrack.value = { ...lessonsByTrack.value, [trackId]: lessons.value }
      loadError.value = null
    } catch (e) {
      loadError.value = formatCatalogLoadError(e)
      throw e
    }
  }

  async function loadProgress() {
    try {
      progress.value = await api.listProgress()
    } catch {
      progress.value = []
    }
  }

  async function loadCatalogForHome(locale: string) {
    await loadTracks()
    await Promise.all(tracks.value.map((tr) => loadLessons(tr.id, locale)))
  }

  function isCompleted(lessonId: string, locale: string) {
    return progress.value.some((p) => p.lessonId === lessonId && p.locale === locale && p.completed)
  }

  function progressForTrack(trackId: string, locale: string) {
    const list = lessonsByTrack.value[trackId] || (lessons.value[0]?.trackId === trackId ? lessons.value : [])
    return trackProgress(list, progress.value, locale)
  }

  function nextForTrack(trackId: string, locale: string) {
    const list = lessonsByTrack.value[trackId] || (lessons.value[0]?.trackId === trackId ? lessons.value : [])
    return nextIncompleteLesson(list, progress.value, locale)
  }

  function resumeTarget(locale: string) {
    const sorted = [...tracks.value].sort((a, b) => a.sortOrder - b.sortOrder)
    for (const tr of sorted) {
      const next = nextForTrack(tr.id, locale)
      if (next) return { trackId: tr.id, lesson: next }
    }
    return null
  }

  return {
    tracks,
    lessons,
    progress,
    lessonsByTrack,
    loadError,
    loadTracks,
    loadLessons,
    loadProgress,
    loadCatalogForHome,
    isCompleted,
    progressForTrack,
    nextForTrack,
    resumeTarget,
  }
})
