---
id: en-a1-u06-checkpoint
track: english-basics
locale: vi
slug: shopping-checkpoint
title: Checkpoint mua hàng
order: 21
published: true
cefr_level: a1
unit_id: en-a1-shopping-06
unit_title: "Mua một món đồ đơn giản"
unit_order: 6
unit_can_do: "Hỏi giá một món quen thuộc, chọn món đó và hoàn thành một giao dịch ngắn"
unit_role: checkpoint
can_do: "Hỏi giá, nêu lựa chọn và kết thúc giao dịch đơn giản với rất ít hỗ trợ"
pattern: "How much is this? / I'd like this … / I'll take it. / Thank you."
objectives:
  - Hỏi giá
  - Hiểu giá và chọn món
  - Kết thúc giao dịch lịch sự
steps:
  - type: scene
    title: "Mua một món mà không có kịch bản"
    body: "Ở một cửa hàng nhỏ, hỏi giá chiếc túi, chọn mua và kết thúc trao đổi."
    visualKey: "shop-counter-request"
    imageAlt: "Khách hàng và nhân viên hoàn thành giao dịch tại quầy nhỏ."
  - type: dialogue
    lines:
      - { speaker: "Customer", text: "How much is this bag?" }
      - { speaker: "Clerk", text: "It's six dollars." }
      - { speaker: "Customer", text: "Okay. I'll take it." }
      - { speaker: "Clerk", text: "Here you are." }
      - { speaker: "Customer", text: "Thank you." }
  - type: listen
    prompt: "Nghe. Khách quyết định gì?"
    text: "Okay. I'll take it."
  - type: practice
    id: en-u06-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn giá."
    audioText: "It's six dollars."
    choices: ["$5", "$6", "$8"]
    answer: "$6"
  - type: practice
    id: en-u06-check-question
    kind: type_answer
    prompt: "Hỏi giá chiếc túi ngay cạnh bạn."
    answer: "How much is this bag"
    acceptedAnswers: ["How much is this bag?", "How much is this?"]
  - type: practice
    id: en-u06-check-purchase
    kind: type_answer
    prompt: "Giá phù hợp. Nói rằng bạn sẽ mua món đó."
    answer: "I'll take it"
    acceptedAnswers: ["I'll take it.", "I will take it", "I will take it."]
    hints:
      - "Dùng take it."
  - type: checkpoint
    items:
      - id: en-u06-check-choice
        kind: dialogue_choice
        prompt: "Câu nào nêu món bạn muốn một cách lịch sự?"
        choices: ["I'd like this bag, please.", "How much is this bag?", "Is this the small bag?"]
        answer: "I'd like this bag, please."
      - id: en-u06-check-thanks
        kind: dialogue_choice
        prompt: "Nhân viên nói “Here you are.” Câu nào kết thúc trao đổi?"
        choices: ["Thank you.", "How much?", "What time?"]
        answer: "Thank you."
exercise:
  type: type_answer
  prompt: "Chiếc túi giá sáu đô và bạn muốn mua. Hãy nói quyết định."
  answer: "I'll take it"
  acceptedAnswers: ["I'll take it.", "I will take it", "I will take it."]
---

Checkpoint yêu cầu một luồng mua hàng hoàn chỉnh: giá → quyết định → kết thúc lịch sự.
