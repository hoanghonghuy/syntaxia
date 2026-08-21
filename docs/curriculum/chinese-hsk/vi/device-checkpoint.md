---
id: zh-hsk-b1-u09-checkpoint
track: chinese-hsk
locale: vi
slug: device-checkpoint
title: "Checkpoint: dùng thiết bị hằng ngày"
order: 14
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-device-09
unit_title: "Dùng thiết bị hằng ngày"
unit_order: 9
unit_can_do: "Nhận biết một thiết bị phổ biến và nói bạn dùng thiết bị nào để lên mạng"
unit_role: checkpoint
can_do: "Nhận biết thiết bị và nói bạn dùng gì để lên mạng với ít hỗ trợ"
pattern: "这是我的手机。 / 我用手机上网。 / 我用电脑上网。"
objectives:
  - "Nhận ra thiết bị khi nghe"
  - "Tự tạo 用 + thiết bị + 上网"
steps:
  - type: scene
    title: "Chọn thiết bị"
    body: "Một bạn học chỉ vào một thiết bị và hỏi bạn dùng gì để lên mạng."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是你的电脑吗？", reading: "zhè shì nǐ de diàn nǎo ma" }
      - { speaker: "B", text: "是，这是我的电脑。", reading: "shì, zhè shì wǒ de diàn nǎo" }
      - { speaker: "A", text: "你用电脑上网吗？", reading: "nǐ yòng diàn nǎo shàng wǎng ma" }
      - { speaker: "B", text: "是，我用电脑上网。", reading: "shì, wǒ yòng diàn nǎo shàng wǎng" }
  - type: listen
    prompt: "Nghe trước. Thiết bị nào đang được dùng?"
    text: "我用手机上网。"
    reading: "wǒ yòng shǒu jī shàng wǎng"
  - type: practice
    id: zh-device-u09-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn thiết bị."
    audioText: "我用电脑上网。"
    choices: ["电脑", "手机", "电视"]
    answer: "电脑"
  - type: practice
    id: zh-device-u09-check-own
    kind: dialogue_choice
    prompt: "Ai đó hỏi 这是你的手机吗？ Đó là điện thoại của bạn. Bạn nói gì?"
    choices: ["是，这是我的手机。", "我用电脑上网。", "我坐飞机。"]
    answer: "是，这是我的手机。"
  - type: practice
    id: zh-device-u09-check-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi dùng máy tính để lên mạng.”"
    answer: "我用电脑上网"
    acceptedAnswers: ["我用电脑上网。"]
    hints:
      - "Dùng 我用 + 电脑 + 上网."
  - type: checkpoint
    items:
      - id: zh-device-u09-check-phone
        kind: type_answer
        prompt: "Gõ câu: “Tôi dùng điện thoại để lên mạng.”"
        answer: "我用手机上网"
        acceptedAnswers: ["我用手机上网。"]
      - id: zh-device-u09-check-question
        kind: audio_choice
        prompt: "Nghe. Bạn nghe câu hỏi nào?"
        audioText: "这是你的电脑吗？"
        choices: ["这是你的电脑吗？", "你怎么去？", "你去哪里？"]
        answer: "这是你的电脑吗？"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Đây là điện thoại của tôi.”"
  answer: "这是我的手机"
  acceptedAnswers: ["这是我的手机。"]
---

Checkpoint kiểm tra nhận biết thiết bị và một hành động thực tế với thiết bị, không chỉ nhớ từ vựng rời.
