<template>
  <div class="skeleton-lesson" role="status" :aria-label="t('shell.loading')">
    <UiSkeleton variant="title" width="70%" height="2rem" />
    <UiSkeleton width="100%" height="0.95rem" />
    <UiSkeleton width="92%" height="0.95rem" />
    <UiSkeleton width="88%" height="0.95rem" />
    <UiSkeleton width="100%" height="8rem" variant="rect" radius="8px" />
    <UiSkeleton width="60%" height="0.95rem" />
    <UiSkeleton width="80%" height="0.95rem" />
    <UiSkeleton width="100%" height="10rem" variant="rect" radius="8px" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.skeleton-lesson {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: var(--space-5) var(--space-4) var(--space-8);
  max-width: 48rem;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 768px) {
  .skeleton-lesson {
    padding: var(--space-6) var(--space-5) var(--space-8);
  }
}
</style>
