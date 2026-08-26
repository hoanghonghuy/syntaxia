---
id: en-a1-u09-checkpoint
track: english-basics
locale: en
slug: personal-checkpoint
title: Personal-details checkpoint
order: 33
published: true
cefr_level: a1
unit_id: en-a1-personal-09
unit_title: "Share simple personal details"
unit_order: 9
unit_can_do: "Give and ask for a few basic personal details and say what everyday things you have"
unit_role: checkpoint
can_do: "Give your age, where you live, and one thing you have, then ask one matching question"
pattern: "How old are you? / Where do you live? / I live in … / I have a … / Do you have a …?"
objectives:
  - Retrieve a simple age statement
  - Retrieve a place statement
  - Ask and answer one simple have-question
steps:
  - type: scene
    title: "Exchange three small pieces of information"
    body: "You are talking with a new classmate. Give your age, say where you live, and check whether they have one familiar object."
    visualKey: "classmates-meeting"
    imageAlt: "Two classmates exchange a few basic personal details in a short conversation."
  - type: dialogue
    lines:
      - { speaker: "A", text: "How old are you?" }
      - { speaker: "B", text: "I'm twenty-two years old." }
      - { speaker: "A", text: "Where do you live?" }
      - { speaker: "B", text: "I live in Hanoi." }
      - { speaker: "A", text: "Do you have a phone?" }
      - { speaker: "B", text: "Yes, I do." }
  - type: listen
    prompt: "Listen. Which city does the speaker say they live in?"
    text: "I'm twenty-two years old. I live in Hanoi."
  - type: practice
    id: en-u09-check-listen
    kind: audio_choice
    prompt: "Listen and choose the city."
    audioText: "I live in Hanoi."
    choices: ["Hanoi", "Da Nang", "Hue"]
    answer: "Hanoi"
  - type: practice
    id: en-u09-check-age
    kind: type_answer
    prompt: "Say that you are 22 years old."
    answer: "I'm twenty-two years old"
    acceptedAnswers: ["I'm twenty-two years old.", "I am twenty-two years old", "I am twenty-two years old."]
  - type: practice
    id: en-u09-check-have
    kind: type_answer
    prompt: "Say that you have a book."
    answer: "I have a book"
    acceptedAnswers: ["I have a book."]
  - type: checkpoint
    items:
      - id: en-u09-check-ask-age
        kind: type_answer
        prompt: "Ask the other person their age."
        answer: "How old are you"
        acceptedAnswers: ["How old are you?", "How old are you"]
      - id: en-u09-check-have-no
        kind: dialogue_choice
        prompt: "Someone asks “Do you have a bike?” You do not. Which reply completes the exchange?"
        choices: ["No, I don't.", "I live in Hanoi.", "I'm twenty-two years old."]
        answer: "No, I don't."
exercise:
  type: type_answer
  prompt: "Say that you are 22 years old."
  answer: "I'm twenty-two years old"
  acceptedAnswers: ["I'm twenty-two years old.", "I am twenty-two years old", "I am twenty-two years old."]
---

The checkpoint stays inside the unit's taught language: age, place, and one concrete possession.
