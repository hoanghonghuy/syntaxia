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
    - "Đặt tên cột kết quả bằng AS, ví dụ newest_year."
    - "Thử: SELECT MAX(year) AS newest_year FROM movies;"
  solution: "SELECT MAX(year) AS newest_year FROM movies;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
      - ["Dune", 2021]
  expected:
    columns: ["newest_year"]
    rows:
      - [2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Dune', 2021);"
---

Đôi khi bạn không cần mọi hàng — chỉ cần số nhỏ nhất hoặc lớn nhất trong một cột, như năm sớm nhất hoặc muộn nhất trong danh sách.

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |
| Dune | 2021 |

## Ví dụ mẫu

```sql
SELECT MIN(year) AS oldest_year FROM movies;
```

- `MIN(year)` quét cột `year` và giữ giá trị nhỏ nhất (`1999`).
- `MAX(year)` sẽ giữ giá trị lớn nhất (`2021`).
- `AS oldest_year` đặt tên cột kết quả cho dễ đọc.

Kết quả:

| oldest_year |
| --- |
| 1999 |

## Lỗi thường gặp

- Mong đợi một hàng cho mỗi phim — `MIN` / `MAX` trả về một giá trị tổng hợp, không phải danh sách tiêu đề đã lọc.
- Quên ngoặc: viết `MAX(year)`, không phải `MAX year`.
- Nhầm cực trị — `MIN` là nhỏ nhất; `MAX` là lớn nhất.

## Thử ngay

Tìm năm phát hành mới nhất trong `movies`. Trả về một cột tên `newest_year` bằng `MAX(year)`.
