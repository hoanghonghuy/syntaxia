export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

const HEADING_RE = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi
const ID_RE = /\bid\s*=\s*["']([^"']+)["']/i

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/**
 * Build a TOC from lesson bodyHtml. Only h2/h3 that already have an `id`
 * (emitted by Go markdown.SimpleRender) are included.
 */
export function extractToc(html: string | null | undefined): TocItem[] {
  if (!html) return []
  const items: TocItem[] = []
  HEADING_RE.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = HEADING_RE.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3
    const idMatch = ID_RE.exec(match[2] || '')
    if (!idMatch) continue
    const text = stripTags(match[3] || '').trim()
    if (!text) continue
    items.push({ id: idMatch[1], text, level })
  }
  return items
}
