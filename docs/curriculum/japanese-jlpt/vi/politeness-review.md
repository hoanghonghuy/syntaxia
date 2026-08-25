---
id: ja-n5-u01-review
track: japanese-jlpt
locale: vi
slug: politeness-review
title: "Ôn tập: yêu cầu một món đồ"
order: 3
published: true
jlpt_level: n5
unit_id: ja-n5-shop-request-01
unit_title: "Yêu cầu một món đồ"
unit_order: 1
unit_can_do: "Yêu cầu món đồ đã chọn và kết thúc một lượt mua hàng ngắn một cách lịch sự"
unit_role: review
can_do: "Nhớ lại câu yêu cầu và lời cảm ơn mà không cần mẫu"
pattern: "これをください。 / はい。 / ありがとうございます。"
objectives:
  - Nhớ lại câu yêu cầu từ trí nhớ
  - Nối lại âm thanh, cách đọc và nghĩa
steps:
  - type: scene
    title: "Quay lại cửa hàng"
    body: "Bạn quay lại một cửa hàng nhỏ. Hãy nhớ lại câu yêu cầu trước khi xem lại mẫu."
    visualKey: "shop-counter-request"
    imageAlt: "Một khách hàng chỉ vào món đồ ở quầy cửa hàng nhỏ trong khi nhân viên lắng nghe."
  - type: dialogue
    lines:
      - { speaker: "客", text: "これをください。", reading: "これをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe trước khi nhìn chữ. Bạn nghe câu yêu cầu nào?"
    text: "これをください。"
    reading: "これをください。"
  - type: practice
    id: ja-u01-review-listen
    kind: listen_type
    prompt: "Nghe và nhập cụm bạn vừa nghe."
    audioText: "ありがとうございます"
    answer: "ありがとうございます"
    acceptedAnswers: ["ありがとうございます。"]
  - type: practice
    id: ja-u01-review-reply
    kind: dialogue_choice
    prompt: "Câu nào dùng để yêu cầu món đồ bạn đang chỉ vào?"
    choices: ["これをください。", "いいえ。", "ありがとうございます。"]
    answer: "これをください。"
  - type: practice
    id: ja-u01-review-type
    kind: type_answer
    prompt: "Nhập câu đáp khẳng định ngắn."
    answer: "はい"
    acceptedAnswers: ["はい。"]
    hints:
      - "Cụm này có hai ký tự hiragana."
  - type: checkpoint
    items:
      - id: ja-u01-review-request
        kind: dialogue_choice
        prompt: "Bạn đã sẵn sàng yêu cầu món đồ. Bạn nói gì?"
        choices: ["これをください。", "ありがとうございます。", "いいえ。"]
        answer: "これをください。"
      - id: ja-u01-review-close
        kind: meaning_choice
        prompt: "Cụm nào dùng để cảm ơn nhân viên một cách lịch sự?"
        choices: ["ありがとうございます。", "これをください。", "はい。"]
        answer: "ありがとうございます。"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu yêu cầu hoàn chỉnh."
  choices: ["これをください。", "ください。", "はい。"]
  answer: "これをください。"
---

Ôn bằng truy hồi: nghe, nhớ lại rồi dùng lại cụm trong lượt mua hàng.
