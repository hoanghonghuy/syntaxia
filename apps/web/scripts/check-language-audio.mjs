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
  speakLanguageText,
  speechLangForTrack,
} from '../app/utils/languageAudio.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (abs) => readFileSync(abs, 'utf8')

describe('language-step-audio', () => {
  it('maps tracks to speech language tags', () => {
    assert.equal(speechLangForTrack('chinese-hsk'), 'zh-CN')
    assert.equal(speechLangForTrack('chinese-it-vocab'), 'zh-CN')
    assert.equal(speechLangForTrack('english-basics'), 'en-US')
    assert.equal(speechLangForTrack('japanese-jlpt'), 'ja-JP')
  })

  it('speakLanguageText uses synthesis when available', () => {
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
  })

  it('wires Listen into LanguageLessonSteps and ships button', () => {
    assert.equal(existsSync(join(webRoot, 'app/components/LanguageListenButton.vue')), true)
    const steps = read(join(webRoot, 'app/components/LanguageLessonSteps.vue'))
    assert.match(steps, /LanguageListenButton/)
    assert.match(steps, /trackId/)
  })
})
