<template>
  <section class="lang-steps" :aria-label="t('lesson.languagePath')">
    <div
      class="lang-step-progress"
      role="progressbar"
      :aria-valuenow="stepIndex + 1"
      aria-valuemin="1"
      :aria-valuemax="steps.length"
      :aria-valuetext="`${stepIndex + 1} / ${steps.length}`"
    >
      <span>{{ stepIndex + 1 }} / {{ steps.length }}</span>
      <span class="lang-progress-track" aria-hidden="true">
        <span class="lang-progress-value" :style="{ width: `${progressPercent}%` }" />
      </span>
    </div>

    <div v-if="current?.type === 'scene'" class="lang-step lang-scene">
      <p class="lang-step-label">{{ t('lesson.languagePath') }}</p>
      <LanguageSemanticVisual
        v-if="sceneVisualKey && isLanguageVisualKey(sceneVisualKey)"
        class="lang-scene-visual"
        :visual-key="sceneVisualKey"
        :alt="sceneImageAlt"
      />
      <img v-else-if="sceneImageUrl" class="lang-scene-image" :src="sceneImageUrl" :alt="sceneImageAlt">
      <h2 v-if="sceneTitle" class="lang-scene-title">{{ sceneTitle }}</h2>
      <p v-if="sceneBody" class="lang-scene-body">{{ sceneBody }}</p>
    </div>

    <div v-else-if="current?.type === 'dialogue'" class="lang-step lang-dialogue">
      <p class="lang-step-label">{{ t('lesson.stepDialogue') }}</p>
      <ul class="lang-dialogue-lines">
        <li v-for="(line, i) in dialogueLines" :key="i" class="lang-dialogue-row">
          <div class="lang-dialogue-main">
            <span v-if="line.speaker" class="lang-speaker">{{ line.speaker }}</span>
            <span class="lang-line-text" :lang="targetLang">{{ line.text }}</span>
            <span v-if="line.reading" class="lang-line-reading">{{ line.reading }}</span>
          </div>
          <LanguageListenButton :text="line.text" :track-id="trackId" :audio-url="line.audioUrl" />
        </li>
      </ul>
    </div>

    <div v-else-if="current?.type === 'listen'" class="lang-step lang-listen">
      <p class="lang-step-label">{{ t('lesson.listen') }}</p>
      <p v-if="listenPrompt" class="lang-listen-prompt">{{ listenPrompt }}</p>
      <div class="lang-listen-actions">
        <LanguageListenButton
          :text="listenText"
          :track-id="trackId"
          :audio-url="listenAudioUrl"
          @activated="onListenActivated"
        />
        <button
          v-if="listenAttempted && !listenRevealed && listenMode !== 'none'"
          class="btn btn-ghost lang-transcript-toggle"
          type="button"
          @click="revealTranscript"
        >
          {{ showTranscriptLabel }}
        </button>
      </div>
      <div v-if="listenRevealed" class="lang-listen-transcript" aria-live="polite">
        <p class="lang-listen-text" :lang="targetLang">{{ listenText }}</p>
        <p v-if="listenReading" class="lang-line-reading">{{ listenReading }}</p>
      </div>
    </div>

    <div v-else-if="current?.type === 'tip'" class="lang-step lang-tip">
      <p class="lang-step-label">{{ t('lesson.stepTip') }}</p>
      <h2 class="lang-tip-title">{{ tipTitle }}</h2>
      <p class="lang-tip-body">{{ tipBody }}</p>
    </div>

    <div v-else-if="current?.type === 'teach'" class="lang-step lang-teach">
      <p class="lang-step-label">{{ t('lesson.stepTeach') }}</p>
      <ul class="lang-teach-list">
        <li v-for="(item, i) in teachItems" :key="i" class="lang-teach-row">
          <div class="lang-teach-main">
            <strong class="lang-teach-form" :lang="targetLang">{{ item.form }}</strong>
            <span v-if="item.reading" class="lang-teach-reading">{{ item.reading }}</span>
            <span v-if="item.gloss" class="lang-teach-gloss">{{ item.gloss }}</span>
            <p v-if="item.example" class="lang-teach-example" :lang="targetLang">{{ item.example }}</p>
          </div>
          <LanguageListenButton :text="item.example || item.form" :track-id="trackId" :audio-url="item.audioUrl" />
        </li>
      </ul>
    </div>

    <div v-else-if="practiceExercise" class="lang-step lang-practice">
      <p class="lang-step-label">{{ current?.type === 'checkpoint' ? t('lesson.stepCheckpoint') : t('lesson.stepPractice') }}</p>
      <LanguageExercise
        :exercise="practiceExercise"
        :track-id="trackId"
        @passed="onPracticePassed"
      />
    </div>

    <div v-else-if="checkpointItems.length" class="lang-step lang-practice">
      <p class="lang-step-label">{{ t('lesson.stepCheckpoint') }}</p>
      <LanguageExercise
        :key="checkpointCursor"
        :exercise="checkpointItems[checkpointCursor]!"
        :track-id="trackId"
        @passed="onCheckpointItemPassed"
      />
      <p class="lang-checkpoint-meta" aria-live="polite">
        {{ checkpointCursor + 1 }} / {{ checkpointItems.length }}
      </p>
    </div>

    <div class="lang-step-nav">
      <button
        v-if="!isLast || !waitingPractice"
        class="btn btn-primary"
        type="button"
        :disabled="waitingPractice && !practicePassed"
        @click="next"
      >
        {{ isLast ? t('lesson.finishSteps') : t('lesson.nextStep') }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  shouldRevealTranscriptAfterListen,
  type LanguageAudioMode,
} from '~/utils/languageAudio'
import {
  languageStepsFromLesson,
  languageTargetLang,
  practiceFromStep,
  type LanguageExercise,
  type LanguageStep,
  type LanguageStepPractice,
} from '~/utils/languageLesson'
import {
  isAppOwnedLanguageImageUrl,
  isLanguageVisualKey,
} from '~/utils/languageVisual'

