<template>
  <div class="hub-page learn-scroll">
    <SkeletonHub v-if="loading" :cards="4" card-height="5.5rem" />

    <template v-else-if="!auth.user">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.notes')"
        :title="t('notes.title')"
        :lead="t('notes.guestBody')"
      >
        <template #actions>
          <NuxtLink class="btn btn-primary" :to="loginPath">{{ t('nav.login') }}</NuxtLink>
          <NuxtLink class="btn btn-ghost" :to="registerPath">{{ t('nav.register') }}</NuxtLink>
          <NuxtLink class="btn btn-ghost" :to="localePath('/tracks')">
            {{ t('notes.guestBrowse') }}
          </NuxtLink>
        </template>
      </HubHeader>
    </template>

    <template v-else-if="loadError">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader :eyebrow="t('nav.notes')" :title="t('notes.title')" :lead="t('hub.loadError')" />
      <p class="muted">{{ loadError }}</p>
      <button class="btn btn-primary" type="button" @click="load">{{ t('hub.retry') }}</button>
    </template>

    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.notes')"
        :title="t('notes.title')"
        :lead="t('notes.lead')"
      >
        <template #actions>
          <label class="hub-filter">
            <span class="visually-hidden">{{ t('notes.filter') }}</span>
            <input
              v-model="query"
              type="search"
              :placeholder="t('notes.filterPlaceholder')"
            >
          </label>
        </template>
      </HubHeader>

      <p v-if="!notes.length" class="hub-empty">{{ t('notes.empty') }}</p>
      <p v-else-if="!filtered.length" class="hub-empty">{{ t('notes.noMatch') }}</p>
      <ul v-else class="note-list">
        <li v-for="note in filtered" :key="note.id">
          <NuxtLink
            class="note-card"
            :to="localePath(`/tracks/${note.trackId}/lessons/${note.slug}`)"
          >
            <p class="note-meta">{{ note.title }}</p>
            <p class="note-preview">{{ note.preview || note.body }}</p>
            <p class="note-updated">{{ formatDate(note.updatedAt) }}</p>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { NoteListItem } from '~/types/api'
import { buildHubBreadcrumbs } from '~/utils/breadcrumbs'
import { filterNotes } from '~/utils/catalogSearch'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const auth = useAuthStore()
const api = useApi()
const loading = ref(true)
const loadError = ref('')
const notes = ref<NoteListItem[]>([])
const query = ref('')

const crumbs = computed(() =>
  buildHubBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    pageLabel: t('nav.notes'),
  }),
)

const loginPath = computed(() => ({
  path: localePath('/login'),
  query: { redirect: localePath('/notes') },
}))
const registerPath = computed(() => ({
  path: localePath('/register'),
  query: { redirect: localePath('/notes') },
}))

const filtered = computed(() => filterNotes(notes.value, query.value))

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(locale.value === 'vi' ? 'vi-VN' : 'en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    await auth.fetchMe()
    if (auth.user) {
      notes.value = await api.listAllNotes(locale.value)
    } else {
      notes.value = []
    }
  } catch (e) {
    notes.value = []
    loadError.value = e instanceof Error ? e.message : t('notes.loadError')
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(locale, load)
</script>

<style scoped>
.note-list {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.note-card {
  display: block;
  padding: var(--space-4) var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.note-card:hover {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
  text-decoration: none;
}

.note-meta {
  margin: 0 0 0.35rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-brand-deep);
}

.note-preview {
  margin: 0;
  color: var(--color-ink);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-updated {
  margin: 0.55rem 0 0;
  font-size: 0.8rem;
  color: var(--color-ink-faint);
}
</style>
