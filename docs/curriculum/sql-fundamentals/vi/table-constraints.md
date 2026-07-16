---
id: sql-40-constraints
track: sql-fundamentals
locale: vi
slug: table-constraints
title: Quy tắc cột với UNIQUE, CHECK và DEFAULT
order: 40
published: true
objectives:
  - Đọc UNIQUE, CHECK và DEFAULT trên CREATE TABLE
  - Chèn hàng tuân thủ các quy tắc đó
  - Thấy DEFAULT điền cột bị bỏ trống
exercise:
  starter: "INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  hints:
    - "status có DEFAULT 'open' — bỏ qua cột đó thì hàng vẫn nhận open."
    - "Chỉ chèn code và seats; để DEFAULT điền status."
    - "Thử: INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  solution: "INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  preview:
    columns: ["code", "seats", "status"]
    rows:
      - ["T1", 2, "open"]
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

Khóa chính và khóa ngoại là hai loại **ràng buộc** (constraint) — quy tắc trên cột. Ba quy tắc thường gặp nữa:

| Ràng buộc | Nghĩa đơn giản | Ví dụ đời thường |
| --- | --- | --- |
| `UNIQUE` | Không hai hàng cùng giá trị này | Mã vé không được trùng |
| `CHECK (…)` | Giá trị phải qua một phép thử | Số ghế phải lớn hơn 0 |
| `DEFAULT …` | Nếu bỏ cột, dùng giá trị này | Vé mới bắt đầu ở trạng thái `open` |

**tickets** — bảng trống được định nghĩa như sau (quy tắc, chưa có dữ liệu):

```sql
CREATE TABLE tickets (
  code   TEXT UNIQUE,
  seats  INT CHECK (seats > 0),
  status TEXT DEFAULT 'open'
);
```

| Cột | Quy tắc bằng lời |
| --- | --- |
| `code` | Mỗi mã xuất hiện nhiều nhất một lần |
| `seats` | Phải là số dương |
| `status` | Nếu INSERT bỏ qua, lưu `'open'` |

Lúc bắt đầu bài tập bảng **chưa có hàng**.

## Ví dụ mẫu

Chèn một vé. Bạn chỉ đưa `code` và `seats` — `status` do `DEFAULT` điền.

```sql
INSERT INTO tickets (code, seats)
VALUES ('T1', 2);
```

- `UNIQUE` trên `code` cho phép `'T1'` lần đầu. `'T1'` lần hai sẽ lỗi.
- `CHECK (seats > 0)` chấp nhận `2`. Chèn `0` hoặc `-1` sẽ lỗi.
- `status` bị bỏ qua, nên cơ sở dữ liệu lưu `'open'`.

Sau khi chèn, bảng trông như thế này:

| code | seats | status |
| --- | --- | --- |
| T1 | 2 | open |

Kiểm tra bằng:

```sql
SELECT code, seats, status FROM tickets ORDER BY code;
```

## Lỗi thường gặp

- Bỏ giá trị bắt buộc khi **không** có DEFAULT — INSERT sẽ lỗi; ở đây `status` bỏ được nhờ DEFAULT.
- Phá CHECK — `seats` phải lớn hơn 0.
- Dùng lại cùng `code` hai lần — UNIQUE từ chối bản trùng.

## Thử ngay

Chèn một hàng `code = 'T1'` và `seats = 2`. Để `DEFAULT` đặt `status`. Checker đọc cả ba cột sắp theo `code`.
