---
id: zh-hsk-b1-u05-review
track: chinese-hsk
locale: vi
slug: counter-review
title: "Ôn lại: gọi món tại quầy"
order: 9
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-counter-05
unit_title: "Gọi món tại quầy"
unit_order: 5
unit_can_do: "Gọi một món ăn hoặc đồ uống đơn giản và phản hồi một câu hỏi ngắn tại quầy"
unit_role: review
can_do: "Tự nhớ lại cụm yêu cầu và phản hồi mà không cần mẫu"
pattern: "我要… / 还要…吗？ / 要，谢谢。"
objectives:
  - "Nhớ lại một yêu cầu 我要 dùng được từ âm thanh"
  - "Phản hồi tự nhiên với một câu hỏi gọi thêm ngắn"
steps:
  - type: scene
    title: "Tự gọi lại từ trí nhớ"
    body: "Sau đó bạn quay lại quầy. Hãy tự thực hiện yêu cầu ngắn mà không chép lại mẫu trước."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "你要什么？", reading: "nǐ yào shén me" }
      - { speaker: "You", text: "我要苹果。", reading: "wǒ yào píng guǒ" }
      - { speaker: "Server", text: "还要水吗？", reading: "hái yào shuǐ ma" }
      - { speaker: "You", text: "要，谢谢。", reading: "yào, xiè xie" }
  - type: listen
    prompt: "Nghe trước khi đọc. Món nào đang được yêu cầu?"
    text: "我要米饭。"
    reading: "wǒ yào mǐ fàn"
  - type: practice
    id: zh-counter-u05-review-listen
    kind: audio_choice
    prompt: "Nghe và chọn món."
    audioText: "我要苹果。"
    choices: ["苹果", "茶", "水"]
    answer: "苹果"
  - type: practice
    id: zh-counter-u05-review-reply
    kind: dialogue_choice
    prompt: "Nhân viên hỏi 还要水吗？ Bạn cũng muốn nước. Bạn nói gì?"
    choices: ["要，谢谢。", "我是水。", "水在哪里？"]
    answer: "要，谢谢。"
  - type: practice
    id: zh-counter-u05-review-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi muốn cơm.”"
    answer: "我要米饭"
    acceptedAnswers: ["我要米饭。"]
    hints:
      - "Dùng 我要 + 米饭."
  - type: checkpoint
    items:
      - id: zh-counter-u05-review-hear
        kind: audio_choice
        prompt: "Nghe. Đồ uống nào được yêu cầu?"
        audioText: "我要茶。"
        choices: ["茶", "水", "苹果"]
        answer: "茶"
      - id: zh-counter-u05-review-request
        kind: dialogue_choice
        prompt: "Câu nào là yêu cầu trực tiếp để lấy nước tại quầy?"
        choices: ["我要水。", "我喝学校。", "水是我。"]
        answer: "我要水。"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Tôi muốn trà.”"
  answer: "我要茶"
  acceptedAnswers: ["我要茶。"]
---

Ôn lại là tự truy xuất: dựng lại lượt giao tiếp tại quầy và dùng lại cụm yêu cầu, không học thêm một vòng giải thích từ vựng.
