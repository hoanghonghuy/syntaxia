---
id: pg-11-upsert
track: postgresql
locale: vi
slug: upsert-on-conflict
title: Upsert atomic với ON CONFLICT
order: 11
published: true
can_do: "Dùng INSERT ... ON CONFLICT để định nghĩa hành động atomic thay thế khi unique key bị conflict"
objectives:
  - Xác định unique key làm conflict arbiter
  - Phân biệt giá trị đề xuất EXCLUDED với hàng đang tồn tại
  - Verify trạng thái cuối sau DO UPDATE
exercise:
  starter: "SELECT code, title FROM movies ORDER BY code;"
  hints:
    - "code là primary key nên insert INC lần nữa sẽ hit conflict target đó."
    - "EXCLUDED.title là title từ hàng đang được đề xuất insert."
    - "Dùng: INSERT INTO movies (code, title) VALUES ('INC', 'Inception Remastered') ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;"
  solution: "INSERT INTO movies (code, title) VALUES ('INC', 'Inception Remastered') ON CONFLICT (code) DO UPDATE SET title = EXCLUDED.title;"
  preview:
    columns: ["code", "title"]
    rows:
      - ["INC", "Inception"]
      - ["MTX", "The Matrix"]
  expected:
    columns: ["code", "title"]
    rows:
      - ["INC", "Inception Remastered"]
      - ["MTX", "The Matrix"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT code, title FROM movies ORDER BY code;"
  ddl:
    - "CREATE TEMP TABLE movies (code TEXT PRIMARY KEY, title TEXT);"
    - "INSERT INTO movies VALUES ('INC', 'Inception'), ('MTX', 'The Matrix');"
---

Upsert nghĩa là “thử insert; nếu đụng conflict uniqueness đã khai báo thì thực hiện hành động thay thế”. `ON CONFLICT` của PostgreSQL đưa quyết định đó vào cùng một write statement.

## Mô hình tư duy

Hàng đề xuất:

```text
(code='INC', title='Inception Remastered')
```

State hiện có đã chứa `code='INC'`. Primary key là conflict arbiter nên PostgreSQL đi vào nhánh `DO UPDATE`.

Trong nhánh đó:

| tham chiếu | nghĩa |
| --- | --- |
| `movies.title` | giá trị của hàng conflict đang tồn tại |
| `EXCLUDED.title` | giá trị từ hàng ta đã cố insert |

## Dự đoán trước khi chạy

After-state đầy đủ: INC đổi thành `Inception Remastered`; MTX giữ nguyên. Không có hàng INC thứ hai.

## Ví dụ mẫu

```sql
INSERT INTO movies (code, title)
VALUES ('INC', 'Inception Remastered')
ON CONFLICT (code)
DO UPDATE SET title = EXCLUDED.title;
```

| code | title |
| --- | --- |
| INC | Inception Remastered |
| MTX | The Matrix |

Conflict handling nằm trong INSERT, điều này quan trọng khi concurrent writes làm logic “check trước rồi insert/update” ở application dễ race.

## Tìm lỗi

```text
SELECT xem INC tồn tại -> application quyết định UPDATE hay INSERT
```

Giữa lần read và write sau đó, transaction khác có thể thay đổi state. Unique constraint + `ON CONFLICT` để PostgreSQL phân xử conflict tại write time.

## Lỗi thường gặp

- Chọn conflict target không được backed bởi uniqueness phù hợp.
- Nhầm `EXCLUDED` proposed value với value đang lưu trong target row.
- Viết read-then-write upsert dễ race ở application khi database conflict handling phù hợp hơn.

## Thử ngay

Upsert `INC` để title thành `Inception Remastered`, rồi verify MTX không đổi.

## Tự kiểm tra

`EXCLUDED.title` có nghĩa gì bên trong `DO UPDATE`?

**Đáp án:** title từ hàng được đề xuất insert nhưng đã xảy ra conflict.
