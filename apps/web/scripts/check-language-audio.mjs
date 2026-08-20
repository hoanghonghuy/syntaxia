/**
 * Language step audio helpers.
 * Run: node --experimental-strip-types --test scripts/check-language-audio.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  canUseSpeechSynthesis,
  playLanguageAudio,
  shouldRevealTranscriptAfterListen,
  speakLanguageText,
  speechLangForTrack,
} from '../app/utils/languageAudio.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

describe('language-step-audio', () => {
  it('maps tracks to speech language tags without guessing an unknown language', () => {
    assert.equal(speechLangForTrack('chinese-hsk'), 'zh-CN')
    assert.equal(speechLangForTrack('chinese-it-vocab'), 'zh-CN')
    assert.equal(speechLangForTrack('english-basics'), 'en-US')
    assert.equal(speechLangForTrack('japanese-jlpt'), 'ja-JP')
    assert.equal(speechLangForTrack('future-language-track'), '')
  })

  it('speakLanguageText uses synthesis only with text and a known language', () => {
    const spoken = []
    const speech = {
      cancel() {},
      speak(u) {
        spoken.push(u)
      },
    }
    function FakeUtterance(text) {
      this.text = text
      this.lang = ''
    }
    assert.equal(canUseSpeechSynthesis(speech), true)
    assert.equal(
      speakLanguageText('你好', 'zh-CN', speech, FakeUtterance),
      true,
    )
    assert.equal(spoken.length, 1)
    assert.equal(spoken[0].text, '你好')
    assert.equal(spoken[0].lang, 'zh-CN')
    assert.equal(speakLanguageText('  ', 'zh-CN', speech, FakeUtterance), false)
    assert.equal(speakLanguageText('hello', '', speech, FakeUtterance), false)
    assert.equal(speakLanguageText('hi', 'en-US', null, FakeUtterance), false)
  })

  it('playLanguageAudio prefers audioUrl then TTS', async () => {
    const played = []
    const spoken = []
    const speech = {
      cancel() {},
      speak(u) {
        spoken.push(u.text)
      },
    }
    function FakeUtterance(text) {
      this.text = text
      this.lang = ''
    }
    const modeAudio = await playLanguageAudio('https://example.com/a.mp3', 'x', 'en-US', {
      playUrl: async (url) => {
        played.push(url)
      },
      speech,
      Utterance: FakeUtterance,
    })
    assert.equal(modeAudio, 'audio')
    assert.deepEqual(played, ['https://example.com/a.mp3'])

    const modeTts = await playLanguageAudio(undefined, 'hello', 'en-US', {
      speech,
      Utterance: FakeUtterance,
    })
    assert.equal(modeTts, 'tts')
    assert.deepEqual(spoken, ['hello'])

    const modeUnknown = await playLanguageAudio(undefined, 'hello', '', {
      speech,
      Utterance: FakeUtterance,
    })
    assert.equal(modeUnknown, 'none')
  })

  it('keeps transcript hidden after successful playback and reveals on unavailable audio', () => {
    assert.equal(shouldRevealTranscriptAfterListen('audio'), false)
    assert.equal(shouldRevealTranscriptAfterListen('tts'), false)
    assert.equal(shouldRevealTranscriptAfterListen('none'), true)
  })

  it('wires audio-first transcript gating into LanguageLessonSteps', () => {
    assert.equal(existsSync(join(webRoot, 'app/components/LanguageListenButton.vue')), true)
    const steps = read(join(webRoot, 'app/components/LanguageLessonSteps.vue'))
    assert.match(steps, /LanguageListenButton/)
    assert.match(steps, /@activated="onListenActivated"/)
    assert.match(steps, /shouldRevealTranscriptAfterListen/)
    assert.match(steps, /showTranscriptLabel/)
    assert.match(steps, /Hiện lời thoại/)
    assert.match(steps, /Show transcript/)
    assert.doesNotMatch(steps, /@activated="listenRevealed = true"/)
  })

  it('ships the v3 content-quality contract and current source-of-truth links', () => {
    const qualityPath = join(repoRoot, 'docs/processes/language-content-quality-v3.md')
    assert.equal(existsSync(qualityPath), true)
    const quality = read(qualityPath)
    assert.match(quality, /Visuals MUST carry learning information/)
    assert.match(quality, /MUST NOT automatically reveal the transcript/)
    assert.match(quality, /Do not mass-generate more curriculum/)

    const index = read(join(repoRoot, 'docs/processes/README.md'))
    assert.match(index, /language-learning-pedagogy-v3\.md/)
    assert.match(index, /language-content-quality-v3\.md/)

    const checklist = read(join(repoRoot, 'docs/processes/product-perfection-checklist.md'))
    assert.match(checklist, /Language V3 production-quality arc/)
    assert.match(checklist, /Semantic visual asset pipeline/)
    assert.match(checklist, /True communicative unit model/)
  })
})
