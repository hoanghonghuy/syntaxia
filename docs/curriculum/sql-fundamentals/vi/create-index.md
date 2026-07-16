---
id: sql-34-index
track: sql-fundamentals
locale: vi
slug: create-index
title: Tăng tốc tra cứu bằng index
order: 34
published: true
objectives:
  - Tạo index trên một cột
  - Đặt tên index rõ ràng trước ON
  - Giữ bảng gốc vẫn đọc được sau khi tạo index
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "Index là trợ giúp tra cứu trên cột — không thay thế bảng."
    - "Đặt tên index, rồi ON bảng (cột)."
    - "Thử: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Interstellar", 2014]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
      - ["The Matrix"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Interstellar', 2014);"
---

**Index** giúp database tìm dòng nhanh hơn — như mục lục sách chỉ tới số trang mà không viết lại các chương.

**movies** (bảng đầy đủ — đã nạp sẵn)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |
| 3 | Interstellar | 2014 |

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

| Phần | Ý nghĩa |
| --- | --- |
| `movies_title_idx` | tên index (chọn tên rõ) |
| `ON movies (title)` | dựng index trên cột `title` |

Bảng và các dòng giữ nguyên; index là cấu trúc thêm. Tạo index là câu được chấm; SELECT theo sau xác nhận bảng vẫn đọc được.

## Ví dụ mẫu

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `CREATE INDEX` bắt đầu lệnh.
- Tên đứng trước `ON`.
- Ngoặc liệt kê cột cần index.
- Sau đó `SELECT title FROM movies` vẫn trả cùng ba title.

## Lỗi thường gặp

- Quên tên index (`CREATE INDEX ON movies (title)` thiếu trong SQL chuẩn).
- Index sai cột hoặc sai bảng.
- Mong `CREATE INDEX` trả về các dòng phim — grader kiểm tra bảng sau đó.

## Thử ngay

Tạo index tên `movies_title_idx` trên `movies(title)`.
