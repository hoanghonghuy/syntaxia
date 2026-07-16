---
id: sql-05-order
track: sql-fundamentals
locale: vi
slug: order-by
title: Sắp xếp với ORDER BY
order: 6
published: true
objectives:
  - Sắp xếp hàng kết quả
  - Dùng ASC và DESC
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Thêm ORDER BY tên_cột ở cuối truy vấn."
    - "DESC nghĩa là mới/lớn trước; ASC nghĩa là cũ/nhỏ trước."
    - "Thử: SELECT title, year FROM movies ORDER BY year DESC;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Interstellar", 2014]
      - ["Inception", 2010]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Không sắp xếp thì hàng có thể hiện theo thứ tự bất kỳ. `ORDER BY` giống sắp cột spreadsheet — A→Z, hoặc mới nhất trước.

**movies** (bảng đầy đủ — thứ tự chèn chưa phải “mới nhất trước”)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

## Ví dụ mẫu

```sql
SELECT title, year
FROM movies
ORDER BY year DESC;
```

- `ORDER BY year` sắp theo cột `year`.
- `DESC` nghĩa là giảm dần (lớn / mới trước): 2021 → 2014 → 2010 → 1999.
- `ASC` nghĩa là tăng dần (mặc định nếu bỏ qua): cũ trước.

Kết quả:

| title | year |
| --- | --- |
| Dune | 2021 |
| Interstellar | 2014 |
| Inception | 2010 |
| The Matrix | 1999 |

## Lỗi thường gặp

- Quên `DESC` khi đề yêu cầu mới nhất trước — mặc định `ASC` đặt 1999 trước 2021.
- Đặt `ORDER BY` trước `WHERE` (khi có cả hai) — `ORDER BY` ở cuối câu.
- Sắp theo `title` khi đề yêu cầu sắp theo `year`.

## Thử ngay

Liệt kê `title` và `year` mọi phim, sắp theo `year` từ mới đến cũ.
