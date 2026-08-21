---
id: html-02-headings
track: html-basics
locale: vi
slug: headings-and-paragraphs
title: Heading và đoạn văn
order: 2
published: true
can_do: "Biến nội dung văn bản thành hệ thống heading và paragraph logic mà không dùng cấp heading để điều khiển kích thước hiển thị"
objectives:
  - Xây dựng hierarchy heading hợp lý
  - Dùng paragraph cho văn bản thông thường
  - Tách ngữ nghĩa tài liệu khỏi phần trình bày bằng CSS
exercise:
  mode: html
  starter: |
    <!-- TODO: thêm h1 của trang và một paragraph bên dưới -->
  hints:
    - Dùng h1 cho heading cấp trang trong tài liệu nhỏ này.
    - Đặt câu mô tả trong phần tử p.
    - Cấu trúc hợp lệ là h1 rồi đến p; kiểu hiển thị không quyết định cấp heading.
  solution: |
    <h1>Welcome</h1>
    <p>This is a short paragraph.</p>
  expected:
    type: htmlTags
    tags:
      - tag: h1
        minCount: 1
      - tag: p
        minCount: 1
---

Cấp heading mô tả **outline của nội dung**, không phải menu chọn cỡ chữ. Source tốt vẫn dễ hiểu ngay cả khi CSS chưa tải.

## Mô hình tư duy

```text
h1  Chủ đề trang
├─ h2  Phần chính
│  └─ h3  Phần con
└─ h2  Phần chính khác
```

Paragraph là các khối nội dung nằm dưới heading. Trình duyệt và screen reader có thể dùng heading như các mốc điều hướng.

## Dự đoán cấu trúc khi render

```html
<h1>Nhật ký khu vườn</h1>
<p>Ghi chú cuối tuần.</p>
<h2>Đất</h2>
<p>Luống cây đã khô.</p>
```

Trước khi xem preview, hãy dự đoán outline: một chủ đề cấp trang rồi một section con. Hai phần tử `p` là nội dung văn bản, không phải node heading.

## Ví dụ mẫu

```html
<h1>Nhật ký khu vườn</h1>
<p>Ghi chú từ buổi trồng cây cuối tuần.</p>

<h2>Đất</h2>
<p>Luống cây đã khô sau ba ngày nắng.</p>
```

Cấp heading trả lời “section này nằm ở đâu trong cấu trúc?”. CSS sau này mới trả lời “nó nên to hay có màu gì?”.

## Tìm lỗi

```html
<h1>Nhật ký khu vườn</h1>
<h4>Đất</h4>
<p>Luống cây đã khô.</p>
```

Dùng `h4` chỉ vì cỡ mặc định trông vừa mắt tạo hierarchy sai. Nếu Đất là section trực tiếp của trang thì dùng `h2`, sau đó style bằng CSS.

## Lỗi thường gặp

- Chọn cấp heading theo hình thức hiển thị.
- Nhảy cấp heading dù nội dung không có cấu trúc lồng tương ứng.
- Dùng nhiều line break thay cho paragraph thông thường.

## Thử ngay

Thêm một heading cấp trang và một paragraph. Đọc outline trong source trước rồi mới xem preview.

## Tự kiểm tra

Nếu `h2` trông quá lớn, có nên đổi thành `h4` không?

**Đáp án:** không. Giữ đúng cấp ngữ nghĩa và thay đổi presentation bằng CSS sau.
