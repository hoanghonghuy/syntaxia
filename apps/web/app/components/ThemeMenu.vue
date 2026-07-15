<template>
  <div class="theme-menu" ref="rootEl">
    <button
      class="theme-menu-trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-label="t('theme.open')"
      @click="open = !open"
    >
      <span class="theme-menu-dot" aria-hidden="true" />
    </button>
    <div v-if="open" class="theme-menu-panel" role="dialog" :aria-label="t('theme.title')">
      <ThemePicker compact />
      <NuxtLink class="theme-menu-more" :to="localePath('/account')" @click="open = false">
        {{ t('theme.moreSettings') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)

function onDocClick(e: MouseEvent) {
  if (!open.value || !rootEl.value) return
  if (!rootEl.value.contains(e.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
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

.theme-menu-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--color-brand);
  box-shadow: inset 0 0 0 2px var(--color-surface);
}

.theme-menu-panel {
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  z-index: 40;
  width: min(18rem, calc(100vw - 2rem));
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 28px rgba(15, 20, 25, 0.14);
}

.theme-menu-more {
  display: inline-block;
  margin-top: 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
