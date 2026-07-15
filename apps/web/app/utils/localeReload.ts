export interface LocaleReloadOptions {
  locale: string
  isLoggedIn: boolean
  loadCatalog: (locale: string) => Promise<void>
  loadProgress?: () => Promise<void>
}

/** Reload catalog and (when logged in) locale-scoped progress after locale switch. */
export async function reloadOnLocaleChange(opts: LocaleReloadOptions): Promise<void> {
  await opts.loadCatalog(opts.locale)
  if (opts.isLoggedIn && opts.loadProgress) {
    await opts.loadProgress()
  }
}
