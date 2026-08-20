---
id: zh-hsk-b1-12-devices
track: chinese-hsk
locale: en
slug: devices
title: "Identify a device and say how you go online"
order: 12
published: true
hsk_band: 1
hsk_version: "3.0"
can_do: "Identify a phone/computer and say which device you use to go online"
pattern: "这是我的手机。/ 我用手机上网。"
objectives:
  - "Recognize phone, mobile phone, computer, and television"
  - "Use 用 + device + 上网"
vocab:
  - { hanzi: "电话", pinyin: "diàn huà", gloss: "telephone / phone call" }
  - { hanzi: "手机", pinyin: "shǒu jī", gloss: "mobile phone" }
  - { hanzi: "电脑", pinyin: "diàn nǎo", gloss: "computer" }
  - { hanzi: "电视", pinyin: "diàn shì", gloss: "television" }
  - { hanzi: "上网", pinyin: "shàng wǎng", gloss: "go online" }
  - { hanzi: "用", pinyin: "yòng", gloss: "to use" }
steps:
  - type: scene
    title: "Situation"
    body: "A classmate notices your devices and asks what you use to go online."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是你的手机吗？", reading: "zhè shì nǐ de shǒu jī ma" }
      - { speaker: "B", text: "是，这是我的手机。", reading: "shì, zhè shì wǒ de shǒu jī" }
      - { speaker: "A", text: "你用手机上网吗？", reading: "nǐ yòng shǒu jī shàng wǎng ma" }
      - { speaker: "B", text: "是，我用手机上网。", reading: "shì, wǒ yòng shǒu jī shàng wǎng" }
  - type: listen
    prompt: "Listen for the device used to go online."
    text: "我用手机上网。"
    reading: "wǒ yòng shǒu jī shàng wǎng"
  - type: tip
    title: "Use the device inside an action"
    body: "Do not stop at 手机 = mobile phone. Use 用 + device + 上网 so the term becomes part of a practical sentence."
  - type: teach
    items:
      - { form: "手机", reading: "shǒu jī", gloss: "mobile phone", example: "这是我的手机。" }
      - { form: "电脑", reading: "diàn nǎo", gloss: "computer", example: "这是我的电脑。" }
      - { form: "上网", reading: "shàng wǎng", gloss: "go online", example: "我上网。" }
      - { form: "用手机上网", reading: "yòng shǒu jī shàng wǎng", gloss: "use a phone to go online", example: "我用手机上网。" }
  - type: practice
    id: zh-device-reply-1
    kind: dialogue_choice
    prompt: "Someone asks 这是你的手机吗？ It is yours. Choose a natural answer."
    choices: ["是，这是我的手机。", "我坐火车。", "我要茶。"]
    answer: "是，这是我的手机。"
  - type: practice
    id: zh-device-listen-1
    kind: audio_choice
    prompt: "Listen. Which device is being used?"
    audioText: "我用电脑上网。"
    choices: ["电脑", "手机", "电视"]
    answer: "电脑"
  - type: practice
    id: zh-device-produce-1
    kind: type_answer
    prompt: "Type: “I use my phone to go online.”"
    answer: "我用手机上网"
    acceptedAnswers: ["我用手机上网。"]
    hints:
      - "Use 我用 + 手机 + 上网."
  - type: checkpoint
    items:
      - id: zh-device-check-1
        kind: meaning_choice
        prompt: "Which word means “computer”?"
        choices: ["电脑", "手机", "电视"]
        answer: "电脑"
      - id: zh-device-check-2
        kind: dialogue_choice
        prompt: "Review: you are taking the train. What can you say?"
        choices: ["我坐火车。", "我用手机上网。", "水很冷。"]
        answer: "我坐火车。"
exercise:
  type: dialogue_choice
  prompt: "Which sentence says you use a phone to go online?"
  choices: ["我用手机上网。", "我坐火车。", "我要水。"]
  answer: "我用手机上网。"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
