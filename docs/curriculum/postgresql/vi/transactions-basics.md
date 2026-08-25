---
id: pg-24-tx
track: postgresql
locale: vi
slug: transactions-basics
title: Transaction boundary và thay đổi all-or-nothing
order: 24
published: true
can_do: "Suy luận về BEGIN/COMMIT/ROLLBACK như consistency boundary và thực hiện targeted mutation trong transaction sandbox"
objectives:
  - Giải thích atomic all-or-nothing behavior của transaction
  - Phân biệt COMMIT, ROLLBACK và autocommit
  - Liên hệ transaction scope với consistency nhiều bước
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "Sandbox đã sở hữu transaction boundary; graded task là targeted UPDATE bên trong."
    - "Dùng WHERE title = 'Interstellar' để chỉ đổi đúng hàng."
    - "Dùng: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
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

Transaction là consistency boundary: nhiều statement có thể trở thành một unit of work all-or-nothing. Transaction khác không thấy một trạng thái committed mới chỉ hoàn thành nửa chừng.

## Mô hình tư duy

```text
BEGIN
  bước A
  bước B
  bước C
COMMIT   -> giữ cả unit
```

hoặc:

```text
BEGIN
  bước A
  bước B lỗi / quyết định thay đổi
ROLLBACK -> bỏ các thay đổi của unit
```

Không có explicit transaction block, PostgreSQL thường chạy từng statement trong transaction riêng theo autocommit behavior từ phía client.

Transaction không chỉ là “nút undo”. Nó giúp các write liên quan giữ invariant khi có failure và concurrency; isolation level sau đó điều khiển concurrent transaction quan sát được gì.

## Dự đoán trước khi chạy

Sandbox đã wrap bài này an toàn. Targeted UPDATE chỉ được đổi Interstellar; Inception vẫn 2010.

## Ví dụ mẫu

Trong application, một unit nhiều bước có thể là:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

Nếu bước hai không thể chấp nhận, `ROLLBACK` loại thay đổi transaction thay vì commit transfer một phía.

Trong sandbox này chỉ chạy inner mutation:

```sql
UPDATE movies SET year = 2014 WHERE title = 'Interstellar';
```

## Tìm lỗi

Hai write liên quan chạy thành hai autocommitted statement riêng. Statement đầu thành công rồi process crash trước statement hai. SQL từng câu đều đúng nhưng business operation inconsistent vì transaction boundary sai.

## Lỗi thường gặp

- Nghĩ transaction chỉ quan trọng khi query có syntax error.
- Chia một business invariant qua nhiều commit độc lập.
- Giữ transaction mở không cần thiết trong lúc chờ external work chậm, làm tăng contention và resource usage.

## Thử ngay

Thực hiện targeted update Interstellar bên trong transaction sandbox hiện có rồi verify state cuối.

## Tự kiểm tra

Vì sao money transfer nhiều bước nên nằm trong một transaction?

**Đáp án:** để mọi balance change liên quan commit cùng nhau hoặc không change nào commit, giữ business invariant khi có failure.
