---
id: ja-n5-u06-review
track: japanese-jlpt
locale: vi
slug: routine-review
title: "Ôn tập: nói về một ngày của bạn"
order: 19
published: true
jlpt_level: n5
unit_id: ja-n5-routine-06
unit_title: "Nói về một ngày của bạn"
unit_order: 6
unit_can_do: "Hỏi một hoạt động quen thuộc diễn ra lúc nào và trả lời bằng giờ đơn giản"
unit_role: review
can_do: "Nhớ lại câu hỏi thời gian và tự tạo câu trả lời mà không nhìn mẫu"
pattern: "何時に…ますか。 / …時に…ます。"
objectives:
  - Nhớ lại câu hỏi thời gian
  - Phân biệt buổi sáng và buổi chiều từ audio
  - Tự tạo câu sinh hoạt từ trí nhớ
steps:
  - type: scene
    title: "Trả lời từ trí nhớ"
    body: "Một người bạn hỏi lại về lịch của bạn. Trả lời mà không nhìn bài trước."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何時に寝ますか。", reading: "なんじに ねますか。" }
      - { speaker: "B", text: "十時に寝ます。", reading: "じゅうじに ねます。" }
  - type: listen
    prompt: "Nghe. Bạn nghe phần nào trong ngày?"
    text: "午後四時です。"
    reading: "ごご よじです。"
  - type: practice
    id: ja-u06-review-part
    kind: audio_choice
    prompt: "Nghe và chọn buổi sáng hay chiều."
    audioText: "午前八時です"
    choices: ["buổi sáng", "buổi chiều", "buổi tối"]
    answer: "buổi sáng"
  - type: practice
    id: ja-u06-review-question
    kind: type_answer
    prompt: "Gõ: Bạn thức dậy lúc mấy giờ?"
    answer: "何時に起きますか"
    acceptedAnswers: ["何時に起きますか。"]
    hints:
      - "何時 + に + 起きますか."
  - type: practice
    id: ja-u06-review-answer
    kind: type_answer
    prompt: "Nói: Tôi thức dậy lúc tám giờ."
    answer: "八時に起きます"
    acceptedAnswers: ["八時に起きます。"]
  - type: checkpoint
    items:
      - id: ja-u06-review-bed
        kind: listen_type
        prompt: "Nghe và gõ cả câu giờ đi ngủ."
        audioText: "十一時に寝ます"
        answer: "十一時に寝ます"
        acceptedAnswers: ["十一時に寝ます。"]
      - id: ja-u06-review-particle
        kind: dialogue_choice
        prompt: "Câu nào tự nhiên?"
        choices: ["七時に起きます。", "七時を起きます。", "七時で起きます。"]
        answer: "七時に起きます。"
exercise:
  type: type_answer
  prompt: "Trả lời từ trí nhớ: Tôi đi ngủ lúc mười giờ."
  answer: "十時に寝ます"
  acceptedAnswers: ["十時に寝ます。"]
---

Ôn cách quãng giúp mẫu lịch sinh hoạt sẵn sàng cho các lần nghe và hội thoại sau.
