---
id: pg-06-date
track: postgresql
locale: vi
slug: date-basics
title: Lọc theo ngày
order: 6
published: true
objectives:
  - So sánh cột DATE trong WHERE
  - Viết literal ngày với DATE '…'
exercise:
  starter: "SELECT title, released FROM movies;"
  hints:
    - "So sánh released với literal ngày, không chỉ một chuỗi trần."
    - "Dùng >= để giữ các ngày phát hành từ ngày đó trở đi."
    - "Thử: SELECT title FROM movies WHERE released >= DATE '2010-01-01';"
  solution: "SELECT title FROM movies WHERE released >= DATE '2010-01-01';"
  preview:
    columns: ["id", "title", "released"]
    rows:
      - [1, "The Matrix", "1999-03-31"]
      - [2, "Inception", "2010-07-16"]
      - [3, "Dune", "2021-10-22"]
      - [4, "Arrival", "2016-11-11"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Dune"]
      - ["Arrival"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, released DATE);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', DATE '1999-03-31'), (2, 'Inception', DATE '2010-07-16'), (3, 'Dune', DATE '2021-10-22'), (4, 'Arrival', DATE '2016-11-11');"
---

Lịch phát hành lưu ngày trên lịch. Trong PostgreSQL, cột `DATE` giữ giá trị năm-tháng-ngày. Bạn lọc bằng so sánh, dùng literal như `DATE '2010-01-01'`.

| id | title | released |
| --- | --- | --- |
| 1 | The Matrix | 1999-03-31 |
| 2 | Inception | 2010-07-16 |
| 3 | Dune | 2021-10-22 |
| 4 | Arrival | 2016-11-11 |

## Ví dụ mẫu

```sql
SELECT title FROM movies WHERE released >= DATE '2010-01-01';
```

- `released` là cột `DATE`.
- `DATE '2010-01-01'` là literal ngày có kiểu (thứ tự ISO: năm-tháng-ngày).
- `>=` giữ phim phát hành đúng ngày đó hoặc sau — The Matrix (1999) bị loại.

Kết quả:

| title |
| --- |
| Inception |
| Dune |
| Arrival |

`TIMESTAMP` lưu ngày **và** giờ; với lọc theo ngày, `DATE` là đủ.

## Lỗi thường gặp

- Viết ngày dạng `01/01/2010` — nên dùng ISO `YYYY-MM-DD`.
- So sánh ngày như chữ thuần không rõ kiểu ngày.
- Dùng `>` khi bài nói “từ ngày đó trở đi” (`>=`).

## Thử ngay

Trả về `title` của mọi phim phát hành từ `2010-01-01` trở đi.