const props = defineProps<{
  lesson: { exercise?: Record<string, unknown> | null }
  trackId: string
}>()
const emit = defineEmits<{ passed: [] }>()
const { t, locale } = useI18n()

const showTranscriptLabel = computed(() =>
  t(
    'lesson.showTranscript',
    locale.value === 'vi' ? 'Hiện lời thoại' : 'Show transcript',
  ),
)
const targetLang = computed(() => languageTargetLang(props.trackId))
const steps = computed(() => languageStepsFromLesson(props.lesson))
const stepIndex = ref(0)
const practicePassed = ref(false)
const checkpointCursor = ref(0)
const listenAttempted = ref(false)
const listenMode = ref<LanguageAudioMode | null>(null)
const listenRevealed = ref(false)
const current = computed(() => steps.value[stepIndex.value] as LanguageStep | undefined)
const isLast = computed(() => stepIndex.value >= steps.value.length - 1)
const progressPercent = computed(() => steps.value.length ? ((stepIndex.value + 1) / steps.value.length) * 100 : 0)

const sceneTitle = computed(() => stringField(current.value, 'title'))
const sceneBody = computed(() => stringField(current.value, 'body'))
const sceneVisualKey = computed(() => stringField(current.value, 'visualKey'))
const sceneImageUrl = computed(() => {
  const value = stringField(current.value, 'imageUrl')
  return isAppOwnedLanguageImageUrl(value) ? value : ''
})
const sceneImageAlt = computed(() => stringField(current.value, 'imageAlt'))
const listenText = computed(() => stringField(current.value, 'text'))
const listenReading = computed(() => stringField(current.value, 'reading'))
const listenPrompt = computed(() => stringField(current.value, 'prompt'))
const listenAudioUrl = computed(() => stringField(current.value, 'audioUrl'))

const dialogueLines = computed(() => {
  const c = current.value as { lines?: { speaker?: string; text: string; reading?: string; audioUrl?: string }[] }
  return Array.isArray(c?.lines) ? c.lines.filter((line) => line && typeof line.text === 'string') : []
})
const tipTitle = computed(() => stringField(current.value, 'title'))
const tipBody = computed(() => stringField(current.value, 'body'))
const teachItems = computed(() => {
  const c = current.value as { items?: { form: string; reading?: string; gloss?: string; example?: string; audioUrl?: string }[] }
  return Array.isArray(c?.items) ? c.items.filter((item) => item && typeof item.form === 'string') : []
})
const practiceExercise = computed(() => current.value ? practiceFromStep(current.value) : null)
const checkpointItems = computed((): LanguageExercise[] => {
  const c = current.value as LanguageStepPractice | undefined
  if (!c || c.type !== 'checkpoint' || !Array.isArray(c.items)) return []
  return c.items.flatMap((item) => {
    const exercise = practiceFromStep({ ...item, type: 'practice' })
    return exercise ? [exercise] : []
  })
})
const waitingPractice = computed(() => Boolean(practiceExercise.value) || checkpointItems.value.length > 0)

watch(() => [stepIndex.value, current.value?.type] as const, () => {
  practicePassed.value = false
  checkpointCursor.value = 0
  listenAttempted.value = false
  listenMode.value = null
  listenRevealed.value = false
})

