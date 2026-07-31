<template>
  <div class="home-page">
    <SkeletonHome v-if="showSkeleton" />
    <div v-else-if="catalog.loadError" class="hub-error-panel">
      <p>{{ t('hub.loadError') }}</p>
      <p class="muted">{{ catalog.loadError }}</p>
      <button class="btn btn-primary" type="button" @click="retryCatalog">
        {{ t('hub.retry') }}
      </button>
    </div>
    <template v-else>
      <section class="hero home-hero">
        <h1>{{ t('home.title') }}</h1>
        <p class="hero-lead">{{ t('home.subtitle') }}</p>
        <p v-if="auth.user && overall.total > 0" class="hero-progress">
          {{ t('lesson.progress', { done: overall.done, total: overall.total }) }}
          ·
          {{ t('lesson.progressPercent', { percent: overall.percent }) }}
        </p>
        <div class="hero-actions">
          <NuxtLink
            v-if="continueLink"
            class="btn btn-primary"
            :to="continueLink"
          >
            {{ t('home.continue') }}
            <template v-if="resumeLessonTitle">: {{ resumeLessonTitle }}</template>
          </NuxtLink>
          <NuxtLink
            v-else-if="startTrackPath"
            class="btn btn-primary"
            :to="startTrackPath"
          >
            {{ t('home.cta') }}
          </NuxtLink>
          <NuxtLink
            v-else
            class="btn btn-primary"
            :to="localePath('/tracks')"
          >
            {{ t('catalog.viewAllTracks') }}
          </NuxtLink>
          <NuxtLink
            v-if="!auth.user && !continueLink"
            class="btn btn-ghost"
            :to="localePath('/login')"
          >
            {{ t('home.loginSecondary') }}
          </NuxtLink>
          <NuxtLink
            v-else-if="continueLink || startTrackPath"
            class="btn btn-ghost"
            :to="localePath('/tracks')"
          >
            {{ t('catalog.viewAllTracks') }}
          </NuxtLink>
        </div>
      </section>

      <div v-if="featured.length === 0" class="hub-empty hub-empty--center">
        <p>{{ t('home.emptyCatalog') }}</p>
        <NuxtLink class="btn btn-ghost" :to="localePath('/tracks')">
          {{ t('catalog.viewAllTracks') }}
        </NuxtLink>
      </div>

      <section v-else class="catalog-section">
        <div class="catalog-heading-row">
          <h2 class="catalog-heading">{{ t('home.featured') }}</h2>
          <NuxtLink class="catalog-more" :to="localePath('/tracks')">
            {{ t('catalog.viewAllTracks') }}
          </NuxtLink>
        </div>
        <div class="track-grid track-grid--flush">
          <article v-for="track in featured" :key="track.id" class="card">
            <p class="track-meta">
              {{ t(`catalog.category.${track.category || 'sql'}`) }}
              ·
              {{ t(`catalog.level.${track.level || 'basic'}`) }}
            </p>
            <h2 class="card-title">{{ track.title[locale] || track.title.en }}</h2>
            <p>{{ track.description[locale] || track.description.en }}</p>
            <p v-if="auth.user" class="muted">
              {{
                t('lesson.progress', {
                  done: catalog.progressForTrack(track.id, locale).done,
                  total: catalog.progressForTrack(track.id, locale).total,
                })
              }}
              ·
              {{
                t('lesson.progressPercent', {
                  percent: catalog.progressForTrack(track.id, locale).percent,
                })
              }}
            </p>
            <div class="card-actions">
              <NuxtLink
                v-if="auth.user && catalog.nextForTrack(track.id, locale)"
                class="btn btn-primary"
                :to="
                  localePath(
                    `/tracks/${track.id}/lessons/${catalog.nextForTrack(track.id, locale)!.slug}`,
                  )
                "
              >
                {{ t('lesson.continue') }}
              </NuxtLink>
              <NuxtLink class="btn btn-ghost" :to="localePath(`/tracks/${track.id}`)">
                {{ t('catalog.openTrack') }}
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { featuredTracks, firstTrackId } from '~/utils/catalogBrowse'
import { reloadOnLocaleChange } from '~/utils/localeReload'
import { overallProgress } from '~/utils/learningPath'
import { shouldShowSkeleton } from '~/utils/softLoading'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const catalog = useCatalogStore()
const auth = useAuthStore()
const loading = ref(true)

const showSkeleton = computed(() =>
  shouldShowSkeleton(loading.value, catalog.tracks.length > 0),
)

const resume = computed(() => {
  if (!auth.user) return null
  return catalog.resumeTarget(locale.value)
})

const continueLink = computed(() => {
  if (!resume.value) return null
  return localePath(`/tracks/${resume.value.trackId}/lessons/${resume.value.lesson.slug}`)
})

const resumeLessonTitle = computed(() => resume.value?.lesson.title || '')

const startTrackPath = computed(() => {
  const id = firstTrackId(catalog.tracks)
  if (!id) return null
  return localePath(`/tracks/${id}`)
})

const overall = computed(() =>
  overallProgress(catalog.lessonsByTrack, catalog.progress, locale.value),
)

const featured = computed(() => featuredTracks(catalog.tracks))

async function retryCatalog() {
  loading.value = true
  try {
    await catalog.loadCatalogForHome(locale.value)
    if (auth.user) await catalog.loadProgress()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    if (auth.user === null) await auth.fetchMe()
    await catalog.loadCatalogForHome(locale.value)
    if (auth.user) await catalog.loadProgress()
  } finally {
    loading.value = false
  }
})

watch(locale, async (loc) => {
  loading.value = true
  try {
    await reloadOnLocaleChange({
      locale: loc,
      isLoggedIn: Boolean(auth.user),
      loadCatalog: (l) => catalog.loadCatalogForHome(l),
      loadProgress: () => catalog.loadProgress(),
    })
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home-hero {
  text-align: center;
}
</style>
