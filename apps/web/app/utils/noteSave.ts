export type NoteSaveMode = 'create' | 'update'

export function resolveNoteSaveMode(noteId: string | null | undefined): NoteSaveMode {
  return noteId ? 'update' : 'create'
}

export interface NoteRow {
  id: string
  body: string
}

/** Pick the most recently updated note row (API orders by updated_at DESC). */
export function pickPrimaryNote(notes: NoteRow[]): { noteId?: string; body: string } {
  const first = notes[0]
  if (!first) return { body: '' }
  return { noteId: first.id, body: first.body || '' }
}
