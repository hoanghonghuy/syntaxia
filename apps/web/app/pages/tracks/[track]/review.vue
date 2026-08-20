<template>
  <div class="hub-page learn-scroll review-page">
    <AppBreadcrumb :items="crumbs" />
    <HubHeader :eyebrow="trackEyebrow" :title="t('lesson.reviewTitle')" :lead="lead">
      <template #actions>
        <NuxtLink class="btn btn-ghost" :to="localePath(`/tracks/${trackId}`)">
          {{ t('lesson.backToTrack') }}
        </NuxtLink>
      </template>
    </HubHeader>

    <p v-if="loadError" class="muted" role="alert">{{ loadError }}</p>
    <p v-else-if="loading" class="muted">{{ t('lesson.reviewLoading') }}</p>

    <aside v-else-if="!auth.user" class="auth-soft-prompt" role="note">
      <p>{{ t('auth.loginToSave') }}</p>
      <NuxtLink class="btn btn-primary" :to="loginPath">{{ t('nav.login') }}</NuxtLink>
    </aside>

    <p v-else-if="!session.length" class="muted">{{ t('lesson.reviewEmpty') }}</p>

    <template v-else-if="finished">
      <p class="review-done" role="status">{{ t('lesson.reviewDone') }}</p>
      <button class="btn btn-primary" type="button" @click="loadReview">
        {{ t('lesson.unitReview') }}
      </button>
    </template>

    <section v-else class="review-session" aria-live="polite">
      <div class="review-meta">
        <p class="review-progress muted">
          {{ t('lesson.reviewProgress', { n: index + 1, total: session.length }) }}
        </p>
        <p class="review-due muted">{{ t('lesson.reviewLead') }}</p>
      </div>
      <LanguageExercise
        :key="currentKey"
        :exercise="current!.exercise"
        :track-id="trackId"
        @attempt="onAttempt"
        @passed="onPassed"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { LanguageReviewCard, Lesson } from '~/types/api'
import { buildLearnBreadcrumbs } from '~/utils/breadcrumbs'
import { isLanguageTrack as trackIsLanguage } from '~/utils/languageLesson'
import {
  completedLessonSummaries,
  extractIndexedReviewExercisesFromLesson,
  type IndexedLanguageReviewExercise,
} from '~/utils/languageReview'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const api = useApi()
const catalog = useCatalogStore()
const auth = useAuthStore()

const trackId = computed(() => route.params.track as string)
const trackMeta = computed(() => catalog.tracks.find((track) => track.id === trackId.value))
const trackTitle = computed(() => {
  const track = trackMeta.value
  return track?.title[locale.value] || track?.title.en || trackId.value
})
const trackEyebrow = computed(() => trackTitle.value)
const loading = ref(true)
const loadError = ref('')
const session = ref<(IndexedLanguageReviewExercise & { card: LanguageReviewCard })[]>([])
const index = ref(0)
const finished = ref(false)
const lastAttemptWasCorrect = ref(false)
const lastResponseMs = ref<number | undefined>()
let pendingReviewWrite: Promise<void> = Promise.resolve()

const lead = computed(() => t('lesson.reviewLead'))
const current = computed(() => session.value[index.value])
const currentKey = computed(() => current.value ? `${current.value.lessonId}:${current.value.itemKey}:${index.value}` : 'empty')
const loginPath = computed(() => ({
  path: localePath('/login'),
  query: { redirect: localePath(`/tracks/${trackId.value}/review`) },
}))

const crumbs = computed(() =>
  buildLearnBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    tracksLabel: t('nav.tracks'),
    tracksTo: localePath('/tracks'),
    trackLabel: trackTitle.value,
    trackTo: localePath(`/tracks/${trackId.value}`),
    lessonLabel: t('lesson.reviewTitle'),
  }),
)

