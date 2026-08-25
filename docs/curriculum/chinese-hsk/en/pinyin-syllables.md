---
id: zh-hsk-b1-u00-pinyin
track: chinese-hsk
locale: en
slug: pinyin-syllables
title: "Build a Mandarin syllable"
order: -5
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Pronunciation foundation"
unit_order: 0
unit_can_do: "Hear, identify, and reproduce core Mandarin syllable and tone patterns"
unit_role: lesson
can_do: "Break a beginner Mandarin syllable into sound parts and read tone-marked Pinyin"
pattern: "initial + final + tone"
objectives:
  - "Recognize the initial and final as the main sound parts of a Pinyin syllable"
  - "Treat the tone mark as part of the syllable rather than decoration"
vocab:
  - { hanzi: "你", pinyin: "nǐ", gloss: "you" }
  - { hanzi: "好", pinyin: "hǎo", gloss: "good" }
  - { hanzi: "妈", pinyin: "mā", gloss: "mother / mum" }
  - { hanzi: "八", pinyin: "bā", gloss: "eight" }
steps:
  - type: scene
    title: "Sound lab"
    body: "Before memorizing sentences, learn how one Mandarin syllable is built. Focus on sound first; characters are anchors here."
    imageUrl: "/language/scenes/pinyin-syllable-anatomy.svg"
    imageAlt: "The Pinyin syllable nǐ split into initial n, final i, and third tone."
  - type: listen
    prompt: "Listen to 你, 好, 妈. Each item is one syllable with its own tone."
    text: "你，好，妈"
    reading: "nǐ, hǎo, mā"
  - type: tip
    title: "A useful mental model"
    body: "Most beginner Pinyin syllables can be read as an initial plus a final, with a tone carried by the syllable. Some syllables have no initial."
  - type: teach
    items:
      - { form: "nǐ", reading: "nǐ", gloss: "n + i + third tone", example: "你 nǐ" }
      - { form: "hǎo", reading: "hǎo", gloss: "h + ao + third tone", example: "好 hǎo" }
      - { form: "mā", reading: "mā", gloss: "m + a + first tone", example: "妈 mā" }
  - type: practice
    id: zh-pron-pinyin-hear-ni
    kind: audio_choice
    prompt: "Listen to 你. Which Pinyin matches?"
    audioText: "你"
    choices: ["nǐ", "ní", "nì"]
    answer: "nǐ"
  - type: practice
    id: zh-pron-pinyin-hear-hao
    kind: audio_choice
    prompt: "Listen to 好. Choose its tone-marked Pinyin."
    audioText: "好"
    choices: ["hǎo", "háo", "hào"]
    answer: "hǎo"
  - type: practice
    id: zh-pron-pinyin-type-ma
    kind: type_answer
    prompt: "Type the tone-marked Pinyin for 妈."
    answer: "mā"
    hints: ["The syllable is ma.", "It uses first tone: high and level."]
  - type: checkpoint
    items:
      - id: zh-pron-pinyin-check-ba
        kind: audio_choice
        prompt: "Listen to 八. Which Pinyin is correct?"
        audioText: "八"
        choices: ["bā", "bá", "bǎ"]
        answer: "bā"
      - id: zh-pron-pinyin-check-ni
        kind: type_answer
        prompt: "Type the tone-marked Pinyin for 你."
        answer: "nǐ"
exercise:
  type: type_answer
  prompt: "Type the tone-marked Pinyin for 你."
  answer: "nǐ"
---

This foundation session teaches the sound model before communicative sentence work.
