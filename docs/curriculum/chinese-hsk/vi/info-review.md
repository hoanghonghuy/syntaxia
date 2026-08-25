---
id: zh-hsk-b1-u06-review
track: chinese-hsk
locale: vi
slug: info-review
title: "Ôn lại: hỏi về người và nơi chốn"
order: 11
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-info-06
unit_title: "Hỏi về người và nơi chốn"
unit_order: 6
unit_can_do: "Hỏi ai hoặc ở đâu và trả lời bằng một người, địa điểm hoặc nơi đến trong hội thoại ngắn"
unit_role: review
can_do: "Tự nhớ lại câu hỏi ai/ở đâu và câu trả lời về nơi chốn mà không cần mẫu"
pattern: "这是谁？ / …在哪里？ / 你去哪里？"
objectives:
  - "Nhớ lại từ để hỏi đúng theo ngữ cảnh"
  - "Tự dựng lại một đoạn hỏi đáp ngắn về người và nơi"
steps:
  - type: scene
    title: "Tự hỏi lại từ trí nhớ"
    body: "Sau đó bạn lại cần cùng loại thông tin. Hãy tự dựng câu hỏi ai/ở đâu mà không chép mẫu."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我哥哥。", reading: "zhè shì wǒ gē ge" }
      - { speaker: "A", text: "他在哪里？", reading: "tā zài nǎ lǐ" }
      - { speaker: "B", text: "他在学校。", reading: "tā zài xué xiào" }
      - { speaker: "A", text: "你去哪里？", reading: "nǐ qù nǎ lǐ" }
      - { speaker: "B", text: "我去商店。", reading: "wǒ qù shāng diàn" }
  - type: listen
    prompt: "Nghe trước khi đọc. Thông tin nào đang bị thiếu?"
    text: "他在哪里？"
    reading: "tā zài nǎ lǐ"
  - type: practice
    id: zh-info-u06-review-listen
    kind: audio_choice
    prompt: "Nghe và chọn từ để hỏi."
    audioText: "你去哪里？"
    choices: ["哪里", "谁", "什么"]
    answer: "哪里"
  - type: practice
    id: zh-info-u06-review-reply
    kind: dialogue_choice
    prompt: "Ai đó hỏi 这是谁？ Đó là anh trai của bạn. Câu nào phù hợp?"
    choices: ["这是我哥哥。", "我去哥哥。", "哥哥在哪里？"]
    answer: "这是我哥哥。"
  - type: practice
    id: zh-info-u06-review-produce
    kind: type_answer
    prompt: "Gõ câu: “Bạn đi đâu?”"
    answer: "你去哪里"
    acceptedAnswers: ["你去哪里？"]
    hints:
      - "Dùng 你 + 去 + 哪里."
  - type: checkpoint
    items:
      - id: zh-info-u06-review-person
        kind: audio_choice
        prompt: "Nghe. Bạn nghe câu hỏi nào?"
        audioText: "这是谁？"
        choices: ["这是谁？", "你去哪里？", "她在哪里？"]
        answer: "这是谁？"
      - id: zh-info-u06-review-place
        kind: dialogue_choice
        prompt: "Ai đó hỏi 她在哪里？ Cô ấy ở trường. Bạn nói gì?"
        choices: ["她在学校。", "她去谁。", "她是哪里。"]
        answer: "她在学校。"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Anh ấy ở đâu?”"
  answer: "他在哪里"
  acceptedAnswers: ["他在哪里？"]
---

Ôn lại là tự truy xuất: xác định thông tin còn thiếu là người hay nơi, rồi tạo câu hỏi hoặc câu trả lời phù hợp.
