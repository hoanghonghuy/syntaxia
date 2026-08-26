import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sidebar = readFileSync(join(webRoot, 'app/components/LearnSidebar.vue'), 'utf8')
const lessonPage = readFileSync(join(webRoot, 'app/pages/tracks/[track]/lessons/[slug].vue'), 'utf8')
const searchPage = readFileSync(join(webRoot, 'app/pages/search.vue'), 'utf8')

describe('language navigation path contract', () => {
  it('uses the canonical language path state instead of exposing future sidebar lessons', () => {
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

  it('keeps non-language sidebar tracks freely navigable', () => {
    assert.match(sidebar, /if \(!isLanguageTrack\.value\) return true/)
  })

  it('prevents the lesson pager from linking to locked future language lessons', () => {
    assert.match(lessonPage, /buildLanguageUnits\(sortedLessons\.value, catalog\.progress, locale\.value\)/)
    assert.match(lessonPage, /function pagerLessonAt\(index: number\)/)
    assert.match(lessonPage, /if \(!isLanguageTrack\.value\) return candidate/)
    assert.match(lessonPage, /languageNodesById\.value\.get\(candidate\.id\)\?\.clickable \? candidate : null/)
    assert.match(lessonPage, /const nextLesson = computed\(\(\) => pagerLessonAt\(currentIndex\.value \+ 1\)\)/)
  })

  it('keeps locked language search hits visible but non-navigable', () => {
    assert.match(searchPage, /buildLanguageUnits\(lessons, catalog\.progress, locale\.value\)/)
    assert.match(searchPage, /v-if="lessonClickable\(lesson\)"/)
    assert.match(searchPage, /class="nav-link search-lesson-locked"/)
    assert.match(searchPage, /:aria-disabled="true"/)
    assert.match(searchPage, /async function loadSearchData\(loc: string\)[\s\S]*catalog\.loadProgress\(\)/)
  })
})