async function loadReview() {
  await pendingReviewWrite.catch(() => undefined)
  pendingReviewWrite = Promise.resolve()
  loading.value = true
  loadError.value = ''
  finished.value = false
  index.value = 0
  session.value = []
  try {
    await catalog.loadTracks()
    await catalog.loadLessons(trackId.value, locale.value)
    await auth.fetchMe()
    if (!trackIsLanguage(trackId.value, trackMeta.value?.category)) {
      loadError.value = t('lesson.reviewNotLanguage')
      return
    }
    if (!auth.user) return

    await catalog.loadProgress()
    const dueCards = await api.dueLanguageReviews(trackId.value, locale.value, 12)
    if (!dueCards.length) return

    const list = catalog.lessonsByTrack[trackId.value] || catalog.lessons
    const completed = completedLessonSummaries(list, catalog.progress, locale.value)
    const dueLessonIds = new Set(dueCards.map((card) => card.lessonId))
    const bodies: Lesson[] = []
    for (const item of completed.filter((lesson) => dueLessonIds.has(lesson.id))) {
      try {
        bodies.push(await api.lesson(item.slug, locale.value, trackId.value))
      } catch {
        // A stale/missing lesson is skipped; other due items remain reviewable.
      }
    }

    const indexed = new Map<string, IndexedLanguageReviewExercise>()
    for (const lesson of bodies) {
      for (const item of extractIndexedReviewExercisesFromLesson(lesson)) {
        indexed.set(`${item.lessonId}\0${item.itemKey}`, item)
      }
    }
    session.value = dueCards.flatMap((card) => {
      const item = indexed.get(`${card.lessonId}\0${card.itemKey}`)
      return item ? [{ ...item, card }] : []
    })
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : t('lesson.loadErrorGeneric')
  } finally {
    loading.value = false
  }
}

function onAttempt(payload: { correct: boolean; responseMs: number }) {
  lastAttemptWasCorrect.value = payload.correct
  lastResponseMs.value = payload.responseMs
  const item = current.value
  if (!item || payload.correct) return
  pendingReviewWrite = pendingReviewWrite.then(async () => {
    try {
      const card = await api.recordLanguageReview({
        lessonId: item.lessonId,
        locale: locale.value,
        itemKey: item.itemKey,
        rating: 1,
        responseMs: payload.responseMs,
      })
      item.card = card
    } catch (error) {
      loadError.value = error instanceof Error ? error.message : t('lesson.loadErrorGeneric')
      throw error
    }
  })
}

async function onPassed() {
  const item = current.value
  if (!item || !lastAttemptWasCorrect.value) return
  try {
    await pendingReviewWrite
    const card = await api.recordLanguageReview({
      lessonId: item.lessonId,
      locale: locale.value,
      itemKey: item.itemKey,
      rating: 3,
      responseMs: lastResponseMs.value,
    })
    item.card = card
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : t('lesson.loadErrorGeneric')
    pendingReviewWrite = Promise.resolve()
    return
  }
  pendingReviewWrite = Promise.resolve()
  lastAttemptWasCorrect.value = false
  lastResponseMs.value = undefined
  if (index.value >= session.value.length - 1) {
    finished.value = true
    return
  }
  index.value += 1
}

onMounted(loadReview)
watch([trackId, locale], loadReview)
</script>

<style scoped>
.review-page { max-width: 58rem; }
.review-session { max-width: 44rem; margin: 1rem auto 0; padding: 1rem; border: 1px solid var(--color-hairline); border-radius: 14px; background: var(--color-surface); }
.review-meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .5rem; margin-bottom: .75rem; }
.review-progress, .review-due { margin: 0; font-size: .86rem; }
.review-done { margin: 1.25rem 0 1rem; font-weight: 650; color: var(--color-accent, #0d9488); }
.auth-soft-prompt { margin-top: 1rem; padding: 1rem 1.2rem; border: 1px solid var(--color-hairline); border-radius: 12px; background: var(--color-surface-soft); }
.auth-soft-prompt p { margin: 0 0 .8rem; }
</style>
