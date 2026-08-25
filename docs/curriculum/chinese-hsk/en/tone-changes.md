---
id: zh-hsk-b1-u00-tone-changes
track: chinese-hsk
locale: en
slug: tone-changes
title: "Keep the spelling, hear the tone change"
order: -3
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Pronunciation foundation"
unit_order: 0
unit_can_do: "Hear, identify, and reproduce core Mandarin syllable and tone patterns"
unit_role: lesson
can_do: "Recognize basic third-tone and 不 tone changes without changing standard Pinyin spelling"
pattern: "written tone marks stay stable; connected speech can change the surface tone"
objectives:
  - "Distinguish standard tone-marked Pinyin from a common spoken tone change"
  - "Recognize the basic 3 + 3 pattern and the common 不 + fourth-tone pattern"
vocab:
  - { hanzi: "你好", pinyin: "nǐ hǎo", gloss: "hello" }
  - { hanzi: "很好", pinyin: "hěn hǎo", gloss: "very good" }
  - { hanzi: "不是", pinyin: "bù shì", gloss: "is not / no" }
steps:
  - type: scene
    title: "Connected speech"
    body: "Dictionary-style tone marks tell you the lexical tones. In natural connected speech, neighboring tones can affect what you hear."
    imageUrl: "/language/scenes/mandarin-tone-flow.svg"
    imageAlt: "Standard Pinyin spellings remain fixed while arrows show tone changes in connected speech."
  - type: listen
    prompt: "Listen to 你好 and 不是 while keeping the standard written forms in view."
    text: "你好。不是。"
    reading: "nǐ hǎo. bù shì."
  - type: tip
    title: "Do not respell the word"
    body: "Write nǐ hǎo even though the first third tone commonly changes before another third tone. Write bù shì even though 不 commonly changes before a fourth tone."
  - type: teach
    items:
      - { form: "你好", reading: "nǐ hǎo", gloss: "3 + 3; the first third tone changes in normal speech", example: "你好！" }
      - { form: "很好", reading: "hěn hǎo", gloss: "another common 3 + 3 pattern", example: "很好。" }
      - { form: "不是", reading: "bù shì", gloss: "不 changes in speech before a fourth tone", example: "不是。" }
  - type: practice
    id: zh-pron-sandhi-write-nihao
    kind: audio_choice
    prompt: "You hear 你好 naturally. Which is the standard Pinyin spelling?"
    audioText: "你好"
    choices: ["nǐ hǎo", "ní hǎo", "nì hǎo"]
    answer: "nǐ hǎo"
  - type: practice
    id: zh-pron-sandhi-write-bushi
    kind: type_answer
    prompt: "Type the standard tone-marked Pinyin for 不是."
    answer: "bù shì"
    hints: ["Keep the lexical tone mark on 不.", "Do not respell the surface change."]
  - type: practice
    id: zh-pron-sandhi-hear-henhao
    kind: audio_choice
    prompt: "Listen to 很好. Which written Pinyin should you keep?"
    audioText: "很好"
    choices: ["hěn hǎo", "hén hǎo", "hèn hǎo"]
    answer: "hěn hǎo"
  - type: checkpoint
    items:
      - id: zh-pron-sandhi-check-rule
        kind: meaning_choice
        prompt: "What happens to standard Pinyin spelling when a contextual tone change occurs?"
        choices: ["Keep the lexical tone marks", "Rewrite every surface tone", "Remove all tone marks"]
        answer: "Keep the lexical tone marks"
      - id: zh-pron-sandhi-check-bu
        kind: audio_choice
        prompt: "Listen to 不是. Which standard spelling is correct?"
        audioText: "不是"
        choices: ["bù shì", "bú shì", "bǔ shì"]
        answer: "bù shì"
exercise:
  type: type_answer
  prompt: "Type the standard tone-marked Pinyin for 你好."
  answer: "nǐ hǎo"
---

Connected-speech awareness prevents natural pronunciation from being mistaken for a spelling exception.
