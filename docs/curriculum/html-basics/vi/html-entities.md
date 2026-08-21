---
id: html-11-entities
track: html-basics
locale: vi
slug: html-entities
title: Character reference và text helper
order: 11
published: true
can_do: "Biểu diễn ký tự dành riêng của markup an toàn trong text và phân biệt các helper như br, hr, abbr, time với cấu trúc paragraph thông thường"
objectives:
  - Dùng character reference khi ký tự literal trong source có thể bị hiểu như markup
  - Dùng br và hr đúng vai trò line break/thematic break
  - Nhận biết ý nghĩa machine-readable trong abbr và time
exercise:
  mode: html
  starter: |
    <!-- TODO: hiển thị AT&T trong paragraph bằng &amp; cho dấu ampersand -->
  hints:
    - Exercise kiểm tra HTML source chứ không chỉ text cuối cùng nhìn thấy.
    - Viết character reference cho ampersand là &amp;.
    - Đặt tên công ty trong p: AT&amp;T.
  solution: |
    <p>AT&amp;T</p>
  expected:
    type: htmlIncludes
    needles:
      - "&amp;"
---

HTML source dùng các ký tự như `<` và `&` như một phần cú pháp của chính nó. Khi cần các ký tự đó dưới dạng text literal, **character reference** làm ý định trở nên rõ ràng.

## Mô hình tư duy

```text
ký tự cú pháp source        cách biểu diễn text literal
<                            &lt;
>                            &gt;
&                            &amp;
```

Các text element nhỏ giải quyết vấn đề khác nhau: `br` là line break trong nội dung; `hr` là thematic break; `abbr` có thể chứa phần mở rộng; `time` ghép text dễ đọc với datetime cho máy.

## Dự đoán cấu trúc khi render

```html
<p>Viết <code>&lt;p&gt;</code> khi nói về paragraph tag.</p>
```

Hãy dự đoán đâu là text và đâu là markup: `code` là phần tử thật, còn `&lt;p&gt;` trở thành các ký tự `<p>` nhìn thấy được thay vì tạo paragraph khác.

## Ví dụ mẫu

```html
<p>Đường &amp; bột được cho vào trước.</p>
<p>Dòng một<br>Dòng hai</p>
<hr>
<p>Gặp nhau <time datetime="2026-08-21">21/08/2026</time>.</p>
```

Dùng paragraph thật cho các khối văn bản riêng; không xếp nhiều `br` chỉ để tạo khoảng cách hình thức.

## Tìm lỗi

```html
<p>Dùng <p> cho paragraph.</p>
```

`<p>` bên trong bị parse như markup chứ không hiển thị như text tài liệu. Dùng `&lt;p&gt;` khi chính dấu ngoặc góc là nội dung muốn hiển thị.

## Lỗi thường gặp

- Gõ cú pháp markup literal vào nội dung hướng dẫn rồi mong nó vẫn là text.
- Dùng nhiều `br` như một hệ thống tạo spacing cho layout.
- Xem `time` hoặc `abbr` chỉ như hook để style thay vì phần tử có ý nghĩa.

## Thử ngay

Hiển thị `AT&T` từ source dùng `&amp;`. Exercise cố ý kiểm tra dạng source đã encode.

## Tự kiểm tra

Tại sao trong tutorial nên viết `&lt;p&gt;` thay vì raw `<p>` khi muốn người đọc nhìn thấy chính ký tự của tag?

**Đáp án:** dấu ngoặc góc raw là cú pháp markup; character reference biến chúng thành text literal.
