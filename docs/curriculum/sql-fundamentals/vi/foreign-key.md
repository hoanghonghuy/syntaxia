---
id: sql-33-fk
track: sql-fundamentals
locale: vi
slug: foreign-key
title: Khóa ngoại
order: 33
published: true
can_do: "Trace tham chiếu khóa ngoại từ bảng con tới bảng cha và chỉ chèn tham chiếu giữ đúng toàn vẹn quan hệ"
objectives:
  - Phân biệt danh tính của hàng con với tham chiếu tới hàng cha
  - Trace director_id tới directors.id
  - Dự đoán INSERT hợp lệ và vi phạm foreign key
exercise:
  starter: "INSERT INTO movies (id, title, director_id) VALUES "
  hints:
    - "director_id phải tham chiếu một id đã tồn tại trong directors."
    - "Bảng cha đang có Nolan tại directors.id = 1."
    - "Dùng: INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);"
  solution: "INSERT INTO movies (id, title, director_id) VALUES (1, 'Inception', 1);"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies;"
  ddl:
    - "CREATE TEMP TABLE directors (id INT PRIMARY KEY, name TEXT);"
    - "INSERT INTO directors VALUES (1, 'Nolan');"
    - "CREATE TEMP TABLE movies (id INT PRIMARY KEY, title TEXT, director_id INT REFERENCES directors(id));"
---

Foreign key bảo vệ quan hệ giữa các bảng. Nó nói rằng tham chiếu lưu trong hàng con phải trỏ tới một key hợp lệ ở bảng cha.

## Mô hình tư duy

Quan hệ:

```text
movies.director_id  ----tham chiếu---->  directors.id
```

Dữ liệu cha:

| directors.id | name |
| ---: | --- |
| 1 | Nolan |

Đánh giá hàng con muốn chèn:

| movie id | director_id | hợp lệ? | lý do |
| ---: | ---: | --- | --- |
| 1 | 1 | có | parent key 1 tồn tại |
| 2 | 99 | không | không có director 99 |

`movies.id` là danh tính của chính movie. `movies.director_id` là tham chiếu tới danh tính ở bảng khác.

## Dự đoán trước khi chạy

Dự đoán một hàng Inception với `director_id = 1` có qua hợp đồng quan hệ không; sau đó thử suy luận nếu đổi thành `99`.

## Ví dụ mẫu

```sql
INSERT INTO movies (id, title, director_id)
VALUES (1, 'Inception', 1);
```

Foreign key chấp nhận hàng vì parent key `directors.id = 1` đã tồn tại.

## Tìm lỗi

```sql
INSERT INTO movies (id, title, director_id)
VALUES (1, 'Inception', 99);
```

Hình dạng SQL hợp lệ nhưng toàn vẹn tham chiếu thất bại. Khi debug foreign key, hãy trace tham chiếu của hàng con tới đúng parent key mà nó cho rằng đang tồn tại.

## Lỗi thường gặp

- Nhầm primary key của chính hàng với foreign key tham chiếu hàng khác.
- Tham chiếu parent id chưa tồn tại.
- Nghĩ foreign key sao chép dữ liệu cha; thực tế nó lưu quan hệ bằng key.

## Thử ngay

Chèn Inception với movie `id = 1` và `director_id = 1`. Trace tham chiếu tới Nolan trước khi chạy.

## Tự kiểm tra

Bảng nào phải có key `1` trước khi movie với `director_id = 1` được chèn?

**Đáp án:** bảng `directors`, cụ thể là `directors.id = 1`.
