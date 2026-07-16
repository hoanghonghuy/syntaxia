---
id: sql-07-update
track: sql-fundamentals
locale: vi
slug: updating-rows
title: Đổi hàng với UPDATE
order: 10
published: true
objectives:
  - Đổi giá trị đã có bằng UPDATE
  - Luôn nhắm hàng bằng WHERE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "UPDATE ... SET cột = giá_trị WHERE điều_kiện."
    - "Luôn có WHERE để chỉ đổi đúng hàng cần."
    - "Thử: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "Interstellar", 2010, "Nolan"]
      - [3, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
      - [3, "The Matrix", 1999]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'Interstellar', 2010, 'Nolan'), (3, 'The Matrix', 1999, 'Wachowski');"
---

`UPDATE` sửa ô đã tồn tại. Luôn dùng `WHERE` — không có thì bạn sẽ đổi **mọi** hàng.

**movies** — trước khi sửa (năm Interstellar sai: 2010)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | Interstellar | 2010 | Nolan |
| 3 | The Matrix | 1999 | Wachowski |

Interstellar phải là **2014**. Chỉ một ô đó đổi.

## Ví dụ mẫu

```sql
UPDATE movies
SET year = 2014
WHERE title = 'Interstellar';
```

- `SET year = 2014` là giá trị mới.
- `WHERE title = 'Interstellar'` giới hạn đổi đúng một hàng.
- Inception giữ 2010; The Matrix giữ 1999; chỉ Interstellar thành 2014.

**movies** — sau khi cập nhật (checker đọc các cột này)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Interstellar | 2014 |
| 3 | The Matrix | 1999 |

## Lỗi thường gặp

- Bỏ `WHERE` — mọi hàng đều bị đổi `year` thành 2014.
- Khớp tiêu đề sai ngoặc hoặc sai chính tả (`Intersteller`).
- Dùng `INSERT` thay vì `UPDATE` khi hàng đã tồn tại.

## Thử ngay

Đặt `year` thành `2014` cho phim tiêu đề `Interstellar`.
