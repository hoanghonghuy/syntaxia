import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')

// These are learner-facing distractors removed by the final English audit.
// They made an item answerable by spotting broken/implausible English instead
// of understanding the requested meaning or speech act.
const LEGACY_LOW_QUALITY_DISTRACTORS = [
  'See you yesterday.',
  'Nice yesterday.',
  'Good night yesterday.',
  'No problem tomorrow.',
  "I'm goodbye.",
  'Thank yesterday.',
  "You're welcome, goodbye.",
  'Thank please.',
  'Who Linh?',
  'Linh is this?',
  'This friend is who?',
  'Anna is room five.',
  'My this sister.',
  'Who sister my?',
  'Room Linh?',
  "Who's eight?",
  'Daniel who this?',
  "Where's Daniel friend?",
  'My sister this Mai.',
  "Who's my Mai sister?",
  'Who is five?',
  'Five is my friend.',
  "Who's the café?",
  "I'd like the café.",
  'What number park?',
  'Where nine?',
  "Who's nine?",
  "Who's room six?",
  'Five is where?',
  "Who's two?",
  'This is two.',
  'Tea is my friend.',
  "Who's the tea?",
  'Room mother?',
  'Water who?',
  'This is water friend.',
  'Tea who?',
  'Room tea?',
  'I work is eight.',
  'At work who?',
  'What breakfast is time?',
  'Who is breakfast?',
  'Who I …',
  'At then …',
  'Who is this bag?',
  'What time is this bag?',
  'This bag who?',
  'At bag five.',
  'This is at eight.',
  'Bed is who?',
  'What time is my book?',
  'Music is at eight.',
  'How much music?',
  "Who's the park?",
  'No price.',
]

function authoredChoiceLines(raw) {
  return raw.split(/\r?\n/).filter((line) => /^\s*choices:\s*\[/.test(line))
}

describe('English authored distractor quality', () => {
  it('does not reintroduce audited word-salad or implausible distractors', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/english-basics/${locale}`)
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
        const raw = readFileSync(join(dir, file), 'utf8')
        const choiceText = authoredChoiceLines(raw).join('\n')

        for (const distractor of LEGACY_LOW_QUALITY_DISTRACTORS) {
          assert.equal(
            choiceText.includes(`"${distractor}"`),
            false,
            `${locale}/${file}: low-quality distractor returned: ${distractor}`,
          )
        }
      }
    }
  })
})
