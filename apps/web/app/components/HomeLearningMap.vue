<template>
  <nav class="home-learning-map" :aria-label="t('catalog.tracksTitle')">
    <div class="home-learning-ring home-learning-ring--outer" aria-hidden="true" />
    <div class="home-learning-ring home-learning-ring--inner" aria-hidden="true" />

    <NuxtLink
      class="home-learning-core"
      :to="localePath('/tracks')"
      :aria-label="t('catalog.viewAllTracks')"
    >
      S
    </NuxtLink>

    <span
      v-for="(item, index) in items"
      :key="item.key"
      class="home-learning-chip-slot"
      :style="slotStyle(index, items.length)"
    >
      <NuxtLink
        class="home-learning-chip"
        :to="itemLink(item)"
        :title="itemTitle(item)"
        :aria-label="itemAriaLabel(item)"
      >
        <span>{{ item.label }}</span>
        <span
          v-if="auth.user && itemProgress(item) !== null"
          class="home-learning-chip-progress"
          aria-hidden="true"
        >
          <span :style="{ width: `${itemProgress(item)}%` }" />
        </span>
      </NuxtLink>
    </span>
  </nav>
</template>

<script setup lang="ts">
import type { HomeLearningMapItem } from '~/utils/homeLearningMap'
import { buildHomeLearningMapItems } from '~/utils/homeLearningMap'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const catalog = useCatalogStore()
const auth = useAuthStore()

const items = computed(() => buildHomeLearningMapItems(catalog.tracks))

function itemLink(item: HomeLearningMapItem) {
  if (item.target.kind === 'track') {
    return localePath(`/tracks/${item.target.trackId}`)
  }
  return localePath({
    path: '/tracks',
    query: { domain: item.target.domain, category: item.target.category, page: '1' },
  })
}

function itemProgress(item: HomeLearningMapItem): number | null {
  if (!auth.user) return null
  let done = 0
  let total = 0
  for (const trackId of item.trackIds) {
    const progress = catalog.progressForTrack(trackId, locale.value)
    done += progress.done
    total += progress.total
  }
  return total > 0 ? Math.round((done / total) * 100) : 0
}

function itemTitle(item: HomeLearningMapItem): string {
  if (item.target.kind === 'track') {
    const track = catalog.tracks.find((candidate) => candidate.id === item.target.trackId)
    return track?.title[locale.value] || track?.title.en || item.label
  }
  return t(`catalog.category.${item.target.category}`)
}

function itemAriaLabel(item: HomeLearningMapItem): string {
  const title = itemTitle(item)
  const progress = itemProgress(item)
  if (progress === null) return title
  return `${title} · ${t('lesson.progressPercent', { percent: progress })}`
}

function slotStyle(index: number, total: number) {
  const count = Math.max(total, 1)
  const angle = -90 + (360 / count) * index
  return {
    '--map-angle': `${angle}deg`,
    '--map-inverse-angle': `${-angle}deg`,
    '--map-delay': `${-(index + 1) * 0.63}s`,
  }
}
</script>

<style scoped>
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
  pointer-events: none;
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
  z-index: 2;
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
  text-decoration: none;
  box-shadow: 0 18px 38px color-mix(in srgb, var(--color-brand) 28%, transparent);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.home-learning-core:hover,
.home-learning-core:focus-visible {
  transform: translate(-50%, -50%) scale(1.06);
  box-shadow: 0 22px 44px color-mix(in srgb, var(--color-brand) 34%, transparent);
}

.home-learning-core:focus-visible,
.home-learning-chip:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--color-brand) 55%, transparent);
  outline-offset: 3px;
}

.home-learning-chip-slot {
  --orbit-radius: clamp(7.2rem, 36%, 9.9rem);
  position: absolute;
  inset: 50% auto auto 50%;
  width: 0;
  height: 0;
  transform: rotate(var(--map-angle)) translateY(calc(0px - var(--orbit-radius))) rotate(var(--map-inverse-angle));
}

.home-learning-chip {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-width: 3.3rem;
  min-height: 2.4rem;
  padding: 0.42rem 0.75rem;
  transform: translate(-50%, -50%);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-surface) 91%, var(--color-brand-soft) 9%);
  color: var(--color-ink);
  font-weight: 750;
  line-height: 1.05;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 9px 26px color-mix(in srgb, var(--color-ink) 10%, transparent);
  transition: border-color 150ms ease, box-shadow 150ms ease, background 150ms ease;
  animation: home-chip-float 5s ease-in-out infinite;
  animation-delay: var(--map-delay);
}

.home-learning-chip:hover,
.home-learning-chip:focus-visible {
  border-color: color-mix(in srgb, var(--color-brand) 42%, var(--color-hairline));
  background: color-mix(in srgb, var(--color-surface) 78%, var(--color-brand-soft) 22%);
  box-shadow: 0 14px 32px color-mix(in srgb, var(--color-brand) 18%, transparent);
}

.home-learning-chip-progress {
  display: block;
  width: 100%;
  height: 2px;
  margin-top: 0.28rem;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-hairline) 76%, transparent);
}

.home-learning-chip-progress > span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--color-brand);
}

@keyframes home-chip-float {
  0%, 100% { margin-top: 0; }
  50% { margin-top: -7px; }
}

@media (max-width: 759px) {
  .home-learning-map {
    width: min(19rem, 88vw);
  }

  .home-learning-chip-slot {
    --orbit-radius: clamp(6.2rem, 35%, 8.2rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-learning-chip {
    animation: none;
    transition: none;
  }

  .home-learning-core {
    transition: none;
  }

  .home-learning-core:hover,
  .home-learning-core:focus-visible {
    transform: translate(-50%, -50%);
  }
}
</style>