---
id: zh-hsk-b1-u08-review
track: chinese-hsk
locale: vi
slug: travel-review
title: "Ôn tập: nói bạn di chuyển bằng gì"
order: 13
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-travel-08
unit_title: "Nói bạn di chuyển bằng gì"
unit_order: 8
unit_can_do: "Hỏi ai đó di chuyển bằng gì và trả lời bằng tàu hỏa, máy bay hoặc taxi"
unit_role: review
can_do: "Nhớ lại câu hỏi về cách di chuyển và trả lời bằng cụm phương tiện đúng"
pattern: "你怎么去？ / 我坐火车。 / 我坐飞机。 / 我打车。"
objectives:
  - "Nhớ lại 怎么去 từ âm thanh và ngữ cảnh"
  - "Tự tạo 坐 + phương tiện hoặc 打车 khi không có câu mẫu"
steps:
  - type: scene
    title: "Kế hoạch di chuyển"
    body: "Bạn gặp lại một người bạn và nhanh chóng hỏi nhau cách mỗi người sẽ di chuyển."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你怎么去？", reading: "nǐ zěn me qù" }
      - { speaker: "B", text: "我打车。你呢？", reading: "wǒ dǎ chē. nǐ ne" }
      - { speaker: "A", text: "我坐火车。", reading: "wǒ zuò huǒ chē" }
  - type: listen
    prompt: "Nghe và nhớ lại phương tiện được chọn."
    text: "我坐飞机。"
    reading: "wǒ zuò fēi jī"
  - type: practice
    id: zh-travel-u08-review-listen
    kind: audio_choice
    prompt: "Nghe. Người này đi bằng gì?"
    audioText: "我打车。"
    choices: ["打车", "坐火车", "坐飞机"]
    answer: "打车"
  - type: practice
    id: zh-travel-u08-review-question
    kind: dialogue_choice
    prompt: "Câu nào hỏi ai đó đi bằng gì?"
    choices: ["你怎么去？", "你去哪里？", "你是谁？"]
    answer: "你怎么去？"
  - type: practice
    id: zh-travel-u08-review-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi đi máy bay.”"
    answer: "我坐飞机"
    acceptedAnswers: ["我坐飞机。"]
    hints:
      - "Dùng 坐 trước 飞机."
  - type: checkpoint
    items:
      - id: zh-travel-u08-review-taxi
        kind: type_answer
        prompt: "Gõ câu: “Tôi đi taxi.”"
        answer: "我打车"
        acceptedAnswers: ["我打车。"]
      - id: zh-travel-u08-review-train
        kind: listen_type
        prompt: "Nghe và gõ đầy đủ câu."
        audioText: "我坐火车。"
        answer: "我坐火车"
        acceptedAnswers: ["我坐火车。"]
exercise:
  type: type_answer
  prompt: "Gõ câu trả lời tự nhiên cho 你怎么去？ nếu bạn đi tàu hỏa."
  answer: "我坐火车"
  acceptedAnswers: ["我坐火车。"]
---

Phần ôn tập giảm phần gợi ý và yêu cầu nhớ lại câu hỏi cùng các cụm phương tiện từ trí nhớ.
