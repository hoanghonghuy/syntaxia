<template>
  <div class="skeleton-home" role="status" :aria-label="t('shell.loading')">
    <div class="skeleton-home-hero">
      <UiSkeleton width="55%" height="2.5rem" />
      <UiSkeleton width="70%" height="1rem" />
      <UiSkeleton width="8rem" height="2.5rem" radius="6px" />
    </div>
    <div class="skeleton-home-grid">
      <div v-for="n in 3" :key="n" class="skeleton-home-card">
        <UiSkeleton width="30%" height="0.7rem" />
        <UiSkeleton width="70%" height="1.25rem" />
        <UiSkeleton width="100%" height="0.9rem" />
        <UiSkeleton width="90%" height="0.9rem" />
        <UiSkeleton width="6rem" height="2.25rem" radius="6px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.skeleton-home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  padding: var(--space-8) var(--space-4);
}

.skeleton-home-grid {
  display: grid;
  gap: var(--space-4);
  padding: 0 var(--space-4) var(--space-6);
  max-width: 56rem;
  margin: 0 auto;
}

.skeleton-home-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
}

@media (min-width: 640px) {
  .skeleton-home-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .skeleton-home-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
