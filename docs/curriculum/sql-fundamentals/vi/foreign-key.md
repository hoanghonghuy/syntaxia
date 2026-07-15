---
id: sql-33-fk
track: sql-fundamentals
locale: vi
slug: foreign-key
title: Khóa ngoại (FOREIGN KEY)
order: 33
published: true
objectives:
  - Giải thích FOREIGN KEY nối bảng thế nào
  - INSERT dòng con tham chiếu đúng dòng cha
exercise:
  starter: "INSERT INTO movies (id, title, director_id) VALUES "
  hints:
    - "Khóa ngoại trỏ tới khóa chính ở bảng khác."
    - "directors đã có id = 1 ('Nolan') — dùng director_id đó."
    - "Thử: INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);"
  solution: "INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies;"
  ddl:
    - "CREATE TEMP TABLE directors (id INT PRIMARY KEY, name TEXT);"
    - "INSERT INTO directors VALUES (1, 'Nolan');"
    - "CREATE TEMP TABLE movies (id INT PRIMARY KEY, title TEXT, director_id INT REFERENCES directors(id));"
---

**Khóa ngoại** (foreign key) là cột trỏ tới khóa chính ở bảng khác — như ghi mã nhân viên trên bảng chấm công để mỗi dòng gắn với một người.

Bảng cha `directors`:

| id | name |
| --- | --- |
| 1 | Nolan |

Bảng con `movies` (trống) có `director_id` phải khớp `directors.id`:

```sql
CREATE TABLE movies (
  id INT PRIMARY KEY,
  title TEXT,
  director_id INT REFERENCES directors(id)
);
```

- `REFERENCES directors(id)` nghĩa là mọi `director_id` phải tồn tại trong `directors` (hoặc null, nếu được phép).
- INSERT `director_id = 99` sẽ lỗi khi không có đạo diễn đó.
- Cả hai bảng đã có trong sandbox; `directors` đã có Nolan.

## Ví dụ mẫu

```sql
INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);
```

- `id = 1` là khóa chính của phim này.
- `director_id = 1` khớp Nolan trong `directors`.
- Khóa ngoại chấp nhận dòng vì khóa cha tồn tại.

## Lỗi thường gặp

- Dùng `director_id` không có trong `directors` — khóa ngoại từ chối.
- Nhầm `id` của phim với `director_id` — đó là hai cột khác nhau.
- INSERT vào `directors` thay vì `movies`.

## Thử ngay

Thêm phim `id = 1`, `title = 'Inception'`, `director_id = 1`.
