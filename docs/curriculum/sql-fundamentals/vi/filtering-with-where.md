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
    - "Thử: SELECT title FROM movies WHERE year > 2000;"
  solution: "SELECT title FROM movies WHERE year > 2000;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski');"
---

`SELECT` chọn **cột**. `WHERE` chọn **hàng** — giống bộ lọc Excel: “chỉ phim sau năm 2000”.

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |

## Ví dụ mẫu

```sql
SELECT title FROM movies WHERE year > 2000;
```

- Mỗi dòng được kiểm tra `year > 2000`.
- Chỉ Inception (2010) được giữ; The Matrix (1999) bị loại.
- Kết quả có một cột (`title`) và một dòng (`Inception`).

## Lỗi thường gặp

- Dùng `=` khi đề bài nói “sau” hoặc “lớn hơn” — ở đây cần `>`, không phải `=`.
- Đặt `WHERE` trước `FROM` — thứ tự đúng là `SELECT … FROM … WHERE …`.
- Lọc nhầm cột (ví dụ `id > 2000`) trong khi điều kiện là về `year`.

## Thử ngay

Liệt kê `title` các phim phát hành **sau** năm 2000.
