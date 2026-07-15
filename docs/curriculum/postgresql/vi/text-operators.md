---
id: pg-05-text
track: postgresql
locale: vi
slug: text-operators
title: Tìm chữ và nối chuỗi
order: 5
published: true
objectives:
  - Khớp chữ không phân biệt hoa thường với ILIKE
  - Nối đoạn chữ bằng ||
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "ILIKE bỏ qua hoa/thường khi khớp mẫu."
    - "Dùng % làm ký tự đại diện cho “bất kỳ ký tự nào” quanh từ."
    - "Thử: SELECT title FROM movies WHERE title ILIKE '%matrix%';"
  solution: "SELECT title FROM movies WHERE title ILIKE '%matrix%';"
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

Đôi khi bạn cần khớp chữ mềm — tìm tiêu đề chứa một từ, dù hoa/thường khác nhau. `ILIKE` của PostgreSQL làm việc đó. Riêng `||` nối các đoạn chữ (concatenation), giống ghép ô trong công thức bảng tính.

| id | title |
| --- | --- |
| 1 | The Matrix |
| 2 | Inception |
| 3 | The Matrix Reloaded |
| 4 | Arrival |

## Ví dụ mẫu

```sql
SELECT title FROM movies WHERE title ILIKE '%matrix%';
```

- `ILIKE` khớp mẫu không phân biệt hoa thường (đặc thù PostgreSQL; SQL di động thường dùng `LOWER(...) LIKE ...`).
- `%` nghĩa là “bất kỳ ký tự nào trước hoặc sau”.
- `'%matrix%'` khớp cả hai tiêu đề Matrix dù chữ lưu có `M` hoa.

Kết quả:

| title |
| --- |
| The Matrix |
| The Matrix Reloaded |

Ví dụ nối chuỗi (để đọc, không chấm ở đây):

```sql
SELECT 'Year: ' || year AS label FROM movies;
```

- `||` nối chữ bên trái với chữ bên phải thành một chuỗi.

## Lỗi thường gặp

- Dùng `LIKE` khi cần khớp không phân biệt hoa thường — `LIKE` phân biệt hoa thường với chữ thường.
- Quên `%` nên chỉ khớp đúng cả tiêu đề.
- Dùng `+` để nối chuỗi — trong PostgreSQL nối chữ là `||`.

## Thử ngay

Trả về mọi `title` chứa từ `matrix`, bỏ qua hoa/thường.
