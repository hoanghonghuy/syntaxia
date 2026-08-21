---
id: css-08-text
track: css-basics
locale: vi
slug: text-and-fonts
title: Typography dễ đọc
order: 8
published: true
can_do: "Tạo font fallback stack và line-height dễ đọc, đồng thời phân biệt typography được inherit với box layout property"
objectives:
  - Viết font-family fallback stack
  - Dùng unitless line-height cho body text dễ đọc
  - Nhận biết các text property thường được inherit
exercise:
  mode: both
  starterHtml: |
    <article class="copy"><p>Long-form reading should stay comfortable.</p></article>
  starter: |
    /* TODO: đặt stack Georgia/serif và line-height 1.6 cho .copy */
  hints:
    - Font stack liệt kê candidate từ ưu tiên tới fallback.
    - Đặt generic family serif ở cuối.
    - Dùng .copy { font-family: Georgia, serif; line-height: 1.6; }.
  solution: |
    .copy { font-family: Georgia, serif; line-height: 1.6; }
  expected:
    type: cssRules
    rules:
      - selector: .copy
        declarations:
          font-family: Georgia, serif
          line-height: "1.6"
---

Typography ảnh hưởng tới cách text được đọc chứ không chỉ hình thức. Font stack cung cấp fallback; line height điều khiển vertical rhythm.

## Mô hình tư duy

```text
font-family: font ưu tiên -> fallback tiếp theo -> generic family
line-height: khoảng cách giữa các line box
```

Các property như `font-family`, `font-size`, `color` thường inherit xuống descendant; box property như margin mặc định không inherit.

## Dự đoán kết quả hiển thị

Nếu Georgia không có, `Georgia, serif` fallback sang serif family của trình duyệt. `line-height: 1.6` không có unit sẽ scale theo font size của element.

## Ví dụ mẫu

```css
.copy {
  font-family: Georgia, serif;
  line-height: 1.6;
}
```

Paragraph con có thể inherit các text setting này từ article mà không cần lặp declaration.

## Tìm lỗi

```css
.copy { font-family: Georgia serif; }
```

Các candidate của font-family là danh sách tách bằng comma. Thiếu comma làm value không còn là fallback stack hai bước dự kiến.

## Lỗi thường gặp

- Không có generic fallback family.
- Dùng line height quá sít cho văn bản dài.
- Lặp inherited typography trên mọi descendant không cần thiết.

## Thử ngay

Đặt fallback stack và line height trên parent `.copy`, rồi quan sát paragraph inherit chúng.

## Tự kiểm tra

Tại sao đặt `serif` ở cuối `Georgia, serif`?

**Đáp án:** đó là generic fallback khi font ưu tiên không có.
