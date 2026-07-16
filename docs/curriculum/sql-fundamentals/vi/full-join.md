---
id: sql-22-full-join
track: sql-fundamentals
locale: vi
slug: full-join
title: Ghép cả hai phía với FULL OUTER JOIN
order: 22
published: true
objectives:
  - Giữ dòng không khớp từ cả hai bảng với FULL OUTER JOIN
  - Nhận phần thừa mỗi phía bằng kiểm tra NULL
  - Tìm khách không có đơn bằng IS NULL sau join
exercise:
  starter: "SELECT name FROM customers;"
  hints:
    - "FULL OUTER JOIN giữ dòng khớp và dòng chỉ khớp một phía."
    - "Khách không có đơn sẽ có orders.id là NULL sau join."
    - "Thử: SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
  solution: "SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Ann"]
      - [2, "Bob"]
      - [3, "Cara"]
  expected:
    columns: ["name"]
    rows:
      - ["Bob"]
      - ["Cara"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE customers (id INT, name TEXT);"
    - "CREATE TEMP TABLE orders (id INT, customer_id INT, amount INT);"
    - "INSERT INTO customers VALUES (1, 'Ann'), (2, 'Bob'), (3, 'Cara');"
    - "INSERT INTO orders VALUES (1, 1, 50), (2, 99, 20);"
---

`LEFT JOIN` giữ bảng trái; `RIGHT JOIN` giữ bảng phải. `FULL OUTER JOIN` giữ **cả hai**: khớp cộng phần thừa mỗi phía. Hãy nghĩ tới việc gộp hai danh bạ mà vẫn thấy tên chỉ xuất hiện ở một danh sách.

**customers** (bảng đầy đủ)

| id | name |
| --- | --- |
| 1 | Ann |
| 2 | Bob |
| 3 | Cara |

**orders** (bảng đầy đủ)

| id | customer_id | amount |
| --- | --- | --- |
| 1 | 1 | 50 |
| 2 | 99 | 20 |

| Phía | Điều gì xảy ra |
| --- | --- |
| Ann + đơn 1 | khớp |
| Bob, Cara | chỉ khách → cột đơn `NULL` |
| đơn 2 (`customer_id` 99) | chỉ đơn → cột khách `NULL` |

## Ví dụ mẫu

```sql
SELECT customers.name, orders.id AS order_id, orders.amount
FROM customers
FULL OUTER JOIN orders ON customers.id = orders.customer_id
ORDER BY customers.name, orders.id;
```

- Ann khớp đơn `1`.
- Bob và Cara không có đơn, nên `orders.id` là `NULL`.
- Đơn `2` trỏ khách `99` không tồn tại — tên khách là `NULL`.
- `WHERE orders.id IS NULL` trả khách chưa từng đặt hàng (Bob và Cara).

Kết quả join đầy đủ (trước khi lọc):

| name | order_id | amount |
| --- | --- | --- |
| Ann | 1 | 50 |
| Bob |  |  |
| Cara |  |  |
|  | 2 | 20 |

Khách không có đơn:

| name |
| --- |
| Bob |
| Cara |

## Lỗi thường gặp

- Dùng `INNER JOIN` khi cần dòng không khớp từ cả hai phía.
- Viết `FULL JOIN` mà không hiểu nó cùng ý với `FULL OUTER JOIN` trong PostgreSQL.
- Lọc bằng `= NULL` thay vì `IS NULL`.

## Thử ngay

Liệt kê `name` mọi khách không có đơn khớp. Sắp theo `customers.name`.
