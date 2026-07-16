---
id: html-11-entities
track: html-basics
locale: vi
slug: html-entities
title: Entity và vài thẻ chữ nhỏ
order: 11
published: true
objectives:
  - Dùng entity khi cần hiện ký tự đặc biệt như < và &
  - Nhận biết br và hr ở mức đúng chỗ
  - Giới thiệu abbr và time như thẻ chữ bổ trợ
exercise:
  mode: html
  starter: |
    <!-- Show AT&amp;T using an entity for & -->
    
  hints:
    - "Dấu & trong chữ cần entity."
    - "Viết &amp; để hiện & an toàn."
    - Bọc tên công ty trong đoạn p.
  solution: |
    <p>AT&amp;T</p>
  expected:
    type: htmlIncludes
    needles:
      - "&amp;"
---

Đôi khi bạn muốn hiện đúng ký tự `<` hoặc `&` trên trang. Nếu gõ thẳng vào HTML, trình duyệt có thể hiểu nhầm là mã. **Entity** (thực thể ký tự) là cách viết an toàn cho những ký tự đó.

Ngoài ra có vài thẻ chữ nhỏ hữu ích: xuống dòng cưỡng bức, đường kẻ ngang, viết tắt, và thời gian máy đọc được.

| Entity / thẻ | Nghĩa đơn giản |
| --- | --- |
| `&lt;` | Ký tự `<` |
| `&gt;` | Ký tự `>` |
| `&amp;` | Ký tự `&` |
| `&nbsp;` | Khoảng trắng không bị “gãy” dòng tùy tiện |
| `br` | Xuống dòng trong cùng đoạn (dùng tiết kiệm) |
| `hr` | Đường phân cách theo chủ đề |
| `abbr` | Viết tắt + `title` giải thích |
| `time` | Ngày/giờ có thể gắn `datetime` |

## Ví dụ mẫu

```html
<p>Viết thẻ đoạn văn bằng &lt;p&gt; và &lt;/p&gt;.</p>
<p>Công ty dùng HTML &amp; CSS.</p>
<p>MDN nghĩa là <abbr title="Mozilla Developer Network">MDN</abbr>.</p>
<p>Phát hành ngày <time datetime="2026-07-16">16 tháng 7 năm 2026</time>.</p>
<hr />
<p>Dòng một.<br />Dòng hai (cùng đoạn).</p>
```

- `&lt;p&gt;` hiện chữ `<p>` thay vì mở thẻ thật.
- `&amp;` hiện dấu `&` đúng cách.
- `abbr` giúp người đọc (và công cụ) biết cụm viết tắt nghĩa là gì.
- `time` + `datetime` cho người xem lịch thân thiện và máy đọc định dạng chuẩn.
- `hr` tách chủ đề; `br` chỉ xuống dòng khi thật sự cần (địa chỉ, thơ) — không dùng `br` để tạo khoảng cách giữa đoạn thay `p`.

## Lỗi thường gặp

- Gõ `<` thô trong nội dung khi muốn *hiện* ký tự đó — dễ làm vỡ cấu trúc HTML.
- Lạm dụng `br` để “tạo khoảng trắng” giữa các đoạn — hãy dùng `p` (và CSS sau này).
- Quên `&amp;` khi viết `&` trong văn bản — một số chỗ HTML sẽ lỗi cú pháp.

## Thử ngay

Dùng sandbox bên dưới để hiện AT&T bằng HTML entity. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
