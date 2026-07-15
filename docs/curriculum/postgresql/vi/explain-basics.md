---
id: pg-23-explain
track: postgresql
locale: vi
slug: explain-basics
title: Đọc kế hoạch EXPLAIN
order: 23
published: true
objectives:
  - Nhận biết EXPLAIN cho thấy gì
  - Chạy SELECT thường sau khi học ví dụ kế hoạch
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Bài này chấm SELECT thường, không phải chữ EXPLAIN."
    - "Chỉ trả về cột title."
    - "Thử: SELECT title FROM movies ORDER BY title;"
  solution: "SELECT title FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

Trước khi chạy truy vấn, PostgreSQL dựng một **kế hoạch** (plan) — các bước tìm hàng (quét bảng, dùng index, sắp xếp, …). `EXPLAIN` in kế hoạch đó dạng chữ để bạn hiểu cách database suy nghĩ. Kết quả không phải danh sách phim; đó là mô tả công việc.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Ví dụ mẫu

```sql
EXPLAIN SELECT title FROM movies;
```

Một dòng kế hoạch điển hình trông như:

```text
Seq Scan on movies  (cost=0.00..1.02 rows=2 width=32)
```

- `Seq Scan` nghĩa là “đọc bảng từ đầu đến cuối” (thường gặp với bảng nhỏ).
- `cost` và `rows` là ước lượng của bộ lập kế hoạch, không phải giá trị dữ liệu của bạn.
- `EXPLAIN ANALYZE` còn chạy thật và hiện thời gian — hữu ích sau; hãy bắt đầu với `EXPLAIN` thuần.

Trong sandbox bài này, phần chấm là `SELECT` thường để chấm điểm ổn định (chữ kế hoạch khó khớp từng hàng). Hãy dùng `EXPLAIN` khi tự luyện sau khi hiểu ý tưởng.

## Lỗi thường gặp

- Kỳ vọng `EXPLAIN` trả về giá trị `title` — nó trả về chữ kế hoạch trong cột `QUERY PLAN`.
- Coi số cost là “đáp án sai” — đó là ước lượng.
- Bỏ `ORDER BY` trên `SELECT` được chấm khi cần thứ tự alphabet.

## Thử ngay

Trả về mọi `title` từ `movies`, sắp theo title (luyện SELECT sau khi đọc ví dụ EXPLAIN ở trên).
