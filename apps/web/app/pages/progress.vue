<template>
  <div class="hub-page learn-scroll">
    <SkeletonHub v-if="loading" :cards="3" card-height="6.5rem" />

    <template v-else-if="catalog.loadError">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader :eyebrow="t('nav.progress')" :title="t('progress.title')" :lead="t('hub.loadError')" />
      <p class="muted">{{ catalog.loadError }}</p>
      <button class="btn btn-primary" type="button" @click="retryLoad">{{ t('hub.retry') }}</button>
    </template>

    <template v-else-if="!auth.user">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.progress')"
        :title="t('progress.title')"
        :lead="t('progress.guestBody')"
      >
        <template #actions>
          <NuxtLink class="btn btn-primary" :to="loginPath">{{ t('nav.login') }}</NuxtLink>
          <NuxtLink class="btn btn-ghost" :to="registerPath">{{ t('nav.register') }}</NuxtLink>
        </template>
      </HubHeader>
    </template>

    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.progress')"
        :title="t('progress.title')"
        :lead="`${t('lesson.progress', { done: overall.done, total: overall.total })} · ${t('lesson.progressPercent', { percent: overall.percent })}`"
      >
        <template #actions>
          <NuxtLink
            v-if="resume"
            class="btn btn-primary"
            :to="localePath(`/tracks/${resume.trackId}/lessons/${resume.lesson.slug}`)"
          >
            {{ t('home.continue') }}: {{ resume.lesson.title }}
          </NuxtLink>
          <p v-else-if="overall.total > 0" class="muted">{{ t('progress.allComplete') }}</p>
          <NuxtLink class="btn btn-ghost" :to="localePath('/')">{{ t('nav.home') }}</NuxtLink>
        </template>
      </HubHeader>

      <div class="hub-progress-bar" role="img" :aria-label="t('lesson.progressPercent', { percent: overall.percent })">
        <span class="hub-progress-bar-fill" :style="{ width: `${overall.percent}%` }" />
      </div>

      <section v-if="rows.length" class="hub-progress-tracks" :aria-label="t('nav.tracks')">
        <article v-for="row in rows" :key="row.trackId" class="card card--stack">
          <p class="track-meta">
            {{ t(`catalog.category.${row.category}`) }}
            ·
            {{ t(`catalog.level.${row.level}`) }}
          </p>
          <h2 class="card-title">{{ row.title }}</h2>
          <p class="muted">
            {{ t('lesson.progress', { done: row.done, total: row.total }) }}
            ·
            {{ t('lesson.progressPercent', { percent: row.percent }) }}
          </p>
          <div class="hub-progress-bar" aria-hidden="true">
            <span class="hub-progress-bar-fill" :style="{ width: `${row.percent}%` }" />
          </div>
          <div class="card-actions">
            <NuxtLink
              v-if="row.next"
              class="btn btn-primary"
              :to="localePath(`/tracks/${row.trackId}/lessons/${row.next.slug}`)"
            >
              {{ t('lesson.continue') }}
            </NuxtLink>
            <NuxtLink class="btn btn-ghost" :to="localePath(`/tracks/${row.trackId}`)">
              {{ t('nav.tracks') }}
            </NuxtLink>
          </div>
          <p class="hub-progress-lessons-label">{{ t('progress.lessonList') }}</p>
          <ul class="nav-list hub-list hub-progress-lessons">
            <li v-for="lesson in lessonStatuses(row.trackId)" :key="lesson.id">
              <NuxtLink
                class="nav-link"
                :class="{ 'is-next': lesson.isNext }"
                :to="localePath(`/tracks/${row.trackId}/lessons/${lesson.slug}`)"
              >
                {{ lesson.sortOrder }}. {{ lesson.title }}
                <span v-if="lesson.completed" class="lesson-done">✓</span>
              </NuxtLink>
            </li>
          </ul>
        </article>
      </section>
      <p v-else class="hub-empty">{{ t('progress.emptyCatalog') }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { buildHubBreadcrumbs } from '~/utils/breadcrumbs'
import { overallProgress, trackLessonStatusRows, trackProgressRows } from '~/utils/learningPath'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const catalog = useCatalogStore()
const auth = useAuthStore()
const loading = ref(true)

const crumbs = computed(() =>
  buildHubBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    pageLabel: t('nav.progress'),
  }),
)

const loginPath = computed(() => ({
  path: localePath('/login'),
  query: { redirect: localePath('/progress') },
}))
const registerPath = computed(() => ({
  path: localePath('/register'),
  query: { redirect: localePath('/progress') },
}))

const overall = computed(() =>
  overallProgress(catalog.lessonsByTrack, catalog.progress, locale.value),
)

const rows = computed(() =>
  trackProgressRows(catalog.tracks, catalog.lessonsByTrack, catalog.progress, locale.value),
)

const resume = computed(() => catalog.resumeTarget(locale.value))

function lessonStatuses(trackId: string) {
  const lessons = catalog.lessonsByTrack[trackId] || []
  return trackLessonStatusRows(lessons, catalog.progress, locale.value)
}

async function retryLoad() {
  loading.value = true
  try {
    await auth.fetchMe()
    await catalog.loadCatalogForHome(locale.value)
    if (auth.user) await catalog.loadProgress()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await auth.fetchMe()
    await catalog.loadCatalogForHome(locale.value)
    if (auth.user) await catalog.loadProgress()
  } finally {
    loading.value = false
  }
})

watch(locale, async (loc) => {
  loading.value = true
  try {
    await catalog.loadCatalogForHome(loc)
    if (auth.user) await catalog.loadProgress()
  } finally {
    loading.value = false
  }
})
</script>

