---
id: sql-28-case
track: sql-fundamentals
locale: vi
slug: case-expression
title: Gán nhãn dòng với CASE
order: 28
published: true
objectives:
  - Viết biểu thức CASE trả nhãn khác nhau
  - Đặt alias cột kết quả để chấm điểm
  - Dùng ELSE làm nhánh mặc định
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "CASE WHEN … THEN … ELSE … END chọn nhãn theo điều kiện."
    - "Phim trước năm 2000 là 'classic'; còn lại là 'modern'."
    - "Thử: SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  solution: "SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Interstellar", 2014]
      - [4, "Dune", 2021]
  expected:
    columns: ["title", "era"]
    rows:
      - ["Dune", "modern"]
      - ["Inception", "modern"]
      - ["Interstellar", "modern"]
      - ["The Matrix", "classic"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Interstellar', 2014), (4, 'Dune', 2021);"
---

Spreadsheet thường thêm cột phụ bằng công thức IF. Trong SQL, `CASE` làm việc tương tự: nhìn một giá trị rồi trả một nhãn. Ở đây ta gắn mỗi phim là `classic` hoặc `modern` theo năm.

**movies** (bảng đầy đủ)

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Interstellar | 2014 |
| 4 | Dune | 2021 |

| title | year | `year < 2000`? | era |
| --- | --- | --- | --- |
| The Matrix | 1999 | có | classic |
| Inception | 2010 | không | modern |
| Interstellar | 2014 | không | modern |
| Dune | 2021 | không | modern |

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

- `WHEN year < 2000 THEN 'classic'` gắn nhãn phim cũ.
- `ELSE 'modern'` phủ mọi năm còn lại.
- `AS era` đặt tên cột mới để dễ đọc và chấm điểm.
- `END` đóng `CASE` — thiếu sẽ lỗi.

Kết quả:

| title | era |
| --- | --- |
| Dune | modern |
| Inception | modern |
| Interstellar | modern |
| The Matrix | classic |

## Lỗi thường gặp

- Quên `END` sau các nhánh `CASE`.
- Thiếu `AS era` khi cột mong đợi tên `era`.
- So sánh năm bằng chuỗi (`'2000'`) khi `year` là số — giữ kiểu nhất quán.

## Thử ngay

Trả về mỗi `title` kèm nhãn `era`: `classic` khi `year < 2000`, còn lại `modern`. Sắp theo `title`.
