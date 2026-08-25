---
id: zh-hsk-b1-u11-review
track: chinese-hsk
locale: vi
slug: free-time-review
title: "Ôn tập: lên kế hoạch thời gian rảnh"
order: 21
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-free-time-11
unit_title: "Lên một kế hoạch thời gian rảnh đơn giản"
unit_order: 11
unit_can_do: "Nói một sở thích đơn giản, hỏi bạn có muốn đi không và phản hồi với kế hoạch"
unit_role: review
can_do: "Nhớ lại các cụm sở thích và lời rủ mà không nhìn mẫu"
pattern: "我喜欢看电影。 / 你想去看电影吗？ / 想去。"
objectives:
  - Nhớ lại câu sở thích về phim
  - Nhớ lại câu hỏi kế hoạch
  - Trả lời lời rủ từ trí nhớ
steps:
  - type: scene
    title: "Lên kế hoạch lại"
    body: "Một người bạn lại nhắc tới phim vào ngày khác. Dùng các cụm sở thích và kế hoạch từ trí nhớ."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你喜欢看电影吗？", reading: "nǐ xǐ huan kàn diàn yǐng ma" }
      - { speaker: "B", text: "喜欢。", reading: "xǐ huan" }
      - { speaker: "A", text: "你想去看电影吗？", reading: "nǐ xiǎng qù kàn diàn yǐng ma" }
      - { speaker: "B", text: "想去。", reading: "xiǎng qù" }
  - type: listen
    prompt: "Nghe sở thích."
    text: "我喜欢看电影。"
    reading: "wǒ xǐ huan kàn diàn yǐng"
  - type: practice
    id: zh-free-u11-review-listen
    kind: audio_choice
    prompt: "Nghe. Bạn nghe hoạt động nào?"
    audioText: "我喜欢看电影。"
    choices: ["看电影", "坐飞机", "上网"]
    answer: "看电影"
  - type: practice
    id: zh-free-u11-review-invite
    kind: dialogue_choice
    prompt: "Câu nào rủ bạn tham gia kế hoạch?"
    choices: ["你想去看电影吗？", "今天天气怎么样？", "这是你的电脑吗？"]
    answer: "你想去看电影吗？"
  - type: practice
    id: zh-free-u11-review-produce
    kind: type_answer
    prompt: "Gõ từ trí nhớ: “Tôi thích xem phim.”"
    answer: "我喜欢看电影"
    acceptedAnswers: ["我喜欢看电影。"]
  - type: checkpoint
    items:
      - id: zh-free-u11-review-want
        kind: type_answer
        prompt: "Gõ: “Tôi muốn đi xem phim.”"
        answer: "我想去看电影"
        acceptedAnswers: ["我想去看电影。"]
      - id: zh-free-u11-review-response
        kind: listen_type
        prompt: "Nghe và gõ câu trả lời ngắn."
        audioText: "想去。"
        answer: "想去"
        acceptedAnswers: ["想去。"]
exercise:
  type: type_answer
  prompt: "Hỏi từ trí nhớ: Bạn thích xem phim không?"
  answer: "你喜欢看电影吗"
  acceptedAnswers: ["你喜欢看电影吗？"]
---

Ôn cách quãng giữ trao đổi từ sở thích tới kế hoạch sẵn sàng cho hội thoại sau.
