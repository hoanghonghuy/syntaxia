<template>
  <div class="theme-picker" :class="{ 'theme-picker--compact': compact }">
    <div class="theme-block">
      <p class="theme-label">{{ t('theme.appearance') }}</p>
      <div class="theme-mode-row" role="group" :aria-label="t('theme.appearance')">
        <button
          v-for="opt in modes"
          :key="opt"
          type="button"
          class="theme-mode-btn"
          :class="{ 'is-active': mode === opt }"
          :aria-pressed="mode === opt"
          @click="setMode(opt)"
        >
          {{ t(`theme.mode.${opt}`) }}
        </button>
      </div>
    </div>

    <div class="theme-block">
      <p class="theme-label">{{ t('theme.accentTitle') }}</p>
      <div class="theme-swatches" role="list">
        <button
          v-for="preset in ACCENT_PRESETS"
          :key="preset.id"
          type="button"
          class="theme-swatch"
          role="listitem"
          :class="{ 'is-active': accent === preset.hex }"
          :style="{ '--swatch': preset.hex }"
          :aria-label="t(preset.labelKey)"
          :aria-pressed="accent === preset.hex"
          @click="setAccent(preset.hex)"
        />
        <label class="theme-swatch theme-swatch-custom" :aria-label="t('theme.customAccent')">
          <input
            type="color"
            :value="accent"
            @input="onCustomColor"
          >
        </label>
      </div>
      <div v-if="!compact" class="theme-hex-row">
        <label class="theme-hex-field">
          <span class="visually-hidden">{{ t('theme.hex') }}</span>
          <input
            v-model="hexInput"
            type="text"
            maxlength="7"
            spellcheck="false"
            :placeholder="DEFAULT_ACCENT"
            @change="onHexCommit"
            @keydown.enter.prevent="onHexCommit"
          >
        </label>
        <button class="btn btn-ghost" type="button" @click="onHexCommit">
          {{ t('theme.apply') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ACCENT_PRESETS,
  DEFAULT_ACCENT,
  type AppearanceMode,
} from '~/utils/themeAccent'

withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  { compact: false },
)

const { t } = useI18n()
const { mode, accent, setMode, setAccent } = useTheme()

const modes: AppearanceMode[] = ['system', 'light', 'dark']
const hexInput = ref(accent.value)

watch(accent, (v) => {
  hexInput.value = v
})

function onCustomColor(e: Event) {
  const el = e.target as HTMLInputElement
  setAccent(el.value)
}

function onHexCommit() {
  if (!setAccent(hexInput.value)) {
    hexInput.value = accent.value
  }
}
</script>

<style scoped>
.theme-picker {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.theme-block {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.theme-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.theme-mode-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.theme-mode-btn {
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-ink-muted);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
}

.theme-mode-btn.is-active,
.theme-mode-btn:hover {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
  color: var(--color-brand-deep);
}

.theme-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.theme-swatch {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 999px;
  border: 2px solid var(--color-hairline);
  background: var(--swatch, var(--color-brand));
  cursor: pointer;
  padding: 0;
}

.theme-swatch.is-active {
  outline: 2px solid var(--color-brand-deep);
  outline-offset: 2px;
  border-color: var(--color-surface);
}

.theme-swatch-custom {
  position: relative;
  overflow: hidden;
  background:
    conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
}

.theme-swatch-custom input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
}

.theme-hex-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.theme-hex-field {
  flex: 1;
  min-width: 8rem;
}

.theme-hex-field input {
  width: 100%;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.theme-picker--compact .theme-hex-row {
  display: none;
}
</style>
