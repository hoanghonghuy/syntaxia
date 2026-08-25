---
id: css-13-flexbox
track: css-basics
locale: vi
slug: flexbox-basics
title: Flexbox như hệ layout một chiều
order: 13
published: true
can_do: "Biến container thành flex formatting context và suy luận main-axis distribution, cross-axis alignment và gap trong một toolbar tích hợp"
objectives:
  - Xác định flex container và direct flex item
  - Phân biệt main axis với cross axis
  - Kết hợp gap, justify-content và align-items có chủ đích
exercise:
  mode: both
  starterHtml: |
    <div class="toolbar"><span>Menu</span><button>Save</button><button>Publish</button></div>
  starter: |
    /* TODO: biến .toolbar thành flex row có gap 1rem, phân bố space-between và center theo cross axis */
  hints:
    - Flex property nằm trên container; direct child trở thành flex item.
    - Với row mặc định, main axis nằm ngang và cross axis nằm dọc.
    - Dùng display: flex; gap: 1rem; justify-content: space-between; align-items: center;.
  solution: |
    .toolbar {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;
    }
  expected:
    type: cssRules
    rules:
      - selector: .toolbar
        declarations:
          display: flex
          gap: 1rem
          justify-content: space-between
          align-items: center
---

Flexbox là layout model **một chiều**: nó reasoning chủ yếu theo main axis và alignment theo cross axis vuông góc.

## Mô hình tư duy

```text
flex container
main axis  ------------------>
items:        A      B      C
cross axis             ↓
```

`display: flex` tạo flex formatting context trên container. Direct child của nó trở thành flex item.

## Dự đoán kết quả hiển thị

Với `flex-direction: row` mặc định, `justify-content` tác động theo chiều ngang và `align-items` theo chiều dọc. Nếu direction đổi thành column, vai trò trục cũng xoay theo.

## Ví dụ mẫu

```css
.toolbar {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
```

`gap` tạo khoảng cách giữa item mà không biến outer margin thành trách nhiệm mặc định của từng component.

## Tìm lỗi

```css
.toolbar button {
  display: flex;
  justify-content: space-between;
}
```

Đoạn này tạo flex formatting bên trong từng button, không phải giữa các direct child của toolbar. Layout property cần đặt trên container mà bạn muốn sắp xếp children.

## Lỗi thường gặp

- Đặt container alignment property lên item.
- Học thuộc “justify = ngang” thay vì bám theo main axis hiện tại.
- Dùng flexbox như thể nó là hệ layout grid hai chiều.

## Thử ngay

Hoàn thiện toolbar rule với đủ bốn declaration và dự đoán cả hai axis trước khi preview.

## Tự kiểm tra

Nếu `flex-direction` đổi thành `column`, `justify-content` còn là control căn ngang không?

**Đáp án:** không. Nó đi theo main axis, lúc này là chiều dọc.
