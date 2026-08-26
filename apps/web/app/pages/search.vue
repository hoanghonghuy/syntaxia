<template>
  <div class="hub-page learn-scroll">
    <SkeletonHub v-if="showSkeleton">
      <UiSkeleton width="100%" height="2.75rem" radius="6px" />
      <UiSkeleton width="70%" height="0.95rem" />
    </SkeletonHub>

    <template v-else-if="catalog.loadError">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader :eyebrow="t('nav.search')" :title="t('search.title')" :lead="t('hub.loadError')" />
      <p class="muted">{{ catalog.loadError }}</p>
      <button class="btn btn-primary" type="button" @click="retryLoad">{{ t('hub.retry') }}</button>
    </template>

    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.search')"
        :title="t('search.title')"
        :lead="t('search.lead')"
      >
        <template #actions>
          <label class="hub-filter">
            <span class="visually-hidden">{{ t('shell.searchPlaceholder') }}</span>
            <input
              ref="inputEl"
              v-model="query"
              type="search"
              :placeholder="t('shell.searchPlaceholder')"
              autocomplete="off"
            >
          </label>
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
          :to="localePath({ path: '/search', query: { domain: d } })"
        >
          {{ t(`domain.${d}`) }}
        </NuxtLink>
      </div>

      <p v-if="!normalized" class="hub-hint">{{ t('search.hint') }}</p>

      <template v-else>
        <p v-if="!hasHits" class="hub-empty">{{ t('search.noMatch') }}</p>

        <section v-if="hits.tracks.length" class="hub-section">
          <h2>{{ t('nav.tracks') }}</h2>
          <ul class="nav-list">
            <li v-for="tr in hits.tracks" :key="tr.id">
              <NuxtLink class="nav-link" :to="localePath(`/tracks/${tr.id}`)">
                {{ tr.title[locale] || tr.title.en || tr.id }}
              </NuxtLink>
            </li>
          </ul>
        </section>

        <section v-if="hits.lessons.length" class="hub-section">
          <h2>{{ t('nav.lessons') }}</h2>
          <ul class="nav-list">
            <li v-for="lesson in hits.lessons" :key="lesson.id">
              <NuxtLink
                v-if="lessonClickable(lesson)"
                class="nav-link"
                :to="localePath(`/tracks/${lesson.trackId}/lessons/${lesson.slug}`)"
              >
                {{ lesson.title }}
              </NuxtLink>
              <div
                v-else
                class="nav-link search-lesson-locked"
                :aria-disabled="true"
                :aria-label="`${lesson.title}. ${t('lesson.unitLocked')}`"
              >
                {{ lesson.title }}
                <span aria-hidden="true">·</span>
              </div>
            </li>
          </ul>
        </section>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LessonSummary } from '~/types/api'
import { buildHubBreadcrumbs } from '~/utils/breadcrumbs'
import { filterCatalog, normalizeQuery } from '~/utils/catalogSearch'
import { isLanguageTrack as trackIsLanguage } from '~/utils/languageLesson'
import {
  LEARNING_DOMAIN_IDS,
  isLearningDomainId,
  parseDomainQuery,
  readStoredDomain,
  writeStoredDomain,
} from '~/utils/learningDomains'
import { buildLanguageUnits } from '~/utils/languageUnits'
import { shouldShowSkeleton } from '~/utils/softLoading'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const catalog = useCatalogStore()
const auth = useAuthStore()
const loading = ref(true)
const query = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

const showSkeleton = computed(() =>
  shouldShowSkeleton(loading.value, catalog.tracks.length > 0),
)

const crumbs = computed(() =>
  buildHubBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    pageLabel: t('nav.search'),
  }),
)

const domainTabs = LEARNING_DOMAIN_IDS
const domain = computed(() => parseDomainQuery(route.query.domain))

const normalized = computed(() => normalizeQuery(query.value))

const hits = computed(() =>
  filterCatalog(
    catalog.tracks,
    catalog.lessonsByTrack,
    locale.value,
    query.value,
    domain.value,
  ),
)

const hasHits = computed(() => hits.value.tracks.length > 0 || hits.value.lessons.length > 0)

const languageNodesByTrack = computed(() => {
  const result = new Map<string, Map<string, boolean>>()
  for (const track of catalog.tracks) {
    if (!trackIsLanguage(track.id, track.category)) continue
    const lessons = catalog.lessonsByTrack[track.id] || []
    const nodes = buildLanguageUnits(
      lessons,
      catalog.progress,
      locale.value,
      { unlockAll: !auth.user },
    ).flatMap((unit) => unit.nodes)
    result.set(track.id, new Map(nodes.map((node) => [node.id, node.clickable])))
  }
  return result
})

function lessonClickable(lesson: LessonSummary): boolean {
  const track = catalog.tracks.find((candidate) => candidate.id === lesson.trackId)
  if (!trackIsLanguage(lesson.trackId, track?.category)) return true
  return languageNodesByTrack.value.get(lesson.trackId)?.get(lesson.id) === true
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

async function loadSearchData(loc: string) {
  if (auth.user === null) await auth.fetchMe()
  await catalog.loadCatalogForHome(loc)
  if (auth.user) await catalog.loadProgress()
}

async function retryLoad() {
  loading.value = true
  try {
    await loadSearchData(locale.value)
  } catch {
    // The catalog store owns the learner-facing error/retry state rendered above.
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (import.meta.client && (route.query.domain === undefined || route.query.domain === '')) {
    const stored = readStoredDomain(localStorage)
    if (stored) {
      await navigateTo(
        localePath({ path: '/search', query: { domain: stored } }),
        { replace: true },
      )
    }
  }

  loading.value = true
  try {
    await loadSearchData(locale.value)
  } catch {
    // Keep search on its in-context catalog error panel instead of escalating a handled request failure.
  } finally {
    loading.value = false
  }
  await nextTick()
  inputEl.value?.focus()
})

watch(locale, async (loc) => {
  loading.value = true
  try {
    await loadSearchData(loc)
  } catch {
    // Locale reload failures use the same local catalog error/retry state.
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.search-lesson-locked {
  opacity: 0.48;
  cursor: not-allowed;
  user-select: none;
}

.search-lesson-locked:hover {
  background: transparent;
  color: var(--color-ink-muted);
}
</style>
