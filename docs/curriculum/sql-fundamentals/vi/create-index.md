---
id: sql-34-index
track: sql-fundamentals
locale: vi
slug: create-index
title: Tăng tốc tra cứu với index
order: 34
published: true
can_do: "Tạo index cho một mẫu tra cứu và phân biệt kết quả logic của query với cấu trúc truy cập vật lý"
objectives:
  - Giải thích index thay đổi gì và không thay đổi gì
  - Tạo index có tên trên cột phù hợp
  - Kiểm tra object index thực sự đã tồn tại
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "Tạo cấu trúc truy cập trên cột title; các hàng movie không được thay đổi."
    - "Dùng đúng tên index trước ON movies (title)."
    - "Dùng: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Interstellar", 2014]
  expected:
    columns: ["n"]
    rows:
      - [1]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT COUNT(*)::int AS n FROM pg_indexes WHERE tablename = 'movies' AND indexname = 'movies_title_idx';"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Interstellar', 2014);"
---

Index là cấu trúc truy cập bổ sung giúp database tìm hàng hiệu quả hơn. Nó **không** thay đổi các hàng logic mà một SELECT đúng phải trả về.

## Mô hình tư duy

Tách dữ liệu logic khỏi cấu trúc hỗ trợ truy cập:

| Lớp | Trước index | Sau index |
| --- | --- | --- |
| hàng dữ liệu | 3 movie | vẫn 3 movie đó |
| cột schema | `id`, `title`, `year` | không đổi |
| access structure | chưa có trong bài | `movies_title_idx` trên `title` |

Có thể hình dung như mục lục cuối sách: giúp tìm nội dung nhưng không thay thế các trang sách.

## Dự đoán trước khi chạy

Sau khi tạo `movies_title_idx`, hai điều phải đúng: dữ liệu movie giữ nguyên và metadata database có một index đúng tên trên bảng.

## Ví dụ mẫu

```sql
CREATE INDEX movies_title_idx
ON movies (title);
```

Grader giờ kiểm tra **catalog index thật**, không chỉ kiểm tra bảng còn đọc được. Nhờ vậy câu lệnh không làm gì hoặc làm việc khác không thể pass bài này.

## Tìm lỗi

```sql
CREATE INDEX movies_year_idx ON movies (year);
```

Đây là index hợp lệ nhưng không đúng access path và tên được yêu cầu. DDL hiệu năng phải khớp mẫu truy cập và object cần quản lý, không chỉ đúng cú pháp.

## Lỗi thường gặp

- Nghĩ index thay đổi kết quả query thay vì cách truy cập dữ liệu.
- Index sai cột hoặc dùng sai tên object.
- Nghĩ càng nhiều index càng tốt; index tốn storage và làm tăng chi phí duy trì khi ghi dữ liệu.

## Thử ngay

Tạo `movies_title_idx` trên `movies(title)`. Trước khi chạy, hãy nói phần nào phải giữ nguyên và object mới nào phải xuất hiện.

## Tự kiểm tra

Thêm index bình thường có làm thay đổi các hàng logic mà `SELECT * FROM movies` trả về không?

**Đáp án:** không. Nó có thể đổi cách database tìm hàng, không đổi kết quả logic đúng.
