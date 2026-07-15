<template>
  <div class="admin-page">
    <header class="admin-header">
      <div>
        <h1>{{ t('admin.title') }}</h1>
        <p class="muted">{{ t('admin.backend') }}: {{ backendLabel }}</p>
        <p v-if="backend === 'local'" class="muted">{{ t('admin.backendLocalHint') }}</p>
        <p v-else-if="backend === 'google-drive'" class="muted">{{ t('admin.backendDriveHint') }}</p>
      </div>
      <div class="admin-actions">
        <button
          class="btn btn-ghost"
          type="button"
          :disabled="syncing || saving || loading"
          :aria-busy="syncing"
          @click="sync"
        >
          {{ syncButtonLabel }}
        </button>
        <button
          class="btn btn-primary"
          type="button"
          :disabled="syncing || saving || loading"
          @click="startCreate"
        >
          {{ t('admin.newLesson') }}
        </button>
      </div>
    </header>

    <p v-if="!auth.isAdmin" class="card">{{ t('admin.adminOnly') }}</p>

    <template v-else>
      <p
        v-if="banner"
        class="banner"
        :class="banner.tone === 'error' ? 'banner-error' : 'banner-success'"
        role="status"
      >
        {{ banner.text }}
      </p>

      <div class="filters">
        <label>
          {{ t('admin.track') }}
          <select v-model="filterTrack" :disabled="loading">
            <option value="">{{ t('admin.allTracks') }}</option>
            <option v-for="tr in catalog.tracks" :key="tr.id" :value="tr.id">
              {{ tr.title[locale] || tr.title.en || tr.id }}
            </option>
          </select>
        </label>
        <label>
          {{ t('admin.locale') }}
          <select v-model="filterLocale" :disabled="loading">
            <option value="">{{ t('admin.allLocales') }}</option>
            <option value="en">en</option>
            <option value="vi">vi</option>
          </select>
        </label>
      </div>

      <div class="admin-grid">
        <section class="card lesson-list">
          <h2>{{ t('admin.lessons') }}</h2>
          <p v-if="loading" class="empty-hint">{{ t('admin.loadingLessons') }}</p>
          <p v-else-if="lessons.length === 0" class="empty-hint">
            {{ hasActiveFilter ? t('admin.emptyFiltered') : t('admin.emptyLessons') }}
          </p>
          <ul v-else class="nav-list">
            <li v-for="item in lessons" :key="`${item.id}-${item.locale}`">
              <button
                class="nav-link lesson-row"
                type="button"
                :class="{ 'is-active': editing?.id === item.id && editing?.locale === item.locale }"
                :disabled="saving || syncing || editorLoading"
                @click="loadLesson(item)"
              >
                <span>{{ item.sortOrder }}. {{ item.title }}</span>
                <span class="meta">{{ item.trackId }} · {{ item.locale }} · {{ item.published ? t('admin.published') : t('admin.draft') }}</span>
              </button>
            </li>
          </ul>
        </section>

        <section class="card editor" v-if="form || editorLoading">
          <h2>{{ isNew ? t('admin.newLesson') : t('admin.editLesson') }}</h2>
          <p v-if="editorLoading" class="empty-hint">{{ t('admin.loadingLessons') }}</p>
          <form v-else class="form-stack" @submit.prevent="save">
            <div class="form-row">
              <div class="form-field">
                <label>{{ t('admin.id') }}</label>
                <input v-model="form.id" required :disabled="!isNew || saving" />
              </div>
              <div class="form-field">
                <label>{{ t('admin.slug') }}</label>
                <input v-model="form.slug" required :disabled="saving" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label>{{ t('admin.track') }}</label>
                <select v-model="form.trackId" required :disabled="saving">
                  <option v-for="tr in catalog.tracks" :key="tr.id" :value="tr.id">{{ tr.id }}</option>
                </select>
              </div>
              <div class="form-field">
                <label>{{ t('admin.locale') }}</label>
                <select v-model="form.locale" :disabled="saving">
                  <option value="en">en</option>
                  <option value="vi">vi</option>
                </select>
              </div>
              <div class="form-field">
                <label>{{ t('admin.order') }}</label>
                <input v-model.number="form.sortOrder" type="number" min="0" :disabled="saving" />
              </div>
            </div>
            <div class="form-field">
              <label>{{ t('admin.lessonTitle') }}</label>
              <input v-model="form.title" required :disabled="saving" />
            </div>
            <div class="form-field">
              <label>
                <input v-model="form.published" type="checkbox" :disabled="saving" />
                {{ t('admin.published') }}
              </label>
            </div>
            <div class="form-field">
              <label>{{ t('admin.bodyMd') }}</label>
              <textarea v-model="form.bodyMd" class="md-editor" rows="16" spellcheck="false" :disabled="saving" />
            </div>
            <div class="form-field">
              <label>{{ t('admin.exerciseJson') }}</label>
              <textarea v-model="exerciseJson" class="md-editor" rows="6" spellcheck="false" :disabled="saving" />
            </div>
            <div class="form-field">
              <label>{{ t('admin.seedJson') }}</label>
              <textarea v-model="seedJson" class="md-editor" rows="6" spellcheck="false" :disabled="saving" />
            </div>
            <p v-if="error" class="form-error">{{ error }}</p>
            <div class="admin-actions">
              <button class="btn btn-primary" type="submit" :disabled="saving || syncing">
                {{ saving && !deleting ? t('admin.saving') : t('admin.save') }}
              </button>
              <button
                v-if="!isNew"
                class="btn btn-ghost"
                type="button"
                :disabled="saving || syncing"
                @click="remove"
              >
                {{ deleting ? t('admin.deleting') : t('admin.delete') }}
              </button>
            </div>
          </form>
        </section>

        <section v-else class="card editor empty-editor">
          <p class="empty-hint">{{ t('admin.selectLesson') }}</p>
        </section>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Lesson, LessonSummary } from '~/types/api'
