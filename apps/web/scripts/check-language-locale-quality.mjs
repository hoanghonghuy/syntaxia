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
  return body
    .split('\n')
    .filter((line) => /^\s*(?:title|body|prompt|gloss|explanation|hints):/.test(line))
    .join('\n')
}

const mandarinViEnglishLeak = /\b(?:listen first|listen and|choose (?:the|a)|which (?:word|chunk|phrase|pinyin)|type (?:the|a)|someone says|standard pinyin|mandarin tones|natural speech|speech before|correct answer|try again)\b/i

// English target forms are intentionally present in the Vietnamese English course,
// so this guard only rejects unmistakable English *instructional prose* that should
// have been localized. Target phrases such as “I like …”, “Do you want to …?”, IPA,
// and example sentences are allowed.
const englishTrackViProseLeak = /\b(?:things|works for|instead of|the target|target (?:word|phrase)|listen first|listen and choose|choose the|which (?:word|phrase|sentence|answer)|type the|someone says|start with|use the)\b/i

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
      const body = read(join(webRoot, 'public/language/scenes', asset))
      assert.doesNotMatch(body, forbiddenVisualCopy, `${asset} contains explanation-locale copy`)
    }
  })

  it('keeps Vietnamese Mandarin instructional copy in Vietnamese', () => {
    const dir = join(repoRoot, 'docs/curriculum/chinese-hsk/vi')
    for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
      const body = read(join(dir, file))
      assert.doesNotMatch(
        explanatoryLines(body),
        mandarinViEnglishLeak,
        `chinese-hsk/vi/${file} leaks English instructional copy`,
      )
    }
  })

  it('keeps Vietnamese English-track explanations localized while allowing target English', () => {
    const dir = join(repoRoot, 'docs/curriculum/english-basics/vi')
    for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
      const body = read(join(dir, file))
      assert.doesNotMatch(
        explanatoryLines(body),
        englishTrackViProseLeak,
        `english-basics/vi/${file} leaks English instructional prose`,
      )
    }
  })

  it('requires enough lexical material in every Mandarin communicative lesson node', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-hsk/${locale}`)
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const body = read(join(dir, file))
        if (scalar(body, 'unit_role') !== 'lesson') continue
        if (scalar(body, 'foundation_focus') === 'pronunciation') continue
        assert.ok(
          vocabCount(body) >= 6,
          `${locale}/${file} has only ${vocabCount(body)} vocab items; communicative lessons need >= 6`,
        )
        assert.ok(scalar(body, 'pattern'), `${locale}/${file} missing an explicit reusable pattern`)
      }
    }
  })

  it('requires enough lexical material in every English communicative lesson node', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/english-basics/${locale}`)
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const body = read(join(dir, file))
        if (scalar(body, 'unit_role') !== 'lesson') continue
        if (scalar(body, 'unit_order') === '0') continue
        assert.ok(
          vocabCount(body) >= 5,
          `${locale}/${file} has only ${vocabCount(body)} vocab items; English communicative lessons need >= 5`,
        )
        assert.ok(scalar(body, 'pattern'), `${locale}/${file} missing an explicit reusable pattern`)
      }
    }
  })
})
