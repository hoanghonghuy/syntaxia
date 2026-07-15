---
id: sql-28-case
track: sql-fundamentals
locale: vi
slug: case-expression
title: Gán nhãn dòng với CASE
order: 28
published: true
objectives:
  - Viết biểu thức CASE trả về nhãn khác nhau
  - Đặt alias cột kết quả để chấm điểm
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "CASE WHEN … THEN … ELSE … END chọn nhãn từ một điều kiện."
    - "Phim trước năm 2000 là 'classic'; còn lại là 'modern'."
    - "Thử: SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  solution: "SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["Matrix", 1999]
  expected:
    columns: ["title", "era"]
    rows:
      - ["Inception", "modern"]
      - ["Matrix", "classic"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Matrix', 1999), (2, 'Inception', 2010);"
---

Trong Excel thường thêm cột phụ bằng công thức IF. Trong SQL, `CASE` làm việc tương tự: nhìn một giá trị rồi trả về nhãn. Ở đây ta gắn mỗi phim là `classic` hoặc `modern` theo năm.

| id | title | year |
| --- | --- | --- |
| 1 | Matrix | 1999 |
| 2 | Inception | 2010 |

## Ví dụ mẫu

```sql
SELECT
  title,
  CASE
    WHEN year < 2000 THEN 'classic'
    ELSE 'modern'
  END AS era
FROM movies
ORDER BY title;
```

- `WHEN year < 2000 THEN 'classic'` gắn nhãn phim cũ hơn.
- `ELSE 'modern'` bao phủ mọi năm còn lại.
- `AS era` đặt tên cột mới để dễ đọc và chấm điểm.

Kết quả:

| title | era |
| --- | --- |
| Inception | modern |
| Matrix | classic |

## Lỗi thường gặp

- Quên `END` sau các nhánh `CASE`.
- Bỏ `AS era` khi cột kỳ vọng tên là `era`.
- So sánh năm với chuỗi (`'2000'`) trong khi `year` là số — hãy giữ kiểu nhất quán.

## Thử ngay

Trả về mỗi `title` phim kèm nhãn `era`: `classic` khi `year < 2000`, còn lại `modern`. Sắp xếp theo `title`.
