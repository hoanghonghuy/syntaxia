---
id: sql-12-minmax
track: sql-fundamentals
locale: vi
slug: min-and-max
title: Tìm cực trị với MIN và MAX
order: 12
published: true
objectives:
  - Tìm giá trị nhỏ nhất bằng MIN
  - Tìm giá trị lớn nhất bằng MAX
exercise:
  starter: "SELECT year FROM movies;"
  hints:
    - "MIN và MAX nhìn cả cột và trả về một giá trị."
    - "Đặt tên kết quả rõ bằng AS, ví dụ newest_year."
    - "Thử: SELECT MAX(year) AS newest_year FROM movies;"
  solution: "SELECT MAX(year) AS newest_year FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["newest_year"]
    rows:
      - [2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Đôi khi bạn không cần mọi hàng — bạn cần số nhỏ nhất hoặc lớn nhất trong một cột, như năm sớm nhất hoặc muộn nhất trong danh sách.

**movies** (bảng đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Các năm trong cột: 2010, 1999, 2021, 2014 → nhỏ nhất **1999**, lớn nhất **2021**.

## Ví dụ mẫu

```sql
SELECT MIN(year) AS oldest_year FROM movies;
```

- `MIN(year)` quét cột `year` và giữ giá trị nhỏ nhất (`1999`).
- `MAX(year)` sẽ giữ lớn nhất (`2021`).
- `AS oldest_year` đặt tên cột kết quả cho dễ đọc.

Kết quả của `MIN`:

| oldest_year |
| --- |
| 1999 |

Bài tập của bạn yêu cầu `MAX` với tên `newest_year` → `2021`.

## Lỗi thường gặp

- Mong mỗi phim một hàng — `MIN` / `MAX` trả một giá trị tóm tắt, không phải danh sách tiêu đề.
- Quên ngoặc: viết `MAX(year)`, không phải `MAX year`.
- Nhầm cực trị — `MIN` là nhỏ nhất; `MAX` là lớn nhất.

## Thử ngay

Tìm năm phát hành mới nhất trong `movies`. Trả về một cột tên `newest_year` bằng `MAX(year)`.
