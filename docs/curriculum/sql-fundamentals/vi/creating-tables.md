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
  - Khớp danh sách cột INSERT với kiểu dữ liệu
  - INSERT vào bảng trống đã chuẩn bị sẵn
exercise:
  starter: "SELECT id, name FROM actors;"
  hints:
    - "Bảng actors trống đã tồn tại — bạn chỉ cần INSERT."
    - "Liệt kê cột (id, name) rồi VALUES với kiểu khớp."
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

Bảng là lưới có tên với cột có kiểu — “dòng tiêu đề” của spreadsheet, định nghĩa một lần.

```sql
CREATE TABLE actors (
  id INT,
  name TEXT
);
```

| Phần | Ý nghĩa |
| --- | --- |
| `actors` | tên bảng |
| `id INT` | cột số nguyên |
| `name TEXT` | cột chữ |

Trong sandbox, bảng `actors` trống đã được tạo sẵn (cùng hình dạng). Việc của bạn là thêm dòng đầu bằng `INSERT`.

**actors** (trước khi insert)

| id | name |
| --- | --- |
|  |  |

**actors** (sau khi insert thành công)

| id | name |
| --- | --- |
| 1 | DiCaprio |

## Ví dụ mẫu

```sql
INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');
```

- Bạn không cần chạy `CREATE TABLE` ở đây — đã làm sẵn.
- `(id, name)` liệt kê cột bạn điền.
- `VALUES (1, 'DiCaprio')` điền `id` rồi `name` theo thứ tự đó.
- Giá trị chữ dùng dấu nháy **đơn**.

## Lỗi thường gặp

- Thử `CREATE TABLE actors` lần nữa — bảng đã tồn tại trong sandbox.
- Dùng nháy kép quanh tên (`"DiCaprio"`) thay vì nháy đơn.
- Insert vào sai tên bảng (`movies` thay vì `actors`).
- Muốn UNIQUE / CHECK / DEFAULT trên cột — xem bài sau `table-constraints`.

## Thử ngay

Insert `(1, 'DiCaprio')` vào `actors`.
