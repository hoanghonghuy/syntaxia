---
id: sql-05-order
track: sql-fundamentals
locale: vi
slug: order-by
title: Sắp xếp với ORDER BY
order: 6
published: true
objectives:
  - Sắp xếp kết quả
  - Dùng ASC và DESC
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Thêm ORDER BY tên_cột ở cuối câu lệnh."
    - "DESC nghĩa là lớn/mới trước; ASC nghĩa là nhỏ/cũ trước."
    - "Thử: SELECT title, year FROM movies ORDER BY year DESC;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010);"
---

Không sắp xếp thì thứ tự hàng có thể bất kỳ. `ORDER BY` giống Sort trong Excel — A→Z, hoặc mới nhất trước.

| title | year |
| --- | --- |
| The Matrix | 1999 |
| Inception | 2010 |

## Ví dụ mẫu

```sql
SELECT title, year FROM movies ORDER BY year DESC;
```

- `ORDER BY year` sắp theo cột `year`.
- `DESC` = giảm dần (2010 trước 1999).
- `ASC` = tăng dần (mặc định nếu bạn bỏ qua).

Kết quả:

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |

## Lỗi thường gặp

- Quên `DESC` khi đề yêu cầu mới nhất trước — mặc định `ASC` sẽ để 1999 trước 2010.
- Đặt `ORDER BY` trước `WHERE` (khi có cả hai) — `ORDER BY` luôn ở cuối.
- Sắp theo `title` trong khi đề yêu cầu sắp theo `year`.

## Thử ngay

Liệt kê `title` và `year` mọi phim, sắp theo `year` từ mới đến cũ.
