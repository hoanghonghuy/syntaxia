---
id: sql-31-drop
track: sql-fundamentals
locale: vi
slug: drop-table
title: Xóa bảng với DROP TABLE
order: 31
published: true
objectives:
  - Xóa một bảng không còn dùng
  - Giữ nguyên các bảng khác
exercise:
  starter: "DROP TABLE "
  hints:
    - "DROP TABLE xóa cả bảng, không chỉ các dòng."
    - "Chỉ nêu bảng cần bỏ — để keepers yên."
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

| table | purpose |
| --- | --- |
| obsolete | không còn cần |
| keepers | vẫn dùng (có một dòng) |

Chỉ xóa `obsolete`. `keepers` phải còn lại.

## Ví dụ mẫu

```sql
DROP TABLE obsolete;
```

- `DROP TABLE` là lệnh.
- `obsolete` là bảng cần bỏ.
- Sau đó, truy vấn vào `obsolete` sẽ lỗi; `keepers` không đổi.

## Lỗi thường gặp

- Xóa nhầm `keepers` — đọc kỹ tên bảng.
- Dùng `DELETE FROM obsolete` — lệnh đó chỉ xóa dòng, bảng trống vẫn còn.
- Viết `DROP TABLE obsolete, keepers` khi bài chỉ yêu cầu một bảng.

## Thử ngay

Xóa bảng `obsolete`. Giữ nguyên `keepers`.
