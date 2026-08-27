---
id: ja-n5-fnd-04-foundation-checkpoint
track: japanese-jlpt
locale: en
slug: foundation-checkpoint
title: Check Japanese foundations
order: -2
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: checkpoint
foundation_focus: checkpoint
can_do: "Combine hiragana, katakana, sound timing, and basic sentence roles without step-by-step support"
pattern: "hear -> kana -> timing -> particle/polite form -> produce"
objectives:
  - Retrieve hiragana and katakana from sound
  - Preserve small っ and long-vowel spelling
  - Choose and produce a basic particle pattern
  - Recognize the spoken reading of the topic particle は
vocab:
  - { surface: "駅", reading: "えき", gloss: "station" }
  - { surface: "カメラ", reading: "カメラ", gloss: "camera" }
  - { surface: "切符", reading: "きっぷ", gloss: "ticket" }
  - { surface: "学校", reading: "がっこう", gloss: "school" }
  - { surface: "学生", reading: "がくせい", gloss: "student" }
  - { surface: "水", reading: "みず", gloss: "water" }
steps:
  - type: scene
    title: "Use the foundation without a chart"
    body: "This checkpoint mixes both kana scripts, sound timing, and sentence building before Unit 1."
  - type: dialogue
    lines:
      - { speaker: "A", text: "学校に行きます。", reading: "がっこうに いきます。" }
      - { speaker: "B", text: "学校で水を飲みます。", reading: "がっこうで みずを のみます。" }
  - type: listen
    prompt: "Listen and keep the small っ in the word you hear."
    text: "きっぷ"
    reading: "きっぷ"
  - type: practice
    id: ja-fnd-check-hear-ticket
    kind: listen_type
    prompt: "Listen and type the hiragana word."
    audioText: "きっぷ"
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-check-read-station
    kind: type_answer
    prompt: "Type the reading of 駅."
    answer: "えき"
  - type: practice
    id: ja-fnd-check-katakana-camera
    kind: listen_type
    prompt: "Listen and type the word in katakana."
    audioText: "カメラ"
    answer: "カメラ"
  - type: practice
    id: ja-fnd-check-build-school
    kind: order_words
    prompt: "Build: I go to school."
    tokens: ["学校に", "行きます"]
    answer: "学校に行きます"
    acceptedAnswers: ["学校に行きます。"]
  - type: checkpoint
    items:
      - id: ja-fnd-check-particle-object
        kind: meaning_choice
        prompt: "Choose the missing object particle: 水＿飲みます。"
        choices: ["を", "に", "で"]
        answer: "を"
      - id: ja-fnd-check-topic-sound
        kind: meaning_choice
        prompt: "In 私は学生です, how is the topic particle は pronounced?"
        choices: ["わ", "は", "が"]
        answer: "わ"
      - id: ja-fnd-check-write-school
        kind: type_answer
        prompt: "Type the reading of 学校."
        answer: "がっこう"
exercise:
  type: type_answer
  prompt: "Type: I am a student."
  answer: "私は学生です"
  acceptedAnswers: ["私は学生です。"]
---

Pass this by retrieving the forms, not by rereading a kana or particle table. Both scripts now participate in the same foundation checkpoint before communicative Unit 1.
