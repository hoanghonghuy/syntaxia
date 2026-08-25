import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  LANGUAGE_SOLUTION_REVEAL_ATTEMPTS,
  canRevealLanguageSolution,
  languageExerciseSolution,
  progressiveLanguageHintCount,
} from '../app/utils/languageFeedback.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (path) => readFileSync(path, 'utf8')

describe('language v3 feedback and remediation', () => {
  it('reveals hints progressively after failed attempts without exceeding authored hints', () => {
    assert.equal(progressiveLanguageHintCount(0, 0, 3), 0)
    assert.equal(progressiveLanguageHintCount(1, 0, 3), 1)
    assert.equal(progressiveLanguageHintCount(2, 0, 3), 2)
    assert.equal(progressiveLanguageHintCount(1, 3, 3), 3)
    assert.equal(progressiveLanguageHintCount(8, 0, 2), 2)
  })

  it('does not allow solution reveal before the remediation threshold', () => {
    assert.equal(LANGUAGE_SOLUTION_REVEAL_ATTEMPTS, 3)
    assert.equal(canRevealLanguageSolution(0), false)
    assert.equal(canRevealLanguageSolution(2), false)
    assert.equal(canRevealLanguageSolution(3), true)
  })

  it('formats learner-facing solutions instead of leaking canonical match encodings', () => {
    assert.equal(languageExerciseSolution({
      type: 'match_pairs',
      prompt: 'Match',
      answer: 'hello=xin chào|thanks=cảm ơn',
      pairs: [
        { left: 'hello', right: 'xin chào' },
        { left: 'thanks', right: 'cảm ơn' },
      ],
    }), 'hello → xin chào · thanks → cảm ơn')

    assert.equal(languageExerciseSolution({
      type: 'type_answer',
      prompt: 'Answer',
      answer: 'Hi, I\'m Mai',
    }), "Hi, I'm Mai")
  })

  it('wires progressive remediation into the exercise renderer', () => {
    const body = read(join(webRoot, 'app/components/LanguageExercise.vue'))
    assert.match(body, /progressiveLanguageHintCount/)
    assert.match(body, /canRevealLanguageSolution/)
    assert.match(body, /solutionRevealed/)
    assert.match(body, /t\('lesson\.showSolution'\)/)
    assert.match(body, /t\('lesson\.solutionLabel'\)/)
    assert.match(body, /if \(!ok\) failedAttempts\.value \+= 1/)
    assert.doesNotMatch(body, /solutionRevealed\.value[\s\S]{0,120}emit\('passed'\)/)
  })

  it('keeps keyboard, touch-target and screen-reader affordances in the renderer', () => {
    const body = read(join(webRoot, 'app/components/LanguageExercise.vue'))
    assert.match(body, /@keydown\.enter\.prevent="check"/)
    assert.match(body, /:aria-invalid="status === 'fail'/)
    assert.match(body, /role="group"/)
    assert.match(body, /aria-live="polite"/)
    assert.match(body, /min-height: 3rem/)
    assert.match(body, /focus-visible/)
    assert.match(body, /overflow-wrap: anywhere/)
  })
})
