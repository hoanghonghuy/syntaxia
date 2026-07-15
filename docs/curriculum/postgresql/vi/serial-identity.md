---
id: pg-03-serial
track: postgresql
locale: vi
slug: serial-identity
title: Id tự tăng với SERIAL
order: 3
published: true
objectives:
  - Chèn hàng mà không cần ghi id
  - Xác nhận PostgreSQL đã điền SERIAL giúp bạn
exercise:
  starter: "SELECT id, title FROM movies ORDER BY id;"
  hints:
    - "Bạn không cần liệt kê id — SERIAL sẽ điền."
    - "INSERT chỉ cột title, rồi sandbox kiểm tra bằng SELECT."
    - "Thử: INSERT INTO movies (title) VALUES ('Dune');"
  solution: "INSERT INTO movies (title) VALUES ('Dune');"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
      - [3, "Dune"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id SERIAL PRIMARY KEY, title TEXT);"
    - "INSERT INTO movies (title) VALUES ('Inception'), ('The Matrix');"
---

Trên giấy tờ, bạn có thể để trống “số thứ tự” để người khác đóng dấu sau. Trong PostgreSQL, cột `SERIAL` làm việc đó: mỗi hàng mới nhận số nguyên tiếp theo tự động.

| id | title |
| --- | --- |
| 1 | Inception |
| 2 | The Matrix |

Cột `id` là `SERIAL`. Bạn chỉ chèn `title`; PostgreSQL gán `id`.

## Ví dụ mẫu

```sql
INSERT INTO movies (title) VALUES ('Dune');
```

- `SERIAL` nghĩa là “tự đánh số cột này”.
- Bạn bỏ `id` khỏi danh sách cột và khỏi `VALUES`.
- Id tiếp theo sẽ là `3` cho `'Dune'`.

Sau khi chèn, một `SELECT` theo sau sẽ hiện hàng mới kèm id đã sinh. PostgreSQL hiện đại còn có `GENERATED … AS IDENTITY`; `SERIAL` là cách viết cổ điển bạn vẫn gặp nhiều.

## Lỗi thường gặp

- Tự ghi `id` khi bài yêu cầu để `SERIAL` điền.
- Dùng ngoặc kép cho tiêu đề (`"Dune"`) — chuỗi dùng ngoặc đơn.
- Chỉ chạy `SELECT` mà không `INSERT` — máy chấm tìm hàng mới.

## Thử ngay

Chèn phim với `title = 'Dune'` và để `SERIAL` tạo `id`.
