<template>
  <section class="language-player" :aria-label="t('lesson.languagePath')">
    <header class="language-player-head">
      <div>
        <p class="language-player-kicker">{{ t('lesson.canDo') }}</p>
        <p v-if="canDo" class="language-player-goal">{{ canDo }}</p>
      </div>
      <div v-if="pattern" class="language-player-pattern">
        <span>{{ t('lesson.pattern') }}</span>
        <strong :lang="targetLang">{{ pattern }}</strong>
      </div>
    </header>

    <LanguageLessonSteps
      :lesson="lesson"
      :track-id="trackId"
      @passed="$emit('passed')"
    />
  </section>
</template>

<script setup lang="ts">
import { languageTargetLang } from '~/utils/languageLesson'

const props = defineProps<{
  lesson: { exercise?: Record<string, unknown> | null }
  trackId: string
}>()

defineEmits<{ passed: [] }>()

const { t } = useI18n()
const targetLang = computed(() => languageTargetLang(props.trackId))
const canDo = computed(() => {
  const value = props.lesson.exercise?.canDo
  return typeof value === 'string' ? value : ''
})
const pattern = computed(() => {
  const value = props.lesson.exercise?.pattern
  return typeof value === 'string' ? value : ''
})
</script>

<style scoped>
.language-player {
  width: min(100%, 48rem);
  margin: 1rem auto 0;
  padding: 1.1rem clamp(.9rem, 3vw, 1.5rem) 1.5rem;
  border: 1px solid var(--color-hairline);
  border-radius: 16px;
  background: var(--color-surface);
}
.language-player-head {
  display: grid;
  gap: .85rem;
  margin-bottom: .4rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-hairline);
}
.language-player-kicker {
  margin: 0 0 .3rem;
  color: var(--color-ink-muted);
  font-size: .76rem;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}
.language-player-goal {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 650;
  line-height: 1.5;
}
.language-player-pattern {
  display: grid;
  gap: .2rem;
  padding: .7rem .8rem;
  border-radius: 10px;
  background: var(--color-surface-soft);
  font-size: .9rem;
}
.language-player-pattern span { color: var(--color-ink-muted); font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.language-player-pattern strong { line-height: 1.45; }
@media (min-width: 720px) {
  .language-player-head { grid-template-columns: minmax(0, 1fr) minmax(12rem, .55fr); align-items: start; }
}
</style>
