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
  - Sắp xếp theo alias khi hệ thống cho phép
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "AS chỉ đổi tên cột trong kết quả — bảng gốc không đổi."
    - "Dùng title AS film_name và year AS release_year."
    - "Thử: SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  solution: "SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
  expected:
    columns: ["film_name", "release_year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010);"
---

Tên cột trong bảng có thể ngắn hoặc mang tính kỹ thuật. `AS` đổi tên cột chỉ trong **kết quả** — giống nhãn hiển thị khi xuất Excel, không đổi tên cột thật.

| title | year |
| --- | --- |
| The Matrix | 1999 |
| Inception | 2010 |

## Ví dụ mẫu

```sql
SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;
```

- `title AS film_name` hiện tiêu đề dưới heading `film_name`.
- `year AS release_year` hiện năm dưới `release_year`.
- `ORDER BY release_year` sắp xếp theo tên kết quả đó (năm cũ trước).

Kết quả:

| film_name | release_year |
| --- | --- |
| The Matrix | 1999 |
| Inception | 2010 |

## Lỗi thường gặp

- Nghĩ `AS` đổi tên cột lưu trữ vĩnh viễn — nó chỉ đổi heading đầu ra.
- Chọn `title, year` khi bài yêu cầu `film_name` và `release_year`.
- Đặt `AS` sau `FROM` — alias đứng cạnh biểu thức trong `SELECT`.

## Thử ngay

Chọn `title` thành `film_name` và `year` thành `release_year`. Sắp xếp theo `release_year`.
