---
id: sql-00-intro
track: sql-fundamentals
locale: vi
slug: what-is-sql
title: Dữ liệu và SQL là gì?
order: 0
published: true
objectives:
  - Nhìn bảng như một sheet Excel (hàng và cột)
  - Hiểu SQL dùng để hỏi dữ liệu bằng ngôn ngữ đơn giản
  - Chạy SELECT đầu tiên để xem mọi dòng
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "Dấu * nghĩa là mọi cột."
    - "Giữ tên bảng movies sau FROM."
    - "Gõ: SELECT * FROM movies; rồi bấm Chạy truy vấn."
  solution: "SELECT * FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski');"
---

Hãy tưởng tượng danh sách phim trong Excel hoặc Google Sheets. Mỗi **hàng** là một bộ phim. Mỗi **cột** là một thông tin — tên, năm, hoặc đạo diễn.

Trong cơ sở dữ liệu, danh sách đó gọi là **bảng** (table). SQL (Structured Query Language — ngôn ngữ truy vấn có cấu trúc) là cách đặt câu hỏi về bảng. Bạn không cần biết lập trình để bắt đầu.

Đây là bảng tên `movies`:

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |

## Ví dụ mẫu

Muốn xem mọi cột và mọi dòng, viết:

```sql
SELECT * FROM movies;
```

- `SELECT` nghĩa là “hãy cho tôi xem…”
- `*` nghĩa là mọi cột
- `FROM movies` nghĩa là “từ bảng tên movies”

Kết quả chính là hai dòng như bảng mẫu ở trên.

## Lỗi thường gặp

- Quên dấu chấm phẩy `;` ở cuối câu lệnh (nhiều công cụ vẫn chạy được, nhưng nên tạo thói quen).
- Viết `SELECT movies` thay vì `SELECT * FROM movies` — phải dùng `FROM` để chỉ rõ bảng.
- Gõ sai tên bảng (`movie` thay vì `movies`) — tên phải khớp chính xác.

## Thử ngay

Chạy truy vấn trả về **mọi cột và mọi dòng** của `movies`. Nếu bí, bấm nút gợi ý.
