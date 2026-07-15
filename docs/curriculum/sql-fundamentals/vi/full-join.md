---
id: sql-22-full-join
track: sql-fundamentals
locale: vi
slug: full-join
title: Ghép cả hai phía với FULL OUTER JOIN
order: 22
published: true
objectives:
  - Giữ dòng không khớp từ cả hai bảng bằng FULL OUTER JOIN
  - Tìm khách không có đơn bằng IS NULL sau khi join
exercise:
  starter: "SELECT name FROM customers;"
  hints:
    - "FULL OUTER JOIN giữ dòng khớp và dòng chỉ khớp một phía."
    - "Khách không có đơn sẽ có orders.id là NULL sau khi join."
    - "Thử: SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
  solution: "SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
  preview:
    columns: ["customers.name", "orders.id"]
    rows:
      - ["Ann", 1]
      - ["Bob", null]
  expected:
    columns: ["name"]
    rows:
      - ["Bob"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE customers (id INT, name TEXT);"
    - "CREATE TEMP TABLE orders (id INT, customer_id INT);"
    - "INSERT INTO customers VALUES (1, 'Ann'), (2, 'Bob');"
    - "INSERT INTO orders VALUES (1, 1);"
---

`LEFT JOIN` giữ bảng trái; `RIGHT JOIN` giữ bảng phải. `FULL OUTER JOIN` giữ **cả hai**: phần khớp cộng phần thừa từ mỗi phía. Hãy nghĩ như gộp hai danh bạ mà vẫn thấy tên chỉ xuất hiện ở một danh sách.

**customers**

| id | name |
| --- | --- |
| 1 | Ann |
| 2 | Bob |

**orders**

| id | customer_id |
| --- | --- |
| 1 | 1 |

## Ví dụ mẫu

```sql
SELECT customers.name, orders.id AS order_id
FROM customers
FULL OUTER JOIN orders ON customers.id = orders.customer_id
ORDER BY customers.name;
```

- Ann khớp đơn `1`.
- Bob không có đơn, nên `orders.id` là `NULL`.
- `WHERE orders.id IS NULL` trả về khách chưa từng đặt hàng.

Kết quả join đầy đủ (trước khi lọc):

| name | order_id |
| --- | --- |
| Ann | 1 |
| Bob |  |

## Lỗi thường gặp

- Dùng `INNER JOIN` khi cần dòng không khớp từ một trong hai phía.
- Viết `FULL JOIN` mà không biết trong PostgreSQL nó cùng ý với `FULL OUTER JOIN`.
- Lọc bằng `= NULL` thay vì `IS NULL`.

## Thử ngay

Liệt kê `name` của mọi khách không có đơn khớp. Sắp xếp theo `customers.name`.
