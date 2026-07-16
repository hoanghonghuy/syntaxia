---
id: html-09-forms
track: html-basics
locale: vi
slug: forms-basics
title: Form và nhãn
order: 9
published: true
objectives:
  - Tạo form với form, input và button
  - Ghép label với input bằng for và id
  - Giải thích vì sao nhãn rõ ràng giúp mọi người điền form
---

Form (biểu mẫu) thu thập thông tin: tên, email, tìm kiếm… HTML dùng `form` bao các điều khiển; `label` gắn chữ hướng dẫn với ô nhập.

| Thẻ / thuộc tính | Vai trò |
| --- | --- |
| `form` | Bao nhóm trường gửi đi |
| `label` | Nhãn chữ cho một điều khiển |
| `input` | Ô nhập (một dòng) |
| `button` | Nút bấm (ví dụ Gửi) |
| `for` + `id` | Nối label với input |

## Ví dụ mẫu

```html
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />
  <button type="submit">Đăng ký</button>
</form>
```

- `action` là địa chỉ nhận dữ liệu khi gửi; `method="post"` là cách gửi phổ biến cho dữ liệu form.
- `label for="email"` khớp `id="email"` trên `input` — bấm vào chữ “Email” cũng focus vào ô.
- `name="email"` là tên trường khi gửi lên máy chủ.
- `type="email"` gợi ý bàn phím / kiểm tra định dạng cơ bản trên nhiều trình duyệt.
- `button type="submit"` gửi form.

## Lỗi thường gặp

- Chỉ viết chữ cạnh ô mà không dùng `label` — khó bấm trên mobile và kém tiếp cận.
- `for` và `id` không khớp (`for="mail"` nhưng `id="email"`) — nhãn không gắn với ô.
- Quên `name` trên input khi cần gửi dữ liệu — máy chủ không nhận được giá trị trường đó.

## Thử ngay

Trong ví dụ, chỉ ra cặp `for`/`id`, vai trò của `name`, và nút nào gửi form. Rồi đánh dấu hoàn thành bài.
