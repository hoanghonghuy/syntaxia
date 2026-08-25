---
id: zh-hsk-b1-06-school-daily
track: chinese-hsk
locale: vi
slug: school-daily
title: "Nói việc bạn làm ở trường"
order: 6
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-study-04
unit_title: "Lên kế hoạch khi nào và ở đâu để học"
unit_order: 4
unit_can_do: "Nói khi nào và ở đâu mình học tiếng Trung và xác nhận một kế hoạch học đơn giản"
unit_role: lesson
can_do: "Nói mình là học sinh/sinh viên và mô tả việc học tiếng Trung ở trường"
pattern: "我是学生。/ 我在学校学习汉语。/ 你在哪里学习汉语？"
objectives:
  - "Phân biệt giáo viên / học sinh / trường học"
  - "Dùng 在 + nơi chốn trước một hành động học đơn giản"
  - "Nhận ra 哪里 ở vị trí nơi chốn cần hỏi"
vocab:
  - { hanzi: "学校", pinyin: "xué xiào", gloss: "trường học" }
  - { hanzi: "老师", pinyin: "lǎo shī", gloss: "giáo viên" }
  - { hanzi: "学生", pinyin: "xué sheng", gloss: "học sinh / sinh viên" }
  - { hanzi: "学习", pinyin: "xué xí", gloss: "học" }
  - { hanzi: "汉语", pinyin: "hàn yǔ", gloss: "tiếng Trung" }
  - { hanzi: "在", pinyin: "zài", gloss: "ở; tại" }
  - { hanzi: "哪里", pinyin: "nǎ lǐ", gloss: "ở đâu" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Một bạn học mới hỏi bạn làm gì và học ở đâu."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你是学生吗？", reading: "nǐ shì xué sheng ma" }
      - { speaker: "B", text: "是，我是学生。", reading: "shì, wǒ shì xué sheng" }
      - { speaker: "A", text: "你在哪里学习汉语？", reading: "nǐ zài nǎ lǐ xué xí hàn yǔ" }
      - { speaker: "B", text: "我在学校学习汉语。", reading: "wǒ zài xué xiào xué xí hàn yǔ" }
  - type: listen
    prompt: "Nghe nơi chốn đứng trước hành động."
    text: "我在学校学习汉语。"
    reading: "wǒ zài xué xiào xué xí hàn yǔ"
  - type: tip
    title: "在 + nơi chốn + hành động"
    body: "Dùng 在 để đặt hành động vào một nơi: 我在学校学习汉语. Khi chưa biết nơi đó, 哪里 đứng đúng vị trí cần hỏi: 你在哪里学习汉语？"
  - type: teach
    items:
      - { form: "我是学生。", reading: "wǒ shì xué sheng", gloss: "Tôi là học sinh / sinh viên.", example: "我是学生。" }
      - { form: "在学校", reading: "zài xué xiào", gloss: "ở trường", example: "我在学校。" }
      - { form: "在哪里？", reading: "zài nǎ lǐ", gloss: "ở đâu?", example: "你在哪里学习汉语？" }
      - { form: "我在学校学习汉语。", reading: "wǒ zài xué xiào xué xí hàn yǔ", gloss: "Tôi học tiếng Trung ở trường.", example: "我在学校学习汉语。" }
  - type: practice
    id: zh-school-reply-1
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你是学生吗？ Chọn câu khẳng định tự nhiên."
    choices: ["是，我是学生。", "我是学校。", "再见。"]
    answer: "是，我是学生。"
  - type: practice
    id: zh-school-listen-1
    kind: audio_choice
    prompt: "Nghe. Người này học tiếng Trung ở đâu?"
    audioText: "我在学校学习汉语。"
    choices: ["学校", "家", "商店"]
    answer: "学校"
  - type: practice
    id: zh-school-produce-1
    kind: type_answer
    prompt: "Gõ câu: “Tôi học tiếng Trung ở trường.”"
    answer: "我在学校学习汉语"
    acceptedAnswers: ["我在学校学习汉语。"]
    hints:
      - "Dùng 我在学校 + 学习汉语."
  - type: checkpoint
    items:
      - id: zh-school-check-1
        kind: meaning_choice
        prompt: "Từ nào có nghĩa “giáo viên”?"
        choices: ["老师", "学生", "学校"]
        answer: "老师"
      - id: zh-school-check-2
        kind: audio_choice
        prompt: "Ôn lại: người này học khi nào?"
        audioText: "我明天下午学习。"
        choices: ["明天下午", "今天上午", "昨天晚上"]
        answer: "明天下午"
exercise:
  type: dialogue_choice
  prompt: "Từ nào có nghĩa “học sinh / sinh viên”?"
  choices: ["学生", "老师", "学校"]
  answer: "学生"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
