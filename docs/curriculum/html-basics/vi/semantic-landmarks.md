---
id: html-07-landmarks
track: html-basics
locale: vi
slug: semantic-landmarks
title: Landmark ngữ nghĩa của trang
order: 7
published: true
can_do: "Ánh xạ các vùng của trang sang semantic landmark và giữ một main duy nhất thay vì dựng tài liệu bằng các container layout vô danh"
objectives:
  - Dùng header, nav, main, article, section và footer theo đúng vai trò
  - Giữ một main landmark cho nội dung chính của trang
  - Phân biệt article độc lập với section theo chủ đề
exercise:
  mode: html
  starter: |
    <!-- TODO: cấu trúc trang nhỏ có header/nav, một main chứa article và footer -->
  hints:
    - Bắt đầu bằng header và đặt link điều hướng trong nav.
    - Đặt nội dung chính duy nhất trong một main và dùng article cho nội dung có thể đứng độc lập.
    - Kết thúc bằng footer; mục tiêu có header, nav, đúng một main, article và footer.
  solution: |
    <header>
      <nav><a href="/">Home</a></nav>
    </header>
    <main>
      <article><h1>News</h1><p>Today's update.</p></article>
    </main>
    <footer>Contact</footer>
  expected:
    type: htmlTags
    tags:
      - tag: header
        minCount: 1
      - tag: nav
        minCount: 1
      - tag: main
        minCount: 1
        maxCount: 1
      - tag: article
        minCount: 1
      - tag: footer
        minCount: 1
---

Semantic landmark gọi tên các vùng chính của trang. Chúng tạo một bản đồ tài liệu hữu ích ngay cả trước khi CSS layout được áp dụng.

## Mô hình tư duy

```text
page
├─ header
│  └─ nav
├─ main              <- nội dung chính duy nhất
│  └─ article/section
└─ footer
```

Dùng `article` khi nội dung có thể đứng tương đối độc lập; dùng `section` cho một nhóm nội dung theo chủ đề nằm trong tổng thể lớn hơn và thường có heading.

## Dự đoán cấu trúc khi render

Nếu thay mọi vùng bằng `<div>`, trang có thể nhìn y hệt sau khi CSS, nhưng ngữ nghĩa region tích hợp sẵn biến mất. Hãy dự đoán landmark list của screen reader nhận diện được gì trước và sau thay đổi đó.

## Ví dụ mẫu

```html
<header>
  <h1>Thư viện thành phố</h1>
  <nav><a href="/events">Sự kiện</a></nav>
</header>
<main>
  <article>
    <h2>Câu lạc bộ đọc sách cuối tuần</h2>
    <p>Gặp nhau lúc 10:00 thứ Bảy.</p>
  </article>
</main>
<footer>Liên hệ quầy thư viện.</footer>
```

Source order tự nó đã có nghĩa; CSS có thể thay đổi presentation sau mà không cần biến mọi thứ thành container vô danh.

## Tìm lỗi

```html
<main>Bài A</main>
<main>Bài B</main>
```

Tài liệu đang có hai main landmark. Chỉ đặt vùng chính duy nhất trong một `main`, rồi cấu trúc nội dung bên trong bằng `article`, `section`, heading và các phần tử phù hợp.

## Lỗi thường gặp

- Dùng `div` cho mọi region dù có semantic landmark phù hợp.
- Tạo nhiều `main` landmark.
- Dùng `section` như wrapper để style dù không có chủ đề riêng.

## Thử ngay

Cấu trúc trang nhỏ có header/nav, đúng một main chứa article và footer.

## Tự kiểm tra

Khác nhau thực tế giữa `article` và `section` là gì?

**Đáp án:** article hướng tới nội dung có thể đứng độc lập; section gom một phần nội dung theo chủ đề của tài liệu lớn hơn.
