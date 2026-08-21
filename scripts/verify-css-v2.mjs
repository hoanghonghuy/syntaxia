import fs from 'node:fs'
import path from 'node:path'

const root = 'docs/curriculum/css-basics'
const expected = [
  'what-is-css', 'css-syntax', 'type-class-id-selectors', 'combinators-and-groups',
  'pseudo-classes', 'cascade-and-specificity', 'box-model', 'colors-and-units',
  'text-and-fonts', 'backgrounds-and-borders', 'display-and-flow',
  'styling-lists-and-links', 'sizing-and-overflow', 'flexbox-basics',
]
const migrated = expected.slice(0, 7)

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
    id: get('id'), track: get('track'), locale: get('locale'), slug: get('slug'),
    order: Number(get('order')), published: get('published'), canDo: get('can_do'),
    modeBoth: /^  mode:\s*both\s*$/m.test(fm),
    hintCount: hints ? (hints[1].match(/^\s*-\s+/gm) || []).length : 0,
    hasSolution: /\n  solution:/.test(fm), hasExpected: /\n  expected:/.test(fm),
    cssRules: /\n    type:\s*cssRules\s*$/m.test(fm),
    expectedBlock: expectedBlock ? expectedBlock[1].replace(/\s+/g, ' ').trim() : '',
    leadingH1: /^\s*#\s+[^#]/m.test(body), hasCSSFence: /```css[\s\S]*?```/i.test(body), body,
  }
}

function heading(body, en, vi) { return new RegExp(`^##\\s+(?:${en}|${vi})\\s*$`, 'im').test(body) }

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
    if (lesson.err) { issues.push(`${locale}/${file}: ${lesson.err}`); continue }
    if (lesson.track !== 'css-basics') issues.push(`${locale}/${file}: wrong track`)
    if (lesson.locale !== locale) issues.push(`${locale}/${file}: wrong locale`)
    if (lesson.published !== 'true') issues.push(`${locale}/${file}: not published`)
    if (!lesson.modeBoth) issues.push(`${locale}/${file}: exercise.mode must be both`)
    if (lesson.hintCount < 3) issues.push(`${locale}/${file}: needs at least 3 hints`)
    if (!lesson.hasSolution || !lesson.hasExpected) issues.push(`${locale}/${file}: incomplete exercise contract`)
    if (lesson.leadingH1) issues.push(`${locale}/${file}: body must not repeat title as H1`)
  }
  for (let i = 0; i < expected.length; i++) {
    const lesson = parsed[locale][expected[i]]
    if (!lesson) issues.push(`${locale}: missing ${expected[i]}`)
    else if (lesson.order !== i) issues.push(`${locale}/${expected[i]}: order ${lesson.order}, want ${i}`)
  }
  for (const slug of migrated) {
    const lesson = parsed[locale][slug]
    if (!lesson) continue
    if (!lesson.canDo) issues.push(`${locale}/${slug}: missing can_do`)
    if (!lesson.cssRules) issues.push(`${locale}/${slug}: expected must use cssRules`)
    if (!lesson.hasCSSFence) issues.push(`${locale}/${slug}: missing CSS example fence`)
    if (!heading(lesson.body, 'Mental model', 'Mô hình tư duy')) issues.push(`${locale}/${slug}: missing mental model`)
    if (!heading(lesson.body, 'Predict the rendered result', 'Dự đoán kết quả hiển thị')) issues.push(`${locale}/${slug}: missing prediction`)
    if (!heading(lesson.body, 'Worked example', 'Ví dụ mẫu')) issues.push(`${locale}/${slug}: missing worked example`)
    if (!heading(lesson.body, 'Debug this', 'Tìm lỗi')) issues.push(`${locale}/${slug}: missing debugging`)
    if (!heading(lesson.body, 'Common mistakes', 'Lỗi thường gặp')) issues.push(`${locale}/${slug}: missing mistakes`)
    if (!heading(lesson.body, 'Your turn', 'Thử ngay')) issues.push(`${locale}/${slug}: missing build task`)
    if (!heading(lesson.body, 'Quick check', 'Tự kiểm tra')) issues.push(`${locale}/${slug}: missing recall check`)
  }
}

for (const slug of expected) {
  const en = parsed.en[slug], vi = parsed.vi[slug]
  if (!en || !vi) continue
  if (en.id !== vi.id) issues.push(`${slug}: id mismatch`)
  if (en.order !== vi.order) issues.push(`${slug}: order mismatch`)
  if (en.track !== vi.track) issues.push(`${slug}: track mismatch`)
  if (en.expectedBlock !== vi.expectedBlock) issues.push(`${slug}: expected grader contract mismatch EN/VI`)
}

if (issues.length) { console.log('FAIL CSS V2'); console.log(issues.join('\n')); process.exit(1) }
console.log(`PASS CSS structure 14/14; IT V2 migrated ${migrated.length}/14 EN+VI`)
