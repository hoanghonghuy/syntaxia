---
id: pg-11-upsert
track: postgresql
locale: vi
slug: upsert-on-conflict
title: Upsert với ON CONFLICT
order: 11
published: true
objectives:
  - Chèn hoặc cập nhật trong một câu với ON CONFLICT
  - Cập nhật hàng đã có khi khóa duy nhất trùng
exercise:
  starter: "SELECT code, title FROM movies ORDER BY code;"
  hints:
    - "ON CONFLICT nêu cột unique có thể đã tồn tại."
    - "DO UPDATE SET … đổi hàng cũ thay vì báo lỗi."
    - "Thử: INSERT INTO movies (code, title) VALUES ('INC', 'Inception Remastered') ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;"
  solution: "INSERT INTO movies (code, title) VALUES ('INC', 'Inception Remastered') ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;"
  preview:
    columns: ["code", "title"]
    rows:
      - ["INC", "Inception"]
      - ["MTX", "The Matrix"]
  expected:
    columns: ["code", "title"]
    rows:
      - ["INC", "Inception Remastered"]
      - ["MTX", "The Matrix"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT code, title FROM movies ORDER BY code;"
  ddl:
    - "CREATE TEMP TABLE movies (code TEXT PRIMARY KEY, title TEXT);"
    - "INSERT INTO movies VALUES ('INC', 'Inception'), ('MTX', 'The Matrix');"
---

Đôi khi bạn muốn “chèn nếu mới, không thì cập nhật” — như sửa ô nếu khóa đã có trong bảng. PostgreSQL gọi đó là **upsert**: `INSERT … ON CONFLICT … DO UPDATE`.

| code | title |
| --- | --- |
| INC | Inception |
| MTX | The Matrix |

`code` là duy nhất (primary key). Chèn lại `'INC'` thường sẽ lỗi; `ON CONFLICT` xử lý trường hợp đó.

## Ví dụ mẫu

```sql
INSERT INTO movies (code, title)
VALUES ('INC', 'Inception Remastered')
ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;
```

- `ON CONFLICT (code)` theo dõi cột unique `code`.
- `DO UPDATE` đổi hàng đã có thay vì báo lỗi.
- `EXCLUDED.title` là title từ hàng bạn vừa cố chèn.

Sau câu lệnh, `INC` hiện title mới; `MTX` không đổi.

## Lỗi thường gặp

- Bỏ `ON CONFLICT` nên khóa trùng gây lỗi.
- Quên `EXCLUDED.` khi tham chiếu giá trị đề xuất chèn.
- Chỉ chạy `UPDATE` khi bài yêu cầu dạng upsert.

## Thử ngay

Upsert mã `'INC'` với title `'Inception Remastered'` bằng `ON CONFLICT (code) DO UPDATE`.
