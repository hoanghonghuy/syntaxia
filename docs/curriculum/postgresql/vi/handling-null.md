---
id: pg-02-null
track: postgresql
locale: vi
slug: handling-null
title: NULL và logic ba trạng thái
order: 2
published: true
can_do: "Suy luận về NULL PostgreSQL như trạng thái chưa biết và chọn IS NULL / IS NOT NULL thay vì equality thông thường"
objectives:
  - Phân biệt NULL với 0, text rỗng và false
  - Giải thích vì sao so sánh với NULL cho trạng thái unknown
  - Lọc giá trị thiếu bằng IS NULL
exercise:
  starter: "SELECT name, email FROM contacts;"
  hints:
    - "Email thiếu được biểu diễn bằng NULL, không phải text 'NULL'."
    - "So sánh = thông thường không biến unknown thành true. Hãy dùng IS NULL."
    - "Dùng: SELECT name FROM contacts WHERE email IS NULL ORDER BY name;"
  solution: "SELECT name FROM contacts WHERE email IS NULL ORDER BY name;"
  preview:
    columns: ["id", "name", "email"]
    rows:
      - [1, "Ana", "ana@example.com"]
      - [2, "Ben", null]
      - [3, "Chi", "chi@example.com"]
      - [4, "Dee", null]
  expected:
    columns: ["name"]
    rows:
      - ["Ben"]
      - ["Dee"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE contacts (id INTEGER, name TEXT, email TEXT);"
    - "INSERT INTO contacts VALUES (1, 'Ana', 'ana@example.com'), (2, 'Ben', NULL), (3, 'Chi', 'chi@example.com'), (4, 'Dee', NULL);"
---

`NULL` trong SQL biểu diễn thông tin thiếu hoặc chưa biết. Vì vậy logic có trạng thái thứ ba ngoài true và false thông thường.

## Mô hình tư duy

Phân biệt các giá trị sau:

| giá trị | ý nghĩa |
| --- | --- |
| `0` | số 0 đã biết |
| `''` | text rỗng đã biết |
| `FALSE` | boolean false đã biết |
| `NULL` | giá trị chưa biết / bị thiếu |

Biểu thức như `email = NULL` không trở thành true cho email bị thiếu. Kết quả so sánh là unknown và không qua WHERE. SQL có `IS NULL` / `IS NOT NULL` cho câu hỏi này.

## Dự đoán trước khi chạy

Ben và Dee thiếu email nên `email IS NULL` phải giữ đúng hai hàng đó. Ana và Chi có text đã biết.

## Ví dụ mẫu

```sql
SELECT name
FROM contacts
WHERE email IS NULL
ORDER BY name;
```

| name |
| --- |
| Ben |
| Dee |

## Tìm lỗi

```sql
WHERE email = NULL
```

Nó trông giống equality nhưng NULL không phải giá trị thông thường để so bằng `=`. Hãy đổi câu hỏi “bằng NULL?” thành “có bị thiếu không?” → `IS NULL`.

## Lỗi thường gặp

- Coi NULL như một chuỗi đặc biệt.
- Nghĩ NULL và text rỗng có cùng nghĩa.
- Dùng `= NULL` / `<> NULL` thay vì predicate hiểu NULL.

## Thử ngay

Trả tên contact có email bị thiếu, sắp theo name.

## Tự kiểm tra

`NULL` có giống boolean `FALSE` không?

**Đáp án:** không. NULL là thông tin unknown/missing; FALSE là giá trị boolean đã biết.
