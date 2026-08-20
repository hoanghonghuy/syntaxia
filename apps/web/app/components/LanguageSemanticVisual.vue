<template>
  <div
    v-if="visualKey"
    class="language-semantic-visual"
    :class="`is-${visualKey}`"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : alt || undefined"
    :aria-hidden="decorative ? 'true' : undefined"
  >
    <svg viewBox="0 0 320 180" focusable="false" aria-hidden="true">
      <rect class="visual-bg" x="0" y="0" width="320" height="180" rx="24" />

      <g v-if="visualKey === 'classmates-meeting'">
        <rect class="visual-surface" x="92" y="22" width="136" height="46" rx="8" />
        <path class="visual-line" d="M112 44h36M172 44h36" />
        <circle class="visual-person-a" cx="102" cy="103" r="18" />
        <path class="visual-person-a" d="M72 154c4-25 15-38 30-38s26 13 30 38z" />
        <circle class="visual-person-b" cx="218" cy="103" r="18" />
        <path class="visual-person-b" d="M188 154c4-25 15-38 30-38s26 13 30 38z" />
        <path class="visual-bubble" d="M118 82c0-12 11-21 25-21h18c14 0 25 9 25 21s-11 21-25 21h-13l-10 9 2-10c-13-1-22-9-22-20z" />
        <circle class="visual-dot" cx="143" cy="82" r="3" />
        <circle class="visual-dot" cx="153" cy="82" r="3" />
        <circle class="visual-dot" cx="163" cy="82" r="3" />
      </g>

      <g v-else-if="visualKey === 'student-leaving'">
        <rect class="visual-surface" x="211" y="34" width="62" height="112" rx="5" />
        <path class="visual-line" d="M228 54h28v92h-28z" />
        <circle class="visual-person-a" cx="118" cy="84" r="18" />
        <path class="visual-person-a" d="M92 143c4-28 13-42 26-42s22 14 26 42z" />
        <path class="visual-line visual-arrow" d="M149 108h42m-13-12 13 12-13 12" />
      </g>

      <g v-else-if="visualKey === 'student-studying'">
        <circle class="visual-person-b" cx="160" cy="67" r="18" />
        <path class="visual-person-b" d="M132 126c4-28 14-42 28-42s24 14 28 42z" />
        <rect class="visual-surface" x="72" y="122" width="176" height="18" rx="6" />
        <path class="visual-line" d="M118 111c16-8 28-8 42 0 14-8 26-8 42 0v20c-16-8-28-8-42 0-14-8-26-8-42 0z" />
        <path class="visual-line" d="M160 111v20" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { isLanguageVisualKey, type LanguageVisualKey } from '~/utils/languageVisual'

const props = withDefaults(defineProps<{
  visualKey: string
  alt?: string
  decorative?: boolean
}>(), {
  alt: '',
  decorative: false,
})

const visualKey = computed<LanguageVisualKey | null>(() =>
  isLanguageVisualKey(props.visualKey) ? props.visualKey : null,
)
</script>

<style scoped>
.language-semantic-visual { width: 100%; overflow: hidden; border-radius: 16px; background: color-mix(in srgb, var(--color-surface, #fff) 82%, var(--color-accent, #0d9488) 18%); }
.language-semantic-visual svg { display: block; width: 100%; height: auto; }
.visual-bg { fill: color-mix(in srgb, var(--color-surface, #fff) 88%, var(--color-accent, #0d9488) 12%); }
.visual-surface { fill: color-mix(in srgb, var(--color-surface, #fff) 72%, var(--color-muted, #5b6b63) 28%); }
.visual-person-a { fill: color-mix(in srgb, var(--color-accent, #0d9488) 75%, var(--color-surface, #fff) 25%); }
.visual-person-b { fill: color-mix(in srgb, var(--color-accent, #0d9488) 42%, var(--color-muted, #5b6b63) 58%); }
.visual-bubble { fill: var(--color-surface, #fff); stroke: color-mix(in srgb, var(--color-border, #d9e2dd) 80%, transparent); stroke-width: 2; }
.visual-dot { fill: var(--color-muted, #5b6b63); }
.visual-line { fill: none; stroke: var(--color-muted, #5b6b63); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.visual-arrow { stroke: var(--color-accent, #0d9488); }
</style>
