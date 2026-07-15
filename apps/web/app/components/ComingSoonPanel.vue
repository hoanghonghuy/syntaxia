<template>
  <section class="coming-soon-panel learn-scroll" :aria-labelledby="titleId">
    <p v-if="eyebrow" class="coming-soon-eyebrow">{{ eyebrow }}</p>
    <h1 :id="titleId">{{ title }}</h1>
    <p class="coming-soon-body">{{ body }}</p>
    <div v-if="$slots.actions" class="coming-soon-actions">
      <slot name="actions" />
    </div>
    <ul v-if="planned.length" class="coming-soon-planned">
      <li v-for="item in planned" :key="item">{{ item }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    body: string
    eyebrow?: string
    planned?: string[]
  }>(),
  {
    eyebrow: '',
    planned: () => [],
  },
)

const titleId = useId()
</script>

<style scoped>
.coming-soon-panel {
  max-width: 36rem;
  padding: var(--space-6) var(--space-4) var(--space-8);
}

.coming-soon-eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-brand-deep);
}

.coming-soon-panel h1 {
  margin: 0 0 var(--space-3);
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2rem);
}

.coming-soon-body {
  margin: 0;
  color: var(--color-ink-muted);
  line-height: 1.55;
}

.coming-soon-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: var(--space-5);
}

.coming-soon-planned {
  margin: var(--space-5) 0 0;
  padding-left: 1.15rem;
  color: var(--color-ink-muted);
  line-height: 1.55;
}

.coming-soon-planned li + li {
  margin-top: 0.35rem;
}

@media (min-width: 768px) {
  .coming-soon-panel {
    padding: var(--space-6) var(--space-5) var(--space-8);
  }
}
</style>
