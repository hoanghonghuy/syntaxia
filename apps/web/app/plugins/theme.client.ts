export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const { initFromStorage, mode, persist } = useTheme()
  initFromStorage()

  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const onChange = () => {
    if (mode.value === 'system') persist()
  }
  mq.addEventListener('change', onChange)
})
