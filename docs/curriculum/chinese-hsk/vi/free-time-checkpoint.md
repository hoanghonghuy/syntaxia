---
id: zh-hsk-b1-u11-checkpoint
track: chinese-hsk
locale: vi
slug: free-time-checkpoint
title: "Checkpoint: lên kế hoạch thời gian rảnh"
order: 20
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-free-time-11
unit_title: "Lên một kế hoạch thời gian rảnh đơn giản"
unit_order: 11
unit_can_do: "Nói một sở thích đơn giản, hỏi bạn có muốn đi không và phản hồi với kế hoạch"
unit_role: checkpoint
can_do: "Hiểu một sở thích hoặc lời rủ và tự tạo một phản hồi kế hoạch ngắn"
pattern: "喜欢看电影 / 想去看电影 / 想去"
objectives:
  - Lấy sở thích từ audio ngắn
  - Nhận ra một lời rủ đơn giản
  - Tự tạo phản hồi tích cực cho kế hoạch
steps:
  - type: scene
    title: "Chọn một hoạt động"
    body: "Một người bạn nói về phim và hỏi bạn có muốn đi không. Nghe sở thích và ý định."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你喜欢看电影吗？", reading: "nǐ xǐ huan kàn diàn yǐng ma" }
      - { speaker: "B", text: "喜欢。", reading: "xǐ huan" }
      - { speaker: "A", text: "你想去看电影吗？", reading: "nǐ xiǎng qù kàn diàn yǐng ma" }
      - { speaker: "B", text: "想去。", reading: "xiǎng qù" }
  - type: listen
    prompt: "Nghe. Người nói có thích phim không?"
    text: "我喜欢看电影。"
    reading: "wǒ xǐ huan kàn diàn yǐng"
  - type: practice
    id: zh-free-u11-check-listen
    kind: audio_choice
    prompt: "Nghe. Người nói muốn làm gì?"
    audioText: "我想去看电影。"
    choices: ["去看电影", "坐火车", "用电脑"]
    answer: "去看电影"
  - type: practice
    id: zh-free-u11-check-invite
    kind: dialogue_choice
    prompt: "Câu nào hỏi bạn có muốn đi xem phim không?"
    choices: ["你想去看电影吗？", "电影很冷吗？", "电影在哪里上网？"]
    answer: "你想去看电影吗？"
  - type: practice
    id: zh-free-u11-check-produce
    kind: type_answer
    prompt: "Gõ một câu đồng ý ngắn: “Muốn đi.”"
    answer: "想去"
    acceptedAnswers: ["想去。", "我想去", "我想去。"]
    hints:
      - "Dùng 想 + 去."
  - type: checkpoint
    items:
      - id: zh-free-u11-check-preference
        kind: listen_type
        prompt: "Nghe và gõ cả câu sở thích."
        audioText: "我喜欢看电影。"
        answer: "我喜欢看电影"
        acceptedAnswers: ["我喜欢看电影。"]
      - id: zh-free-u11-check-like-question
        kind: dialogue_choice
        prompt: "Câu nào hỏi về sở thích?"
        choices: ["你喜欢看电影吗？", "你去哪里？", "几点了？"]
        answer: "你喜欢看电影吗？"
exercise:
  type: type_answer
  prompt: "Nói: Tôi muốn đi xem phim."
  answer: "我想去看电影"
  acceptedAnswers: ["我想去看电影。"]
---

Checkpoint kiểm tra sở thích, lời rủ và ý định như một mini tương tác thống nhất.
