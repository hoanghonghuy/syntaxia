<template>
  <nav v-if="items.length" class="app-breadcrumb" :aria-label="t('breadcrumb.label')">
    <ol class="app-breadcrumb-list">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="app-breadcrumb-item">
        <NuxtLink v-if="item.to && index < items.length - 1" class="app-breadcrumb-link" :to="item.to">
          {{ item.label }}
        </NuxtLink>
        <span
          v-else-if="index === items.length - 1"
          class="app-breadcrumb-current"
          aria-current="page"
        >
          {{ item.label }}
        </span>
        <NuxtLink v-else-if="item.to" class="app-breadcrumb-link" :to="item.to">
          {{ item.label }}
        </NuxtLink>
        <span v-else class="app-breadcrumb-current">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/utils/breadcrumbs'
import { normalizeBreadcrumbs } from '~/utils/breadcrumbs'

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const { t } = useI18n()

const items = computed(() => normalizeBreadcrumbs(props.items))
</script>

<style scoped>
.app-breadcrumb {
  margin: 0 0 0.85rem;
}

.app-breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.15rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-ink-muted);
}

.app-breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
}

.app-breadcrumb-item:not(:last-child)::after {
  content: '/';
  color: var(--color-ink-faint);
  font-weight: 500;
  speak: never;
}

.app-breadcrumb-link {
  color: var(--color-brand-deep);
  text-decoration: none;
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-breadcrumb-link:hover,
.app-breadcrumb-link:focus-visible {
  text-decoration: underline;
}

.app-breadcrumb-current {
  color: var(--color-ink);
  max-width: 14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
