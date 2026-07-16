---
id: html-07-landmarks
track: html-basics
locale: vi
slug: semantic-landmarks
title: Các vùng trang (landmarks)
order: 7
published: true
objectives:
  - Nhận biết các vùng semantic: header, nav, main, article, section, footer
  - Giải thích vì sao landmark giúp điều hướng và tiếp cận
  - Phác khung trang đơn giản bằng các vùng này
---

Trang web thường có phần đầu, menu, nội dung chính và chân trang. HTML hiện đại có thẻ **landmark** (vùng trang) để nói rõ từng khu vực — không chỉ dùng nhiều `div` vô danh.

| Thẻ | Vai trò đơn giản |
| --- | --- |
| `header` | Phần đầu (thường có tên site / tiêu đề khu vực) |
| `nav` | Khối điều hướng (menu liên kết) |
| `main` | Nội dung chính của trang (thường một cái) |
| `article` | Khối nội dung độc lập (bài viết, thẻ tin) |
| `section` | Một mục có chủ đề trong trang |
| `footer` | Phần chân (bản quyền, liên kết phụ…) |

## Ví dụ mẫu

```html
<header>
  <h1>Blog Syntaxia</h1>
  <nav>
    <ul>
      <li><a href="/">Trang chủ</a></li>
      <li><a href="/about.html">Giới thiệu</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>Bài viết đầu tiên</h2>
    <p>Nội dung bài nằm ở đây.</p>
  </article>
</main>
<footer>
  <p>© Syntaxia</p>
</footer>
```

- `header` + `nav` nhóm phần đầu và menu.
- `main` bao nội dung chính; trong đó `article` là một bài độc lập.
- `footer` kết thúc trang bằng thông tin phụ.
- Landmark giúp trình đọc màn hình nhảy nhanh tới “nội dung chính” hoặc “điều hướng”.

## Lỗi thường gặp

- Nhồi cả trang vào nhiều `div` không tên khi đã có landmark phù hợp — mất tín hiệu cấu trúc.
- Đặt nhiều `main` trên một trang — nên chỉ một vùng nội dung chính.
- Dùng `section` thay mọi thứ — `section` cần chủ đề rõ (thường kèm heading); đừng dùng như hộp trang trí.

## Thử ngay

Nhìn khung ví dụ và kể lần lượt: phần nào là menu, phần nào là nội dung chính, phần nào là chân trang. Rồi đánh dấu hoàn thành bài.
