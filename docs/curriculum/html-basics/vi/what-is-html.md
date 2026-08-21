---
id: html-00-intro
track: html-basics
locale: vi
slug: what-is-html
title: HTML là gì?
order: 0
published: true
can_do: "Đọc một đoạn HTML ngắn theo phần tử, thuộc tính và nội dung có ý nghĩa thay vì chỉ nhìn hình thức hiển thị"
objectives:
  - Giải thích HTML là lớp cấu trúc và ngữ nghĩa của tài liệu
  - Phân biệt element, tag, attribute và text content
  - Dự đoán cấu trúc cơ bản mà trình duyệt nhận được từ một đoạn HTML
exercise:
  mode: html
  starter: |
    <!-- TODO: thêm một đoạn văn giải thích HTML làm gì -->
  hints:
    - Dùng phần tử p vì nội dung cần tạo là một đoạn văn.
    - Đặt câu văn giữa thẻ mở <p> và thẻ đóng </p>.
    - Mẫu hợp lệ là: <p>Nội dung của bạn.</p>
  solution: |
    <p>HTML describes the meaning and structure of content.</p>
  expected:
    type: htmlTags
    tags:
      - tag: p
        minCount: 1
---

HTML là lớp mô tả **ý nghĩa và cấu trúc** của nội dung web. Trước khi nghĩ đến màu sắc hay hành vi khi bấm, cần học cách đọc source như một cây phần tử mà trình duyệt có thể hiểu.

## Mô hình tư duy

Hãy nghĩ theo chuỗi **source -> phần tử -> cấu trúc tài liệu -> ý nghĩa với trình duyệt/công cụ hỗ trợ**.

```html
<p class="note">Đọc cấu trúc trước.</p>
```

Đoạn này có một phần tử `p`. Thẻ mở chứa thuộc tính `class`; câu chữ là nội dung; thẻ đóng kết thúc phần tử.

| Thành phần | Trong ví dụ | Vai trò |
| --- | --- | --- |
| element | toàn bộ `<p>...</p>` | gán vai trò đoạn văn |
| tag | `<p>` / `</p>` | đánh dấu biên của phần tử |
| attribute | `class="note"` | thêm thông tin trên thẻ mở |
| text | `Đọc cấu trúc trước.` | nội dung nằm bên trong |

## Dự đoán cấu trúc khi render

Trước khi xem preview của đoạn sau:

```html
<p>Xin chào <strong>web</strong>.</p>
```

hãy dự đoán cây: một paragraph chứa text, một phần tử con `strong`, rồi thêm text. Trình duyệt thường hiển thị `strong` đậm, nhưng ý nghĩa chính là mức độ quan trọng.

## Ví dụ mẫu

```html
<p class="note">HTML đánh dấu ý nghĩa.</p>
```

Tên phần tử quyết định vai trò ngữ nghĩa. `class` không biến paragraph thành loại nội dung khác; nó chỉ là metadata để CSS hoặc JavaScript dùng sau này.

## Tìm lỗi

```html
<p href="/docs">Tài liệu</p>
```

Đây vẫn là paragraph, không phải link. Gắn một thuộc tính dành cho link lên sai phần tử không tạo ra ngữ nghĩa liên kết. Cần dùng đúng phần tử: `<a href="/docs">Tài liệu</a>`.

## Lỗi thường gặp

- Nghĩ HTML là ngôn ngữ lập trình chạy logic nghiệp vụ.
- Chọn phần tử chỉ vì hình thức mặc định thay vì ý nghĩa của nội dung.
- Nghĩ rằng thêm một attribute bất kỳ có thể tạo hành vi trên mọi tag.

## Thử ngay

Thêm một paragraph thật trong sandbox. Chọn `p` vì nội dung là văn bản dạng đoạn, không phải vì kiểu hiển thị mặc định.

## Tự kiểm tra

Điều gì quyết định nội dung là paragraph: `class`, câu chữ hay tên phần tử?

**Đáp án:** phần tử `p` tạo ngữ nghĩa đoạn văn.
