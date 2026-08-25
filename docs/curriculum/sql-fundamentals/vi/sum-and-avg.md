---
id: sql-14-sumavg
track: sql-fundamentals
locale: vi
slug: sum-and-avg
title: Tổng và trung bình với SUM và AVG
order: 14
published: true
can_do: "Rút gọn nhiều hàng số thành tổng hoặc trung bình cộng bằng SUM và AVG"
objectives:
  - Trace cách SUM kết hợp các giá trị số
  - Giải thích AVG như một tóm tắt trên các giá trị số không NULL
  - Phân biệt tổng với số lượng
exercise:
  starter: "SELECT amount FROM sales;"
  hints:
    - "Đề cần một tổng duy nhất, vì vậy aggregate cột amount thay vì liệt kê nó."
    - "Dùng SUM(amount) và đặt tên kết quả total."
    - "Dùng: SELECT SUM(amount) AS total FROM sales;"
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

Tổng và trung bình trả lời hai câu hỏi khác nhau trên cùng một tập số. Kỹ năng cần có là nhìn yêu cầu và xác định đúng loại tóm tắt.

## Mô hình tư duy

**sales**

| product | amount |
| --- | ---: |
| Ticket | 10 |
| Snack | 20 |
| Poster | 30 |
| Program | 15 |

Trace hai phép rút gọn:

- `SUM(amount)` -> `10 + 20 + 30 + 15` -> **75**
- `AVG(amount)` -> `75 / 4` -> **18.75**

Giống các aggregate không GROUP BY khác, mỗi biểu thức trả một giá trị tóm tắt cho toàn bộ đầu vào. Các aggregate SQL như SUM và AVG bỏ qua đầu vào NULL thay vì coi NULL là số 0.

## Dự đoán trước khi chạy

```sql
SELECT SUM(amount) AS total
FROM sales;
```

Dự đoán: một cột, một hàng, giá trị **75**. Nếu đổi `SUM` thành `COUNT`, câu hỏi đã khác: có bốn hàng chứ không phải tổng 75.

## Ví dụ mẫu

```sql
SELECT SUM(amount) AS total,
       AVG(amount) AS average
FROM sales;
```

| total | average |
| ---: | ---: |
| 75 | 18.75 |

Bài tập chỉ yêu cầu tóm tắt thứ nhất, tên `total`.

## Tìm lỗi

Vì sao câu này không nhất quán về mức dữ liệu nếu chưa GROUP BY?

```sql
SELECT product, SUM(amount)
FROM sales;
```

`product` yêu cầu giá trị cấp hàng, còn `SUM(amount)` yêu cầu một tóm tắt cho cả tập. Bài `GROUP BY` sau này sẽ dạy cách tạo một aggregate cho mỗi nhóm. Hiện tại, aggregate toàn bảng mà không đặt cột hàng thông thường bên cạnh.

## Lỗi thường gặp

- Dùng COUNT khi đề yêu cầu cộng các giá trị số.
- Trộn cột cấp hàng với aggregate toàn bảng khi chưa có quy tắc nhóm.
- Coi giá trị số bị thiếu là 0; aggregate thường bỏ qua đầu vào NULL.

## Thử ngay

Trả về tổng mọi `amount` dưới một cột tên `total`. Hãy tự cộng trước khi chạy.

## Tự kiểm tra

`SUM(amount)` trả lời câu hỏi gì mà `COUNT(*)` không trả lời?

**Đáp án:** SUM trả lời “các giá trị số cộng lại bằng bao nhiêu?”, còn COUNT trả lời “có bao nhiêu hàng?”.
