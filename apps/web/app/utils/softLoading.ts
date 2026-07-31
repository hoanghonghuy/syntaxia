/**
 * Soft loading: keep existing content visible while refreshing.
 * Full skeleton only when there is nothing useful to show yet.
 */
export function shouldShowSkeleton(loading: boolean, hasContent: boolean): boolean {
  return Boolean(loading) && !hasContent
}
