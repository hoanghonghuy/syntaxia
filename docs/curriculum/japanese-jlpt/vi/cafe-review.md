---
id: ja-n5-u04-review
track: japanese-jlpt
locale: vi
slug: cafe-review
title: "Ôn tập: gọi món tại quầy"
order: 12
published: true
jlpt_level: n5
unit_id: ja-n5-cafe-04
unit_title: "Gọi món tại quầy"
unit_order: 4
unit_can_do: "Yêu cầu một món ăn hoặc đồ uống và kết thúc một lượt giao tiếp ngắn tại quầy một cách lịch sự"
unit_role: review
can_do: "Nhớ lại khung yêu cầu và cách kết thúc lịch sự với ít gợi ý"
pattern: "Nをください。 / ありがとうございます。"
objectives:
  - "Nhớ lại món + をください từ trí nhớ"
  - "Kết thúc lượt giao tiếp lịch sự"
steps:
  - type: scene
    title: "Gọi món lần nữa"
    body: "Bạn quay lại quầy và gọi một món khác khi không có câu mẫu viết sẵn."
  - type: dialogue
    lines:
      - { speaker: "客", text: "パンをください。", reading: "パンをください。" }
      - { speaker: "店員", text: "はい、どうぞ。", reading: "はい、どうぞ。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe và nhớ lại món được yêu cầu."
    text: "コーヒーをください。"
    reading: "コーヒーをください。"
  - type: practice
    id: ja-cafe-u04-review-listen
    kind: audio_choice
    prompt: "Nghe. Khách yêu cầu món gì?"
    audioText: "お茶をください"
    choices: ["お茶", "水", "パン"]
    answer: "お茶"
  - type: practice
    id: ja-cafe-u04-review-request
    kind: type_answer
    prompt: "Bạn muốn nước. Hãy nhập đầy đủ câu yêu cầu."
    answer: "水をください"
    acceptedAnswers: ["水をください。"]
    hints:
      - "Dùng 水 + をください."
  - type: practice
    id: ja-cafe-u04-review-close
    kind: dialogue_choice
    prompt: "Bạn nói gì sau khi nhận món?"
    choices: ["ありがとうございます。", "お名前は何ですか。", "八番です。"]
    answer: "ありがとうございます。"
  - type: checkpoint
    items:
      - id: ja-cafe-u04-review-coffee
        kind: listen_type
        prompt: "Nghe và nhập đầy đủ câu yêu cầu."
        audioText: "コーヒーをください"
        answer: "コーヒーをください"
        acceptedAnswers: ["コーヒーをください。"]
      - id: ja-cafe-u04-review-bread
        kind: type_answer
        prompt: "Gõ câu: “Cho tôi bánh mì.”"
        answer: "パンをください"
        acceptedAnswers: ["パンをください。"]
exercise:
  type: type_answer
  prompt: "Nhập đầy đủ câu yêu cầu trà."
  answer: "お茶をください"
  acceptedAnswers: ["お茶をください。"]
---

Phần ôn tập giảm phần gợi ý và yêu cầu nhớ lại khung gọi món tại quầy từ trí nhớ.
