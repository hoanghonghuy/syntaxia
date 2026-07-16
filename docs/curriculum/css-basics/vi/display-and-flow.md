---
id: css-10-display
track: css-basics
locale: vi
slug: display-and-flow
title: Display và luồng
order: 10
published: true
objectives:
  - Phân biệt block và inline trong luồng bình thường
  - Dùng inline-block khi cần vừa xếp ngang vừa đặt width
  - Ẩn phần tử bằng display: none
exercise:
  mode: both
  starterHtml: |
    <span class="box">A</span>
  starter: |
    /* Change how .box flows in the line */
    
  hints:
    - display thay đổi cách bố cục.
    - inline-block giữ phần tử trên dòng nhưng cho phép kích thước hộp.
    - "Viết display: inline-block; trong rule."
  solution: |
    .box { display: inline-block; }
  expected:
    type: cssIncludes
    needles:
      - display
---

Trình duyệt xếp phần tử theo **normal flow** (luồng bình thường). Property `display` quyết định hộp tham gia luồng thế nào: chiếm cả hàng (**block**), nằm trong dòng chữ (**inline**), kết hợp (**inline-block**), hoặc không hiện (**none**).

| Giá trị `display` | Hành vi đơn giản |
| --- | --- |
| `block` | Bắt đầu trên hàng mới; có thể đặt `width` / `height` |
| `inline` | Nằm trong dòng; `width` / `height` thường không áp như block |
| `inline-block` | Nằm trong dòng nhưng vẫn nhận `width` / `height` / padding đầy đủ hơn |
| `none` | Không hiện và không chiếm chỗ |

Thẻ như `p`, `div`, `h1` mặc định thường là block; `a`, `span`, `strong` thường là inline.

## Ví dụ mẫu

```html
<p>Đọc <a class="chip" href="#next">bài tiếp</a> ngay.</p>
<p class="aside">Ghi chú phụ.</p>
<p class="hidden-label">Chỉ dành cho máy.</p>
```

```css
.chip {
  display: inline-block;
  padding: 4px 8px;
  background-color: #ecfdf5;
}

.aside {
  display: block;
  width: 60%;
}

.hidden-label {
  display: none;
}
```

- `.chip` là liên kết dạng “mảnh” trong câu nhưng có padding và nền nhờ `inline-block`.
- `.aside` là block với chiều ngang 60%.
- `.hidden-label` biến mất khỏi trang (`none`) — khác với chỉ trong suốt nhưng vẫn chiếm chỗ.

Đổi `display` không xóa HTML; chỉ đổi cách vẽ và xếp chỗ.

## Lỗi thường gặp

- Đặt `width` lớn trên phần tử `inline` thuần rồi ngạc nhiên vì không đổi — cần `block` hoặc `inline-block`.
- Dùng `display: none` khi chỉ muốn tạm ẩn mắt nhưng vẫn để trình đọc màn hình đọc — `none` gỡ khỏi hộp và thường khỏi cây truy cập; cần thận trọng.
- Nhầm `inline-block` với Flexbox — flex dành cho hàng/cột kiểm soát hơn (bài cuối lộ trình).

## Thử ngay

Dùng sandbox bên dưới để đặt display cho .box. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
