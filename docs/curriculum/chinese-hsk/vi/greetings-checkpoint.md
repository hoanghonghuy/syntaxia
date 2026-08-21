---
id: zh-hsk-b1-u01-checkpoint
track: chinese-hsk
locale: vi
slug: greetings-checkpoint
title: "Checkpoint: chào hỏi"
order: 2
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-greeting-01
unit_title: "Chào hỏi và kết thúc một lượt giao tiếp"
unit_order: 1
unit_can_do: "Chào một người, cảm ơn và kết thúc một lượt giao tiếp ngắn một cách tự nhiên"
unit_role: checkpoint
can_do: "Hoàn thành một lượt chào hỏi ngắn với ít gợi ý"
pattern: "你好 / 谢谢 / 不客气 / 再见"
objectives:
  - Đáp lại tự nhiên khi được chào hoặc cảm ơn
  - Tự gõ các chữ Hán chính từ trí nhớ
steps:
  - type: scene
    title: "Trước giờ học"
    body: "Bạn gặp một bạn học trước giờ học và chỉ có vài giây để chào hỏi."
    visualKey: "classmates-meeting"
    imageAlt: "Hai bạn học quay sang nhau trước giờ học và bắt đầu một lượt chào hỏi ngắn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "B", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "A", text: "谢谢你。", reading: "xiè xie nǐ" }
      - { speaker: "B", text: "不客气。", reading: "bú kè qi" }
      - { speaker: "A", text: "再见！", reading: "zài jiàn" }
  - type: listen
    prompt: "Nghe trước. Câu đáp nào đi sau 谢谢?"
    text: "不客气。"
    reading: "bú kè qi"
  - type: practice
    id: zh-u01-check-audio
    kind: audio_choice
    prompt: "Nghe và chọn cụm bạn nghe được."
    audioText: "再见"
    choices: ["再见", "谢谢", "你好"]
    answer: "再见"
  - type: practice
    id: zh-u01-check-reply
    kind: dialogue_choice
    prompt: "A nói 谢谢. Chọn câu đáp tự nhiên."
    choices: ["不客气。", "你好。", "再见。"]
    answer: "不客气。"
    explanation: "Trong lượt giao tiếp này, 不客气 là câu đáp cơ bản tự nhiên cho 谢谢."
  - type: practice
    id: zh-u01-check-type
    kind: type_answer
    prompt: "Gõ chữ Hán của “xin chào”."
    answer: "你好"
    hints:
      - "Chữ đầu là 你."
      - "Chữ sau là 好."
  - type: checkpoint
    items:
      - id: zh-u01-check-close
        kind: meaning_choice
        prompt: "Cụm nào dùng để kết thúc lượt giao tiếp?"
        choices: ["再见", "谢谢", "你好"]
        answer: "再见"
      - id: zh-u01-check-thanks
        kind: dialogue_choice
        prompt: "Một người giúp bạn và bạn muốn cảm ơn. Bạn có thể nói gì?"
        choices: ["谢谢你。", "不客气。", "再见。"]
        answer: "谢谢你。"
exercise:
  type: type_answer
  prompt: "Gõ chữ Hán của “tạm biệt”."
  answer: "再见"
---

Hãy dùng chữ Hán cùng cả lượt giao tiếp. Pinyin là phần hỗ trợ, không thay thế việc nhận ra chữ Hán.
