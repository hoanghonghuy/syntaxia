---
id: zh-hsk-b1-01-greetings
track: chinese-hsk
locale: vi
slug: greetings
title: "Chào hỏi, cảm ơn và tạm biệt"
order: 1
published: true
hsk_band: 1
hsk_version: "3.0"
can_do: "Chào một người, cảm ơn và kết thúc một lượt giao tiếp ngắn một cách tự nhiên"
pattern: "你好 / 谢谢 / 不客气 / 再见"
objectives:
  - "Mở và kết thúc một lượt chào hỏi ngắn"
  - "Đáp lại 谢谢 một cách tự nhiên"
vocab:
  - { hanzi: "你好", pinyin: "nǐ hǎo", gloss: "xin chào" }
  - { hanzi: "谢谢", pinyin: "xiè xie", gloss: "cảm ơn" }
  - { hanzi: "不客气", pinyin: "bú kè qi", gloss: "không có gì" }
  - { hanzi: "再见", pinyin: "zài jiàn", gloss: "tạm biệt" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Bạn gặp một bạn học trước giờ học. Hãy chào và kết thúc cuộc nói chuyện lịch sự."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "B", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "A", text: "谢谢你。", reading: "xiè xie nǐ" }
      - { speaker: "B", text: "不客气。", reading: "bú kè qi" }
      - { speaker: "A", text: "再见！", reading: "zài jiàn" }
      - { speaker: "B", text: "再见！", reading: "zài jiàn" }
  - type: listen
    prompt: "Nghe trước. A đã dùng cụm nào để cảm ơn B?"
    text: "谢谢你。"
    reading: "xiè xie nǐ"
  - type: tip
    title: "Học theo cả cụm giao tiếp"
    body: "Hãy học 你好, 谢谢, 不客气 và 再见 như các cụm dùng ngay trong giao tiếp. Pinyin hỗ trợ phát âm; chữ Hán vẫn là dạng đích cần nhận biết."
  - type: teach
    items:
      - { form: "你好", reading: "nǐ hǎo", gloss: "xin chào", example: "你好！" }
      - { form: "谢谢", reading: "xiè xie", gloss: "cảm ơn", example: "谢谢你。" }
      - { form: "不客气", reading: "bú kè qi", gloss: "không có gì", example: "不客气。" }
      - { form: "再见", reading: "zài jiàn", gloss: "tạm biệt", example: "再见！" }
  - type: practice
    id: zh-greet-reply-1
    kind: dialogue_choice
    prompt: "Ai đó nói 谢谢. Đáp lại tự nhiên nhất là gì?"
    choices: ["不客气", "再见", "你好"]
    answer: "不客气"
    explanation: "谢谢 và 不客气 thường đi thành một cặp cảm ơn – đáp lại."
  - type: practice
    id: zh-greet-listen-1
    kind: audio_choice
    prompt: "Nghe và chọn cụm bạn nghe được."
    audioText: "你好"
    choices: ["你好", "谢谢", "再见"]
    answer: "你好"
  - type: practice
    id: zh-greet-type-1
    kind: type_answer
    prompt: "Gõ chữ Hán của “tạm biệt”."
    answer: "再见"
    hints:
      - "Chữ đầu là 再."
      - "Chữ sau là 见."
  - type: checkpoint
    items:
      - id: zh-greet-check-1
        kind: meaning_choice
        prompt: "Cụm nào dùng để kết thúc một cuộc gặp?"
        choices: ["再见", "你好", "谢谢"]
        answer: "再见"
      - id: zh-greet-check-2
        kind: dialogue_choice
        prompt: "Một bạn học nói 你好. Bạn có thể đáp lại thế nào?"
        choices: ["你好！", "不客气。", "再见。"]
        answer: "你好！"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu đáp tự nhiên cho 谢谢."
  choices: ["不客气", "你好", "再见"]
  answer: "不客气"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
