import {
  createSnackbarItem,
  dismissSnackbar,
  pushSnackbar,
  type SnackbarInput,
  type SnackbarItem,
} from '~/utils/snackbar'

export function useSnackbar() {
  const queue = useState<SnackbarItem[]>('syntaxia-snackbar-queue', () => [])
  const timers = useState<Record<string, ReturnType<typeof setTimeout>>>(
    'syntaxia-snackbar-timers',
    () => ({}),
  )

  function clearTimer(id: string) {
    const t = timers.value[id]
    if (t) {
      clearTimeout(t)
      const next = { ...timers.value }
      delete next[id]
      timers.value = next
    }
  }

  function dismiss(id: string) {
    clearTimer(id)
    queue.value = dismissSnackbar(queue.value, id)
  }

  function show(input: SnackbarInput) {
    const item = createSnackbarItem(input)
    if (!item) return null
    queue.value = pushSnackbar(queue.value, item)
    if (import.meta.client && item.duration > 0) {
      clearTimer(item.id)
      timers.value = {
        ...timers.value,
        [item.id]: setTimeout(() => dismiss(item.id), item.duration),
      }
    }
    return item
  }

  function success(message: string, duration?: number) {
    return show({ message, tone: 'success', duration })
  }

  function error(message: string, duration?: number) {
    return show({ message, tone: 'error', duration })
  }

  function info(message: string, duration?: number) {
    return show({ message, tone: 'info', duration })
  }

  return {
    queue: readonly(queue),
    show,
    success,
    error,
    info,
    dismiss,
  }
}
