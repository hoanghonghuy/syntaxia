---
id: ja-n5-u06-checkpoint
track: japanese-jlpt
locale: vi
slug: routine-checkpoint
title: Checkpoint lịch sinh hoạt
order: 18
published: true
jlpt_level: n5
unit_id: ja-n5-routine-06
unit_title: "Nói về một ngày của bạn"
unit_order: 6
unit_can_do: "Hỏi một hoạt động quen thuộc diễn ra lúc nào và trả lời bằng giờ đơn giản"
unit_role: checkpoint
can_do: "Hiểu và tạo một câu thời gian sinh hoạt đơn giản với ít hỗ trợ"
pattern: "何時に…ますか。 / …時に…ます。"
objectives:
  - Lấy đúng giờ từ một câu sinh hoạt ngắn
  - Chọn に cho thời gian cụ thể
  - Tạo một câu trả lời sinh hoạt đầy đủ
steps:
  - type: scene
    title: "Kiểm tra lịch của bạn cùng lớp"
    body: "Bạn nghe hai thông tin sinh hoạt ngắn và cần lấy đúng mốc giờ."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何時に起きますか。", reading: "なんじに おきますか。" }
      - { speaker: "B", text: "午前六時に起きます。", reading: "ごぜん ろくじに おきます。" }
      - { speaker: "A", text: "何時に寝ますか。", reading: "なんじに ねますか。" }
      - { speaker: "B", text: "十一時に寝ます。", reading: "じゅういちじに ねます。" }
  - type: listen
    prompt: "Nghe mốc giờ đi ngủ."
    text: "十一時に寝ます。"
    reading: "じゅういちじに ねます。"
  - type: practice
    id: ja-u06-check-listen
    kind: audio_choice
    prompt: "Nghe. Người này thức dậy lúc nào?"
    audioText: "午前六時に起きます"
    choices: ["6 giờ sáng", "6 giờ chiều", "11 giờ tối"]
    answer: "6 giờ sáng"
  - type: practice
    id: ja-u06-check-particle
    kind: dialogue_choice
    prompt: "Hoàn thành cụm tự nhiên: 七時___起きます。"
    choices: ["に", "を", "で"]
    answer: "に"
  - type: practice
    id: ja-u06-check-produce
    kind: type_answer
    prompt: "Gõ: Tôi đi ngủ lúc mười một giờ."
    answer: "十一時に寝ます"
    acceptedAnswers: ["十一時に寝ます。"]
    hints:
      - "Thời gian + に + 寝ます."
  - type: checkpoint
    items:
      - id: ja-u06-check-am-pm
        kind: meaning_choice
        prompt: "午後三時 là mấy giờ?"
        choices: ["3 giờ chiều", "3 giờ sáng", "7 giờ sáng"]
        answer: "3 giờ chiều"
      - id: ja-u06-check-recall
        kind: listen_type
        prompt: "Nghe và gõ cả câu trả lời."
        audioText: "七時に起きます"
        answer: "七時に起きます"
        acceptedAnswers: ["七時に起きます。"]
exercise:
  type: type_answer
  prompt: "Nói: Tôi thức dậy lúc sáu giờ."
  answer: "六時に起きます"
  acceptedAnswers: ["六時に起きます。"]
---

Checkpoint kiểm tra khả năng lấy thông tin và tạo câu trả lời đầy đủ, không chỉ ghép nghĩa giờ rời rạc.
