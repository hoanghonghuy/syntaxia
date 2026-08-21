---
id: css-05-cascade
track: css-basics
locale: vi
slug: cascade-and-specificity
title: Giải quyết xung đột bằng cascade
order: 5
published: true
can_do: "Dự đoán declaration thắng khi type, class, inheritance và source order cạnh tranh mà không lạm dụng !important"
objectives:
  - So sánh selector specificity ở mức nền tảng an toàn
  - Chỉ dùng source order sau khi specificity bằng nhau
  - Phân biệt property được inherit với box property không inherit
exercise:
  mode: both
  starterHtml: |
    <p class="note">Which color wins?</p>
  starter: |
    /* TODO: giữ type rule màu black, rồi để class rule thắng với purple */
  hints:
    - Cả hai selector đều match paragraph, nhưng class selector specific hơn type selector.
    - Viết riêng broad rule p và narrow rule .note.
    - Dùng p { color: black; } và .note { color: purple; }.
  solution: |
    p { color: black; }
    .note { color: purple; }
  expected:
    type: cssRules
    rules:
      - selector: p
        declarations:
          color: black
      - selector: .note
        declarations:
          color: purple
---

Cascade là thuật toán giải quyết các declaration cạnh tranh. Specificity là một input của thuật toán, không phải toàn bộ thuật toán.

## Mô hình tư duy

Với author style cơ bản có cùng importance:

```text
match rules -> so specificity -> nếu bằng nhau thì source order sau thắng -> inherit khi phù hợp
```

Thứ tự gần đúng cho track này là ID > class/pseudo-class > type. Specificity thật được tính từ các thành phần selector chứ không phải một “điểm sức mạnh” chung chung.

## Dự đoán kết quả hiển thị

```css
p { color: black; }
.note { color: purple; }
```

Với `<p class="note">...</p>`, hãy dự đoán purple. Cả hai rule match nhưng class selector specific hơn. Đảo source order cũng không khiến rule `p` ít specific thắng.

## Ví dụ mẫu

```css
body { color: #333; }
p { color: black; }
.note { color: purple; }
```

`color` có thể inherit từ body, nhưng declaration match trực tiếp paragraph thắng inherited value. Class tiếp tục thắng type rule bằng specificity.

## Tìm lỗi

```css
.note { color: purple !important; }
```

`!important` có thể thay đổi cascade priority, nhưng dùng nó để né việc hiểu conflict khiến override về sau khó hơn. Trước hết hãy kiểm tra match, specificity, inheritance và source order.

## Lỗi thường gặp

- Nghĩ “rule ở cuối luôn thắng” dù specificity khác nhau.
- Nghĩ margin/padding inherit giống text color.
- Tăng mọi conflict bằng ID hoặc `!important`.

## Thử ngay

Viết cả hai rule match cùng element và dự đoán purple trước khi mở preview.

## Tự kiểm tra

Nếu `.note` đứng trước `p` trong cùng author stylesheet, màu nào thắng ở ví dụ này?

**Đáp án:** `.note` vẫn thắng vì selector specific hơn.
