---
id: sql-03-join
track: sql-fundamentals
locale: vi
slug: inner-join
title: Ghép bảng với INNER JOIN
order: 19
published: true
objectives:
  - Ghép hai bảng liên quan qua khóa chung
  - Chọn cột từ cả hai bảng trong một kết quả
  - Thấy INNER JOIN bỏ dòng không khớp
exercise:
  starter: "SELECT movies.title FROM movies;"
  hints:
    - "movies.director_id khớp với directors.id — đó là khóa để JOIN."
    - "Dùng INNER JOIN … ON để nối hai bảng."
    - "Thử: SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  solution: "SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "The Matrix", 2]
      - [3, "Interstellar", 1]
  expected:
    columns: ["title", "name"]
    rows:
      - ["Inception", "Nolan"]
      - ["Interstellar", "Nolan"]
      - ["The Matrix", "Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

Dữ liệu thật thường tách nhiều sheet. Một bảng liệt kê phim; bảng khác liệt kê đạo diễn. Một id chung nối chúng — giống VLOOKUP trong Excel.

**directors** (bảng đầy đủ)

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |

**movies** (bảng đầy đủ)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | The Matrix | 1999 | 2 |
| 3 | Interstellar | 2014 | 1 |

| title | director_id | Khớp đạo diễn? |
| --- | --- | --- |
| Inception | 1 | Nolan |
| The Matrix | 2 | Wachowski |
| Interstellar | 1 | Nolan |

## Ví dụ mẫu

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors ON movies.director_id = directors.id
ORDER BY movies.title;
```

- `INNER JOIN directors` kéo bảng thứ hai vào.
- `ON movies.director_id = directors.id` là quy tắc khớp (**khóa**).
- `INNER JOIN` chỉ giữ dòng khớp được cả hai phía.
- Nếu phim có `director_id` không tồn tại trong `directors`, phim đó sẽ **biến mất** khỏi kết quả (xem bài sau `left-join`).

Kết quả:

| title | name |
| --- | --- |
| Inception | Nolan |
| Interstellar | Nolan |
| The Matrix | Wachowski |

## Lỗi thường gặp

- Join sai cột (`movies.id = directors.id`) — ở đây khóa là `director_id`, không phải `id` của phim.
- Chỉ chọn một bảng trong khi đề bài cần cả `title` và `name`.
- Quên `ON …` sau `JOIN` — pattern này cần điều kiện khớp rõ ràng.

## Thử ngay

Trả về mỗi `title` phim kèm `name` đạo diễn, sắp theo `movies.title`.
