---
id: ja-n5-u01-checkpoint
track: japanese-jlpt
locale: vi
slug: politeness-checkpoint
title: "Checkpoint: yêu cầu ở cửa hàng"
order: 2
published: true
jlpt_level: n5
unit_id: ja-n5-shop-request-01
unit_title: "Yêu cầu một món đồ"
unit_order: 1
unit_can_do: "Yêu cầu món đồ đã chọn và kết thúc một lượt mua hàng ngắn một cách lịch sự"
unit_role: checkpoint
can_do: "Yêu cầu món đồ và cảm ơn nhân viên với ít gợi ý"
pattern: "これをください。 / はい。 / ありがとうございます。"
objectives:
  - Tự tạo cả cụm これをください
  - Đáp lại phù hợp trong một lượt mua hàng ngắn
steps:
  - type: scene
    title: "Tại quầy"
    body: "Bạn đã chọn một món đồ. Hãy yêu cầu nhân viên đưa món đó rồi kết thúc lượt giao tiếp lịch sự."
    visualKey: "shop-counter-request"
    imageAlt: "Một khách hàng chỉ vào món đồ đã chọn ở quầy và nói với nhân viên."
  - type: dialogue
    lines:
      - { speaker: "客", text: "これをください。", reading: "これをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe trước. Khách đã dùng câu yêu cầu nào?"
    text: "これをください。"
    reading: "これをください。"
  - type: practice
    id: ja-u01-check-listen
    kind: listen_type
    prompt: "Nghe và nhập câu đáp ngắn bạn vừa nghe."
    audioText: "はい"
    answer: "はい"
    acceptedAnswers: ["はい。"]
  - type: practice
    id: ja-u01-check-reply
    kind: dialogue_choice
    prompt: "Bạn chỉ vào món đồ muốn lấy. Câu nào phù hợp?"
    choices: ["これをください。", "ありがとうございます。", "いいえ。"]
    answer: "これをください。"
    explanation: "Trong tình huống này, cả cụm これをください là câu yêu cầu."
  - type: practice
    id: ja-u01-check-type
    kind: type_answer
    prompt: "Nhập lời cảm ơn lịch sự sau khi nhân viên giúp bạn."
    answer: "ありがとうございます"
    acceptedAnswers: ["ありがとうございます。"]
    hints:
      - "Câu bắt đầu bằng ありがとう."
  - type: checkpoint
    items:
      - id: ja-u01-check-request
        kind: meaning_choice
        prompt: "Cụm nào có nghĩa gần với “Cho tôi cái này / Cái này nhé” trong tình huống cửa hàng?"
        choices: ["これをください。", "はい。", "いいえ。"]
        answer: "これをください。"
      - id: ja-u01-check-thanks
        kind: dialogue_choice
        prompt: "Nhân viên đưa món đồ cho bạn. Bạn có thể nói gì?"
        choices: ["ありがとうございます。", "これをください。", "いいえ。"]
        answer: "ありがとうございます。"
exercise:
  type: type_answer
  prompt: "Nhập câu yêu cầu món đồ bạn đang chỉ vào."
  answer: "これをください"
  acceptedAnswers: ["これをください。"]
---

Hãy dùng これをください như một cụm yêu cầu hoàn chỉnh trong lượt mua hàng.
