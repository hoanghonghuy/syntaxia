---
id: pg-14-coalesce
track: postgresql
locale: vi
slug: coalesce-nullif
title: Chuẩn hóa giá trị thiếu với NULLIF và COALESCE
order: 14
published: true
can_do: "Chuẩn hóa sentinel thành NULL bằng NULLIF rồi chọn fallback khả dụng đầu tiên bằng COALESCE"
objectives:
  - Biến empty-string sentinel thành NULL bằng NULLIF
  - Áp dụng semantics fallback trái sang phải của COALESCE
  - Phân biệt normalization dữ liệu với fallback hiển thị
exercise:
  starter: "SELECT name, nickname FROM people;"
  hints:
    - "Coi nickname rỗng là missing trước khi chọn fallback."
    - "NULLIF(nickname, '') chỉ đổi empty string thành NULL; COALESCE sau đó dùng name."
    - "Dùng: SELECT COALESCE(NULLIF(nickname, ''), name) AS label FROM people ORDER BY id;"
  solution: "SELECT COALESCE(NULLIF(nickname, ''), name) AS label FROM people ORDER BY id;"
  preview:
    columns: ["id", "name", "nickname"]
    rows:
      - [1, "Ana Nguyen", "Ana"]
      - [2, "Ben Tran", null]
      - [3, "Chi Le", ""]
  expected:
    columns: ["label"]
    rows:
      - ["Ana"]
      - ["Ben Tran"]
      - ["Chi Le"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE people (id INTEGER, name TEXT, nickname TEXT);"
    - "INSERT INTO people VALUES (1, 'Ana Nguyen', 'Ana'), (2, 'Ben Tran', NULL), (3, 'Chi Le', '');"
---

Dữ liệu thực tế thường có nhiều cách biểu diễn “không có giá trị hữu ích”. `NULLIF` và `COALESCE` có thể ghép để chuẩn hóa sentinel rồi chọn fallback.

## Mô hình tư duy

Đánh giá từ trong ra ngoài:

```text
nickname -> NULLIF(nickname, '') -> nickname đã chuẩn hóa hoặc NULL
         -> COALESCE(..., name)  -> value non-NULL đầu tiên
```

| người | nickname | sau `NULLIF(...,'')` | label cuối |
| --- | --- | --- | --- |
| Ana | `Ana` | `Ana` | Ana |
| Ben | NULL | NULL | Ben Tran |
| Chi | empty string | NULL | Chi Le |

## Dự đoán trước khi chạy

Theo id, label phải là Ana, Ben Tran, Chi Le.

## Ví dụ mẫu

```sql
SELECT COALESCE(NULLIF(nickname, ''), name) AS label
FROM people
ORDER BY id;
```

| label |
| --- |
| Ana |
| Ben Tran |
| Chi Le |

`NULLIF(a,b)` trả NULL khi `a = b`, nếu không trả `a`. `COALESCE` sau đó chọn expression non-NULL đầu tiên.

## Tìm lỗi

```sql
COALESCE(nickname, name)
```

Câu này xử lý NULL thật nhưng không xử lý empty string, vì `''` là value non-NULL đã biết nên thắng ngay. Hãy normalize sentinel có chủ đích nếu domain coi chúng là missing.

## Lỗi thường gặp

- Nghĩ text rỗng và NULL tự động có cùng semantics.
- Đảo priority argument của COALESCE khiến fallback luôn thắng.
- Dùng normalization lúc hiển thị để che data-quality issue đáng ra phải sửa ở ingestion/schema boundary.

## Thử ngay

Trả `label` ưu tiên nickname không rỗng, nếu không thì fallback sang name.

## Tự kiểm tra

Vì sao `COALESCE(nickname, name)` thông thường không thay nickname là empty string?

**Đáp án:** vì empty string vẫn là non-NULL nên COALESCE coi nó là giá trị hợp lệ đầu tiên.
