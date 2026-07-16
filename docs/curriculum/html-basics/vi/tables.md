---
id: html-08-tables
track: html-basics
locale: vi
slug: tables
title: Bảng dữ liệu
order: 8
published: true
objectives:
  - Dựng bảng bằng table, tr, th, td
  - Phân biệt ô tiêu đề (th) và ô dữ liệu (td)
  - Nhận biết thead và tbody ở mức cơ bản
exercise:
  mode: html
  starter: |
    <!-- Build a small table with header and data cells -->
    
  hints:
    - Bọc hàng trong table và tr.
    - Dùng th cho ô tiêu đề.
    - Dùng td cho ô dữ liệu.
  solution: |
    <table>
      <tr>
        <th>Name</th>
        <td>Alex</td>
      </tr>
    </table>
  expected:
    type: htmlTags
    tags:
      - tag: table
        minCount: 1
      - tag: tr
        minCount: 1
      - tag: th
        minCount: 1
      - tag: td
        minCount: 1
---

Bảng HTML phù hợp khi dữ liệu có hàng và cột — như bảng điểm hoặc danh sách sản phẩm. Không dùng bảng chỉ để “xếp bố cục trang” (việc đó thuộc CSS).

| Thẻ | Vai trò |
| --- | --- |
| `table` | Bao toàn bộ bảng |
| `tr` | Một hàng (table row) |
| `th` | Ô tiêu đề cột/hàng |
| `td` | Ô dữ liệu |
| `thead` / `tbody` | Nhóm hàng tiêu đề / hàng dữ liệu |

## Ví dụ mẫu

```html
<table>
  <thead>
    <tr>
      <th>Sản phẩm</th>
      <th>Giá</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bút chì</td>
      <td>5.000</td>
    </tr>
    <tr>
      <td>Vở</td>
      <td>12.000</td>
    </tr>
  </tbody>
</table>
```

- Hàng đầu trong `thead` dùng `th` cho tên cột.
- Mỗi hàng dữ liệu là một `tr`; mỗi ô giá trị là `td`.
- `thead` / `tbody` giúp tách phần tiêu đề và phần dữ liệu — hữu ích khi bảng dài.

Kết quả ý nghĩa:

| Sản phẩm | Giá |
| --- | --- |
| Bút chì | 5.000 |
| Vở | 12.000 |

## Lỗi thường gặp

- Dùng `td` cho ô tiêu đề cột — mất tín hiệu “đây là nhãn cột” cho trình đọc màn hình.
- Quên `tr` và nhét `td` thẳng vào `table` — cấu trúc hàng bị sai.
- Dùng bảng để căn lề toàn trang — hãy giữ bảng cho dữ liệu dạng lưới.

## Thử ngay

Dùng sandbox bên dưới để tạo bảng dữ liệu nhỏ. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
