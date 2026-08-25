---
id: zh-it-01-hardware-software
track: chinese-it-vocab
locale: vi
slug: hardware-software
title: Phần cứng và phần mềm
order: 1
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-device-support-01
unit_title: "Kiểm tra một sự cố máy tính"
unit_order: 1
unit_can_do: "Hỏi một lỗi máy tính đơn giản thuộc phần cứng hay phần mềm và nhắc tới chip"
unit_role: lesson
can_do: "Hỏi một lỗi máy tính đơn giản thuộc phần cứng hay phần mềm và nhắc tới chip"
pattern: "硬件 / 软件 / 芯片"
objectives:
  - Phân biệt 硬件 với 软件 trong hội thoại hỗ trợ kỹ thuật
  - Nhận ra 芯片 khi đang nói về linh kiện vật lý
vocab:
  - { hanzi: "硬件", pinyin: "yìngjiàn", gloss: "phần cứng" }
  - { hanzi: "软件", pinyin: "ruǎnjiàn", gloss: "phần mềm" }
  - { hanzi: "芯片", pinyin: "xīnpiàn", gloss: "chip / vi mạch" }
steps:
  - type: scene
    title: "Bàn sửa máy"
    body: "Một đồng đội mang tới chiếc máy tính đang gặp lỗi. Cần xác định nên kiểm tra phần mềm hay linh kiện vật lý trước."
    visualKey: "tech-repair-desk"
    imageAlt: "Bàn sửa máy có màn hình máy tính, một con chip và dụng cụ sửa chữa, thể hiện sự khác nhau giữa phần mềm và phần cứng."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这台电脑有问题，是硬件还是软件？", reading: "zhè tái diànnǎo yǒu wèntí, shì yìngjiàn háishi ruǎnjiàn?" }
      - { speaker: "B", text: "我先检查软件，再检查硬件。", reading: "wǒ xiān jiǎnchá ruǎnjiàn, zài jiǎnchá yìngjiàn." }
      - { speaker: "A", text: "好，也看看芯片。", reading: "hǎo, yě kànkan xīnpiàn." }
  - type: listen
    prompt: "Nghe trước. B nói sẽ kiểm tra thứ gì trước?"
    text: "我先检查软件，再检查硬件。"
    reading: "wǒ xiān jiǎnchá ruǎnjiàn, zài jiǎnchá yìngjiàn."
  - type: tip
    title: "Ghi nhớ theo cặp trong ngữ cảnh hỗ trợ"
    body: "硬件 là phần cứng vật lý còn 软件 là phần mềm. Có thể nhớ cặp này qua 硬 = cứng và 软 = mềm. 芯片 là chính con chip hoặc vi mạch."
  - type: teach
    items:
      - { form: "硬件", reading: "yìngjiàn", gloss: "phần cứng", example: "是硬件还是软件？" }
      - { form: "软件", reading: "ruǎnjiàn", gloss: "phần mềm", example: "我先检查软件。" }
      - { form: "芯片", reading: "xīnpiàn", gloss: "chip / vi mạch", example: "也看看芯片。" }
  - type: practice
    id: zh-it-hw-context-1
    kind: dialogue_choice
    prompt: "B muốn kiểm tra chương trình trước các bộ phận vật lý. Câu nào phù hợp?"
    choices: ["先检查软件。", "先换芯片。", "先检查硬件。"]
    answer: "先检查软件。"
    explanation: "软件 chỉ phần mềm; 硬件 và 芯片 đều nói về phần vật lý."
  - type: practice
    id: zh-it-hw-listen-1
    kind: audio_choice
    prompt: "Nghe và chọn linh kiện mà A bảo B xem thêm."
    audioText: "也看看芯片。"
    choices: ["芯片", "软件", "硬件"]
    answer: "芯片"
  - type: practice
    id: zh-it-hw-type-1
    kind: type_answer
    prompt: "Gõ hai chữ Hán có nghĩa là “phần cứng”."
    answer: "硬件"
    hints:
      - "Chữ đầu mang nghĩa cứng: 硬."
      - "Chữ thứ hai là 件."
  - type: checkpoint
    items:
      - id: zh-it-hw-check-1
        kind: meaning_choice
        prompt: "Từ nào chỉ chương trình thay vì các bộ phận vật lý của máy tính?"
        choices: ["软件", "硬件", "芯片"]
        answer: "软件"
      - id: zh-it-hw-check-2
        kind: dialogue_choice
        prompt: "Đồng nghiệp hỏi 是硬件还是软件？ và bạn cho rằng đây là lỗi phần mềm. Câu trả lời ngắn nào phù hợp?"
        choices: ["是软件。", "是芯片。", "是硬件。"]
        answer: "是软件。"
exercise:
  type: type_answer
  prompt: "Gõ từ tiếng Trung có nghĩa là phần cứng."
  answer: "硬件"
  hints:
    - "硬 mang nghĩa cứng."
    - "Thêm 件 để thành 硬件."
---

Hãy dùng đoạn hỗ trợ kỹ thuật phía trên như một vòng học hoàn chỉnh: xác định loại vấn đề, nghe thuật ngữ, tự nhớ và gõ lại một từ, rồi kết thúc bằng checkpoint.
