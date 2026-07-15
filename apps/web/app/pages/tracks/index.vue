<template>
  <div class="tracks-catalog">
    <template v-if="loading">
      <UiSkeleton width="35%" height="0.75rem" />
      <UiSkeleton width="50%" height="2rem" />
      <UiSkeleton width="70%" height="0.95rem" />
      <div class="tracks-skel-filters">
        <UiSkeleton v-for="n in 3" :key="n" width="5.5rem" height="2rem" radius="6px" />
      </div>
      <div class="track-grid">
        <UiSkeleton v-for="n in 6" :key="n" width="100%" height="9rem" radius="10px" />
      </div>
    </template>

    <template v-else-if="catalog.loadError">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader :eyebrow="t('nav.tracks')" :title="t('catalog.tracksTitle')" :lead="t('hub.loadError')" />
      <p class="muted">{{ catalog.loadError }}</p>
      <button class="btn btn-primary" type="button" @click="retryCatalog">{{ t('hub.retry') }}</button>
    </template>

    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.tracks')"
        :title="t('catalog.tracksTitle')"
        :lead="t('catalog.tracksLead')"
      />

      <div class="category-filters" role="tablist" :aria-label="t('catalog.allCategories')">
        <NuxtLink
          class="category-chip"
          :class="{ 'is-active': category === 'all' }"
          role="tab"
          :aria-selected="category === 'all'"
          :to="localePath({ path: '/tracks', query: { page: '1' } })"
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
          :to="localePath({ path: '/tracks', query: { category: cat, page: '1' } })"
        >
          {{ t(`catalog.category.${cat}`) }}
        </NuxtLink>
      </div>

      <p v-if="slice.total === 0" class="muted empty-cat">{{ t('catalog.emptyCategory') }}</p>

      <div v-else class="track-grid">
        <article v-for="track in slice.items" :key="track.id" class="card">
          <p class="track-meta">
            {{ t(`catalog.category.${track.category || 'sql'}`) }}
            ·
            {{ t(`catalog.level.${track.level || 'basic'}`) }}
          </p>
          <h2>{{ track.title[locale] || track.title.en }}</h2>
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

      <nav v-if="slice.totalPages > 1" class="pager" :aria-label="t('catalog.pageOf', { page: slice.page, total: slice.totalPages })">
        <NuxtLink
          class="btn btn-ghost"
          :class="{ 'is-disabled': slice.page <= 1 }"
          :aria-disabled="slice.page <= 1"
          :tabindex="slice.page <= 1 ? -1 : undefined"
          :to="pageLink(slice.page - 1)"
        >
          {{ t('catalog.prevPage') }}
        </NuxtLink>
        <span class="pager-status">
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
  filterTracksByCategory,
  paginateItems,
  parseTracksQuery,
} from '~/utils/catalogBrowse'
import { reloadOnLocaleChange } from '~/utils/localeReload'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const catalog = useCatalogStore()
const auth = useAuthStore()
const loading = ref(true)
const lessonsReady = ref(false)

const crumbs = computed(() =>
  buildHubBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    pageLabel: t('nav.tracks'),
  }),
)

const parsed = computed(() => parseTracksQuery(route.query as Record<string, unknown>))
const category = computed(() => parsed.value.category)

const categories = computed(() => {
  const set = new Set<string>()
  for (const tr of catalog.tracks) {
    set.add(tr.category || 'sql')
  }
  return [...set].sort()
})

const filtered = computed(() => filterTracksByCategory(catalog.tracks, category.value))

const slice = computed(() =>
  paginateItems(filtered.value, parsed.value.page, TRACKS_PAGE_SIZE),
)

function pageLink(page: number) {
  const query: Record<string, string> = { page: String(page) }
  if (category.value !== 'all') query.category = category.value
  return localePath({ path: '/tracks', query })
}

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
.tracks-catalog {
  max-width: 56rem;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tracks-skel-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  border: 1px solid var(--color-hairline);
  background: var(--color-surface);
  color: var(--color-ink-muted);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}

.category-chip:hover,
.category-chip:focus-visible {
  border-color: var(--color-brand);
  color: var(--color-brand-deep);
}

.category-chip.is-active {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
  color: var(--color-brand-deep);
}

.track-meta {
  margin: 0 0 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-brand-deep);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.card h2 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
  font-family: var(--font-display);
}

.muted {
  color: var(--color-ink-muted);
  font-size: 0.9rem;
}

.empty-cat {
  margin: 0.5rem 0 0;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pager {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.pager-status {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-ink-muted);
}

.btn.is-disabled {
  pointer-events: none;
  opacity: 0.45;
}

@media (min-width: 768px) {
  .tracks-catalog {
    padding: var(--space-6) var(--space-5) var(--space-8);
  }
}
</style>
