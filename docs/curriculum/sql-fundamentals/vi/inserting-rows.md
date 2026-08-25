---
id: sql-06-insert
track: sql-fundamentals
locale: vi
slug: inserting-rows
title: Thêm hàng với INSERT
order: 9
published: true
can_do: "Chèn một hàng mới bằng cách ánh xạ danh sách cột với VALUES tương ứng và kiểm tra trạng thái bảng sau đó"
objectives:
  - Phân biệt đọc dữ liệu với thay đổi trạng thái lưu trữ
  - Ánh xạ cột của INSERT với VALUES theo vị trí
  - Kiểm tra bảng sau một thao tác thay đổi dữ liệu
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "Bảng cần thêm một hàng, vì vậy dùng INSERT chứ không phải SELECT."
    - "Liệt kê id, title, year và cung cấp đúng một giá trị cho mỗi cột theo cùng thứ tự."
    - "Dùng: INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  solution: "INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

Đến đây, kết quả truy vấn có thể thay đổi nhưng bảng được lưu vẫn giữ nguyên. `INSERT` khác: nó thay đổi trạng thái bảng bằng cách thêm một hàng mới.

## Mô hình tư duy

Hãy coi INSERT là phép ánh xạ từ **các cột được nêu tên** sang **các giá trị mới**.

**Trước khi chèn**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

Hàng cần thêm:

| id | title | year |
| --- | --- | --- |
| 3 | Dune | 2021 |

Danh sách cột và danh sách giá trị khớp nhau theo vị trí:

| Vị trí | Cột | Giá trị |
| ---: | --- | --- |
| 1 | `id` | `3` |
| 2 | `title` | `'Dune'` |
| 3 | `year` | `2021` |

## Dự đoán trước khi chạy

```sql
INSERT INTO movies (id, title, year)
VALUES (3, 'Dune', 2021);
```

Hãy dự đoán chuyển đổi trạng thái:

- số hàng: **2 -> 3**
- các hàng cũ: giữ nguyên
- hàng mới: `(3, 'Dune', 2021)`

INSERT không cần trả toàn bộ bảng thì thay đổi mới tồn tại. Sandbox sẽ dùng một SELECT riêng để kiểm tra trạng thái mới.

## Ví dụ mẫu

```sql
INSERT INTO movies (id, title, year)
VALUES (3, 'Dune', 2021);
```

**Sau khi chèn**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |
| 3 | Dune | 2021 |

Checker chạy `SELECT id, title, year FROM movies ORDER BY id;` sau statement của bạn. Đây là thói quen quan trọng khi làm database: **thay đổi, rồi kiểm tra trạng thái kết quả**.

## Tìm lỗi

Câu này sai ở đâu?

```sql
INSERT INTO movies (id, title, year)
VALUES ('Dune', 3, 2021);
```

Giá trị khớp với cột theo vị trí. Câu trên đang cố đưa `'Dune'` vào `id` và `3` vào `title`. Phải giữ ánh xạ cột/giá trị đúng thứ tự.

## Lỗi thường gặp

- Dùng ngoặc kép cho giá trị text; chuỗi SQL dùng ngoặc đơn như `'Dune'`.
- Cung cấp giá trị sai thứ tự so với danh sách cột đã nêu.
- Chỉ chạy SELECT rồi mong dữ liệu lưu trữ tự được thêm.

## Thử ngay

Chèn `id = 3`, `title = 'Dune'`, `year = 2021`. Trước khi chạy, trace ba cặp cột/giá trị và dự đoán số hàng cuối cùng.

## Tự kiểm tra

Cách đơn giản nhất để xác nhận INSERT đã tạo trạng thái đúng là gì?

**Đáp án:** chạy SELECT đọc lại hàng/bảng bị ảnh hưởng sau thao tác. Verifier của sandbox làm bước này tự động.
