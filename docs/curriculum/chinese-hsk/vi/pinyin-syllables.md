---
id: zh-hsk-b1-u00-pinyin
track: chinese-hsk
locale: vi
slug: pinyin-syllables
title: "Cấu tạo một âm tiết tiếng Trung"
order: -5
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Nền tảng phát âm"
unit_order: 0
unit_can_do: "Nghe, nhận diện và tái tạo các mẫu âm tiết và thanh điệu nền tảng của tiếng Phổ thông"
unit_role: lesson
can_do: "Tách một âm tiết tiếng Phổ thông cơ bản thành các phần âm và đọc Pinyin có dấu thanh"
pattern: "thanh mẫu + vận mẫu + thanh điệu"
objectives:
  - "Nhận diện thanh mẫu và vận mẫu là hai phần âm chính của một âm tiết Pinyin"
  - "Xem dấu thanh là một phần của âm tiết, không phải ký hiệu trang trí"
vocab:
  - { hanzi: "你", pinyin: "nǐ", gloss: "bạn" }
  - { hanzi: "好", pinyin: "hǎo", gloss: "tốt" }
  - { hanzi: "妈", pinyin: "mā", gloss: "mẹ" }
  - { hanzi: "八", pinyin: "bā", gloss: "tám" }
steps:
  - type: scene
    title: "Phòng luyện âm"
    body: "Trước khi học thuộc câu, hãy nắm cách một âm tiết tiếng Phổ thông được tạo thành. Ưu tiên âm thanh; chữ Hán ở đây chỉ là điểm tựa."
    imageUrl: "/language/scenes/pinyin-syllable-anatomy.svg"
    imageAlt: "Âm tiết Pinyin nǐ được tách thành thanh mẫu n, vận mẫu i và thanh 3."
  - type: listen
    prompt: "Nghe 你, 好, 妈. Mỗi mục là một âm tiết và có thanh điệu riêng."
    text: "你，好，妈"
    reading: "nǐ, hǎo, mā"
  - type: tip
    title: "Mô hình dễ nhớ"
    body: "Phần lớn âm tiết Pinyin cơ bản có thể đọc theo thanh mẫu + vận mẫu, rồi gắn thanh điệu cho toàn âm tiết. Một số âm tiết không có thanh mẫu."
  - type: teach
    items:
      - { form: "nǐ", reading: "nǐ", gloss: "n + i + thanh 3", example: "你 nǐ" }
      - { form: "hǎo", reading: "hǎo", gloss: "h + ao + thanh 3", example: "好 hǎo" }
      - { form: "mā", reading: "mā", gloss: "m + a + thanh 1", example: "妈 mā" }
  - type: practice
    id: zh-pron-pinyin-hear-ni
    kind: audio_choice
    prompt: "Nghe 你. Pinyin nào khớp?"
    audioText: "你"
    choices: ["nǐ", "ní", "nì"]
    answer: "nǐ"
  - type: practice
    id: zh-pron-pinyin-hear-hao
    kind: audio_choice
    prompt: "Nghe 好. Chọn Pinyin có dấu thanh đúng."
    audioText: "好"
    choices: ["hǎo", "háo", "hào"]
    answer: "hǎo"
  - type: practice
    id: zh-pron-pinyin-type-ma
    kind: type_answer
    prompt: "Gõ Pinyin có dấu thanh của 妈."
    answer: "mā"
    hints: ["Âm tiết là ma.", "Từ này dùng thanh 1: cao và bằng."]
  - type: checkpoint
    items:
      - id: zh-pron-pinyin-check-ba
        kind: audio_choice
        prompt: "Nghe 八. Pinyin nào đúng?"
        audioText: "八"
        choices: ["bā", "bá", "bǎ"]
        answer: "bā"
      - id: zh-pron-pinyin-check-ni
        kind: type_answer
        prompt: "Gõ Pinyin có dấu thanh của 你."
        answer: "nǐ"
exercise:
  type: type_answer
  prompt: "Gõ Pinyin có dấu thanh của 你."
  answer: "nǐ"
---

Buổi nền tảng này dạy mô hình âm thanh trước khi chuyển sang câu giao tiếp.
