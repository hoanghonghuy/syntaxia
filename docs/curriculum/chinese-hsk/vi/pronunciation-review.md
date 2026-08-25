---
id: zh-hsk-b1-u00-review
track: chinese-hsk
locale: vi
slug: pronunciation-review
title: "Ôn truy hồi phát âm"
order: -1
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Nền tảng phát âm"
unit_order: 0
unit_can_do: "Nghe, nhận diện và tái tạo các mẫu âm tiết và thanh điệu nền tảng của tiếng Phổ thông"
unit_role: review
can_do: "Truy hồi kiến thức Pinyin và thanh điệu sau một khoảng nghỉ rồi mang nó vào unit giao tiếp đầu tiên"
pattern: "nghe -> nhớ lại -> viết -> chuyển sang giao tiếp"
objectives: ["Truy hồi Pinyin có dấu thanh từ trí nhớ", "Nối kiến thức âm thanh với các mẫu chào hỏi sắp học"]
steps:
  - type: scene
    title: "Truy hồi sau một khoảng nghỉ"
    body: "Trả lời từ trí nhớ. Mục tiêu không phải thêm giải thích mà là làm hệ thống âm thanh dễ được gọi lại ở lần sau."
    imageUrl: "/language/scenes/pinyin-syllable-anatomy.svg"
    imageAlt: "Sơ đồ cấu tạo âm tiết Pinyin quay lại như một gợi ý truy hồi."
  - type: listen
    prompt: "Nghe riêng 你 và 好, rồi nhớ lại Pinyin trước khi gặp câu chào ở unit 1."
    text: "你。好。"
    reading: "nǐ. hǎo."
  - type: practice
    id: zh-pron-review-ni
    kind: type_answer
    prompt: "Gõ Pinyin có dấu thanh của 你."
    answer: "nǐ"
  - type: practice
    id: zh-pron-review-hao
    kind: type_answer
    prompt: "Gõ Pinyin có dấu thanh của 好."
    answer: "hǎo"
  - type: practice
    id: zh-pron-review-bu
    kind: audio_choice
    prompt: "Nghe 不. Cách viết Pinyin từ vựng nào cần nhớ?"
    audioText: "不"
    choices: ["bū", "bú", "bù"]
    answer: "bù"
  - type: checkpoint
    items:
      - id: zh-pron-review-nihao
        kind: type_answer
        prompt: "Gõ Pinyin chuẩn của 你好."
        answer: "nǐ hǎo"
      - id: zh-pron-review-neutral
        kind: audio_choice
        prompt: "Nghe 吗. Pinyin nào thể hiện thanh nhẹ đúng?"
        audioText: "吗"
        choices: ["ma", "mā", "mǎ"]
        answer: "ma"
exercise:
  type: type_answer
  prompt: "Gõ Pinyin chuẩn của 你好."
  answer: "nǐ hǎo"
---

Bài ôn này là cầu nối từ nền tảng âm thanh sang unit giao tiếp 1.
