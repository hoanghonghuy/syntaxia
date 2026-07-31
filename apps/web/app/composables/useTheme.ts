import {
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  THEME_STORAGE_KEY,
  applyAccentCssVars,
  normalizeHex,
  readStoredAccent,
  readStoredMode,
  resolveAppearance,
  type AppearanceMode,
  type ResolvedAppearance,
} from '~/utils/themeAccent'

function systemPrefersDark(): boolean {
  if (!import.meta.client) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Apply appearance + accent without flashing default emerald:
 * write brand CSS vars for the *target* appearance first, then flip data-theme.
 */
export function applyDom(mode: AppearanceMode, accent: string) {
  if (!import.meta.client) return
  const resolved = resolveAppearance(mode, systemPrefersDark())
  const root = document.documentElement

  applyAccentCssVars(root.style, accent, resolved)
  root.style.colorScheme = resolved
  root.setAttribute('data-accent', accent)

  if (mode === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', mode)
  }
}

export function useTheme() {
  const mode = useState<AppearanceMode>('syntaxia-theme-mode', () => 'system')
  const accent = useState<string>('syntaxia-theme-accent', () => DEFAULT_ACCENT)
  const resolved = computed<ResolvedAppearance>(() =>
    resolveAppearance(mode.value, systemPrefersDark()),
  )

  function persist() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode.value)
      localStorage.setItem(ACCENT_STORAGE_KEY, accent.value)
    } catch {
      /* ignore */
    }
    applyDom(mode.value, accent.value)
  }

  function setMode(next: AppearanceMode) {
    mode.value = next
    persist()
  }

  function setAccent(hex: string) {
    const n = normalizeHex(hex)
    if (!n) return false
    accent.value = n
    persist()
    return true
  }

  function initFromStorage() {
    mode.value = readStoredMode()
    accent.value = readStoredAccent()
    applyDom(mode.value, accent.value)
  }

  return {
    mode,
    accent,
    resolved,
    setMode,
    setAccent,
    initFromStorage,
    persist,
  }
}
