<template>
  <nav class="unit-path" :aria-label="t('lesson.unitPath')">
    <section v-for="unit in units" :key="unit.id" class="unit-path-group">
      <header class="unit-path-head">
        <h2 class="unit-path-heading">{{ unit.title }}</h2>
        <p v-if="unit.canDo" class="unit-path-can-do">{{ unit.canDo }}</p>
      </header>

      <ol class="unit-path-list">
        <li
          v-for="node in unit.nodes"
          :key="node.id"
          class="unit-path-item"
          :class="{
            'is-done': node.state === 'done',
            'is-current': node.state === 'current',
            'is-locked': node.state === 'locked',
            'is-checkpoint': node.role === 'checkpoint',
            'is-review': node.role === 'review',
          }"
        >
          <NuxtLink
            v-if="node.clickable"
            class="unit-path-node"
            :to="localePath(`/tracks/${trackId}/lessons/${node.slug}`)"
          >
            <span class="unit-path-dot" aria-hidden="true">
              <span v-if="node.state === 'done'">✓</span>
              <span v-else-if="node.role === 'checkpoint'">◆</span>
              <span v-else-if="node.role === 'review'">↻</span>
              <span v-else>{{ node.sortOrder }}</span>
            </span>
            <span class="unit-path-copy">
              <span class="unit-path-title">{{ node.title }}</span>
              <span v-if="node.state === 'current'" class="unit-path-meta">
                {{ t('lesson.unitUpNext') }}
              </span>
            </span>
            <span class="unit-path-action" aria-hidden="true">→</span>
          </NuxtLink>

          <div
            v-else
            class="unit-path-node is-static"
            :aria-disabled="true"
            :aria-label="`${node.title}. ${t('lesson.unitLocked')}`"
          >
            <span class="unit-path-dot" aria-hidden="true">
              <span v-if="node.role === 'checkpoint'">◆</span>
              <span v-else-if="node.role === 'review'">↻</span>
              <span v-else>{{ node.sortOrder }}</span>
            </span>
            <span class="unit-path-copy">
              <span class="unit-path-title">{{ node.title }}</span>
            </span>
            <span class="unit-path-lock" aria-hidden="true">·</span>
          </div>
        </li>
      </ol>
    </section>
  </nav>
</template>

<script setup lang="ts">
import type { Progress } from '~/types/api'
import {
  buildLanguageUnits,
  type LanguageUnitLesson,
} from '~/utils/languageUnits'

const props = defineProps<{
  trackId: string
  lessons: LanguageUnitLesson[]
  progress: Progress[]
  locale: string
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const units = computed(() =>
  buildLanguageUnits(props.lessons, props.progress, props.locale),
)
</script>

<style scoped>
.unit-path {
  display: grid;
  gap: var(--space-4);
  width: min(100%, 42rem);
  margin: var(--space-5) 0 var(--space-2);
}

.unit-path-group {
  min-width: 0;
  padding: var(--space-4);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--color-surface) 96%, var(--color-brand-soft) 4%);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--color-ink) 4%, transparent);
}

.unit-path-head {
  display: grid;
  gap: 0.28rem;
  margin-bottom: var(--space-3);
  padding: 0 var(--space-1);
}

.unit-path-heading {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.08rem;
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.unit-path-can-do {
  margin: 0;
  max-width: 34rem;
  color: var(--color-ink-muted);
  font-size: 0.86rem;
  line-height: 1.45;
}

.unit-path-list {
  position: relative;
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.unit-path-item {
  position: relative;
  padding: 0.22rem 0;
}

.unit-path-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 1.34rem;
  top: 2.7rem;
  bottom: -0.22rem;
  width: 2px;
  background: color-mix(in srgb, var(--color-hairline) 82%, transparent);
}

.unit-path-item.is-done:not(:last-child)::before,
.unit-path-item.is-current:not(:last-child)::before {
  background: color-mix(in srgb, var(--color-brand) 48%, var(--color-hairline));
}

.unit-path-node {
  display: grid;
  grid-template-columns: 2.7rem minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-3);
  min-height: 3.35rem;
  padding: 0.34rem 0.5rem 0.34rem 0;
  border-radius: var(--radius-md);
  color: inherit;
  text-decoration: none;
  transition: background 150ms ease, transform 150ms ease;
}

.unit-path-node:not(.is-static):hover,
.unit-path-node:not(.is-static):focus-visible {
  background: color-mix(in srgb, var(--color-brand-soft) 58%, transparent);
  text-decoration: none;
  transform: translateX(2px);
}

.unit-path-node.is-static {
  opacity: 0.48;
  cursor: not-allowed;
}

.unit-path-dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 2.7rem;
  height: 2.7rem;
  border: 2px solid var(--color-hairline);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-ink-muted);
  font-size: 0.88rem;
  font-weight: 800;
}

.is-checkpoint .unit-path-dot {
  border-radius: 0.78rem;
}

.is-review .unit-path-dot {
  border-style: dashed;
}

.is-done .unit-path-dot {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: var(--color-on-brand);
}

.is-current .unit-path-dot {
  border-color: var(--color-brand);
  color: var(--color-brand-deep);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand) 18%, transparent);
}

.unit-path-copy {
  display: grid;
  gap: 0.12rem;
  min-width: 0;
}

.unit-path-title {
  overflow-wrap: anywhere;
  font-weight: 650;
  line-height: 1.35;
}

.unit-path-meta {
  color: var(--color-brand-deep);
  font-size: 0.78rem;
  font-weight: 700;
}

.unit-path-action,
.unit-path-lock {
  color: var(--color-ink-faint);
  font-size: 1rem;
  transition: transform 150ms ease, color 150ms ease;
}

.unit-path-node:not(.is-static):hover .unit-path-action,
.unit-path-node:not(.is-static):focus-visible .unit-path-action {
  color: var(--color-brand-deep);
  transform: translateX(2px);
}

@media (max-width: 520px) {
  .unit-path-group {
    padding: var(--space-3);
  }

  .unit-path-node {
    grid-template-columns: 2.5rem minmax(0, 1fr) auto;
    gap: var(--space-2);
  }

  .unit-path-dot {
    width: 2.5rem;
    height: 2.5rem;
  }

  .unit-path-item:not(:last-child)::before {
    left: 1.24rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .unit-path-node,
  .unit-path-action,
  .unit-path-lock {
    transition: none;
  }

  .unit-path-node:not(.is-static):hover,
  .unit-path-node:not(.is-static):focus-visible,
  .unit-path-node:not(.is-static):hover .unit-path-action,
  .unit-path-node:not(.is-static):focus-visible .unit-path-action {
    transform: none;
  }
}
</style>
