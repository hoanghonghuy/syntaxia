---
id: sql-17-between
track: sql-fundamentals
locale: vi
slug: between-range
title: Lọc khoảng với BETWEEN
order: 17
published: true
objectives:
  - Giữ giá trị trong khoảng (gồm cả hai đầu)
  - Dùng BETWEEN thay cho hai phép so sánh
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "BETWEEN thấp AND cao giữ giá trị từ thấp đến cao, gồm cả hai đầu."
    - "Lọc year BETWEEN 2000 AND 2020, rồi chọn title."
    - "Thử: SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
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
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Dune', 2021);"
---

Bộ lọc khoảng giữ giá trị từ cận dưới đến cận trên — như “năm từ 2000 đến 2020 (gồm cả hai đầu)”. `BETWEEN` viết điều đó rõ ràng.

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |
| Dune | 2021 |

## Ví dụ mẫu

```sql
SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;
```

- `BETWEEN 2000 AND 2020` nghĩa là `year >= 2000` và `year <= 2020`.
- Inception (2010) nằm trong khoảng; The Matrix (1999) và Dune (2021) thì ngoài.
- Cả hai đầu đều được tính khi có trong dữ liệu.

Kết quả:

| title |
| --- |
| Inception |

## Lỗi thường gặp

- Nghĩ hai đầu bị loại — `BETWEEN` gồm cả giá trị thấp và cao.
- Viết ngược cận (`BETWEEN 2020 AND 2000`) — đặt số nhỏ hơn trước.
- Dùng `BETWEEN` khi ý là vài năm đúng cụ thể — thường dùng `IN`.

## Thử ngay

Liệt kê `title` của phim có `year` từ `2000` đến `2020` (gồm cả hai đầu). Sắp xếp bằng `ORDER BY title`.
