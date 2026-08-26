<template>
  <nav class="learn-sidebar-inner" :aria-label="t('nav.lessons')">
    <SkeletonSidebar v-if="loading" />
    <template v-else>
      <NuxtLink
        class="sidebar-back"
        :to="tracksListPath"
        @click="emit('navigate')"
      >
        ← {{ t('nav.backToTracks') }}
      </NuxtLink>

      <NuxtLink
        v-if="trackId"
        class="sidebar-track"
        :to="localePath(`/tracks/${trackId}`)"
        @click="emit('navigate')"
      >
        {{ trackTitle }}
      </NuxtLink>

      <p v-if="trackMeta" class="sidebar-meta">
        {{ t(`catalog.category.${trackMeta.category}`) }}
        ·
        {{ t(`catalog.level.${trackMeta.level || 'basic'}`) }}
      </p>

      <template v-if="trackId && lessons.length">
        <p class="sidebar-label">{{ t('nav.lessons') }}</p>
        <ul class="nav-list">
          <li v-for="(item, index) in lessons" :key="item.id">
            <NuxtLink
              v-if="lessonClickable(item.id)"
              class="nav-link"
              :class="{
                'is-active': item.slug === lessonSlug,
                'is-next': nextId === item.id,
              }"
              :to="localePath(`/tracks/${trackId}/lessons/${item.slug}`)"
              @click="emit('navigate')"
            >
              <span class="lesson-order">{{ index + 1 }}.</span>
              {{ item.title }}
              <span v-if="catalog.isCompleted(item.id, locale)" class="lesson-done">✓</span>
            </NuxtLink>

            <div
              v-else
              class="nav-link is-locked"
              :class="{ 'is-active': item.slug === lessonSlug }"
              :aria-disabled="true"
              :aria-label="`${item.title}. ${t('lesson.unitLocked')}`"
            >
              <span class="lesson-order">{{ index + 1 }}.</span>
              {{ item.title }}
              <span class="lesson-lock" aria-hidden="true">·</span>
            </div>
          </li>
        </ul>
      </template>
      <p v-else-if="trackId" class="sidebar-empty muted">{{ t('catalog.comingSoon') }}</p>
      <p v-else class="sidebar-empty muted">{{ t('catalog.sidebarPickTrack') }}</p>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { isLanguageTrack as trackIsLanguage } from '~/utils/languageLesson'
import { buildLanguageUnits, orderLanguageLessons } from '~/utils/languageUnits'

const emit = defineEmits<{ navigate: [] }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const catalog = useCatalogStore()

const loading = ref(true)
const trackId = computed(() => (route.params.track as string) || '')
const lessonSlug = computed(() => (route.params.slug as string) || '')

const trackMeta = computed(() => catalog.tracks.find((tr) => tr.id === trackId.value))
const isLanguageTrack = computed(() =>
  trackIsLanguage(trackId.value, trackMeta.value?.category),
)

const trackTitle = computed(() => {
  const track = trackMeta.value
  return track?.title[locale.value] || track?.title.en || trackId.value
})

const tracksListPath = computed(() => {
  const cat = trackMeta.value?.category
  if (cat) {
    const domain = cat === 'languages' ? 'languages' : 'it'
    return localePath({ path: '/tracks', query: { domain, category: cat } })
  }
  return localePath({ path: '/tracks', query: { domain: 'it' } })
})

const rawLessons = computed(() =>
  catalog.lessonsByTrack[trackId.value]
    || (catalog.lessons[0]?.trackId === trackId.value ? catalog.lessons : []),
)

const lessons = computed(() =>
  isLanguageTrack.value
    ? orderLanguageLessons(rawLessons.value)
    : [...rawLessons.value].sort((a, b) => a.sortOrder - b.sortOrder),
)

const languageNodesById = computed(() => {
  if (!isLanguageTrack.value) return new Map<string, { clickable: boolean }>()
  const nodes = buildLanguageUnits(rawLessons.value, catalog.progress, locale.value)
    .flatMap((unit) => unit.nodes)
  return new Map(nodes.map((node) => [node.id, { clickable: node.clickable }]))
})

const nextId = computed(() => catalog.nextForTrack(trackId.value, locale.value)?.id)

function lessonClickable(lessonId: string): boolean {
  if (!isLanguageTrack.value) return true
  return languageNodesById.value.get(lessonId)?.clickable === true
}

function syncLoading() {
  if (!trackId.value) {
    loading.value = false
    return
  }
  loading.value = catalog.tracks.length === 0 && lessons.value.length === 0
}

watch(
  () => [catalog.tracks.length, trackId.value, lessons.value.length] as const,
  () => syncLoading(),
  { immediate: true },
)

onMounted(() => syncLoading())
</script>

<style scoped>
.sidebar-back {
  display: inline-block;
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-ink-muted);
  text-decoration: none;
}

.sidebar-back:hover,
.sidebar-back:focus-visible {
  color: var(--color-brand-deep);
}

.sidebar-track {
  display: block;
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink);
  text-decoration: none;
  line-height: 1.3;
}

.sidebar-track:hover,
.sidebar-track:focus-visible {
  color: var(--color-brand-deep);
}

.sidebar-meta {
  margin: 0 0 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-brand-deep);
}

.sidebar-label {
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.sidebar-empty {
  margin: 0;
  font-size: 0.9rem;
}

.muted {
  color: var(--color-ink-muted);
}

.lesson-order {
  opacity: 0.7;
  margin-right: 0.15rem;
}

.lesson-done,
.lesson-lock {
  margin-left: 0.25rem;
}

.nav-link.is-locked {
  opacity: 0.48;
  cursor: not-allowed;
  user-select: none;
}

.nav-link.is-locked:hover {
  background: transparent;
  color: var(--color-ink-muted);
}

.lesson-lock {
  color: var(--color-ink-faint);
}
</style>
