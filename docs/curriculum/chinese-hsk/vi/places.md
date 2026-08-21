---
id: zh-hsk-b1-08-places
track: chinese-hsk
locale: vi
slug: places
title: "Nói bạn đang đi đâu"
order: 8
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-info-06
unit_title: "Hỏi về người và nơi chốn"
unit_order: 6
unit_can_do: "Hỏi ai hoặc ở đâu và trả lời bằng một người, địa điểm hoặc nơi đến trong hội thoại ngắn"
unit_role: lesson
can_do: "Hỏi ai đó đi đâu và trả lời bằng một địa điểm thông dụng"
pattern: "你去哪里？ / 我去… / 我回家。"
objectives:
  - "Nhận biết một số địa điểm thông dụng"
  - "Hỏi và trả lời một câu đơn giản về nơi sắp đi"
vocab:
  - { hanzi: "商店", pinyin: "shāng diàn", gloss: "cửa hàng" }
  - { hanzi: "医院", pinyin: "yī yuàn", gloss: "bệnh viện" }
  - { hanzi: "学校", pinyin: "xué xiào", gloss: "trường học" }
  - { hanzi: "家", pinyin: "jiā", gloss: "nhà" }
  - { hanzi: "去", pinyin: "qù", gloss: "đi" }
  - { hanzi: "在", pinyin: "zài", gloss: "ở" }
  - { hanzi: "回家", pinyin: "huí jiā", gloss: "về nhà" }
  - { hanzi: "哪里", pinyin: "nǎ lǐ", gloss: "ở đâu" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Tan học. Một người bạn hỏi bạn sẽ đi đâu tiếp theo."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你去哪里？", reading: "nǐ qù nǎ lǐ" }
      - { speaker: "B", text: "我去商店。你呢？", reading: "wǒ qù shāng diàn. nǐ ne" }
      - { speaker: "A", text: "我回家。", reading: "wǒ huí jiā" }
      - { speaker: "B", text: "好，再见！", reading: "hǎo, zài jiàn" }
  - type: listen
    prompt: "Nghe địa điểm đến."
    text: "我去商店。"
    reading: "wǒ qù shāng diàn"
  - type: tip
    title: "去 + nơi đến; học 回家 như một cụm"
    body: "Dùng 我去 + địa điểm để nói nơi đến. 回家 thường dùng trực tiếp, không cần 去: 我回家. Hãy giữ hai mẫu này như hai cụm riêng."
  - type: teach
    items:
      - { form: "我去商店。", reading: "wǒ qù shāng diàn", gloss: "Tôi đi cửa hàng.", example: "我去商店。" }
      - { form: "我去医院。", reading: "wǒ qù yī yuàn", gloss: "Tôi đi bệnh viện.", example: "我去医院。" }
      - { form: "我在学校。", reading: "wǒ zài xué xiào", gloss: "Tôi ở trường.", example: "我在学校。" }
      - { form: "我回家。", reading: "wǒ huí jiā", gloss: "Tôi về nhà.", example: "我回家。" }
  - type: practice
    id: zh-place-reply-1
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你去哪里？ Bạn đang đi cửa hàng. Bạn nói gì?"
    choices: ["我去商店。", "我是商店。", "我要商店。"]
    answer: "我去商店。"
  - type: practice
    id: zh-place-listen-1
    kind: audio_choice
    prompt: "Nghe. Người này đi đâu?"
    audioText: "我去医院。"
    choices: ["医院", "学校", "商店"]
    answer: "医院"
  - type: practice
    id: zh-place-produce-1
    kind: type_answer
    prompt: "Gõ câu: “Tôi về nhà.”"
    answer: "我回家"
    acceptedAnswers: ["我回家。"]
    hints:
      - "Dùng cụm 回家."
  - type: checkpoint
    items:
      - id: zh-place-check-1
        kind: meaning_choice
        prompt: "Từ nào dùng để hỏi “ở đâu”?"
        choices: ["哪里", "什么", "谁"]
        answer: "哪里"
      - id: zh-place-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: ở quầy bạn muốn nước. Bạn có thể nói gì?"
        choices: ["我要水。", "我去水。", "我是水。"]
        answer: "我要水。"
exercise:
  type: dialogue_choice
  prompt: "Câu nào có nghĩa “Tôi đi cửa hàng”?"
  choices: ["我去商店。", "我回家。", "我在学校。"]
  answer: "我去商店。"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
