import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webRoot = join(__dirname, '..')

function read(rel) {
  return readFileSync(join(webRoot, rel), 'utf8')
}

describe('web bundle contract', () => {
  it('lazy-loads heavy lesson sandboxes instead of eager route imports', () => {
    const lessonPage = read('app/pages/tracks/[track]/lessons/[slug].vue')

    for (const component of ['HtmlCssSandbox', 'JsSandbox', 'SqlSandbox']) {
      assert.match(
        lessonPage,
        new RegExp(`<Lazy${component}\\b`),
        `${component} should use Nuxt's Lazy component convention`,
      )
      assert.doesNotMatch(
        lessonPage,
        new RegExp(`<${component}\\b`),
        `${component} must not be eagerly referenced by the lesson route`,
      )
    }
  })

  it('keeps sandbox loading conditional on an authored exercise', () => {
    const lessonPage = read('app/pages/tracks/[track]/lessons/[slug].vue')

    assert.match(lessonPage, /<LazyHtmlCssSandbox\s+v-else-if="lesson\.exercise && isHtmlCssTrack"/)
    assert.match(lessonPage, /<LazyJsSandbox\s+v-else-if="lesson\.exercise && trackId === 'javascript-basics'"/)
    assert.match(lessonPage, /<LazySqlSandbox\s+v-else-if="lesson\.exercise"/)
  })
})
