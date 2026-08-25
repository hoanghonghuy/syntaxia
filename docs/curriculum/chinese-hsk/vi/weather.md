---
id: zh-hsk-b1-13-weather
track: chinese-hsk
locale: vi
slug: weather
title: Hỏi về thời tiết đơn giản
order: 16
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-weather-10
unit_title: "Nói về thời tiết hôm nay"
unit_order: 10
unit_can_do: "Hỏi thời tiết đơn giản, hiểu câu trả lời ngắn và dùng thông tin đó cho một kế hoạch cơ bản"
unit_role: lesson
can_do: "Hỏi thời tiết thế nào và nói hôm nay nóng, lạnh hoặc mưa"
pattern: "今天天气怎么样？ / 今天很冷。 / 今天下雨。"
objectives:
  - Hỏi một câu đơn giản về thời tiết
  - Hiểu thông tin nóng/lạnh/mưa từ câu trả lời ngắn
  - Tự tạo một câu thời tiết tự nhiên
vocab:
  - { hanzi: "天气", pinyin: "tiān qì", gloss: "thời tiết" }
  - { hanzi: "今天", pinyin: "jīn tiān", gloss: "hôm nay" }
  - { hanzi: "明天", pinyin: "míng tiān", gloss: "ngày mai" }
  - { hanzi: "下雨", pinyin: "xià yǔ", gloss: "mưa" }
  - { hanzi: "冷", pinyin: "lěng", gloss: "lạnh" }
  - { hanzi: "热", pinyin: "rè", gloss: "nóng" }
steps:
  - type: scene
    title: "Kiểm tra thời tiết trước khi ra ngoài"
    body: "Bạn và một người bạn sắp ra ngoài. Hỏi thời tiết thế nào trước khi quyết định làm gì."
    imageUrl: "/language/scenes/weather-window.svg"
    imageAlt: "Qua cửa sổ thấy trời mưa và một nhiệt kế đơn giản chỉ thời tiết mát lạnh."
  - type: dialogue
    lines:
      - { speaker: "A", text: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng" }
      - { speaker: "B", text: "今天很冷，还下雨。", reading: "jīn tiān hěn lěng, hái xià yǔ" }
      - { speaker: "A", text: "明天呢？", reading: "míng tiān ne" }
      - { speaker: "B", text: "明天不冷。", reading: "míng tiān bù lěng" }
  - type: listen
    prompt: "Nghe một lần. Bạn nghe hai thông tin thời tiết nào về hôm nay?"
    text: "今天很冷，还下雨。"
    reading: "jīn tiān hěn lěng, hái xià yǔ"
  - type: tip
    title: "Miêu tả thời tiết trực tiếp"
    body: "Dùng 天气怎么样？ để hỏi chung. Câu trả lời ngắn có thể là 今天很冷 hoặc 今天下雨. Không cần 是 trước tính từ."
  - type: teach
    items:
      - { form: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng", gloss: "Hôm nay thời tiết thế nào?", example: "今天天气怎么样？" }
      - { form: "今天很冷。", reading: "jīn tiān hěn lěng", gloss: "Hôm nay lạnh.", example: "今天很冷。" }
      - { form: "今天下雨。", reading: "jīn tiān xià yǔ", gloss: "Hôm nay trời mưa.", example: "今天下雨。" }
  - type: practice
    id: zh-weather-u10-listen
    kind: audio_choice
    prompt: "Nghe. Thời tiết thế nào?"
    audioText: "今天很热。"
    choices: ["热", "冷", "下雨"]
    answer: "热"
  - type: practice
    id: zh-weather-u10-reply
    kind: dialogue_choice
    prompt: "Có người hỏi 今天天气怎么样？ Trời lạnh. Câu nào phù hợp?"
    choices: ["今天很冷。", "今天是冷。", "今天在哪里？"]
    answer: "今天很冷。"
  - type: practice
    id: zh-weather-u10-produce
    kind: type_answer
    prompt: "Gõ: “Hôm nay trời mưa.”"
    answer: "今天下雨"
    acceptedAnswers: ["今天下雨。"]
    hints:
      - "Dùng 今天 + 下雨."
  - type: checkpoint
    items:
      - id: zh-weather-u10-check-question
        kind: dialogue_choice
        prompt: "Câu nào hỏi thời tiết hôm nay?"
        choices: ["今天天气怎么样？", "今天是谁？", "今天多少钱？"]
        answer: "今天天气怎么样？"
      - id: zh-weather-u10-check-cold
        kind: listen_type
        prompt: "Nghe và gõ cả câu thời tiết."
        audioText: "今天很冷。"
        answer: "今天很冷"
        acceptedAnswers: ["今天很冷。"]
exercise:
  type: type_answer
  prompt: "Nói: Hôm nay nóng."
  answer: "今天很热"
  acceptedAnswers: ["今天很热。"]
---

Bài học biến các từ nóng/lạnh quen thuộc thành thông tin thời tiết hữu ích cho một quyết định thật.
