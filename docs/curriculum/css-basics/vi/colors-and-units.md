---
id: css-07-units
track: css-basics
locale: vi
slug: colors-and-units
title: Màu và đơn vị
order: 7
published: true
objectives:
  - Đặt màu bằng tên, hex và rgb() cơ bản
  - Phân biệt px, em, rem và %
  - Chọn đơn vị phù hợp cho chữ và khoảng cách đơn giản
---

CSS cần **giá trị** có đơn vị rõ ràng cho kích thước, và nhiều cách ghi **màu**. Bắt đầu với vài dạng đủ dùng hàng ngày; không cần thuộc hết mọi hàm màu.

| Chủ đề | Ví dụ | Ý nghĩa đơn giản |
| --- | --- | --- |
| Tên màu | `teal`, `navy` | Tên có sẵn |
| Hex | `#008080` | Mã màu dạng `#RRGGBB` |
| `rgb()` | `rgb(0, 128, 128)` | Đỏ–lục–lam (0–255) |
| `px` | `16px` | Pixel CSS (cố định tương đối màn hình) |
| `em` | `1.25em` | Theo `font-size` của phần tử |
| `rem` | `1rem` | Theo `font-size` gốc của trang (thường `html`) |
| `%` | `50%` | Theo phần trăm của phần tử tham chiếu (thường là cha) |

## Ví dụ mẫu

```html
<p class="lead">Đoạn mở đầu.</p>
```

```css
.lead {
  color: #0f766e;
  background-color: rgb(240, 253, 250);
  font-size: 1.25rem;
  width: 80%;
  padding: 12px;
}
```

- `#0f766e` là màu chữ (hex).
- `rgb(240, 253, 250)` tô nền nhạt.
- `1.25rem` làm chữ lớn hơn cỡ gốc một chút — dễ chỉnh toàn trang bằng cách đổi font gốc.
- `width: 80%` chiếm 80% chiều ngang của khối cha.
- `12px` là padding cố định theo pixel.

Với chữ trên trang học, nhiều người ưu tiên `rem` cho `font-size` và `px` hoặc `rem` cho khoảng nhỏ.

## Lỗi thường gặp

- Viết `font-size: 16` không có đơn vị — hầu hết độ dài cần `px` / `em` / `rem` (trừ `0` và vài trường hợp đặc biệt).
- Nhầm `em` với `rem` — `em` theo phần tử (và có thể chồng chéo khi lồng nhau); `rem` neo vào gốc trang.
- Dùng `%` cho mọi thứ — `%` phụ thuộc “của cái gì”; với chiều cao đôi khi không như mong đợi nếu cha chưa có chiều cao rõ.

## Thử ngay

Với ví dụ mẫu, chỉ ra đâu là màu hex, đâu là `rem`, đâu là `%`. Rồi đánh dấu hoàn thành bài.
