<template>
  <div class="lesson-reader" :class="{ 'is-language-lesson': isLanguageTrack }">
    <div class="lesson-center">
      <SkeletonLesson v-if="loading" />

      <main v-else-if="loadError" class="lesson-main lesson-error">
        <AppBreadcrumb :items="crumbs" />
        <h1>{{ t('lesson.loadErrorTitle') }}</h1>
        <p>{{ loadError }}</p>
        <div class="lesson-error-actions">
          <button class="btn btn-primary" type="button" @click="loadPage">
            {{ t('lesson.retry') }}
          </button>
          <NuxtLink class="btn btn-ghost" :to="localePath(`/tracks/${trackId}`)">
            {{ t('lesson.backToTrack') }}
          </NuxtLink>
        </div>
      </main>

      <main v-else-if="lesson" class="lesson-main">
        <AppBreadcrumb :items="crumbs" />
        <h1>{{ lesson.title }}</h1>

        <template v-if="!isLanguageTrack">
          <section
            v-if="lesson.objectives?.length"
            class="lesson-objectives-mobile"
            :aria-label="t('lesson.objectives')"
          >
            <p class="lesson-objectives-label">{{ t('lesson.objectives') }}</p>
            <ul class="lesson-objectives-list">
              <li v-for="objective in lesson.objectives" :key="objective">{{ objective }}</li>
            </ul>
          </section>
          <article class="prose-lesson" v-html="lesson.bodyHtml" />
        </template>

        <LanguageLessonPlayer
          v-if="isLanguageTrack && languageHasStepPath"
          :key="`${lesson.id}-language-player`"
          :lesson="lesson"
          :track-id="trackId"
          @passed="onSandboxPassed"
        />

        <template v-else-if="isLanguageTrack">
          <p class="lang-legacy-note muted">{{ t('lesson.legacyFormatNote') }}</p>
          <LanguageVocabList v-if="languageVocab.length" :items="languageVocab" />
          <LanguageExercise
            v-if="languageExercise"
            :key="lesson.id"
            :exercise="languageExercise"
            :track-id="trackId"
            @passed="onSandboxPassed"
          />
        </template>

        <LazyHtmlCssSandbox
          v-else-if="lesson.exercise && isHtmlCssTrack"
          :key="lesson.id"
          :lesson-id="lesson.id"
          :lesson-slug="slug"
          :track-id="trackId"
          :locale="locale"
          :mode="htmlCssExerciseMode"
          :starter-html="htmlCssStarterHtml"
          :starter-css="htmlCssStarterCss"
          :hints="exerciseHints"
          :solution-available="exerciseSolutionAvailable"
          @passed="onSandboxPassed"
        />

        <LazyJsSandbox
          v-else-if="lesson.exercise && trackId === 'javascript-basics'"
          :key="lesson.id"
          :lesson-id="lesson.id"
          :lesson-slug="slug"
          :track-id="trackId"
          :locale="locale"
          :starter="jsExerciseStarter"
          :hints="exerciseHints"
          :solution-available="exerciseSolutionAvailable"
          @passed="onSandboxPassed"
        />

        <LazySqlSandbox
          v-else-if="lesson.exercise"
          :key="lesson.id"
          :lesson-id="lesson.id"
          :lesson-slug="slug"
          :track-id="trackId"
          :locale="locale"
          :starter="exerciseStarter"
          :hints="exerciseHints"
          :solution-available="exerciseSolutionAvailable"
          :preview="exercisePreview"
          @passed="onSandboxPassed"
        />

        <div v-if="auth.user" class="lesson-complete-bar">
          <button
            v-if="!lessonCompleted"
            class="btn btn-ghost"
            type="button"
            :disabled="markingComplete"
            @click="markComplete"
          >
            {{ t('lesson.complete') }}
          </button>
          <template v-else>
            <span class="lesson-completed-badge">{{ t('lesson.completed') }}</span>
            <button
              class="btn btn-ghost"
              type="button"
              :disabled="markingComplete"
              @click="markIncomplete"
            >
              {{ t('lesson.markIncomplete') }}
            </button>
          </template>
        </div>

        <nav class="lesson-pager" :aria-label="t('lesson.pagerNav')">
          <NuxtLink
            v-if="prevLesson"
            class="btn btn-ghost"
            :to="localePath(`/tracks/${trackId}/lessons/${prevLesson.slug}`)"
          >
            ← {{ prevLesson.title }}
          </NuxtLink>
          <span v-else />
          <NuxtLink
            v-if="nextLesson"
            class="btn btn-primary"
            :to="localePath(`/tracks/${trackId}/lessons/${nextLesson.slug}`)"
          >
            {{ nextLesson.title }} →
          </NuxtLink>
        </nav>

        <section v-if="auth.user" class="card notes-card">
          <h2>{{ t('lesson.notes') }}</h2>
          <textarea v-model="noteBody" rows="4" class="notes-input" />
          <div class="notes-actions">
            <button class="btn btn-primary" type="button" :disabled="savingNote" @click="saveNote">
              {{ t('lesson.saveNote') }}
            </button>
          </div>
        </section>

        <aside v-else class="auth-soft-prompt" role="note">
          <p>{{ t('auth.loginToSave') }}</p>
          <div class="auth-soft-actions">
            <NuxtLink class="btn btn-primary" :to="authLoginPath">{{ t('nav.login') }}</NuxtLink>
            <NuxtLink class="btn btn-ghost" :to="authRegisterPath">{{ t('nav.register') }}</NuxtLink>
          </div>
        </aside>
      </main>
    </div>

    <aside v-if="!isLanguageTrack" class="lesson-toc">
      <template v-if="loading">
        <UiSkeleton width="50%" height="0.75rem" />
        <UiSkeleton width="90%" height="0.85rem" />
        <UiSkeleton width="75%" height="0.85rem" />
        <UiSkeleton width="80%" height="0.85rem" />
      </template>
      <template v-else-if="lesson">
        <p class="toc-heading">{{ t('lesson.toc') }}</p>
        <ul v-if="tocItems.length" class="nav-list toc-list">
          <li v-for="item in tocItems" :key="item.id">
            <a
              class="toc-link"
              :class="{ 'is-h3': item.level === 3 }"
              :href="`#${item.id}`"
              @click.prevent="scrollToHeading(item.id)"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
        <p v-else class="toc-empty">{{ t('lesson.tocEmpty') }}</p>
        <template v-if="lesson.objectives?.length">
          <p class="toc-label">{{ t('lesson.objectives') }}</p>
          <ul class="nav-list toc-objectives">
            <li v-for="objective in lesson.objectives" :key="objective">{{ objective }}</li>
          </ul>
        </template>
      </template>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '~/types/api'
