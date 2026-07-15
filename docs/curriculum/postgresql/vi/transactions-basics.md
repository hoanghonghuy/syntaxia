---
id: pg-24-tx
track: postgresql
locale: vi
slug: transactions-basics
title: "Giao dịch: tất cả hoặc không"
order: 24
published: true
objectives:
  - Giải thích BEGIN / COMMIT / ROLLBACK bằng lời đơn giản
  - Luyện UPDATE an toàn (sandbox đã bọc một transaction)
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "UPDATE … SET … WHERE … đổi một hàng được nhắm tới."
    - "Luôn có WHERE để không cập nhật mọi hàng."
    - "Thử: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2010]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'Interstellar', 2010);"
---

Một **giao dịch** (transaction) nhóm nhiều thay đổi để chúng thành công cùng nhau hoặc không thành công gì cả — như chỉ lưu cả form khi mọi trường hợp lệ. Trong PostgreSQL bạn viết:

```sql
BEGIN;
UPDATE …;
COMMIT;   -- giữ các thay đổi
-- hoặc ROLLBACK;  -- hủy mọi thứ từ BEGIN
```

- `BEGIN` bắt đầu nhóm.
- `COMMIT` làm thay đổi bền vững.
- `ROLLBACK` hủy chúng.

Sandbox học này đã chạy mỗi bài trong một transaction để an toàn, nên bạn **không** gõ `BEGIN`/`COMMIT` trong câu được chấm. Vẫn nên biết các từ: ứng dụng thật dùng chúng khi nhiều cập nhật phải nhất quán.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Interstellar | 2010 |

## Ví dụ mẫu

```sql
UPDATE movies SET year = 2014 WHERE title = 'Interstellar';
```

- Một thay đổi rõ ràng trong transaction của sandbox.
- `WHERE` giới hạn cập nhật ở Interstellar.
- Sau commit (tự động ở đây), `SELECT` kiểm tra hiện năm mới.

## Lỗi thường gặp

- Bỏ `WHERE` và cập nhật mọi hàng.
- Cố chấm chỉ `BEGIN`/`COMMIT` — bài này chấm `UPDATE`.
- Nhầm “transaction” với “table” — transaction là đơn vị công việc, không phải đối tượng lưu trữ.

## Thử ngay

Đặt `year` thành `2014` cho phim tên `Interstellar`.
