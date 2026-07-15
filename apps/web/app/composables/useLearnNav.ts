export function useLearnNav() {
  const navOpen = useState('learn-nav-open', () => false)
  /** Drawer mode: mobile + tablet. Fixed sidebar only on desktop (≥1100px). */
  const isNarrow = useState('learn-nav-narrow', () => true)

  function syncViewport() {
    if (!import.meta.client) return
    isNarrow.value = !window.matchMedia('(min-width: 1100px)').matches
    if (!isNarrow.value) navOpen.value = false
  }

  function openNav() {
    navOpen.value = true
  }

  function closeNav() {
    navOpen.value = false
  }

  function toggleNav() {
    navOpen.value = !navOpen.value
  }

  return { navOpen, isNarrow, syncViewport, openNav, closeNav, toggleNav }
}
