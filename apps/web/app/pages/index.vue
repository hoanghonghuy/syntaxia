<template>
  <div class="home-page">
    <SkeletonHome v-if="showSkeleton" />

    <div v-else-if="catalog.loadError" class="hub-error-panel home-error">
      <p>{{ t('hub.loadError') }}</p>
      <p class="muted">{{ catalog.loadError }}</p>
      <button class="btn btn-primary" type="button" @click="retryCatalog">
        {{ t('hub.retry') }}
      </button>
    </div>

    <template v-else>
      <section class="hero home-hero">
        <div class="home-hero-copy">
          <p class="home-hero-kicker">
            {{ t('domain.it') }}
            <span aria-hidden="true">+</span>
            {{ t('domain.languages') }}
          </p>

          <h1>Syntaxia</h1>
          <p class="hero-lead">{{ t('home.domainsHeading') }}</p>

          <p v-if="auth.user && overall.total > 0" class="hero-progress">
            {{ t('lesson.progress', { done: overall.done, total: overall.total }) }}
            <span aria-hidden="true">·</span>
            {{ t('lesson.progressPercent', { percent: overall.percent }) }}
          </p>

          <div class="hero-actions">
            <NuxtLink
              v-if="continueLink"
              class="btn btn-primary home-primary-cta"
              :to="continueLink"
            >
              {{ t('home.continue') }}
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink
              v-else
              class="btn btn-primary home-primary-cta"
              :to="localePath('/tracks')"
            >
              {{ t('home.cta') }}
              <span aria-hidden="true">→</span>
            </NuxtLink>

            <NuxtLink
              v-if="!auth.user"
              class="btn btn-ghost"
              :to="localePath('/login')"
            >
              {{ t('nav.login') }}
            </NuxtLink>
            <NuxtLink
              v-else
              class="btn btn-ghost"
              :to="localePath('/tracks')"
            >
              {{ t('catalog.viewAllTracks') }}
            </NuxtLink>
          </div>

          <p v-if="continueLink && resumeLessonTitle" class="home-resume muted">
            {{ resumeLessonTitle }}
          </p>
        </div>

        <div class="home-learning-map" aria-hidden="true">
          <div class="home-learning-ring home-learning-ring--outer" />
          <div class="home-learning-ring home-learning-ring--inner" />
          <div class="home-learning-core">S</div>
          <span class="home-learning-chip chip-sql">SQL</span>
          <span class="home-learning-chip chip-web">Web</span>
          <span class="home-learning-chip chip-js">JS</span>
          <span class="home-learning-chip chip-en">EN</span>
          <span class="home-learning-chip chip-zh">中文</span>
          <span class="home-learning-chip chip-ja">日本語</span>
        </div>
      </section>

      <section class="catalog-section domains-section" :aria-label="t('home.domainsHeading')">
        <div class="catalog-heading-row home-section-head">
          <div>
            <p class="home-section-kicker">Syntaxia</p>
            <h2 class="catalog-heading">{{ t('home.domainsHeading') }}</h2>
          </div>
        </div>

        <div class="domain-grid">
          <article class="card domain-card domain-card--it">
            <div class="domain-card-top">
              <span class="domain-mark" aria-hidden="true">&lt;/&gt;</span>
              <p class="track-meta">SQL · Web · {{ t('catalog.category.code') }}</p>
            </div>
            <h3 class="card-title">{{ t('domain.it') }}</h3>
            <div class="domain-tags" aria-hidden="true">
              <span>PostgreSQL</span>
              <span>JavaScript</span>
              <span>HTML/CSS</span>
            </div>
            <div class="card-actions">
              <NuxtLink
                class="btn btn-primary"
                :to="localePath({ path: '/tracks', query: { domain: 'it' } })"
              >
                {{ t('domain.browse') }}
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </article>

          <article class="card domain-card domain-card--languages">
            <div class="domain-card-top">
              <span class="domain-mark" aria-hidden="true">Aa</span>
              <p class="track-meta">CEFR A1 · HSK 3.0 · JLPT N5</p>
            </div>
            <h3 class="card-title">{{ t('domain.languages') }}</h3>
            <div class="domain-tags" aria-hidden="true">
              <span>English</span>
              <span>中文</span>
              <span>日本語</span>
            </div>
            <div class="card-actions">
              <NuxtLink
                class="btn btn-primary"
                :to="localePath({ path: '/tracks', query: { domain: 'languages' } })"
              >
                {{ t('domain.browse') }}
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <div v-if="featured.length === 0" class="hub-empty hub-empty--center">
        <p>{{ t('home.emptyCatalog') }}</p>
        <NuxtLink class="btn btn-ghost" :to="localePath('/tracks')">
          {{ t('catalog.viewAllTracks') }}
        </NuxtLink>
      </div>

      <section v-else class="catalog-section featured-section">
        <div class="catalog-heading-row home-section-head">
          <h2 class="catalog-heading">{{ t('home.featured') }}</h2>
          <NuxtLink class="catalog-more" :to="localePath({ path: '/tracks', query: { domain: 'it' } })">
            {{ t('catalog.viewAllTracks') }}
          </NuxtLink>
        </div>

        <div class="track-grid track-grid--flush home-featured-grid">
          <article v-for="track in featured" :key="track.id" class="card home-track-card">
            <p class="track-meta">
              {{ t(`catalog.category.${track.category || 'sql'}`) }}
              <span aria-hidden="true">·</span>
              {{ t(`catalog.level.${track.level || 'basic'}`) }}
            </p>
            <h3 class="card-title">{{ track.title[locale] || track.title.en }}</h3>

            <template v-if="auth.user">
              <div class="home-track-progress" aria-hidden="true">
                <span :style="{ width: `${catalog.progressForTrack(track.id, locale).percent}%` }" />
              </div>
              <p class="muted home-track-progress-copy">
                {{ t('lesson.progressPercent', { percent: catalog.progressForTrack(track.id, locale).percent }) }}
              </p>
            </template>

            <div class="card-actions">
              <NuxtLink
                v-if="auth.user && catalog.nextForTrack(track.id, locale)"
                class="btn btn-primary"
                :to="localePath(`/tracks/${track.id}/lessons/${catalog.nextForTrack(track.id, locale)!.slug}`)"
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
import { featuredTracks } from '~/utils/catalogBrowse'
import { filterTracksByDomain } from '~/utils/learningDomains'
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