import { buildLearnBreadcrumbs } from '~/utils/breadcrumbs'
import {
  isLanguageTrack as trackIsLanguage,
  languageExerciseFromLesson,
  languageHasSteps,
  languageVocabFromLesson,
} from '~/utils/languageLesson'
import { buildLanguageUnits, orderLanguageLessons } from '~/utils/languageUnits'
import { createLessonLoadGuard } from '~/utils/lessonLoadGuard'
import { pickPrimaryNote, resolveNoteSaveMode } from '~/utils/noteSave'
import { extractToc } from '~/utils/toc'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const api = useApi()
const catalog = useCatalogStore()
const auth = useAuthStore()
const snackbar = useSnackbar()

const trackId = computed(() => route.params.track as string)
const slug = computed(() => route.params.slug as string)
const lesson = ref<Lesson | null>(null)
const noteBody = ref('')
const noteId = ref<string | null>(null)
const loading = ref(true)
const loadError = ref('')
const savingNote = ref(false)
const markingComplete = ref(false)
const lessonLoadGuard = createLessonLoadGuard()

const trackMeta = computed(() => catalog.tracks.find((track) => track.id === trackId.value))
const trackTitle = computed(() => {
  const track = trackMeta.value
  return track?.title[locale.value] || track?.title.en || trackId.value
})
const isLanguageTrack = computed(() => trackIsLanguage(trackId.value, trackMeta.value?.category))

const crumbs = computed(() =>
  buildLearnBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    tracksLabel: t('nav.tracks'),
    tracksTo: localePath('/tracks'),
    categoryLabel: trackMeta.value
      ? t(`catalog.category.${trackMeta.value.category || 'sql'}`)
      : undefined,
    categoryTo: trackMeta.value
      ? localePath({
          path: '/tracks',
          query: {
            domain: trackMeta.value.category === 'languages' ? 'languages' : 'it',
            category: trackMeta.value.category || 'sql',
          },
        })
      : undefined,
    trackLabel: trackTitle.value,
    trackTo: localePath(`/tracks/${trackId.value}`),
    lessonLabel: lesson.value?.title,
  }),
)

const lessonReturnPath = computed(() => `/tracks/${trackId.value}/lessons/${slug.value}`)
const authLoginPath = computed(() => ({
  path: localePath('/login'),
  query: { redirect: localePath(lessonReturnPath.value) },
}))
const authRegisterPath = computed(() => ({
  path: localePath('/register'),
  query: { redirect: localePath(lessonReturnPath.value) },
}))

