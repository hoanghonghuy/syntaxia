<template>
  <section class="lang-exercise" :aria-label="t('lesson.languageExercise')">
    <p class="lang-exercise-label">{{ exerciseLabel }}</p>

    <LanguageListenButton
      v-if="exercise.audioText || exercise.audioUrl"
      class="lang-exercise-audio"
      :text="exercise.audioText || exercise.prompt"
      :track-id="resolvedTrackId"
      :audio-url="exercise.audioUrl"
    />

    <p class="lang-prompt">{{ exercise.prompt }}</p>

    <div v-if="isChoiceExercise" class="lang-choices">
      <button
        v-for="choice in exercise.choices || []"
        :key="choice"
        type="button"
        class="lang-choice"
        :class="{ 'is-selected': selected === choice }"
        :lang="targetLang"
        :aria-pressed="selected === choice"
        :disabled="resolved"
        @click="selectChoice(choice)"
      >
        <img
          v-if="mediaFor(choice)?.imageUrl"
          class="lang-choice-image"
          :src="mediaFor(choice)?.imageUrl"
          :alt="mediaFor(choice)?.alt || ''"
        >
        <span>{{ choice }}</span>
      </button>
    </div>

    <div v-else-if="exercise.type === 'order_words'" class="lang-order">
      <div class="lang-order-answer" :aria-label="exercise.prompt">
        <button
          v-for="(token, i) in orderedTokens"
          :key="`${token}-${i}`"
          type="button"
          class="lang-token is-answer"
          :lang="targetLang"
          :disabled="resolved"
          @click="removeOrderedToken(i)"
        >
          {{ token }}
        </button>
      </div>
      <div class="lang-token-bank" :aria-label="exercise.prompt">
        <button
          v-for="(token, i) in availableTokens"
          :key="`${token}-${i}`"
          type="button"
          class="lang-token"
          :lang="targetLang"
          :disabled="resolved"
          @click="addOrderedToken(i)"
        >
          {{ token }}
        </button>
      </div>
    </div>

    <div v-else-if="exercise.type === 'match_pairs'" class="lang-match">
      <p class="muted lang-match-help">{{ exercise.prompt }}</p>
      <div class="lang-match-columns">
        <div class="lang-match-column">
          <button
            v-for="pair in exercise.pairs || []"
            :key="pair.left"
            type="button"
            class="lang-choice"
            :class="{ 'is-selected': selectedLeft === pair.left, 'is-matched': Boolean(matches[pair.left]) }"
            :disabled="resolved"
            @click="selectMatchLeft(pair.left)"
          >
            {{ pair.left }}
          </button>
        </div>
        <div class="lang-match-column">
          <button
            v-for="right in shuffledRights"
            :key="right"
            type="button"
            class="lang-choice"
            :disabled="resolved || matchedRights.has(right) || !selectedLeft"
            @click="matchRight(right)"
          >
            {{ right }}
          </button>
        </div>
      </div>
      <button
        v-if="Object.keys(matches).length && !resolved"
        type="button"
        class="btn btn-ghost lang-reset"
        @click="resetMatches"
      >
        {{ t('lesson.retry') }}
      </button>
    </div>

    <input
      v-else
      v-model="selected"
      class="lang-fill"
      type="text"
      :lang="targetLang"
      autocomplete="off"
      autocapitalize="sentences"
      :disabled="resolved"
      :placeholder="t('lesson.languageAnswerPlaceholder')"
      @input="onTextInput"
      @keydown.enter.prevent="check"
    >

    <div class="lang-actions">
      <button class="btn btn-primary" type="button" :disabled="!canCheck" @click="check">
        {{ t('lesson.checkAnswer') }}
      </button>
      <button
        v-if="!resolved && hints.length && hintIndex < hints.length"
        class="btn btn-ghost"
        type="button"
        @click="hintIndex += 1"
      >
        {{ t('lesson.showHint') }}
      </button>
    </div>

    <ul v-if="hintIndex > 0" class="lang-hints">
      <li v-for="(hint, i) in hints.slice(0, hintIndex)" :key="i">{{ hint }}</li>
    </ul>

    <div v-if="status !== 'idle'" class="lang-feedback" :class="`is-${status}`" role="status" aria-live="polite">
      <p>{{ status === 'pass' ? t('lesson.passed') : t('lesson.languageFailed') }}</p>
      <p v-if="status === 'fail' && exercise.explanation" class="lang-explanation">
        {{ exercise.explanation }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  gradeLanguageExercise,
  languageTargetLang,
  type LanguageExercise,
} from '~/utils/languageLesson'

