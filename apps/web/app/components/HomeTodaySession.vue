<template>
  <section class="today-card" :aria-labelledby="todayTitleId">
    <div class="today-glow" aria-hidden="true" />

    <header class="today-header">
      <div>
        <p class="today-kicker">{{ copy.kicker }}</p>
        <h2 :id="todayTitleId">{{ copy.title }}</h2>
        <p v-if="trackTitle" class="today-track">{{ trackTitle }}</p>
      </div>
      <span v-if="session" class="today-time">
        {{ copy.about }} {{ session.estimatedMinutes || session.targetMinutes }} {{ copy.minutes }}
      </span>
    </header>

    <div v-if="loading" class="today-state" role="status" aria-live="polite">
      <span class="today-spinner" aria-hidden="true" />
      <span>{{ copy.loading }}</span>
    </div>

    <div v-else-if="loadError" class="today-state today-state--error" role="alert">
      <p>{{ copy.error }}</p>
      <button class="btn btn-ghost" type="button" @click="loadSession">
        {{ copy.retry }}
      </button>
    </div>

    <template v-else-if="session">
      <div class="today-summary" aria-label="Today's learning summary">
        <span v-if="session.dueReviewCount > 0">
          <strong>{{ session.dueReviewCount }}</strong> {{ copy.due }}
        </span>
        <span v-if="session.weakSkillCount > 0">
          <strong>{{ session.weakSkillCount }}</strong> {{ copy.weak }}
        </span>
        <span v-if="hasNewLesson">{{ copy.newLesson }}</span>
      </div>

      <ol v-if="session.items.length > 0" class="today-list">
        <li v-for="(item, index) in session.items" :key="`${item.type}-${index}-${item.skillId || item.lesson?.lessonId || ''}`">
          <NuxtLink class="today-item" :to="itemLink(item)">
            <span class="today-step" aria-hidden="true">{{ index + 1 }}</span>
            <span class="today-item-copy">
              <strong>{{ itemTitle(item) }}</strong>
              <small>{{ itemDetail(item) }}</small>
            </span>
            <span class="today-duration">{{ item.estimatedMinutes }} {{ copy.min }}</span>
          </NuxtLink>
        </li>
      </ol>

      <div v-else class="today-empty">
        <p>{{ copy.caughtUp }}</p>
        <NuxtLink class="btn btn-ghost" :to="trackLink">{{ copy.openTrack }}</NuxtLink>
      </div>

      <div v-if="firstAction" class="today-actions">
        <NuxtLink class="btn btn-primary" :to="itemLink(firstAction)">
          {{ copy.start }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
        <NuxtLink class="btn btn-ghost" :to="trackLink">{{ copy.openTrack }}</NuxtLink>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { DailyLearningItem, DailyLearningSession } from '~/types/api'

const props = defineProps<{ trackId: string }>()

const { locale } = useI18n()
const localePath = useLocalePath()
const catalog = useCatalogStore()
const api = useApi()
const session = ref<DailyLearningSession | null>(null)
const loading = ref(false)
const loadError = ref(false)
const todayTitleId = `today-${Math.random().toString(36).slice(2)}`

const copy = computed(() => locale.value === 'vi'
  ? {
      kicker: 'Kế hoạch thích ứng', title: 'Hôm nay', about: 'Khoảng', minutes: 'phút', min: 'phút',
      loading: 'Đang xây kế hoạch học hôm nay…', error: 'Chưa thể tải kế hoạch hôm nay.', retry: 'Thử lại',
      due: 'bài ôn đến hạn', weak: 'kỹ năng cần củng cố', newLesson: 'Có bài mới', review: 'Ôn tập đến hạn',
      reviewDetail: (n: number) => `${n} mục ôn tập đã đến lịch`, repair: 'Củng cố điểm yếu',
      focus: 'Trọng tâm', lesson: 'Học bài tiếp theo', caughtUp: 'Bạn đã hoàn tất các việc ưu tiên của lộ trình này.',
      start: 'Bắt đầu phiên học', openTrack: 'Mở lộ trình',
    }
  : {
      kicker: 'Adaptive plan', title: 'Today', about: 'About', minutes: 'min', min: 'min',
      loading: 'Building today’s learning plan…', error: 'Could not load today’s plan.', retry: 'Try again',
      due: 'reviews due', weak: 'skills to repair', newLesson: 'New lesson ready', review: 'Review due work',
      reviewDetail: (n: number) => `${n} spaced-review item${n === 1 ? '' : 's'} ready`, repair: 'Repair a weak skill',
      focus: 'Focus', lesson: 'Learn the next lesson', caughtUp: 'You are caught up on the priority work for this track.',
      start: 'Start today’s session', openTrack: 'Open track',
    })

const trackTitle = computed(() => {
  const track = catalog.tracks.find((candidate) => candidate.id === props.trackId)
  return track?.title[locale.value] || track?.title.en || props.trackId
})

const trackLink = computed(() => localePath(`/tracks/${props.trackId}`))
const firstAction = computed(() => session.value?.items[0] || null)
const hasNewLesson = computed(() => session.value?.items.some((item) => item.type === 'lesson') || false)

async function loadSession() {
  if (!props.trackId) return
  loading.value = true
  loadError.value = false
  session.value = null
  try {
    session.value = await api.dailyLearningSession(props.trackId, locale.value, 15)
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
}

function itemLink(item: DailyLearningItem) {
  if (item.type === 'review') return localePath(`/tracks/${props.trackId}/review`)
  if (item.lesson?.slug) return localePath(`/tracks/${props.trackId}/lessons/${item.lesson.slug}`)
  return trackLink.value
}

function skillLabel(skillId?: string) {
  if (!skillId) return ''
  return skillId
    .split('.')
    .slice(1)
    .join(' · ')
    .replaceAll('-', ' ')
}

function itemTitle(item: DailyLearningItem) {
  if (item.type === 'review') return copy.value.review
  if (item.type === 'repair') return copy.value.repair
  return copy.value.lesson
}

function itemDetail(item: DailyLearningItem) {
  if (item.type === 'review') return copy.value.reviewDetail(item.reviewCount || 0)
  if (item.type === 'repair') {
    const focus = skillLabel(item.skillId)
    const lesson = item.lesson?.title || ''
    return [focus ? `${copy.value.focus}: ${focus}` : '', lesson].filter(Boolean).join(' · ')
  }
  return item.lesson?.title || trackTitle.value
}

watch([() => props.trackId, locale], loadSession, { immediate: true })
</script>

<style scoped>
.today-card {
  position: relative;
  isolation: isolate;
  width: min(100%, 28rem);
  justify-self: center;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-brand) 30%, var(--color-hairline));
  border-radius: clamp(1.15rem, 3vw, 1.6rem);
  background: color-mix(in srgb, var(--color-surface) 92%, var(--color-brand-soft) 8%);
  box-shadow: 0 20px 48px color-mix(in srgb, var(--color-ink) 11%, transparent);
}

