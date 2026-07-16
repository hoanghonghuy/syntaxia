---
id: sql-30-alter
track: sql-fundamentals
locale: vi
slug: alter-table
title: Đổi bảng với ALTER TABLE
order: 30
published: true
objectives:
  - Thêm cột bằng ALTER TABLE … ADD COLUMN
  - Chọn kiểu cho cột mới
  - Xác nhận cột mới tồn tại trên bảng
exercise:
  starter: "ALTER TABLE movies ADD COLUMN "
  hints:
    - "ALTER TABLE đổi bảng đã có mà không cần tạo lại."
    - "ADD COLUMN đặt tên cột mới và kiểu của nó."
    - "Thử: ALTER TABLE movies ADD COLUMN year INT;"
  solution: "ALTER TABLE movies ADD COLUMN year INT;"
  preview:
    columns: ["id", "title"]
    rows: []
  expected:
    columns: ["n"]
    rows:
      - [1]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT COUNT(*)::int AS n FROM information_schema.columns WHERE table_name = 'movies' AND column_name = 'year';"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT);"
---

Bảng thay đổi theo thời gian. `ALTER TABLE` thêm (hoặc chỉnh) cột trên bảng đã có — như chèn thêm tiêu đề vào spreadsheet mà không bắt đầu lại.

**movies** (hình dạng ban đầu)

| id | title |
| --- | --- |
|  |  |

| Bước | Hình dạng |
| --- | --- |
| Trước | `id`, `title` |
| Sau `ADD COLUMN year INT` | `id`, `title`, `year` |

Dòng sẵn có sẽ nhận `NULL` ở `year` cho đến khi bạn điền. Sandbox này bắt đầu trống và kiểm tra cột tên `year` có tồn tại.

## Ví dụ mẫu

```sql
ALTER TABLE movies ADD COLUMN year INT;
```

- `ALTER TABLE movies` chỉ định bảng cần đổi.
- `ADD COLUMN year INT` tạo cột mới `year` chứa số nguyên.
- Bạn không tạo lại bảng bằng `CREATE TABLE` — bạn mở rộng nó.

## Lỗi thường gặp

- Viết `CREATE TABLE` lần nữa thay vì `ALTER TABLE` — bảng đã tồn tại.
- Quên kiểu (`ADD COLUMN year` thiếu `INT`).
- Sai tên bảng (`actors` thay vì `movies`).

## Thử ngay

Thêm cột số nguyên tên `year` vào `movies`.
