/** Default UI state for JsSandbox when mounting or switching lessons. */
export interface JsSandboxUiState {
  code: string
  hintIndex: number
  failedAttempts: number
  solutionRevealed: boolean
  fetchedSolution: string
}

export function createJsSandboxUiState(starter?: string): JsSandboxUiState {
  return {
    code: starter?.trim() ? starter : '// write JavaScript here\n',
    hintIndex: 0,
    failedAttempts: 0,
    solutionRevealed: false,
    fetchedSolution: '',
  }
}
