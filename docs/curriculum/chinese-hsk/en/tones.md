---
id: zh-hsk-b1-u00-tones
track: chinese-hsk
locale: en
slug: tones
title: "Hear the four tones and the neutral tone"
order: -4
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Pronunciation foundation"
unit_order: 0
unit_can_do: "Hear, identify, and reproduce core Mandarin syllable and tone patterns"
unit_role: lesson
can_do: "Identify the four lexical tones and a neutral-tone syllable in familiar beginner forms"
pattern: "tone 1 / tone 2 / tone 3 / tone 4 / neutral"
objectives:
  - "Associate each of the four tone contours with its Pinyin mark"
  - "Recognize that a neutral-tone syllable is normally written without a tone mark"
vocab:
  - { hanzi: "一", pinyin: "yī", gloss: "one" }
  - { hanzi: "人", pinyin: "rén", gloss: "person" }
  - { hanzi: "你", pinyin: "nǐ", gloss: "you" }
  - { hanzi: "是", pinyin: "shì", gloss: "to be" }
  - { hanzi: "吗", pinyin: "ma", gloss: "question particle" }
steps:
  - type: scene
    title: "Tone ladder"
    body: "The same syllable frame can be carried by different pitch contours. Train your ear before trying to speak quickly."
    imageUrl: "/language/scenes/mandarin-tone-ladder.svg"
    imageAlt: "Five panels show Mandarin tones 1, 2, 3, 4 and the neutral tone."
  - type: listen
    prompt: "Listen to one example of each category: 一, 人, 你, 是, 吗."
    text: "一，人，你，是，吗"
    reading: "yī, rén, nǐ, shì, ma"
  - type: teach
    items:
      - { form: "1", reading: "yī", gloss: "high and level", example: "一 yī" }
      - { form: "2", reading: "rén", gloss: "rising", example: "人 rén" }
      - { form: "3", reading: "nǐ", gloss: "low/dipping in citation form", example: "你 nǐ" }
      - { form: "4", reading: "shì", gloss: "sharp falling", example: "是 shì" }
      - { form: "neutral", reading: "ma", gloss: "light and unstressed; no tone mark", example: "吗 ma" }
  - type: practice
    id: zh-pron-tone-one
    kind: audio_choice
    prompt: "Listen to 一. Which Pinyin matches?"
    audioText: "一"
    choices: ["yī", "yí", "yǐ"]
    answer: "yī"
  - type: practice
    id: zh-pron-tone-three
    kind: audio_choice
    prompt: "Listen to 你. Which Pinyin matches?"
    audioText: "你"
    choices: ["ní", "nǐ", "nì"]
    answer: "nǐ"
  - type: practice
    id: zh-pron-tone-neutral
    kind: type_answer
    prompt: "Type the Pinyin for the neutral-tone question particle 吗."
    answer: "ma"
    hints: ["Do not add a tone mark.", "It is written ma."]
  - type: checkpoint
    items:
      - id: zh-pron-tone-four
        kind: audio_choice
        prompt: "Listen to 是. Choose the written Pinyin."
        audioText: "是"
        choices: ["shī", "shí", "shì"]
        answer: "shì"
      - id: zh-pron-tone-two
        kind: type_answer
        prompt: "Type the tone-marked Pinyin for 人."
        answer: "rén"
exercise:
  type: type_answer
  prompt: "Type the Pinyin for 吗."
  answer: "ma"
---

Tone is lexical information in Mandarin. Learn to hear it as part of the syllable.
