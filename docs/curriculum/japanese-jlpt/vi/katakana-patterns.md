---
id: ja-n5-fnd-01c-katakana-patterns
track: japanese-jlpt
locale: vi
slug: katakana-patterns
title: Đọc các từ katakana thông dụng
order: -5
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: lesson
foundation_focus: reading
can_do: "Nối katakana với cùng hệ âm tiếng Nhật và đọc một số từ vay mượn thông dụng"
pattern: "âm hiragana ↔ âm katakana / ー kéo dài nguyên âm đứng trước"
objectives:
  - Nhận ra katakana biểu diễn cùng các đơn vị âm tiếng Nhật bằng một hệ chữ khác
  - Đọc một nhóm nhỏ từ vay mượn N5 thông dụng mà không cần romaji
  - Nhận ra dấu kéo dài ー trước bài riêng về nhịp âm
vocab:
  - { surface: "カメラ", reading: "カメラ", gloss: "máy ảnh" }
  - { surface: "テレビ", reading: "テレビ", gloss: "ti vi" }
  - { surface: "トイレ", reading: "トイレ", gloss: "nhà vệ sinh" }
  - { surface: "バス", reading: "バス", gloss: "xe buýt" }
  - { surface: "コーヒー", reading: "コーヒー", gloss: "cà phê" }
  - { surface: "スポーツ", reading: "スポーツ", gloss: "thể thao" }
steps:
  - type: scene
    title: "Hệ chữ thứ hai, không phải hệ phát âm thứ hai"
    body: "Bạn gặp các từ vay mượn quen thuộc trên biển báo và thực đơn. Katakana dùng cùng hệ âm tiếng Nhật như hiragana, nên hãy tái sử dụng các quy luật âm đã học."
    imageUrl: "/language/scenes/japanese-katakana-patterns.svg"
    imageAlt: "Hàng k của hiragana được nối theo chiều dọc với hàng k katakana tương ứng; phía dưới là các từ カメラ và コーヒー, trong đó các dấu kéo dài của コーヒー được nhấn mạnh."
  - type: dialogue
    lines:
      - { speaker: "A", text: "カメラ。", reading: "カメラ。" }
      - { speaker: "B", text: "カメラ。", reading: "カメラ。" }
      - { speaker: "A", text: "テレビ。", reading: "テレビ。" }
      - { speaker: "B", text: "テレビ。", reading: "テレビ。" }
  - type: listen
    prompt: "Nghe và nhận ra từ katakana."
    text: "カメラ"
    reading: "カメラ"
  - type: tip
    title: "Dùng lại cùng các hàng âm"
    body: "ア・イ・ウ・エ・オ tương ứng cùng các nguyên âm như あ・い・う・え・お. Katakana tiếp tục với các hàng song song; cùng nguyên tắc dakuten/handakuten biến hàng h thành các âm b và p."
  - type: teach
    items:
      - { form: "ア イ ウ エ オ / カ キ ク ケ コ", reading: "あ い う え お / か き く け こ", gloss: "hàng nguyên âm và hàng k của katakana", example: "カメラ" }
      - { form: "サ シ ス セ ソ / タ チ ツ テ ト / ナ ニ ヌ ネ ノ", reading: "さ し す せ そ / た ち つ て と / な に ぬ ね の", gloss: "các hàng âm katakana song song", example: "テレビ / トイレ" }
      - { form: "ハ ヒ フ ヘ ホ / マ ミ ム メ モ / ラ リ ル レ ロ", reading: "は ひ ふ へ ほ / ま み む め も / ら り る れ ろ", gloss: "các hàng h, m và r cần cho những từ thông dụng trong bài", example: "カメラ / コーヒー" }
      - { form: "ハ ヒ フ ヘ ホ → バ ビ ブ ベ ボ / パ ピ プ ペ ポ", reading: "は ひ ふ へ ほ → ば び ぶ べ ぼ / ぱ ぴ ぷ ぺ ぽ", gloss: "dakuten và handakuten tạo các hàng âm b và p", example: "バス / スポーツ" }
      - { form: "ー", reading: "ー", gloss: "kéo dài thời lượng nguyên âm đứng trước", example: "コーヒー / スポーツ" }
  - type: practice
    id: ja-fnd-kata-hear-camera
    kind: audio_choice
    prompt: "Nghe và chọn từ vừa nghe."
    audioText: "カメラ"
    choices: ["カメラ", "カレー", "カレンダー"]
    answer: "カメラ"
  - type: practice
    id: ja-fnd-kata-type-tv
    kind: listen_type
    prompt: "Nghe và gõ từ bằng katakana."
    audioText: "テレビ"
    answer: "テレビ"
  - type: practice
    id: ja-fnd-kata-produce-toilet
    kind: type_answer
    prompt: "Gõ từ katakana thông dụng chỉ nhà vệ sinh."
    answer: "トイレ"
    hints:
      - "Bắt đầu bằng ト."
      - "Hai kana cuối là イレ."
  - type: checkpoint
    items:
      - id: ja-fnd-kata-check-coffee
        kind: audio_choice
        prompt: "Nghe và chọn từ có dấu kéo dài đúng với âm vừa nghe."
        audioText: "コーヒー"
        choices: ["コーヒー", "コート", "コップ"]
        answer: "コーヒー"
      - id: ja-fnd-kata-check-sports
        kind: listen_type
        prompt: "Nghe và gõ từ katakana."
        audioText: "スポーツ"
        answer: "スポーツ"
exercise:
  type: listen_type
  prompt: "Nghe và gõ từ katakana."
  audioText: "バス"
  answer: "バス"
---

Mục tiêu là dùng lại kiến thức âm tiếng Nhật trên hai hệ chữ. Các hàng và dấu cần cho những bài tập sản xuất trong bài này được giới thiệu trước khi learner phải gõ; các unit sau tiếp tục cho katakana xuất hiện trong từ thật thay vì quay lại romaji làm hỗ trợ mặc định.
