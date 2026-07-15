<template>
  <header class="hub-header">
    <p v-if="eyebrow" class="hub-eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p v-if="lead" class="hub-lead">{{ lead }}</p>
    <div v-if="$slots.actions" class="hub-actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  lead?: string
}>()
</script>

<style scoped>
.hub-header {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 0.25rem;
}

.hub-eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-brand-deep);
}

.hub-header h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 4vw, 1.95rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hub-lead {
  margin: 0;
  max-width: 36rem;
  color: var(--color-ink-muted);
  line-height: 1.55;
  font-size: 1.02rem;
}

.hub-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.25rem;
}
</style>
