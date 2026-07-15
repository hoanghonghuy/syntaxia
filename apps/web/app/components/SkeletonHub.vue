<template>
  <div class="hub-skeleton" role="status" :aria-label="t('shell.loading')">
    <UiSkeleton width="35%" height="0.75rem" />
    <UiSkeleton width="50%" height="2rem" />
    <UiSkeleton width="70%" height="0.95rem" />
    <div v-if="filters" class="hub-skel-filters">
      <UiSkeleton v-for="n in 3" :key="n" width="5.5rem" height="2rem" radius="6px" />
    </div>
    <div v-if="cards > 0" class="hub-skel-cards">
      <UiSkeleton
        v-for="n in cards"
        :key="n"
        width="100%"
        :height="cardHeight"
        radius="10px"
      />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    filters?: boolean
    cards?: number
    cardHeight?: string
  }>(),
  {
    filters: false,
    cards: 0,
    cardHeight: '6.5rem',
  },
)

const { t } = useI18n()
</script>
