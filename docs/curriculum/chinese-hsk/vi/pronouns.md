---
id: zh-hsk-b1-02-pronouns
track: chinese-hsk
locale: vi
slug: pronouns
title: "Hỏi tên và giới thiệu một người"
order: 2
published: true
hsk_band: 1
hsk_version: "3.0"
can_do: "Hỏi tên, nói tên của mình và nhắc tới một người khác"
pattern: "我叫… / 你叫什么名字？ / 他（她）叫…"
objectives:
  - "Trao đổi tên khi mới gặp"
  - "Dùng 我 / 你 / 他 / 她 trong câu giới thiệu ngắn"
vocab:
  - { hanzi: "我", pinyin: "wǒ", gloss: "tôi" }
  - { hanzi: "你", pinyin: "nǐ", gloss: "bạn" }
  - { hanzi: "他", pinyin: "tā", gloss: "anh ấy" }
  - { hanzi: "她", pinyin: "tā", gloss: "cô ấy" }
  - { hanzi: "叫", pinyin: "jiào", gloss: "tên là / được gọi là" }
  - { hanzi: "名字", pinyin: "míng zi", gloss: "tên" }
  - { hanzi: "我们", pinyin: "wǒ men", gloss: "chúng tôi / chúng ta" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Bạn ngồi cạnh một bạn học mới. Hai người trao đổi tên rồi giới thiệu một người bạn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！你叫什么名字？", reading: "nǐ hǎo! nǐ jiào shén me míng zi" }
      - { speaker: "B", text: "我叫小明。你呢？", reading: "wǒ jiào xiǎo míng. nǐ ne" }
      - { speaker: "A", text: "我叫小红。她叫安娜。", reading: "wǒ jiào xiǎo hóng. tā jiào ān nà" }
  - type: listen
    prompt: "Nghe mẫu câu dùng để nói tên."
    text: "我叫小红。"
    reading: "wǒ jiào xiǎo hóng"
  - type: tip
    title: "他 và 她 có cùng cách đọc"
    body: "他 và 她 đều đọc là tā. Chữ viết giúp phân biệt. Dùng 我叫 + tên để giới thiệu tên mình."
  - type: teach
    items:
      - { form: "我叫…", reading: "wǒ jiào", gloss: "tôi tên là…", example: "我叫小明。" }
      - { form: "你叫什么名字？", reading: "nǐ jiào shén me míng zi", gloss: "bạn tên là gì?", example: "你叫什么名字？" }
      - { form: "他叫…", reading: "tā jiào", gloss: "anh ấy tên là…", example: "他叫大卫。" }
      - { form: "她叫…", reading: "tā jiào", gloss: "cô ấy tên là…", example: "她叫安娜。" }
  - type: practice
    id: zh-name-reply-1
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你叫什么名字？ Chọn câu đáp tự nhiên."
    choices: ["我叫小明。", "不客气。", "再见。"]
    answer: "我叫小明。"
  - type: practice
    id: zh-name-listen-1
    kind: audio_choice
    prompt: "Nghe. Đại từ viết nào khớp với câu?"
    audioText: "她叫安娜。"
    choices: ["她", "他", "我"]
    answer: "她"
    explanation: "她 và 他 đều đọc là tā; chữ viết giúp phân biệt."
  - type: practice
    id: zh-name-produce-1
    kind: type_answer
    prompt: "Bạn tên 小明. Gõ một câu tự giới thiệu đầy đủ."
    answer: "我叫小明"
    acceptedAnswers: ["我叫小明。"]
    hints:
      - "Bắt đầu bằng 我叫."
  - type: checkpoint
    items:
      - id: zh-name-check-1
        kind: meaning_choice
        prompt: "Dạng nào có nghĩa “tôi”?"
        choices: ["我", "你", "他"]
        answer: "我"
      - id: zh-name-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: ai đó nói 谢谢. Bạn đáp gì?"
        choices: ["不客气", "我叫小明", "你好"]
        answer: "不客气"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu đáp tự nhiên cho 你叫什么名字？"
  choices: ["我叫小明。", "你好。", "再见。"]
  answer: "我叫小明。"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
