---
id: zh-hsk-b1-u06-checkpoint
track: chinese-hsk
locale: vi
slug: info-checkpoint
title: "Checkpoint: hỏi về người và nơi chốn"
order: 10
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-info-06
unit_title: "Hỏi về người và nơi chốn"
unit_order: 6
unit_can_do: "Hỏi ai hoặc ở đâu và trả lời bằng một người, địa điểm hoặc nơi đến trong hội thoại ngắn"
unit_role: checkpoint
can_do: "Hỏi và trả lời câu cơ bản về ai/ở đâu với ít hỗ trợ"
pattern: "这是谁？ / 她在哪里？ / 你去哪里？"
objectives:
  - "Chọn đúng câu hỏi khi thiếu thông tin về người hoặc nơi"
  - "Trả lời câu hỏi nơi đến bằng một cụm dùng được"
steps:
  - type: scene
    title: "Hỏi thông tin còn thiếu"
    body: "Bạn đang xem ảnh lớp rồi chuẩn bị ra về. Hãy hỏi một người là ai, cô ấy ở đâu và bạn học đang đi đâu."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我姐姐。", reading: "zhè shì wǒ jiě jie" }
      - { speaker: "A", text: "她在哪里？", reading: "tā zài nǎ lǐ" }
      - { speaker: "B", text: "她在学校。", reading: "tā zài xué xiào" }
      - { speaker: "A", text: "你去哪里？", reading: "nǐ qù nǎ lǐ" }
      - { speaker: "B", text: "我回家。", reading: "wǒ huí jiā" }
  - type: listen
    prompt: "Nghe trước. Người nói đang hỏi ai hay ở đâu?"
    text: "她在哪里？"
    reading: "tā zài nǎ lǐ"
  - type: practice
    id: zh-info-u06-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn từ để hỏi bạn nghe thấy."
    audioText: "这是谁？"
    choices: ["谁", "哪里", "什么"]
    answer: "谁"
  - type: practice
    id: zh-info-u06-check-reply
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你去哪里？ Bạn về nhà. Bạn nói gì?"
    choices: ["我回家。", "我是谁？", "我在谁。"]
    answer: "我回家。"
  - type: practice
    id: zh-info-u06-check-produce
    kind: type_answer
    prompt: "Gõ câu: “Cô ấy ở đâu?”"
    answer: "她在哪里"
    acceptedAnswers: ["她在哪里？"]
    hints:
      - "Dùng 她 + 在 + 哪里."
  - type: checkpoint
    items:
      - id: zh-info-u06-check-who
        kind: dialogue_choice
        prompt: "Bạn chưa biết người đó là ai. Câu hỏi nào phù hợp?"
        choices: ["这是谁？", "你去哪里？", "这是哪里？"]
        answer: "这是谁？"
      - id: zh-info-u06-check-destination
        kind: audio_choice
        prompt: "Nghe. Người này đi đâu?"
        audioText: "我去医院。"
        choices: ["医院", "学校", "商店"]
        answer: "医院"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Đây là ai?”"
  answer: "这是谁"
  acceptedAnswers: ["这是谁？"]
---

Checkpoint kiểm tra khoảng trống thông tin: chọn câu hỏi đúng với điều chưa biết, rồi hiểu hoặc đưa ra thông tin người/nơi còn thiếu.
