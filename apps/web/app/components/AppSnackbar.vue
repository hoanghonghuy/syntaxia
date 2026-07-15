<template>
  <div class="snackbar-host" aria-live="polite" aria-relevant="additions text">
    <div
      v-for="item in queue"
      :key="item.id"
      class="snackbar"
      :class="`snackbar--${item.tone}`"
      role="status"
    >
      <p class="snackbar-message">{{ item.message }}</p>
      <button
        class="snackbar-dismiss"
        type="button"
        :aria-label="t('snackbar.dismiss')"
        @click="dismiss(item.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { queue, dismiss } = useSnackbar()
</script>

<style scoped>
.snackbar-host {
  position: fixed;
  z-index: 80;
  left: 50%;
  bottom: calc(var(--footer-height, 3.5rem) + 0.75rem + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  width: min(24rem, calc(100vw - 1.5rem));
  pointer-events: none;
}

@media (min-width: 1100px) {
  .snackbar-host {
    bottom: 1.25rem;
  }
}

.snackbar {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.75rem 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-hairline);
  background: var(--color-surface);
  box-shadow: 0 8px 28px color-mix(in srgb, var(--color-ink) 12%, transparent);
  animation: snackbar-in 180ms ease-out;
}

.snackbar--success {
  border-color: color-mix(in srgb, var(--color-success) 45%, var(--color-hairline));
  background: color-mix(in srgb, var(--color-success) 12%, var(--color-surface));
}

.snackbar--error {
  border-color: color-mix(in srgb, var(--color-error) 45%, var(--color-hairline));
  background: color-mix(in srgb, var(--color-error) 10%, var(--color-surface));
}

.snackbar--info {
  border-color: color-mix(in srgb, var(--color-brand) 40%, var(--color-hairline));
  background: color-mix(in srgb, var(--color-brand-soft) 70%, var(--color-surface));
}

.snackbar-message {
  margin: 0;
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.4;
  color: var(--color-ink);
  font-weight: 600;
}

.snackbar-dismiss {
  flex-shrink: 0;
  margin: -0.2rem -0.15rem 0 0;
  border: none;
  background: transparent;
  color: var(--color-ink-muted);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
}

.snackbar-dismiss:hover,
.snackbar-dismiss:focus-visible {
  color: var(--color-ink);
  background: color-mix(in srgb, var(--color-ink) 6%, transparent);
}

@keyframes snackbar-in {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .snackbar {
    animation: none;
  }
}
</style>
