/** Normalize catalog API failures for hub error UI. */
export function formatCatalogLoadError(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim()
  }
  return 'load failed'
}

export function shouldShowCatalogError(loadError: string | null, loading: boolean): boolean {
  return !loading && Boolean(loadError)
}
