---
id: en-a1-foundation-04-checkpoint
track: english-basics
locale: vi
slug: foundation-checkpoint
title: Checkpoint nền tảng tiếng Anh
order: -2
published: true
cefr_level: a1
unit_id: en-a1-foundation-00
unit_title: "Nền tảng tiếng Anh"
unit_order: 0
unit_can_do: "Nghe và tạo được một nhóm âm cơ bản, dùng trọng âm từ và xây câu be nền tảng"
unit_role: checkpoint
can_do: "Chứng minh có thể nghe một đối lập âm cơ bản, nhận ra trọng âm và xây câu be đơn giản trước Unit 1"
pattern: "sound + stress + be"
objectives:
  - Kiểm tra một đối lập âm cơ bản
  - Kiểm tra trọng âm của từ quen thuộc
  - Kiểm tra am/is/are trong câu kể và câu hỏi
vocab:
  - { word: "seat", ipa: "/siːt/", gloss: "chỗ ngồi" }
  - { word: "water", ipa: "/ˈwɔːtər/", gloss: "nước" }
  - { word: "ready", ipa: "/ˈredi/", gloss: "sẵn sàng" }
steps:
  - type: scene
    title: "Cổng nền tảng trước bài gặp gỡ"
    body: "Làm một bài kiểm tra hỗn hợp ngắn. Mục tiêu là âm đủ rõ và câu dùng được, không phải accent hoàn hảo hay thuộc tên ngữ pháp."
    imageUrl: "/language/scenes/english-be-sentence.svg"
    imageAlt: "Sơ đồ xây câu tiếng Anh đơn giản với đại từ và các dạng be."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Are you ready?" }
      - { speaker: "B", text: "Yes, I am." }
      - { speaker: "A", text: "Water?" }
      - { speaker: "B", text: "Yes, water, please." }
  - type: listen
    prompt: "Nghe cả từ và trọng âm của nó."
    text: "Water, please."
  - type: practice
    id: en-f00-gate-sound-1
    kind: audio_choice
    prompt: "Nghe và chọn từ."
    audioText: "seat"
    choices: ["sit", "seat", "set"]
    answer: "seat"
  - type: practice
    id: en-f00-gate-stress-1
    kind: meaning_choice
    prompt: "Mẫu trọng âm đúng của water là gì?"
    choices: ["WA-ter", "wa-TER", "nhấn đều"]
    answer: "WA-ter"
  - type: practice
    id: en-f00-gate-be-1
    kind: fill_blank
    prompt: "Hoàn thành: We ___ ready."
    choices: ["am", "is", "are"]
    answer: "are"
  - type: checkpoint
    items:
      - id: en-f00-gate-check-1
        kind: order_words
        prompt: "Xây câu hỏi."
        tokens: ["you", "Are", "ready"]
        answer: "Are you ready"
        acceptedAnswers: ["Are you ready?"]
      - id: en-f00-gate-check-2
        kind: dialogue_choice
        prompt: "Có người hỏi “Are you Mai?” Bạn không phải Mai. Câu nào phù hợp?"
        choices: ["No, I'm not.", "No, I isn't.", "No, you aren't."]
        answer: "No, I'm not."
exercise:
  type: fill_blank
  prompt: "Hoàn thành: She ___ here."
  choices: ["am", "is", "are"]
  answer: "is"
  hints:
    - "She đi với is."
---

Qua checkpoint này nghĩa là người học có đủ nền tảng âm và câu để bắt đầu chuỗi giao tiếp.
