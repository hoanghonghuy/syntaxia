---
id: css-01-syntax
track: css-basics
locale: vi
slug: css-syntax
title: Quy tắc CSS và stylesheet
order: 1
published: true
objectives:
  - Đọc một rule CSS: selector, khối declaration, property và value
  - Phân biệt stylesheet ngoài (external) với style trong thẻ style (internal)
  - Nhận biết dấu `;` và `:` trong declaration
exercise:
  mode: both
  starterHtml: |
    <p class="note">Hi</p>
  starter: |
    /* Style .note text */
    
  hints:
    - Selector class bắt đầu bằng dấu chấm.
    - "Đặt khai báo bên trong { }."
    - Dùng color để đổi màu chữ.
  solution: |
    .note { color: blue; }
  expected:
    type: cssIncludes
    needles:
      - .note
      - "{"
      - color
---

Một **rule** (quy tắc) CSS gồm selector rồi một khối `{ ... }` chứa các **declaration** (khai báo). Mỗi declaration là `property: value;` — hai chấm giữa tên và giá trị, chấm phẩy kết thúc.

Bạn có thể đặt CSS trong tệp `.css` riêng rồi gắn bằng `<link>` (external), hoặc viết trong `<style>` trong `<head>` (internal). Cả hai dùng cùng cú pháp rule.

| Phần | Vai trò | Ví dụ |
| --- | --- | --- |
| Selector | Chọn phần tử | `h1` |
| Declaration block | Khối `{ ... }` chứa style | `{ color: navy; }` |
| Declaration | Một cặp property + value | `color: navy;` |
| Stylesheet | Tập hợp các rule | tệp `styles.css` hoặc thẻ `<style>` |

## Ví dụ mẫu

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1>Vườn rau</h1>
</body>
```

```css
/* styles.css */
h1 {
  color: navy;
  font-size: 28px;
}
```

- `<link rel="stylesheet" href="styles.css" />` gắn stylesheet ngoài vào trang.
- `h1` là selector type: mọi tiêu đề cấp 1.
- `color: navy;` và `font-size: 28px;` là hai declaration trong cùng một rule.

Cùng cú pháp cũng chạy trong `<style>h1 { color: navy; }</style>` — chỉ khác chỗ đặt mã.

## Lỗi thường gặp

- Quên `{ }` quanh declaration — selector một mình không đổi gì trên trang.
- Viết `color = navy` thay vì `color: navy;` — CSS dùng `:` và thường kết thúc bằng `;`.
- Gắn sai đường dẫn `href` của `<link>` — stylesheet không tải thì style không áp dụng.

## Thử ngay

Dùng sandbox bên dưới để viết rule CSS cho .note. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
