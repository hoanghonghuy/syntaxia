<template>
  <section class="lang-steps" :aria-label="t('lesson.languagePath')">
    <p v-if="canDo" class="lang-cando">{{ t('lesson.canDo') }}: {{ canDo }}</p>
    <p v-if="pattern" class="lang-pattern">{{ t('lesson.pattern') }}: {{ pattern }}</p>

    <div class="lang-step-progress" aria-hidden="true">
      {{ stepIndex + 1 }} / {{ steps.length }}
    </div>

    <div v-if="current?.type === 'dialogue'" class="lang-step lang-dialogue">
      <p class="lang-step-label">{{ t('lesson.stepDialogue') }}</p>
      <ul class="lang-dialogue-lines">
        <li v-for="(line, i) in dialogueLines" :key="i" class="lang-dialogue-row">
          <div class="lang-dialogue-main">
            <span v-if="line.speaker" class="lang-speaker">{{ line.speaker }}</span>
            <span class="lang-line-text" :lang="textLang">{{ line.text }}</span>
            <span v-if="line.reading" class="lang-line-reading">{{ line.reading }}</span>
          </div>
          <LanguageListenButton
            :text="line.text"
            :track-id="trackId"
            :audio-url="line.audioUrl"
          />
        </li>
      </ul>
    </div>

    <div v-else-if="current?.type === 'tip'" class="lang-step lang-tip">
      <p class="lang-step-label">{{ t('lesson.stepTip') }}</p>
      <h3 class="lang-tip-title">{{ tipTitle }}</h3>
      <p class="lang-tip-body">{{ tipBody }}</p>
    </div>

    <div v-else-if="current?.type === 'teach'" class="lang-step lang-teach">
      <p class="lang-step-label">{{ t('lesson.stepTeach') }}</p>
      <ul class="lang-teach-list">
        <li v-for="(item, i) in teachItems" :key="i" class="lang-teach-row">
          <div class="lang-teach-main">
            <strong class="lang-teach-form" :lang="textLang">{{ item.form }}</strong>
            <span v-if="item.reading" class="lang-teach-reading">{{ item.reading }}</span>
            <span v-if="item.gloss" class="lang-teach-gloss">{{ item.gloss }}</span>
            <p v-if="item.example" class="lang-teach-example" :lang="textLang">{{ item.example }}</p>
          </div>
          <LanguageListenButton
            :text="item.example || item.form"
            :track-id="trackId"
            :audio-url="item.audioUrl"
          />
        </li>
      </ul>
    </div>

    <div v-else-if="practiceExercise" class="lang-step lang-practice">
      <p class="lang-step-label">
        {{ current?.type === 'checkpoint' ? t('lesson.stepCheckpoint') : t('lesson.stepPractice') }}
      </p>
      <LanguageExercise :exercise="practiceExercise" @passed="onPracticePassed" />
    </div>

    <div v-else-if="checkpointItems.length" class="lang-step lang-practice">
      <p class="lang-step-label">{{ t('lesson.stepCheckpoint') }}</p>
      <LanguageExercise
        :key="checkpointCursor"
        :exercise="checkpointItems[checkpointCursor]!"
        @passed="onCheckpointItemPassed"
      />
      <p class="lang-checkpoint-meta">
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
  languageStepsFromLesson,
  practiceFromStep,
  type LanguageExercise,
  type LanguageStep,
  type LanguageStepPractice,
} from '~/utils/languageLesson'

const props = defineProps<{
  lesson: { exercise?: Record<string, unknown> | null }
  trackId: string
}>()

const emit = defineEmits<{
  passed: []
}>()

const { t } = useI18n()

const textLang = computed(() => {
  if (props.trackId === 'japanese-jlpt') return 'ja'
  if (props.trackId === 'english-basics') return 'en'
  return 'zh-Hans'
})

const steps = computed(() => languageStepsFromLesson(props.lesson))
const stepIndex = ref(0)
const practicePassed = ref(false)
const checkpointCursor = ref(0)

const canDo = computed(() => {
  const ex = props.lesson.exercise
  return typeof ex?.canDo === 'string' ? ex.canDo : ''
})
const pattern = computed(() => {
  const ex = props.lesson.exercise
  return typeof ex?.pattern === 'string' ? ex.pattern : ''
})

const current = computed(() => steps.value[stepIndex.value] as LanguageStep | undefined)
const isLast = computed(() => stepIndex.value >= steps.value.length - 1)

const dialogueLines = computed(() => {
  const c = current.value as {
    lines?: { speaker?: string; text: string; reading?: string; audioUrl?: string }[]
  }
  return Array.isArray(c?.lines) ? c.lines.filter((l) => l && typeof l.text === 'string') : []
})

const tipTitle = computed(() => {
  const c = current.value as { title?: string }
  return typeof c?.title === 'string' ? c.title : ''
})
const tipBody = computed(() => {
  const c = current.value as { body?: string }
  return typeof c?.body === 'string' ? c.body : ''
})

const teachItems = computed(() => {
  const c = current.value as {
    items?: {
      form: string
      reading?: string
      gloss?: string
      example?: string
      audioUrl?: string
    }[]
  }
  return Array.isArray(c?.items) ? c.items.filter((i) => i && typeof i.form === 'string') : []
})

const practiceExercise = computed(() => {
  if (!current.value) return null
  return practiceFromStep(current.value)
})

const checkpointItems = computed((): LanguageExercise[] => {
  const c = current.value as LanguageStepPractice | undefined
  if (!c || c.type !== 'checkpoint' || !Array.isArray(c.items)) return []
  const out: LanguageExercise[] = []
  for (const item of c.items) {
    const ex = practiceFromStep({ ...item, type: 'practice' })
    if (ex) out.push(ex)
  }
  return out
})

const waitingPractice = computed(
  () => Boolean(practiceExercise.value) || checkpointItems.value.length > 0,
)

watch(
  () => [stepIndex.value, current.value?.type] as const,
  () => {
    practicePassed.value = false
    checkpointCursor.value = 0
  },
)

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
.lang-steps {
  margin: 1.5rem 0 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, rgba(20, 40, 30, 0.12));
}
.lang-cando,
.lang-pattern {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
  color: var(--color-muted, #5b6b63);
}
.lang-step-progress {
  margin: 0.75rem 0;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--color-muted, #5b6b63);
}
.lang-step-label {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted, #5b6b63);
}
.lang-dialogue-lines {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}
.lang-dialogue-row,
.lang-teach-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}
.lang-dialogue-main,
.lang-teach-main {
  min-width: 0;
  flex: 1;
}
.lang-speaker {
  display: inline-block;
  min-width: 1.5rem;
  font-weight: 600;
  margin-right: 0.35rem;
}
.lang-line-text {
  font-size: 1.2rem;
}
.lang-line-reading {
  display: block;
  margin-left: 1.85rem;
  font-size: 0.9rem;
  color: var(--color-muted, #5b6b63);
}
.lang-tip-title {
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
}
.lang-tip-body {
  margin: 0;
  line-height: 1.5;
}
.lang-teach-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
}
.lang-teach-form {
  font-size: 1.25rem;
  margin-right: 0.4rem;
}
.lang-teach-reading {
  margin-right: 0.4rem;
  color: var(--color-muted, #5b6b63);
}
.lang-teach-example {
  margin: 0.25rem 0 0;
  font-size: 1.05rem;
}
.lang-step-nav {
  margin-top: 1rem;
}
.lang-checkpoint-meta {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--color-muted, #5b6b63);
}
.lang-practice :deep(.lang-exercise) {
  border-top: none;
  margin-top: 0;
  padding-top: 0;
}
</style>