const itTracks = computed(() => filterTracksByDomain(catalog.tracks, 'it'))

const resume = computed(() => {
  if (!auth.user) return null
  return catalog.resumeTarget(locale.value)
})

const continueLink = computed(() => {
  if (!resume.value) return null
  return localePath(`/tracks/${resume.value.trackId}/lessons/${resume.value.lesson.slug}`)
})

const resumeLessonTitle = computed(() => resume.value?.lesson.title || '')

const overall = computed(() =>
  overallProgress(catalog.lessonsByTrack, catalog.progress, locale.value),
)

const featured = computed(() => featuredTracks(itTracks.value))

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
.home-page {
  min-height: 100%;
  padding: clamp(0.75rem, 2vw, 1.5rem) 0 var(--space-8);
}

.home-error {
  max-width: 46rem;
  margin: var(--space-8) auto;
}

.home-hero {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: var(--space-6);
  width: min(72rem, calc(100% - 1.5rem));
  margin: 0 auto var(--space-8);
  padding: clamp(2rem, 6vw, 4.5rem);
  overflow: hidden;
  text-align: left;
  border: 1px solid var(--color-hairline);
  border-radius: clamp(1.25rem, 3vw, 2rem);
  background:
    radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--color-pastel-purple) 62%, transparent) 0, transparent 32%),
    radial-gradient(circle at 12% 90%, color-mix(in srgb, var(--color-brand-soft) 72%, transparent) 0, transparent 35%),
    linear-gradient(145deg, color-mix(in srgb, var(--color-surface) 92%, var(--color-hero-from) 8%), var(--color-surface));
  box-shadow: 0 24px 70px color-mix(in srgb, var(--color-ink) 9%, transparent);
}

.home-hero::after {
  content: '';
  position: absolute;
  inset: auto -8% -45% 44%;
  z-index: -1;
  aspect-ratio: 1;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-brand) 8%, transparent);
  filter: blur(2px);
}

.home-hero-copy {
  position: relative;
  z-index: 2;
  max-width: 36rem;
}

.home-hero-kicker,
.home-section-kicker {
  margin: 0 0 var(--space-2);
  color: var(--color-brand-deep);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.home-hero h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 6.5rem);
  font-weight: 650;
  line-height: 0.95;
  letter-spacing: -0.065em;
}

.home-hero .hero-lead {
  max-width: none;
  margin: var(--space-4) 0 0;
  color: var(--color-ink-muted);
  font-size: clamp(1.05rem, 2.2vw, 1.3rem);
}

.hero-progress {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-4) 0 0;
  padding: 0.42rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--color-brand) 28%, var(--color-hairline));
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-brand-soft) 55%, var(--color-surface));
  color: var(--color-brand-deep);
  font-size: 0.86rem;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.home-primary-cta {
  min-width: 8rem;
}

.home-resume {
  margin: var(--space-3) 0 0;
  font-size: 0.88rem;
}

.home-learning-map {
  position: relative;
  width: min(100%, 23rem);
  aspect-ratio: 1;
  justify-self: center;
  filter: drop-shadow(0 20px 36px color-mix(in srgb, var(--color-brand) 16%, transparent));
}

