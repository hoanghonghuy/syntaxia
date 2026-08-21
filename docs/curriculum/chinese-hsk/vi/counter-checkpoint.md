---
id: zh-hsk-b1-u05-checkpoint
track: chinese-hsk
locale: vi
slug: counter-checkpoint
title: "Checkpoint: gọi món tại quầy"
order: 8
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-counter-05
unit_title: "Gọi món tại quầy"
unit_order: 5
unit_can_do: "Gọi một món ăn hoặc đồ uống đơn giản và phản hồi một câu hỏi ngắn tại quầy"
unit_role: checkpoint
can_do: "Hoàn thành một lượt gọi món ngắn tại quầy với ít hỗ trợ"
pattern: "我要… / 还要…吗？ / 要，谢谢。"
objectives:
  - "Nhận ra món được yêu cầu khi nghe"
  - "Đưa ra và tiếp tục một yêu cầu ngắn tại quầy"
steps:
  - type: scene
    title: "Một lượt gọi món nhanh"
    body: "Bạn đang ở một quầy nhỏ. Hãy gọi đồ uống rồi trả lời khi nhân viên hỏi có muốn thêm món khác không."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "你要什么？", reading: "nǐ yào shén me" }
      - { speaker: "You", text: "我要水。", reading: "wǒ yào shuǐ" }
      - { speaker: "Server", text: "还要苹果吗？", reading: "hái yào píng guǒ ma" }
      - { speaker: "You", text: "要，谢谢。", reading: "yào, xiè xie" }
  - type: listen
    prompt: "Nghe trước. Khách gọi món gì?"
    text: "我要茶。"
    reading: "wǒ yào chá"
  - type: practice
    id: zh-counter-u05-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn món được yêu cầu."
    audioText: "我要水。"
    choices: ["水", "茶", "米饭"]
    answer: "水"
  - type: practice
    id: zh-counter-u05-check-reply
    kind: dialogue_choice
    prompt: "Nhân viên hỏi 你要什么？ Bạn muốn trà. Bạn nói gì?"
    choices: ["我要茶。", "我是茶。", "我在茶。"]
    answer: "我要茶。"
  - type: practice
    id: zh-counter-u05-check-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi muốn một quả táo.”"
    answer: "我要苹果"
    acceptedAnswers: ["我要苹果。"]
    hints:
      - "Dùng 我要 + 苹果."
  - type: checkpoint
    items:
      - id: zh-counter-u05-check-followup
        kind: dialogue_choice
        prompt: "Nhân viên hỏi 还要米饭吗？ Bạn muốn lấy. Câu nào phù hợp?"
        choices: ["要，谢谢。", "我叫米饭。", "米饭在哪里？"]
        answer: "要，谢谢。"
      - id: zh-counter-u05-check-drink
        kind: audio_choice
        prompt: "Nghe và chọn đồ uống."
        audioText: "茶"
        choices: ["茶", "苹果", "米饭"]
        answer: "茶"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Tôi muốn nước.”"
  answer: "我要水"
  acceptedAnswers: ["我要水。"]
---

Checkpoint đo khả năng thực hiện một lượt gọi món rất ngắn, không phải khả năng đọc thuộc danh sách đồ ăn.
