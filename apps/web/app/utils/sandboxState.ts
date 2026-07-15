/** Default UI state for SqlSandbox when mounting or switching lessons. */
export interface SandboxUiState {
  sql: string
  hintIndex: number
  failedAttempts: number
  solutionRevealed: boolean
  fetchedSolution: string
}

export function createSandboxUiState(starter?: string): SandboxUiState {
  return {
    sql: starter?.trim() ? starter : 'SELECT 1;',
    hintIndex: 0,
    failedAttempts: 0,
    solutionRevealed: false,
    fetchedSolution: '',
  }
}

/** True when lesson identity changed and sandbox should reset. */
export function shouldResetSandbox(prevLessonId: string | undefined, nextLessonId: string): boolean {
  return prevLessonId !== nextLessonId
}