const tocItems = computed(() => isLanguageTrack.value ? [] : extractToc(lesson.value?.bodyHtml))
const languageVocab = computed(() => lesson.value ? languageVocabFromLesson(lesson.value) : [])
const languageExercise = computed(() => lesson.value ? languageExerciseFromLesson(lesson.value) : null)
const languageHasStepPath = computed(() => lesson.value ? languageHasSteps(lesson.value) : false)

const exerciseStarter = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  return (exercise?.starter as string) || 'SELECT * FROM movies;'
})
const jsExerciseStarter = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  return (exercise?.starter as string) || '// write JavaScript here\n'
})
const isHtmlCssTrack = computed(() => trackId.value === 'html-basics' || trackId.value === 'css-basics')
const htmlCssExerciseMode = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  const mode = exercise?.mode
  if (mode === 'css' || mode === 'both' || mode === 'html') return mode
  return trackId.value === 'css-basics' ? 'css' : 'html'
})
const htmlCssStarterHtml = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  if (typeof exercise?.starterHtml === 'string') return exercise.starterHtml
  if (htmlCssExerciseMode.value === 'html' || htmlCssExerciseMode.value === 'both') {
    return (exercise?.starter as string) || '<!-- write HTML here -->\n'
  }
  return '<p class="note">Preview</p>\n'
})
const htmlCssStarterCss = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  if (typeof exercise?.starterCss === 'string') return exercise.starterCss
  if (htmlCssExerciseMode.value === 'css' || htmlCssExerciseMode.value === 'both') {
    return (exercise?.starter as string) || '/* write CSS here */\n'
  }
  return ''
})
const exerciseHints = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  return Array.isArray(exercise?.hints) ? (exercise.hints as string[]) : []
})
const exerciseSolutionAvailable = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  return exercise?.solutionAvailable === true
})
const exercisePreview = computed(() => {
  const exercise = lesson.value?.exercise as Record<string, unknown> | undefined
  const preview = exercise?.preview as { columns?: string[]; rows?: unknown[][] } | undefined
  if (!preview?.columns?.length) return undefined
  return { columns: preview.columns, rows: preview.rows || [] }
})

const sortedLessons = computed(() => {
  const list = catalog.lessonsByTrack[trackId.value]
    || (catalog.lessons[0]?.trackId === trackId.value ? catalog.lessons : [])
  return isLanguageTrack.value
    ? orderLanguageLessons(list)
    : [...list].sort((a, b) => a.sortOrder - b.sortOrder)
})
const currentIndex = computed(() => sortedLessons.value.findIndex((item) => item.slug === slug.value))
const languageNodesById = computed(() => {
  if (!isLanguageTrack.value) return new Map<string, { clickable: boolean }>()
  const nodes = buildLanguageUnits(
    sortedLessons.value,
    catalog.progress,
    locale.value,
    { unlockAll: !auth.user || !catalog.progressLoaded },
  ).flatMap((unit) => unit.nodes)
  return new Map(nodes.map((node) => [node.id, { clickable: node.clickable }]))
})

function pagerLessonAt(index: number) {
  if (index < 0 || index >= sortedLessons.value.length) return null
  const candidate = sortedLessons.value[index]
  if (!candidate) return null
  if (!isLanguageTrack.value) return candidate
  return languageNodesById.value.get(candidate.id)?.clickable ? candidate : null
}

const prevLesson = computed(() => pagerLessonAt(currentIndex.value - 1))
const nextLesson = computed(() => pagerLessonAt(currentIndex.value + 1))
const lessonCompleted = computed(() =>
  lesson.value ? catalog.isCompleted(lesson.value.id, locale.value) : false,
)

