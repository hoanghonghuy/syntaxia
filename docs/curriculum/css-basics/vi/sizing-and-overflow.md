---
id: css-12-sizing
track: css-basics
locale: vi
slug: sizing-and-overflow
title: Constraint và overflow
order: 12
published: true
can_do: "Giới hạn box bằng maximum dimension và chọn overflow behavior thay vì vô tình giấu content khi nó vượt không gian có sẵn"
objectives:
  - Phân biệt preferred size với min/max constraint
  - Dự đoán khi content vượt box constraint
  - Dùng overflow auto để scroll chỉ khi cần
exercise:
  mode: both
  starterHtml: |
    <div class="panel">A long block of content that can exceed a compact panel when space is constrained.</div>
  starter: |
    /* TODO: giới hạn panel 12rem rộng và 4rem cao, chỉ scroll khi cần */
  hints:
    - max-width và max-height đặt ceiling chứ không ép fixed size trong mọi trường hợp.
    - overflow: auto tạo khả năng scroll khi content thực sự overflow.
    - Dùng max-width: 12rem; max-height: 4rem; overflow: auto;.
  solution: |
    .panel { max-width: 12rem; max-height: 4rem; overflow: auto; }
  expected:
    type: cssRules
    rules:
      - selector: .panel
        declarations:
          max-width: 12rem
          max-height: 4rem
          overflow: auto
---

Content và available space đều có thể thay đổi. Sizing constraint mô tả boundary; overflow mô tả điều xảy ra khi content vượt boundary đó.

## Mô hình tư duy

```text
intrinsic size của content
       ↓
min / preferred / max constraints
       ↓
fit? -> paint bình thường
không -> overflow policy
```

`overflow: auto` khác `scroll`: scrollbar xuất hiện khi overflow thực sự cần thay vì luôn dành chỗ.

## Dự đoán kết quả hiển thị

Panel có ít content có thể nhỏ hơn maximum dimension. Khi content vượt height ceiling, `overflow: auto` giúp người dùng tiếp cận phần vượt qua scrolling thay vì clip im lặng.

## Ví dụ mẫu

```css
.panel {
  max-width: 12rem;
  max-height: 4rem;
  overflow: auto;
}
```

Ưu tiên constraint khi design goal là “không được vượt quá mức này” thay vì “luôn luôn đúng fixed size này”.

## Tìm lỗi

```css
.panel { height: 4rem; overflow: hidden; }
```

Đoạn này ép height và clip phần vượt. Nếu người dùng vẫn phải đọc được variable text thì đây gần giống một presentation bug làm mất dữ liệu.

## Lỗi thường gặp

- Nhầm `max-width` với fixed width bắt buộc.
- Dùng `overflow: hidden` để che layout problem mà không kiểm tra content bị mất.
- Quên overflow có thể xảy ra độc lập theo trục ngang và dọc.

## Thử ngay

Áp dụng cả maximum constraint lẫn conditional scrolling.

## Tự kiểm tra

Khi nào `overflow: auto` phù hợp hơn `hidden` với text content?

**Đáp án:** khi phần content vượt vẫn cần truy cập được thay vì bị cắt mất.
