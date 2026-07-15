export type SnackbarTone = 'success' | 'error' | 'info'

export type SnackbarItem = {
  id: string
  message: string
  tone: SnackbarTone
  duration: number
}

export const SNACKBAR_DEFAULT_DURATION = 4000
export const SNACKBAR_MAX = 3

export type SnackbarInput = {
  message: string
  tone?: SnackbarTone
  duration?: number
  id?: string
}

/** Build a snackbar item; empty message → null. */
export function createSnackbarItem(input: SnackbarInput): SnackbarItem | null {
  const message = input.message.trim()
  if (!message) return null
  const duration =
    typeof input.duration === 'number' && Number.isFinite(input.duration)
      ? Math.max(0, Math.floor(input.duration))
      : SNACKBAR_DEFAULT_DURATION
  return {
    id: input.id || `sb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    message,
    tone: input.tone || 'info',
    duration,
  }
}

/** Cap queue length; drop oldest when over max. */
export function pushSnackbar(
  queue: SnackbarItem[],
  item: SnackbarItem,
  max: number = SNACKBAR_MAX,
): SnackbarItem[] {
  const next = [...queue, item]
  const cap = Math.max(1, Math.floor(max) || SNACKBAR_MAX)
  if (next.length <= cap) return next
  return next.slice(next.length - cap)
}

export function dismissSnackbar(queue: SnackbarItem[], id: string): SnackbarItem[] {
  return queue.filter((item) => item.id !== id)
}
