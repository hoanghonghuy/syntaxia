---
id: sql-13-count
track: sql-fundamentals
locale: vi
slug: count-rows
title: Đếm hàng với COUNT
order: 13
published: true
objectives:
  - Đếm số hàng của một bảng
  - Đặt tên cột kết quả bằng AS
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "COUNT(*) đếm mọi hàng trong bảng."
    - "Thường cần một cột có tên, ví dụ movie_count."
    - "Thử: SELECT COUNT(*) AS movie_count FROM movies;"
  solution: "SELECT COUNT(*) AS movie_count FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["movie_count"]
    rows:
      - [4]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Spreadsheet có thể cho biết bạn có bao nhiêu hàng đã điền. Trong SQL, `COUNT` trả lời “bao nhiêu?” mà không liệt kê từng hàng.

**movies** (bảng đầy đủ — hãy đếm các hàng này)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Có **bốn** phim.

## Ví dụ mẫu

```sql
SELECT COUNT(*) AS movie_count FROM movies;
```

- `COUNT(*)` đếm mọi hàng trong `movies`.
- Bốn hàng → kết quả là `4`.
- `AS movie_count` gắn nhãn rõ cho con số đó.

Kết quả:

| movie_count |
| --- |
| 4 |

## Lỗi thường gặp

- Viết `COUNT(title)` khi ý là “mọi hàng” — `COUNT(*)` đếm hàng; `COUNT(cột)` bỏ qua `NULL` ở cột đó.
- Mong danh sách tiêu đề — `COUNT` trả một số, không phải tên phim.
- Quên `AS` khi grader đòi tên cột cụ thể như `movie_count`.

## Thử ngay

Đếm số phim trong bảng. Trả về một cột tên `movie_count`.
