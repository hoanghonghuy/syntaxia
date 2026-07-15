---
id: sql-30-alter
track: sql-fundamentals
locale: vi
slug: alter-table
title: Đổi bảng với ALTER TABLE
order: 30
published: true
objectives:
  - Thêm cột bằng ALTER TABLE
  - Xác nhận cột mới đã xuất hiện trên bảng
exercise:
  starter: "ALTER TABLE movies ADD COLUMN "
  hints:
    - "ALTER TABLE thay đổi bảng có sẵn mà không tạo lại từ đầu."
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

Bảng thay đổi theo thời gian. `ALTER TABLE` thêm (hoặc chỉnh) cột trên bảng đã có — như chèn thêm tiêu đề vào sheet mà không làm lại từ đầu.

Hình dạng ban đầu:

| id | title |
| --- | --- |
|  |  |

Sau khi thêm `year`, bảng có thể lưu năm phát hành.

## Ví dụ mẫu

```sql
ALTER TABLE movies ADD COLUMN year INT;
```

- `ALTER TABLE movies` chỉ rõ bảng cần đổi.
- `ADD COLUMN year INT` tạo cột mới tên `year` chứa số nguyên.
- Các dòng cũ nhận `NULL` ở cột mới cho đến khi bạn điền.

Sandbox sẽ INSERT một dòng mẫu rồi kiểm tra cột `year`.

## Lỗi thường gặp

- Viết `CREATE TABLE` lần nữa thay vì `ALTER TABLE` — bảng đã tồn tại.
- Quên kiểu (`ADD COLUMN year` thiếu `INT`).
- Dùng sai tên bảng (`actors` thay vì `movies`).

## Thử ngay

Thêm cột số nguyên tên `year` vào `movies`.
