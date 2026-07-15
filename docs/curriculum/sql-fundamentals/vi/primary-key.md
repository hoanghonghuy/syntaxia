---
id: sql-32-pk
track: sql-fundamentals
locale: vi
slug: primary-key
title: Khóa chính (PRIMARY KEY)
order: 32
published: true
objectives:
  - Giải thích PRIMARY KEY làm gì
  - INSERT một dòng tuân thủ khóa chính
exercise:
  starter: "INSERT INTO actors (id, name) VALUES "
  hints:
    - "Khóa chính định danh duy nhất mỗi dòng — thường là id."
    - "Thêm một dòng với id duy nhất và một tên."
    - "Thử: INSERT INTO actors (id, name) VALUES (1, 'Ada');"
  solution: "INSERT INTO actors (id, name) VALUES (1, 'Ada');"
  preview:
    columns: ["id", "name"]
    rows: []
  expected:
    columns: ["id", "name"]
    rows:
      - [1, "Ada"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, name FROM actors ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE actors (id INT PRIMARY KEY, name TEXT);"
---

**Khóa chính** (primary key) là cột (hoặc nhóm cột) định danh duy nhất mỗi dòng — như mã nhân viên không được trùng.

```sql
CREATE TABLE actors (
  id INT PRIMARY KEY,
  name TEXT
);
```

- `PRIMARY KEY` trên `id` nghĩa là mỗi dòng cần một `id` khác null.
- Hai dòng không được chung một `id`.
- Cơ sở dữ liệu dùng khóa để tìm dòng nhanh và để nối bảng sau này.

Bảng `actors` trống trong sandbox (đã tạo sẵn với khóa chính trên `id`):

| id | name |
| --- | --- |
|  |  |

Bạn không cần tạo khóa — khóa đã có. Hãy INSERT một dòng hợp lệ.

## Ví dụ mẫu

```sql
INSERT INTO actors (id, name) VALUES (1, 'Ada');
```

- `id = 1` thỏa khóa chính (duy nhất và khác null).
- INSERT lần hai với `id = 1` sẽ lỗi — trùng khóa.
- `name` là chữ thường; ở đây nó không phải khóa chính.

## Lỗi thường gặp

- INSERT cùng một `id` hai lần — khóa chính từ chối trùng.
- Bỏ `id` hoặc để `NULL` — khóa chính bắt buộc có giá trị.
- Thử `ALTER` hoặc tạo lại bảng — sandbox đã định nghĩa khóa.

## Thử ngay

Thêm diễn viên `id = 1`, `name = 'Ada'` vào `actors`.
