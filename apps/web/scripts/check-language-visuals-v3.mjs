import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { practiceFromStep } from '../app/utils/languageLesson.ts'
import {
  LANGUAGE_VISUAL_KEYS,
  isAppOwnedLanguageImageUrl,
  isLanguageVisualKey,
  languageVisualAsset,
} from '../app/utils/languageVisual.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (path) => readFileSync(path, 'utf8')
const languageCurriculumDirs = [
  'english-basics',
  'chinese-hsk',
  'japanese-jlpt',
  'chinese-it-vocab',
]

function markdownFiles(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return markdownFiles(path)
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : []
  })
}

describe('language v3 semantic visuals', () => {
  it('uses a closed app-owned visual registry with provenance', () => {
    assert.deepEqual(LANGUAGE_VISUAL_KEYS, [
      'classmates-meeting',
      'student-leaving',
      'student-studying',
      'shop-counter-request',
      'home-room',
      'weekend-plan',
      'tech-repair-desk',
      'qr-code-login',
      'ai-project-flow',
      'model-training-monitor',
      'nlp-context-window',
      'china-tech-hubs',
    ])
    for (const key of LANGUAGE_VISUAL_KEYS) {
      assert.equal(isLanguageVisualKey(key), true)
      assert.equal(languageVisualAsset(key)?.provenance, 'syntaxia-original')
      assert.ok(languageVisualAsset(key)?.learningSignal)
    }
    assert.equal(isLanguageVisualKey('random-external-asset'), false)
  })

  it('accepts only app-owned language image paths for legacy/static fallbacks', () => {
    assert.equal(isAppOwnedLanguageImageUrl('/language/scenes/cafe.webp'), true)
    assert.equal(isAppOwnedLanguageImageUrl('https://example.com/cafe.webp'), false)
    assert.equal(isAppOwnedLanguageImageUrl('//cdn.example.com/cafe.webp'), false)
    assert.equal(isAppOwnedLanguageImageUrl('/language/../secret.webp'), false)
    assert.equal(isAppOwnedLanguageImageUrl('/language/%2e%2e/secret.webp'), false)
    assert.equal(isAppOwnedLanguageImageUrl('/language/cafe.webp?remote=https://example.com/x'), false)
  })

  it('preserves visualKey through the authored exercise parser', () => {
    const exercise = practiceFromStep({
      type: 'practice',
      id: 'visual-1',
      kind: 'image_choice',
      prompt: 'Pick the scene',
      choices: ['meeting', 'leaving'],
      choiceMedia: [
        { value: 'meeting', visualKey: 'classmates-meeting', alt: 'Two students greet.' },
        { value: 'leaving', visualKey: 'student-leaving', alt: 'One student leaves.' },
      ],
      answer: 'meeting',
    })
    assert.equal(exercise?.type, 'image_choice')
    assert.equal(exercise?.choiceMedia?.[0]?.visualKey, 'classmates-meeting')
    assert.equal(exercise?.choiceMedia?.[1]?.visualKey, 'student-leaving')
  })

  it('renders semantic visuals in scenes and image choices without exposing internal ids', () => {
    assert.equal(existsSync(join(webRoot, 'app/components/LanguageSemanticVisual.vue')), true)
    const steps = read(join(webRoot, 'app/components/LanguageLessonSteps.vue'))
    const exercise = read(join(webRoot, 'app/components/LanguageExercise.vue'))
    assert.match(steps, /LanguageSemanticVisual/)
    assert.match(steps, /sceneVisualKey/)
    assert.match(steps, /isAppOwnedLanguageImageUrl/)
    assert.match(exercise, /LanguageSemanticVisual/)
    assert.match(exercise, /choiceAriaLabel/)
    assert.match(exercise, /exercise\.type !== 'image_choice' \|\| !hasChoiceVisual\(choice\)/)
    assert.match(exercise, /isAppOwnedLanguageImageUrl/)
  })

  it('ships semantic scenes for core language and specialty production seeds', () => {
    const expected = [
      ['english-basics', 'greetings', 'classmates-meeting'],
      ['english-basics', 'time-of-day', 'student-studying'],
      ['english-basics', 'prices', 'shop-counter-request'],
      ['english-basics', 'home-things', 'home-room'],
      ['english-basics', 'hobbies', 'weekend-plan'],
      ['chinese-hsk', 'greetings', 'classmates-meeting'],
      ['japanese-jlpt', 'politeness', 'shop-counter-request'],
      ['chinese-it-vocab', 'hardware-software', 'tech-repair-desk'],
      ['chinese-it-vocab', 'internet-apps', 'qr-code-login'],
      ['chinese-it-vocab', 'ai-basics', 'ai-project-flow'],
      ['chinese-it-vocab', 'deep-learning', 'model-training-monitor'],
      ['chinese-it-vocab', 'nlp-basics', 'nlp-context-window'],
      ['chinese-it-vocab', 'tech-hubs', 'china-tech-hubs'],
    ]
    for (const locale of ['en', 'vi']) {
      for (const [track, slug, visualKey] of expected) {
        const body = read(join(repoRoot, `docs/curriculum/${track}/${locale}/${slug}.md`))
        assert.match(body, new RegExp(`visualKey: "${visualKey}"`))
        assert.match(body, /imageAlt: ".+"/)
      }
    }
  })

  it('ships app-owned sound-to-symbol visuals across the Japanese script foundation', () => {
    const expected = [
      ['kana-sounds', 'japanese-vowel-kana.svg', ['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ']],
      ['hiragana-patterns', 'japanese-hiragana-patterns.svg', ['か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'ぎ', 'しょ', 'ん']],
      ['katakana-patterns', 'japanese-katakana-patterns.svg', ['か', 'き', 'く', 'け', 'こ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'カメラ', 'コーヒー']],
      ['mora-length', 'japanese-mora-timing.svg', ['お', 'か', 'あ', 'さ', 'ん', 'き', 'っ', 'ぷ', 'コ', 'ー', 'ヒ']],
    ]

    for (const [slug, assetName, tokens] of expected) {
      const assetPath = join(webRoot, 'public/language/scenes', assetName)
      assert.equal(existsSync(assetPath), true, `${assetName} must be app-owned`)
      const asset = read(assetPath)
      for (const token of tokens) {
        assert.ok(asset.includes(`>${token}<`), `${assetName} must visibly teach ${token}`)
      }

      for (const locale of ['en', 'vi']) {
        const body = read(join(repoRoot, `docs/curriculum/japanese-jlpt/${locale}/${slug}.md`))
        assert.match(body, new RegExp(`imageUrl: "\\/language\\/scenes\\/${assetName.replace('.', '\\.')}"`))
        assert.match(body, /imageAlt: ".+"/)
      }
    }
  })

  it('ships app-owned structural visuals for the English grammar foundation', () => {
    const expected = [
      ['core-sentences', 'english-be-sentence-frame.svg', ['I', 'am', 'a student', 'She', 'is', 'a teacher', 'They', 'are', 'students']],
      ['basic-questions', 'english-question-frames.svg', ['You are a student.', 'Are you a student?', 'You are from Hanoi.', 'Where are you from?', 'You like music.', 'Do you like music?']],
    ]

    for (const [slug, assetName, tokens] of expected) {
      const assetPath = join(webRoot, 'public/language/scenes', assetName)
      assert.equal(existsSync(assetPath), true, `${assetName} must be app-owned`)
      const asset = read(assetPath)
      for (const token of tokens) {
        assert.ok(asset.includes(`>${token}<`), `${assetName} must visibly teach ${token}`)
      }

      for (const locale of ['en', 'vi']) {
        const body = read(join(repoRoot, `docs/curriculum/english-basics/${locale}/${slug}.md`))
        assert.match(body, new RegExp(`imageUrl: "\\/language\\/scenes\\/${assetName.replace('.', '\\.')}"`))
        assert.match(body, /imageAlt: ".+"/)
      }
    }
  })

  it('ships an app-owned meaning-and-frame visual for Mandarin adjective contrasts', () => {
    const assetName = 'mandarin-adjective-contrasts.svg'
    const assetPath = join(webRoot, 'public/language/scenes', assetName)
    assert.equal(existsSync(assetPath), true)
    const asset = read(assetPath)
    for (const token of ['大', '小', '热', '冷', '水', '很']) {
      assert.ok(asset.includes(`>${token}<`), `${assetName} must visibly teach ${token}`)
    }

    for (const locale of ['en', 'vi']) {
      const body = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/adjectives.md`))
      assert.match(body, /imageUrl: "\/language\/scenes\/mandarin-adjective-contrasts\.svg"/)
      assert.match(body, /imageAlt: ".+"/)
      assert.match(body, /水很冷/)
    }
  })

  it('keeps the English image-choice exercise on stable semantic ids', () => {
    for (const locale of ['en', 'vi']) {
      const body = read(join(repoRoot, `docs/curriculum/english-basics/${locale}/greetings.md`))
      assert.match(body, /id: greet-scene-1/)
      assert.match(body, /kind: image_choice/)
      assert.match(body, /value: "meeting", visualKey: "classmates-meeting"/)
      assert.match(body, /value: "leaving", visualKey: "student-leaving"/)
      assert.match(body, /value: "studying", visualKey: "student-studying"/)
    }
  })

  it('rejects hotlinked imageUrl authoring across language curriculum', () => {
    for (const trackDir of languageCurriculumDirs) {
      const dir = join(repoRoot, 'docs/curriculum', trackDir)
      for (const path of markdownFiles(dir)) {
        const body = read(path)
        assert.doesNotMatch(body, /imageUrl:\s*["']?https?:\/\//i, `${path} hotlinks a language image`)
      }
    }
  })
})
