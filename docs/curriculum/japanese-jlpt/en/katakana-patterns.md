---
id: ja-n5-fnd-01c-katakana-patterns
track: japanese-jlpt
locale: en
slug: katakana-patterns
title: Read common katakana words
order: -5
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: lesson
foundation_focus: reading
can_do: "Connect katakana with the same Japanese sound system and read a few common loanwords"
pattern: "hiragana sound ↔ katakana sound / ー extends the preceding vowel"
objectives:
  - Recognize that katakana represents the same Japanese sound units with a different script
  - Read a small set of common N5 loanwords without romaji
  - Notice the long-vowel mark ー before the dedicated timing lesson
vocab:
  - { surface: "カメラ", reading: "カメラ", gloss: "camera" }
  - { surface: "テレビ", reading: "テレビ", gloss: "television / TV" }
  - { surface: "トイレ", reading: "トイレ", gloss: "toilet / restroom" }
  - { surface: "バス", reading: "バス", gloss: "bus" }
  - { surface: "コーヒー", reading: "コーヒー", gloss: "coffee" }
  - { surface: "スポーツ", reading: "スポーツ", gloss: "sports" }
steps:
  - type: scene
    title: "A second script, not a second pronunciation system"
    body: "You see common loanwords on signs and menus. Katakana uses the same Japanese sound units as hiragana, so reuse the sound patterns you already started learning."
    imageUrl: "/language/scenes/japanese-katakana-patterns.svg"
    imageAlt: "The hiragana k row is paired vertically with the matching katakana k row, followed by the katakana words カメラ and コーヒー, with the long-vowel marks in コーヒー emphasized."
  - type: dialogue
    lines:
      - { speaker: "A", text: "カメラ。", reading: "カメラ。" }
      - { speaker: "B", text: "カメラ。", reading: "カメラ。" }
      - { speaker: "A", text: "テレビ。", reading: "テレビ。" }
      - { speaker: "B", text: "テレビ。", reading: "テレビ。" }
  - type: listen
    prompt: "Listen and identify the katakana word."
    text: "カメラ"
    reading: "カメラ"
  - type: tip
    title: "Reuse the same sound rows"
    body: "ア・イ・ウ・エ・オ match the same vowel sounds as あ・い・う・え・お, and katakana continues with parallel rows such as カ・キ・ク・ケ・コ. Katakana is common in loanwords, names, sound effects, and some labels; it is not limited to foreign words."
  - type: teach
    items:
      - { form: "ア イ ウ エ オ / カ キ ク ケ コ", reading: "あ い う え お / か き く け こ", gloss: "katakana vowel and k rows", example: "カメラ" }
      - { form: "サ シ ス セ ソ / タ チ ツ テ ト / ナ ニ ヌ ネ ノ", reading: "さ し す せ そ / た ち つ て と / な に ぬ ね の", gloss: "parallel katakana sound rows", example: "テレビ / トイレ" }
      - { form: "バス / コーヒー / スポーツ", reading: "ばす / こーひー / すぽーつ", gloss: "common loanwords; ー marks extra vowel timing", example: "コーヒー" }
  - type: practice
    id: ja-fnd-kata-hear-camera
    kind: audio_choice
    prompt: "Listen and choose the word you hear."
    audioText: "カメラ"
    choices: ["カメラ", "カレー", "カレンダー"]
    answer: "カメラ"
  - type: practice
    id: ja-fnd-kata-type-tv
    kind: listen_type
    prompt: "Listen and type the word in katakana."
    audioText: "テレビ"
    answer: "テレビ"
  - type: practice
    id: ja-fnd-kata-produce-toilet
    kind: type_answer
    prompt: "Type the common katakana word for restroom/toilet."
    answer: "トイレ"
    hints:
      - "It begins with ト."
      - "The last two kana are イレ."
  - type: checkpoint
    items:
      - id: ja-fnd-kata-check-coffee
        kind: audio_choice
        prompt: "Listen and choose the word with the long-vowel mark you hear."
        audioText: "コーヒー"
        choices: ["コーヒー", "コート", "コップ"]
        answer: "コーヒー"
      - id: ja-fnd-kata-check-sports
        kind: listen_type
        prompt: "Listen and type the katakana word."
        audioText: "スポーツ"
        answer: "スポーツ"
exercise:
  type: listen_type
  prompt: "Listen and type the katakana word."
  audioText: "バス"
  answer: "バス"
---

The goal is to reuse Japanese sound knowledge across two scripts. Later units keep katakana visible in real words instead of returning to romaji as the default support.
