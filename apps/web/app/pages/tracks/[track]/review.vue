<template>
  <div class="hub-page learn-scroll">
    <AppBreadcrumb :items="crumbs" />
    <HubHeader :eyebrow="trackEyebrow" :title="t('lesson.reviewTitle')" :lead="lead">
      <template #actions>
        <NuxtLink class="btn btn-ghost" :to="localePath(`/tracks/${trackId}`)">
          {{ t('lesson.backToTrack') }}
        </NuxtLink>
      </template>
    </HubHeader>

    <p v-if="loadError" class="muted">{{ loadError }}</p>
    <p v-else-if="loading" class="muted">{{ t('lesson.reviewLoading') }}</p>
    <p v-else-if="!session.length" class="muted">{{ t('lesson.reviewEmpty') }}</p>

    <template v-else-if="finished">
      <p class="review-done" role="status">{{ t('lesson.reviewDone') }}</p>
      <NuxtLink class="btn btn-primary" :to="localePath(`/tracks/${trackId}`)">
        {{ t('lesson.backToTrack') }}
      </NuxtLink>
    </template>

    <template v-else>
      <p class="review-progress muted">
        {{ t('lesson.reviewProgress', { n: index + 1, total: session.length }) }}
      </p>
      <LanguageExercise
        :key="index"
        :exercise="session[index]!"
        @passed="onPassed"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '~/types/api'
import { buildLearnBreadcrumbs } from '~/utils/breadcrumbs'
import { isLanguageTrack as trackIsLanguage } from '~/utils/languageLesson'
import {
  buildReviewSession,
  completedLessonSummaries,
} from '~/utils/languageReview'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const api = useApi()
const catalog = useCatalogStore()
const auth = useAuthStore()

const trackId = computed(() => route.params.track as string)
const trackMeta = computed(() => catalog.tracks.find((tr) => tr.id === trackId.value))
const trackTitle = computed(() => {
  const track = trackMeta.value
  return track?.title[locale.value] || track?.title.en || trackId.value
})
const trackEyebrow = computed(() => trackTitle.value)

const loading = ref(true)
const loadError = ref('')
const session = ref<ReturnType<typeof buildReviewSession>>([])
const index = ref(0)
const finished = ref(false)

const lead = computed(() => t('lesson.reviewLead'))

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
  loading.value = true
  loadError.value = ''
  finished.value = false
  index.value = 0
  session.value = []
  try {
    await catalog.loadTracks()
    await catalog.loadLessons(trackId.value, locale.value)
    await auth.fetchMe()
    if (auth.user) await catalog.loadProgress()

    if (!trackIsLanguage(trackId.value, trackMeta.value?.category)) {
      loadError.value = t('lesson.reviewNotLanguage')
      return
    }

    const list =
      catalog.lessonsByTrack[trackId.value] ||
      (catalog.lessons[0]?.trackId === trackId.value ? catalog.lessons : [])
    const completed = completedLessonSummaries(list, catalog.progress, locale.value)
    if (!completed.length) {
      return
    }

    const bodies: Lesson[] = []
    for (const item of completed) {
      try {
        bodies.push(await api.lesson(item.slug, locale.value, trackId.value))
      } catch {
        /* skip failed fetch */
      }
    }
    session.value = buildReviewSession(bodies)
  } catch (e) {
    loadError.value = e instanceof Error ? e.message : t('lesson.loadErrorGeneric')
  } finally {
    loading.value = false
  }
}

function onPassed() {
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
.review-progress {
  margin: 1rem 0 0.25rem;
  font-size: 0.9rem;
}
.review-done {
  margin: 1.25rem 0 1rem;
  font-weight: 600;
  color: var(--color-accent, #0d9488);
}
</style>
