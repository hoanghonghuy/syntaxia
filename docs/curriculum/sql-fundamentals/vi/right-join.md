---
id: sql-21-right-join
track: sql-fundamentals
locale: vi
slug: right-join
title: Giữ dòng không khớp với RIGHT JOIN
order: 21
published: true
objectives:
  - Giữ mọi dòng bảng phải kể cả khi bên trái không khớp
  - Đọc NULL bên trái là “không khớp”
  - Tìm đạo diễn không có phim bằng RIGHT JOIN và IS NULL
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "RIGHT JOIN giữ mọi đạo diễn, kể cả khi không có phim nào trỏ tới họ."
    - "Sau khi join, đạo diễn không có phim sẽ có movies.id là NULL."
    - "Thử: SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  solution: "SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Villeneuve"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

`RIGHT JOIN` là gương của `LEFT JOIN`: mọi dòng bảng **phải** được giữ. Nếu bảng trái không khớp, cột bên trái thành `NULL`. Dùng khi bảng bạn phải giữ nằm bên phải của `JOIN`.

**directors** (bảng đầy đủ)

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |
| 3 | Villeneuve |

**movies** (bảng đầy đủ)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | The Matrix | 1999 | 2 |
| 3 | Interstellar | 2014 | 1 |

| name | Có phim? |
| --- | --- |
| Nolan | có (Inception, Interstellar) |
| Wachowski | có (The Matrix) |
| Villeneuve | không → bên trái `NULL` |

## Ví dụ mẫu

```sql
SELECT movies.title, directors.name
FROM movies
RIGHT JOIN directors ON movies.director_id = directors.id
ORDER BY directors.name, movies.title;
```

- `RIGHT JOIN directors` giữ mọi đạo diễn.
- Villeneuve không có phim, nên `movies.title` là `NULL`.
- `WHERE movies.id IS NULL` tách đạo diễn không có phim.
- Nhiều team viết lại bằng `LEFT JOIN` và đổi chỗ bảng — cùng ý tưởng.

Kết quả join đầy đủ (trước khi lọc):

| title | name |
| --- | --- |
| Inception | Nolan |
| Interstellar | Nolan |
| The Matrix | Wachowski |
|  | Villeneuve |

Đạo diễn không có phim:

| name |
| --- |
| Villeneuve |

## Lỗi thường gặp

- Mong `RIGHT JOIN` giữ dòng trái không khớp — đó là `LEFT JOIN`.
- Lọc `WHERE movies.id = NULL` thay vì `IS NULL`.
- Quên rằng đổi chỗ bảng + `LEFT JOIN` thường dễ đọc hơn `RIGHT JOIN`.

## Thử ngay

Liệt kê `name` mọi đạo diễn không có phim khớp (`movies.id IS NULL`).
