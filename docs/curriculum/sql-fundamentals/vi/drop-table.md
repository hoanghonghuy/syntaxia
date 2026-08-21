---
id: sql-31-drop
track: sql-fundamentals
locale: vi
slug: drop-table
title: Xóa bảng với DROP TABLE
order: 31
published: true
can_do: "Chọn DROP TABLE chỉ khi cần xóa cả object database chứ không chỉ các hàng bên trong"
objectives:
  - Phân biệt DELETE với DROP TABLE
  - Dự đoán tác động ở cấp object của DROP TABLE
  - Xóa đúng một bảng mục tiêu mà không ảnh hưởng bảng bên cạnh
exercise:
  starter: "DROP TABLE "
  hints:
    - "Yêu cầu là xóa chính object bảng, không chỉ xóa các hàng."
    - "Nhắm vào obsolete và giữ nguyên keepers."
    - "Dùng: DROP TABLE obsolete;"
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

Xóa dữ liệu và xóa object database là hai thao tác khác nhau. `DROP TABLE` xóa chính định nghĩa bảng, đồng thời các hàng bên trong cũng không còn.

## Mô hình tư duy

| Lệnh | Các hàng sau lệnh | Bảng sau lệnh |
| --- | --- | --- |
| `DELETE FROM obsolete;` | 0 | vẫn tồn tại |
| `DROP TABLE obsolete;` | không còn truy cập | không còn tồn tại |

Sandbox bắt đầu với hai object độc lập: `obsolete` và `keepers`. Yêu cầu chỉ nhắm một bảng.

## Dự đoán trước khi chạy

Sau `DROP TABLE obsolete;`:

- `obsolete` không còn resolve thành relation;
- `keepers` vẫn phải tồn tại cùng hàng dữ liệu của nó.

Đây là mutation ở cấp object nên độ chính xác của tên bảng đặc biệt quan trọng.

## Ví dụ mẫu

```sql
DROP TABLE obsolete;
```

Verifier kiểm tra relation tạm tên `obsolete` không còn tồn tại.

## Tìm lỗi

```sql
DELETE FROM obsolete;
```

Bảng có thể hết dữ liệu nhưng object vẫn còn. Nếu yêu cầu nói chính bảng đã lỗi thời, xóa hàng là sai phạm vi thay đổi.

## Lỗi thường gặp

- Dùng `DELETE` khi cần xóa cả object bảng.
- Drop nhầm bảng vì câu lệnh ngắn nhưng có tính phá hủy.
- Xem DDL phá hủy như thao tác nhẹ; trong hệ thống thật cần thực hiện có chủ đích và kiểm soát.

## Thử ngay

Drop duy nhất bảng `obsolete`. Trước khi chạy, hãy nói rõ object nào vẫn phải tồn tại sau đó.

## Tự kiểm tra

Sau `DELETE FROM t`, `SELECT * FROM t` vẫn có thể là query hợp lệ không?

**Đáp án:** có, vì `DELETE` xóa hàng nhưng giữ bảng `t`.
