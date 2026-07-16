---
id: html-00-intro
track: html-basics
locale: vi
slug: what-is-html
title: HTML là gì?
order: 0
published: true
objectives:
  - Giải thích HTML bằng lời đơn giản (cấu trúc trang, không phải trang trí)
  - Nhận biết phần tử (element), thẻ (tag) và thuộc tính (attribute)
  - Đọc một đoạn HTML ngắn và nói từng phần làm gì
---

Trang web hiện chữ, ảnh và nút. **HTML** (HyperText Markup Language) là ngôn ngữ dùng để *đánh dấu* nội dung: đây là tiêu đề, đây là đoạn văn, đây là liên kết. Trình duyệt đọc HTML rồi dựng trang bạn nhìn thấy.

HTML không “làm đẹp” trang (đó là việc của CSS) và cũng không tự động hóa (đó là việc của JavaScript). HTML chỉ nói rõ *cái gì là cái gì*.

Ba ý sẽ lặp lại suốt lộ trình:

| Ý | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| Phần tử (element) | Một khối nội dung có ý nghĩa | một đoạn văn, một liên kết |
| Thẻ (tag) | Nhãn mở/đóng bao quanh nội dung | `<p>`, `</p>` |
| Thuộc tính (attribute) | Thông tin thêm trên thẻ mở | `href`, `src`, `alt` |

## Ví dụ mẫu

```html
<p>Xin chào, <strong>Syntaxia</strong>.</p>
```

- `<p>` … `</p>` là phần tử đoạn văn (paragraph).
- `<strong>` … `</strong>` đánh dấu phần chữ *quan trọng*; trình duyệt thường in đậm, nhưng ý nghĩa chính là tầm quan trọng, không chỉ kiểu chữ.
- Nội dung nằm giữa thẻ mở và thẻ đóng.

Trình duyệt sẽ hiện khoảng: Xin chào, **Syntaxia**.

## Lỗi thường gặp

- Nghĩ HTML giống CSS hoặc JavaScript — HTML dựng cấu trúc; CSS trang trí; JavaScript thêm hành vi.
- Quên thẻ đóng (`</p>`) khi phần tử cần cặp đóng — nhiều trình duyệt vẫn “đoán”, nhưng mã dễ lỗi và khó đọc.
- Viết thuộc tính sai chỗ (ví dụ đặt `href` trên `<p>`) — mỗi thuộc tính thuộc về loại phần tử phù hợp.

## Thử ngay

Đọc lại bảng ba ý và ví dụ mẫu. Tự nói to (hoặc ghi chú): đâu là thẻ mở, đâu là nội dung, đâu là thẻ đóng. Rồi đánh dấu hoàn thành bài.
