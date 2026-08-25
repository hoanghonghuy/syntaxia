---
id: sql-41-comments
track: sql-fundamentals
locale: vi
slug: sql-comments
title: Ghi chú trong SQL bằng comment
order: 41
published: true
can_do: "Thêm comment SQL hữu ích mà không vô tình comment mất code chạy hoặc thay đổi hành vi query"
objectives:
  - Dùng -- cho comment một dòng và /* */ cho block comment
  - Tách giải thích cho người đọc khỏi SQL thực thi
  - Nhận ra lỗi ranh giới comment khi debug
exercise:
  starter: |
    -- list movie titles A to Z
    SELECT title FROM movies;
  hints:
    - "Comment đã đúng; phần SELECT thực thi vẫn cần thứ tự xác định."
    - "Giữ dòng -- phía trên và thêm ORDER BY title vào query."
    - "Dùng: -- list movie titles A to Z\nSELECT title FROM movies ORDER BY title;"
  solution: |
    -- list movie titles A to Z
    SELECT title FROM movies ORDER BY title;
  preview:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021);"
---

Comment giải thích **vì sao** SQL tồn tại hoặc lý do của một lựa chọn khó nhìn ra. SQL engine bỏ qua comment, nên phần câu lệnh thực thi vẫn phải đúng độc lập.

## Mô hình tư duy

| cú pháp | ranh giới | ảnh hưởng thực thi |
| --- | --- | --- |
| `-- ghi chú` | từ `--` đến hết dòng | bị bỏ qua |
| `/* ghi chú */` | giữa marker mở và đóng | bị bỏ qua |

Tách rõ text cho người đọc khỏi text thực thi:

```sql
-- Stable alphabetical output for the report
SELECT title FROM movies ORDER BY title;
```

Comment mô tả intent; chính `ORDER BY` mới bảo đảm thứ tự.

## Dự đoán trước khi chạy

Xóa một comment hợp lệ không được làm thay đổi các hàng query. Dự đoán cùng ba title dù có hay không có comment.

## Ví dụ mẫu

```sql
-- list movie titles A to Z
SELECT title
FROM movies
ORDER BY title;
```

| title |
| --- |
| Dune |
| Inception |
| The Matrix |

Block comment phù hợp khi phần giải thích thực sự cần nhiều dòng:

```sql
/* This report intentionally includes all years.
   Filtering happens in the consuming service. */
SELECT title FROM movies ORDER BY title;
```

## Tìm lỗi

```sql
SELECT title FROM movies -- sort titles
ORDER BY title;
```

Ví dụ này vẫn chạy vì chỉ phần sau `--` trên chính dòng đó bị bỏ qua. Nhưng code đặt sau `--` **cùng dòng** có thể bị tắt âm thầm. Khi debug hành vi lạ, hãy kiểm tra ranh giới comment.

## Lỗi thường gặp

- Đặt SQL thực thi sau `--` rồi vô tình vô hiệu hóa nó.
- Mở `/*` nhưng quên đóng `*/`.
- Viết comment chỉ lặp lại cú pháp mà không giải thích intent, constraint hay quyết định bất ngờ.

## Thử ngay

Giữ comment `--` hiện có và sửa SELECT để trả title A đến Z bằng `ORDER BY title`.

## Tự kiểm tra

Chỉ sửa một comment hợp lệ có nên làm thay đổi các hàng query trả về không?

**Đáp án:** không. SQL engine bỏ qua comment.