const props = defineProps<{
  exercise: LanguageExercise
  trackId?: string
}>()

const emit = defineEmits<{
  passed: []
  attempt: [payload: { correct: boolean; attempts: number; responseMs: number }]
}>()

const { t } = useI18n()
const selected = ref('')
const status = ref<'idle' | 'pass' | 'fail'>('idle')
const hintIndex = ref(0)
const attempts = ref(0)
const startedAt = ref(Date.now())
const orderedTokens = ref<string[]>([])
const availableTokens = ref<string[]>([])
const selectedLeft = ref('')
const matches = ref<Record<string, string>>({})

const resolvedTrackId = computed(() => props.trackId || 'chinese-hsk')
const targetLang = computed(() => languageTargetLang(resolvedTrackId.value))
const hints = computed(() => props.exercise.hints || [])
const resolved = computed(() => status.value === 'pass')
const isChoiceExercise = computed(() =>
  ['mcq', 'meaning_choice', 'image_choice', 'audio_choice', 'dialogue_choice'].includes(props.exercise.type),
)
const exerciseLabel = computed(() => t('lesson.languageExercise'))
const matchedRights = computed(() => new Set(Object.values(matches.value)))
const shuffledRights = computed(() => (props.exercise.pairs || []).map((pair) => pair.right).reverse())
const canCheck = computed(() => {
  if (resolved.value) return false
  if (props.exercise.type === 'order_words') return orderedTokens.value.length > 0
  if (props.exercise.type === 'match_pairs') {
    const count = Object.keys(matches.value).length
    return count === (props.exercise.pairs || []).length && count > 0
  }
  return Boolean(selected.value.trim())
})

watch(
  () => [props.exercise.id, props.exercise.prompt] as const,
  reset,
  { immediate: true },
)

function reset() {
  selected.value = ''
  status.value = 'idle'
  hintIndex.value = 0
  attempts.value = 0
  startedAt.value = Date.now()
  orderedTokens.value = []
  availableTokens.value = [...(props.exercise.tokens || [])]
  selectedLeft.value = ''
  matches.value = {}
}

function mediaFor(choice: string) {
  return props.exercise.choiceMedia?.find((item) => item.value === choice)
}

function clearFailedState() {
  if (status.value === 'fail') status.value = 'idle'
}

function selectChoice(choice: string) {
  if (resolved.value) return
  selected.value = choice
  clearFailedState()
}

function onTextInput() {
  if (resolved.value) return
  clearFailedState()
}

function addOrderedToken(index: number) {
  if (resolved.value) return
  const [token] = availableTokens.value.splice(index, 1)
  if (token) orderedTokens.value.push(token)
  clearFailedState()
}

function removeOrderedToken(index: number) {
  if (resolved.value) return
  const [token] = orderedTokens.value.splice(index, 1)
  if (token) availableTokens.value.push(token)
  clearFailedState()
}

function selectMatchLeft(left: string) {
  if (resolved.value) return
  if (matches.value[left]) {
    const next = { ...matches.value }
    delete next[left]
    matches.value = next
  }
  selectedLeft.value = left
  clearFailedState()
}

function matchRight(right: string) {
  if (resolved.value || !selectedLeft.value || matchedRights.value.has(right)) return
  matches.value = { ...matches.value, [selectedLeft.value]: right }
  selectedLeft.value = ''
  clearFailedState()
}

function resetMatches() {
  if (resolved.value) return
  matches.value = {}
  selectedLeft.value = ''
  clearFailedState()
}

function submission(): string {
  if (props.exercise.type === 'order_words') return orderedTokens.value.join(' ')
  if (props.exercise.type === 'match_pairs') {
    return Object.entries(matches.value)
      .map(([left, right]) => `${left}=${right}`)
      .sort()
      .join('|')
  }
  return selected.value
}

