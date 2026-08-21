---
id: html-03-emphasis
track: html-basics
locale: vi
slug: emphasis-and-importance
title: Nhấn mạnh và mức độ quan trọng
order: 3
published: true
can_do: "Chọn em cho trọng âm theo ngữ cảnh và strong cho nội dung quan trọng thay vì chọn phần tử chỉ vì kiểu nghiêng hoặc đậm"
objectives:
  - Phân biệt emphasis theo ngữ cảnh với strong importance
  - Giữ text-level semantics bên trong nội dung văn bản bình thường
  - Không dùng emphasis element thay cho heading cấu trúc
exercise:
  mode: html
  starter: |
    <!-- TODO: tạo một paragraph có một cụm em và một cụm strong -->
  hints:
    - Dùng em cho từ mà cách nhấn làm thay đổi cách hiểu câu.
    - Dùng strong cho thông tin đặc biệt quan trọng hoặc khẩn cấp.
    - Đặt cả hai phần tử bên trong một p.
  solution: |
    <p>Submit <em>before</em> midnight. <strong>Do not miss the deadline.</strong></p>
  expected:
    type: htmlTags
    tags:
      - tag: p
        minCount: 1
      - tag: em
        minCount: 1
      - tag: strong
        minCount: 1
---

Ngữ nghĩa của text có thể thay đổi mà không thay đổi outline tài liệu. `em` diễn tả trọng âm theo ngữ cảnh; `strong` diễn tả mức độ quan trọng cao. Kiểu nghiêng/đậm mặc định chỉ là presentation.

## Mô hình tư duy

Hãy hỏi ý định của người viết:

| Ý định | Phần tử |
| --- | --- |
| nhấn một từ để câu được hiểu/đọc khác đi | `em` |
| đánh dấu thông tin đặc biệt quan trọng hoặc khẩn cấp | `strong` |
| tạo tiêu đề cho section | heading (`h1`–`h6`) |
| chỉ muốn chữ nghiêng/đậm về mặt hình thức | thường nên dùng CSS |

## Dự đoán cấu trúc khi render

```html
<p>Tôi nói <em>hôm nay</em>, không phải ngày mai.</p>
<p><strong>Cảnh báo:</strong> hãy lưu công việc.</p>
```

Hãy dự đoán cả ý nghĩa lẫn hình thức mặc định: `hôm nay` được nhấn trọng âm; `Cảnh báo:` mang mức độ quan trọng. Trình duyệt thường hiển thị tương ứng bằng chữ nghiêng và đậm.

## Ví dụ mẫu

```html
<p>Gửi biểu mẫu <em>trước</em> nửa đêm.</p>
<p><strong>Cảnh báo:</strong> thay đổi chưa lưu sẽ bị mất.</p>
```

Screen reader hoặc công cụ khác vẫn có thể khai thác phần tử ngữ nghĩa ngay cả khi CSS thay đổi hình thức sau này.

## Tìm lỗi

```html
<p><b>Cảnh báo:</b> thay đổi chưa lưu sẽ bị mất.</p>
```

`b` có thể thu hút sự chú ý nhưng không biểu đạt strong importance. Nếu thông tin thực sự quan trọng, `strong` truyền đạt đúng ý nghĩa hơn.

## Lỗi thường gặp

- Bọc một khối lớn bằng `strong` chỉ để có chữ đậm.
- Dùng `em` thay cho heading.
- Nghĩ kiểu nghiêng/đậm mặc định chính là định nghĩa ngữ nghĩa của phần tử.

## Thử ngay

Tạo một paragraph có cả emphasis theo ngữ cảnh và strong importance.

## Tự kiểm tra

Nếu CSS bỏ kiểu chữ đậm của `strong`, ý nghĩa quan trọng có biến mất không?

**Đáp án:** không. Phần tử vẫn mang ngữ nghĩa strong importance.
