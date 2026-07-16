---
id: sql-18-aliases
track: sql-fundamentals
locale: vi
slug: column-aliases
title: Đổi tên cột với AS
order: 18
published: true
objectives:
  - Đặt tên cột kết quả rõ hơn bằng AS
  - Sắp xếp theo alias khi cơ sở dữ liệu cho phép
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "AS chỉ đổi tên cột trong kết quả — bảng thật không đổi."
    - "Dùng title AS film_name và year AS release_year."
    - "Thử: SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  solution: "SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["film_name", "release_year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["Dune", 2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Tên cột trong bảng có thể ngắn hoặc kỹ thuật. `AS` đổi tên cột chỉ trong **kết quả** — như nhãn hiển thị khi xuất spreadsheet, không đổi tên cột thật.

**movies** (bảng đầy đủ — tên cột thật vẫn là `title` và `year`)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

## Ví dụ mẫu

```sql
SELECT title AS film_name, year AS release_year
FROM movies
ORDER BY release_year;
```

- `title AS film_name` hiện tiêu đề dưới heading `film_name`.
- `year AS release_year` hiện năm dưới `release_year`.
- `ORDER BY release_year` sắp bằng tên kết quả đó (năm cũ trước).

Kết quả:

| film_name | release_year |
| --- | --- |
| The Matrix | 1999 |
| Inception | 2010 |
| Interstellar | 2014 |
| Dune | 2021 |

Bảng lưu trữ vẫn dùng `title` và `year` — chỉ heading của truy vấn này đổi.

## Lỗi thường gặp

- Nghĩ `AS` đổi tên cột lưu trữ mãi mãi — nó chỉ đổi heading đầu ra.
- Chọn `title, year` khi grader đòi `film_name` và `release_year`.
- Đặt `AS` sau `FROM` — alias đứng cạnh biểu thức được chọn.

## Thử ngay

Chọn `title` thành `film_name` và `year` thành `release_year`. Sắp theo `release_year`.
