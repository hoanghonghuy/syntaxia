---
id: sql-32-pk
track: sql-fundamentals
locale: vi
slug: primary-key
title: Khóa chính
order: 32
published: true
can_do: "Suy luận về danh tính hàng và chèn dữ liệu thỏa tính duy nhất, khác NULL của PRIMARY KEY"
objectives:
  - Xem primary key như danh tính ổn định của hàng
  - Dự đoán lỗi key trùng và NULL
  - Chèn một hàng thỏa hợp đồng khóa chính
exercise:
  starter: "INSERT INTO actors (id, name) VALUES "
  hints:
    - "Cột id là danh tính hàng và phải duy nhất, không NULL."
    - "Bảng đang rỗng nên id 1 có thể được dùng đúng một lần."
    - "Dùng: INSERT INTO actors (id, name) VALUES (1, 'Ada');"
  solution: "INSERT INTO actors (id, name) VALUES (1, 'Ada');"
  preview:
    columns: ["id", "name"]
    rows: []
  expected:
    columns: ["id", "name"]
    rows:
      - [1, "Ada"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, name FROM actors ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE actors (id INT PRIMARY KEY, name TEXT);"
---

Primary key không chỉ là “một cột có index”. Vai trò chính của nó là **danh tính hàng**: mỗi hàng phải được nhận diện bằng một giá trị có mặt và duy nhất.

## Mô hình tư duy

```sql
CREATE TABLE actors (
  id INT PRIMARY KEY,
  name TEXT
);
```

| Hàng muốn chèn | Hợp lệ? | Lý do |
| --- | --- | --- |
| `(1, 'Ada')` | có | lần đầu dùng key 1 |
| `(1, 'Grace')` sau Ada | không | trùng danh tính |
| `(NULL, 'Linus')` | không | primary key không được NULL |

Key đại diện cho danh tính hàng; các thuộc tính mô tả như `name` có thể đổi mà không làm hàng đó trở thành một hàng khác.

## Dự đoán trước khi chạy

Bảng đang rỗng. Hãy dự đoán `id = 1` có thể chèn lần đầu không, rồi chuyện gì xảy ra nếu dùng lại cùng id.

## Ví dụ mẫu

```sql
INSERT INTO actors (id, name)
VALUES (1, 'Ada');
```

| id | name |
| ---: | --- |
| 1 | Ada |

Schema đã enforce key; câu INSERT chỉ cần thỏa ràng buộc, không cần khai báo lại `PRIMARY KEY`.

## Tìm lỗi

Nếu bảng đã có `id = 1`, câu này sẽ lỗi:

```sql
INSERT INTO actors (id, name) VALUES (1, 'Grace');
```

Vấn đề không phải tên Grace bị trùng; giá trị danh tính `1` đã thuộc về một hàng khác.

## Lỗi thường gặp

- Nghĩ hai hàng có thể chung primary key nếu các cột khác nhau.
- Coi cột mô tả có thể NULL như tương đương với danh tính hàng.
- Cố khai báo lại constraint trong INSERT thay vì thỏa schema đã enforce nó.

## Thử ngay

Chèn actor `id = 1`, `name = 'Ada'`. Giải thích vì sao id này hợp lệ trong bảng đang rỗng.

## Tự kiểm tra

Hai hàng có thể dùng cùng một giá trị primary key không?

**Đáp án:** không. Primary key nhận diện duy nhất từng hàng và không được NULL.
