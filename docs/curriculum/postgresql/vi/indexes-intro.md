---
id: pg-16-indexes
track: postgresql
locale: vi
slug: indexes-intro
title: Index PostgreSQL và trade-off của planner
order: 16
published: true
can_do: "Tạo và verify index PostgreSQL đồng thời suy luận về lựa chọn planner và trade-off read/write"
objectives:
  - Tạo B-tree index trên cột lookup
  - Verify object index tồn tại trong metadata PostgreSQL
  - Giải thích vì sao index có thể giúp read nhưng thêm chi phí write/storage
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "Tạo đúng object index được yêu cầu trên movies(title)."
    - "Dữ liệu bảng giữ nguyên; object mới xuất hiện trong metadata index."
    - "Dùng: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["n"]
    rows:
      - [1]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT COUNT(*)::int AS n FROM pg_indexes WHERE tablename = 'movies' AND indexname = 'movies_title_idx';"
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception'), (2, 'The Matrix');"
---

Index là physical access structure. Nó có thể làm lookup phù hợp rẻ hơn, nhưng không miễn phí và PostgreSQL planner—không phải application code—cuối cùng quyết định index có đáng dùng cho query hay không.

## Mô hình tư duy

Thêm index đổi hỗ trợ vật lý, không đổi hàng logic:

| yếu tố | ảnh hưởng của index |
| --- | --- |
| semantics kết quả SELECT | không đổi |
| access path ứng viên | có thêm đường index |
| INSERT/UPDATE/DELETE | có thể phải duy trì index thêm |
| storage | index chiếm thêm dung lượng |

`CREATE INDEX` mặc định dùng index method mặc định của PostgreSQL (B-tree), phù hợp với nhiều workload equality/range/order.

## Dự đoán trước khi chạy

Sau command, các hàng movies giữ nguyên và metadata phải có đúng một index tên `movies_title_idx` cho bảng tạm này.

## Ví dụ mẫu

```sql
CREATE INDEX movies_title_idx
ON movies (title);
```

Bài tập verify `pg_indexes`, nên chỉ chạy SELECT không thể pass grader.

## Tìm lỗi

“Có index thì PostgreSQL bắt buộc dùng” là sai. Với bảng rất nhỏ, sequential scan có thể rẻ hơn; planner phụ thuộc cost estimate, statistics, predicate, kích thước bảng và nhiều yếu tố khác.

```sql
SELECT * FROM movies WHERE title = 'Inception';
```

Index là access path có thể dùng, không phải execution strategy bị ép buộc.

## Lỗi thường gặp

- Tạo index không dựa trên workload/query thực tế.
- Nghĩ index đổi kết quả query thay vì chi phí truy cập.
- Bỏ qua write amplification và storage khi thêm quá nhiều index.

## Thử ngay

Tạo `movies_title_idx` trên `movies(title)` và để grader chứng minh object index thực sự tồn tại.

## Tự kiểm tra

Có index phù hợp có đảm bảo PostgreSQL dùng nó cho mọi query tương ứng không?

**Đáp án:** không. Planner chọn plan có estimated cost thấp nhất; index chỉ là một access path.
