import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sidebar = readFileSync(join(webRoot, 'app/components/LearnSidebar.vue'), 'utf8')

describe('language sidebar path contract', () => {
  it('uses the canonical language path state instead of exposing future lessons', () => {
    assert.match(sidebar, /buildLanguageUnits\(rawLessons\.value, catalog\.progress, locale\.value\)/)
    assert.match(sidebar, /v-if="lessonClickable\(item\.id\)"/)
    assert.match(sidebar, /:aria-disabled="true"/)
    assert.match(sidebar, /class="nav-link is-locked"/)
    assert.match(sidebar, /clickable:\s*node\.clickable/)
  })

  it('keeps authored ordering internal and shows learner-facing ordinal numbers', () => {
    assert.match(sidebar, /orderLanguageLessons\(rawLessons\.value\)/)
    assert.match(sidebar, /v-for="\(item, index\) in lessons"/)
    assert.match(sidebar, /\{\{ index \+ 1 \}\}/)
    assert.doesNotMatch(sidebar, /\{\{ item\.sortOrder \}\}/)
  })

  it('keeps non-language tracks freely navigable', () => {
    assert.match(sidebar, /if \(!isLanguageTrack\.value\) return true/)
  })
})
