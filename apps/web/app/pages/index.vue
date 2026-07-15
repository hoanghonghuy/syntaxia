<template>
  <div class="home-page">
    <SkeletonHome v-if="loading" />
    <div v-else-if="catalog.loadError" class="home-page home-error">
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
          <template v-else>
            <NuxtLink
              v-if="startTrackPath"
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
              v-if="!auth.user"
              class="btn btn-ghost"
              :to="localePath('/login')"
            >
              {{ t('home.loginSecondary') }}
            </NuxtLink>
          </template>
        </div>
      </section>

      <p v-if="previewGroups.length === 0" class="home-empty muted">
        {{ t('home.emptyCatalog') }}
      </p>

      <section
        v-for="group in previewGroups"
        :key="group.category"
        class="catalog-section"
      >
        <div class="catalog-heading-row">
          <h2 class="catalog-heading">{{ t(`catalog.category.${group.category}`) }}</h2>
          <NuxtLink
            class="catalog-more"
            :to="localePath({ path: '/tracks', query: { category: group.category } })"
          >
            {{ t('catalog.viewAllTracks') }}
          </NuxtLink>
        </div>
        <div class="track-grid home-track-grid">
          <article v-for="track in group.tracks" :key="track.id" class="card">
            <p class="track-meta">
              {{ t(`catalog.category.${track.category || 'sql'}`) }}
              ·
              {{ t(`catalog.level.${track.level || 'basic'}`) }}
            </p>
            <h3>{{ track.title[locale] || track.title.en }}</h3>
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
import { firstTrackId, previewTracksByCategory } from '~/utils/catalogBrowse'
import { reloadOnLocaleChange } from '~/utils/localeReload'
import { overallProgress } from '~/utils/learningPath'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const catalog = useCatalogStore()
const auth = useAuthStore()
const loading = ref(true)

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

const previewGroups = computed(() => previewTracksByCategory(catalog.tracks))

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
.home-error {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.home-hero {
  text-align: center;
}

.home-hero h1 {
  font-size: clamp(1.85rem, 5vw, 2.65rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-3);
  color: var(--color-ink);
}

.hero-lead {
  color: var(--color-ink-muted);
  max-width: 32rem;
  margin: 0 auto var(--space-4);
  line-height: 1.55;
}

.hero-progress {
  margin: 0 auto var(--space-4);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-brand-deep);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.home-empty {
  max-width: 40rem;
  margin: 0 auto;
  padding: 0 var(--space-4) var(--space-8);
  text-align: center;
}

.catalog-section {
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 var(--space-4) var(--space-6);
}

.catalog-heading {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin: 0;
}

.catalog-heading-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin: 0 0 var(--space-4);
}

.catalog-more {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-brand-deep);
  text-decoration: none;
}

.catalog-more:hover,
.catalog-more:focus-visible {
  text-decoration: underline;
}

.home-track-grid {
  padding: 0;
  max-width: none;
  margin: 0;
}

.track-meta {
  margin: 0 0 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-brand-deep);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.card h3 {
  margin-top: 0;
  font-size: 1.2rem;
}

.muted {
  color: var(--color-ink-muted);
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
