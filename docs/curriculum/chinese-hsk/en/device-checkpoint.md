---
id: zh-hsk-b1-u09-checkpoint
track: chinese-hsk
locale: en
slug: device-checkpoint
title: "Checkpoint: use everyday devices"
order: 14
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-device-09
unit_title: "Use everyday devices"
unit_order: 9
unit_can_do: "Identify a common device and say which device you use to go online"
unit_role: checkpoint
can_do: "Identify a device and say what you use to go online with minimal support"
pattern: "这是我的手机。 / 我用手机上网。 / 我用电脑上网。"
objectives:
  - "Recognize the device by sound"
  - "Produce 用 + device + 上网"
steps:
  - type: scene
    title: "Choose a device"
    body: "A classmate points to a device and asks what you use to go online."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是你的电脑吗？", reading: "zhè shì nǐ de diàn nǎo ma" }
      - { speaker: "B", text: "是，这是我的电脑。", reading: "shì, zhè shì wǒ de diàn nǎo" }
      - { speaker: "A", text: "你用电脑上网吗？", reading: "nǐ yòng diàn nǎo shàng wǎng ma" }
      - { speaker: "B", text: "是，我用电脑上网。", reading: "shì, wǒ yòng diàn nǎo shàng wǎng" }
  - type: listen
    prompt: "Listen first. Which device is being used?"
    text: "我用手机上网。"
    reading: "wǒ yòng shǒu jī shàng wǎng"
  - type: practice
    id: zh-device-u09-check-listen
    kind: audio_choice
    prompt: "Listen and choose the device."
    audioText: "我用电脑上网。"
    choices: ["电脑", "手机", "电视"]
    answer: "电脑"
  - type: practice
    id: zh-device-u09-check-own
    kind: dialogue_choice
    prompt: "Someone asks 这是你的手机吗？ It is yours. What do you say?"
    choices: ["是，这是我的手机。", "我用电脑上网。", "我坐飞机。"]
    answer: "是，这是我的手机。"
  - type: practice
    id: zh-device-u09-check-produce
    kind: type_answer
    prompt: "Type: “I use my computer to go online.”"
    answer: "我用电脑上网"
    acceptedAnswers: ["我用电脑上网。"]
    hints:
      - "Use 我用 + 电脑 + 上网."
  - type: checkpoint
    items:
      - id: zh-device-u09-check-phone
        kind: type_answer
        prompt: "Type: “I use my phone to go online.”"
        answer: "我用手机上网"
        acceptedAnswers: ["我用手机上网。"]
      - id: zh-device-u09-check-question
        kind: audio_choice
        prompt: "Listen. Which question do you hear?"
        audioText: "这是你的电脑吗？"
        choices: ["这是你的电脑吗？", "你怎么去？", "你去哪里？"]
        answer: "这是你的电脑吗？"
exercise:
  type: type_answer
  prompt: "Type: “This is my phone.”"
  answer: "这是我的手机"
  acceptedAnswers: ["这是我的手机。"]
---

The checkpoint tests device identity and a practical device action instead of isolated vocabulary recall.
