<template>
  <div class="hub-page learn-scroll">
    <template v-if="loading">
      <UiSkeleton width="30%" height="0.75rem" />
      <UiSkeleton width="40%" height="2rem" />
      <UiSkeleton width="100%" height="2.75rem" radius="6px" />
      <UiSkeleton width="70%" height="0.95rem" />
    </template>

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
                class="nav-link"
                :to="localePath(`/tracks/${lesson.trackId}/lessons/${lesson.slug}`)"
              >
                {{ lesson.title }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { buildHubBreadcrumbs } from '~/utils/breadcrumbs'
import { filterCatalog, normalizeQuery } from '~/utils/catalogSearch'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const catalog = useCatalogStore()
const loading = ref(true)
const query = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

const crumbs = computed(() =>
  buildHubBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    pageLabel: t('nav.search'),
  }),
)

const normalized = computed(() => normalizeQuery(query.value))

const hits = computed(() =>
  filterCatalog(catalog.tracks, catalog.lessonsByTrack, locale.value, query.value),
)

const hasHits = computed(() => hits.value.tracks.length > 0 || hits.value.lessons.length > 0)

async function retryLoad() {
  loading.value = true
  try {
    await catalog.loadCatalogForHome(locale.value)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await catalog.loadCatalogForHome(locale.value)
  } finally {
    loading.value = false
  }
  await nextTick()
  inputEl.value?.focus()
})

watch(locale, async (loc) => {
  loading.value = true
  try {
    await catalog.loadCatalogForHome(loc)
  } finally {
    loading.value = false
  }
})
</script>
