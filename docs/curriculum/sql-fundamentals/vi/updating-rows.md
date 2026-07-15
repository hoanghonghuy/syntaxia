---
id: sql-07-update
track: sql-fundamentals
locale: vi
slug: updating-rows
title: Sửa dòng với UPDATE
order: 10
published: true
objectives:
  - Đổi giá trị có sẵn bằng UPDATE
  - Luôn giới hạn dòng bằng WHERE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "UPDATE ... SET cột = giá_trị WHERE điều_kiện."
    - "Luôn có WHERE để chỉ sửa đúng dòng cần đổi."
    - "Thử: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2010]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'Interstellar', 2010);"
---

`UPDATE` sửa ô đã có. Luôn dùng `WHERE` — thiếu WHERE sẽ sửa **mọi** dòng.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Interstellar | 2010 |

## Ví dụ mẫu

```sql
UPDATE movies SET year = 2014 WHERE title = 'Interstellar';
```

- `SET year = 2014` là giá trị mới.
- `WHERE title = 'Interstellar'` giới hạn thay đổi ở một dòng.
- Inception vẫn là 2010; chỉ Interstellar thành 2014.

## Lỗi thường gặp

- Bỏ `WHERE` — mọi dòng sẽ bị đổi `year` thành 2014.
- Sai chính tả hoặc sai ngoặc khi khớp tên (`Intersteller`).
- Dùng `INSERT` thay vì `UPDATE` khi dòng đã tồn tại.

## Thử ngay

Đặt `year` thành `2014` cho phim tên `Interstellar`.
