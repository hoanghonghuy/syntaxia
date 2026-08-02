<template>
  <div class="hub-page-wide">
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
        :lead="t('catalog.tracksLead')"
      />

      <div class="category-filters" role="tablist" :aria-label="t('catalog.allDomains')">
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

      <div v-else class="track-grid track-grid--flush">
        <article v-for="track in slice.items" :key="track.id" class="card">
          <p class="track-meta">
            {{ t(`catalog.category.${track.category || 'sql'}`) }}
            ·
            {{ t(`catalog.level.${track.level || 'basic'}`) }}
          </p>
          <h2 class="card-title">{{ track.title[locale] || track.title.en }}</h2>
          <p>{{ track.description[locale] || track.description.en }}</p>
          <p v-if="auth.user && lessonsReady" class="muted">
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

      <nav v-if="slice.totalPages > 1" class="catalog-pager" :aria-label="t('catalog.pageOf', { page: slice.page, total: slice.totalPages })">
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
    // Only correct out-of-range ?page= on this catalog route — never bounce other navigations.
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