import { formatSyncResult } from '~/utils/adminSync'

const { t, locale } = useI18n()
const auth = useAuthStore()
const catalog = useCatalogStore()
const api = useApi()

const backend = ref('')
const lessons = ref<LessonSummary[]>([])
const filterTrack = ref('')
const filterLocale = ref('')
const loading = ref(false)
const syncing = ref(false)
const saving = ref(false)
const deleting = ref(false)
const editorLoading = ref(false)
const banner = ref<{ text: string; tone: 'success' | 'error' } | null>(null)
const error = ref('')
const isNew = ref(false)
const editing = ref<LessonSummary | null>(null)

type FormState = {
  id: string
  slug: string
  trackId: string
  locale: string
  title: string
  sortOrder: number
  published: boolean
  bodyMd: string
  driveFileId?: string
}

const form = ref<FormState | null>(null)
const exerciseJson = ref('{}')
const seedJson = ref('{}')

const isDriveBackend = computed(() => backend.value === 'google-drive')

const hasActiveFilter = computed(() => !!(filterTrack.value || filterLocale.value))

const backendLabel = computed(() => {
  if (!backend.value) return '…'
  return isDriveBackend.value ? 'google-drive' : 'local'
})

const syncButtonLabel = computed(() => {
  if (syncing.value) return t('admin.syncing')
  return isDriveBackend.value ? t('admin.syncDrive') : t('admin.syncLocal')
})

function showBanner(text: string, tone: 'success' | 'error') {
  banner.value = { text, tone }
}

function applySyncResult(input: Parameters<typeof formatSyncResult>[0]) {
  const result = formatSyncResult(input)
  showBanner(t(result.key, result.params), result.tone)
}

async function refresh() {
  loading.value = true
  try {
    backend.value = (await api.adminBackend()).backend
    lessons.value = await api.adminLessons(filterTrack.value, filterLocale.value)
  } finally {
    loading.value = false
  }
}

async function sync() {
  syncing.value = true
  banner.value = null
  try {
    const res = await api.syncContent()
    applySyncResult({ ok: true, synced: res.synced })
    await refresh()
  } catch (e) {
    applySyncResult({ ok: false, errorMessage: (e as Error).message })
  } finally {
    syncing.value = false
  }
}

function startCreate() {
  isNew.value = true
  editing.value = null
  form.value = {
    id: '',
    slug: '',
    trackId: catalog.tracks[0]?.id || 'sql-fundamentals',
    locale: 'en',
    title: '',
    sortOrder: (lessons.value.length || 0) + 1,
    published: false,
    bodyMd: '# New lesson\n\n',
  }
  exerciseJson.value = '{\n  "starter": "SELECT 1;",\n  "expected": { "columns": [], "rows": [] }\n}'
  seedJson.value = '{\n  "ddl": []\n}'
  error.value = ''
}

