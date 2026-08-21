---
id: ja-n5-05-food-drink
track: japanese-jlpt
locale: vi
slug: food-drink
title: Gọi một món đơn giản
order: 5
published: true
jlpt_level: n5
unit_id: ja-n5-cafe-04
unit_title: "Gọi món tại quầy"
unit_order: 4
unit_can_do: "Yêu cầu một món ăn hoặc đồ uống và kết thúc một lượt giao tiếp ngắn tại quầy một cách lịch sự"
unit_role: lesson
can_do: "Yêu cầu một món ăn hoặc đồ uống đơn giản bằng N をください"
pattern: "お茶をください。 / 水をください。"
objectives:
  - Gọi tên một số món ăn, đồ uống quen thuộc
  - Đặt をください sau món mình muốn
  - Hoàn thành một lượt giao tiếp dịch vụ rất ngắn một cách lịch sự
vocab:
  - { surface: "水", reading: "みず", gloss: "nước" }
  - { surface: "お茶", reading: "おちゃ", gloss: "trà" }
  - { surface: "コーヒー", reading: "コーヒー", gloss: "cà phê" }
  - { surface: "パン", reading: "パン", gloss: "bánh mì" }
  - { surface: "を", reading: "を", gloss: "trợ từ đánh dấu tân ngữ" }
  - { surface: "ください", reading: "ください", gloss: "xin hãy cho / vui lòng" }
steps:
  - type: scene
    title: "Gọi món tại quầy"
    body: "Bạn đứng ở quầy một quán nhỏ. Hãy chọn một đồ uống và yêu cầu món đó bằng tiếng Nhật."
  - type: dialogue
    lines:
      - { speaker: "店員", text: "はい、どうぞ。", reading: "はい、どうぞ。" }
      - { speaker: "客", text: "お茶をください。", reading: "おちゃをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe và chú ý món đứng trước をください."
    text: "水をください。"
    reading: "みずをください。"
  - type: tip
    title: "Đặt món cần lấy trước をください"
    body: "Mẫu hữu ích là món + をください. Chỉ cần thay món, giữ nguyên khung yêu cầu: 水をください, お茶をください."
  - type: teach
    items:
      - { form: "水をください。", reading: "みずをください。", gloss: "Cho tôi nước / Nước nhé.", example: "水をください。" }
      - { form: "お茶をください。", reading: "おちゃをください。", gloss: "Cho tôi trà / Trà nhé.", example: "お茶をください。" }
      - { form: "コーヒーをください。", reading: "コーヒーをください。", gloss: "Cho tôi cà phê.", example: "コーヒーをください。" }
      - { form: "パンをください。", reading: "パンをください。", gloss: "Cho tôi bánh mì.", example: "パンをください。" }
  - type: practice
    id: ja-food-dialogue-1
    kind: dialogue_choice
    prompt: "Bạn muốn trà. Câu nào phù hợp tình huống gọi tại quầy?"
    choices: ["お茶をください。", "お茶はだれですか。", "お茶ですか。"]
    answer: "お茶をください。"
  - type: practice
    id: ja-food-listen-1
    kind: audio_choice
    prompt: "Nghe. Khách yêu cầu món gì?"
    audioText: "水をください"
    choices: ["水", "お茶", "パン"]
    answer: "水"
  - type: practice
    id: ja-food-produce-1
    kind: type_answer
    prompt: "Bạn muốn cà phê. Hãy nhập câu yêu cầu tiếng Nhật hoàn chỉnh."
    answer: "コーヒーをください"
    acceptedAnswers: ["コーヒーをください。"]
    hints:
      - "Dùng món + をください."
  - type: checkpoint
    items:
      - id: ja-food-check-1
        kind: meaning_choice
        prompt: "Câu nào dùng để xin bánh mì?"
        choices: ["パンをください。", "水をください。", "パンです。"]
        answer: "パンをください。"
      - id: ja-food-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: bạn cùng lớp chỉ vào bố bạn trong ảnh gia đình. Câu trả lời ngắn nào phù hợp?"
        choices: ["父です。", "水です。", "何番ですか。"]
        answer: "父です。"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu dùng để xin nước."
  choices: ["水をください。", "水は何ですか。", "水の名前です。"]
  answer: "水をください。"
---

Tên món được học bên trong một khung yêu cầu có thể tái sử dụng, để người học thay danh từ và thực hiện ngay một hành động giao tiếp thật.
