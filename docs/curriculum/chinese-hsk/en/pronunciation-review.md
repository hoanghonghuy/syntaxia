---
id: zh-hsk-b1-u00-review
track: chinese-hsk
locale: en
slug: pronunciation-review
title: "Pronunciation retrieval review"
order: -1
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Pronunciation foundation"
unit_order: 0
unit_can_do: "Hear, identify, and reproduce core Mandarin syllable and tone patterns"
unit_role: review
can_do: "Retrieve Pinyin and tone knowledge after a delay and carry it into the first communicative unit"
pattern: "hear -> recall -> spell -> move on"
objectives: ["Retrieve tone-marked Pinyin from memory", "Reconnect sound knowledge to upcoming greeting forms"]
steps:
  - type: scene
    title: "Delayed retrieval"
    body: "Answer from memory. The goal is not another explanation; it is to make the sound system easier to retrieve later."
    imageUrl: "/language/scenes/pinyin-syllable-anatomy.svg"
    imageAlt: "The Pinyin syllable anatomy diagram returns as a delayed-retrieval cue."
  - type: listen
    prompt: "Listen to 你 and 好 separately, then recall the written Pinyin before seeing the greeting in unit 1."
    text: "你。好。"
    reading: "nǐ. hǎo."
  - type: practice
    id: zh-pron-review-ni
    kind: type_answer
    prompt: "Type the tone-marked Pinyin for 你."
    answer: "nǐ"
  - type: practice
    id: zh-pron-review-hao
    kind: type_answer
    prompt: "Type the tone-marked Pinyin for 好."
    answer: "hǎo"
  - type: practice
    id: zh-pron-review-bu
    kind: audio_choice
    prompt: "Listen to 不. Which lexical Pinyin spelling should you remember?"
    audioText: "不"
    choices: ["bū", "bú", "bù"]
    answer: "bù"
  - type: checkpoint
    items:
      - id: zh-pron-review-nihao
        kind: type_answer
        prompt: "Type the standard Pinyin for 你好."
        answer: "nǐ hǎo"
      - id: zh-pron-review-neutral
        kind: audio_choice
        prompt: "Listen to 吗. Which Pinyin shows the neutral tone correctly?"
        audioText: "吗"
        choices: ["ma", "mā", "mǎ"]
        answer: "ma"
exercise:
  type: type_answer
  prompt: "Type the standard Pinyin for 你好."
  answer: "nǐ hǎo"
---

This review is the handoff from sound foundations to communicative unit 1.
