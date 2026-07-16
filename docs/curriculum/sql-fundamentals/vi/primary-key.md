---
id: sql-32-pk
track: sql-fundamentals
locale: vi
slug: primary-key
title: Khóa chính
order: 32
published: true
objectives:
  - Giải thích PRIMARY KEY làm gì
  - Insert một dòng tôn trọng khóa chính
  - Thấy vì sao id trùng bị từ chối
exercise:
  starter: "INSERT INTO actors (id, name) VALUES "
  hints:
    - "Khóa chính định danh duy nhất mỗi dòng — thường là id."
    - "Insert một dòng với id duy nhất và một name."
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

**Khóa chính** (primary key) là cột (hoặc tập cột) định danh duy nhất mỗi dòng — như mã nhân viên không được trùng.

```sql
CREATE TABLE actors (
  id INT PRIMARY KEY,
  name TEXT
);
```

| Quy tắc | Ý nghĩa |
| --- | --- |
| Unique | hai dòng không chung một `id` |
| Not null | mọi dòng cần có `id` |
| Lookup | database dùng khóa để tìm dòng nhanh và nối bảng sau này |

Bảng `actors` trống trong sandbox (đã tạo với khóa chính trên `id`):

| id | name |
| --- | --- |
|  |  |

Sau insert hợp lệ:

| id | name |
| --- | --- |
| 1 | Ada |

Nhiệm vụ không phải tạo khóa — khóa đã có. Hãy insert một dòng hợp lệ.

## Ví dụ mẫu

```sql
INSERT INTO actors (id, name) VALUES (1, 'Ada');
```

- `id = 1` thỏa khóa chính (duy nhất và không null).
- Insert lần hai với `id = 1` sẽ thất bại — trùng khóa.
- `name` là chữ thường; không phải khóa chính ở đây.

## Lỗi thường gặp

- Insert cùng `id` hai lần — khóa chính từ chối trùng.
- Bỏ `id` hoặc đặt `NULL` — khóa chính cần giá trị.
- Thử `ALTER` hoặc tạo lại bảng — sandbox đã định nghĩa khóa.
- Các quy tắc cột khác (UNIQUE, CHECK, DEFAULT) nằm ở bài `table-constraints`.

## Thử ngay

Insert actor `id = 1`, `name = 'Ada'` vào `actors`.
