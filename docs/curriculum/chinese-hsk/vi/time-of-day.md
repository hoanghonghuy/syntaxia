---
id: zh-hsk-b1-05-time-of-day
track: chinese-hsk
locale: vi
slug: time-of-day
title: "Hẹn một kế hoạch đơn giản theo ngày và buổi"
order: 5
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-study-04
unit_title: "Lên kế hoạch khi nào và ở đâu để học"
unit_order: 4
unit_can_do: "Nói khi nào và ở đâu mình học tiếng Trung và xác nhận một kế hoạch học đơn giản"
unit_role: lesson
can_do: "Nói việc xảy ra hôm nay hay ngày mai và đặt nó vào một buổi trong ngày"
pattern: "我今天… / 我明天上午…"
objectives:
  - "Phân biệt hôm nay, ngày mai và hôm qua"
  - "Dùng sáng / chiều / tối trong một kế hoạch ngắn"
vocab:
  - { hanzi: "今天", pinyin: "jīn tiān", gloss: "hôm nay" }
  - { hanzi: "明天", pinyin: "míng tiān", gloss: "ngày mai" }
  - { hanzi: "昨天", pinyin: "zuó tiān", gloss: "hôm qua" }
  - { hanzi: "上午", pinyin: "shàng wǔ", gloss: "buổi sáng" }
  - { hanzi: "下午", pinyin: "xià wǔ", gloss: "buổi chiều" }
  - { hanzi: "晚上", pinyin: "wǎn shang", gloss: "buổi tối" }
  - { hanzi: "现在", pinyin: "xiàn zài", gloss: "bây giờ" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Bạn và một bạn học đang chọn thời điểm để học cùng nhau."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你明天上午学习汉语吗？", reading: "nǐ míng tiān shàng wǔ xué xí hàn yǔ ma" }
      - { speaker: "B", text: "学习。你呢？", reading: "xué xí. nǐ ne" }
      - { speaker: "A", text: "我明天下午学习。", reading: "wǒ míng tiān xià wǔ xué xí" }
      - { speaker: "B", text: "好，明天见。", reading: "hǎo, míng tiān jiàn" }
  - type: listen
    prompt: "Nghe ngày và buổi được nhắc tới."
    text: "我明天下午学习。"
    reading: "wǒ míng tiān xià wǔ xué xí"
  - type: tip
    title: "Từ chỉ thời gian đặt mốc cho sự việc"
    body: "Mẫu dễ dùng là 我 + thời gian + hành động, ví dụ 我明天下午学习. Học 今天 / 明天 / 昨天 theo nhóm đối lập rồi thêm 上午 / 下午 / 晚上."
  - type: teach
    items:
      - { form: "今天", reading: "jīn tiān", gloss: "hôm nay", example: "我今天学习。" }
      - { form: "明天", reading: "míng tiān", gloss: "ngày mai", example: "我明天学习。" }
      - { form: "上午", reading: "shàng wǔ", gloss: "buổi sáng", example: "我明天上午学习。" }
      - { form: "下午", reading: "xià wǔ", gloss: "buổi chiều", example: "我明天下午学习。" }
  - type: practice
    id: zh-time-listen-1
    kind: audio_choice
    prompt: "Nghe. Người này học khi nào?"
    audioText: "我明天下午学习。"
    choices: ["明天下午", "今天上午", "明天晚上"]
    answer: "明天下午"
  - type: practice
    id: zh-time-meaning-1
    kind: meaning_choice
    prompt: "Từ nào có nghĩa “hôm nay”?"
    choices: ["今天", "明天", "昨天"]
    answer: "今天"
  - type: practice
    id: zh-time-produce-1
    kind: type_answer
    prompt: "Gõ câu: “Tôi học vào sáng mai.”"
    answer: "我明天上午学习"
    acceptedAnswers: ["我明天上午学习。"]
    hints:
      - "Bắt đầu bằng 我, rồi 明天上午."
  - type: checkpoint
    items:
      - id: zh-time-check-1
        kind: meaning_choice
        prompt: "Từ nào có nghĩa “buổi tối”?"
        choices: ["晚上", "上午", "现在"]
        answer: "晚上"
      - id: zh-time-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: ai đó hỏi 这是谁？ Câu nào giới thiệu mẹ của bạn?"
        choices: ["这是我妈妈。", "我明天学习。", "三号。"]
        answer: "这是我妈妈。"
exercise:
  type: dialogue_choice
  prompt: "Từ nào có nghĩa “ngày mai”?"
  choices: ["明天", "今天", "昨天"]
  answer: "明天"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
