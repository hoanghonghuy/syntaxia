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
  - Tìm đạo diễn không có phim bằng RIGHT JOIN và IS NULL
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "RIGHT JOIN giữ mọi đạo diễn, kể cả khi không có phim nào trỏ tới họ."
    - "Sau khi join, đạo diễn không có phim sẽ có movies.id là NULL."
    - "Thử: SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  solution: "SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  preview:
    columns: ["movies.title", "directors.name"]
    rows:
      - ["Inception", "Nolan"]
      - ["The Matrix", "Wachowski"]
      - [null, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Villeneuve"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'The Matrix', 2);"
---

`RIGHT JOIN` là hình gương của `LEFT JOIN`: mọi dòng bảng **phải** được giữ. Nếu bảng trái không khớp, cột bên trái thành `NULL`. Dùng khi bảng bạn phải giữ nằm bên phải của `JOIN`.

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |
| 3 | Villeneuve |

**movies**

| id | title | director_id |
| --- | --- |
| 1 | Inception | 1 |
| 2 | The Matrix | 2 |

## Ví dụ mẫu

```sql
SELECT movies.title, directors.name
FROM movies
RIGHT JOIN directors ON movies.director_id = directors.id
ORDER BY directors.name;
```

- `RIGHT JOIN directors` giữ mọi đạo diễn.
- Villeneuve không có phim, nên `movies.title` là `NULL`.
- `WHERE movies.id IS NULL` tách ra đạo diễn không có phim.

Kết quả join đầy đủ (trước khi lọc):

| title | name |
| --- | --- |
| Inception | Nolan |
| The Matrix | Wachowski |
|  | Villeneuve |

## Lỗi thường gặp

- Nghĩ `RIGHT JOIN` giữ dòng **trái** không khớp — đó là `LEFT JOIN`.
- Lọc bằng `WHERE movies.id = NULL` thay vì `IS NULL`.
- Quên rằng nhiều đội viết lại `RIGHT JOIN` thành `LEFT JOIN` với hai bảng đổi chỗ — cả hai cách đều đúng.

## Thử ngay

Liệt kê `name` của mọi đạo diễn không có phim khớp (`movies.id IS NULL`).
