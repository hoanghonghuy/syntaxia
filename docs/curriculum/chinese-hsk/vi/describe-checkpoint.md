---
id: zh-hsk-b1-u07-checkpoint
track: chinese-hsk
locale: vi
slug: describe-checkpoint
title: "Checkpoint: miêu tả một vật đơn giản"
order: 11
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-describe-07
unit_title: "Miêu tả một vật đơn giản"
unit_order: 7
unit_can_do: "Miêu tả tự nhiên kích thước hoặc nhiệt độ của một vật và phản hồi một câu hỏi mô tả đơn giản"
unit_role: checkpoint
can_do: "Miêu tả kích thước hoặc nhiệt độ tự nhiên với ít hỗ trợ"
pattern: "这个很大。/ 这个很小。/ 水很热。/ 水很冷。"
objectives:
  - "Nhận ra mô tả kích thước và nhiệt độ khi nghe"
  - "Tự tạo 很 + tính từ mà không chèn 是"
steps:
  - type: scene
    title: "So sánh những gì bạn thấy"
    body: "Một bạn học chỉ vào một đồ vật và một cốc nước. Hãy miêu tả kích thước hoặc nhiệt độ một cách tự nhiên."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个大吗？", reading: "zhè ge dà ma" }
      - { speaker: "B", text: "不大，很小。", reading: "bú dà, hěn xiǎo" }
      - { speaker: "A", text: "水热吗？", reading: "shuǐ rè ma" }
      - { speaker: "B", text: "不热，水很冷。", reading: "bú rè, shuǐ hěn lěng" }
  - type: listen
    prompt: "Nghe trước. Bạn nghe câu mô tả nào?"
    text: "这个很大。"
    reading: "zhè ge hěn dà"
  - type: practice
    id: zh-describe-u07-check-listen
    kind: audio_choice
    prompt: "Nghe. Nước nóng hay lạnh?"
    audioText: "水很冷。"
    choices: ["冷", "热", "大"]
    answer: "冷"
  - type: practice
    id: zh-describe-u07-check-natural
    kind: dialogue_choice
    prompt: "Câu nào tự nhiên để nói “Nước lạnh”?"
    choices: ["水很冷。", "水是冷。", "很水冷。"]
    answer: "水很冷。"
    explanation: "Trong mô tả trung tính này dùng 很 + tính từ, không dùng 是 + tính từ."
  - type: practice
    id: zh-describe-u07-check-produce
    kind: type_answer
    prompt: "Gõ câu: “Cái này nhỏ.”"
    answer: "这个很小"
    acceptedAnswers: ["这个很小。"]
    hints:
      - "Dùng 这个 + 很小."
  - type: checkpoint
    items:
      - id: zh-describe-u07-check-hot
        kind: type_answer
        prompt: "Gõ câu: “Nước nóng.”"
        answer: "水很热"
        acceptedAnswers: ["水很热。"]
      - id: zh-describe-u07-check-big
        kind: audio_choice
        prompt: "Nghe. Bạn nghe kích thước nào?"
        audioText: "这个很大。"
        choices: ["大", "小", "冷"]
        answer: "大"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Nước lạnh.”"
  answer: "水很冷"
  acceptedAnswers: ["水很冷。"]
---

Checkpoint kiểm tra mẫu mô tả dùng được và chủ động ngăn lỗi cơ bản 是 + tính từ.
