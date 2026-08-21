---
id: zh-hsk-b1-07-food-drink
track: chinese-hsk
locale: vi
slug: food-drink
title: "Gọi một món ăn hoặc đồ uống đơn giản"
order: 7
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-counter-05
unit_title: "Gọi món tại quầy"
unit_order: 5
unit_can_do: "Gọi một món ăn hoặc đồ uống đơn giản và phản hồi một câu hỏi ngắn tại quầy"
unit_role: lesson
can_do: "Gọi một đồ uống hoặc món ăn cơ bản và phản hồi lịch sự tại quầy"
pattern: "我要… / 喝水 / 吃米饭"
objectives:
  - "Nhận biết một số từ đồ ăn và đồ uống thông dụng"
  - "Dùng 我要 + món để đưa ra yêu cầu đơn giản"
vocab:
  - { hanzi: "水", pinyin: "shuǐ", gloss: "nước" }
  - { hanzi: "茶", pinyin: "chá", gloss: "trà" }
  - { hanzi: "米饭", pinyin: "mǐ fàn", gloss: "cơm" }
  - { hanzi: "苹果", pinyin: "píng guǒ", gloss: "táo" }
  - { hanzi: "吃", pinyin: "chī", gloss: "ăn" }
  - { hanzi: "喝", pinyin: "hē", gloss: "uống" }
  - { hanzi: "要", pinyin: "yào", gloss: "muốn / lấy" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Bạn đang ở một quầy đồ ăn đơn giản và cần gọi đồ uống cùng một món ăn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好。你要什么？", reading: "nǐ hǎo. nǐ yào shén me" }
      - { speaker: "B", text: "我要茶。", reading: "wǒ yào chá" }
      - { speaker: "A", text: "还要米饭吗？", reading: "hái yào mǐ fàn ma" }
      - { speaker: "B", text: "要，谢谢。", reading: "yào, xiè xie" }
  - type: listen
    prompt: "Nghe món được yêu cầu."
    text: "我要茶。"
    reading: "wǒ yào chá"
  - type: tip
    title: "Học câu yêu cầu dùng được, không học danh sách rời"
    body: "我要 + món là mẫu yêu cầu trực tiếp, dễ dùng ở quầy. Học 喝 với đồ uống và 吃 với đồ ăn để từ mới đi ngay vào câu."
  - type: teach
    items:
      - { form: "我要茶。", reading: "wǒ yào chá", gloss: "Tôi muốn trà.", example: "我要茶。" }
      - { form: "我喝水。", reading: "wǒ hē shuǐ", gloss: "Tôi uống nước.", example: "我喝水。" }
      - { form: "我吃米饭。", reading: "wǒ chī mǐ fàn", gloss: "Tôi ăn cơm.", example: "我吃米饭。" }
      - { form: "苹果", reading: "píng guǒ", gloss: "táo", example: "我要苹果。" }
  - type: practice
    id: zh-food-reply-1
    kind: dialogue_choice
    prompt: "Ở quầy, bạn muốn trà. Bạn có thể nói gì?"
    choices: ["我要茶。", "我是茶。", "茶在哪里？"]
    answer: "我要茶。"
  - type: practice
    id: zh-food-listen-1
    kind: audio_choice
    prompt: "Nghe và chọn đồ uống."
    audioText: "茶"
    choices: ["茶", "水", "米饭"]
    answer: "茶"
  - type: practice
    id: zh-food-produce-1
    kind: type_answer
    prompt: "Gõ câu: “Tôi muốn nước.”"
    answer: "我要水"
    acceptedAnswers: ["我要水。"]
    hints:
      - "Dùng 我要 + 水."
  - type: checkpoint
    items:
      - id: zh-food-check-1
        kind: meaning_choice
        prompt: "Động từ nào đi với đồ uống như nước?"
        choices: ["喝", "吃", "学习"]
        answer: "喝"
      - id: zh-food-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: ai đó hỏi 你是学生吗？ Chọn câu khẳng định."
        choices: ["是，我是学生。", "我要茶。", "不客气。"]
        answer: "是，我是学生。"
exercise:
  type: dialogue_choice
  prompt: "Câu nào dùng để gọi trà?"
  choices: ["我要茶。", "我喝学校。", "我是米饭。"]
  answer: "我要茶。"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
