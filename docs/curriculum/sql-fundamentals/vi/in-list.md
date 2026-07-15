---
id: sql-16-in
track: sql-fundamentals
locale: vi
slug: in-list
title: Khớp danh sách với IN
order: 16
published: true
objectives:
  - Giữ hàng có giá trị nằm trong danh sách ngắn
  - Ưu tiên IN thay vì nhiều OR
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "IN (a, b) giữ hàng khi cột bằng a hoặc b."
    - "Lọc year bằng IN (1999, 2010), rồi chọn title."
    - "Thử: SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
      - ["Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Dune', 2021);"
---

Đôi khi bạn muốn vài giá trị đúng cùng lúc — “năm là 1999 hoặc 2010”. `IN` viết danh sách đó gọn hơn nhiều `OR`.

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |
| Dune | 2021 |

## Ví dụ mẫu

```sql
SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;
```

- `year IN (1999, 2010)` giữ hàng nếu `year` bằng một trong hai giá trị.
- Inception (2010) và The Matrix (1999) khớp; Dune (2021) thì không.
- `ORDER BY title` sắp xếp kết quả theo alphabet.

Kết quả:

| title |
| --- |
| Inception |
| The Matrix |

## Lỗi thường gặp

- Viết `year = (1999, 2010)` — dùng `IN`, không dùng `=` cho danh sách.
- Nhầm `IN` (giá trị đúng) với `BETWEEN` (khoảng liên tục).
- Quên ngoặc quanh danh sách: `IN (1999, 2010)`.

## Thử ngay

Liệt kê `title` của phim có `year` là `1999` hoặc `2010`. Sắp xếp bằng `ORDER BY title`.
