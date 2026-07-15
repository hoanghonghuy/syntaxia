---
id: pg-20-window
track: postgresql
locale: vi
slug: window-functions
title: Xếp hạng hàng với hàm cửa sổ
order: 20
published: true
objectives:
  - Đánh số hàng bằng ROW_NUMBER()
  - Dùng OVER (ORDER BY …) mà không gộp nhóm
exercise:
  starter: "SELECT title, year FROM movies ORDER BY year;"
  hints:
    - "ROW_NUMBER() gán 1, 2, 3… theo thứ tự các hàng."
    - "Đặt quy tắc đánh số trong OVER (ORDER BY year)."
    - "Thử: SELECT title, year, ROW_NUMBER() OVER (ORDER BY year) AS rn FROM movies;"
  solution: "SELECT title, year, ROW_NUMBER() OVER (ORDER BY year) AS rn FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
  expected:
    columns: ["title", "year", "rn"]
    rows:
      - ["The Matrix", 1999, 1]
      - ["Inception", 2010, 2]
      - ["Arrival", 2016, 3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016);"
---

Đôi khi bạn muốn xếp hạng cạnh mỗi hàng — nhất, nhì, ba — mà không gộp bảng thành một dòng tổng. **Hàm cửa sổ** (window function) làm việc đó: nhìn qua các hàng liên quan nhưng vẫn trả về một hàng kết quả cho mỗi hàng đầu vào.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Arrival | 2016 |

## Ví dụ mẫu

```sql
SELECT title, year, ROW_NUMBER() OVER (ORDER BY year) AS rn
FROM movies;
```

- `ROW_NUMBER()` gán 1, 2, 3… theo thứ tự.
- `OVER (ORDER BY year)` đặt thứ tự đánh số (cũ nhất trước ở đây).
- Khác `GROUP BY`, mọi hàng phim vẫn xuất hiện.

Kết quả:

| title | year | rn |
| --- | --- | --- |
| The Matrix | 1999 | 1 |
| Inception | 2010 | 2 |
| Arrival | 2016 | 3 |

Các hàm liên quan gồm `RANK()`, `LAG()`, và `LEAD()` — cùng ý `OVER`, phép tính khác.

## Lỗi thường gặp

- Dùng `GROUP BY` khi vẫn cần mọi hàng.
- Quên `OVER (…)` — hàm cửa sổ bắt buộc có.
- Bỏ alias `rn` khi cột kỳ vọng có nó.

## Thử ngay

Trả về `title`, `year`, và số thứ tự `rn` theo `year` tăng dần.
