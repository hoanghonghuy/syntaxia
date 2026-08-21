---
id: sql-22-full-join
track: sql-fundamentals
locale: vi
slug: full-join
title: Giữ cả hai phía với FULL OUTER JOIN
order: 22
published: true
can_do: "Giữ hàng không match từ cả hai input bằng FULL OUTER JOIN và xác định phía nào đang bị thiếu"
objectives:
  - Phân biệt cặp match, hàng chỉ bên trái và hàng chỉ bên phải
  - Đọc phần NULL ở cả hai phía full join
  - Lọc một loại hàng orphan bằng NULL check đúng phía
exercise:
  starter: "SELECT name FROM customers;"
  hints:
    - "FULL OUTER JOIN giữ cả customer và order kể cả khi một phía không match."
    - "Customer không có order sẽ có orders.id NULL; order orphan sẽ có cột customer NULL."
    - "Dùng: SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
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

FULL OUTER JOIN hữu ích khi đối soát: cần thấy cả match lẫn phần dư ở **cả hai** dataset thay vì chọn một phía được bảo toàn.

## Mô hình tư duy

Mọi kết quả join thuộc một trong ba loại:

| Loại | customer | order |
| --- | --- | --- |
| match | có | có |
| chỉ bên trái | có | NULL |
| chỉ bên phải | NULL | có |

Dataset này tạo: Ann + order 1; Bob và Cara chỉ bên trái; order 2 với `customer_id = 99` chỉ bên phải.

## Dự đoán trước khi chạy

Trước filter, full join có **4 hàng**. Hai NULL filter khác nhau cho hai câu hỏi khác nhau:

- `orders.id IS NULL` -> Bob, Cara.
- `customers.id IS NULL` -> order orphan trỏ customer 99.

## Ví dụ mẫu

```sql
SELECT customers.name
FROM customers
FULL OUTER JOIN orders
  ON customers.id = orders.customer_id
WHERE orders.id IS NULL
ORDER BY customers.name;
```

| name |
| --- |
| Bob |
| Cara |

Order orphan không vào kết quả vì `orders.id` của nó có giá trị; phía thiếu của hàng đó là `customers`.

## Tìm lỗi

Yêu cầu là customer chưa có order nhưng lại dùng `WHERE customers.id IS NULL`. Predicate này tìm loại dư ngược lại: order không có customer match.

## Lỗi thường gặp

- Coi FULL JOIN như mọi tổ hợp có thể; nó vẫn dựa trên quy tắc `ON`.
- Check NULL sai phía và lấy nhầm loại orphan.
- Đổi sang INNER JOIN khiến mọi hàng không match biến mất.

## Thử ngay

Trả customer không có order, sắp theo name. Hãy phân loại bốn outcome của full join trước khi filter.

## Tự kiểm tra

Hàng có cột customer NULL nhưng cột order có dữ liệu biểu diễn gì?

**Đáp án:** một order bên phải không tìm được customer match.