async function loadLesson(item: LessonSummary) {
  isNew.value = false
  editing.value = item
  error.value = ''
  editorLoading.value = true
  form.value = {
    id: item.id,
    slug: item.slug,
    trackId: item.trackId,
    locale: item.locale,
    title: item.title,
    sortOrder: item.sortOrder,
    published: item.published,
    bodyMd: '',
  }
  try {
    const full = await api.adminLesson(item.id, item.locale)
    form.value = {
      id: full.id,
      slug: full.slug,
      trackId: full.trackId,
      locale: full.locale,
      title: full.title,
      sortOrder: full.sortOrder,
      published: full.published,
      bodyMd: full.bodyMd || '',
      driveFileId: (full as Lesson & { driveFileId?: string }).driveFileId,
    }
    exerciseJson.value = JSON.stringify(full.exercise || {}, null, 2)
    seedJson.value = JSON.stringify(full.sandboxSeed || {}, null, 2)
  } catch (e) {
    error.value = (e as Error).message
    form.value = null
    editing.value = null
  } finally {
    editorLoading.value = false
  }
}

async function save() {
  if (!form.value) return
  saving.value = true
  error.value = ''
  try {
    const exercise = JSON.parse(exerciseJson.value || '{}')
    const sandboxSeed = JSON.parse(seedJson.value || '{}')
    await api.upsertLesson({
      lesson: {
        id: form.value.id,
        slug: form.value.slug,
        trackId: form.value.trackId,
        locale: form.value.locale,
        title: form.value.title,
        sortOrder: form.value.sortOrder,
        published: form.value.published,
        objectives: [],
        bodyHtml: '',
        exercise,
        sandboxSeed,
      },
      bodyMd: form.value.bodyMd,
    })
    showBanner(t('admin.saved'), 'success')
    isNew.value = false
    await refresh()
    editing.value = lessons.value.find((l) => l.id === form.value!.id && l.locale === form.value!.locale) || null
  } catch (e) {
    error.value = (e as Error).message
    showBanner((e as Error).message, 'error')
  } finally {
    saving.value = false
  }
}

async function remove() {
  if (!form.value) return
  const ok = confirm(
    t('admin.confirmDelete', {
      title: form.value.title || form.value.id,
      locale: form.value.locale,
    }),
  )
  if (!ok) return
  saving.value = true
  deleting.value = true
  try {
    await api.deleteLesson(form.value.id, form.value.locale, form.value.driveFileId)
    form.value = null
    editing.value = null
    showBanner(t('admin.deleted'), 'success')
    await refresh()
  } catch (e) {
    error.value = (e as Error).message
    showBanner((e as Error).message, 'error')
  } finally {
    saving.value = false
    deleting.value = false
  }
}

onMounted(async () => {
  await auth.fetchMe()
  await catalog.loadTracks()
  if (auth.isAdmin) {
    await refresh()
  }
})

watch([filterTrack, filterLocale], async () => {
  if (auth.isAdmin) {
    loading.value = true
    try {
      lessons.value = await api.adminLessons(filterTrack.value, filterLocale.value)
    } finally {
      loading.value = false
    }
  }
})
</script>

<style scoped>
.admin-page {
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--space-5) var(--space-4) var(--space-8);
}
.admin-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-4);
  align-items: flex-start;
  margin-bottom: var(--space-5);
}
.admin-header h1 {
  margin: 0;
}
.muted {
  color: var(--color-ink-muted);
  margin: var(--space-2) 0 0;
}
.admin-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.filters {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
.filters label {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-weight: 600;
}
.filters select {
  min-width: 10rem;
  padding: var(--space-2);
}
.admin-grid {
  display: grid;
  gap: var(--space-4);
}
@media (min-width: 900px) {
  .admin-grid {
    grid-template-columns: minmax(16rem, 22rem) 1fr;
  }
}
.lesson-row {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
}
.lesson-row:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.lesson-row .meta {
  display: block;
  font-size: 0.8rem;
  color: var(--color-ink-faint);
  margin-top: 0.15rem;
}
.form-row {
  display: grid;
  gap: var(--space-3);
}
@media (min-width: 640px) {
  .form-row {
    grid-template-columns: repeat(3, 1fr);
  }
}
.md-editor {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.45;
  resize: vertical;
}
.banner {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-4);
}
.banner-success {
  background: var(--color-brand-soft);
  color: var(--color-ink);
}
.banner-error {
  background: color-mix(in srgb, var(--color-error) 14%, transparent);
  color: var(--color-error);
}
.empty-hint {
  color: var(--color-ink-muted);
  margin: 0;
  line-height: 1.5;
}
.empty-editor {
  display: flex;
  align-items: center;
  min-height: 8rem;
}
.form-error {
  color: var(--color-error);
  margin: 0;
}
</style>
