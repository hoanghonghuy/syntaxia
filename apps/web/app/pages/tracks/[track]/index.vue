<template>
  <div class="track-hub learn-scroll">
    <template v-if="loading">
      <UiSkeleton width="35%" height="0.75rem" />
      <UiSkeleton width="55%" height="2rem" />
      <UiSkeleton width="70%" height="0.95rem" />
      <UiSkeleton width="10rem" height="2.5rem" radius="6px" />
      <div class="hub-skel-list">
        <UiSkeleton v-for="n in 6" :key="n" width="100%" height="2.25rem" radius="6px" />
      </div>
    </template>
    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <p v-if="trackMeta" class="track-meta">
        {{ t(`catalog.category.${trackMeta.category}`) }}
        ·
        {{ t(`catalog.level.${trackMeta.level}`) }}
      </p>
      <h1>{{ trackTitle }}</h1>
      <template v-if="stats.total === 0">
        <p class="muted coming-soon">{{ t('catalog.comingSoon') }}</p>
      </template>
      <template v-else>
        <p class="muted">
          {{ t('lesson.progress', { done: stats.done, total: stats.total }) }}
          ·
          {{ t('lesson.progressPercent', { percent: stats.percent }) }}
        </p>
        <div class="hub-actions">
          <NuxtLink
            v-if="nextLesson"
            class="btn btn-primary continue-btn"
            :to="localePath(`/tracks/${trackId}/lessons/${nextLesson.slug}`)"
          >
            {{ t('lesson.continue') }}: {{ nextLesson.title }}
          </NuxtLink>
          <p v-else class="muted">{{ t('lesson.trackComplete') }}</p>
          <button
            v-if="isNarrow"
            class="btn btn-ghost open-lessons-btn"
            type="button"
            @click="openNav"
          >
            {{ t('nav.openMenu') }}
          </button>
        </div>
        <ul v-if="!isNarrow" class="nav-list hub-list">
          <li v-for="item in catalog.lessons" :key="item.id">
            <NuxtLink
              class="nav-link"
              :class="{ 'is-next': nextLesson?.id === item.id }"
              :to="localePath(`/tracks/${trackId}/lessons/${item.slug}`)"
            >
              {{ item.sortOrder }}. {{ item.title }}
              <span v-if="catalog.isCompleted(item.id, locale)"> ✓</span>
            </NuxtLink>
          </li>
        </ul>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { buildLearnBreadcrumbs } from '~/utils/breadcrumbs'
import { reloadOnLocaleChange } from '~/utils/localeReload'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const catalog = useCatalogStore()
const auth = useAuthStore()
const { isNarrow, openNav } = useLearnNav()
const loading = ref(true)

const trackId = computed(() => route.params.track as string)
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
  }),
)

const stats = computed(() => catalog.progressForTrack(trackId.value, locale.value))
const nextLesson = computed(() => catalog.nextForTrack(trackId.value, locale.value))

async function loadHub() {
  loading.value = true
  try {
    await catalog.loadTracks()
    await catalog.loadLessons(trackId.value, locale.value)
    await auth.fetchMe()
    if (auth.user) await catalog.loadProgress()
  } finally {
    loading.value = false
  }
}

onMounted(loadHub)

watch(locale, async (loc) => {
  loading.value = true
  try {
    await reloadOnLocaleChange({
      locale: loc,
      isLoggedIn: Boolean(auth.user),
      loadCatalog: (l) => catalog.loadLessons(trackId.value, l),
      loadProgress: () => catalog.loadProgress(),
    })
  } finally {
    loading.value = false
  }
})

watch(trackId, loadHub)
</script>

<style scoped>
.track-hub {
  max-width: 40rem;
  padding: var(--space-6) var(--space-4) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.muted {
  color: var(--color-ink-muted);
}

.track-meta {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-brand-deep);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hub-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.coming-soon {
  margin-top: 0.35rem;
  font-size: 1.05rem;
}

.hub-list {
  margin-top: 0.75rem;
}

.hub-skel-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: 0.75rem;
}

.nav-link.is-next {
  border: 1px solid var(--color-brand);
  background: var(--color-brand-soft);
}

@media (min-width: 768px) {
  .track-hub {
    padding: var(--space-6) var(--space-5) var(--space-8);
  }
}
</style>
