---
id: ja-n5-u04-checkpoint
track: japanese-jlpt
locale: vi
slug: cafe-checkpoint
title: "Checkpoint: gọi món tại quầy"
order: 11
published: true
jlpt_level: n5
unit_id: ja-n5-cafe-04
unit_title: "Gọi món tại quầy"
unit_order: 4
unit_can_do: "Yêu cầu một món ăn hoặc đồ uống và kết thúc một lượt giao tiếp ngắn tại quầy một cách lịch sự"
unit_role: checkpoint
can_do: "Yêu cầu món đã chọn và cảm ơn nhân viên với ít hỗ trợ"
pattern: "Nをください。 / ありがとうございます。"
objectives:
  - "Nhận ra món được yêu cầu khi nghe"
  - "Tự tạo món + をください và kết thúc lịch sự"
steps:
  - type: scene
    title: "Tại quầy café"
    body: "Chọn một món, yêu cầu món đó rồi cảm ơn khi nhân viên đưa món cho bạn."
  - type: dialogue
    lines:
      - { speaker: "客", text: "コーヒーをください。", reading: "コーヒーをください。" }
      - { speaker: "店員", text: "はい、どうぞ。", reading: "はい、どうぞ。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe trước. Khách yêu cầu món nào?"
    text: "お茶をください。"
    reading: "おちゃをください。"
  - type: practice
    id: ja-cafe-u04-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn món được yêu cầu."
    audioText: "水をください"
    choices: ["水", "お茶", "パン"]
    answer: "水"
  - type: practice
    id: ja-cafe-u04-check-request
    kind: type_answer
    prompt: "Bạn muốn trà. Hãy nhập đầy đủ câu yêu cầu."
    answer: "お茶をください"
    acceptedAnswers: ["お茶をください。"]
    hints:
      - "Đặt お茶 trước をください."
  - type: practice
    id: ja-cafe-u04-check-close
    kind: dialogue_choice
    prompt: "Nhân viên đưa món cho bạn. Bạn có thể nói gì?"
    choices: ["ありがとうございます。", "何番ですか。", "母です。"]
    answer: "ありがとうございます。"
  - type: checkpoint
    items:
      - id: ja-cafe-u04-check-coffee
        kind: type_answer
        prompt: "Gõ câu: “Cho tôi cà phê.”"
        answer: "コーヒーをください"
        acceptedAnswers: ["コーヒーをください。"]
      - id: ja-cafe-u04-check-bread
        kind: listen_type
        prompt: "Nghe và gõ đầy đủ câu yêu cầu."
        audioText: "パンをください"
        answer: "パンをください"
        acceptedAnswers: ["パンをください。"]
exercise:
  type: type_answer
  prompt: "Gõ lời cảm ơn lịch sự sau khi nhận món."
  answer: "ありがとうございます"
  acceptedAnswers: ["ありがとうございます。"]
---

Checkpoint kiểm tra trọn một hành động tại quầy: hiểu món, đưa ra yêu cầu và kết thúc lịch sự.