.home-learning-ring {
  position: absolute;
  inset: 50%;
  border: 1px solid color-mix(in srgb, var(--color-brand) 24%, var(--color-hairline));
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.home-learning-ring--outer {
  width: 88%;
  height: 88%;
}

.home-learning-ring--inner {
  width: 52%;
  height: 52%;
  border-style: dashed;
}

.home-learning-core {
  position: absolute;
  inset: 50% auto auto 50%;
  display: grid;
  place-items: center;
  width: 5.6rem;
  height: 5.6rem;
  transform: translate(-50%, -50%);
  border: 1px solid color-mix(in srgb, var(--color-brand) 38%, var(--color-hairline));
  border-radius: 1.65rem;
  background: linear-gradient(145deg, var(--color-brand), var(--color-brand-deep));
  color: var(--color-on-brand);
  font-family: var(--font-display);
  font-size: 2.45rem;
  font-weight: 700;
  box-shadow: 0 18px 38px color-mix(in srgb, var(--color-brand) 28%, transparent);
}

.home-learning-chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.3rem;
  min-height: 2.4rem;
  padding: 0.42rem 0.75rem;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-surface) 91%, var(--color-brand-soft) 9%);
  color: var(--color-ink);
  font-weight: 750;
  box-shadow: 0 9px 26px color-mix(in srgb, var(--color-ink) 10%, transparent);
  animation: home-chip-float 5s ease-in-out infinite;
}

.chip-sql { top: 7%; left: 35%; animation-delay: -1.2s; }
.chip-web { top: 29%; right: 2%; animation-delay: -2.4s; }
.chip-js { bottom: 16%; right: 12%; animation-delay: -3.1s; }
.chip-en { bottom: 5%; left: 34%; animation-delay: -0.7s; }
.chip-zh { bottom: 25%; left: 0; animation-delay: -1.9s; }
.chip-ja { top: 24%; left: 3%; animation-delay: -3.8s; }

.domains-section,
.featured-section {
  max-width: 72rem;
  padding-left: clamp(0.75rem, 2vw, 1.5rem);
  padding-right: clamp(0.75rem, 2vw, 1.5rem);
}

.home-section-head {
  margin-bottom: var(--space-4);
}

.home-section-head .catalog-heading {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 4vw, 2.1rem);
  letter-spacing: -0.035em;
}

.domain-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
}

.domain-card,
.home-track-card {
  position: relative;
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.domain-card::after {
  content: '';
  position: absolute;
  inset: auto -3rem -5rem auto;
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-brand) 10%, transparent);
  pointer-events: none;
}

.domain-card--languages::after {
  background: color-mix(in srgb, var(--color-pastel-purple) 45%, transparent);
}

.domain-card:hover,
.domain-card:focus-within,
.home-track-card:hover,
.home-track-card:focus-within {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--color-brand) 35%, var(--color-hairline));
  box-shadow: 0 16px 38px color-mix(in srgb, var(--color-ink) 10%, transparent);
}

.domain-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.domain-card-top .track-meta {
  margin: 0;
  text-align: right;
}

.domain-mark {
  display: inline-grid;
  place-items: center;
  min-width: 2.65rem;
  height: 2.65rem;
  padding: 0 0.55rem;
  border-radius: 0.8rem;
  background: var(--color-brand-soft);
  color: var(--color-brand-deep);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 800;
}

.domain-card--languages .domain-mark {
  background: var(--color-pastel-purple);
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1rem;
}

.domain-card .card-title {
  margin: var(--space-5) 0 var(--space-4);
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  letter-spacing: -0.035em;
}

.domain-tags {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.domain-tags span {
  padding: 0.34rem 0.58rem;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  color: var(--color-ink-muted);
  font-size: 0.8rem;
  font-weight: 650;
}

.domain-card .card-actions {
  position: relative;
  z-index: 1;
  margin-top: var(--space-5);
}

.home-featured-grid {
  max-width: none;
  padding-top: 0;
}

.home-track-card .card-title {
  margin-bottom: var(--space-5);
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: -0.025em;
}

.home-track-progress {
  height: 0.38rem;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--color-surface-soft);
}

.home-track-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--color-brand);
  transition: width 260ms ease;
}

.home-track-progress-copy {
  margin: var(--space-2) 0 0;
  font-size: 0.8rem;
}

.home-page :deep(.btn) {
  transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease, border-color 150ms ease;
}

.home-page :deep(.btn:hover) {
  transform: translateY(-1px);
}

@keyframes home-chip-float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-7px) rotate(1deg); }
}

@media (min-width: 760px) {
  .home-hero {
    grid-template-columns: minmax(0, 1.08fr) minmax(18rem, 0.92fr);
  }

  .domain-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 759px) {
  .home-learning-map {
    width: min(19rem, 88vw);
  }

  .home-hero {
    padding-bottom: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-learning-chip {
    animation: none;
  }

  .domain-card,
  .home-track-card,
  .home-track-progress span,
  .home-page :deep(.btn) {
    transition: none;
  }

  .domain-card:hover,
  .domain-card:focus-within,
  .home-track-card:hover,
  .home-track-card:focus-within,
  .home-page :deep(.btn:hover) {
    transform: none;
  }
}
</style>
