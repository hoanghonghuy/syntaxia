---
id: zh-hsk-b1-u09-review
track: chinese-hsk
locale: vi
slug: device-review
title: "Ôn tập: dùng thiết bị hằng ngày"
order: 15
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-device-09
unit_title: "Dùng thiết bị hằng ngày"
unit_order: 9
unit_can_do: "Nhận biết một thiết bị phổ biến và nói bạn dùng thiết bị nào để lên mạng"
unit_role: review
can_do: "Nhớ lại cách nói sở hữu thiết bị và mẫu 用 + thiết bị + 上网 từ trí nhớ"
pattern: "这是我的电脑。 / 我用手机上网。 / 我用电脑上网。"
objectives:
  - "Nhớ lại thiết bị phổ biến từ âm thanh"
  - "Tự tạo câu thiết bị + hành động khi không có câu mẫu"
steps:
  - type: scene
    title: "Kiểm tra nhanh thiết bị"
    body: "Một người bạn hỏi thiết bị nào là của bạn và bạn dùng gì để lên mạng."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是你的手机吗？", reading: "zhè shì nǐ de shǒu jī ma" }
      - { speaker: "B", text: "是，这是我的手机。", reading: "shì, zhè shì wǒ de shǒu jī" }
      - { speaker: "A", text: "你用什么上网？", reading: "nǐ yòng shén me shàng wǎng" }
      - { speaker: "B", text: "我用电脑上网。", reading: "wǒ yòng diàn nǎo shàng wǎng" }
  - type: listen
    prompt: "Nghe và nhớ lại thiết bị."
    text: "我用电脑上网。"
    reading: "wǒ yòng diàn nǎo shàng wǎng"
  - type: practice
    id: zh-device-u09-review-listen
    kind: audio_choice
    prompt: "Nghe. Thiết bị nào được dùng?"
    audioText: "我用手机上网。"
    choices: ["手机", "电脑", "电视"]
    answer: "手机"
  - type: practice
    id: zh-device-u09-review-question
    kind: dialogue_choice
    prompt: "Câu nào hỏi người khác dùng gì để lên mạng?"
    choices: ["你用什么上网？", "你怎么去？", "你去哪里？"]
    answer: "你用什么上网？"
  - type: practice
    id: zh-device-u09-review-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi dùng máy tính để lên mạng.”"
    answer: "我用电脑上网"
    acceptedAnswers: ["我用电脑上网。"]
    hints:
      - "Dùng 我用 + 电脑 + 上网."
  - type: checkpoint
    items:
      - id: zh-device-u09-review-own
        kind: type_answer
        prompt: "Gõ câu: “Đây là máy tính của tôi.”"
        answer: "这是我的电脑"
        acceptedAnswers: ["这是我的电脑。"]
      - id: zh-device-u09-review-phone
        kind: listen_type
        prompt: "Nghe và gõ đầy đủ câu."
        audioText: "我用手机上网。"
        answer: "我用手机上网"
        acceptedAnswers: ["我用手机上网。"]
exercise:
  type: type_answer
  prompt: "Gõ câu trả lời tự nhiên cho 你用什么上网？ nếu bạn dùng điện thoại."
  answer: "我用手机上网"
  acceptedAnswers: ["我用手机上网。"]
---

Phần ôn tập giảm phần hỗ trợ và yêu cầu nhớ lại cách nói sở hữu cùng mẫu dùng thiết bị từ trí nhớ.
