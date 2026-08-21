---
id: pg-00-types
track: postgresql
locale: vi
slug: postgresql-types
title: Đọc kiểu cột PostgreSQL
order: 0
published: true
can_do: "Đọc schema PostgreSQL như hợp đồng kiểu dữ liệu và kiểm tra kiểu runtime của biểu thức được lưu"
objectives:
  - Phân biệt INTEGER, TEXT, NUMERIC và BOOLEAN theo ý nghĩa dữ liệu
  - Đọc kiểu cột như một phần của hợp đồng dữ liệu
  - Kiểm tra kiểu biểu thức bằng pg_typeof của PostgreSQL
exercise:
  starter: "SELECT name, price FROM catalog;"
  hints:
    - "Bài này hỏi PostgreSQL nhìn thấy kiểu gì, không phải lọc product."
    - "pg_typeof(expression)::text trả tên kiểu PostgreSQL dễ đọc."
    - "Dùng pg_typeof cho id, name, price, in_stock, đặt bốn alias và LIMIT 1."
  solution: "SELECT pg_typeof(id)::text AS id_type, pg_typeof(name)::text AS name_type, pg_typeof(price)::text AS price_type, pg_typeof(in_stock)::text AS stock_type FROM catalog LIMIT 1;"
  preview:
    columns: ["id", "name", "price", "in_stock"]
    rows:
      - [1, "Notebook", 13.50, true]
      - [2, "Pencil", 1.25, false]
  expected:
    columns: ["id_type", "name_type", "price_type", "stock_type"]
    rows:
      - ["integer", "text", "numeric", "boolean"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE catalog (id INTEGER, name TEXT, price NUMERIC(8,2), in_stock BOOLEAN);"
    - "INSERT INTO catalog VALUES (1, 'Notebook', 13.50, true), (2, 'Pencil', 1.25, false);"
---

Kiểu dữ liệu PostgreSQL là một phần của mô hình dữ liệu. Nó nói cho database và người phát triển sau này biết giá trị mang ý nghĩa gì và những phép toán nào hợp lý.

## Mô hình tư duy

Xem schema như hợp đồng về kiểu:

| cột | kiểu PostgreSQL | mô hình hóa |
| --- | --- | --- |
| `id` | `INTEGER` | định danh số nguyên |
| `name` | `TEXT` | văn bản độ dài biến đổi |
| `price` | `NUMERIC(8,2)` | số thập phân chính xác |
| `in_stock` | `BOOLEAN` | true / false / unknown (`NULL`) |

PostgreSQL còn có `pg_typeof(expression)` để kiểm tra kiểu mà server đã gán cho một biểu thức.

## Dự đoán trước khi chạy

Từ schema trên, dự đoán bốn tên kiểu PostgreSQL trả về: `integer`, `text`, `numeric`, `boolean`.

## Ví dụ mẫu

```sql
SELECT
  pg_typeof(id)::text AS id_type,
  pg_typeof(name)::text AS name_type,
  pg_typeof(price)::text AS price_type,
  pg_typeof(in_stock)::text AS stock_type
FROM catalog
LIMIT 1;
```

| id_type | name_type | price_type | stock_type |
| --- | --- | --- | --- |
| integer | text | numeric | boolean |

`NUMERIC(8,2)` vẫn báo base type là `numeric`; precision và scale là modifier trong định nghĩa cột.

## Tìm lỗi

Nếu tiền được lưu bằng `TEXT`, việc so sánh và tính toán không còn biểu đạt domain rõ ràng. Giá trị *trông giống số* không đồng nghĩa cột đã được mô hình hóa bằng kiểu số.

```sql
CREATE TABLE bad_catalog (price TEXT);
```

Schema hợp lệ về cú pháp nhưng là hợp đồng kém nếu price cần cộng, so sánh và kiểm tra như số thập phân.

## Lỗi thường gặp

- Chọn kiểu chỉ dựa vào cách giá trị hiển thị thay vì ý nghĩa và thao tác cần có.
- Lưu giá trị tiền tệ thập phân chính xác dưới dạng text tùy ý.
- Nghĩ literal có dấu nháy và giá trị đã typed luôn thay thế nhau trong mọi ngữ cảnh.

## Thử ngay

Dùng `pg_typeof` kiểm tra kiểu runtime của `id`, `name`, `price`, `in_stock` và trả bốn alias được yêu cầu.

## Tự kiểm tra

Vì sao database type không chỉ là định dạng hiển thị?

**Đáp án:** vì nó xác định semantics dữ liệu và các phép toán, so sánh, constraint PostgreSQL có thể áp dụng đúng.
