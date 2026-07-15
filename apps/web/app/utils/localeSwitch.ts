/** Accessible label for the header locale toggle. */
export function localeSwitchAriaLabel(currentLocale: string, t: (key: string) => string): string {
  return currentLocale === 'vi' ? t('locale.switchToEn') : t('locale.switchToVi')
}

/** Human-readable name for the active UI locale. */
export function localeDisplayName(currentLocale: string, t: (key: string) => string): string {
  return currentLocale === 'vi' ? t('locale.nameVi') : t('locale.nameEn')
}
