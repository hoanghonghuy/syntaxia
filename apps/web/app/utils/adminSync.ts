export type SyncResultTone = 'success' | 'error'

export type SyncResultInput = {
  ok: boolean
  synced?: number
  errorMessage?: string
}

export type SyncResultMessage = {
  key: string
  params: { n?: number; detail?: string }
  tone: SyncResultTone
}

/**
 * Map admin sync API outcome → i18n key, params, and banner tone.
 */
export function formatSyncResult(input: SyncResultInput): SyncResultMessage {
  if (!input.ok) {
    const raw = input.errorMessage?.trim() || ''
    return {
      key: 'admin.syncFailed',
      params: { detail: raw ? `: ${raw}` : '' },
      tone: 'error',
    }
  }
  const n = typeof input.synced === 'number' && Number.isFinite(input.synced) ? input.synced : 0
  if (n <= 0) {
    return {
      key: 'admin.syncedEmpty',
      params: { n: 0 },
      tone: 'success',
    }
  }
  return {
    key: 'admin.synced',
    params: { n },
    tone: 'success',
  }
}
