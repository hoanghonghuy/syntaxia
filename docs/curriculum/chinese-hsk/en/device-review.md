---
id: zh-hsk-b1-u09-review
track: chinese-hsk
locale: en
slug: device-review
title: "Review: use everyday devices"
order: 15
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-device-09
unit_title: "Use everyday devices"
unit_order: 9
unit_can_do: "Identify a common device and say which device you use to go online"
unit_role: review
can_do: "Recall device ownership and the 用 + device + 上网 pattern from memory"
pattern: "这是我的电脑。 / 我用手机上网。 / 我用电脑上网。"
objectives:
  - "Recall common devices from sound"
  - "Produce a device-and-action sentence without a model"
steps:
  - type: scene
    title: "Quick device check"
    body: "A friend asks which device is yours and what you use to go online."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是你的手机吗？", reading: "zhè shì nǐ de shǒu jī ma" }
      - { speaker: "B", text: "是，这是我的手机。", reading: "shì, zhè shì wǒ de shǒu jī" }
      - { speaker: "A", text: "你用什么上网？", reading: "nǐ yòng shén me shàng wǎng" }
      - { speaker: "B", text: "我用电脑上网。", reading: "wǒ yòng diàn nǎo shàng wǎng" }
  - type: listen
    prompt: "Listen and recall the device."
    text: "我用电脑上网。"
    reading: "wǒ yòng diàn nǎo shàng wǎng"
  - type: practice
    id: zh-device-u09-review-listen
    kind: audio_choice
    prompt: "Listen. Which device is used?"
    audioText: "我用手机上网。"
    choices: ["手机", "电脑", "电视"]
    answer: "手机"
  - type: practice
    id: zh-device-u09-review-question
    kind: dialogue_choice
    prompt: "Which question asks what someone uses to go online?"
    choices: ["你用什么上网？", "你怎么去？", "你去哪里？"]
    answer: "你用什么上网？"
  - type: practice
    id: zh-device-u09-review-produce
    kind: type_answer
    prompt: "Type: “I use my computer to go online.”"
    answer: "我用电脑上网"
    acceptedAnswers: ["我用电脑上网。"]
    hints:
      - "Use 我用 + 电脑 + 上网."
  - type: checkpoint
    items:
      - id: zh-device-u09-review-own
        kind: type_answer
        prompt: "Type: “This is my computer.”"
        answer: "这是我的电脑"
        acceptedAnswers: ["这是我的电脑。"]
      - id: zh-device-u09-review-phone
        kind: listen_type
        prompt: "Listen and type the full sentence."
        audioText: "我用手机上网。"
        answer: "我用手机上网"
        acceptedAnswers: ["我用手机上网。"]
exercise:
  type: type_answer
  prompt: "Type a natural answer to 你用什么上网？ if you use a phone."
  answer: "我用手机上网"
  acceptedAnswers: ["我用手机上网。"]
---

This review removes most support and asks the learner to retrieve device ownership and device-use chunks from memory.
