import fs from 'node:fs'
import path from 'node:path'

const root = 'docs/curriculum/html-basics'
const expected = [
  'what-is-html',
  'document-structure',
  'headings-and-paragraphs',
  'emphasis-and-importance',
  'lists',
  'links',
  'images',
  'semantic-landmarks',
  'tables',
  'forms-basics',
  'form-controls',
  'html-entities',
]

function parse(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return { err: 'missing frontmatter' }
  const fm = match[1]
  const body = md.slice(match[0].length)
  const get = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))
    return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : ''
  }
  const hints = fm.match(/\n  hints:\s*\n([\s\S]*?)\n  solution:/)
  const expectedBlock = fm.match(/\n  expected:\s*\n([\s\S]*)$/)
  return {
    id: get('id'),
    track: get('track'),
    locale: get('locale'),
    slug: get('slug'),
    order: Number(get('order')),
    published: get('published'),
    canDo: get('can_do'),
    modeHtml: /^  mode:\s*html\s*$/m.test(fm),
    hintCount: hints ? (hints[1].match(/^\s*-\s+/gm) || []).length : 0,
    hasSolution: /\n  solution:/.test(fm),
    hasExpected: /\n  expected:/.test(fm),
    expectedBlock: expectedBlock ? expectedBlock[1].replace(/\s+/g, ' ').trim() : '',
    leadingH1: /^\s*#\s+[^#]/m.test(body),
    hasHtmlFence: /```html[\s\S]*?```/i.test(body),
    body,
  }
}

function heading(body, en, vi) {
  return new RegExp(`^##\\s+(?:${en}|${vi})\\s*$`, 'im').test(body)
}

const issues = []
const parsed = { en: {}, vi: {} }

for (const locale of ['en', 'vi']) {
  const dir = path.join(root, locale)
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md'))
  if (files.length !== expected.length) issues.push(`${locale} file count ${files.length}, want ${expected.length}`)

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const lesson = parse(fs.readFileSync(path.join(dir, file), 'utf8'))
    parsed[locale][slug] = lesson
    if (lesson.err) {
      issues.push(`${locale}/${file}: ${lesson.err}`)
      continue
    }
    if (lesson.track !== 'html-basics') issues.push(`${locale}/${file}: wrong track ${lesson.track}`)
    if (lesson.locale !== locale) issues.push(`${locale}/${file}: locale field ${lesson.locale}`)
    if (lesson.published !== 'true') issues.push(`${locale}/${file}: not published`)
    if (!lesson.canDo) issues.push(`${locale}/${file}: missing can_do`)
    if (!lesson.modeHtml) issues.push(`${locale}/${file}: exercise.mode must be html`)
    if (lesson.hintCount < 3) issues.push(`${locale}/${file}: needs at least 3 hints`)
    if (!lesson.hasSolution || !lesson.hasExpected) issues.push(`${locale}/${file}: incomplete exercise contract`)
    if (lesson.leadingH1) issues.push(`${locale}/${file}: body must not repeat title as H1`)
    if (!lesson.hasHtmlFence) issues.push(`${locale}/${file}: missing HTML example fence`)
    if (!heading(lesson.body, 'Mental model', 'Mô hình tư duy')) issues.push(`${locale}/${file}: missing mental model`)
    if (!heading(lesson.body, 'Predict the rendered structure', 'Dự đoán cấu trúc khi render')) issues.push(`${locale}/${file}: missing prediction`)
    if (!heading(lesson.body, 'Worked example', 'Ví dụ mẫu')) issues.push(`${locale}/${file}: missing worked example`)
    if (!heading(lesson.body, 'Debug this', 'Tìm lỗi')) issues.push(`${locale}/${file}: missing debugging`)
    if (!heading(lesson.body, 'Common mistakes', 'Lỗi thường gặp')) issues.push(`${locale}/${file}: missing mistakes`)
    if (!heading(lesson.body, 'Your turn', 'Thử ngay')) issues.push(`${locale}/${file}: missing build task`)
    if (!heading(lesson.body, 'Quick check', 'Tự kiểm tra')) issues.push(`${locale}/${file}: missing recall check`)
  }

  for (let i = 0; i < expected.length; i++) {
    const slug = expected[i]
    const lesson = parsed[locale][slug]
    if (!lesson) issues.push(`${locale}: missing ${slug}`)
    else if (lesson.order !== i) issues.push(`${locale}/${slug}: order ${lesson.order}, want ${i}`)
  }
}

for (const slug of expected) {
  const en = parsed.en[slug]
  const vi = parsed.vi[slug]
  if (!en || !vi) continue
  if (en.id !== vi.id) issues.push(`${slug}: id mismatch`)
  if (en.order !== vi.order) issues.push(`${slug}: order mismatch`)
  if (en.track !== vi.track) issues.push(`${slug}: track mismatch`)
  if (en.expectedBlock !== vi.expectedBlock) issues.push(`${slug}: expected grader contract mismatch EN/VI`)
}

if (issues.length) {
  console.log('FAIL HTML V2')
  console.log(issues.join('\n'))
  process.exit(1)
}

console.log(`PASS HTML V2 pedagogy+exercise+parity ${expected.length}/${expected.length} EN+VI`)
