---
id: sql-14-sumavg
track: sql-fundamentals
locale: vi
slug: sum-and-avg
title: Tổng và trung bình với SUM và AVG
order: 14
published: true
objectives:
  - Cộng số trong cột bằng SUM
  - Hiểu AVG là trung bình của cột
exercise:
  starter: "SELECT amount FROM sales;"
  hints:
    - "SUM cộng mọi giá trị trong cột số."
    - "Đặt tên kết quả bằng AS total để khớp cột mong đợi."
    - "Thử: SELECT SUM(amount) AS total FROM sales;"
  solution: "SELECT SUM(amount) AS total FROM sales;"
  preview:
    columns: ["id", "product", "amount"]
    rows:
      - [1, "Ticket", 10]
      - [2, "Snack", 20]
      - [3, "Poster", 30]
      - [4, "Program", 15]
  expected:
    columns: ["total"]
    rows:
      - [75]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE sales (id INT, product TEXT, amount INT);"
    - "INSERT INTO sales VALUES (1, 'Ticket', 10), (2, 'Snack', 20), (3, 'Poster', 30), (4, 'Program', 15);"
---

Khi cột chứa số tiền, bạn thường muốn tổng hoặc trung bình — như cộng một cột spreadsheet hoặc lấy trung bình.

**sales** (bảng đầy đủ)

| id | product | amount |
| --- | --- | --- |
| 1 | Ticket | 10 |
| 2 | Snack | 20 |
| 3 | Poster | 30 |
| 4 | Program | 15 |

Các số: `10 + 20 + 30 + 15` = **75**. Trung bình sẽ là `75 / 4` = **18.75**.

## Ví dụ mẫu

```sql
SELECT SUM(amount) AS total, AVG(amount) AS average FROM sales;
```

- `SUM(amount)` cộng mọi amount → `75`.
- `AVG(amount)` chia tổng đó cho số hàng → `18.75`.
- Mỗi hàm tổng hợp trả một giá trị cho cả bảng (trừ khi sau này dùng `GROUP BY`).

Kết quả:

| total | average |
| --- | --- |
| 75 | 18.75 |

Bài tập của bạn chỉ yêu cầu `SUM` tên `total`.

## Lỗi thường gặp

- Chọn `amount` cạnh `SUM(amount)` mà không nhóm — cột thường và hàm tổng hợp không trộn kiểu đó.
- Nhầm `SUM` (cộng tất cả) với `COUNT` (bao nhiêu hàng).
- Quên `AS total` khi đề đòi đúng tên cột đó.

## Thử ngay

Cộng mọi `amount` trong `sales`. Trả về một cột tên `total`.
