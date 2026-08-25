---
id: zh-hsk-b1-u08-checkpoint
track: chinese-hsk
locale: vi
slug: travel-checkpoint
title: "Checkpoint: nói bạn di chuyển bằng gì"
order: 12
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-travel-08
unit_title: "Nói bạn di chuyển bằng gì"
unit_order: 8
unit_can_do: "Hỏi ai đó di chuyển bằng gì và trả lời bằng tàu hỏa, máy bay hoặc taxi"
unit_role: checkpoint
can_do: "Trả lời câu hỏi đơn giản về cách di chuyển với ít hỗ trợ"
pattern: "你怎么去？ / 我坐火车。 / 我坐飞机。 / 我打车。"
objectives:
  - "Nhận ra phương tiện được chọn khi nghe"
  - "Chọn đúng 坐 + phương tiện hoặc cụm cố định 打车"
steps:
  - type: scene
    title: "Chọn cách đi"
    body: "Một người bạn hỏi bạn sẽ đi bằng gì. Hãy trả lời bằng phương tiện bạn định sử dụng."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你怎么去？", reading: "nǐ zěn me qù" }
      - { speaker: "B", text: "我坐火车。", reading: "wǒ zuò huǒ chē" }
      - { speaker: "A", text: "他呢？", reading: "tā ne" }
      - { speaker: "B", text: "他打车。", reading: "tā dǎ chē" }
  - type: listen
    prompt: "Nghe trước. Bạn nghe phương tiện nào?"
    text: "我坐飞机。"
    reading: "wǒ zuò fēi jī"
  - type: practice
    id: zh-travel-u08-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn phương tiện."
    audioText: "我坐火车。"
    choices: ["火车", "飞机", "打车"]
    answer: "火车"
  - type: practice
    id: zh-travel-u08-check-reply
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你怎么去？ Bạn đi máy bay. Bạn nói gì?"
    choices: ["我坐飞机。", "我是飞机。", "我去飞机。"]
    answer: "我坐飞机。"
  - type: practice
    id: zh-travel-u08-check-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi đi taxi.”"
    answer: "我打车"
    acceptedAnswers: ["我打车。"]
    hints:
      - "Dùng cụm cố định 打车, không thêm 坐."
  - type: checkpoint
    items:
      - id: zh-travel-u08-check-train
        kind: type_answer
        prompt: "Gõ câu: “Tôi đi tàu hỏa.”"
        answer: "我坐火车"
        acceptedAnswers: ["我坐火车。"]
      - id: zh-travel-u08-check-question
        kind: audio_choice
        prompt: "Nghe. Bạn nghe câu hỏi nào?"
        audioText: "你怎么去？"
        choices: ["你怎么去？", "你去哪里？", "这是谁？"]
        answer: "你怎么去？"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Tôi đi máy bay.”"
  answer: "我坐飞机"
  acceptedAnswers: ["我坐飞机。"]
---

Checkpoint kiểm tra một lựa chọn di chuyển thật: hiểu người đó đi bằng gì và trả lời bằng cụm phương tiện đúng.
