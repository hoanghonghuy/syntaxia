---
id: sql-24-union
track: sql-fundamentals
locale: vi
slug: union-queries
title: Kết hợp tập kết quả với UNION
order: 24
published: true
can_do: "Xếp dọc các kết quả SELECT tương thích bằng UNION và dự đoán việc loại hàng trùng"
objectives:
  - Phân biệt UNION với JOIN
  - Kiểm tra số cột/type tương thích giữa các nhánh UNION
  - Giải thích vì sao UNION loại hàng kết quả trùng
exercise:
  starter: "SELECT name FROM a;"
  hints:
    - "Cần xếp hàng của hai result set vào cùng một cột."
    - "Dùng UNION giữa hai SELECT name tương thích; UNION loại tên trùng."
    - "Dùng: SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  solution: "SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE a (name TEXT);"
    - "CREATE TEMP TABLE b (name TEXT);"
    - "INSERT INTO a VALUES ('Ann'), ('Bob'), ('Cara');"
    - "INSERT INTO b VALUES ('Bob'), ('Cara'), ('Dee');"
---

JOIN và UNION đều kết hợp dữ liệu nhưng theo hai trục khác nhau. JOIN tạo hàng **rộng hơn** từ các input có quan hệ; UNION xếp **nhiều hàng hơn** từ các result tương thích.

## Mô hình tư duy

Result A: Ann, Bob, Cara. Result B: Bob, Cara, Dee. `UNION` xếp dọc rồi loại hàng kết quả trùng, còn Ann, Bob, Cara, Dee.

Hai SELECT phải trả cùng số cột và các type tương ứng có thể kết hợp.

## Dự đoán trước khi chạy

3 + 3 hàng đầu vào nhưng `UNION` chỉ còn **4 hàng**, vì Bob và Cara lặp ở cả hai nhánh.

## Ví dụ mẫu

```sql
SELECT name FROM a
UNION
SELECT name FROM b
ORDER BY name;
```

| name |
| --- |
| Ann |
| Bob |
| Cara |
| Dee |

`ORDER BY` áp dụng lên kết quả kết hợp. Bài `UNION ALL` sau này sẽ giữ duplicate.

## Tìm lỗi

```sql
SELECT name FROM a
UNION
SELECT name, age FROM b;
```

Nhánh đầu một cột, nhánh sau hai cột nên không thể tạo cùng một hình chữ nhật kết quả.

## Lỗi thường gặp

- Nhầm UNION xếp dọc với JOIN ghép ngang theo quan hệ.
- Nghĩ UNION giữ duplicate.
- Hai nhánh trả số cột khác nhau.

## Thử ngay

Trả danh sách name duy nhất từ `a` và `b`, sắp alphabet. Hãy dự đoán duplicate nào biến mất.

## Tự kiểm tra

Nếu cần giữ duplicate, operator ở bài sau là gì?

**Đáp án:** `UNION ALL`.
