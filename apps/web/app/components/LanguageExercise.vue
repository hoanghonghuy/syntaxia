<template>
  <section class="lang-exercise" :aria-label="t('lesson.languageExercise')">
    <p class="lang-exercise-label">{{ t('lesson.languageExercise') }}</p>
    <p class="lang-prompt">{{ exercise.prompt }}</p>

    <div v-if="exercise.type === 'mcq' && exercise.choices?.length" class="lang-choices">
      <button
        v-for="choice in exercise.choices"
        :key="choice"
        type="button"
        class="lang-choice"
        :class="{ 'is-selected': selected === choice }"
        lang="zh-Hans"
        @click="selected = choice"
      >
        {{ choice }}
      </button>
    </div>
    <input
      v-else
      v-model="selected"
      class="lang-fill"
      type="text"
      lang="zh-Hans"
      autocomplete="off"
      :placeholder="t('lesson.languageAnswerPlaceholder')"
      @keydown.enter.prevent="check"
    />

    <div class="lang-actions">
      <button class="btn btn-primary" type="button" :disabled="!selected.trim()" @click="check">
        {{ t('lesson.checkAnswer') }}
      </button>
      <button
        v-if="hints.length && hintIndex < hints.length"
        class="btn btn-ghost"
        type="button"
        @click="hintIndex += 1"
      >
        {{ t('lesson.showHint') }}
      </button>
    </div>

    <ul v-if="hintIndex > 0" class="lang-hints">
      <li v-for="(h, i) in hints.slice(0, hintIndex)" :key="i">{{ h }}</li>
    </ul>

    <p v-if="status === 'pass'" class="lang-feedback is-pass" role="status">{{ t('lesson.passed') }}</p>
    <p v-else-if="status === 'fail'" class="lang-feedback is-fail" role="status">
      {{ t('lesson.languageFailed') }}
    </p>
  </section>
</template>

<script setup lang="ts">
import {
  gradeLanguageExercise,
  type LanguageExercise,
} from '~/utils/languageLesson'

const props = defineProps<{
  exercise: LanguageExercise
}>()

const emit = defineEmits<{
  passed: []
}>()

const { t } = useI18n()
const selected = ref('')
const status = ref<'idle' | 'pass' | 'fail'>('idle')
const hintIndex = ref(0)

const hints = computed(() => props.exercise.hints || [])

watch(
  () => props.exercise.prompt,
  () => {
    selected.value = ''
    status.value = 'idle'
    hintIndex.value = 0
  },
)

function check() {
  const ok = gradeLanguageExercise(props.exercise, selected.value)
  status.value = ok ? 'pass' : 'fail'
  if (ok) emit('passed')
}
</script>

<style scoped>
.lang-exercise {
  margin: 1.75rem 0 1rem;
  padding: 1rem 0 0;
  border-top: 1px solid var(--color-border, rgba(20, 40, 30, 0.12));
}
.lang-exercise-label {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted, #5b6b63);
}
.lang-prompt {
  margin: 0 0 0.85rem;
  font-size: 1.05rem;
}
.lang-choices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}
.lang-choice {
  font: inherit;
  font-size: 1.15rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--color-border, rgba(20, 40, 30, 0.18));
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: inherit;
  cursor: pointer;
}
.lang-choice.is-selected {
  border-color: var(--color-accent, #0d9488);
  box-shadow: inset 0 0 0 1px var(--color-accent, #0d9488);
}
.lang-fill {
  display: block;
  width: 100%;
  max-width: 20rem;
  margin-bottom: 0.85rem;
  padding: 0.55rem 0.7rem;
  font: inherit;
  font-size: 1.15rem;
  border: 1px solid var(--color-border, rgba(20, 40, 30, 0.18));
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: inherit;
}
.lang-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
.lang-hints {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  color: var(--color-muted, #5b6b63);
}
.lang-feedback {
  margin: 0.75rem 0 0;
  font-weight: 600;
}
.lang-feedback.is-pass {
  color: var(--color-accent, #0d9488);
}
.lang-feedback.is-fail {
  color: var(--color-danger, #b45309);
}
</style>
