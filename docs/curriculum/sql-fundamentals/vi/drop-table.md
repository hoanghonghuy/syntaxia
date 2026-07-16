---
id: sql-31-drop
track: sql-fundamentals
locale: vi
slug: drop-table
title: Xóa bảng với DROP TABLE
order: 31
published: true
objectives:
  - Drop một bảng không còn dùng
  - Để các bảng khác nguyên
  - Phân biệt DROP TABLE với DELETE (chỉ dòng)
exercise:
  starter: "DROP TABLE "
  hints:
    - "DROP TABLE xóa cả bảng, không chỉ các dòng."
    - "Chỉ đặt tên bảng cần xóa — để keepers lại."
    - "Thử: DROP TABLE obsolete;"
  solution: "DROP TABLE obsolete;"
  preview:
    columns: ["table"]
    rows:
      - ["obsolete"]
      - ["keepers"]
  expected:
    columns: ["dropped"]
    rows:
      - [true]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT to_regclass('pg_temp.obsolete') IS NULL AS dropped;"
  ddl:
    - "CREATE TEMP TABLE obsolete (id INT);"
    - "CREATE TEMP TABLE keepers (id INT);"
    - "INSERT INTO keepers VALUES (1);"
---

`DELETE` xóa dòng. `DROP TABLE` xóa cả bảng — cấu trúc và dữ liệu — như xóa cả sheet khỏi workbook.

Bạn có hai bảng tạm:

| table | mục đích | dòng mẫu |
| --- | --- | --- |
| obsolete | không còn cần | trống |
| keepers | vẫn dùng | một dòng (`id = 1`) |

| Lệnh | Xóa gì |
| --- | --- |
| `DELETE FROM obsolete` | chỉ dòng — bảng trống vẫn còn |
| `DROP TABLE obsolete` | cả bảng |

Chỉ drop `obsolete`. `keepers` phải còn.

## Ví dụ mẫu

```sql
DROP TABLE obsolete;
```

- `DROP TABLE` là lệnh.
- `obsolete` là bảng cần xóa.
- Sau đó truy vấn `obsolete` sẽ lỗi; `keepers` không đổi.

## Lỗi thường gặp

- Drop nhầm `keepers` — đọc kỹ tên bảng.
- Dùng `DELETE FROM obsolete` — xóa dòng nhưng để lại bảng trống.
- Viết `DROP TABLE obsolete, keepers` khi đề chỉ yêu cầu một bảng.

## Thử ngay

Drop bảng `obsolete`. Để `keepers` nguyên.
