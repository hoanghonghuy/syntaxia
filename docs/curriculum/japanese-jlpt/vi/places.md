---
id: ja-n5-06-places
track: japanese-jlpt
locale: vi
slug: places
title: Hỏi một địa điểm ở đâu
order: 6
published: true
jlpt_level: n5
can_do: "Hỏi một địa điểm quen thuộc ở đâu và hiểu ここ・そこ・あそこ trong câu trả lời ngắn"
pattern: "トイレはどこですか。 / ここです。 / あそこです。"
objectives:
  - Hỏi N はどこですか
  - Hiểu ここ, そこ và あそこ theo vị trí của người nói/người nghe
  - Trả lời vị trí tối thiểu bằng です
vocab:
  - { surface: "どこ", reading: "どこ", gloss: "ở đâu" }
  - { surface: "ここ", reading: "ここ", gloss: "ở đây, gần người nói" }
  - { surface: "そこ", reading: "そこ", gloss: "ở đó, gần người nghe" }
  - { surface: "あそこ", reading: "あそこ", gloss: "ở đằng kia, xa cả hai người" }
  - { surface: "トイレ", reading: "トイレ", gloss: "nhà vệ sinh" }
  - { surface: "駅", reading: "えき", gloss: "nhà ga" }
  - { surface: "店", reading: "みせ", gloss: "cửa hàng" }
steps:
  - type: scene
    title: "Tìm nhà vệ sinh"
    body: "Bạn đang ở nhà ga và cần tìm nhà vệ sinh. Hãy hỏi nhân viên rồi hiểu câu trả lời kèm chỉ hướng."
  - type: dialogue
    lines:
      - { speaker: "A", text: "すみません。トイレはどこですか。", reading: "すみません。トイレはどこですか。" }
      - { speaker: "B", text: "あそこです。", reading: "あそこです。" }
      - { speaker: "A", text: "あそこですか。", reading: "あそこですか。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
      - { speaker: "A", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe và xác định từ chỉ vị trí trong câu trả lời."
    text: "あそこです。"
    reading: "あそこです。"
  - type: tip
    title: "Ba từ chỉ nơi phụ thuộc vào góc nhìn"
    body: "ここ ở gần người nói, そこ ở gần người nghe, còn あそこ ở xa cả hai. Nên học chúng cùng cảnh không gian hoặc động tác chỉ tay, không phải ba bản dịch rời rạc."
  - type: teach
    items:
      - { form: "トイレはどこですか。", reading: "トイレはどこですか。", gloss: "Nhà vệ sinh ở đâu?", example: "トイレはどこですか。" }
      - { form: "ここです。", reading: "ここです。", gloss: "Ở đây.", example: "ここです。" }
      - { form: "そこです。", reading: "そこです。", gloss: "Ở đó, gần phía người nghe.", example: "そこです。" }
      - { form: "あそこです。", reading: "あそこです。", gloss: "Ở đằng kia.", example: "あそこです。" }
  - type: practice
    id: ja-places-dialogue-1
    kind: dialogue_choice
    prompt: "Bạn cần tìm nhà vệ sinh. Câu nào hỏi đúng vị trí?"
    choices: ["トイレはどこですか。", "トイレをください。", "トイレはだれですか。"]
    answer: "トイレはどこですか。"
  - type: practice
    id: ja-places-listen-1
    kind: audio_choice
    prompt: "Nghe. Bạn nghe thấy từ chỉ vị trí nào?"
    audioText: "ここです"
    choices: ["ここ", "そこ", "あそこ"]
    answer: "ここ"
  - type: practice
    id: ja-places-produce-1
    kind: type_answer
    prompt: "Nhập câu tiếng Nhật “Nhà vệ sinh ở đâu?”"
    answer: "トイレはどこですか"
    acceptedAnswers: ["トイレはどこですか。"]
    hints:
      - "Dùng トイレ + は + どこ + ですか."
  - type: checkpoint
    items:
      - id: ja-places-check-1
        kind: meaning_choice
        prompt: "Địa điểm ở xa cả người nói và người nghe. Khi chỉ tay, câu nào phù hợp?"
        choices: ["あそこです。", "ここです。", "母です。"]
        answer: "あそこです。"
      - id: ja-places-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: ở quầy, bạn muốn trà. Có thể nói gì?"
        choices: ["お茶をください。", "お茶はどこですか。", "お茶はだれですか。"]
        answer: "お茶をください。"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu hỏi vị trí."
  choices: ["駅はどこですか。", "駅をください。", "駅はだれですか。"]
  answer: "駅はどこですか。"
---

Bài mở đầu này gắn các từ chỉ nơi với góc nhìn và hành động chỉ hướng, vì đó là phần thiết yếu trong ý nghĩa của chúng trong tiếng Nhật.
