<template>
  <div class="skeleton-sidebar" role="status" :aria-label="t('shell.loading')">
    <UiSkeleton width="55%" height="0.75rem" />
    <UiSkeleton width="75%" height="1.25rem" />
    <UiSkeleton width="40%" height="0.65rem" />
    <UiSkeleton width="45%" height="0.65rem" />
    <UiSkeleton v-for="n in 8" :key="n" :width="n % 2 ? '95%' : '80%'" height="2rem" radius="6px" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.skeleton-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
</style>
