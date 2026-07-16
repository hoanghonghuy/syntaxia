---
id: sql-41-comments
track: sql-fundamentals
locale: vi
slug: sql-comments
title: Ghi chú trong SQL bằng comment
order: 41
published: true
objectives:
  - Viết comment một dòng bằng --
  - Viết comment khối bằng /* */
  - Giữ comment không làm đổi kết quả truy vấn
exercise:
  starter: |
    -- liệt kê tiêu đề phim A đến Z
    SELECT title FROM movies;
  hints:
    - "Comment bị cơ sở dữ liệu bỏ qua — không đổi kết quả."
    - "Giữ comment -- phía trên SELECT, rồi chọn title sắp theo title."
    - "Thử: -- liệt kê tiêu đề phim A đến Z\nSELECT title FROM movies ORDER BY title;"
  solution: |
    -- liệt kê tiêu đề phim A đến Z
    SELECT title FROM movies ORDER BY title;
  preview:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021);"
---

**Comment** là ghi chú cho người đọc. Cơ sở dữ liệu bỏ qua khi chạy SQL — như giấy dán trên spreadsheet không làm đổi số liệu.

| Kiểu | Cách viết | Khi nào dùng |
| --- | --- | --- |
| `-- …` | Hai dấu gạch, rồi chữ đến hết dòng | Ghi chú ngắn phía trên truy vấn |
| `/* … */` | Slash-sao … sao-slash | Ghi chú dài nhiều dòng |

**movies** (bảng đầy đủ)

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Dune | 2021 |

## Ví dụ mẫu

Comment một dòng phía trên `SELECT` bình thường:

```sql
-- liệt kê tiêu đề phim A đến Z
SELECT title
FROM movies
ORDER BY title;
```

- `-- liệt kê tiêu đề phim A đến Z` bị bỏ qua.
- Phần thật sự chạy là `SELECT title … ORDER BY title`.

Kết quả (giống như không có comment):

| title |
| --- |
| Dune |
| Inception |
| The Matrix |

Comment khối có thể nằm cạnh truy vấn:

```sql
SELECT title, year
FROM movies
/* chỉ các phim trong bảng luyện tập này */
ORDER BY year;
```

Comment giữa `FROM` và `ORDER BY` vẫn bị bỏ qua. Nên đặt ghi chú dài **phía trên** truy vấn để người mới không lạc từ khóa.

## Lỗi thường gặp

- Vô tình viết code sau `--` trên cùng dòng — mọi thứ sau `--` trên dòng đó đều là comment.
- Quên đóng `/*` bằng `*/` — phần còn lại của file có thể thành comment.
- Nghĩ comment đổi kết quả — không bao giờ; nếu sai thì sửa SQL, không sửa ghi chú.

## Thử ngay

Giữ comment `--` nói rằng bạn đang liệt kê tiêu đề A đến Z, rồi chọn mọi `title` từ `movies` sắp theo `title`.
