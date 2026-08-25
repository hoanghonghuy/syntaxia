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

      <g v-else-if="visualKey === 'shop-counter-request'">
        <rect class="visual-surface" x="34" y="110" width="252" height="28" rx="8" />
        <rect class="visual-surface" x="178" y="64" width="46" height="36" rx="6" />
        <path class="visual-line" d="M184 73h34M184 82h22" />
        <circle class="visual-person-a" cx="88" cy="72" r="17" />
        <path class="visual-person-a" d="M62 126c4-27 13-40 26-40s22 13 26 40z" />
        <circle class="visual-person-b" cx="250" cy="72" r="17" />
        <path class="visual-person-b" d="M224 126c4-27 13-40 26-40s22 13 26 40z" />
        <path class="visual-line visual-arrow" d="M116 91c24 0 37-3 55-12m-9-6 9 6-6 10" />
        <path class="visual-bubble" d="M108 36c0-10 9-18 21-18h26c12 0 21 8 21 18s-9 18-21 18h-15l-9 8 2-9c-14-1-25-7-25-17z" />
        <circle class="visual-dot" cx="132" cy="36" r="3" />
        <circle class="visual-dot" cx="143" cy="36" r="3" />
        <circle class="visual-dot" cx="154" cy="36" r="3" />
      </g>

      <g v-else-if="visualKey === 'home-room'">
        <rect class="visual-surface" x="34" y="115" width="252" height="18" rx="5" />
        <rect class="visual-person-a" x="52" y="76" width="92" height="34" rx="8" />
        <path class="visual-line" d="M52 76v-18h92v52M62 65h72" />
        <rect class="visual-surface" x="175" y="74" width="80" height="12" rx="4" />
        <path class="visual-line" d="M185 86v38M245 86v38" />
        <rect class="visual-bubble" x="192" y="57" width="34" height="17" rx="3" />
        <path class="visual-line" d="M191 112h34v17h-34zM196 112V97h24v15" />
        <circle class="visual-dot" cx="209" cy="65" r="3" />
      </g>

      <g v-else-if="visualKey === 'weekend-plan'">
        <circle class="visual-person-a" cx="78" cy="76" r="17" />
        <path class="visual-person-a" d="M52 132c4-27 13-40 26-40s22 13 26 40z" />
        <circle class="visual-person-b" cx="242" cy="76" r="17" />
        <path class="visual-person-b" d="M216 132c4-27 13-40 26-40s22 13 26 40z" />
        <rect class="visual-surface" x="122" y="34" width="76" height="82" rx="9" />
        <path class="visual-line" d="M136 53h48M136 68h30M136 83h42" />
        <circle class="visual-bubble" cx="160" cy="101" r="10" />
        <path class="visual-line" d="M160 101V95M160 101l5 3" />
        <path class="visual-line visual-arrow" d="M106 86h12m84 0h12" />
        <path class="visual-line" d="M141 144c8-18 18-27 30-27s22 9 30 27M156 144v-13M186 144v-13" />
      </g>

      <g v-else-if="visualKey === 'tech-repair-desk'">
        <rect class="visual-surface" x="76" y="116" width="168" height="18" rx="6" />
        <rect class="visual-surface" x="116" y="45" width="92" height="60" rx="7" />
        <path class="visual-line" d="M128 58h68v34h-68zM144 105h36M152 105v11M172 105v11" />
        <rect class="visual-bubble" x="42" y="68" width="48" height="42" rx="7" />
        <path class="visual-line" d="M50 77h32v24H50zM58 72v-8M74 72v-8M58 110v8M74 110v8M42 84h-8M42 96h-8M90 84h8M90 96h8" />
        <path class="visual-line visual-arrow" d="M96 88h14m-6-6 6 6-6 6" />
        <path class="visual-line" d="M222 66l25 25m-19-31 10-10 9 9-10 10M244 94l9 9-18 18-9-9z" />
      </g>

      <g v-else-if="visualKey === 'qr-code-login'">
        <rect class="visual-surface" x="62" y="28" width="86" height="124" rx="14" />
        <rect class="visual-bubble" x="78" y="50" width="54" height="54" rx="4" />
        <rect class="visual-person-a" x="84" y="56" width="14" height="14" rx="2" />
        <rect class="visual-person-a" x="112" y="56" width="14" height="14" rx="2" />
        <rect class="visual-person-a" x="84" y="84" width="14" height="14" rx="2" />
        <rect class="visual-person-b" x="105" y="77" width="7" height="7" rx="1" />
        <rect class="visual-person-b" x="119" y="84" width="7" height="14" rx="1" />
        <circle class="visual-dot" cx="105" cy="133" r="4" />
        <path class="visual-line visual-arrow" d="M158 90h54m-14-12 14 12-14 12" />
        <path class="visual-line" d="M228 58h36a12 12 0 0 1 12 12v40a12 12 0 0 1-12 12h-36a12 12 0 0 1-12-12V70a12 12 0 0 1 12-12z" />
        <path class="visual-line" d="M229 90l10 10 22-25" />
      </g>

      <g v-else-if="visualKey === 'ai-project-flow'">
        <circle class="visual-person-a" cx="65" cy="90" r="26" />
        <circle class="visual-surface" cx="160" cy="90" r="30" />
        <circle class="visual-person-b" cx="255" cy="90" r="26" />
        <path class="visual-line visual-arrow" d="M94 90h32m-10-9 10 9-10 9M194 90h28m-10-9 10 9-10 9" />
        <path class="visual-line" d="M52 82h26M52 90h26M52 98h26" />
        <path class="visual-line" d="M148 78l24 24M172 78l-24 24" />
        <path class="visual-line" d="M244 78h22v24h-22zM249 73v5M261 73v5M249 102v5M261 102v5" />
      </g>

      <g v-else-if="visualKey === 'model-training-monitor'">
        <rect class="visual-surface" x="48" y="32" width="224" height="112" rx="10" />
        <path class="visual-line" d="M68 120V54M68 120h176" />
        <path class="visual-line visual-arrow" d="M78 110c30-8 49-27 71-43 21-15 48-24 82-28" />
        <path class="visual-line" d="M78 110c28-12 50-27 72-37 20-9 47-7 81 19" />
        <circle class="visual-person-a" cx="231" cy="39" r="5" />
        <circle class="visual-person-b" cx="231" cy="92" r="5" />
        <rect class="visual-surface" x="139" y="144" width="42" height="8" rx="4" />
      </g>

      <g v-else-if="visualKey === 'nlp-context-window'">
        <rect class="visual-surface" x="34" y="70" width="68" height="40" rx="8" />
        <rect class="visual-person-a" x="126" y="62" width="68" height="56" rx="8" />
        <rect class="visual-surface" x="218" y="70" width="68" height="40" rx="8" />
        <path class="visual-line visual-arrow" d="M104 90h18m-8-7 8 7-8 7M198 90h16m-8-7 8 7-8 7" />
        <path class="visual-line" d="M48 84h40M48 96h28M140 78h40M140 90h40M140 102h26M232 84h40M232 96h28" />
        <path class="visual-bubble" d="M108 34c0-11 10-20 23-20h58c13 0 23 9 23 20s-10 20-23 20h-30l-10 9 2-10h-20c-13 0-23-8-23-19z" />
      </g>

      <g v-else-if="visualKey === 'china-tech-hubs'">
        <path class="visual-line" d="M68 132c30-47 59-75 98-89 31 10 58 33 86 73-37 8-72 13-105 16-27 2-53 2-79 0z" />
        <path class="visual-person-a" d="M116 52c0-14 11-25 25-25s25 11 25 25c0 19-25 44-25 44s-25-25-25-44z" />
        <circle class="visual-bubble" cx="141" cy="52" r="8" />
        <path class="visual-person-b" d="M196 98c0-14 11-25 25-25s25 11 25 25c0 19-25 44-25 44s-25-25-25-44z" />
        <circle class="visual-bubble" cx="221" cy="98" r="8" />
        <path class="visual-line visual-arrow" d="M164 66c22 3 35 9 45 20m-5-10 5 10-11 3" />
        <rect class="visual-surface" x="42" y="70" width="54" height="40" rx="5" />
        <path class="visual-line" d="M50 80h38M50 91h38M56 110V98h12v12M75 110V98h12v12" />
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
