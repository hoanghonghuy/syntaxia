---
id: sql-01-select
track: sql-fundamentals
locale: vi
slug: select-queries
title: Viết truy vấn SELECT
order: 2
published: true
objectives:
  - Chọn đúng cột bằng SELECT
  - Đọc tên bảng và tên cột
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "Sau SELECT, liệt kê các cột cần lấy, cách nhau bằng dấu phẩy."
    - "Nếu chỉ muốn một số cột, đừng giữ dấu *."
    - "Thử: SELECT title, year FROM movies;"
  solution: "SELECT title, year FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski');"
---

Thường bạn không cần mọi cột. Hãy nghĩ như đang ẩn cột trong Excel, chỉ để lại **title** và **year**.

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |

## Ví dụ mẫu

```sql
SELECT title, year FROM movies;
```

- Sau `SELECT`, ghi tên các cột muốn lấy (`title`, `year`), cách nhau bằng dấu phẩy.
- `FROM movies` vẫn nghĩa là “nhìn vào bảng này”.

Kết quả:

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |

Các cột `id` và `director` không hiện, vì bạn không yêu cầu chúng.

## Lỗi thường gặp

- Giữ `SELECT *` khi bài yêu cầu cột cụ thể — hệ thống chấm điểm theo tên cột.
- Thêm dấu ngoặc kép quanh tên cột không cần thiết (`"title"`).
- Đảo thứ tự: `FROM movies SELECT title` là sai — `SELECT` phải đứng trước.

## Thử ngay

Sửa truy vấn khởi đầu để chỉ trả về `title` và `year` cho mọi phim.
