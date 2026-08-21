---
id: sql-40-constraints
track: sql-fundamentals
locale: vi
slug: table-constraints
title: Quy tắc cột với UNIQUE, CHECK và DEFAULT
order: 40
published: true
can_do: "Dự đoán cách UNIQUE, CHECK và DEFAULT chấp nhận, từ chối hoặc điền giá trị khi INSERT"
objectives:
  - Đọc constraint như quy tắc dữ liệu được thực thi
  - Dự đoán vi phạm UNIQUE và CHECK trước mutation
  - Hiểu khi nào DEFAULT cung cấp giá trị
exercise:
  starter: "INSERT INTO tickets (code, seats) VALUES "
  hints:
    - "Cung cấp code duy nhất và seats là số dương."
    - "Bỏ status để DEFAULT 'open' tự điền."
    - "Dùng: INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  solution: "INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  preview:
    columns: ["code", "seats", "status"]
    rows: []
  expected:
    columns: ["code", "seats", "status"]
    rows:
      - ["T1", 2, "open"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT code, seats, status FROM tickets ORDER BY code;"
  ddl:
    - "CREATE TEMP TABLE tickets (code TEXT UNIQUE, seats INT CHECK (seats > 0), status TEXT DEFAULT 'open');"
---

Constraint biến quy tắc nghiệp vụ thành quy tắc database có thể enforce mỗi lần dữ liệu được ghi. Chúng là một phần của schema contract, không phải lời hứa trong comment.

## Mô hình tư duy

Schema đã chuẩn bị:

```sql
CREATE TABLE tickets (
  code   TEXT UNIQUE,
  seats  INT CHECK (seats > 0),
  status TEXT DEFAULT 'open'
);
```

Đánh giá các write ứng viên:

| ứng viên | UNIQUE | CHECK | DEFAULT | kết quả |
| --- | --- | --- | --- | --- |
| `('T1', 2)`, bỏ status | pass | pass | điền `open` | chấp nhận |
| `T1` bị trùng | fail | — | — | từ chối |
| seats `0` | pass | fail | — | từ chối |

DEFAULT được dùng khi cột bị bỏ khỏi INSERT (hoặc dùng từ khóa `DEFAULT`). Nó không có nghĩa mọi giá trị `NULL` tường minh đều tự biến thành default.

## Dự đoán trước khi chạy

Bảng ban đầu rỗng. Với `INSERT INTO tickets (code, seats) VALUES ('T1', 2);`, after-state phải là một hàng có status `open`.

## Ví dụ mẫu

```sql
INSERT INTO tickets (code, seats)
VALUES ('T1', 2);
```

| code | seats | status |
| --- | ---: | --- |
| T1 | 2 | open |

Database đánh giá các rule ngay trong quá trình write.

## Tìm lỗi

```sql
INSERT INTO tickets (code, seats)
VALUES ('T1', 0);
```

Cú pháp đúng nhưng `CHECK (seats > 0)` từ chối hàng. Lỗi database có thể là vi phạm domain rule, không chỉ là SQL sai cú pháp.

## Lỗi thường gặp

- Nghĩ constraint chỉ có tác dụng lúc tạo bảng chứ không enforce các write sau đó.
- Nghĩ DEFAULT thay thế mọi `NULL` tường minh.
- Coi UNIQUE và PRIMARY KEY hoàn toàn giống nhau; chúng cùng liên quan uniqueness nhưng semantics danh tính/nullability khác nhau.

## Thử ngay

Chèn ticket `T1` với 2 seats và bỏ status để default điền. Hãy đánh giá cả ba rule trước khi chạy.

## Tự kiểm tra

Nếu bỏ `status` khỏi INSERT này thì chuyện gì xảy ra?

**Đáp án:** database cung cấp default đã khai báo là `'open'`.
