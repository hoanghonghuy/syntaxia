---
id: sql-01-syntax
track: sql-fundamentals
locale: vi
slug: sql-syntax
title: Cú pháp SQL cơ bản
order: 1
published: true
objectives:
  - Nhận ra cấu trúc của câu lệnh SELECT đơn giản
  - Chạy truy vấn trả về một cột từ bảng
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Truy vấn cơ bản ghi tên cột sau SELECT, rồi tên bảng sau FROM."
    - "Bạn chỉ cần cột title — không phải mọi cột."
    - "Chạy: SELECT title FROM movies;"
  solution: "SELECT title FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

SQL là ngôn ngữ để hỏi dữ liệu trong bảng. Một truy vấn ngắn đọc như một câu: lấy cột nào, từ bảng nào.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Ví dụ mẫu

```sql
SELECT title FROM movies;
```

- `SELECT` bắt đầu yêu cầu — “cho tôi xem các cột này”.
- `title` là cột bạn muốn lấy.
- `FROM movies` chỉ tên bảng (giống tên sheet trong Excel).

Kết quả:

| title |
| --- |
| Inception |
| The Matrix |

Mỗi câu lệnh SQL thường kết thúc bằng dấu chấm phẩy (`;`). Từ khóa thường viết hoa để dễ phân biệt với tên bảng và tên cột.

## Lỗi thường gặp

- Quên `FROM` — chỉ viết `SELECT title` thì chưa biết lấy từ bảng nào.
- Sai chính tả tên bảng hoặc cột (`movie` thay vì `movies`) — tên phải khớp chính xác.
- Thiếu dấu chấm phẩy khi công cụ yêu cầu câu lệnh đầy đủ.

## Thử ngay

Chạy truy vấn chỉ trả về cột `title` từ bảng `movies`.
