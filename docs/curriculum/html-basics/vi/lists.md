---
id: html-04-lists
track: html-basics
locale: vi
slug: lists
title: Danh sách
order: 4
published: true
objectives:
  - Tạo danh sách không thứ tự (ul) và có thứ tự (ol)
  - Đặt mỗi mục trong thẻ li
  - Nhận biết danh sách định nghĩa (dl) ở mức giới thiệu
exercise:
  mode: html
  starter: |
    <!-- Build an unordered list with two items -->
    
  hints:
    - Bắt đầu bằng thẻ mở ul.
    - Mỗi mục cần một phần tử li.
    - Thêm ít nhất hai mục li.
  solution: |
    <ul>
      <li>One</li>
      <li>Two</li>
    </ul>
  expected:
    type: htmlTags
    tags:
      - tag: ul
        minCount: 1
      - tag: li
        minCount: 2
---

Khi bạn liệt kê bước làm hoặc liệt kê món hàng, HTML có **danh sách**. Có danh sách không cần số thứ tự (`ul`), danh sách có thứ tự (`ol`), và danh sách dạng thuật ngữ–định nghĩa (`dl`).

| Loại | Thẻ bao | Mục | Khi nào dùng |
| --- | --- | --- | --- |
| Không thứ tự | `ul` | `li` | Gạch đầu dòng, không cần 1–2–3 |
| Có thứ tự | `ol` | `li` | Các bước theo thứ tự |
| Định nghĩa | `dl` | `dt` + `dd` | Thuật ngữ và giải thích |

## Ví dụ mẫu

```html
<h2>Nguyên liệu</h2>
<ul>
  <li>Bột mì</li>
  <li>Trứng</li>
  <li>Sữa</li>
</ul>

<h2>Các bước</h2>
<ol>
  <li>Trộn bột và sữa.</li>
  <li>Thêm trứng.</li>
  <li>Nướng 20 phút.</li>
</ol>
```

- Mỗi mục phải nằm trong `li`; không đặt chữ thẳng dưới `ul`/`ol`.
- `ul` phù hợp nguyên liệu (thứ tự không quan trọng).
- `ol` phù hợp các bước (thứ tự quan trọng).

Giới thiệu nhanh `dl`:

```html
<dl>
  <dt>HTML</dt>
  <dd>Ngôn ngữ đánh dấu cấu trúc trang web.</dd>
</dl>
```

## Lỗi thường gặp

- Viết `<ul>Bột mì</ul>` thiếu `li` — trình duyệt có thể tự sửa, nhưng cấu trúc sai.
- Dùng `ol` khi thứ tự không quan trọng (hoặc ngược lại) — chọn loại list theo ý nghĩa.
- Đánh số tay trong `ul` (`1. …`) thay vì dùng `ol` — để trình duyệt lo việc đánh số.

## Thử ngay

Dùng sandbox bên dưới để tạo danh sách không thứ tự với hai mục. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
