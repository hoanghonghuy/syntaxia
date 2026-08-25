<template>
  <nav class="home-learning-map" :aria-label="ariaLabel">
    <div class="home-learning-ring home-learning-ring--outer" aria-hidden="true" />
    <div class="home-learning-ring home-learning-ring--inner" aria-hidden="true" />

    <NuxtLink class="home-learning-core" :to="allTracksTo" :aria-label="allTracksLabel">
      S
    </NuxtLink>

    <NuxtLink
      v-for="item in items"
      :key="item.key"
      class="home-learning-chip"
      :class="`chip-${item.key}`"
      :to="item.to"
      :aria-label="item.ariaLabel"
      :title="item.title"
      :style="{ '--chip-progress': `${item.progressPercent}%` }"
    >
      <span>{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
export type HomeLearningMapLink = {
  key: 'sql' | 'web' | 'js' | 'en' | 'zh' | 'ja'
  label: string
  to: string
  title: string
  ariaLabel: string
  progressPercent: number
}

defineProps<{
  items: HomeLearningMapLink[]
  ariaLabel: string
  allTracksTo: string
  allTracksLabel: string
}>()
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

.home-learning-core,
.home-learning-chip {
  text-decoration: none;
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
  box-shadow: 0 18px 38px color-mix(in srgb, var(--color-brand) 28%, transparent);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.home-learning-chip {
  --chip-progress: 0%;
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.3rem;
  min-height: 2.4rem;
  padding: 0.42rem 0.75rem;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-brand-soft) 68%, var(--color-surface)) 0 var(--chip-progress),
      color-mix(in srgb, var(--color-surface) 91%, var(--color-brand-soft) 9%) var(--chip-progress) 100%
    );
  color: var(--color-ink);
  font-weight: 750;
  box-shadow: 0 9px 26px color-mix(in srgb, var(--color-ink) 10%, transparent);
  animation: home-chip-float 5s ease-in-out infinite;
  transition: border-color 160ms ease, box-shadow 160ms ease, filter 160ms ease;
}

.home-learning-core:hover,
.home-learning-core:focus-visible {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 22px 46px color-mix(in srgb, var(--color-brand) 36%, transparent);
  outline: 3px solid color-mix(in srgb, var(--color-brand) 28%, transparent);
  outline-offset: 3px;
}

.home-learning-chip:hover,
.home-learning-chip:focus-visible {
  border-color: color-mix(in srgb, var(--color-brand) 58%, var(--color-hairline));
  box-shadow: 0 12px 32px color-mix(in srgb, var(--color-brand) 18%, transparent);
  filter: brightness(1.02);
  outline: 3px solid color-mix(in srgb, var(--color-brand) 22%, transparent);
  outline-offset: 2px;
}

.chip-sql { top: 7%; left: 35%; animation-delay: -1.2s; }
.chip-web { top: 29%; right: 2%; animation-delay: -2.4s; }
.chip-js { bottom: 16%; right: 12%; animation-delay: -3.1s; }
.chip-en { bottom: 5%; left: 34%; animation-delay: -0.7s; }
.chip-zh { bottom: 25%; left: 0; animation-delay: -1.9s; }
.chip-ja { top: 24%; left: 3%; animation-delay: -3.8s; }

@keyframes home-chip-float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-7px) rotate(1deg); }
}

@media (max-width: 759px) {
  .home-learning-map {
    width: min(19rem, 88vw);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-learning-chip {
    animation: none;
  }

  .home-learning-core,
  .home-learning-chip {
    transition: none;
  }
}
</style>
