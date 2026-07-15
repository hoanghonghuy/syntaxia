---
id: sql-14-sumavg
track: sql-fundamentals
locale: vi
slug: sum-and-avg
title: Tổng và trung bình với SUM và AVG
order: 14
published: true
objectives:
  - Cộng các số trong cột bằng SUM
  - Hiểu AVG là trung bình của một cột
exercise:
  starter: "SELECT amount FROM sales;"
  hints:
    - "SUM cộng mọi giá trị trong cột số."
    - "Đặt tên kết quả bằng AS total để khớp cột mong đợi."
    - "Thử: SELECT SUM(amount) AS total FROM sales;"
  solution: "SELECT SUM(amount) AS total FROM sales;"
  preview:
    columns: ["id", "amount"]
    rows:
      - [1, 10]
      - [2, 20]
      - [3, 30]
  expected:
    columns: ["total"]
    rows:
      - [60]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE sales (id INT, amount INT);"
    - "INSERT INTO sales VALUES (1, 10), (2, 20), (3, 30);"
---

Khi cột chứa số tiền, bạn thường cần tổng hoặc trung bình — giống cộng một cột Excel hoặc lấy mean.

| id | amount |
| --- | --- |
| 1 | 10 |
| 2 | 20 |
| 3 | 30 |

## Ví dụ mẫu

```sql
SELECT SUM(amount) AS total, AVG(amount) AS average FROM sales;
```

- `SUM(amount)` cộng `10 + 20 + 30` → `60`.
- `AVG(amount)` chia tổng đó cho số hàng → `20`.
- Mỗi hàm tổng hợp trả về một giá trị cho cả bảng (trừ khi sau này dùng `GROUP BY`).

Kết quả:

| total | average |
| --- | --- |
| 60 | 20 |

## Lỗi thường gặp

- Chọn `amount` cạnh `SUM(amount)` mà không nhóm — cột thường và hàm tổng hợp không trộn kiểu đó.
- Nhầm `SUM` (cộng hết) với `COUNT` (đếm số hàng).
- Quên `AS total` khi bài yêu cầu đúng tên cột đó.

## Thử ngay

Cộng mọi `amount` trong `sales`. Trả về một cột tên `total`.
