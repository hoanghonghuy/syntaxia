---
id: ja-n5-01-politeness
track: japanese-jlpt
locale: vi
slug: politeness
title: Yêu cầu một món đồ một cách lịch sự
order: 1
published: true
jlpt_level: n5
can_do: "Yêu cầu một món đồ một cách lịch sự và dùng câu đáp cơ bản có/không/cảm ơn"
pattern: "これをください。 / はい。 / いいえ。 / ありがとうございます。"
objectives:
  - Dùng これをください như một câu yêu cầu hoàn chỉnh
  - Nhận ra はい và いいえ trong câu đáp ngắn
  - Cảm ơn lịch sự bằng ありがとうございます
vocab:
  - { surface: "これ", reading: "これ", gloss: "cái này" }
  - { surface: "ください", reading: "ください", gloss: "xin hãy cho / vui lòng" }
  - { surface: "はい", reading: "はい", gloss: "vâng / có" }
  - { surface: "いいえ", reading: "いいえ", gloss: "không" }
  - { surface: "ありがとうございます", reading: "ありがとうございます", gloss: "cảm ơn (lịch sự)" }
steps:
  - type: scene
    title: "Ở một cửa hàng nhỏ"
    body: "Bạn đã chọn một món đồ. Hãy yêu cầu món đó rồi kết thúc lượt giao tiếp một cách lịch sự."
  - type: dialogue
    lines:
      - { speaker: "客", text: "これをください。", reading: "これをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe trước. Khách dùng cả cụm nào để yêu cầu món đồ?"
    text: "これをください。"
    reading: "これをください。"
  - type: tip
    title: "Học ください trong cả cụm yêu cầu"
    body: "Không nên học ください như bản dịch một-một của từ “please”. Trong tình huống này, hãy học cả cụm これをください, nghĩa gần với “Cho tôi cái này / Cái này nhé”."
  - type: teach
    items:
      - { form: "これをください。", reading: "これをください。", gloss: "Cho tôi cái này / Cái này nhé.", example: "これをください。" }
      - { form: "はい。", reading: "はい。", gloss: "Vâng / Có.", example: "はい。" }
      - { form: "いいえ。", reading: "いいえ。", gloss: "Không.", example: "いいえ。" }
      - { form: "ありがとうございます。", reading: "ありがとうございます。", gloss: "Cảm ơn. (lịch sự)", example: "ありがとうございます。" }
  - type: practice
    id: ja-pol-dialogue-1
    kind: dialogue_choice
    prompt: "Bạn muốn món đồ đang chỉ vào. Câu nào phù hợp tình huống?"
    choices: ["これをください。", "いいえ。", "ありがとうございます。"]
    answer: "これをください。"
    explanation: "これをください là câu yêu cầu hoàn chỉnh; ありがとうございます dùng để cảm ơn sau khi được phục vụ."
  - type: practice
    id: ja-pol-listen-1
    kind: listen_type
    prompt: "Nghe rồi nhập câu đáp ngắn bạn vừa nghe."
    audioText: "はい"
    answer: "はい"
    acceptedAnswers: ["はい。"]
  - type: practice
    id: ja-pol-produce-1
    kind: type_answer
    prompt: "Bạn chỉ vào một món đồ và muốn lấy món đó. Hãy nhập câu yêu cầu bằng tiếng Nhật."
    answer: "これをください"
    acceptedAnswers: ["これをください。"]
    hints:
      - "Bắt đầu bằng これ."
  - type: checkpoint
    items:
      - id: ja-pol-check-1
        kind: meaning_choice
        prompt: "Cụm nào là lời cảm ơn lịch sự?"
        choices: ["ありがとうございます。", "これをください。", "いいえ。"]
        answer: "ありがとうございます。"
      - id: ja-pol-check-2
        kind: meaning_choice
        prompt: "Câu đáp ngắn nào nghĩa là “không”?"
        choices: ["いいえ。", "はい。", "これ。"]
        answer: "いいえ。"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu yêu cầu lịch sự hoàn chỉnh."
  choices: ["これをください。", "ください。", "ありがとうございます。"]
  answer: "これをください。"
---

Bài học đặt các biểu đạt ngắn vào hành động giao tiếp thật, thay vì ghép từng từ tiếng Nhật với một từ tiếng Việt rồi học thuộc.
