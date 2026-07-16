---
id: css-11-lists-links
track: css-basics
locale: vi
slug: styling-lists-and-links
title: Style danh sách và liên kết
order: 11
published: true
objectives:
  - Đổi ký hiệu danh sách bằng list-style-type và list-style
  - Style liên kết trong và ngoài danh sách bằng class và pseudo-class
  - Bỏ gạch chân mặc định một cách có chủ đích
---

Danh sách (`ul` / `ol`) và liên kết (`a`) có kiểu mặc định của trình duyệt: dấu đầu dòng, số thứ tự, chữ xanh gạch chân. CSS chỉnh các mặc định đó cho khớp giao diện — vẫn giữ HTML đúng nghĩa.

| Property / selector | Vai trò đơn giản |
| --- | --- |
| `list-style-type` | Kiểu dấu: `disc`, `circle`, `square`, `decimal`, `none`… |
| `list-style` | Viết tắt cho kiểu danh sách |
| `a` / `a:hover` | Style liên kết và trạng thái hover |
| `text-decoration` | Gạch chân (`underline`) hoặc `none` |

## Ví dụ mẫu

```html
<nav>
  <ul class="menu">
    <li><a href="/sql">SQL</a></li>
    <li><a href="/css">CSS</a></li>
  </ul>
</nav>
```

```css
.menu {
  list-style-type: none;
  padding-left: 0;
}

.menu a {
  color: #0f766e;
  text-decoration: none;
}

.menu a:hover,
.menu a:focus {
  text-decoration: underline;
}
```

- `list-style-type: none` gỡ dấu đầu dòng của menu điều hướng.
- `padding-left: 0` bỏ thụt mặc định của danh sách.
- Liên kết màu teal, không gạch chân lúc bình thường; gạch chân khi `:hover` hoặc `:focus` để vẫn thấy là liên kết khi tương tác.

Menu điều hướng thường bỏ dấu đầu dòng; danh sách nội dung bài học có thể giữ `disc` / `decimal`.

## Lỗi thường gặp

- `list-style: none` nhưng quên chỉnh `padding` — danh sách vẫn thụt vào như mặc định trình duyệt.
- Bỏ hết `text-decoration` và không có dấu hiệu khác (màu, weight) — người học khó nhận ra đâu là liên kết.
- Style mọi `a` trên trang quá mạnh — giới hạn bằng class (`.menu a`) khi chỉ muốn đổi một vùng.

## Thử ngay

Nhìn ví dụ: nói rule nào gỡ dấu đầu dòng và rule nào hiện gạch chân khi focus. Rồi đánh dấu hoàn thành bài.