function stringField(value: unknown, key: string): string {
  if (!value || typeof value !== 'object') return ''
  const raw = (value as Record<string, unknown>)[key]
  return typeof raw === 'string' ? raw : ''
}

function onListenActivated(mode: LanguageAudioMode) {
  listenAttempted.value = true
  listenMode.value = mode
  if (shouldRevealTranscriptAfterListen(mode)) {
    listenRevealed.value = true
  }
}

function revealTranscript() {
  listenRevealed.value = true
}

function onPracticePassed() {
  practicePassed.value = true
  if (isLast.value) emit('passed')
}

function onCheckpointItemPassed() {
  if (checkpointCursor.value < checkpointItems.value.length - 1) {
    checkpointCursor.value += 1
    return
  }
  practicePassed.value = true
  if (isLast.value) emit('passed')
}

function next() {
  if (waitingPractice.value && !practicePassed.value) return
  if (isLast.value) {
    emit('passed')
    return
  }
  stepIndex.value += 1
}
</script>

<style scoped>
.lang-steps { margin: 0; }
.lang-step-progress { display: grid; gap: .4rem; margin: 0 0 1.2rem; font-size: .8rem; color: var(--color-ink-muted); }
.lang-progress-track { display: block; height: 5px; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--color-hairline) 75%, transparent); }
.lang-progress-value { display: block; height: 100%; border-radius: inherit; background: var(--color-brand); transition: width .2s ease; }
.lang-step { padding: 1rem 0 .35rem; }
.lang-step-label { margin: 0 0 .65rem; font-size: .78rem; letter-spacing: .05em; text-transform: uppercase; color: var(--color-ink-muted); }
.lang-scene-visual, .lang-scene-image { width: 100%; max-height: 22rem; border-radius: 14px; margin-bottom: 1rem; }
.lang-scene-image { object-fit: cover; }
.lang-scene-title, .lang-tip-title { margin: 0 0 .45rem; font-size: 1.2rem; }
.lang-scene-body, .lang-tip-body, .lang-listen-prompt { margin: 0; line-height: 1.6; }
.lang-dialogue-lines, .lang-teach-list { list-style: none; margin: 0; padding: 0; display: grid; gap: .75rem; }
.lang-dialogue-row, .lang-teach-row { display: flex; align-items: flex-start; justify-content: space-between; gap: .75rem; padding: .75rem 0; border-bottom: 1px solid var(--color-hairline); }
.lang-dialogue-main, .lang-teach-main { min-width: 0; flex: 1; }
.lang-speaker { display: inline-block; min-width: 1.7rem; font-weight: 700; margin-right: .35rem; }
.lang-line-text { font-size: 1.18rem; overflow-wrap: anywhere; }
.lang-line-reading { display: block; margin-top: .25rem; font-size: .9rem; color: var(--color-ink-muted); overflow-wrap: anywhere; }
.lang-listen { display: grid; gap: .7rem; }
.lang-listen-actions { display: flex; flex-wrap: wrap; align-items: center; gap: .55rem; }
.lang-transcript-toggle { min-height: 2.75rem; }
.lang-listen-transcript { padding: .75rem .85rem; border-radius: 10px; background: color-mix(in srgb, var(--color-surface) 88%, var(--color-brand) 12%); }
.lang-listen-text { margin: 0; font-size: 1.35rem; font-weight: 600; overflow-wrap: anywhere; }
.lang-teach-row { padding: .8rem 0; }
.lang-teach-form { font-size: 1.22rem; margin-right: .45rem; overflow-wrap: anywhere; }
.lang-teach-reading { margin-right: .45rem; color: var(--color-ink-muted); overflow-wrap: anywhere; }
.lang-teach-example { margin: .3rem 0 0; font-size: 1.03rem; line-height: 1.5; overflow-wrap: anywhere; }
.lang-step-nav { margin-top: 1.1rem; display: flex; justify-content: flex-end; }
.lang-checkpoint-meta { margin: .6rem 0 0; font-size: .85rem; color: var(--color-ink-muted); }

@media (max-width: 560px) {
  .lang-dialogue-row,
  .lang-teach-row {
    flex-direction: column;
    align-items: stretch;
    gap: .55rem;
  }

  .lang-listen-actions {
    align-items: stretch;
  }

  .lang-transcript-toggle,
  .lang-step-nav .btn {
    width: 100%;
    min-height: 2.75rem;
  }

  .lang-step-nav {
    justify-content: stretch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lang-progress-value { transition: none; }
}
</style>
