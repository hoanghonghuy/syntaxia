<template>
  <div class="hub-page learn-scroll">
    <SkeletonHub v-if="showSkeleton">
      <div class="hub-skel-list">
        <UiSkeleton v-for="n in 6" :key="n" width="100%" height="2.25rem" radius="6px" />
      </div>
    </SkeletonHub>

    <template v-else-if="catalog.loadError">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader :eyebrow="trackEyebrow" :title="trackTitle" :lead="t('hub.loadError')" />
      <p class="muted">{{ catalog.loadError }}</p>
      <button class="btn btn-primary" type="button" @click="retryLoad">{{ t('hub.retry') }}</button>
    </template>

    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <HubHeader :eyebrow="trackEyebrow" :title="trackTitle" :lead="trackLead">
        <template v-if="stats.total > 0" #actions>
          <NuxtLink
            v-if="nextLesson"
            class="btn btn-primary continue-btn"
            :to="localePath(`/tracks/${trackId}/lessons/${nextLesson.slug}`)"
          >
            {{ t('lesson.continue') }}: {{ nextLesson.title }}
          </NuxtLink>
          <p v-else class="muted">{{ t('lesson.trackComplete') }}</p>
        </template>
      </HubHeader>

      <ul v-if="stats.total > 0 && isNarrow" class="nav-list hub-list">
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
  </div>
</template>

<script setup lang="ts">
import { buildLearnBreadcrumbs } from '~/utils/breadcrumbs'
import { reloadOnLocaleChange } from '~/utils/localeReload'
import { shouldShowSkeleton } from '~/utils/softLoading'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const catalog = useCatalogStore()
const auth = useAuthStore()
const { isNarrow } = useLearnNav()
const loading = ref(true)

const showSkeleton = computed(() =>
  shouldShowSkeleton(
    loading.value,
    Boolean(catalog.tracks.find((tr) => tr.id === (route.params.track as string))),
  ),
)

const trackId = computed(() => route.params.track as string)
const trackMeta = computed(() => catalog.tracks.find((tr) => tr.id === trackId.value))
const trackTitle = computed(() => {
  const track = trackMeta.value
  return track?.title[locale.value] || track?.title.en || trackId.value
})

const trackEyebrow = computed(() => {
  const track = trackMeta.value
  if (!track) return ''
  const base = `${t(`catalog.category.${track.category || 'sql'}`)} · ${t(`catalog.level.${track.level || 'basic'}`)}`
  if (track.id === 'chinese-hsk') {
    return `${base} · ${t('catalog.hskBand1')}`
  }
  return base
})

const trackLead = computed(() => {
  if (stats.value.total === 0) {
    if (trackMeta.value?.category === 'languages') {
      return `${t('catalog.underDevelopment')} ${t('catalog.comingSoon')}`
    }
    return t('catalog.comingSoon')
  }
  return `${t('lesson.progress', { done: stats.value.done, total: stats.value.total })} · ${t('lesson.progressPercent', { percent: stats.value.percent })}`
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
          query: {
            domain: trackMeta.value.category === 'languages' ? 'languages' : 'it',
            category: trackMeta.value.category || 'sql',
          },
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

async function retryLoad() {
  await loadHub()
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
