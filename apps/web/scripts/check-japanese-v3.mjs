import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const slugs = [
  'politeness',
  'politeness-checkpoint',
  'politeness-review',
  'people',
  'numbers',
  'family',
  'food-drink',
  'places',
]
const read = (path) => readFileSync(path, 'utf8')

function assessedIds(body) {
  return [...body.matchAll(/^\s+(?:-\s+)?id:\s*([a-z0-9-]+)\s*$/gim)].map((match) => match[1])
}

describe('Japanese N5 curriculum v3', () => {
  it('uses guided listening, retrieval, production and stable IDs in both explanation locales', () => {
    for (const slug of slugs) {
      for (const locale of ['en', 'vi']) {
        const body = read(join(repoRoot, `docs/curriculum/japanese-jlpt/${locale}/${slug}.md`))
        assert.match(body, /^can_do:\s*".+"/m, `${locale}/${slug} missing Can-Do`)
        assert.match(body, /^\s+- type:\s*scene\s*$/m, `${locale}/${slug} missing scene`)
        assert.match(body, /^\s+- type:\s*dialogue\s*$/m, `${locale}/${slug} missing dialogue`)
        assert.match(body, /^\s+- type:\s*listen\s*$/m, `${locale}/${slug} missing listen`)
        assert.match(body, /^\s+- type:\s*practice\s*$/m, `${locale}/${slug} missing practice`)
        assert.match(body, /^\s+- type:\s*checkpoint\s*$/m, `${locale}/${slug} missing checkpoint`)
        assert.match(
          body,
          /^\s+kind:\s*(?:type_answer|listen_type)\s*$/m,
          `${locale}/${slug} missing controlled recall/production`,
        )
        assert.doesNotMatch(body, /^\s+kind:\s*mcq\s*$/m, `${locale}/${slug} still authors generic mcq`)
        assert.ok(assessedIds(body).length >= 5, `${locale}/${slug} needs stable assessed IDs`)
        assert.match(body, /reading:\s*"[^\"]+"/, `${locale}/${slug} missing Japanese reading support`)
      }
    }
  })

  it('keeps vi/en variants on the same review-item identity', () => {
    for (const slug of slugs) {
      const en = read(join(repoRoot, `docs/curriculum/japanese-jlpt/en/${slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/japanese-jlpt/vi/${slug}.md`))
      assert.deepEqual(assessedIds(vi), assessedIds(en), `${slug} assessed IDs drifted between locales`)
    }
  })

  it('preserves Japanese-specific pragmatic distinctions', () => {
    const polite = read(join(repoRoot, 'docs/curriculum/japanese-jlpt/en/politeness.md'))
    assert.match(polite, /これをください/)
    assert.match(polite, /Do not treat ください as a direct one-word copy/)

    const family = read(join(repoRoot, 'docs/curriculum/japanese-jlpt/en/family.md'))
    assert.match(family, /母/)
    assert.match(family, /speaking about your own family/)

    const places = read(join(repoRoot, 'docs/curriculum/japanese-jlpt/en/places.md'))
    assert.match(places, /ここ/)
    assert.match(places, /そこ/)
    assert.match(places, /あそこ/)
    assert.match(places, /viewpoint/)
  })
})
