import fs from 'node:fs'
import path from 'node:path'

const root = 'docs/curriculum/sql-fundamentals'
const expected = [
  'what-is-sql',
  'sql-syntax',
  'select-queries',
  'select-distinct',
  'filtering-with-where',
  'and-or-not',
  'order-by',
  'limit-rows',
  'null-values',
  'inserting-rows',
  'updating-rows',
  'deleting-rows',
  'min-and-max',
  'count-rows',
  'sum-and-avg',
  'like-pattern',
  'in-list',
  'between-range',
  'column-aliases',
  'inner-join',
  'left-join',
  'right-join',
  'full-join',
  'self-join',
  'union-queries',
  'group-by-aggregate',
  'having-filter',
  'exists-subquery',
  'case-expression',
  'creating-tables',
  'alter-table',
  'drop-table',
  'primary-key',
  'foreign-key',
  'create-index',
  'create-view',
  'sql-wildcards',
  'union-all',
  'insert-into-select',
  'any-all-subquery',
  'table-constraints',
  'sql-comments',
]

// Only intentionally migrated slices are held to the V2 contract. Expand this
// boundary after each coherent block is rewritten and reviewed.
const v2Migrated = expected.slice(0, 26)
const mutationSlugs = new Set(['inserting-rows', 'updating-rows', 'deleting-rows'])

function parse(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return { err: 'no fm' }
  const fm = m[1]
  const body = md.slice(m[0].length)
  const get = (k) => {
    const r = fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))
    return r ? r[1].trim() : ''
  }
  return {
    id: get('id').replace(/['"]/g, ''),
    track: get('track').replace(/['"]/g, ''),
    locale: get('locale').replace(/['"]/g, ''),
    order: Number(get('order')),
    slug: get('slug').replace(/['"]/g, ''),
    canDo: get('can_do').replace(/^['"]|['"]$/g, ''),
    hasHints: /hints:\s*\n\s*-/.test(fm),
    hasSol: /solution:/.test(fm),
    hasPrev: /preview:/.test(fm),
    hasExp: /expected:/.test(fm),
    hasSeed: /sandbox_seed:/.test(fm),
    allowsMutations: /allow_mutations:\s*true/.test(fm),
    hasVerifySql: /verify_sql:\s*["']?SELECT\b/i.test(fm),
    leadingH1: /^\s*#\s+[^#]/m.test(body),
    table: /\|\s*-+/.test(body),
    mistakes: /Common mistakes|Lỗi thường gặp/i.test(body),
    published: get('published'),
    body,
  }
}

function hasHeading(body, en, vi) {
  return new RegExp(`^##\\s+(?:${en}|${vi})\\s*$`, 'im').test(body)
}

const issues = []
const parsedByLocale = { en: {}, vi: {} }

for (const loc of ['en', 'vi']) {
  const dir = path.join(root, loc)
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  if (files.length !== 42) issues.push(`${loc} file count ${files.length}`)
  const bySlug = parsedByLocale[loc]

  for (const f of files) {
    const p = parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    const slug = f.replace(/\.md$/, '')
    bySlug[slug] = p
    if (p.err) {
      issues.push(`${loc}/${f} ${p.err}`)
      continue
    }
    if (p.leadingH1) issues.push(`${loc}/${f} leading H1`)
    if (!p.hasHints) issues.push(`${loc}/${f} missing hints`)
    if (!p.hasSol) issues.push(`${loc}/${f} missing solution`)
    if (!p.hasPrev) issues.push(`${loc}/${f} missing preview`)
    if (!p.hasExp) issues.push(`${loc}/${f} missing expected`)
    if (!p.hasSeed) issues.push(`${loc}/${f} missing seed`)
    if (!p.table) issues.push(`${loc}/${f} missing md table`)
    if (!p.mistakes) issues.push(`${loc}/${f} missing mistakes section`)
    if (p.published !== 'true') issues.push(`${loc}/${f} not published`)
  }

  for (let i = 0; i < expected.length; i++) {
    const slug = expected[i]
    const p = bySlug[slug]
    if (!p) issues.push(`${loc} missing slug ${slug}`)
    else if (p.order !== i) issues.push(`${loc}/${slug} order ${p.order} want ${i}`)
  }

  for (const slug of v2Migrated) {
    const p = bySlug[slug]
    if (!p) continue
    if (!p.canDo) issues.push(`${loc}/${slug} missing can_do`)
    if (!hasHeading(p.body, 'Mental model', 'Mô hình tư duy')) issues.push(`${loc}/${slug} missing V2 mental model`)
    if (!hasHeading(p.body, 'Predict before you run', 'Dự đoán trước khi chạy')) issues.push(`${loc}/${slug} missing V2 prediction`)
    if (!hasHeading(p.body, 'Worked example', 'Ví dụ mẫu')) issues.push(`${loc}/${slug} missing V2 worked example`)
    if (!hasHeading(p.body, 'Debug this', 'Tìm lỗi')) issues.push(`${loc}/${slug} missing V2 debugging`)
    if (!hasHeading(p.body, 'Your turn', 'Thử ngay')) issues.push(`${loc}/${slug} missing V2 build task`)
    if (!hasHeading(p.body, 'Quick check', 'Tự kiểm tra')) issues.push(`${loc}/${slug} missing V2 recall check`)
    if (!/```sql[\s\S]*?```/i.test(p.body)) issues.push(`${loc}/${slug} missing SQL example`)

    if (mutationSlugs.has(slug)) {
      if (!p.allowsMutations) issues.push(`${loc}/${slug} mutation lesson missing allow_mutations`)
      if (!p.hasVerifySql) issues.push(`${loc}/${slug} mutation lesson missing verify_sql SELECT`)
    }
  }
}

const enSlugs = fs
  .readdirSync(path.join(root, 'en'))
  .map((f) => f.replace(/\.md$/, ''))
  .sort()
  .join(',')
const viSlugs = fs
  .readdirSync(path.join(root, 'vi'))
  .map((f) => f.replace(/\.md$/, ''))
  .sort()
  .join(',')
if (enSlugs !== viSlugs) issues.push('en/vi slug mismatch')

for (const slug of expected) {
  const en = parsedByLocale.en[slug]
  const vi = parsedByLocale.vi[slug]
  if (!en || !vi) continue
  if (en.id !== vi.id) issues.push(`${slug} id mismatch en=${en.id} vi=${vi.id}`)
  if (en.track !== vi.track) issues.push(`${slug} track mismatch`)
  if (en.order !== vi.order) issues.push(`${slug} order mismatch`)
}

if (issues.length) {
  console.log('FAIL')
  console.log(issues.join('\n'))
  process.exit(1)
}
console.log(`PASS pedagogy+order+parity 42; IT V2 migrated ${v2Migrated.length}`)
