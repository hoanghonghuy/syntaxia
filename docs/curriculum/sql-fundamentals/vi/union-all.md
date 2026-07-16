---
id: sql-37-union-all
track: sql-fundamentals
locale: vi
slug: union-all
title: Giữ bản trùng với UNION ALL
order: 37
published: true
objectives:
  - Xếp chồng hai kết quả SELECT bằng UNION ALL
  - Thấy UNION ALL giữ giá trị trùng
  - Phân biệt UNION ALL với UNION
exercise:
  starter: "SELECT name FROM east;"
  hints:
    - "UNION ALL xếp chồng mọi hàng của cả hai SELECT, kể cả trùng."
    - "Nếu Ann có ở cả hai bảng, UNION ALL giữ cả hai hàng Ann."
    - "Thử: SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  solution: "SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE east (id INT, name TEXT);"
    - "CREATE TEMP TABLE west (id INT, name TEXT);"
    - "INSERT INTO east VALUES (1, 'Ann'), (2, 'Bo');"
    - "INSERT INTO west VALUES (1, 'Ann'), (2, 'Cy');"
---

`UNION` xếp chồng hai danh sách kết quả và **bỏ trùng**. Đôi khi bạn muốn giữ mọi hàng, kể cả khi cùng một giá trị xuất hiện hai lần — như chồng hai bảng điểm danh mà không xóa tên ký cả hai ngày. Đó là `UNION ALL`.

**east**

| id | name |
| --- | --- |
| 1 | Ann |
| 2 | Bo |

**west**

| id | name |
| --- | --- |
| 1 | Ann |
| 2 | Cy |

Cả hai danh sách đều có `Ann`. Với `UNION` bạn chỉ thấy `Ann` một lần. Với `UNION ALL` bạn thấy `Ann` hai lần.

## Ví dụ mẫu

```sql
SELECT name
FROM east
UNION ALL
SELECT name
FROM west
ORDER BY name;
```

- `SELECT` thứ nhất trả về Ann, Bo.
- `SELECT` thứ hai trả về Ann, Cy.
- `UNION ALL` xếp bốn hàng — không bỏ trùng.
- `ORDER BY name` sắp danh sách gộp A→Z (cả hai hàng Ann vẫn còn).

Kết quả:

| name |
| --- |
| Ann |
| Ann |
| Bo |
| Cy |

Cùng dữ liệu với `UNION` (để so sánh — không phải bài tập của bạn):

| name |
| --- |
| Ann |
| Bo |
| Cy |

Chỉ còn ba hàng, vì Ann thứ hai bị bỏ.

## Lỗi thường gặp

- Dùng `UNION` khi cần giữ mọi bản trùng — hãy đổi sang `UNION ALL`.
- Chỉ đặt `ORDER BY` ở SELECT đầu — đặt sau cả chuỗi `UNION ALL`.
- Hai SELECT khác số cột hoặc kiểu — hai bên phải khớp nhau.

## Thử ngay

Gộp mọi `name` từ `east` và `west` bằng `UNION ALL`. Sắp theo `name`. Giữ cả hai hàng Ann.
