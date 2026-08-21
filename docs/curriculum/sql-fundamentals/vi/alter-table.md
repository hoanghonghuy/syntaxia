---
id: sql-30-alter
track: sql-fundamentals
locale: vi
slug: alter-table
title: Thay đổi bảng với ALTER TABLE
order: 30
published: true
can_do: "Tiến hóa schema của bảng đang tồn tại bằng ALTER TABLE và dự đoán cấu trúc sau thay đổi"
objectives:
  - Phân biệt thay đổi schema với thay đổi hàng dữ liệu
  - Thêm cột có kiểu bằng ALTER TABLE
  - Kiểm tra cấu trúc bảng sau thay đổi
exercise:
  starter: "ALTER TABLE movies ADD COLUMN "
  hints:
    - "Bảng đã tồn tại; hãy đổi schema thay vì tạo lại bảng."
    - "ADD COLUMN cần cả tên cột và kiểu dữ liệu."
    - "Dùng: ALTER TABLE movies ADD COLUMN year INT;"
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

Ứng dụng thay đổi theo thời gian nên schema cũng phải tiến hóa. `ALTER TABLE` thay đổi hợp đồng của bảng đang tồn tại thay vì giả vờ đó là một bảng hoàn toàn mới.

## Mô hình tư duy

Trước:

| column | type |
| --- | --- |
| id | INT |
| title | TEXT |

Biến đổi:

```text
schema hiện tại + ADD COLUMN year INT -> schema mới
```

Sau:

| column | type |
| --- | --- |
| id | INT |
| title | TEXT |
| year | INT |

Nếu bảng đã có dữ liệu, cột nullable mới sẽ là `NULL` ở các hàng cũ cho đến khi được điền.

## Dự đoán trước khi chạy

`ALTER TABLE movies ADD COLUMN year INT;` chỉ đổi **cấu trúc**, không thêm hay xóa movie. Verifier hỏi catalog của database xem cột `year` có tồn tại đúng một lần hay không.

## Ví dụ mẫu

```sql
ALTER TABLE movies
ADD COLUMN year INT;
```

Câu lệnh thể hiện rõ bảng hiện tại, thao tác cấu trúc, tên cột mới và kiểu dữ liệu.

## Tìm lỗi

```sql
CREATE TABLE movies (year INT);
```

Đây không phải “thêm cột”; nó cố tạo một bảng khác cùng tên `movies`. Khi object đã tồn tại và cần đổi schema, hãy dùng `ALTER TABLE`.

## Lỗi thường gặp

- Tạo lại bảng thay vì alter bảng đang có.
- Quên kiểu dữ liệu của cột mới.
- Nhầm thay đổi schema với `UPDATE` giá trị của hàng.

## Thử ngay

Thêm cột số nguyên `year` vào `movies`. Trước khi chạy, hãy dự đoán danh sách cột sau thay đổi.

## Tự kiểm tra

Lệnh nào đổi cấu trúc: `UPDATE movies SET ...` hay `ALTER TABLE movies ...`?

**Đáp án:** `ALTER TABLE` đổi cấu trúc; `UPDATE` đổi giá trị trong các hàng đã có.
