<template>
  <div class="sandbox-panel">
    <ClientOnly>
      <Codemirror
        v-model="code"
        class="sandbox-cm"
        :extensions="extensions"
        :indent-with-tab="true"
        :tab-size="2"
        :style="{ minHeight: '140px' }"
      />
      <template #fallback>
        <textarea v-model="code" class="sandbox-editor" spellcheck="false" />
      </template>
    </ClientOnly>

    <div v-if="hints.length" class="sandbox-hints">
      <button
        v-if="hintIndex < hints.length"
        class="btn btn-ghost"
        type="button"
        @click="hintIndex++"
      >
        {{ t('lesson.showHint') }} ({{ hintIndex + 1 }}/{{ hints.length }})
      </button>
      <ul v-if="hintIndex > 0" class="hint-list">
        <li v-for="(h, i) in hints.slice(0, hintIndex)" :key="i">{{ h }}</li>
      </ul>
    </div>

    <div v-if="hasSolution" class="sandbox-solution-controls">
      <p v-if="!solutionRevealed" class="attempts-hint">
        {{ t('lesson.attemptsHint', { n: SOLUTION_AFTER_ATTEMPTS }) }}
      </p>
      <button
        v-if="!solutionRevealed"
        class="btn"
        :class="canRevealSolution ? 'btn-primary' : 'btn-ghost'"
        type="button"
        :disabled="!canRevealSolution || solutionLoading"
        @click="revealSolution"
      >
        {{ t('lesson.showSolution') }}
      </button>
      <p v-if="solutionError" class="attempts-hint" role="alert">{{ solutionError }}</p>
      <div v-if="solutionRevealed" class="solution-box">
        <p class="sandbox-label">{{ t('lesson.solutionLabel') }}</p>
        <pre class="solution-sql">{{ solution }}</pre>
        <button class="btn btn-primary" type="button" @click="useSolution">
          {{ t('lesson.useSolutionJs') }}
        </button>
      </div>
    </div>

    <div class="sandbox-toolbar">
      <button class="btn btn-primary" type="button" :disabled="running" @click="run">
        {{ t('lesson.runJs') }}
        <span class="hint">{{ t('lesson.runHintJs') }}</span>
      </button>
      <span v-if="result" :class="result.passed ? 'result-pass' : 'result-fail'">
        {{ result.passed ? t('lesson.passed') : failMessage }}
      </span>
    </div>

    <div v-if="outputLines.length" class="sandbox-output">
      <p class="sandbox-label">{{ t('lesson.jsOutput') }}</p>
      <pre class="solution-sql">{{ outputLines.join('\n') }}</pre>
    </div>
    <div v-if="displayReturn !== undefined && displayReturn !== null" class="sandbox-output">
      <p class="sandbox-label">{{ t('lesson.jsReturn') }}</p>
      <pre class="solution-sql">{{ formatReturn(displayReturn) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { keymap, EditorView } from '@codemirror/view'
import type { Extension } from '@codemirror/state'
import type { SandboxResult } from '~/types/api'
import { createJsSandboxUiState } from '~/utils/jsSandboxState'
import { runJsInWorker } from '~/utils/jsSandboxWorker'

const SOLUTION_AFTER_ATTEMPTS = 3

const ERROR_CODE_KEYS: Record<string, string> = {
  syntax: 'lesson.error.syntax',
  timeout: 'lesson.error.timeout',
  generic: 'lesson.error.generic',
  wrong_result: 'lesson.failedWrongResult',
  non_serializable_return: 'lesson.error.nonSerializableReturn',
}

const props = withDefaults(
  defineProps<{
    lessonId: string
    lessonSlug: string
    locale: string
    starter?: string
    hints?: string[]
    solutionAvailable?: boolean
    canRun?: boolean
    loginPath?: string | { path: string; query?: Record<string, string> }
  }>(),
  { canRun: true, solutionAvailable: false },
)

const emit = defineEmits<{
  passed: []
}>()

const canRun = computed(() => props.canRun !== false)
const { t } = useI18n()
const api = useApi()
const code = ref(props.starter || '')
const running = ref(false)
const result = ref<SandboxResult | null>(null)
const hintIndex = ref(0)
const failedAttempts = ref(0)
const solutionRevealed = ref(false)
const lastReturn = ref<unknown>(undefined)
const lastConsole = ref<string[]>([])

const hints = computed(() => props.hints?.filter(Boolean) || [])
const fetchedSolution = ref('')
const solutionLoading = ref(false)
const solutionError = ref('')
const hasSolution = computed(() => props.solutionAvailable === true)
const solution = computed(() => fetchedSolution.value.trim())
const canRevealSolution = computed(() => failedAttempts.value >= SOLUTION_AFTER_ATTEMPTS)

const failMessage = computed(() => {
  if (!result.value || result.value.passed) return ''
  const errCode = result.value.code || ''
  const key = ERROR_CODE_KEYS[errCode]
  if (key) return t(key)
  return result.value.message || t('lesson.failed')
})

const outputLines = computed(() => lastConsole.value)
const displayReturn = computed(() => lastReturn.value)

function formatReturn(value: unknown) {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function applySandboxState(starter?: string) {
  const next = createJsSandboxUiState(starter)
  code.value = next.code
  result.value = null
  hintIndex.value = next.hintIndex
  failedAttempts.value = next.failedAttempts
  solutionRevealed.value = next.solutionRevealed
  fetchedSolution.value = next.fetchedSolution
  solutionError.value = ''
  lastReturn.value = undefined
  lastConsole.value = []
}

watch(
  () => props.starter,
  (v) => {
    if (v) code.value = v
  },
)

watch(
  () => props.lessonId,
  () => {
    applySandboxState(props.starter)
  },
)

watch(
  () => props.hints,
  () => {
    hintIndex.value = 0
  },
)

async function revealSolution() {
  if (!hasSolution.value || !canRevealSolution.value || solutionRevealed.value) return
  solutionLoading.value = true
  solutionError.value = ''
  try {
    const res = await api.lessonSolution(props.lessonSlug, props.locale)
    fetchedSolution.value = res.solution
    solutionRevealed.value = true
  } catch (e) {
    solutionError.value = (e as Error).message || t('lesson.error.generic')
  } finally {
    solutionLoading.value = false
  }
}

function useSolution() {
  if (!solution.value) return
  code.value = solution.value
}

async function run() {
  if (!canRun.value || !props.lessonId) return
  running.value = true
  try {
    const workerResult = await runJsInWorker(code.value)
    if (!workerResult.ok || workerResult.error) {
      const err = workerResult.error || { code: 'generic', message: 'Run failed' }
      result.value = {
        columns: [],
        rows: [],
        passed: false,
        code: err.code,
        message: err.message,
      }
      failedAttempts.value += 1
      return
    }
    lastReturn.value = workerResult.returnValue
    lastConsole.value = workerResult.consoleLines || []
    result.value = await api.gradeJsSandbox(
      props.lessonId,
      props.locale,
      workerResult.returnValue,
      workerResult.consoleLines || [],
    )
    if (result.value && !result.value.passed) {
      failedAttempts.value += 1
    } else if (result.value?.passed) {
      emit('passed')
    }
  } catch (e) {
    result.value = {
      columns: [],
      rows: [],
      passed: false,
      code: 'generic',
      message: (e as Error).message,
    }
    failedAttempts.value += 1
  } finally {
    running.value = false
  }
}

const extensions: Extension[] = [
  basicSetup,
  javascript(),
  EditorView.theme({
    '&': { fontSize: '0.9rem', backgroundColor: 'var(--color-surface-soft)' },
    '.cm-content': { fontFamily: 'var(--font-mono)', minHeight: '120px', padding: '0.75rem' },
    '.cm-gutters': {
      backgroundColor: 'var(--color-surface)',
      borderRight: '1px solid var(--color-hairline)',
      color: 'var(--color-ink-muted)',
    },
    '&.cm-focused': { outline: '2px solid var(--color-brand)' },
  }),
  keymap.of([
    {
      key: 'Mod-Enter',
      run: () => {
        void run()
        return true
      },
    },
  ]),
]
</script>

<style scoped>
.hint {
  font-weight: 500;
  opacity: 0.75;
  font-size: 0.8em;
  margin-left: 0.35rem;
}
.sandbox-label {
  margin: 0 0 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-ink-muted);
}
.sandbox-hints {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-hairline);
  background: var(--color-surface);
}
.hint-list {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
  color: var(--color-ink-muted);
  font-size: 0.9rem;
}
.sandbox-solution-controls {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-hairline);
  background: var(--color-surface);
}
.attempts-hint {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: var(--color-ink-muted);
}
.solution-box {
  margin-top: 0.5rem;
}
.solution-sql {
  margin: 0 0 0.75rem;
  padding: 0.75rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  background: var(--color-surface-soft);
  border: 1px solid var(--color-hairline);
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
}
.sandbox-cm {
  border-bottom: 1px solid var(--color-hairline);
  display: block;
}
.sandbox-cm :deep(.cm-editor) {
  min-height: 140px;
}
.sandbox-auth-gate {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-top: 1px solid var(--color-hairline);
  background: var(--color-surface);
}
.sandbox-auth-gate p {
  margin: 0;
  flex: 1 1 12rem;
  color: var(--color-ink-muted);
  font-size: 0.9rem;
}
.sandbox-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
}
.sandbox-output {
  padding: 0 1rem 1rem;
}
</style>
