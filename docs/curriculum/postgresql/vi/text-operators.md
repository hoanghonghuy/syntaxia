---
id: pg-05-text
track: postgresql
locale: vi
slug: text-operators
title: Match và nối text trong PostgreSQL
order: 5
published: true
can_do: "Dùng ILIKE của PostgreSQL để match không phân biệt hoa thường và đọc || như phép nối text"
objectives:
  - Đối chiếu LIKE với ILIKE của PostgreSQL
  - Kết hợp ILIKE với vị trí wildcard có chủ đích
  - Đọc toán tử nối || và hiểu ảnh hưởng của NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Yêu cầu là chứa matrix bất kể hoa thường."
    - "ILIKE match pattern không phân biệt hoa thường; % cho phép text ở hai phía."
    - "Dùng: SELECT title FROM movies WHERE title ILIKE '%matrix%' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE title ILIKE '%matrix%' ORDER BY title;"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "The Matrix"]
      - [2, "Inception"]
      - [3, "The Matrix Reloaded"]
      - [4, "Arrival"]
  expected:
    columns: ["title"]
    rows:
      - ["The Matrix"]
      - ["The Matrix Reloaded"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix'), (2, 'Inception'), (3, 'The Matrix Reloaded'), (4, 'Arrival');"
---

PostgreSQL cung cấp các tiện ích text ngoài phần SQL portable cơ bản. `ILIKE` match pattern không phân biệt hoa thường; `||` nối các giá trị thành biểu thức text.

## Mô hình tư duy

Với pattern matching:

| biểu thức | phân biệt hoa thường? | semantics |
| --- | --- | --- |
| `title LIKE '%matrix%'` | có | chứa đúng lowercase `matrix` |
| `title ILIKE '%matrix%'` | không | chứa `matrix` bất kể case |

Với nối chuỗi:

```sql
SELECT 'Movie: ' || title AS label FROM movies;
```

`||` tạo biểu thức mới, không sửa `title` trong storage. NULL trong phép nối có thể làm kết quả thành NULL, nên format production thường cần xử lý null rõ ràng.

## Dự đoán trước khi chạy

Hai title Matrix đều lưu chữ `M` hoa. `ILIKE '%matrix%'` phải trả hai hàng, còn `LIKE '%matrix%'` thông thường không match đúng các chuỗi đang lưu này.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE title ILIKE '%matrix%'
ORDER BY title;
```

| title |
| --- |
| The Matrix |
| The Matrix Reloaded |

## Tìm lỗi

```sql
WHERE title ILIKE 'matrix'
```

Phần case đã đúng nhưng thiếu `%` khiến yêu cầu đổi từ “contains” thành “toàn chuỗi bằng pattern”. Operator và vị trí wildcard giải quyết hai vấn đề khác nhau.

## Lỗi thường gặp

- Nghĩ `ILIKE` portable với mọi database SQL.
- Dùng `+` làm toán tử nối text PostgreSQL thay vì `||`.
- Quên semantics NULL khi ghép chuỗi hiển thị.

## Thử ngay

Trả các title chứa `matrix` bất kể hoa thường, sắp theo title.

## Tự kiểm tra

Hai lựa chọn độc lập nào làm query này đúng: xử lý case và xử lý substring?

**Đáp án:** `ILIKE` xử lý case-insensitive; `%...%` khiến pattern match substring thay vì toàn giá trị.
