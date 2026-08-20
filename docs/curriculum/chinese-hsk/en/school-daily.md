---
id: zh-hsk-b1-06-school-daily
track: chinese-hsk
locale: en
slug: school-daily
title: "Say what you do at school"
order: 6
published: true
hsk_band: 1
hsk_version: "3.0"
can_do: "Say that you are a student and describe studying Chinese at school"
pattern: "我是学生。/ 我在学校学习汉语。"
objectives:
  - "Identify teacher / student / school"
  - "Use 在 + place before a simple study action"
vocab:
  - { hanzi: "学校", pinyin: "xué xiào", gloss: "school" }
  - { hanzi: "老师", pinyin: "lǎo shī", gloss: "teacher" }
  - { hanzi: "学生", pinyin: "xué sheng", gloss: "student" }
  - { hanzi: "学习", pinyin: "xué xí", gloss: "to study" }
  - { hanzi: "汉语", pinyin: "hàn yǔ", gloss: "Chinese language" }
steps:
  - type: scene
    title: "Situation"
    body: "A new classmate asks what you do and where you study."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你是学生吗？", reading: "nǐ shì xué sheng ma" }
      - { speaker: "B", text: "是，我是学生。", reading: "shì, wǒ shì xué sheng" }
      - { speaker: "A", text: "你在哪里学习汉语？", reading: "nǐ zài nǎ lǐ xué xí hàn yǔ" }
      - { speaker: "B", text: "我在学校学习汉语。", reading: "wǒ zài xué xiào xué xí hàn yǔ" }
  - type: listen
    prompt: "Listen for the place before the action."
    text: "我在学校学习汉语。"
    reading: "wǒ zài xué xiào xué xí hàn yǔ"
  - type: tip
    title: "在 + place + action"
    body: "Use 在 to locate an action: 我在学校学习汉语. Keep the whole chunk together instead of memorizing 学校 and 学习 as isolated words."
  - type: teach
    items:
      - { form: "我是学生。", reading: "wǒ shì xué sheng", gloss: "I am a student.", example: "我是学生。" }
      - { form: "老师", reading: "lǎo shī", gloss: "teacher", example: "她是老师。" }
      - { form: "学校", reading: "xué xiào", gloss: "school", example: "我在学校。" }
      - { form: "我在学校学习汉语。", reading: "wǒ zài xué xiào xué xí hàn yǔ", gloss: "I study Chinese at school.", example: "我在学校学习汉语。" }
  - type: practice
    id: zh-school-reply-1
    kind: dialogue_choice
    prompt: "Someone asks 你是学生吗？ Choose a natural positive reply."
    choices: ["是，我是学生。", "我是学校。", "再见。"]
    answer: "是，我是学生。"
  - type: practice
    id: zh-school-listen-1
    kind: audio_choice
    prompt: "Listen. Where does the person study Chinese?"
    audioText: "我在学校学习汉语。"
    choices: ["学校", "家", "商店"]
    answer: "学校"
  - type: practice
    id: zh-school-produce-1
    kind: type_answer
    prompt: "Type: “I study Chinese at school.”"
    answer: "我在学校学习汉语"
    acceptedAnswers: ["我在学校学习汉语。"]
    hints:
      - "Use 我在学校 + 学习汉语."
  - type: checkpoint
    items:
      - id: zh-school-check-1
        kind: meaning_choice
        prompt: "Which word means “teacher”?"
        choices: ["老师", "学生", "学校"]
        answer: "老师"
      - id: zh-school-check-2
        kind: audio_choice
        prompt: "Review: when does the person study?"
        audioText: "我明天下午学习。"
        choices: ["明天下午", "今天上午", "昨天晚上"]
        answer: "明天下午"
exercise:
  type: dialogue_choice
  prompt: "Which word means “student”?"
  choices: ["学生", "老师", "学校"]
  answer: "学生"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
