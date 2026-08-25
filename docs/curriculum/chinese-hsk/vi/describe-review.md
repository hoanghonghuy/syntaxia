---
id: zh-hsk-b1-u07-review
track: chinese-hsk
locale: vi
slug: describe-review
title: "Ôn lại: miêu tả một vật đơn giản"
order: 12
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-describe-07
unit_title: "Miêu tả một vật đơn giản"
unit_order: 7
unit_can_do: "Miêu tả tự nhiên kích thước hoặc nhiệt độ của một vật và phản hồi một câu hỏi mô tả đơn giản"
unit_role: review
can_do: "Tự nhớ lại câu mô tả kích thước và nhiệt độ tự nhiên mà không cần mẫu"
pattern: "很大 / 很小 / 很热 / 很冷"
objectives:
  - "Nhớ lại câu mô tả từ âm thanh"
  - "Tự dựng lại câu 很 + tính từ tự nhiên từ trí nhớ"
steps:
  - type: scene
    title: "Miêu tả lại"
    body: "Sau đó bạn so sánh một đồ vật khác và một đồ uống khác. Hãy miêu tả mà không chép mẫu trước."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个小吗？", reading: "zhè ge xiǎo ma" }
      - { speaker: "B", text: "不小，很大。", reading: "bù xiǎo, hěn dà" }
      - { speaker: "A", text: "水冷吗？", reading: "shuǐ lěng ma" }
      - { speaker: "B", text: "不冷，水很热。", reading: "bù lěng, shuǐ hěn rè" }
  - type: listen
    prompt: "Nghe trước khi đọc. Bạn nghe câu mô tả nào?"
    text: "这个很小。"
    reading: "zhè ge hěn xiǎo"
  - type: practice
    id: zh-describe-u07-review-listen
    kind: audio_choice
    prompt: "Nghe. Mô tả nào phù hợp?"
    audioText: "水很热。"
    choices: ["热", "冷", "小"]
    answer: "热"
  - type: practice
    id: zh-describe-u07-review-natural
    kind: dialogue_choice
    prompt: "Câu nào tự nhiên để miêu tả một vật lớn?"
    choices: ["这个很大。", "这个是大。", "大是这个。"]
    answer: "这个很大。"
  - type: practice
    id: zh-describe-u07-review-produce
    kind: type_answer
    prompt: "Gõ câu: “Nước lạnh.”"
    answer: "水很冷"
    acceptedAnswers: ["水很冷。"]
    hints:
      - "Dùng 水 + 很冷; không chèn 是."
  - type: checkpoint
    items:
      - id: zh-describe-u07-review-small
        kind: type_answer
        prompt: "Gõ câu: “Cái này nhỏ.”"
        answer: "这个很小"
        acceptedAnswers: ["这个很小。"]
      - id: zh-describe-u07-review-error
        kind: dialogue_choice
        prompt: "Câu nào tránh lỗi cơ bản 是 + tính từ?"
        choices: ["水很冷。", "水是冷。", "水冷是。"]
        answer: "水很冷。"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Cái này lớn.”"
  answer: "这个很大"
  acceptedAnswers: ["这个很大。"]
---

Ôn lại là tự truy xuất mẫu miêu tả tự nhiên từ trí nhớ và không đưa 是 vào câu tính từ đơn giản.
