---
id: sql-09-schema
track: sql-fundamentals
locale: vi
slug: creating-tables
title: Bảng và cột
order: 29
published: true
can_do: "Đọc CREATE TABLE như một hợp đồng dữ liệu và chèn giá trị đúng với cột và kiểu đã khai báo"
objectives:
  - Đọc định nghĩa bảng, cột và kiểu dữ liệu
  - Phân biệt schema với các hàng dữ liệu nằm trong schema đó
  - Chèn một hàng thỏa cấu trúc bảng đã chuẩn bị
exercise:
  starter: "SELECT id, name FROM actors;"
  hints:
    - "Bảng actors đã tồn tại; hãy đọc schema rồi chèn một hàng đúng cấu trúc."
    - "Thứ tự cột là id INT, name TEXT."
    - "Dùng: INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');"
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

Một bảng không chỉ là lưới giá trị. **Schema** là hợp đồng mô tả bảng có những cột nào và mỗi cột nhận loại dữ liệu gì.

## Mô hình tư duy

```sql
CREATE TABLE actors (
  id INT,
  name TEXT
);
```

Hãy đọc định nghĩa trước khi nghĩ đến dữ liệu:

| Phần schema | Hợp đồng |
| --- | --- |
| `actors` | tên bảng |
| `id INT` | `id` nhận số nguyên |
| `name TEXT` | `name` nhận văn bản |

Schema và data là hai lớp khác nhau:

| Lớp | Ví dụ | Thay đổi bằng |
| --- | --- | --- |
| cấu trúc | cột `id`, `name` | `CREATE/ALTER/DROP` |
| dữ liệu | hàng `(1, 'DiCaprio')` | `INSERT/UPDATE/DELETE` |

Sandbox đã tạo sẵn bảng rỗng để bài này tập trung vào việc dùng đúng hợp đồng.

## Dự đoán trước khi chạy

Nếu chèn `(1, 'DiCaprio')`, `SELECT id, name FROM actors` sẽ trả một hàng: số nguyên trong `id` và text trong `name`.

## Ví dụ mẫu

```sql
INSERT INTO actors (id, name)
VALUES (1, 'DiCaprio');
```

| id | name |
| ---: | --- |
| 1 | DiCaprio |

Danh sách cột tường minh giúp nhìn rõ mỗi giá trị đi vào đâu và tránh phụ thuộc vào thứ tự cột ngầm định.

## Tìm lỗi

```sql
INSERT INTO actors (id, name)
VALUES ('DiCaprio', 1);
```

Hai giá trị bị đảo so với schema. Khi debug INSERT, hãy ghép từng cột đích với giá trị và kiểu tương ứng trước khi chạy.

## Lỗi thường gặp

- Coi schema và dữ liệu là một thứ.
- Bỏ danh sách cột rồi mất dấu giá trị nào thuộc cột nào.
- Đưa text vào cột cần số hoặc ngược lại.

## Thử ngay

Chèn actor `id = 1`, `name = 'DiCaprio'`. Trước khi chạy, hãy ghép từng giá trị với cột schema mà nó phải thỏa.

## Tự kiểm tra

`INSERT` có thay đổi schema của bảng không?

**Đáp án:** không. Nó thêm dữ liệu phải tuân theo schema đã có.
