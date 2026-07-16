---
id: sql-02-where
track: sql-fundamentals
locale: vi
slug: filtering-with-where
title: Lọc với WHERE
order: 4
published: true
objectives:
  - Giữ lại các dòng thỏa điều kiện
  - So sánh cột số
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Thêm WHERE sau tên bảng để giữ một số dòng và bỏ các dòng khác."
    - "So sánh cột year, ví dụ year > 2000."
    - "Thử: SELECT title FROM movies WHERE year > 2000 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 ORDER BY title;"
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
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

`SELECT` chọn **cột**. `WHERE` chọn **hàng** — giống bộ lọc Excel: “chỉ phim sau năm 2000”.

**movies** (bảng đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Ba phim sau năm 2000; The Matrix (1999) thì không.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year > 2000
ORDER BY title;
```

- Mỗi dòng được kiểm tra `year > 2000`.
- Inception (2010), Dune (2021) và Interstellar (2014) được giữ.
- The Matrix (1999) bị loại.
- `ORDER BY title` sắp tiêu đề còn lại A→Z để kết quả ổn định.

Kết quả:

| title |
| --- |
| Dune |
| Inception |
| Interstellar |

## Lỗi thường gặp

- Dùng `=` khi đề bài nói “sau” hoặc “lớn hơn” — ở đây cần `>`, không phải `=`.
- Đặt `WHERE` trước `FROM` — thứ tự đúng là `SELECT … FROM … WHERE …`.
- Lọc nhầm cột (ví dụ `id > 2000`) trong khi điều kiện là về `year`.

## Thử ngay

Liệt kê `title` các phim phát hành **sau** năm 2000. Sắp theo `title`.
