---
id: sql-23-self-join
track: sql-fundamentals
locale: vi
slug: self-join
title: Join một bảng với chính nó
order: 23
published: true
objectives:
  - Join một bảng với chính nó bằng hai alias
  - Khớp nhân viên với quản lý qua manager_id
exercise:
  starter: "SELECT name FROM employees;"
  hints:
    - "Đặt cùng một bảng hai alias, ví dụ e cho nhân viên và m cho quản lý."
    - "Nối chúng bằng e.manager_id = m.id."
    - "Thử: SELECT e.name AS employee, m.name AS manager FROM employees e INNER JOIN employees m ON e.manager_id = m.id ORDER BY e.name;"
  solution: "SELECT e.name AS employee, m.name AS manager FROM employees e INNER JOIN employees m ON e.manager_id = m.id ORDER BY e.name;"
  preview:
    columns: ["id", "name", "manager_id"]
    rows:
      - [1, "Ada", null]
      - [2, "Bob", 1]
      - [3, "Cara", 1]
  expected:
    columns: ["employee", "manager"]
    rows:
      - ["Bob", "Ada"]
      - ["Cara", "Ada"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE employees (id INT, name TEXT, manager_id INT);"
    - "INSERT INTO employees VALUES (1, 'Ada', NULL), (2, 'Bob', 1), (3, 'Cara', 1);"
---

Đôi khi các dòng liên quan nằm trong **cùng** một bảng — như sơ đồ tổ chức, mỗi người trỏ tới id quản lý. Self-join đọc bảng đó hai lần dưới hai tên (alias) rồi khớp chúng.

**employees**

| id | name | manager_id |
| --- | --- | --- |
| 1 | Ada |  |
| 2 | Bob | 1 |
| 3 | Cara | 1 |

## Ví dụ mẫu

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id
ORDER BY e.name;
```

- `employees e` là phía nhân viên; `employees m` là phía quản lý.
- `ON e.manager_id = m.id` nối mỗi người với quản lý của họ.
- Ada có `manager_id` NULL, nên không xuất hiện như nhân viên trong `INNER JOIN`.

Kết quả:

| employee | manager |
| --- | --- |
| Bob | Ada |
| Cara | Ada |

## Lỗi thường gặp

- Quên alias — SQL không phân biệt được hai lần dùng `employees` nếu thiếu chúng.
- JOIN `e.id = m.id` — khớp mỗi người với chính mình, không phải với quản lý.
- Mong Ada xuất hiện ở cột employee khi dùng `INNER JOIN` — cô ấy không có dòng quản lý để khớp.

## Thử ngay

Trả về mỗi `name` nhân viên là `employee` kèm `name` quản lý là `manager`, sắp xếp theo tên nhân viên.
