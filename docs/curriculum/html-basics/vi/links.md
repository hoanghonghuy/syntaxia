---
id: html-05-links
track: html-basics
locale: vi
slug: links
title: Tạo liên kết
order: 5
published: true
can_do: "Tạo hyperlink thật với destination rõ ràng và link text có nghĩa, đồng thời chọn href absolute hoặc relative phù hợp"
objectives:
  - Tạo anchor có thuộc tính href thật
  - Phân biệt absolute URL, relative path và fragment
  - Viết link text vẫn có nghĩa khi tách khỏi đoạn văn xung quanh
exercise:
  mode: html
  starter: |
    <!-- TODO: thêm link có mô tả rõ tới https://example.com -->
  hints:
    - Hyperlink thật dùng phần tử a có thuộc tính href.
    - Bài này dùng full URL https://example.com.
    - Đặt text mô tả destination giữa <a ...> và </a>.
  solution: |
    <a href="https://example.com">Visit Example</a>
  expected:
    type: htmlTags
    tags:
      - tag: a
        minCount: 1
        requiredAttrs: [href]
---

Link vừa là nội dung vừa là cơ chế điều hướng. Phần tử `a` tạo link semantics; `href` xác định destination; link text nói cho người dùng biết destination đó là gì.

## Mô hình tư duy

```text
<a href="destination">nhãn có ý nghĩa</a>
         |                   |
     đích điều hướng       mục đích người dùng đọc
```

Absolute URL ghi đầy đủ địa chỉ web; relative path được resolve dựa trên site/document hiện tại; fragment trỏ tới một `id` trong cùng tài liệu.

## Dự đoán cấu trúc khi render

```html
<a href="/guides/forms">Hướng dẫn HTML form</a>
```

Trước khi preview, hãy dự đoán hai điều: đây là navigation có thể focus bằng bàn phím, và `/guides/forms` được resolve theo origin hiện tại. Nhãn link vẫn nên dễ hiểu khi screen reader liệt kê link riêng lẻ.

## Ví dụ mẫu

```html
<p>
  Đọc
  <a href="https://developer.mozilla.org/">MDN Web Docs</a>
  để tra cứu.
</p>
```

Phần tử `a` tạo vai trò link; `href` absolute trỏ sang site khác; text gọi tên destination thay vì chỉ ghi “bấm vào đây”.

## Tìm lỗi

```html
<a>Tài liệu</a>
```

Không có `href`, anchor này không phải hyperlink thông thường tới một destination. Không nên giả lập navigation chỉ bằng style; nếu đây là link thì cần destination thật.

## Lỗi thường gặp

- Dùng nhãn mơ hồ như “bấm vào đây” mà không nói destination.
- Nhầm relative path của site với absolute URL đầy đủ.
- Gắn text `href` lên sai element thay vì dùng anchor.

## Thử ngay

Tạo anchor có mô tả rõ tới `https://example.com`. Grader giờ parse HTML và yêu cầu `href` nằm trên một phần tử `a` thật.

## Tự kiểm tra

Khác nhau giữa `<a>Docs</a>` và `<a href="/docs">Docs</a>` là gì?

**Đáp án:** đoạn thứ hai là hyperlink có destination; đoạn đầu không có `href` để điều hướng.
