---
id: sql-17-between
track: sql-fundamentals
locale: vi
slug: between-range
title: Lọc khoảng với BETWEEN
order: 17
published: true
objectives:
  - Giữ giá trị trong khoảng bao gồm hai đầu
  - Dùng BETWEEN thay cho hai phép so sánh
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "BETWEEN thấp AND cao giữ giá trị từ thấp đến cao, gồm cả hai đầu."
    - "Lọc year BETWEEN 2000 AND 2020, rồi chọn title."
    - "Thử: SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
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
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Bộ lọc khoảng giữ giá trị từ cận dưới đến cận trên — như “năm từ 2000 đến 2020 gồm cả hai đầu”. `BETWEEN` viết điều đó rõ ràng.

**movies** (bảng đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

| title | year | Trong 2000–2020? |
| --- | --- | --- |
| Inception | 2010 | có |
| The Matrix | 1999 | không (quá sớm) |
| Dune | 2021 | không (quá muộn) |
| Interstellar | 2014 | có |

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year BETWEEN 2000 AND 2020
ORDER BY title;
```

- `BETWEEN 2000 AND 2020` nghĩa là `year >= 2000` và `year <= 2020`.
- Cả hai đầu đều được tính khi có trong dữ liệu.
- Inception và Interstellar được giữ; The Matrix và Dune bị loại.

Kết quả:

| title |
| --- |
| Inception |
| Interstellar |

## Lỗi thường gặp

- Nghĩ hai đầu bị loại — `BETWEEN` gồm cả cận thấp và cận cao.
- Viết cận ngược (`BETWEEN 2020 AND 2000`) — số nhỏ hơn đứng trước.
- Dùng `BETWEEN` khi ý là danh sách vài năm đúng — thường dùng `IN`.

## Thử ngay

Liệt kê `title` các phim có `year` trong khoảng `2000` đến `2020` (gồm hai đầu). Sắp bằng `ORDER BY title`.
