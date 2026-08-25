---
id: ja-n5-u09-checkpoint
track: japanese-jlpt
locale: vi
slug: weekend-checkpoint
title: Checkpoint kế hoạch cuối tuần
order: 27
published: true
jlpt_level: n5
unit_id: ja-n5-weekend-09
unit_title: "Lên kế hoạch thời gian rảnh"
unit_order: 9
unit_can_do: "Nói một sở thích đơn giản, mời ai đó và thống nhất một kế hoạch"
unit_role: checkpoint
can_do: "Hiểu một lời mời ngắn và tự tạo một câu đồng ý hoặc lời mời"
pattern: "…が好きです。 / …ませんか。 / 一緒に行きましょう。"
objectives:
  - Lấy hoạt động được mời từ audio
  - Nhận ra câu đồng ý
  - Tự tạo một lời mời đơn giản
steps:
  - type: scene
    title: "Chọn hoạt động Chủ nhật"
    body: "Một người bạn gợi ý một hoạt động. Nghe xem đó là gì rồi trả lời."
  - type: dialogue
    lines:
      - { speaker: "A", text: "日曜日、暇ですか。", reading: "にちようび、ひまですか。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
      - { speaker: "A", text: "映画を見ませんか。", reading: "えいがを みませんか。" }
      - { speaker: "B", text: "いいですね。", reading: "いいですね。" }
  - type: listen
    prompt: "Nghe. Người nói gợi ý hoạt động gì?"
    text: "映画を見ませんか。"
    reading: "えいがを みませんか。"
  - type: practice
    id: ja-u09-check-activity
    kind: audio_choice
    prompt: "Nghe và chọn hoạt động."
    audioText: "映画を見ませんか"
    choices: ["xem phim", "đi tàu", "làm bài tập"]
    answer: "xem phim"
  - type: practice
    id: ja-u09-check-accept
    kind: dialogue_choice
    prompt: "Câu nào nhận lời tự nhiên?"
    choices: ["いいですね。", "いいえ、駅です。", "午後をください。"]
    answer: "いいですね。"
  - type: practice
    id: ja-u09-check-produce
    kind: type_answer
    prompt: "Mời ai đó đi xem phim."
    answer: "映画を見ませんか"
    acceptedAnswers: ["映画を見ませんか。"]
    hints:
      - "映画を見 + ませんか."
  - type: checkpoint
    items:
      - id: ja-u09-check-free
        kind: listen_type
        prompt: "Nghe và gõ câu hỏi về thời gian rảnh."
        audioText: "日曜日、暇ですか"
        answer: "日曜日、暇ですか"
        acceptedAnswers: ["日曜日、暇ですか。", "日曜日暇ですか", "日曜日暇ですか。"]
      - id: ja-u09-check-like
        kind: meaning_choice
        prompt: "Câu nào nghĩa là 'Tôi thích âm nhạc'?"
        choices: ["音楽が好きです。", "音楽で降ります。", "音楽を書いてください。"]
        answer: "音楽が好きです。"
exercise:
  type: type_answer
  prompt: "Nói: Cùng đi nhé."
  answer: "一緒に行きましょう"
  acceptedAnswers: ["一緒に行きましょう。"]
---

Checkpoint kiểm tra người học có biến câu nói sở thích thành một tương tác xã hội thật hay không.
