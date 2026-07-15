---
id: sql-34-index
track: sql-fundamentals
locale: vi
slug: create-index
title: Tăng tốc tìm kiếm với index
order: 34
published: true
objectives:
  - Tạo index trên một cột
  - Giữ bảng gốc vẫn đọc được sau khi tạo index
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "Index là trợ giúp tra cứu trên cột — không thay thế bảng."
    - "Đặt tên index, rồi ON bảng (cột)."
    - "Thử: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception');"
---

**Index** giúp cơ sở dữ liệu tìm dòng nhanh hơn — như mục lục sách chỉ số trang mà không viết lại các chương.

Dữ liệu mẫu đã có trong `movies`:

| id | title |
| --- | --- |
| 1 | Inception |

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `movies_title_idx` là tên index (bạn chọn tên rõ ràng).
- `ON movies (title)` xây index trên cột `title`.
- Bảng và các dòng không đổi; index là cấu trúc thêm.

Trong sandbox, tạo index là câu lệnh được chấm. SELECT sau đó xác nhận bảng vẫn đọc được.

## Ví dụ mẫu

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `CREATE INDEX` bắt đầu lệnh.
- Tên đứng trước `ON`.
- Ngoặc liệt kê (các) cột cần index.

## Lỗi thường gặp

- Quên tên index (`CREATE INDEX ON movies (title)` thiếu tên trong SQL chuẩn).
- Index sai cột hoặc sai bảng.
- Kỳ vọng `CREATE INDEX` trả về các dòng phim — hệ thống kiểm tra bảng sau đó.

## Thử ngay

Tạo index tên `movies_title_idx` trên `movies(title)`.
