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
  - Ưu tiên IN hơn nhiều OR
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "IN (a, b) giữ hàng khi cột bằng a hoặc b."
    - "Lọc year bằng IN (1999, 2010), rồi chọn title."
    - "Thử: SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Đôi khi bạn muốn vài giá trị đúng cùng lúc — “năm là 1999 hoặc 2010”. `IN` viết ngắn danh sách đó, thay vì nối nhiều `OR`.

**movies** (bảng đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

| title | year trong (1999, 2010)? |
| --- | --- |
| Inception | có (2010) |
| The Matrix | có (1999) |
| Dune | không (2021) |
| Interstellar | không (2014) |

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year IN (1999, 2010)
ORDER BY title;
```

- `year IN (1999, 2010)` giữ hàng nếu `year` bằng một trong hai giá trị.
- Cùng ý với `year = 1999 OR year = 2010`, nhưng ngắn hơn.
- `ORDER BY title` sắp kết quả theo alphabet.

Kết quả:

| title |
| --- |
| Inception |
| The Matrix |

## Lỗi thường gặp

- Viết `year = (1999, 2010)` — dùng `IN`, không dùng `=`, cho danh sách.
- Nhầm `IN` (giá trị đúng) với `BETWEEN` (khoảng liên tục).
- Quên ngoặc quanh danh sách: `IN (1999, 2010)`.

## Thử ngay

Liệt kê `title` các phim có `year` là `1999` hoặc `2010`. Sắp bằng `ORDER BY title`.
