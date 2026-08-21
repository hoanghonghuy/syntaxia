---
id: css-02-selectors
track: css-basics
locale: vi
slug: type-class-id-selectors
title: Type, class và ID selector
order: 2
published: true
can_do: "Chọn type, class hoặc ID selector theo phạm vi tái sử dụng mong muốn và dự đoán chính xác element nào được match"
objectives:
  - Dùng type selector cho default rộng theo loại element
  - Dùng class làm styling hook tái sử dụng
  - Nhận biết ID là identifier duy nhất với specificity cao
exercise:
  mode: both
  starterHtml: |
    <p class="note">Reusable note</p>
    <p id="hero">Unique hero copy</p>
  starter: |
    /* TODO: làm .note màu navy và #hero chữ đậm */
  hints:
    - Class dùng dấu chấm trong CSS; ID dùng dấu hash.
    - Viết riêng rule .note và #hero để mỗi target có một nhiệm vụ.
    - Dùng .note { color: navy; } và #hero { font-weight: bold; }.
  solution: |
    .note { color: navy; }
    #hero { font-weight: bold; }
  expected:
    type: cssRules
    rules:
      - selector: .note
        declarations:
          color: navy
      - selector: "#hero"
        declarations:
          font-weight: bold
---

Lựa chọn selector thể hiện **style nên match rộng tới đâu**.

## Mô hình tư duy

| Selector | Phạm vi match | Ý định thường gặp |
| --- | --- | --- |
| `p` | mọi element cùng type | default rộng |
| `.note` | mọi element mang class đó | component/state style tái sử dụng |
| `#hero` | element có id duy nhất đó | unique hook; hạn chế dùng cho styling |

Class thường là primitive dễ tái sử dụng nhất cho styling. ID còn tăng specificity mạnh nên rất dễ bị lạm dụng.

## Dự đoán kết quả hiển thị

Với hai paragraph, chỉ paragraph đầu có class `note`, chỉ paragraph sau có id `hero`: hãy dự đoán `.note` và `#hero` match hai element khác nhau. Dấu chấm/hash thuộc cú pháp selector CSS, không nằm trong value attribute HTML.

## Ví dụ mẫu

```css
p { line-height: 1.5; }
.note { color: navy; }
#hero { font-weight: bold; }
```

Một element có thể match nhiều rule. Khi declaration xung đột, cascade sẽ quyết định winner ở bài sau.

## Tìm lỗi

```html
<p class=".note">Hello</p>
```

```css
.note { color: navy; }
```

Class value thực tế là `.note`, nên class `note` dự kiến không tồn tại. Dấu chấm/hash là selector syntax, không phải một phần của tên class/id thông thường trong HTML.

## Lỗi thường gặp

- Tái sử dụng cùng một ID trên nhiều element.
- Đặt `.` hoặc `#` vào value class/id trong HTML.
- Chọn ID khi styling intent phù hợp hơn với class tái sử dụng.

## Thử ngay

Style class tái sử dụng và ID duy nhất bằng hai rule riêng.

## Tự kiểm tra

Selector nào thường phù hợp hơn cho card style được dùng lại 20 lần?

**Đáp án:** class selector.
