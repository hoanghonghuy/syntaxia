---
id: css-12-sizing
track: css-basics
locale: vi
slug: sizing-and-overflow
title: Kích thước và overflow
order: 12
published: true
objectives:
  - Đặt width, height và giới hạn min/max
  - Giải thích overflow khi nội dung lớn hơn hộp
  - Chọn visible, hidden hoặc auto/scroll ở mức cơ bản
---

Đôi khi bạn cần kiểm soát **kích thước** hộp: rộng bao nhiêu, cao tối thiểu bao nhiêu. Khi nội dung *nhiều hơn* chỗ chứa, **overflow** quyết định phần tràn bị cắt, cuộn, hay vẫn tràn ra ngoài.

| Property | Vai trò đơn giản |
| --- | --- |
| `width` / `height` | Chiều ngang / chiều cao mong muốn |
| `min-width` / `max-width` | Sàn và trần chiều ngang |
| `min-height` / `max-height` | Sàn và trần chiều cao |
| `overflow` | Xử lý nội dung tràn: `visible`, `hidden`, `auto`, `scroll` |

## Ví dụ mẫu

```html
<div class="preview">
  <p>Đoạn văn khá dài sẽ nằm trong hộp có chiều cao giới hạn. Nếu chữ vượt quá, hộp cho phép cuộn.</p>
</div>
```

```css
.preview {
  width: 100%;
  max-width: 320px;
  max-height: 80px;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 8px;
  box-sizing: border-box;
}
```

- `width: 100%` co giãn theo cha, nhưng `max-width: 320px` không để hộp quá rộng.
- `max-height: 80px` giới hạn chiều cao.
- `overflow: auto` hiện thanh cuộn *khi cần* — khác `scroll` (thường luôn chừa chỗ cuộn) và `hidden` (cắt, không cuộn).

`overflow: visible` (mặc định) cho phép nội dung tràn ra ngoài biên hộp.

## Lỗi thường gặp

- Chỉ đặt `height` cố định rồi chữ bị cắt mà không nghĩ `overflow` — thêm `auto` hoặc nới `max-height`.
- Dùng `overflow: hidden` để “dọn layout” mà cắt mất nội dung quan trọng.
- Quên `box-sizing: border-box` khi có `padding` + `width: 100%` — hộp dễ tràn khỏi cha.

## Thử ngay

Với `.preview`, nói điều gì xảy ra nếu chữ dài hơn 80px chiều cao. Rồi đánh dấu hoàn thành bài.
