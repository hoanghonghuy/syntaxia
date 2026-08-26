import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { buildLanguageUnits } from '../app/utils/languageUnits.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sidebar = readFileSync(join(webRoot, 'app/components/LearnSidebar.vue'), 'utf8')
const lessonPage = readFileSync(join(webRoot, 'app/pages/tracks/[track]/lessons/[slug].vue'), 'utf8')
const searchPage = readFileSync(join(webRoot, 'app/pages/search.vue'), 'utf8')
const unitPath = readFileSync(join(webRoot, 'app/components/LanguageUnitPath.vue'), 'utf8')

describe('language navigation path contract', () => {
  it('keeps signed-in sequential lock while guests may read every published lesson', () => {
    const lessons = [
      { id: 'l1', locale: 'en', trackId: 'english-basics', slug: 'one', title: 'One', sortOrder: 1, published: true },
      { id: 'l2', locale: 'en', trackId: 'english-basics', slug: 'two', title: 'Two', sortOrder: 2, published: true },
      { id: 'l3', locale: 'en', trackId: 'english-basics', slug: 'three', title: 'Three', sortOrder: 3, published: true },
    ]

    const member = buildLanguageUnits(lessons, [], 'en')
    assert.deepEqual(member.flatMap((unit) => unit.nodes.map((node) => node.state)), ['current', 'locked', 'locked'])
    assert.deepEqual(member.flatMap((unit) => unit.nodes.map((node) => node.clickable)), [true, false, false])

    const guest = buildLanguageUnits(lessons, [], 'en', { unlockAll: true })
    assert.deepEqual(guest.flatMap((unit) => unit.nodes.map((node) => node.state)), ['current', 'available', 'available'])
    assert.equal(guest.flatMap((unit) => unit.nodes).every((node) => node.clickable), true)
  })

  it('uses the canonical language path state instead of exposing signed-in future sidebar lessons', () => {
    assert.match(sidebar, /buildLanguageUnits\([\s\S]*\{ unlockAll: !auth\.user \}/)
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

  it('prevents signed-in lesson pager links to locked future language lessons without blocking guests', () => {
    assert.match(lessonPage, /buildLanguageUnits\([\s\S]*\{ unlockAll: !auth\.user \}/)
    assert.match(lessonPage, /function pagerLessonAt\(index: number\)/)
    assert.match(lessonPage, /if \(!isLanguageTrack\.value\) return candidate/)
    assert.match(lessonPage, /languageNodesById\.value\.get\(candidate\.id\)\?\.clickable \? candidate : null/)
    assert.match(lessonPage, /const nextLesson = computed\(\(\) => pagerLessonAt\(currentIndex\.value \+ 1\)\)/)
  })

  it('keeps signed-in locked language search hits visible but non-navigable without blocking guests', () => {
    assert.match(searchPage, /buildLanguageUnits\([\s\S]*\{ unlockAll: !auth\.user \}/)
    assert.match(searchPage, /v-if="lessonClickable\(lesson\)"/)
    assert.match(searchPage, /class="nav-link search-lesson-locked"/)
    assert.match(searchPage, /:aria-disabled="true"/)
    assert.match(searchPage, /async function loadSearchData\(loc: string\)[\s\S]*catalog\.loadProgress\(\)/)
  })

  it('keeps the track unit path public for guests while preserving member progress state', () => {
    assert.match(unitPath, /const auth = useAuthStore\(\)/)
    assert.match(unitPath, /\{ unlockAll: !auth\.user \}/)
  })
})
