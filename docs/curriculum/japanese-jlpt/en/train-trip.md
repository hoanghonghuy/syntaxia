---
id: ja-n5-23-train-trip
track: japanese-jlpt
locale: en
slug: train-trip
title: Take a simple train trip
order: 23
published: true
jlpt_level: n5
unit_id: ja-n5-train-08
unit_title: "Travel by train"
unit_order: 8
unit_can_do: "Check a simple train destination and understand where or when to get off"
unit_role: lesson
can_do: "Ask whether a train goes to a station and understand a short get-off instruction"
pattern: "この電車は…駅に行きますか。 / はい。 / 次の駅で降ります。"
objectives:
  - Ask whether a train goes to a target station
  - Understand 乗る and 降りる in a travel context
  - Extract the next station from a short answer
vocab:
  - { surface: "電車", reading: "でんしゃ", gloss: "electric train" }
  - { surface: "駅", reading: "えき", gloss: "station" }
  - { surface: "乗る", reading: "のる", gloss: "to get on; ride" }
  - { surface: "降りる", reading: "おりる", gloss: "to get off" }
  - { surface: "切符", reading: "きっぷ", gloss: "ticket" }
  - { surface: "次", reading: "つぎ", gloss: "next" }
  - { surface: "出る", reading: "でる", gloss: "to leave; depart" }
steps:
  - type: scene
    title: "Check the train before boarding"
    body: "At a station platform, you need to confirm that this train goes to the station you want."
    imageUrl: "/language/scenes/train-platform.svg"
    imageAlt: "A train at a platform with a destination sign and a passenger checking before boarding."
  - type: dialogue
    lines:
      - { speaker: "A", text: "すみません。この電車は東京駅に行きますか。", reading: "すみません。この でんしゃは とうきょうえきに いきますか。" }
      - { speaker: "B", text: "はい、行きます。", reading: "はい、いきます。" }
      - { speaker: "A", text: "どこで降りますか。", reading: "どこで おりますか。" }
      - { speaker: "B", text: "次の駅で降ります。", reading: "つぎの えきで おります。" }
  - type: listen
    prompt: "Listen once. When should the passenger get off?"
    text: "次の駅で降ります。"
    reading: "つぎの えきで おります。"
  - type: tip
    title: "Separate boarding from getting off"
    body: "乗ります is getting on or riding. 降ります is getting off. In a station conversation, the verb tells you which action to take."
  - type: teach
    items:
      - { form: "この電車は東京駅に行きますか。", reading: "この でんしゃは とうきょうえきに いきますか。", gloss: "Does this train go to Tokyo Station?", example: "この電車は東京駅に行きますか。" }
      - { form: "次の駅で降ります。", reading: "つぎの えきで おります。", gloss: "Get off at the next station.", example: "次の駅で降ります。" }
      - { form: "電車に乗ります。", reading: "でんしゃに のります。", gloss: "get on / ride the train", example: "ここで電車に乗ります。" }
  - type: practice
    id: ja-u08-train-listen
    kind: audio_choice
    prompt: "Listen. What should you do at the next station?"
    audioText: "次の駅で降ります"
    choices: ["get off", "get on", "sleep"]
    answer: "get off"
  - type: practice
    id: ja-u08-train-destination
    kind: dialogue_choice
    prompt: "You want to confirm the destination. Which question fits?"
    choices: ["この電車は東京駅に行きますか。", "東京駅をください。", "東京駅は何時に寝ますか。"]
    answer: "この電車は東京駅に行きますか。"
  - type: practice
    id: ja-u08-train-produce
    kind: type_answer
    prompt: "Type: Get off at the next station."
    answer: "次の駅で降ります"
    acceptedAnswers: ["次の駅で降ります。"]
    hints:
      - "次の駅 + で + 降ります."
  - type: checkpoint
    items:
      - id: ja-u08-train-check-board
        kind: meaning_choice
        prompt: "Which verb means get on / ride?"
        choices: ["乗る", "降りる", "寝る"]
        answer: "乗る"
      - id: ja-u08-train-check-off
        kind: listen_type
        prompt: "Listen and type the travel instruction."
        audioText: "次の駅で降ります"
        answer: "次の駅で降ります"
        acceptedAnswers: ["次の駅で降ります。"]
exercise:
  type: type_answer
  prompt: "Ask: Does this train go to Tokyo Station?"
  answer: "この電車は東京駅に行きますか"
  acceptedAnswers: ["この電車は東京駅に行きますか。"]
---

The unit trains the exact information a beginner needs on a platform: destination, boarding, and where to get off.
