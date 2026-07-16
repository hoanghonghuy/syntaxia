/** Default UI state for HtmlCssSandbox when mounting or switching lessons. */
export interface HtmlCssSandboxUiState {
  html: string
  css: string
  hintIndex: number
  failedAttempts: number
  solutionRevealed: boolean
  fetchedSolution: string
}

export function createHtmlCssSandboxUiState(
  starterHtml?: string,
  starterCss?: string,
): HtmlCssSandboxUiState {
  return {
    html: starterHtml || '',
    css: starterCss || '',
    hintIndex: 0,
    failedAttempts: 0,
    solutionRevealed: false,
    fetchedSolution: '',
  }
}

/** Build a script-free preview document for iframe srcdoc. */
export function buildHtmlCssPreviewSrcdoc(html: string, css: string): string {
  const style = css.trim() ? `<style>\n${css}\n</style>` : ''
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
${style}
</head>
<body>
${html}
</body>
</html>`
}
