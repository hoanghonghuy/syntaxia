---
id: ja-n5-17-daily-routine
track: japanese-jlpt
locale: vi
slug: daily-routine
title: Nói về lịch sinh hoạt đơn giản
order: 17
published: true
jlpt_level: n5
unit_id: ja-n5-routine-06
unit_title: "Nói về một ngày của bạn"
unit_order: 6
unit_can_do: "Hỏi một hoạt động quen thuộc diễn ra lúc nào và trả lời bằng giờ đơn giản"
unit_role: lesson
can_do: "Hỏi ai đó thức dậy lúc mấy giờ và nói một mốc giờ sáng hoặc tối đơn giản"
pattern: "何時に起きますか。 / 午前七時に起きます。 / 十時に寝ます。"
objectives:
  - Hỏi thời điểm một hoạt động hằng ngày diễn ra
  - Phân biệt 午前 và 午後 trong lịch ngắn
  - Trả lời bằng giờ + に + động từ
vocab:
  - { surface: "朝", reading: "あさ", gloss: "buổi sáng" }
  - { surface: "午前", reading: "ごぜん", gloss: "buổi sáng; a.m." }
  - { surface: "午後", reading: "ごご", gloss: "buổi chiều; p.m." }
  - { surface: "起きる", reading: "おきる", gloss: "thức dậy" }
  - { surface: "寝る", reading: "ねる", gloss: "ngủ; đi ngủ" }
steps:
  - type: scene
    title: "So sánh lịch buổi sáng"
    body: "Một bạn cùng lớp hỏi ngày của bạn bắt đầu lúc nào. Nghe mốc giờ rồi trả lời về lịch của mình."
    imageUrl: "/language/scenes/daily-clock.svg"
    imageAlt: "Đồng hồ đơn giản và dòng thời gian từ buổi sáng tới buổi tối."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何時に起きますか。", reading: "なんじに おきますか。" }
      - { speaker: "B", text: "午前七時に起きます。", reading: "ごぜん しちじに おきます。" }
      - { speaker: "A", text: "何時に寝ますか。", reading: "なんじに ねますか。" }
      - { speaker: "B", text: "十時に寝ます。", reading: "じゅうじに ねます。" }
  - type: listen
    prompt: "Nghe một lần. Mốc giờ đầu tiên là buổi sáng hay buổi chiều?"
    text: "午前七時に起きます。"
    reading: "ごぜん しちじに おきます。"
  - type: tip
    title: "Đánh dấu thời gian bằng に"
    body: "Với giờ cụ thể, đặt に sau thời gian: 七時に起きます. 午前 và 午後 cho biết phần nào trong ngày."
  - type: teach
    items:
      - { form: "何時に起きますか。", reading: "なんじに おきますか。", gloss: "Bạn thức dậy lúc mấy giờ?", example: "何時に起きますか。" }
      - { form: "午前七時に起きます。", reading: "ごぜん しちじに おきます。", gloss: "Tôi thức dậy lúc 7 giờ sáng.", example: "午前七時に起きます。" }
      - { form: "十時に寝ます。", reading: "じゅうじに ねます。", gloss: "Tôi đi ngủ lúc mười giờ.", example: "十時に寝ます。" }
  - type: practice
    id: ja-u06-routine-listen
    kind: audio_choice
    prompt: "Nghe và chọn mốc giờ."
    audioText: "午後三時です"
    choices: ["3 giờ chiều", "3 giờ sáng", "7 giờ sáng"]
    answer: "3 giờ chiều"
  - type: practice
    id: ja-u06-routine-reply
    kind: dialogue_choice
    prompt: "Có người hỏi 何時に起きますか。 Bạn thức dậy lúc bảy giờ. Câu nào phù hợp?"
    choices: ["七時に起きます。", "七時を起きます。", "七時に寝ますか。"]
    answer: "七時に起きます。"
  - type: practice
    id: ja-u06-routine-produce
    kind: type_answer
    prompt: "Gõ câu: Tôi đi ngủ lúc mười giờ."
    answer: "十時に寝ます"
    acceptedAnswers: ["十時に寝ます。"]
    hints:
      - "Dùng 十時 + に + 寝ます."
  - type: checkpoint
    items:
      - id: ja-u06-routine-check-am
        kind: meaning_choice
        prompt: "Từ nào đánh dấu thời gian buổi sáng?"
        choices: ["午前", "午後", "駅"]
        answer: "午前"
      - id: ja-u06-routine-check-question
        kind: listen_type
        prompt: "Nghe và gõ lại câu hỏi."
        audioText: "何時に起きますか"
        answer: "何時に起きますか"
        acceptedAnswers: ["何時に起きますか。"]
exercise:
  type: type_answer
  prompt: "Nói: Tôi thức dậy lúc bảy giờ."
  answer: "七時に起きます"
  acceptedAnswers: ["七時に起きます。"]
---

Dùng cụm thời gian để trao đổi lịch thật, không chỉ đọc thuộc từ chỉ giờ.
