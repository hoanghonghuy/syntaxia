---
id: sql-08-delete
track: sql-fundamentals
locale: vi
slug: deleting-rows
title: Xóa hàng với DELETE
order: 11
published: true
can_do: "Chỉ xóa các hàng khớp predicate mong muốn và kiểm tra chính xác những hàng còn lại"
objectives:
  - Phân biệt xóa cả hàng với cập nhật giá trị
  - Dự đoán DELETE predicate sẽ xóa hàng nào
  - Bảo vệ các hàng không liên quan bằng WHERE chính xác
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "DELETE xóa cả hàng; dùng FROM movies để chỉ bảng mục tiêu."
    - "Dịch 'trước năm 2000' thành điều kiện WHERE trên year với <."
    - "Dùng: DELETE FROM movies WHERE year < 2000;"
  solution: "DELETE FROM movies WHERE year < 2000;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Old Cut", 1985, "Unknown"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Old Cut', 1985, 'Unknown');"
---

`DELETE` xóa toàn bộ hàng khỏi trạng thái lưu trữ. Giống UPDATE, câu hỏi an toàn quan trọng không phải “SQL có chạy không?” mà là “predicate của nó đang nhắm chính xác những hàng nào?”.

## Mô hình tư duy

Một DELETE có hai phần:

- `DELETE FROM movies` chọn bảng có các hàng có thể bị xóa.
- `WHERE ...` chọn tập con thật sự biến mất.

**Trước khi xóa**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Old Cut | 1985 | Unknown |

Với yêu cầu “xóa phim phát hành trước 2000”, hãy đánh giá `year < 2000` trên từng hàng.

| title | `year < 2000` | Hành động |
| --- | --- | --- |
| Inception | false | giữ |
| The Matrix | true | xóa |
| Dune | false | giữ |
| Old Cut | true | xóa |

## Dự đoán trước khi chạy

```sql
DELETE FROM movies
WHERE year < 2000;
```

Hãy dự đoán chuyển đổi trạng thái:

- số hàng: **4 -> 2**
- bị xóa: The Matrix, Old Cut
- còn lại: Inception, Dune

Dự đoán này tạo mục tiêu rõ ràng để kiểm tra sau mutation.

## Ví dụ mẫu

```sql
DELETE FROM movies
WHERE year < 2000;
```

**Sau khi xóa**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 3 | Dune | 2021 |

Sandbox dùng SELECT sau DELETE để kiểm tra các hàng còn lại.

## Tìm lỗi

Statement hợp lệ sau có phạm vi ảnh hưởng thế nào?

```sql
DELETE FROM movies;
```

Không có `WHERE`, mọi hàng trong `movies` đều là mục tiêu. Vì vậy an toàn khi mutation bắt đầu từ việc dự đoán số hàng bị ảnh hưởng trước khi chạy.

## Lỗi thường gặp

- Bỏ `WHERE` và xóa mọi hàng.
- Đảo `<` và `>` khi dịch “trước” với “sau”.
- Dùng DELETE khi hàng cần được giữ và chỉ một giá trị trong hàng bị sai; trường hợp đó cần UPDATE.

## Thử ngay

Xóa các phim phát hành trước 2000. Trước khi bấm Chạy, hãy nêu hai hàng phải biến mất và hai hàng bắt buộc còn lại.

## Tự kiểm tra

Nếu một hàng phải được giữ trong bảng nhưng một trường bị sai, nên dùng DELETE hay UPDATE?

**Đáp án:** UPDATE. DELETE xóa toàn bộ hàng khớp điều kiện.
