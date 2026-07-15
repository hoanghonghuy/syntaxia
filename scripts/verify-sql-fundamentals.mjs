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
]

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
    order: Number(get('order')),
    slug: get('slug').replace(/['"]/g, ''),
    hasHints: /hints:\s*\n\s*-/.test(fm),
    hasSol: /solution:/.test(fm),
    hasPrev: /preview:/.test(fm),
    hasExp: /expected:/.test(fm),
    hasSeed: /sandbox_seed:/.test(fm),
    leadingH1: /^\s*#\s+[^#]/m.test(body),
    table: /\|\s*-+/.test(body),
    mistakes: /Common mistakes|Lỗi thường gặp/i.test(body),
    published: get('published'),
  }
}

const issues = []
for (const loc of ['en', 'vi']) {
  const dir = path.join(root, loc)
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  if (files.length !== 36) issues.push(`${loc} file count ${files.length}`)
  const bySlug = {}
  for (const f of files) {
    const p = parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    const slug = f.replace(/\.md$/, '')
    bySlug[slug] = p
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

if (issues.length) {
  console.log('FAIL')
  console.log(issues.join('\n'))
  process.exit(1)
}
console.log('PASS pedagogy+order+parity 36')
