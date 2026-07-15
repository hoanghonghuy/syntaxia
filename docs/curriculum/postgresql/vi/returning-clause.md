---
id: pg-10-returning
track: postgresql
locale: vi
slug: returning-clause
title: Xem kết quả với RETURNING
order: 10
published: true
objectives:
  - Thêm RETURNING vào INSERT
  - Đọc giá trị mà câu lệnh vừa ghi
exercise:
  starter: "INSERT INTO movies (title) VALUES ('Dune');"
  hints:
    - "RETURNING yêu cầu PostgreSQL gửi lại các cột từ hàng mới."
    - "Sau VALUES, thêm RETURNING và cột bạn muốn xem."
    - "Thử: INSERT INTO movies (title) VALUES ('Dune') RETURNING title;"
  solution: "INSERT INTO movies (title) VALUES ('Dune') RETURNING title;"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
sandbox_seed:
  allow_mutations: true
  ddl:
    - "CREATE TEMP TABLE movies (id SERIAL PRIMARY KEY, title TEXT);"
    - "INSERT INTO movies (title) VALUES ('Inception'), ('The Matrix');"
---

Sau khi chèn, bạn thường muốn thấy những gì đã lưu — nhất là id tự sinh. PostgreSQL cho phép thêm `RETURNING` vào `INSERT`, `UPDATE`, hoặc `DELETE` để chính câu lệnh trả về các cột đó, giống biên lai sau khi gửi form.

| id | title |
| --- | --- |
| 1 | Inception |
| 2 | The Matrix |

## Ví dụ mẫu

```sql
INSERT INTO movies (title) VALUES ('Dune') RETURNING title;
```

- `INSERT` thêm hàng như bình thường.
- `RETURNING title` gửi lại tiêu đề vừa ghi.
- Bạn cũng có thể `RETURNING id, title` để xem id serial đã sinh.

Kết quả của câu lệnh:

| title |
| --- |
| Dune |

## Lỗi thường gặp

- Kết thúc câu sau `VALUES` mà quên `RETURNING`.
- SELECT từ bảng ở câu thứ hai khi bài yêu cầu `RETURNING` trên insert.
- RETURNING một cột không tồn tại.

## Thử ngay

Chèn `'Dune'` vào `movies` và trả về `title` mới bằng `RETURNING`.
