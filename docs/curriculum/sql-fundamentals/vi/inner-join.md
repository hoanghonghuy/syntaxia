---
id: sql-03-join
track: sql-fundamentals
locale: vi
slug: inner-join
title: Ghép bảng với INNER JOIN
order: 19
published: true
objectives:
  - Ghép hai bảng liên quan qua khóa
  - Chọn cột từ cả hai bảng
exercise:
  starter: "SELECT movies.title FROM movies;"
  hints:
    - "movies.director_id khớp với directors.id — đó là khóa để JOIN."
    - "Dùng INNER JOIN … ON để nối hai bảng."
    - "Thử: SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id;"
  solution: "SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id;"
  preview:
    columns: ["movies.title", "directors.name"]
    rows:
      - ["Inception", "Nolan"]
      - ["The Matrix", "Wachowski"]
  expected:
    columns: ["title", "name"]
    rows:
      - ["Inception", "Nolan"]
      - ["The Matrix", "Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'The Matrix', 2);"
---

Dữ liệu thật thường tách nhiều sheet. Một bảng liệt kê phim; bảng khác liệt kê đạo diễn. Một id chung nối chúng — giống VLOOKUP trong Excel.

**movies**

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |
| 2 | The Matrix | 2 |

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |

## Ví dụ mẫu

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors ON movies.director_id = directors.id;
```

- `INNER JOIN directors` đưa bảng thứ hai vào.
- `ON movies.director_id = directors.id` là quy tắc khớp (**khóa**).
- `INNER JOIN` chỉ giữ các dòng khớp khóa ở cả hai bên.

Kết quả:

| title | name |
| --- | --- |
| Inception | Nolan |
| The Matrix | Wachowski |

## Lỗi thường gặp

- JOIN nhầm cột (`movies.id = directors.id`) — ở đây liên kết là `director_id`, không phải `id` của phim.
- Chỉ chọn cột từ một bảng khi đề yêu cầu cả `title` và `name`.
- Quên `ON …` sau `JOIN` — kiểu này cần điều kiện khớp rõ ràng.

## Thử ngay

Trả về mỗi `title` phim kèm `name` đạo diễn.
