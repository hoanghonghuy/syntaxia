<template>
  <div class="hub-page-wide tracks-page">
    <SkeletonHub v-if="showSkeleton" :filters="true" :cards="6" card-height="9rem" />

    <template v-else-if="catalog.loadError">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader :eyebrow="t('nav.tracks')" :title="t('catalog.tracksTitle')" :lead="t('hub.loadError')" />
      <p class="muted">{{ catalog.loadError }}</p>
      <button class="btn btn-primary" type="button" @click="retryCatalog">{{ t('hub.retry') }}</button>
    </template>

    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t(`domain.${domain === 'all' ? 'it' : domain}`)"
        :title="t('catalog.tracksTitle')"
      />

      <div class="category-filters domain-filters" role="tablist" :aria-label="t('catalog.allDomains')">
        <NuxtLink
          v-for="d in domainTabs"
          :key="d"
          class="category-chip category-chip--domain"
          :class="{ 'is-active': domain === d }"
          role="tab"
          :aria-selected="domain === d"
          :to="localePath({ path: '/tracks', query: { domain: d, page: '1' } })"
        >
          {{ t(`domain.${d}`) }}
        </NuxtLink>
      </div>

      <div
        v-if="domain !== 'all' && categories.length > 1"
        class="category-filters"
        role="tablist"
        :aria-label="t('catalog.allCategories')"
      >
        <NuxtLink
          class="category-chip"
          :class="{ 'is-active': category === 'all' }"
          role="tab"
          :aria-selected="category === 'all'"
          :to="localePath({ path: '/tracks', query: { domain: String(domain), page: '1' } })"
        >
          {{ t('catalog.allCategories') }}
        </NuxtLink>
        <NuxtLink
          v-for="cat in categories"
          :key="cat"
          class="category-chip"
          :class="{ 'is-active': category === cat }"
          role="tab"
          :aria-selected="category === cat"
          :to="localePath({ path: '/tracks', query: { domain: String(domain), category: cat, page: '1' } })"
        >
          {{ t(`catalog.category.${cat}`) }}
        </NuxtLink>
      </div>

      <p v-if="slice.total === 0" class="hub-empty">{{ t('catalog.emptyCategory') }}</p>

      <div v-else class="track-grid track-grid--flush tracks-grid">
        <article v-for="track in slice.items" :key="track.id" class="card catalog-track-card">
          <div class="catalog-track-top">
            <p class="track-meta">
              {{ t(`catalog.category.${track.category || 'sql'}`) }}
              <span aria-hidden="true">·</span>
              {{ t(`catalog.level.${track.level || 'basic'}`) }}
            </p>
            <span class="catalog-track-arrow" aria-hidden="true">↗</span>
          </div>

          <h2 class="card-title">{{ track.title[locale] || track.title.en }}</h2>

          <template v-if="auth.user && lessonsReady">
            <div class="catalog-track-progress" aria-hidden="true">
              <span :style="{ width: `${catalog.progressForTrack(track.id, locale).percent}%` }" />
            </div>
            <p class="muted catalog-track-progress-copy">
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

      <nav
        v-if="slice.totalPages > 1"
        class="catalog-pager"
        :aria-label="t('catalog.pageOf', { page: slice.page, total: slice.totalPages })"
      >
        <NuxtLink
          class="btn btn-ghost"
          :class="{ 'is-disabled': slice.page <= 1 }"
          :aria-disabled="slice.page <= 1"
          :tabindex="slice.page <= 1 ? -1 : undefined"
          :to="pageLink(slice.page - 1)"
        >
          {{ t('catalog.prevPage') }}
        </NuxtLink>
        <span class="catalog-pager-status">
          {{ t('catalog.pageOf', { page: slice.page, total: slice.totalPages }) }}
        </span>
        <NuxtLink
          class="btn btn-ghost"
          :class="{ 'is-disabled': slice.page >= slice.totalPages }"
          :aria-disabled="slice.page >= slice.totalPages"
          :tabindex="slice.page >= slice.totalPages ? -1 : undefined"
          :to="pageLink(slice.page + 1)"
        >
          {{ t('catalog.nextPage') }}
        </NuxtLink>
      </nav>
    </template>
  </div>
</template>

<script setup lang="ts">
import { buildHubBreadcrumbs } from '~/utils/breadcrumbs'
import {
  TRACKS_PAGE_SIZE,
  filterTracksByDomainAndCategory,
  paginateItems,
  parseTracksQuery,
} from '~/utils/catalogBrowse'
import {
  LEARNING_DOMAIN_IDS,
  categoriesInDomain,
  isLearningDomainId,
  readStoredDomain,
  writeStoredDomain,
  type LearningDomainId,
} from '~/utils/learningDomains'
import { reloadOnLocaleChange } from '~/utils/localeReload'
import { shouldShowSkeleton } from '~/utils/softLoading'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const catalog = useCatalogStore()
const auth = useAuthStore()
const loading = ref(true)
const lessonsReady = ref(false)

