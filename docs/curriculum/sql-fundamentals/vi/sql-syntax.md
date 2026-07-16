---
id: sql-01-syntax
track: sql-fundamentals
locale: vi
slug: sql-syntax
title: Cú pháp SQL cơ bản
order: 1
published: true
objectives:
  - Nhận ra hình dạng câu SELECT đơn giản
  - Chạy truy vấn trả về một cột từ bảng
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Truy vấn cơ bản ghi cột sau SELECT, rồi bảng sau FROM."
    - "Bạn chỉ cần cột title — không phải mọi cột."
    - "Chạy: SELECT title FROM movies ORDER BY title;"
  solution: "SELECT title FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

SQL là ngôn ngữ đặt câu hỏi với bảng. Một truy vấn ngắn đọc như câu văn: **cột nào**, **từ bảng nào**.

**movies** (bảng luyện tập đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Bảng có bốn cột. Hôm nay bạn chỉ hỏi một cột: `title`.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
ORDER BY title;
```

| Phần | Nghĩa |
| --- | --- |
| `SELECT` | Bắt đầu yêu cầu — “cho tôi xem các cột này” |
| `title` | Cột bạn muốn |
| `FROM movies` | Nhìn vào bảng tên `movies` |
| `ORDER BY title` | Sắp tiêu đề A→Z để kết quả ổn định |

Kết quả:

| title |
| --- |
| Dune |
| Inception |
| Interstellar |
| The Matrix |

Mỗi câu SQL kết thúc bằng dấu chấm phẩy (`;`). Từ khóa thường viết hoa để nổi bật hơn tên bảng và cột.

## Lỗi thường gặp

- Quên `FROM` — `SELECT title` một mình không nói dùng bảng nào.
- Gõ sai tên bảng hoặc cột (`movie` thay vì `movies`) — tên phải khớp chính xác.
- Quên dấu chấm phẩy khi công cụ đòi câu lệnh đầy đủ.

## Thử ngay

Trả về chỉ cột `title` từ `movies`, sắp theo `title`.
