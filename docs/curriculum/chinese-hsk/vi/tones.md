---
id: zh-hsk-b1-u00-tones
track: chinese-hsk
locale: vi
slug: tones
title: "Nghe bốn thanh và thanh nhẹ"
order: -4
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Nền tảng phát âm"
unit_order: 0
unit_can_do: "Nghe, nhận diện và tái tạo các mẫu âm tiết và thanh điệu nền tảng của tiếng Phổ thông"
unit_role: lesson
can_do: "Nhận diện bốn thanh cơ bản và một âm tiết thanh nhẹ trong các từ quen thuộc"
pattern: "thanh 1 / thanh 2 / thanh 3 / thanh 4 / thanh nhẹ"
objectives:
  - "Liên hệ bốn đường nét thanh điệu với dấu thanh trong Pinyin"
  - "Nhận ra âm tiết thanh nhẹ thường được viết không có dấu thanh"
vocab:
  - { hanzi: "一", pinyin: "yī", gloss: "một" }
  - { hanzi: "人", pinyin: "rén", gloss: "người" }
  - { hanzi: "你", pinyin: "nǐ", gloss: "bạn" }
  - { hanzi: "是", pinyin: "shì", gloss: "là" }
  - { hanzi: "吗", pinyin: "ma", gloss: "trợ từ nghi vấn" }
steps:
  - type: scene
    title: "Thang thanh điệu"
    body: "Cùng một khung âm tiết có thể mang đường cao độ khác nhau. Hãy luyện tai trước khi cố nói nhanh."
    imageUrl: "/language/scenes/mandarin-tone-ladder.svg"
    imageAlt: "Năm ô thể hiện thanh 1, 2, 3, 4 và thanh nhẹ của tiếng Phổ thông."
  - type: listen
    prompt: "Nghe một ví dụ cho từng loại: 一, 人, 你, 是, 吗."
    text: "一，人，你，是，吗"
    reading: "yī, rén, nǐ, shì, ma"
  - type: teach
    items:
      - { form: "1", reading: "yī", gloss: "cao và bằng", example: "一 yī" }
      - { form: "2", reading: "rén", gloss: "đi lên", example: "人 rén" }
      - { form: "3", reading: "nǐ", gloss: "thấp/hạ rồi lên ở dạng đọc riêng", example: "你 nǐ" }
      - { form: "4", reading: "shì", gloss: "rơi mạnh", example: "是 shì" }
      - { form: "thanh nhẹ", reading: "ma", gloss: "nhẹ, không nhấn; không ghi dấu thanh", example: "吗 ma" }
  - type: practice
    id: zh-pron-tone-one
    kind: audio_choice
    prompt: "Nghe 一. Pinyin nào đúng?"
    audioText: "一"
    choices: ["yī", "yí", "yǐ"]
    answer: "yī"
  - type: practice
    id: zh-pron-tone-three
    kind: audio_choice
    prompt: "Nghe 你. Pinyin nào đúng?"
    audioText: "你"
    choices: ["ní", "nǐ", "nì"]
    answer: "nǐ"
  - type: practice
    id: zh-pron-tone-neutral
    kind: type_answer
    prompt: "Gõ Pinyin của trợ từ nghi vấn thanh nhẹ 吗."
    answer: "ma"
    hints: ["Không thêm dấu thanh.", "Viết là ma."]
  - type: checkpoint
    items:
      - id: zh-pron-tone-four
        kind: audio_choice
        prompt: "Nghe 是. Chọn Pinyin được viết đúng."
        audioText: "是"
        choices: ["shī", "shí", "shì"]
        answer: "shì"
      - id: zh-pron-tone-two
        kind: type_answer
        prompt: "Gõ Pinyin có dấu thanh của 人."
        answer: "rén"
exercise:
  type: type_answer
  prompt: "Gõ Pinyin của 吗."
  answer: "ma"
---

Thanh điệu mang thông tin từ vựng trong tiếng Phổ thông. Hãy nghe nó như một phần của âm tiết.
