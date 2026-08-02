<template>
  <div class="hub-page learn-scroll">
    <SkeletonHub v-if="showSkeleton" :cards="3" card-height="6.5rem" />

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

      <div class="category-filters" role="tablist" :aria-label="t('catalog.allDomains')">
        <NuxtLink
          v-for="d in domainTabs"
          :key="d"
          class="category-chip category-chip--domain"
          :class="{ 'is-active': domain === d }"
          role="tab"
          :aria-selected="domain === d"
          :to="localePath({ path: '/progress', query: { domain: d } })"
        >
          {{ t(`domain.${d}`) }}
        </NuxtLink>
      </div>

      <div class="hub-progress-bar" role="img" :aria-label="t('lesson.progressPercent', { percent: overall.percent })">
        <span class="hub-progress-bar-fill" :style="{ width: `${overall.percent}%` }" />
      </div>

      <section v-if="rows.length" class="hub-progress-tracks" :aria-label="t('nav.tracks')">
        <article v-for="row in rows" :key="row.trackId" class="card card--stack">
          <p class="track-meta">
            {{ t(`domain.${row.category === 'languages' ? 'languages' : 'it'}`) }}
            ·
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
              {{ t('catalog.openTrack') }}
            </NuxtLink>
          </div>
        </article>
      </section>
      <p v-else class="hub-empty">{{ t('progress.emptyDomain') }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { buildHubBreadcrumbs } from '~/utils/breadcrumbs'
import {
  LEARNING_DOMAIN_IDS,
  isLearningDomainId,
  parseDomainQuery,
  readStoredDomain,
  writeStoredDomain,
} from '~/utils/learningDomains'
import {
  overallProgressForDomain,
  resumeTargetForDomain,
  trackProgressRowsForDomain,
} from '~/utils/learningPath'
import { shouldShowSkeleton } from '~/utils/softLoading'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const catalog = useCatalogStore()
const auth = useAuthStore()
const loading = ref(true)

const showSkeleton = computed(() =>
  shouldShowSkeleton(loading.value, catalog.tracks.length > 0),
)

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

const domainTabs = LEARNING_DOMAIN_IDS

const domain = computed(() => parseDomainQuery(route.query.domain))

const overall = computed(() =>
  overallProgressForDomain(
    catalog.tracks,
    catalog.lessonsByTrack,
    catalog.progress,
    locale.value,
    domain.value,
  ),
)

const rows = computed(() =>
  trackProgressRowsForDomain(
    catalog.tracks,
    catalog.lessonsByTrack,
    catalog.progress,
    locale.value,
    domain.value,
  ),
)

const resume = computed(() =>
  resumeTargetForDomain(
    catalog.tracks,
    catalog.lessonsByTrack,
    catalog.progress,
    locale.value,
    domain.value,
  ),
)

watch(
  domain,
  (d) => {
    if (import.meta.client && isLearningDomainId(d)) {
      writeStoredDomain(d, localStorage)
    }
  },
  { immediate: true },
)

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
  if (import.meta.client && (route.query.domain === undefined || route.query.domain === '')) {
    const stored = readStoredDomain(localStorage)
    if (stored) {
      await navigateTo(
        localePath({ path: '/progress', query: { domain: stored } }),
        { replace: true },
      )
    }
  }

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
