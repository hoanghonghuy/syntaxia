---
id: css-08-text
track: css-basics
locale: vi
slug: text-and-fonts
title: Chữ và font
order: 8
published: true
objectives:
  - Đặt font-family với danh sách dự phòng
  - Điều chỉnh font-size, font-weight và line-height
  - Căn chữ bằng text-align
exercise:
  mode: both
  starterHtml: |
    <p class="note">Hi</p>
  starter: |
    /* Set a font stack on .note */
    
  hints:
    - font-family liệt kê font cách nhau bằng dấu phẩy.
    - Đặt họ chữ generic cuối (serif, sans-serif).
    - Bọc tên font có dấu cách trong ngoặc kép nếu cần.
  solution: |
    .note { font-family: Georgia, serif; }
  expected:
    type: cssIncludes
    needles:
      - font-family
---

Phần lớn trang web là **chữ**. CSS điều khiển họ font, cỡ chữ, độ đậm, khoảng cách dòng và cách căn dòng — tách khỏi ý nghĩa HTML (`h1`, `p`, `strong`).

| Property | Vai trò đơn giản |
| --- | --- |
| `font-family` | Họ chữ; liệt kê phương án dự phòng |
| `font-size` | Cỡ chữ |
| `font-weight` | Độ đậm (`normal`, `bold`, hoặc số như `700`) |
| `line-height` | Khoảng cách giữa các dòng |
| `text-align` | Căn ngang: `left`, `center`, `right` |

## Ví dụ mẫu

```html
<article class="lesson">
  <h1>Chào buổi sáng</h1>
  <p>Hôm nay học style chữ với CSS.</p>
</article>
```

```css
.lesson {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.6;
  text-align: left;
}

.lesson h1 {
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
}
```

- `font-family` thử Georgia trước, rồi Times New Roman, cuối cùng `serif` chung.
- `line-height: 1.6` (không cần đơn vị khi là hệ số) làm đoạn văn dễ đọc hơn.
- Tiêu đề lớn hơn (`1.75rem`), đậm hơn, và căn giữa; đoạn văn giữ căn trái.

Tên font có khoảng trắng cần nằm trong dấu ngoặc kép: `"Times New Roman"`.

## Lỗi thường gặp

- Chỉ ghi một font lạ không có trên máy người học — luôn thêm họ dự phòng (`serif` / `sans-serif`).
- Dùng `font-weight` để thay `strong` trong HTML — độ đậm là trang trí; tầm quan trọng nội dung vẫn nên dùng đúng thẻ.
- `line-height` quá chật (`1`) — đoạn dài trở nên khó đọc.

## Thử ngay

Dùng sandbox bên dưới để đặt font-family cho .note. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
