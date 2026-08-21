---
id: css-00-intro
track: css-basics
locale: vi
slug: what-is-css
title: CSS là các rule áp dụng lên HTML
order: 0
published: true
can_do: "Theo dõi một CSS rule từ selector match tới declaration và dự đoán element HTML hiện có nào thay đổi presentation"
objectives:
  - Tách HTML semantics khỏi CSS presentation
  - Đọc selector, property và value như một styling rule hoàn chỉnh
  - Dự đoán visual effect chỉ trên các element match selector
exercise:
  mode: both
  starterHtml: |
    <h1>Welcome</h1>
    <p>Start here.</p>
  starter: |
    /* TODO: chỉ làm text của h1 thành màu teal */
  hints:
    - Target là h1 nên dùng type selector h1.
    - Property đổi màu chữ là color.
    - Dùng: h1 { color: teal; }
  solution: |
    h1 { color: teal; }
  expected:
    type: cssRules
    rules:
      - selector: h1
        declarations:
          color: teal
---

CSS không tạo cấu trúc trang; nó gắn các rule trình bày lên HTML đã tồn tại.

## Mô hình tư duy

```text
HTML element -> selector match? -> declarations -> style khi render
```

Với `h1 { color: teal; }`, trình duyệt trước tiên tìm các phần tử `h1` match selector, rồi áp dụng declaration `color`. Paragraph đứng cạnh không tự đổi màu.

## Dự đoán kết quả hiển thị

```html
<h1>Welcome</h1>
<p>Start here.</p>
```

```css
h1 { color: teal; }
```

Trước khi preview, hãy dự đoán: text của heading thành teal; paragraph giữ màu hiện tại.

## Ví dụ mẫu

```css
h1 {
  color: teal;
  font-size: 2rem;
}
```

Một rule gồm **selector + declarations**. Mỗi declaration có dạng **property: value**. HTML vẫn giữ heading semantics dù design thay đổi hoàn toàn.

## Tìm lỗi

```css
p { color: teal; }
```

Syntax hợp lệ nhưng target sai element so với yêu cầu đổi màu heading. Khi debug CSS cần hỏi cả “declaration có đúng không?” và “selector có match đúng element không?”.

## Lỗi thường gặp

- Mong CSS tự tạo nội dung HTML chưa tồn tại.
- Chỉ kiểm tra property mà bỏ qua selector nhận property đó.
- Nhầm thay đổi appearance với thay đổi semantics.

## Thử ngay

Chỉ làm `h1` hiện có thành teal. Grader giờ yêu cầu `color: teal` nằm trên rule `h1` thật.

## Tự kiểm tra

Nếu HTML không có `h1`, rule `h1 { color: teal; }` làm thay đổi gì nhìn thấy được?

**Đáp án:** không có gì; selector không match element nào.
