---
id: zh-hsk-b1-u02-checkpoint
track: chinese-hsk
locale: vi
slug: introductions-checkpoint
title: "Kiểm tra: giới thiệu bản thân và người khác"
order: 15
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-people-02
unit_title: "Giới thiệu bản thân và người gần gũi"
unit_order: 2
unit_can_do: "Trao đổi tên và giới thiệu bạn bè hoặc người thân"
unit_role: checkpoint
can_do: "Trao đổi tên và giới thiệu một người gần gũi với ít hỗ trợ"
pattern: "你叫什么名字？ / 我叫… / 这是我…"
objectives:
  - "Hỏi và trả lời về tên"
  - "Giới thiệu bạn bè hoặc người thân"
  - "Nối âm pinyin với đúng chữ Hán"
steps:
  - type: scene
    title: "Gặp và giới thiệu"
    body: "Bạn gặp một bạn học mới, trao đổi tên rồi cho xem ảnh gia đình."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你叫什么名字？", reading: "nǐ jiào shén me míng zi" }
      - { speaker: "B", text: "我叫小明。", reading: "wǒ jiào xiǎo míng" }
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我姐姐。", reading: "zhè shì wǒ jiě jie" }
  - type: listen
    prompt: "Nghe và xác định người thân được giới thiệu."
    text: "这是我妈妈。"
    reading: "zhè shì wǒ mā ma"
  - type: practice
    id: zh-u02-check-listen
    kind: audio_choice
    prompt: "Nghe. Ai đang được giới thiệu?"
    audioText: "这是我爸爸。"
    choices: ["爸爸", "妈妈", "姐姐"]
    answer: "爸爸"
  - type: practice
    id: zh-u02-check-reply
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你叫什么名字？ Chọn câu đáp tự nhiên."
    choices: ["我叫小红。", "这是我妈妈。", "不客气。"]
    answer: "我叫小红。"
  - type: practice
    id: zh-u02-check-produce
    kind: type_answer
    prompt: "Gõ câu: “Đây là chị gái tôi.”"
    answer: "这是我姐姐"
    acceptedAnswers: ["这是我姐姐。"]
    hints:
      - "Dùng 这是我 + 姐姐."
  - type: checkpoint
    items:
      - id: zh-u02-check-name
        kind: dialogue_choice
        prompt: "Câu nào dùng để hỏi tên?"
        choices: ["你叫什么名字？", "这是谁？", "你去哪儿？"]
        answer: "你叫什么名字？"
      - id: zh-u02-check-character
        kind: audio_choice
        prompt: "Nghe. Chữ nào khớp với tā trong câu này?"
        audioText: "她叫安娜。"
        choices: ["她", "他", "我"]
        answer: "她"
exercise:
  type: type_answer
  prompt: "Bạn tên 小明. Gõ một câu tự giới thiệu đầy đủ."
  answer: "我叫小明"
  acceptedAnswers: ["我叫小明。"]
---

Dùng mẫu hỏi tên và giới thiệu người như một lượt giao tiếp ngắn hoàn chỉnh.