const showSkeleton = computed(() =>
  shouldShowSkeleton(loading.value, catalog.tracks.length > 0),
)

const crumbs = computed(() =>
  buildHubBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    pageLabel: t('nav.tracks'),
  }),
)

const parsed = computed(() => parseTracksQuery(route.query as Record<string, unknown>))
const domain = computed(() => parsed.value.domain)
const category = computed(() => parsed.value.category)

const domainTabs = LEARNING_DOMAIN_IDS

const categories = computed(() => {
  if (domain.value === 'all') return []
  return categoriesInDomain(catalog.tracks, domain.value as LearningDomainId)
})

const filtered = computed(() =>
  filterTracksByDomainAndCategory(catalog.tracks, domain.value, category.value),
)

const slice = computed(() =>
  paginateItems(filtered.value, parsed.value.page, TRACKS_PAGE_SIZE),
)

function pageLink(page: number) {
  const query: Record<string, string> = {
    page: String(page),
    domain: domain.value === 'all' ? 'it' : String(domain.value),
  }
  if (category.value !== 'all') query.category = category.value
  return localePath({ path: '/tracks', query })
}

watch(
  domain,
  (d) => {
    if (import.meta.client && isLearningDomainId(d)) {
      writeStoredDomain(d, localStorage)
    }
  },
  { immediate: true },
)

watch(
  () => slice.value.page,
  (page) => {
    if (route.params.track) return
    if (page === parsed.value.page) return
    navigateTo(pageLink(page), { replace: true })
  },
)

async function retryCatalog() {
  loading.value = true
  try {
    if (auth.user === null) await auth.fetchMe()
    await catalog.loadCatalogForHome(locale.value)
    if (auth.user) await catalog.loadProgress()
    lessonsReady.value = true
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (import.meta.client && (route.query.domain === undefined || route.query.domain === '')) {
    const stored = readStoredDomain(localStorage)
    if (stored) {
      await navigateTo(
        localePath({
          path: '/tracks',
          query: {
            ...Object.fromEntries(
              Object.entries(route.query).filter(([, v]) => v !== undefined && v !== null),
            ),
            domain: stored,
            page: String(route.query.page || '1'),
          },
        }),
        { replace: true },
      )
    }
  }

  loading.value = true
  try {
    if (auth.user === null) await auth.fetchMe()
    await catalog.loadCatalogForHome(locale.value)
    if (auth.user) await catalog.loadProgress()
    lessonsReady.value = true
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
.tracks-page {
  max-width: 72rem;
}

.domain-filters {
  margin-top: var(--space-4);
}

.tracks-grid {
  max-width: none;
}

.catalog-track-card {
  position: relative;
  min-height: 12rem;
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.catalog-track-card:hover,
.catalog-track-card:focus-within {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-brand) 34%, var(--color-hairline));
  box-shadow: 0 14px 34px color-mix(in srgb, var(--color-ink) 9%, transparent);
}

.catalog-track-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.catalog-track-top .track-meta {
  margin: 0;
}

.catalog-track-arrow {
  color: var(--color-ink-faint);
  font-size: 1.05rem;
  transition: transform 160ms ease, color 160ms ease;
}

.catalog-track-card:hover .catalog-track-arrow,
.catalog-track-card:focus-within .catalog-track-arrow {
  color: var(--color-brand-deep);
  transform: translate(2px, -2px);
}

.catalog-track-card .card-title {
  margin: var(--space-5) 0;
  font-family: var(--font-display);
  font-size: 1.28rem;
  letter-spacing: -0.025em;
}

.catalog-track-progress {
  height: 0.38rem;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--color-surface-soft);
}

.catalog-track-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--color-brand);
  transition: width 240ms ease;
}

.catalog-track-progress-copy {
  margin: var(--space-2) 0 0;
  font-size: 0.8rem;
}

@media (prefers-reduced-motion: reduce) {
  .catalog-track-card,
  .catalog-track-arrow,
  .catalog-track-progress span {
    transition: none;
  }

  .catalog-track-card:hover,
  .catalog-track-card:focus-within,
  .catalog-track-card:hover .catalog-track-arrow,
  .catalog-track-card:focus-within .catalog-track-arrow {
    transform: none;
  }
}
</style>
