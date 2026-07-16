---
id: css-13-flexbox
track: css-basics
locale: vi
slug: flexbox-basics
title: Flexbox cơ bản
order: 13
published: true
objectives:
  - Bật Flexbox bằng display: flex trên phần tử cha
  - Đổi hướng hàng/cột bằng flex-direction và khoảng cách bằng gap
  - Căn item bằng justify-content và align-items ở mức giới thiệu
exercise:
  mode: both
  starterHtml: |
    <div class="row"><span>A</span><span>B</span></div>
  starter: |
    /* Lay out .row with flex */
    
  hints:
    - "display: flex bật bố cục flex."
    - gap thêm khoảng cách giữa các item.
    - Áp dụng cả hai lên container .row.
  solution: |
    .row { display: flex; gap: 1rem; }
  expected:
    type: cssIncludes
    needles:
      - "display: flex"
      - gap
---

**Flexbox** là mô hình bố cục một chiều: xếp các phần tử con thành hàng hoặc cột, rồi căn và phân khoảng cách một cách có kiểm soát. Bạn đặt `display: flex` trên **container** (cha); các **flex item** (con trực tiếp) tuân theo quy tắc flex.

| Property (trên cha) | Vai trò đơn giản |
| --- | --- |
| `display: flex` | Bật ngữ cảnh flex |
| `flex-direction` | `row` (hàng) hoặc `column` (cột) |
| `gap` | Khoảng cách giữa các item |
| `justify-content` | Căn theo trục chính (dọc theo direction) |
| `align-items` | Căn theo trục phụ |

## Ví dụ mẫu

```html
<div class="toolbar">
  <button type="button">Lưu</button>
  <button type="button">Hủy</button>
  <button type="button">Xóa</button>
</div>
```

```css
.toolbar {
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
}
```

- `display: flex` biến `.toolbar` thành flex container; các `button` là flex item.
- `flex-direction: row` xếp nút theo hàng ngang (thường là mặc định).
- `gap: 12px` tạo khoảng đều giữa các nút — không cần margin thủ công trên từng nút.
- `justify-content: flex-start` dồn item về đầu trục chính; `align-items: center` căn giữa theo chiều cao.

Thử `justify-content: space-between` để đẩy item ra hai đầu khi thanh công cụ rộng.

## Lỗi thường gặp

- Đặt `display: flex` trên từng nút thay vì trên cha — flex điều khiển *con trực tiếp* của container.
- Nhầm `justify-content` với `align-items` — một cái theo trục chính (direction), một cái theo trục phụ.
- Dùng Flexbox cho mọi thứ khi chỉ cần một `margin` — với vài khối đơn giản, luồng block đôi khi đủ.

## Thử ngay

Dùng sandbox bên dưới để bố cục .row bằng flexbox. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