function check() {
  if (!canCheck.value) return
  const checkedAt = Date.now()
  attempts.value += 1
  const ok = gradeLanguageExercise(props.exercise, submission(), targetLang.value)
  status.value = ok ? 'pass' : 'fail'
  emit('attempt', {
    correct: ok,
    attempts: attempts.value,
    responseMs: Math.max(0, checkedAt - startedAt.value),
  })
  startedAt.value = checkedAt
  if (ok) emit('passed')
}
</script>

<style scoped>
.lang-exercise { margin: 0; }
.lang-exercise-label { margin: 0 0 .55rem; font-size: .78rem; letter-spacing: .05em; text-transform: uppercase; color: var(--color-muted, #5b6b63); }
.lang-exercise-audio { margin-bottom: .75rem; }
.lang-prompt { margin: 0 0 1rem; font-size: 1.08rem; line-height: 1.55; }
.lang-choices { display: grid; gap: .65rem; margin-bottom: 1rem; }
.lang-choice { font: inherit; min-height: 3rem; padding: .7rem .9rem; border: 1px solid var(--color-border, rgba(20,40,30,.18)); border-radius: 10px; background: var(--color-surface, #fff); color: inherit; cursor: pointer; text-align: left; }
.lang-choice:disabled, .lang-token:disabled { cursor: default; }
.lang-choice:focus-visible, .lang-token:focus-visible { outline: 3px solid color-mix(in srgb, var(--color-accent, #0d9488) 35%, transparent); outline-offset: 2px; }
.lang-choice.is-selected { border-color: var(--color-accent, #0d9488); box-shadow: inset 0 0 0 1px var(--color-accent, #0d9488); }
.lang-choice.is-matched { opacity: .65; }
.lang-choice-image { display: block; width: min(100%, 12rem); aspect-ratio: 4 / 3; object-fit: cover; border-radius: 8px; margin-bottom: .55rem; }
.lang-fill { display: block; width: 100%; margin-bottom: 1rem; padding: .75rem .85rem; font: inherit; font-size: 1.05rem; border: 1px solid var(--color-border, rgba(20,40,30,.18)); border-radius: 10px; background: var(--color-surface, #fff); color: inherit; }
.lang-actions { display: flex; flex-wrap: wrap; gap: .55rem; align-items: center; }
.lang-hints { margin: .85rem 0 0; padding-left: 1.2rem; color: var(--color-muted, #5b6b63); }
.lang-feedback { margin: .85rem 0 0; padding: .75rem .85rem; border-radius: 10px; font-weight: 600; }
.lang-feedback p { margin: 0; }
.lang-feedback.is-pass { background: color-mix(in srgb, var(--color-accent, #0d9488) 10%, transparent); color: var(--color-accent, #0d9488); }
.lang-feedback.is-fail { background: color-mix(in srgb, var(--color-danger, #b45309) 10%, transparent); color: var(--color-danger, #b45309); }
.lang-explanation { margin-top: .35rem !important; font-weight: 400; line-height: 1.5; }
.lang-order-answer, .lang-token-bank { min-height: 3.25rem; display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; padding: .65rem; border-radius: 10px; }
.lang-order-answer { border: 1px dashed var(--color-border, rgba(20,40,30,.25)); margin-bottom: .75rem; }
.lang-token-bank { background: color-mix(in srgb, var(--color-surface, #fff) 90%, var(--color-muted, #5b6b63) 10%); margin-bottom: 1rem; }
.lang-token { font: inherit; padding: .55rem .7rem; border: 1px solid var(--color-border, rgba(20,40,30,.18)); border-radius: 8px; background: var(--color-surface, #fff); color: inherit; cursor: pointer; }
.lang-token.is-answer { border-color: var(--color-accent, #0d9488); }
.lang-match-help { margin: 0 0 .65rem; }
.lang-match-columns { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: .7rem; margin-bottom: .75rem; }
.lang-match-column { display: grid; gap: .55rem; align-content: start; }
.lang-reset { margin-bottom: 1rem; }
@media (min-width: 640px) { .lang-choices { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
