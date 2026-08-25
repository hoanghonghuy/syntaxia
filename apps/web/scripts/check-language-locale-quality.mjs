import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|'([^']+)'|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || match?.[3] || '').trim()
}

function vocabCount(body) {
  const section = body.match(/^vocab:\s*\n([\s\S]*?)(?=^steps:\s*$)/m)?.[1] || ''
  return [...section.matchAll(/^\s+-\s+\{/gm)].length
}

function explanatoryLines(body) {
  return body.split('\n').filter((line) => /^\s*(?:title|body|prompt|gloss|explanation|hints):/.test(line)).join('\n')
}

const mandarinViEnglishLeak = /\b(?:listen first|listen and|choose (?:the|a)|which (?:word|chunk|phrase|pinyin)|type (?:the|a)|someone says|standard pinyin|mandarin tones|natural speech|speech before|correct answer|try again)\b/i
const englishTrackViProseLeak = /\b(?:things|works for|instead of|the target|target (?:word|phrase)|listen first|listen and choose|choose the|which (?:word|phrase|sentence|answer)|type the|someone says|start with|use the)\b/i
const japaneseViEnglishLeak = /\b(?:listen first|listen and|choose the|which (?:word|reading|particle|sentence|answer)|type the|start with|use the|correct answer|try again|the learner|the word|the sentence)\b/i

const localeNeutralVisuals = [
  'pinyin-syllable-anatomy.svg',
  'mandarin-tone-ladder.svg',
  'mandarin-tone-flow.svg',
  'english-sound-spelling.svg',
  'english-word-stress.svg',
  'english-sentence-melody.svg',
]
const forbiddenVisualCopy = /(?:Pinyin syllable anatomy|\binitial\b|\bfinal\b|Mandarin tones|standard Pinyin|natural 3 \+ 3 flow|speech before tone 4|spelling helps you find the word|sound tells you how to say it|One syllable carries the beat|Listen to the shape of the whole phrase|\bsettles\b|often rises|often falls|These are useful listening patterns)/i

describe('language locale and content quality', () => {
  it('keeps shared pronunciation diagrams free of explanation-locale copy', () => {
    for (const asset of localeNeutralVisuals) {
      assert.doesNotMatch(read(join(webRoot, 'public/language/scenes', asset)), forbiddenVisualCopy, `${asset} contains explanation-locale copy`)
    }
  })

  for (const [track, leak] of [
    ['chinese-hsk', mandarinViEnglishLeak],
    ['english-basics', englishTrackViProseLeak],
    ['japanese-jlpt', japaneseViEnglishLeak],
  ]) {
    it(`keeps ${track} Vietnamese instructional explanations localized`, () => {
      const dir = join(repoRoot, `docs/curriculum/${track}/vi`)
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        assert.doesNotMatch(explanatoryLines(read(join(dir, file))), leak, `${track}/vi/${file} leaks English instructional prose`)
      }
    })
  }

  it('requires enough lexical material in every Mandarin communicative lesson node', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-hsk/${locale}`)
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const body = read(join(dir, file))
        if (scalar(body, 'unit_role') !== 'lesson' || scalar(body, 'foundation_focus') === 'pronunciation') continue
        assert.ok(vocabCount(body) >= 6, `${locale}/${file} has only ${vocabCount(body)} vocab items; Mandarin communicative lessons need >= 6`)
        assert.ok(scalar(body, 'pattern'), `${locale}/${file} missing an explicit reusable pattern`)
      }
    }
  })

  it('requires enough lexical material in every English communicative lesson node', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/english-basics/${locale}`)
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const body = read(join(dir, file))
        if (scalar(body, 'unit_role') !== 'lesson' || scalar(body, 'unit_order') === '0') continue
        assert.ok(vocabCount(body) >= 5, `${locale}/${file} has only ${vocabCount(body)} vocab items; English communicative lessons need >= 5`)
        assert.ok(scalar(body, 'pattern'), `${locale}/${file} missing an explicit reusable pattern`)
      }
    }
  })

  it('requires enough lexical material in every Japanese communicative lesson node', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/japanese-jlpt/${locale}`)
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const body = read(join(dir, file))
        if (scalar(body, 'unit_role') !== 'lesson' || scalar(body, 'unit_order') === '0') continue
        assert.ok(vocabCount(body) >= 5, `${locale}/${file} has only ${vocabCount(body)} vocab items; Japanese communicative lessons need >= 5`)
        assert.ok(scalar(body, 'pattern'), `${locale}/${file} missing an explicit reusable pattern`)
      }
    }
  })
})
