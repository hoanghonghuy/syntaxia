/**
 * Slash focuses / opens search unless typing in a field.
 */
export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const localePath = useLocalePath()

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
    const target = event.target as HTMLElement | null
    if (!target) return
    const tag = target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) {
      return
    }
    event.preventDefault()
    navigateTo(localePath('/search'))
  }

  window.addEventListener('keydown', onKeydown)
})
