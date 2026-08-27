---
id: en-a1-19-prices
track: english-basics
locale: vi
slug: prices
title: Hỏi giá một món đồ
order: 19
published: true
cefr_level: a1
unit_id: en-a1-shopping-06
unit_title: "Mua một món đồ đơn giản"
unit_order: 6
unit_can_do: "Hỏi giá một món quen thuộc, chọn món đó và hoàn thành một giao dịch ngắn"
unit_role: lesson
can_do: "Hỏi giá một món và hiểu một mức giá nguyên đơn giản"
pattern: "How much is this? / It's … / How much is that?"
objectives:
  - Hỏi một mức giá đơn giản
  - Phân biệt this và that trong tình huống mua hàng
  - Hiểu một mức giá nguyên ngắn
vocab:
  - { word: "money", ipa: "/ˈmʌni/", gloss: "tiền" }
  - { word: "shop", ipa: "/ʃɑːp/", gloss: "cửa hàng" }
  - { word: "bag", ipa: "/bæɡ/", gloss: "túi" }
  - { word: "buy", ipa: "/baɪ/", gloss: "mua" }
  - { word: "how much", ipa: "/haʊ mʌtʃ/", gloss: "dùng để hỏi giá" }
  - { word: "this", ipa: "/ðɪs/", gloss: "chỉ món đồ ở gần" }
  - { word: "that", ipa: "/ðæt/", gloss: "chỉ món đồ ở xa hơn" }
  - { word: "dollar", ipa: "/ˈdɑːlər/", gloss: "đơn vị tiền tệ dùng trong các mức giá mẫu" }
steps:
  - type: scene
    title: "Hỏi giá trước khi mua"
    body: "Bạn đang ở một cửa hàng nhỏ. Chỉ vào một món, hỏi giá rồi quyết định có mua hay không."
    visualKey: "shop-counter-request"
    imageAlt: "Một khách hàng chỉ vào món đồ ở quầy và nói với nhân viên."
  - type: dialogue
    lines:
      - { speaker: "Customer", text: "How much is this bag?" }
      - { speaker: "Clerk", text: "It's five dollars." }
      - { speaker: "Customer", text: "Five dollars? Okay, thank you." }
  - type: listen
    prompt: "Nghe một lần. Bạn nghe thấy mức giá nào?"
    text: "It's five dollars."
  - type: tip
    title: "Hỏi đúng món đang nói tới"
    body: "Dùng How much is this? cho món ở gần bạn và How much is that? cho món ở xa hơn. Người bán có thể trả lời bằng It's + giá."
  - type: teach
    items:
      - { form: "How much is this?", gloss: "hỏi giá món ở gần", example: "How much is this bag?" }
      - { form: "How much is that?", gloss: "hỏi giá món ở xa hơn", example: "How much is that?" }
      - { form: "It's five dollars.", gloss: "nói một mức giá đơn giản", example: "It's five dollars." }
  - type: practice
    id: en-u06-price-context
    kind: dialogue_choice
    prompt: "Bạn chỉ vào chiếc túi ngay cạnh. Câu nào tự nhiên?"
    choices: ["How much is this bag?", "Where is this bag?", "Do you like this bag?"]
    answer: "How much is this bag?"
  - type: practice
    id: en-u06-price-listen
    kind: audio_choice
    prompt: "Nghe và chọn giá đúng."
    audioText: "It's eight dollars."
    choices: ["$5", "$8", "$10"]
    answer: "$8"
  - type: practice
    id: en-u06-price-produce
    kind: type_answer
    prompt: "Hỏi giá chiếc túi ở gần bạn."
    answer: "How much is this bag"
    acceptedAnswers: ["How much is this bag?", "How much is this?"]
    hints:
      - "Bắt đầu bằng How much …"
  - type: checkpoint
    items:
      - id: en-u06-price-check-reply
        kind: dialogue_choice
        prompt: "Khách hỏi “How much is this?” Câu nào trả lời bằng giá?"
        choices: ["It's six dollars.", "It's my sister.", "It's at six."]
        answer: "It's six dollars."
      - id: en-u06-price-check-that
        kind: meaning_choice
        prompt: "Từ nào có thể chỉ món đồ ở xa hơn?"
        choices: ["that", "today", "then"]
        answer: "that"
exercise:
  type: type_answer
  prompt: "Hỏi giá món đồ ở ngay cạnh bạn."
  answer: "How much is this"
  acceptedAnswers: ["How much is this?", "How much is this item?", "How much is this item"]
---

Dùng câu hỏi để đưa ra một quyết định mua hàng thật; con số quan trọng vì nó ảnh hưởng bước tiếp theo.
