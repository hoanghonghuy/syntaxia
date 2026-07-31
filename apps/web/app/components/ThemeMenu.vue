<template>
  <div class="theme-menu" ref="rootEl">
    <button
      ref="triggerEl"
      class="theme-menu-trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-label="t('theme.open')"
      @click="toggle"
    >
      <span class="theme-menu-dot" aria-hidden="true" />
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        class="theme-menu-backdrop"
        aria-hidden="true"
        @click="close"
      />
      <div
        v-if="open"
        class="theme-menu-panel"
        role="dialog"
        :aria-label="t('theme.title')"
        :style="panelStyle"
      >
        <ThemePicker compact />
        <NuxtLink class="theme-menu-more" :to="localePath('/account')" @click="close">
          {{ t('theme.moreSettings') }}
        </NuxtLink>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const triggerEl = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

function close() {
  open.value = false
}

function placePanel() {
  const trigger = triggerEl.value
  if (!trigger || typeof window === 'undefined') return
  const rect = trigger.getBoundingClientRect()
  const gutter = 12
  const width = Math.min(18 * 16, window.innerWidth - gutter * 2)
  let left = rect.right - width
  if (left < gutter) left = gutter
  if (left + width > window.innerWidth - gutter) {
    left = Math.max(gutter, window.innerWidth - gutter - width)
  }
  const top = Math.min(
    rect.bottom + 8,
    Math.max(gutter, window.innerHeight - gutter - 120),
  )
  panelStyle.value = {
    top: `${Math.round(top)}px`,
    left: `${Math.round(left)}px`,
    width: `${Math.round(width)}px`,
    maxHeight: `${Math.round(window.innerHeight - top - gutter)}px`,
  }
}

function toggle() {
  open.value = !open.value
  if (open.value) {
    nextTick(placePanel)
  }
}

function onDocKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

function onReposition() {
  if (open.value) placePanel()
}

onMounted(() => {
  document.addEventListener('keydown', onDocKey)
  window.addEventListener('resize', onReposition)
  window.addEventListener('scroll', onReposition, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocKey)
  window.removeEventListener('resize', onReposition)
  window.removeEventListener('scroll', onReposition, true)
})
</script>

<style scoped>
.theme-menu {
  position: relative;
}

.theme-menu-trigger {
  width: 2.35rem;
  height: 2.35rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-hairline);
  background: var(--color-surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}
</style>

<style>
/* Teleported nodes leave scoped attribute — use plain classes */
.theme-menu-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--color-brand);
  box-shadow: inset 0 0 0 2px var(--color-surface);
}

.theme-menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: color-mix(in srgb, var(--color-ink) 18%, transparent);
  animation: theme-menu-fade 0.14s ease;
}

.theme-menu-panel {
  position: fixed;
  z-index: 100;
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 28px rgba(15, 20, 25, 0.18);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  animation: theme-menu-fade 0.14s ease;
}

@keyframes theme-menu-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-menu-backdrop,
  .theme-menu-panel {
    animation: none;
  }
}

.theme-menu-more {
  display: inline-block;
  margin-top: 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}

.theme-menu-more:hover,
.theme-menu-more:focus,
.theme-menu-more:focus-visible {
  text-decoration: none;
}
</style>
