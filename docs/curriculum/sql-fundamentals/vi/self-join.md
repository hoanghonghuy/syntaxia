---
id: sql-23-self-join
track: sql-fundamentals
locale: vi
slug: self-join
title: Join một bảng với chính nó
order: 23
published: true
can_do: "Dùng hai alias cho cùng một bảng để liên hệ các hàng đang đóng vai trò khác nhau"
objectives:
  - Xem một bảng vật lý như hai input logic
  - Match employee.manager_id với manager.id
  - Dự đoán hàng biến mất trong INNER self-join
exercise:
  starter: "SELECT name FROM employees;"
  hints:
    - "Cùng bảng cần hai vai trò: employee e và manager m."
    - "Nối e.manager_id với m.id."
    - "Dùng: SELECT e.name AS employee, m.name AS manager FROM employees e INNER JOIN employees m ON e.manager_id = m.id ORDER BY e.name;"
  solution: "SELECT e.name AS employee, m.name AS manager FROM employees e INNER JOIN employees m ON e.manager_id = m.id ORDER BY e.name;"
  preview:
    columns: ["id", "name", "manager_id"]
    rows:
      - [1, "Ada", null]
      - [2, "Bob", 1]
      - [3, "Cara", 1]
      - [4, "Dan", 2]
  expected:
    columns: ["employee", "manager"]
    rows:
      - ["Bob", "Ada"]
      - ["Cara", "Ada"]
      - ["Dan", "Bob"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE employees (id INT, name TEXT, manager_id INT);"
    - "INSERT INTO employees VALUES (1, 'Ada', NULL), (2, 'Bob', 1), (3, 'Cara', 1), (4, 'Dan', 2);"
---

Self-join không phải cấu trúc database đặc biệt. Nó là JOIN thông thường nhưng cùng một bảng vật lý đóng hai vai trò logic khác nhau.

## Mô hình tư duy

Đọc bảng hai lần:

- `employees e`: hàng nhân viên đang mô tả.
- `employees m`: hàng có thể là manager của nhân viên đó.

| employee | e.manager_id | hàng m.id khớp | cặp |
| --- | ---: | --- | --- |
| Ada | NULL | không | không có cặp INNER JOIN |
| Bob | 1 | Ada | Bob -> Ada |
| Cara | 1 | Ada | Cara -> Ada |
| Dan | 2 | Bob | Dan -> Bob |

## Dự đoán trước khi chạy

INNER self-join tạo ba hàng. Ada không xuất hiện ở vai trò employee vì `manager_id` NULL nên không tìm được manager pair.

## Ví dụ mẫu

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
INNER JOIN employees m
  ON e.manager_id = m.id
ORDER BY e.name;
```

| employee | manager |
| --- | --- |
| Bob | Ada |
| Cara | Ada |
| Dan | Bob |

Điểm cốt lõi là **vai trò**, không phải chữ alias cụ thể `e` hay `m`.

## Tìm lỗi

```sql
ON e.id = m.id
```

Câu này ghép mỗi hàng với chính nó. Quan hệ quản lý nằm ở `e.manager_id`, trỏ tới `m.id` của một hàng khác.

## Lỗi thường gặp

- Không alias khiến hai instance của cùng bảng khó phân biệt.
- Match ID của chính hàng thay vì cột quan hệ.
- Quên INNER JOIN loại người cấp cao nhất không có manager.

## Thử ngay

Trả mỗi employee cùng manager, sắp theo employee. Hãy trace bốn hàng ở hai vai trò trước khi chạy.

## Tự kiểm tra

Vì sao alias đặc biệt quan trọng trong self-join?

**Đáp án:** để phân biệt hai instance/vai trò logic của cùng một bảng và làm rõ mỗi tham chiếu cột thuộc phía nào.
