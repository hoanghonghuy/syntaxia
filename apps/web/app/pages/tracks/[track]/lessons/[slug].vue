<template>
  <div class="lesson-reader">
    <div class="lesson-center">
      <SkeletonLesson v-if="loading" />
      <main v-else-if="loadError" class="lesson-main lesson-error">
        <AppBreadcrumb :items="crumbs" />
        <h1>{{ t('lesson.loadErrorTitle') }}</h1>
        <p>{{ loadError }}</p>
        <div class="lesson-error-actions">
          <button class="btn btn-primary" type="button" @click="loadLesson">
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
        <article class="prose-lesson" v-html="lesson.bodyHtml" />
        <SqlSandbox
          v-if="lesson.exercise"
          :key="lesson.id"
          :lesson-id="lesson.id"
          :lesson-slug="slug"
          :locale="locale"
          :starter="exerciseStarter"
          :hints="exerciseHints"
          :solution-available="exerciseSolutionAvailable"
          :preview="exercisePreview"
          :can-run="!auth.loading && !!auth.user"
          :login-path="authLoginPath"
        />
        <section v-if="auth.user" class="card notes-card">
          <h2>{{ t('lesson.notes') }}</h2>
          <textarea v-model="noteBody" rows="4" class="notes-input" />
          <div class="notes-actions">
            <button class="btn btn-primary" type="button" :disabled="savingNote" @click="saveNote">
              {{ t('lesson.saveNote') }}
            </button>
            <button class="btn btn-ghost" type="button" :disabled="markingComplete" @click="markComplete">
              {{ t('lesson.complete') }}
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
      </main>
    </div>

    <aside class="lesson-toc">
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
            <li v-for="obj in lesson.objectives" :key="obj">{{ obj }}</li>
          </ul>
        </template>
      </template>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '~/types/api'
import { buildLearnBreadcrumbs } from '~/utils/breadcrumbs'
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

const trackMeta = computed(() => catalog.tracks.find((tr) => tr.id === trackId.value))
const trackTitle = computed(() => {
  const track = trackMeta.value
  return track?.title[locale.value] || track?.title.en || trackId.value
})

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
          query: { category: trackMeta.value.category || 'sql' },
        })
      : undefined,
    trackLabel: trackTitle.value,
    trackTo: localePath(`/tracks/${trackId.value}`),
    lessonLabel: lesson.value?.title,
  }),
)

const lessonReturnPath = computed(
  () => `/tracks/${trackId.value}/lessons/${slug.value}`,
)
const authLoginPath = computed(() => ({
  path: localePath('/login'),
  query: { redirect: localePath(lessonReturnPath.value) },
}))
const authRegisterPath = computed(() => ({
  path: localePath('/register'),
  query: { redirect: localePath(lessonReturnPath.value) },
}))

const tocItems = computed(() => extractToc(lesson.value?.bodyHtml))

const exerciseStarter = computed(() => {
  const ex = lesson.value?.exercise as Record<string, unknown> | undefined
  return (ex?.starter as string) || 'SELECT * FROM movies;'
})

const exerciseHints = computed(() => {
  const ex = lesson.value?.exercise as Record<string, unknown> | undefined
  const raw = ex?.hints
  return Array.isArray(raw) ? (raw as string[]) : []
})

const exerciseSolutionAvailable = computed(() => {
  const ex = lesson.value?.exercise as Record<string, unknown> | undefined
  return ex?.solutionAvailable === true
})

const exercisePreview = computed(() => {
  const ex = lesson.value?.exercise as Record<string, unknown> | undefined
  const preview = ex?.preview as { columns?: string[]; rows?: unknown[][] } | undefined
  if (!preview?.columns?.length) return undefined
  return { columns: preview.columns, rows: preview.rows || [] }
})

const sortedLessons = computed(() => {
  const list =
    catalog.lessonsByTrack[trackId.value] ||
    (catalog.lessons[0]?.trackId === trackId.value ? catalog.lessons : [])
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder)
})

const currentIndex = computed(() =>
  sortedLessons.value.findIndex((l) => l.slug === slug.value),
)

const prevLesson = computed(() =>
  currentIndex.value > 0 ? sortedLessons.value[currentIndex.value - 1] : null,
)

const nextLesson = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < sortedLessons.value.length - 1
    ? sortedLessons.value[currentIndex.value + 1]
    : null,
)

function scrollToHeading(id: string) {
  const root = document.querySelector('.lesson-center')
  const el = document.getElementById(id)
  if (!el) return
  if (root instanceof HTMLElement) {
    const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop
    root.scrollTo({ top: Math.max(0, top - 12), behavior: 'smooth' })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
    const data = await api.lesson(expectedSlug, expectedLocale)
    if (!lessonLoadGuard.isCurrent(requestId)) return
    lesson.value = data
    if (auth.user) {
      const notes = await api.listNotes(expectedSlug, expectedLocale)
      if (!lessonLoadGuard.isCurrent(requestId)) return
      const primary = pickPrimaryNote(notes)
      noteBody.value = primary.body
      noteId.value = primary.noteId || null
    }
  } catch (e) {
    if (!lessonLoadGuard.isCurrent(requestId)) return
    loadError.value = e instanceof Error ? e.message : t('lesson.loadErrorGeneric')
  } finally {
    if (lessonLoadGuard.isCurrent(requestId)) {
      loading.value = false
    }
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
      const created = await api.createNote(slug.value, locale.value, noteBody.value)
      noteId.value = created.id
    }
    snackbar.success(t('snackbar.noteSaved'))
  } catch (e) {
    const msg = e instanceof Error ? e.message : t('snackbar.genericError')
    snackbar.error(msg || t('snackbar.genericError'))
  } finally {
    savingNote.value = false
  }
}

async function markComplete() {
  if (!lesson.value || markingComplete.value) return
  markingComplete.value = true
  try {
    await api.setProgress(lesson.value.id, locale.value, true)
    await catalog.loadProgress()
    snackbar.success(t('snackbar.lessonComplete'))
  } catch (e) {
    const msg = e instanceof Error ? e.message : t('snackbar.genericError')
    snackbar.error(msg || t('snackbar.genericError'))
  } finally {
    markingComplete.value = false
  }
}

onMounted(async () => {
  await catalog.loadTracks()
  await catalog.loadLessons(trackId.value, locale.value)
  await auth.fetchMe()
  if (auth.user) await catalog.loadProgress()
  await loadLesson()
})

watch([slug, locale, trackId], async ([, , track]) => {
  if (track) await catalog.loadLessons(String(track), locale.value)
  await loadLesson()
})
</script>

<style scoped>
.lesson-error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.notes-card {
  margin-top: 2rem;
}
.notes-input {
  width: 100%;
  font-family: inherit;
}
.notes-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.lesson-pager {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}
.auth-soft-prompt {
  margin-top: 2rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-hairline);
  border-radius: 6px;
  background: var(--color-surface-soft);
}
.auth-soft-prompt p {
  margin: 0 0 0.75rem;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
  line-height: 1.45;
}
.auth-soft-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
