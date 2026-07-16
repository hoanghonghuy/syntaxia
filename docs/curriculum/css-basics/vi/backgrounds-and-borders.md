---
id: css-09-backgrounds
track: css-basics
locale: vi
slug: backgrounds-and-borders
title: Nền và viền
order: 9
published: true
objectives:
  - Đặt background-color và hiểu background-image ở mức giới thiệu
  - Viết border theo độ dày, kiểu và màu
  - Bo góc bằng border-radius
exercise:
  mode: both
  starterHtml: |
    <div class="card">Card</div>
  starter: |
    /* Style .card background and corners */
    
  hints:
    - background tô nền phía sau nội dung.
    - border-radius bo góc.
    - "Màu hex như #eef dùng được cho background."
  solution: |
    .card { background: #eef; border-radius: 8px; }
  expected:
    type: cssIncludes
    needles:
      - border-radius
      - background
---

**Nền** (background) tô phía sau nội dung; **viền** (border) vẽ cạnh hộp. Cùng với `border-radius`, bạn có thể tạo khối nổi bật đơn giản mà chưa cần ảnh phức tạp.

| Property | Vai trò đơn giản |
| --- | --- |
| `background-color` | Màu nền |
| `background-image` | Ảnh hoặc gradient làm nền (giới thiệu) |
| `border` | Viết tắt: độ dày + kiểu + màu |
| `border-radius` | Bo góc hộp |

## Ví dụ mẫu

```html
<section class="panel">
  <p>Thông báo ngắn.</p>
</section>
```

```css
.panel {
  background-color: #ecfdf5;
  border: 1px solid #0f766e;
  border-radius: 8px;
  padding: 16px;
}

.panel.hero {
  background-image: url("leaf.png");
  background-color: #064e3b;
  color: white;
}
```

- `.panel` có nền mint nhạt, viền 1px liền màu teal, góc bo 8px.
- `padding` giữ chữ không dính sát viền (nhắc lại box model).
- `.panel.hero` thêm ảnh nền; `background-color` vẫn hữu ích khi ảnh chậm tải hoặc lỗi.

`border: 1px solid #0f766e` gồm ba phần: độ dày (`1px`), kiểu (`solid`), màu.

## Lỗi thường gặp

- Đặt chữ màu sáng trên nền sáng — kiểm tra độ tương phản để đọc được.
- Chỉ dùng `border-radius` mà quên `border` hoặc nền — bo góc vẫn thấy rõ hơn khi có nền/viền.
- Đường dẫn `url("...")` sai — ảnh nền không hiện; màu nền dự phòng vẫn nên có.

## Thử ngay

Dùng sandbox bên dưới để thêm background và border-radius cho .card. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
