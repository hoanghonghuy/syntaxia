---
id: en-a1-u06-review
track: english-basics
locale: vi
slug: shopping-review
title: "Ôn tập: mua một món đồ"
order: 22
published: true
cefr_level: a1
unit_id: en-a1-shopping-06
unit_title: "Mua một món đồ đơn giản"
unit_order: 6
unit_can_do: "Hỏi giá một món quen thuộc, chọn món đó và hoàn thành một giao dịch ngắn"
unit_role: review
can_do: "Tự nhớ lại câu hỏi giá và quyết định mua mà không cần mẫu"
pattern: "How much is this? / It's … / I'll take it. / Thank you."
objectives:
  - Nhớ lại câu hỏi giá
  - Nghe và hiểu một mức giá
  - Nhớ lại quyết định mua và câu kết thúc lịch sự
steps:
  - type: scene
    title: "Tự mua lại món đồ từ trí nhớ"
    body: "Quay lại cửa hàng sau đó và hoàn thành cùng một giao dịch cực ngắn mà không xem hội thoại cũ."
    visualKey: "shop-counter-request"
    imageAlt: "Một khách hàng nhớ lại giao dịch đơn giản ở quầy."
  - type: dialogue
    lines:
      - { speaker: "Customer", text: "How much is this?" }
      - { speaker: "Clerk", text: "It's eight dollars." }
      - { speaker: "Customer", text: "Okay. I'll take it. Thank you." }
  - type: listen
    prompt: "Nghe và nhớ lại mức giá."
    text: "It's eight dollars."
  - type: practice
    id: en-u06-review-listen
    kind: listen_type
    prompt: "Nghe và gõ số bạn nghe thấy."
    audioText: "eight"
    answer: "eight"
    acceptedAnswers: ["8"]
  - type: practice
    id: en-u06-review-question
    kind: order_words
    prompt: "Ghép câu hỏi giá."
    tokens: ["is", "How much", "this"]
    answer: "How much is this"
    acceptedAnswers: ["How much is this?"]
  - type: practice
    id: en-u06-review-produce
    kind: type_answer
    prompt: "Giá phù hợp và bạn muốn món đó. Viết câu quyết định mua."
    answer: "I'll take it"
    acceptedAnswers: ["I'll take it.", "I will take it", "I will take it."]
    hints:
      - "Dùng I'll …"
  - type: checkpoint
    items:
      - id: en-u06-review-choice
        kind: dialogue_choice
        prompt: "Câu nào nêu lựa chọn lịch sự?"
        choices: ["I'd like this, please.", "How much is this?", "Is this the small bag?"]
        answer: "I'd like this, please."
      - id: en-u06-review-close
        kind: dialogue_choice
        prompt: "Câu nào kết thúc mua hàng lịch sự?"
        choices: ["Thank you.", "How much is this?", "I'll take it."]
        answer: "Thank you."
exercise:
  type: type_answer
  prompt: "Nhớ lại câu hỏi giá."
  answer: "How much is this"
  acceptedAnswers: ["How much is this?"]
---

Tự truy hồi toàn bộ logic giao dịch: hỏi → hiểu → quyết định → kết thúc.
