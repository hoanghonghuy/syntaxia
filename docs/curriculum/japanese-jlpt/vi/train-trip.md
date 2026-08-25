---
id: ja-n5-23-train-trip
track: japanese-jlpt
locale: vi
slug: train-trip
title: Đi một chuyến tàu đơn giản
order: 23
published: true
jlpt_level: n5
unit_id: ja-n5-train-08
unit_title: "Di chuyển bằng tàu"
unit_order: 8
unit_can_do: "Kiểm tra điểm đến của một chuyến tàu đơn giản và hiểu phải xuống ở đâu hoặc lúc nào"
unit_role: lesson
can_do: "Hỏi tàu có đi tới một ga hay không và hiểu chỉ dẫn xuống tàu ngắn"
pattern: "この電車は…駅に行きますか。 / はい。 / 次の駅で降ります。"
objectives:
  - Hỏi tàu có đi tới ga mục tiêu không
  - Hiểu 乗る và 降りる trong ngữ cảnh di chuyển
  - Lấy thông tin ga tiếp theo từ câu trả lời ngắn
vocab:
  - { surface: "電車", reading: "でんしゃ", gloss: "tàu điện" }
  - { surface: "駅", reading: "えき", gloss: "ga" }
  - { surface: "乗る", reading: "のる", gloss: "lên; đi phương tiện" }
  - { surface: "降りる", reading: "おりる", gloss: "xuống phương tiện" }
  - { surface: "切符", reading: "きっぷ", gloss: "vé" }
  - { surface: "次", reading: "つぎ", gloss: "tiếp theo" }
  - { surface: "出る", reading: "でる", gloss: "rời; khởi hành" }
steps:
  - type: scene
    title: "Kiểm tra tàu trước khi lên"
    body: "Ở sân ga, bạn cần xác nhận tàu này có đi tới ga mình muốn hay không."
    visualKey: "train-platform"
    imageAlt: "Một đoàn tàu ở sân ga, có bảng điểm đến và hành khách đang kiểm tra trước khi lên."
  - type: dialogue
    lines:
      - { speaker: "A", text: "すみません。この電車は東京駅に行きますか。", reading: "すみません。この でんしゃは とうきょうえきに いきますか。" }
      - { speaker: "B", text: "はい、行きます。", reading: "はい、いきます。" }
      - { speaker: "A", text: "どこで降りますか。", reading: "どこで おりますか。" }
      - { speaker: "B", text: "次の駅で降ります。", reading: "つぎの えきで おります。" }
  - type: listen
    prompt: "Nghe một lần. Hành khách cần xuống lúc nào?"
    text: "次の駅で降ります。"
    reading: "つぎの えきで おります。"
  - type: tip
    title: "Phân biệt lên và xuống tàu"
    body: "乗ります là lên/đi tàu. 降ります là xuống. Trong hội thoại ở ga, động từ cho biết hành động cần làm."
  - type: teach
    items:
      - { form: "この電車は東京駅に行きますか。", reading: "この でんしゃは とうきょうえきに いきますか。", gloss: "Tàu này có đi Tokyo Station không?", example: "この電車は東京駅に行きますか。" }
      - { form: "次の駅で降ります。", reading: "つぎの えきで おります。", gloss: "Xuống ở ga tiếp theo.", example: "次の駅で降ります。" }
      - { form: "電車に乗ります。", reading: "でんしゃに のります。", gloss: "lên / đi tàu", example: "ここで電車に乗ります。" }
  - type: practice
    id: ja-u08-train-listen
    kind: audio_choice
    prompt: "Nghe. Ở ga tiếp theo cần làm gì?"
    audioText: "次の駅で降ります"
    choices: ["xuống tàu", "lên tàu", "ngủ"]
    answer: "xuống tàu"
  - type: practice
    id: ja-u08-train-destination
    kind: dialogue_choice
    prompt: "Bạn muốn xác nhận điểm đến. Câu hỏi nào phù hợp?"
    choices: ["この電車は東京駅に行きますか。", "東京駅をください。", "東京駅は何時に寝ますか。"]
    answer: "この電車は東京駅に行きますか。"
  - type: practice
    id: ja-u08-train-produce
    kind: type_answer
    prompt: "Gõ: Xuống ở ga tiếp theo."
    answer: "次の駅で降ります"
    acceptedAnswers: ["次の駅で降ります。"]
    hints:
      - "次の駅 + で + 降ります."
  - type: checkpoint
    items:
      - id: ja-u08-train-check-board
        kind: meaning_choice
        prompt: "Động từ nào nghĩa là lên/đi phương tiện?"
        choices: ["乗る", "降りる", "寝る"]
        answer: "乗る"
      - id: ja-u08-train-check-off
        kind: listen_type
        prompt: "Nghe và gõ chỉ dẫn di chuyển."
        audioText: "次の駅で降ります"
        answer: "次の駅で降ります"
        acceptedAnswers: ["次の駅で降ります。"]
exercise:
  type: type_answer
  prompt: "Hỏi: Tàu này có đi Tokyo Station không?"
  answer: "この電車は東京駅に行きますか"
  acceptedAnswers: ["この電車は東京駅に行きますか。"]
---

Unit luyện đúng thông tin người mới cần ở sân ga: điểm đến, lên tàu và xuống ở đâu.
