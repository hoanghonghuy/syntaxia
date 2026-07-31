<template>
  <div class="sandbox-panel">
    <div class="htmlcss-preview">
      <p class="sandbox-label">{{ t('lesson.previewLabel') }}</p>
      <iframe
        class="htmlcss-frame"
        title="HTML CSS preview"
        sandbox=""
        :srcdoc="previewSrcdoc"
      />
    </div>

    <div v-if="showHtml" class="htmlcss-pane">
      <p class="sandbox-label">{{ t('lesson.htmlEditor') }}</p>
      <ClientOnly>
        <Codemirror
          :key="`html-${editorAppearance}`"
          v-model="html"
          class="sandbox-cm"
          :extensions="htmlExtensions"
          :indent-with-tab="true"
          :tab-size="2"
          :style="{ minHeight: '120px' }"
        />
        <template #fallback>
          <textarea v-model="html" class="sandbox-editor" spellcheck="false" />
        </template>
      </ClientOnly>
    </div>

    <div v-if="showCss" class="htmlcss-pane">
      <p class="sandbox-label">{{ t('lesson.cssEditor') }}</p>
      <ClientOnly>
        <Codemirror
          :key="`css-${editorAppearance}`"
          v-model="css"
          class="sandbox-cm"
          :extensions="cssExtensions"
          :indent-with-tab="true"
          :tab-size="2"
          :style="{ minHeight: '120px' }"
        />
        <template #fallback>
          <textarea v-model="css" class="sandbox-editor" spellcheck="false" />
        </template>
      </ClientOnly>
    </div>

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
      <button class="btn btn-primary" type="button" :disabled="running" @click="check">
        {{ t('lesson.runHtmlCss') }}
        <span class="hint">{{ t('lesson.runHintHtmlCss') }}</span>
      </button>
      <span v-if="result" :class="result.passed ? 'result-pass' : 'result-fail'">
        {{ result.passed ? t('lesson.passed') : failMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { basicSetup } from 'codemirror'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { keymap } from '@codemirror/view'
import type { Extension } from '@codemirror/state'
import type { SandboxResult } from '~/types/api'
import {
  buildHtmlCssPreviewSrcdoc,
  createHtmlCssSandboxUiState,
} from '~/utils/htmlCssSandbox'
import { createSandboxEditorExtensions } from '~/utils/sandboxEditorTheme'

const SOLUTION_AFTER_ATTEMPTS = 3

const ERROR_CODE_KEYS: Record<string, string> = {
  wrong_result: 'lesson.failedWrongMarkup',
  no_expected: 'lesson.error.generic',
  invalid_expected: 'lesson.error.generic',
  generic: 'lesson.error.generic',
}

const props = withDefaults(
  defineProps<{
    lessonId: string
    lessonSlug: string
    locale: string
    mode?: 'html' | 'css' | 'both'
    starterHtml?: string
    starterCss?: string
    hints?: string[]
    solutionAvailable?: boolean
    canRun?: boolean
    loginPath?: string | { path: string; query?: Record<string, string> }
  }>(),
  { canRun: true, solutionAvailable: false, mode: 'html' },
)

const emit = defineEmits<{
  passed: []
}>()

const canRun = computed(() => props.canRun !== false)
const { t } = useI18n()
const api = useApi()

const html = ref('')
const css = ref('')
const running = ref(false)
const result = ref<SandboxResult | null>(null)
const hintIndex = ref(0)
const failedAttempts = ref(0)
const solutionRevealed = ref(false)
const fetchedSolution = ref('')
const solutionLoading = ref(false)
const solutionError = ref('')
const previewSrcdoc = ref('')

const hints = computed(() => props.hints?.filter(Boolean) || [])
const hasSolution = computed(() => props.solutionAvailable === true)
const solution = computed(() => fetchedSolution.value.trim())
const canRevealSolution = computed(() => failedAttempts.value >= SOLUTION_AFTER_ATTEMPTS)
const showHtml = computed(() => props.mode === 'html' || props.mode === 'both')
const showCss = computed(() => props.mode === 'css' || props.mode === 'both')

const failMessage = computed(() => {
  if (!result.value || result.value.passed) return ''
  const errCode = result.value.code || ''
  const key = ERROR_CODE_KEYS[errCode]
  if (key) return t(key)
  return result.value.message || t('lesson.failed')
})

let previewTimer: ReturnType<typeof setTimeout> | null = null

function schedulePreview() {
  if (previewTimer) clearTimeout(previewTimer)
  previewTimer = setTimeout(() => {
    previewSrcdoc.value = buildHtmlCssPreviewSrcdoc(html.value, css.value)
  }, 300)
}

function applySandboxState() {
  const next = createHtmlCssSandboxUiState(props.starterHtml, props.starterCss)
  html.value = next.html
  css.value = next.css
  result.value = null
  hintIndex.value = next.hintIndex
  failedAttempts.value = next.failedAttempts
  solutionRevealed.value = next.solutionRevealed
  fetchedSolution.value = next.fetchedSolution
  solutionError.value = ''
  previewSrcdoc.value = buildHtmlCssPreviewSrcdoc(html.value, css.value)
}

watch([html, css], () => {
  schedulePreview()
})

watch(
  () => [props.starterHtml, props.starterCss, props.lessonId] as const,
  () => {
    applySandboxState()
  },
  { immediate: true },
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
  if (props.mode === 'html') {
    html.value = solution.value
  } else {
    // css | both — solution is the stylesheet (starterHtml is fixed preview markup)
    css.value = solution.value
  }
}

async function check() {
  if (!canRun.value || !props.lessonId) return
  running.value = true
  try {
    result.value = await api.gradeHtmlCssSandbox(
      props.lessonId,
      props.locale,
      html.value,
      css.value,
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

const { resolved: editorAppearance } = useTheme()

const editorExtensions = computed(() =>
  createSandboxEditorExtensions({
    minHeight: '100px',
    dark: editorAppearance.value === 'dark',
  }),
)

const runKeymap = keymap.of([
  {
    key: 'Mod-Enter',
    run: () => {
      void check()
      return true
    },
  },
])

const htmlExtensions = computed<Extension[]>(() => [
  basicSetup,
  htmlLang(),
  ...editorExtensions.value,
  runKeymap,
])
const cssExtensions = computed<Extension[]>(() => [
  basicSetup,
  cssLang(),
  ...editorExtensions.value,
  runKeymap,
])
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
.htmlcss-preview {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-hairline);
  background: var(--color-surface);
}
.htmlcss-frame {
  display: block;
  width: 100%;
  min-height: 160px;
  border: 1px solid var(--color-hairline);
  border-radius: 4px;
  background: #fff;
}
.htmlcss-pane {
  border-bottom: 1px solid var(--color-hairline);
}
.htmlcss-pane .sandbox-label {
  padding: 0.75rem 1rem 0;
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
  background: var(--color-code-bg);
  color: var(--color-code-fg);
  border: 1px solid var(--color-code-border);
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
}
.sandbox-cm {
  display: block;
}
.sandbox-cm :deep(.cm-editor) {
  min-height: 120px;
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
</style>
