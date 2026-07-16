---
id: sql-33-fk
track: sql-fundamentals
locale: vi
slug: foreign-key
title: Khóa ngoại
order: 33
published: true
objectives:
  - Giải thích FOREIGN KEY nối bảng thế nào
  - Insert dòng con tham chiếu parent hợp lệ
  - Thấy vì sao id parent lạ bị từ chối
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

**Khóa ngoại** (foreign key) là cột trỏ tới khóa chính ở bảng khác — như ghi mã nhân viên trên timesheet để mỗi dòng gắn với một người.

**directors** (parent — đã có dữ liệu)

| id | name |
| --- | --- |
| 1 | Nolan |

**movies** (child — trống; `director_id` phải khớp một `directors.id`)

| id | title | director_id |
| --- | --- | --- |
|  |  |  |

```sql
CREATE TABLE movies (
  id INT PRIMARY KEY,
  title TEXT,
  director_id INT REFERENCES directors(id)
);
```

| `director_id` | Được phép? |
| --- | --- |
| 1 | có — Nolan tồn tại |
| 99 | không — không có đạo diễn đó |
| NULL | tùy nullability cột (bài này không dùng) |

Cả hai bảng đã có trong sandbox; `directors` đã có Nolan.

## Ví dụ mẫu

```sql
INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);
```

- `id = 1` là khóa chính của chính phim này.
- `director_id = 1` khớp Nolan trong `directors`.
- Khóa ngoại chấp nhận dòng vì khóa parent tồn tại.

Kết quả trong `movies`:

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |

## Lỗi thường gặp

- Dùng `director_id` không có trong `directors` — khóa ngoại từ chối.
- Nhầm `id` của phim với `director_id` — đó là hai cột khác nhau.
- Insert vào `directors` thay vì `movies`.

## Thử ngay

Insert phim `id = 1`, `title = 'Inception'`, `director_id = 1`.