.today-glow {
  position: absolute;
  z-index: -1;
  width: 13rem;
  height: 13rem;
  right: -5rem;
  top: -6rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-brand) 18%, transparent);
  filter: blur(8px);
}

.today-header,
.today-summary,
.today-actions,
.today-item {
  display: flex;
  align-items: center;
}

.today-header {
  justify-content: space-between;
  gap: var(--space-3);
}

.today-kicker {
  margin: 0 0 0.25rem;
  color: var(--color-brand-deep);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.today-header h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  letter-spacing: -0.04em;
}

.today-track {
  margin: 0.25rem 0 0;
  color: var(--color-ink-muted);
  font-size: 0.9rem;
}

.today-time,
.today-duration {
  flex: 0 0 auto;
  color: var(--color-brand-deep);
  font-size: 0.78rem;
  font-weight: 750;
}

.today-time {
  padding: 0.4rem 0.65rem;
  border-radius: var(--radius-pill);
  background: var(--color-brand-soft);
}

.today-summary {
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: var(--space-4) 0;
}

.today-summary span {
  padding: 0.32rem 0.55rem;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  color: var(--color-ink-muted);
  font-size: 0.76rem;
}

.today-list {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.today-item {
  gap: 0.7rem;
  min-height: 3.6rem;
  padding: 0.62rem 0.7rem;
  border: 1px solid var(--color-hairline);
  border-radius: 0.9rem;
  background: color-mix(in srgb, var(--color-surface) 94%, transparent);
  color: var(--color-ink);
  text-decoration: none;
  transition: transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
}

.today-item:hover,
.today-item:focus-visible {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--color-brand) 42%, var(--color-hairline));
  box-shadow: 0 9px 22px color-mix(in srgb, var(--color-brand) 11%, transparent);
}

.today-item:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--color-brand) 45%, transparent);
  outline-offset: 2px;
}

.today-step {
  display: grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  flex: 0 0 auto;
  border-radius: 0.6rem;
  background: var(--color-brand-soft);
  color: var(--color-brand-deep);
  font-weight: 800;
}

.today-item-copy {
  display: grid;
  gap: 0.12rem;
  min-width: 0;
  flex: 1;
}

.today-item-copy strong {
  font-size: 0.9rem;
}

.today-item-copy small {
  overflow: hidden;
  color: var(--color-ink-muted);
  font-size: 0.76rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.today-actions {
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.today-state,
.today-empty {
  margin-top: var(--space-4);
  padding: var(--space-4);
  border: 1px dashed var(--color-hairline);
  border-radius: 0.9rem;
  color: var(--color-ink-muted);
}

.today-state {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.today-state--error {
  justify-content: space-between;
  color: var(--color-ink);
}

.today-state p,
.today-empty p {
  margin: 0;
}

.today-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--color-hairline);
  border-top-color: var(--color-brand);
  border-radius: 50%;
  animation: today-spin 750ms linear infinite;
}

@keyframes today-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 520px) {
  .today-header {
    align-items: flex-start;
  }

  .today-actions .btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .today-item,
  .today-spinner {
    transition: none;
    animation: none;
  }
}
</style>
