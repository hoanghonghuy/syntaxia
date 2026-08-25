<template>
  <button
    class="lang-listen"
    type="button"
    :aria-label="t('lesson.listen')"
    :title="t('lesson.listen')"
    @click="onListen"
  >
    {{ t('lesson.listen') }}
  </button>
</template>

<script setup lang="ts">
import { playLanguageAudio, speechLangForTrack } from '~/utils/languageAudio'

const props = defineProps<{
  text: string
  trackId: string
  audioUrl?: string
}>()
const emit = defineEmits<{
  activated: [mode: 'audio' | 'tts' | 'none']
}>()

const { t } = useI18n()

async function onListen() {
  if (!import.meta.client) return
  const mode = await playLanguageAudio(
    props.audioUrl,
    props.text,
    speechLangForTrack(props.trackId),
  )
  // A click also unlocks the transcript when playback is unavailable, so the
  // listening-first interaction never becomes an accessibility dead end.
  emit('activated', mode)
}
</script>

<style scoped>
.lang-listen {
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--color-border, rgba(20, 40, 30, 0.18));
  background: var(--color-surface, #fff);
  color: var(--color-muted, #5b6b63);
  cursor: pointer;
  flex-shrink: 0;
}
.lang-listen:hover {
  border-color: var(--color-accent, #0d9488);
  color: var(--color-accent, #0d9488);
}
.lang-listen:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--color-accent, #0d9488) 35%, transparent);
  outline-offset: 2px;
}
</style>
