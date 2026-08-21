---
id: zh-hsk-b1-11-transport
track: chinese-hsk
locale: vi
slug: transport
title: "Nói bạn đi bằng phương tiện gì"
order: 11
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-travel-08
unit_title: "Nói bạn di chuyển bằng gì"
unit_order: 8
unit_can_do: "Hỏi ai đó di chuyển bằng gì và trả lời bằng tàu hỏa, máy bay hoặc taxi"
unit_role: lesson
can_do: "Nói bạn đi tàu, máy bay hay taxi trong một cuộc trao đổi ngắn về di chuyển"
pattern: "我坐火车。/ 我坐飞机。/ 我打车。"
objectives:
  - "Nhận biết các từ phương tiện phổ biến"
  - "Dùng 坐 + phương tiện và 打车 trong kế hoạch di chuyển"
vocab:
  - { hanzi: "车", pinyin: "chē", gloss: "xe" }
  - { hanzi: "火车", pinyin: "huǒ chē", gloss: "tàu hỏa" }
  - { hanzi: "飞机", pinyin: "fēi jī", gloss: "máy bay" }
  - { hanzi: "车站", pinyin: "chē zhàn", gloss: "nhà ga / bến xe" }
  - { hanzi: "打车", pinyin: "dǎ chē", gloss: "bắt taxi" }
  - { hanzi: "坐", pinyin: "zuò", gloss: "đi / ngồi phương tiện" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Bạn và một người bạn nói về cách mỗi người sẽ di chuyển."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你怎么去？", reading: "nǐ zěn me qù" }
      - { speaker: "B", text: "我坐火车。你呢？", reading: "wǒ zuò huǒ chē. nǐ ne" }
      - { speaker: "A", text: "我坐飞机。", reading: "wǒ zuò fēi jī" }
      - { speaker: "B", text: "好，路上见。", reading: "hǎo, lù shang jiàn" }
  - type: listen
    prompt: "Nghe phương tiện được chọn."
    text: "我坐火车。"
    reading: "wǒ zuò huǒ chē"
  - type: tip
    title: "坐 + phương tiện; 打车 là một cụm cố định"
    body: "Dùng 坐 trước tàu hoặc máy bay: 坐火车, 坐飞机. Học 打车 như một cụm hoàn chỉnh để nói “bắt taxi”."
  - type: teach
    items:
      - { form: "坐火车", reading: "zuò huǒ chē", gloss: "đi tàu hỏa", example: "我坐火车。" }
      - { form: "坐飞机", reading: "zuò fēi jī", gloss: "đi máy bay", example: "我坐飞机。" }
      - { form: "打车", reading: "dǎ chē", gloss: "bắt taxi", example: "我打车。" }
      - { form: "车站", reading: "chē zhàn", gloss: "nhà ga / bến", example: "我去车站。" }
  - type: practice
    id: zh-transport-reply-1
    kind: dialogue_choice
    prompt: "Bạn đi tàu hỏa. Bạn có thể nói gì?"
    choices: ["我坐火车。", "我是火车。", "我要火车。"]
    answer: "我坐火车。"
  - type: practice
    id: zh-transport-listen-1
    kind: audio_choice
    prompt: "Nghe. Bạn nghe phương tiện nào?"
    audioText: "我坐飞机。"
    choices: ["飞机", "火车", "车站"]
    answer: "飞机"
  - type: practice
    id: zh-transport-produce-1
    kind: type_answer
    prompt: "Gõ câu: “Tôi đi tàu hỏa.”"
    answer: "我坐火车"
    acceptedAnswers: ["我坐火车。"]
    hints:
      - "Dùng 我坐 + 火车."
  - type: checkpoint
    items:
      - id: zh-transport-check-1
        kind: meaning_choice
        prompt: "Cụm nào có nghĩa “bắt taxi”?"
        choices: ["打车", "车站", "坐飞机"]
        answer: "打车"
      - id: zh-transport-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: chọn câu tự nhiên cho “Nước lạnh.”"
        choices: ["水很冷。", "水是冷。", "水冷是。"]
        answer: "水很冷。"
exercise:
  type: dialogue_choice
  prompt: "Câu nào nói bạn đi máy bay?"
  choices: ["我坐飞机。", "我坐火车。", "我打车。"]
  answer: "我坐飞机。"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