function scrollToHeading(id: string) {
  const root = document.querySelector('.lesson-center')
  const element = document.getElementById(id)
  if (!element) return
  if (root instanceof HTMLElement) {
    const top = element.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop
    root.scrollTo({ top: Math.max(0, top - 12), behavior: 'smooth' })
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  history.replaceState(null, '', `#${id}`)
}

async function loadLesson() {
  const requestId = lessonLoadGuard.next()
  const expectedSlug = slug.value
  const expectedLocale = locale.value
  loading.value = true
  lesson.value = null
  noteBody.value = ''
  noteId.value = null
  loadError.value = ''
  try {
    const data = await api.lesson(expectedSlug, expectedLocale, trackId.value)
    if (!lessonLoadGuard.isCurrent(requestId)) return
    if (data.trackId && data.trackId !== trackId.value) {
      throw new Error(t('lesson.loadErrorGeneric'))
    }
    lesson.value = data
    if (auth.user) {
      const notes = await api.listNotes(expectedSlug, expectedLocale, trackId.value)
      if (!lessonLoadGuard.isCurrent(requestId)) return
      const primary = pickPrimaryNote(notes)
      noteBody.value = primary.body
      noteId.value = primary.noteId || null
    }
  } catch (error) {
    if (!lessonLoadGuard.isCurrent(requestId)) return
    loadError.value = error instanceof Error ? error.message : t('lesson.loadErrorGeneric')
  } finally {
    if (lessonLoadGuard.isCurrent(requestId)) loading.value = false
  }
}

async function loadPage() {
  loading.value = true
  loadError.value = ''
  try {
    await catalog.loadTracks()
    await catalog.loadLessons(trackId.value, locale.value)
    await auth.fetchMe()
    if (auth.user) await catalog.loadProgress()
    await loadLesson()
  } catch (error) {
    loadError.value = catalog.loadError
      || (error instanceof Error ? error.message : t('lesson.loadErrorGeneric'))
    loading.value = false
  }
}

async function saveNote() {
  if (!lesson.value || savingNote.value) return
  savingNote.value = true
  try {
    const mode = resolveNoteSaveMode(noteId.value)
    if (mode === 'update' && noteId.value) {
      await api.updateNote(noteId.value, noteBody.value)
    } else {
      const created = await api.createNote(slug.value, locale.value, noteBody.value, trackId.value)
      noteId.value = created.id
    }
    snackbar.success(t('snackbar.noteSaved'))
  } catch (error) {
    snackbar.error(error instanceof Error ? error.message : t('snackbar.genericError'))
  } finally {
    savingNote.value = false
  }
}

async function setLessonCompleted(completed: boolean, notify: boolean) {
  if (!lesson.value || markingComplete.value) return
  markingComplete.value = true
  try {
    await api.setProgress(lesson.value.id, locale.value, completed)
    await catalog.loadProgress()
    if (notify) {
      snackbar.success(completed ? t('snackbar.lessonComplete') : t('snackbar.lessonIncomplete'))
    }
  } catch (error) {
    snackbar.error(error instanceof Error ? error.message : t('snackbar.genericError'))
  } finally {
    markingComplete.value = false
  }
}

async function markComplete() {
  if (!lesson.value || lessonCompleted.value) return
  await setLessonCompleted(true, true)
}
async function markIncomplete() {
  if (!lesson.value || !lessonCompleted.value) return
  await setLessonCompleted(false, true)
}
async function onSandboxPassed() {
  if (!lesson.value || !auth.user || lessonCompleted.value) return
  await setLessonCompleted(true, false)
}

onMounted(loadPage)

watch([slug, locale, trackId], async ([nextSlug, nextLocale, nextTrack], [previousSlug, previousLocale, previousTrack]) => {
  if (nextLocale !== previousLocale || nextTrack !== previousTrack) {
    await loadPage()
    return
  }
  if (nextSlug !== previousSlug) await loadLesson()
})
</script>

<style scoped>
.lesson-error-actions { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
.lesson-objectives-mobile { margin: .75rem 0 1.25rem; padding: .75rem 1rem; border: 1px solid var(--color-hairline); border-radius: var(--radius-md); background: color-mix(in srgb, var(--color-surface) 90%, var(--color-pastel-blue) 10%); }
.lesson-objectives-label { margin: 0 0 .4rem; font-size: .8rem; font-weight: 700; color: var(--color-brand-deep); }
.lesson-objectives-list { margin: 0; padding-left: 1.1rem; color: var(--color-ink-muted); font-size: .92rem; line-height: 1.45; }
.lesson-reader.is-language-lesson { grid-template-columns: minmax(0, 1fr); }
.lesson-reader.is-language-lesson .lesson-center { width: 100%; }
.lesson-reader.is-language-lesson .lesson-main > h1 { width: min(100%, 48rem); margin-left: auto; margin-right: auto; }
.lang-legacy-note { margin: 1rem 0; }
.lesson-complete-bar { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; margin-top: 1.5rem; }
.lesson-completed-badge { font-size: .9rem; font-weight: 600; color: var(--color-brand); }
.lesson-pager { display: flex; justify-content: space-between; gap: 1rem; margin-top: 1.25rem; flex-wrap: wrap; }
.notes-card { margin-top: 1.5rem; }
.notes-input { width: 100%; font-family: inherit; }
.notes-actions { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; margin-top: 1rem; }
.auth-soft-prompt { margin-top: 2rem; padding: 1rem 1.25rem; border: 1px solid var(--color-hairline); border-radius: 6px; background: var(--color-surface-soft); }
.auth-soft-prompt p { margin: 0 0 .75rem; color: var(--color-ink-muted); font-size: .95rem; line-height: 1.45; }
.auth-soft-actions { display: flex; flex-wrap: wrap; gap: .5rem; }
@media (min-width: 1100px) { .lesson-objectives-mobile { display: none; } }
</style>
