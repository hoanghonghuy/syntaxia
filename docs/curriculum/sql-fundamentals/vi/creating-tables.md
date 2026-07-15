---
id: sql-09-schema
track: sql-fundamentals
locale: vi
slug: creating-tables
title: Bảng và cột
order: 29
published: true
objectives:
  - Hiểu định nghĩa cột trong CREATE TABLE
  - INSERT vào bảng trống đã chuẩn bị sẵn
exercise:
  starter: "SELECT id, name FROM actors;"
  hints:
    - "Bảng actors trống đã có sẵn — bạn chỉ cần INSERT."
    - "Liệt kê cột (id, name) rồi VALUES với đúng kiểu."
    - "Thử: INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');"
  solution: "INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');"
  preview:
    columns: ["id", "name"]
    rows: []
  expected:
    columns: ["id", "name"]
    rows:
      - [1, "DiCaprio"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, name FROM actors ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE actors (id INT, name TEXT);"
---

Bảng là lưới có tên với các cột có kiểu — giống “dòng tiêu đề” của sheet, định nghĩa một lần.

```sql
CREATE TABLE actors (
  id INT,
  name TEXT
);
```

- `INT` nghĩa là số nguyên.
- `TEXT` nghĩa là chữ hoặc tên.
- Mỗi cột có tên và kiểu để cơ sở dữ liệu biết giá trị nào hợp lệ.

Hình dạng sau khi bạn thêm một dòng:

| id | name |
| --- | --- |
| 1 | DiCaprio |

Trong sandbox, bảng `actors` trống đã được tạo sẵn (cùng hình dạng như trên). Việc của bạn là thêm dòng đầu tiên bằng `INSERT`.

## Ví dụ mẫu

```sql
INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');
```

- Bạn không cần chạy `CREATE TABLE` ở đây — bảng đã có sẵn.
- `VALUES (1, 'DiCaprio')` điền `id` rồi `name` theo đúng thứ tự đó.

## Lỗi thường gặp

- Thử `CREATE TABLE actors` lần nữa — bảng đã tồn tại trong sandbox.
- Dùng ngoặc kép quanh tên (`"DiCaprio"`) thay vì ngoặc đơn.
- INSERT vào sai tên bảng (`movies` thay vì `actors`).

## Thử ngay

Thêm `(1, 'DiCaprio')` vào `actors`.
