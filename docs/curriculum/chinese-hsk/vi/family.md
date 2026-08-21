---
id: zh-hsk-b1-04-family
track: chinese-hsk
locale: vi
slug: family
title: "Giới thiệu người trong gia đình"
order: 4
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-people-02
unit_title: "Giới thiệu bản thân và người gần gũi"
unit_order: 2
unit_can_do: "Trao đổi tên và giới thiệu bạn bè hoặc người thân"
unit_role: lesson
can_do: "Chỉ và giới thiệu người thân trong một cuộc trò chuyện đơn giản về ảnh gia đình"
pattern: "这是我… / 我家…"
objectives:
  - "Giới thiệu một người thân gần gũi"
  - "Dùng 家 để nói về gia đình / nhà"
vocab:
  - { hanzi: "家", pinyin: "jiā", gloss: "nhà / gia đình" }
  - { hanzi: "爸爸", pinyin: "bà ba", gloss: "bố" }
  - { hanzi: "妈妈", pinyin: "mā ma", gloss: "mẹ" }
  - { hanzi: "哥哥", pinyin: "gē ge", gloss: "anh trai" }
  - { hanzi: "姐姐", pinyin: "jiě jie", gloss: "chị gái" }
  - { hanzi: "弟弟", pinyin: "dì di", gloss: "em trai" }
  - { hanzi: "妹妹", pinyin: "mèi mei", gloss: "em gái" }
steps:
  - type: scene
    title: "Tình huống"
    body: "Một bạn học nhìn thấy ảnh gia đình trên điện thoại của bạn và hỏi những người trong ảnh là ai."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我妈妈。", reading: "zhè shì wǒ mā ma" }
      - { speaker: "A", text: "他呢？", reading: "tā ne" }
      - { speaker: "B", text: "他是我哥哥。", reading: "tā shì wǒ gē ge" }
  - type: listen
    prompt: "Nghe cụm dùng để giới thiệu một người thân."
    text: "这是我妈妈。"
    reading: "zhè shì wǒ mā ma"
  - type: tip
    title: "Dùng cả mẫu câu giới thiệu"
    body: "这是我 + từ chỉ người thân là mẫu hữu ích. Trong tiếng Trung đời thường, 的 thường được lược trước các từ thân thuộc như 妈妈 hoặc 爸爸."
  - type: teach
    items:
      - { form: "这是我妈妈。", reading: "zhè shì wǒ mā ma", gloss: "Đây là mẹ tôi.", example: "这是我妈妈。" }
      - { form: "这是我爸爸。", reading: "zhè shì wǒ bà ba", gloss: "Đây là bố tôi.", example: "这是我爸爸。" }
      - { form: "他是我哥哥。", reading: "tā shì wǒ gē ge", gloss: "Anh ấy là anh trai tôi.", example: "他是我哥哥。" }
      - { form: "她是我姐姐。", reading: "tā shì wǒ jiě jie", gloss: "Cô ấy là chị gái tôi.", example: "她是我姐姐。" }
  - type: practice
    id: zh-family-reply-1
    kind: dialogue_choice
    prompt: "Một bạn học hỏi 这是谁？ Chọn câu giới thiệu mẹ của bạn."
    choices: ["这是我妈妈。", "我是三号。", "再见。"]
    answer: "这是我妈妈。"
  - type: practice
    id: zh-family-listen-1
    kind: audio_choice
    prompt: "Nghe. Người nào đang được giới thiệu?"
    audioText: "他是我哥哥。"
    choices: ["哥哥", "姐姐", "妈妈"]
    answer: "哥哥"
  - type: practice
    id: zh-family-produce-1
    kind: type_answer
    prompt: "Gõ câu: “Đây là bố tôi.”"
    answer: "这是我爸爸"
    acceptedAnswers: ["这是我爸爸。"]
    hints:
      - "Dùng 这是我 + 爸爸."
  - type: checkpoint
    items:
      - id: zh-family-check-1
        kind: meaning_choice
        prompt: "Từ nào có nghĩa “chị gái”?"
        choices: ["姐姐", "妹妹", "妈妈"]
        answer: "姐姐"
      - id: zh-family-check-2
        kind: audio_choice
        prompt: "Ôn lại: nghe và chọn số."
        audioText: "三"
        choices: ["三", "五", "八"]
        answer: "三"
exercise:
  type: dialogue_choice
  prompt: "Câu nào giới thiệu mẹ của bạn?"
  choices: ["这是我妈妈。", "这是我哥哥。", "我是三号。"]
  answer: "这是我妈妈。"
---

Phần học có hướng dẫn ở trên là nội dung chính. Pinyin hỗ trợ đọc ở giai đoạn đầu; nghe, chữ Hán, tương tác, tự tạo câu và ôn lại mới là vòng học cốt lõi.
