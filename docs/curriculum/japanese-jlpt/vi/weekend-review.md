---
id: ja-n5-u09-review
track: japanese-jlpt
locale: vi
slug: weekend-review
title: "Ôn tập: lên kế hoạch cuối tuần"
order: 28
published: true
jlpt_level: n5
unit_id: ja-n5-weekend-09
unit_title: "Lên kế hoạch thời gian rảnh"
unit_order: 9
unit_can_do: "Nói một sở thích đơn giản, mời ai đó và thống nhất một kế hoạch"
unit_role: review
can_do: "Nhớ lại cụm sở thích và lời mời mà không nhìn mẫu"
pattern: "…が好きです。 / …ませんか。 / 一緒に行きましょう。"
objectives:
  - Nhớ lại câu sở thích
  - Nhớ lại lời mời
  - Đồng ý và chốt một kế hoạch đơn giản
steps:
  - type: scene
    title: "Lên kế hoạch lại từ trí nhớ"
    body: "Một người bạn rảnh Chủ nhật này. Tạo kế hoạch mà không nhìn hội thoại trước."
  - type: dialogue
    lines:
      - { speaker: "A", text: "日曜日、暇ですか。", reading: "にちようび、ひまですか。" }
      - { speaker: "B", text: "はい。映画を見ませんか。", reading: "はい。えいがを みませんか。" }
      - { speaker: "A", text: "いいですね。一緒に行きましょう。", reading: "いいですね。いっしょに いきましょう。" }
  - type: listen
    prompt: "Nghe. Bạn nghe từ giải trí nào?"
    text: "音楽が好きです。"
    reading: "おんがくが すきです。"
  - type: practice
    id: ja-u09-review-like
    kind: audio_choice
    prompt: "Nghe. Người nói thích gì?"
    audioText: "音楽が好きです"
    choices: ["âm nhạc", "tàu điện", "bài tập"]
    answer: "âm nhạc"
  - type: practice
    id: ja-u09-review-invite
    kind: type_answer
    prompt: "Mời ai đó đi xem phim."
    answer: "映画を見ませんか"
    acceptedAnswers: ["映画を見ませんか。"]
  - type: practice
    id: ja-u09-review-accept
    kind: type_answer
    prompt: "Nói: Cùng đi nhé."
    answer: "一緒に行きましょう"
    acceptedAnswers: ["一緒に行きましょう。"]
  - type: checkpoint
    items:
      - id: ja-u09-review-free
        kind: listen_type
        prompt: "Nghe và gõ câu hỏi thời gian rảnh."
        audioText: "日曜日、暇ですか"
        answer: "日曜日、暇ですか"
        acceptedAnswers: ["日曜日、暇ですか。", "日曜日暇ですか", "日曜日暇ですか。"]
      - id: ja-u09-review-preference
        kind: type_answer
        prompt: "Nói: Tôi thích thể thao."
        answer: "スポーツが好きです"
        acceptedAnswers: ["スポーツが好きです。"]
exercise:
  type: type_answer
  prompt: "Nhớ lại lời mời đi xem phim."
  answer: "映画を見ませんか"
  acceptedAnswers: ["映画を見ませんか。"]
---

Bài ôn kết thúc foundation path bằng cách gọi lại một mini hội thoại xã hội hoàn chỉnh, không phải từ vựng rời.
