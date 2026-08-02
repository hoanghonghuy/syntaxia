<template>
  <nav class="unit-path" :aria-label="t('lesson.unitPath')">
    <ol class="unit-path-list">
      <li
        v-for="node in nodes"
        :key="node.id"
        class="unit-path-item"
        :class="{
          'is-done': node.state === 'done',
          'is-current': node.state === 'current',
          'is-locked': node.state === 'locked',
        }"
      >
        <NuxtLink
          v-if="node.clickable"
          class="unit-path-node"
          :to="localePath(`/tracks/${trackId}/lessons/${node.slug}`)"
        >
          <span class="unit-path-dot" aria-hidden="true">
            <span v-if="node.state === 'done'">✓</span>
            <span v-else>{{ node.sortOrder }}</span>
          </span>
          <span class="unit-path-copy">
            <span class="unit-path-title">{{ node.title }}</span>
            <span v-if="node.state === 'current'" class="unit-path-meta">{{
              t('lesson.unitUpNext')
            }}</span>
          </span>
        </NuxtLink>
        <div v-else class="unit-path-node is-static" :aria-disabled="true">
          <span class="unit-path-dot" aria-hidden="true">{{ node.sortOrder }}</span>
          <span class="unit-path-copy">
            <span class="unit-path-title">{{ node.title }}</span>
            <span class="unit-path-meta">{{ t('lesson.unitLocked') }}</span>
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { LessonSummary, Progress } from '~/types/api'
import { buildLanguageUnitPath } from '~/utils/learningPath'

const props = defineProps<{
  trackId: string
  lessons: LessonSummary[]
  progress: Progress[]
  locale: string
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const nodes = computed(() =>
  buildLanguageUnitPath(props.lessons, props.progress, props.locale),
)
</script>

<style scoped>
.unit-path {
  margin: 1.25rem 0 0.5rem;
  max-width: 28rem;
}
.unit-path-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  position: relative;
}
.unit-path-item {
  position: relative;
  padding: 0.35rem 0 0.35rem 0;
}
.unit-path-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 1.15rem;
  top: 2.6rem;
  bottom: -0.35rem;
  width: 2px;
  background: color-mix(in srgb, var(--color-border, #c5d0c9) 80%, transparent);
}
.unit-path-item.is-done:not(:last-child)::before,
.unit-path-item.is-current:not(:last-child)::before {
  background: color-mix(in srgb, var(--color-accent, #0d9488) 55%, transparent);
}
.unit-path-node {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;
  border-radius: 10px;
  padding: 0.35rem 0.5rem 0.35rem 0.15rem;
}
.unit-path-node:not(.is-static):hover {
  background: color-mix(in srgb, var(--color-accent, #0d9488) 8%, transparent);
}
.unit-path-node.is-static {
  opacity: 0.55;
  cursor: not-allowed;
}
.unit-path-dot {
  flex: 0 0 2.3rem;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.9rem;
  border: 2px solid var(--color-border, #c5d0c9);
  background: var(--color-surface, #fff);
  z-index: 1;
}
.is-done .unit-path-dot {
  border-color: var(--color-accent, #0d9488);
  background: var(--color-accent, #0d9488);
  color: #fff;
}
.is-current .unit-path-dot {
  border-color: var(--color-accent, #0d9488);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #0d9488) 25%, transparent);
}
.unit-path-copy {
  display: grid;
  gap: 0.15rem;
  padding-top: 0.25rem;
  min-width: 0;
}
.unit-path-title {
  font-weight: 600;
  line-height: 1.3;
}
.unit-path-meta {
  font-size: 0.8rem;
  color: var(--color-muted, #5b6b63);
}
.is-current .unit-path-meta {
  color: var(--color-accent, #0d9488);
  font-weight: 600;
}
</style>
