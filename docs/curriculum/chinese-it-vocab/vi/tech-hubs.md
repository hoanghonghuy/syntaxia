---
id: zh-it-06-tech-hubs
track: chinese-it-vocab
locale: vi
slug: tech-hubs
title: Các trung tâm công nghệ Trung Quốc
order: 6
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-tech-ecosystem-06
unit_title: "Trao đổi về các trung tâm công nghệ Trung Quốc"
unit_order: 6
unit_can_do: "Nói Shenzhen, Huaqiangbei và Zhongguancun nằm ở đâu trong một cuộc trao đổi đi công tác và nhận ra thuật ngữ công ty kỳ lân"
unit_role: lesson
can_do: "Nói Shenzhen, Huaqiangbei và Zhongguancun nằm ở đâu trong một cuộc trao đổi đi công tác và nhận ra thuật ngữ công ty kỳ lân"
pattern: "深圳 / 华强北 / 中关村 / 独角兽企业"
objectives:
  - Phân biệt thành phố 深圳 với hai khu công nghệ 华强北 và 中关村
  - Nhận ra 独角兽企业 khi đang nói về startup
vocab:
  - { hanzi: "深圳", pinyin: "Shēnzhèn", gloss: "Thâm Quyến / Shenzhen" }
  - { hanzi: "华强北", pinyin: "Huáqiáng běi", gloss: "Huaqiangbei, khu điện tử ở Shenzhen" }
  - { hanzi: "中关村", pinyin: "Zhōngguāncūn", gloss: "Zhongguancun, khu công nghệ ở Bắc Kinh" }
  - { hanzi: "独角兽企业", pinyin: "dújiǎoshòu qǐyè", gloss: "công ty kỳ lân" }
steps:
  - type: scene
    title: "Lên kế hoạch đi công tác"
    body: "Một đồng đội đang lên kế hoạch đi công tác và so sánh các khu công nghệ tại Shenzhen và Bắc Kinh. Cần tách rõ tên thành phố, tên khu và thuật ngữ chỉ một loại startup."
    visualKey: "china-tech-hubs"
    imageAlt: "Khung hình dạng bản đồ đơn giản có hai điểm vị trí, một tòa nhà gợi ý chợ điện tử và một biểu tượng gợi ý công ty công nghệ."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你去深圳出差吗？", reading: "nǐ qù Shēnzhèn chūchāi ma?" }
      - { speaker: "B", text: "对，我想去华强北看看硬件。", reading: "duì, wǒ xiǎng qù Huáqiáng běi kànkan yìngjiàn." }
      - { speaker: "A", text: "北京的中关村也是科技区吗？", reading: "Běijīng de Zhōngguāncūn yě shì kējì qū ma?" }
      - { speaker: "B", text: "对。聊创业公司时，也常听到独角兽企业。", reading: "duì. liáo chuàngyè gōngsī shí, yě cháng tīngdào dújiǎoshòu qǐyè." }
  - type: listen
    prompt: "Nghe trước. B muốn tới đâu để xem phần cứng?"
    text: "我想去华强北看看硬件。"
    reading: "wǒ xiǎng qù Huáqiáng běi kànkan yìngjiàn."
  - type: tip
    title: "Tách địa danh khỏi từ vựng về công ty"
    body: "深圳 là thành phố Shenzhen. 华强北 là khu điện tử nổi tiếng tại Shenzhen. 中关村 là khu công nghệ ở Bắc Kinh. 独角兽企业 nghĩa là công ty kỳ lân; đây là loại công ty chứ không phải địa danh."
  - type: teach
    items:
      - { form: "深圳", reading: "Shēnzhèn", gloss: "Shenzhen", example: "你去深圳出差吗？" }
      - { form: "华强北", reading: "Huáqiáng běi", gloss: "Huaqiangbei", example: "去华强北看看硬件。" }
      - { form: "中关村", reading: "Zhōngguāncūn", gloss: "Zhongguancun", example: "北京的中关村。" }
      - { form: "独角兽企业", reading: "dújiǎoshòu qǐyè", gloss: "công ty kỳ lân", example: "常听到独角兽企业。" }
  - type: practice
    id: zh-it-hub-context-1
    kind: dialogue_choice
    prompt: "B đi Shenzhen và muốn xem phần cứng. Điểm đến nào khớp với hội thoại?"
    choices: ["华强北", "中关村", "独角兽企业"]
    answer: "华强北"
    explanation: "华强北 là khu điện tử được nhắc tới trong chuyến đi Shenzhen."
  - type: practice
    id: zh-it-hub-listen-1
    kind: audio_choice
    prompt: "Nghe và chọn thành phố vừa nghe."
    audioText: "你去深圳出差吗？"
    choices: ["深圳", "中关村", "华强北"]
    answer: "深圳"
  - type: practice
    id: zh-it-hub-type-1
    kind: type_answer
    prompt: "Gõ ba chữ Hán của Zhongguancun."
    answer: "中关村"
    hints:
      - "Chữ đầu là 中."
      - "Sau đó viết 关村."
  - type: checkpoint
    items:
      - id: zh-it-hub-check-1
        kind: meaning_choice
        prompt: "Mục nào là một loại công ty chứ không phải thành phố hay khu vực?"
        choices: ["独角兽企业", "深圳", "华强北"]
        answer: "独角兽企业"
      - id: zh-it-hub-check-2
        kind: dialogue_choice
        prompt: "A hỏi về một khu công nghệ ở Bắc Kinh. Cụm nào xác định đúng nơi đó?"
        choices: ["北京的中关村。", "深圳的独角兽企业。", "微信的华强北。"]
        answer: "北京的中关村。"
exercise:
  type: type_answer
  prompt: "Gõ từ tiếng Trung có nghĩa là “công ty kỳ lân”."
  answer: "独角兽企业"
  hints:
    - "Hình ảnh kỳ lân là 独角兽."
    - "Thêm 企业, doanh nghiệp / công ty."
---

Dùng tình huống lên kế hoạch công tác để giữ rõ hai loại thông tin: Shenzhen là thành phố, Huaqiangbei và Zhongguancun là khu công nghệ, còn 独角兽企业 là thuật ngữ về startup.
