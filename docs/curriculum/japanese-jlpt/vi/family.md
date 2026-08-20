---
id: ja-n5-04-family
track: japanese-jlpt
locale: vi
slug: family
title: Giới thiệu người trong ảnh gia đình
order: 4
published: true
jlpt_level: n5
can_do: "Xác định một đến hai người trong gia đình mình trong một đoạn hội thoại đơn giản về ảnh"
pattern: "この人はだれですか。 / 母です。 / 兄です。"
objectives:
  - Hỏi người trong ảnh là ai
  - Dùng một số từ cơ bản khi nói về gia đình của mình
  - Nhận ra từ xưng hô gia đình có thể đổi theo gia đình của ai và tình huống nào
vocab:
  - { surface: "家族", reading: "かぞく", gloss: "gia đình" }
  - { surface: "写真", reading: "しゃしん", gloss: "ảnh" }
  - { surface: "母", reading: "はは", gloss: "mẹ của mình/nhà mình" }
  - { surface: "父", reading: "ちち", gloss: "bố của mình/nhà mình" }
  - { surface: "姉", reading: "あね", gloss: "chị gái của mình" }
  - { surface: "兄", reading: "あに", gloss: "anh trai của mình" }
  - { surface: "だれ", reading: "だれ", gloss: "ai" }
steps:
  - type: scene
    title: "Cho bạn xem ảnh gia đình"
    body: "Một người bạn cùng lớp thấy ảnh gia đình của bạn. Hãy trả lời hai câu hỏi đơn giản về người trong gia đình mình."
  - type: dialogue
    lines:
      - { speaker: "A", text: "これは家族の写真です。", reading: "これはかぞくのしゃしんです。" }
      - { speaker: "B", text: "この人はだれですか。", reading: "このひとはだれですか。" }
      - { speaker: "A", text: "母です。", reading: "ははです。" }
      - { speaker: "B", text: "この人は？", reading: "このひとは？" }
      - { speaker: "A", text: "兄です。", reading: "あにです。" }
  - type: listen
    prompt: "Nghe và xác định quan hệ gia đình được nhắc tới."
    text: "父です。"
    reading: "ちちです。"
  - type: tip
    title: "Đây là cách nói về gia đình của mình"
    body: "母, 父, 姉 và 兄 thường dùng khi nói với người ngoài về người trong gia đình mình. Tiếng Nhật có các dạng khác như お母さん trong tình huống khác; không nên coi mọi từ chỉ quan hệ là thay thế cho nhau."
  - type: teach
    items:
      - { form: "この人はだれですか。", reading: "このひとはだれですか。", gloss: "Người này là ai?", example: "この人はだれですか。" }
      - { form: "母です。", reading: "ははです。", gloss: "Đây là mẹ tôi.", example: "母です。" }
      - { form: "父です。", reading: "ちちです。", gloss: "Đây là bố tôi.", example: "父です。" }
      - { form: "姉です。", reading: "あねです。", gloss: "Đây là chị gái tôi.", example: "姉です。" }
      - { form: "兄です。", reading: "あにです。", gloss: "Đây là anh trai tôi.", example: "兄です。" }
  - type: practice
    id: ja-family-dialogue-1
    kind: dialogue_choice
    prompt: "Bạn cùng lớp chỉ vào mẹ bạn trong ảnh và hỏi この人はだれですか。 Câu trả lời ngắn tự nhiên là gì?"
    choices: ["母です。", "お名前は何ですか。", "八番です。"]
    answer: "母です。"
  - type: practice
    id: ja-family-listen-1
    kind: audio_choice
    prompt: "Nghe. Người thân nào được nhắc tới?"
    audioText: "兄です"
    choices: ["兄", "姉", "母"]
    answer: "兄"
  - type: practice
    id: ja-family-produce-1
    kind: type_answer
    prompt: "Người trong ảnh là bố của bạn. Hãy nhập câu trả lời ngắn."
    answer: "父です"
    acceptedAnswers: ["父です。", "ちちです", "ちちです。"]
  - type: checkpoint
    items:
      - id: ja-family-check-1
        kind: meaning_choice
        prompt: "Từ nào là dạng mở đầu dùng khi nói về mẹ của mình?"
        choices: ["母", "父", "兄"]
        answer: "母"
      - id: ja-family-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: có người hỏi 何番ですか。 Số của bạn là tám. Bạn trả lời gì?"
        choices: ["八番です。", "母です。", "これをください。"]
        answer: "八番です。"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu hỏi dùng để hỏi một người là ai."
  choices: ["この人はだれですか。", "何番ですか。", "これをください。"]
  answer: "この人はだれですか。"
---

Từ vựng gia đình được dạy cùng bối cảnh xã hội của nó. Lộ trình không giả định rằng một từ chỉ quan hệ tiếng Nhật dùng giống nhau cho mọi người nói và mọi tình huống.
