---
id: sql-07-update
track: sql-fundamentals
locale: vi
slug: updating-rows
title: Đổi hàng với UPDATE
order: 10
published: true
can_do: "Chỉ cập nhật đúng các hàng cần thiết bằng SET kết hợp WHERE chính xác và kiểm tra trạng thái sau cập nhật"
objectives:
  - Phân biệt giá trị mới trong SET với tập hàng mục tiêu trong WHERE
  - Dự đoán phạm vi ảnh hưởng của UPDATE trước khi chạy
  - Kiểm tra bảng sau UPDATE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "Hàng đã tồn tại, vì vậy dùng UPDATE thay vì INSERT."
    - "SET định nghĩa year mới; WHERE phải xác định duy nhất hàng Interstellar."
    - "Dùng: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "Interstellar", 2010, "Nolan"]
      - [3, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
      - [3, "The Matrix", 1999]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'Interstellar', 2010, 'Nolan'), (3, 'The Matrix', 1999, 'Wachowski');"
---

`UPDATE` thay đổi giá trị trong các hàng đã tồn tại. Phần nguy hiểm thường không nằm ở `SET`, mà ở việc chọn sai tập hàng được phép cập nhật.

## Mô hình tư duy

Một UPDATE có hai câu hỏi độc lập:

| Câu hỏi | Clause |
| --- | --- |
| Giá trị mới nào sẽ được ghi? | `SET` |
| Những hàng hiện có nào được phép đổi? | `WHERE` |

**Trước khi cập nhật**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | Interstellar | 2010 | Nolan |
| 3 | The Matrix | 1999 | Wachowski |

Chỉ Interstellar sai. Chuyển đổi trạng thái mong muốn chỉ là một ô: year của phim này thành 2014.

## Dự đoán trước khi chạy

So sánh hai statement:

```sql
UPDATE movies SET year = 2014;
```

```sql
UPDATE movies SET year = 2014 WHERE title = 'Interstellar';
```

Câu đầu khớp **mọi hàng**, nên cả ba year đều trở thành 2014. Câu thứ hai phải khớp chính xác một hàng. Trước UPDATE, luôn dự đoán predicate dự kiến sẽ ảnh hưởng bao nhiêu hàng.

## Ví dụ mẫu

```sql
UPDATE movies
SET year = 2014
WHERE title = 'Interstellar';
```

**Sau khi cập nhật**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Interstellar | 2014 |
| 3 | The Matrix | 1999 |

`SET` mô tả thay đổi. `WHERE` giới hạn phạm vi ảnh hưởng. Sau đó sandbox chạy SELECT kiểm tra, vì vậy mutation được chấm theo trạng thái kết quả chứ không phải so khớp text câu SQL.

## Tìm lỗi

Mục tiêu là chỉ sửa Interstellar:

```sql
UPDATE movies
SET year = 2014
WHERE director = 'Nolan';
```

SQL này hợp lệ về cú pháp nhưng sai logic. Cả Inception và Interstellar đều do Nolan đạo diễn nên predicate quá rộng. Một UPDATE chạy được vẫn có thể sửa nhầm dữ liệu.

## Lỗi thường gặp

- Bỏ `WHERE` và cập nhật mọi hàng.
- Chọn predicate khớp nhiều hàng hơn dự định.
- Dùng INSERT khi hàng mục tiêu đã tồn tại thay vì sửa hàng đó bằng UPDATE.

## Thử ngay

Đặt `year` của Interstellar thành `2014`. Trước khi bấm Chạy, kiểm tra bảng và xác nhận điều kiện WHERE của bạn chỉ khớp một hàng.

## Tự kiểm tra

Trong UPDATE, clause nào điều khiển **giá trị mới**, clause nào điều khiển **các hàng bị ảnh hưởng**?

**Đáp án:** `SET` điều khiển giá trị mới; `WHERE` điều khiển các hàng bị ảnh hưởng.
