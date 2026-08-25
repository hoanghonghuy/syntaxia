---
id: pg-04-boolean
track: postgresql
locale: vi
slug: boolean-filters
title: Lọc BOOLEAN và giá trị unknown
order: 4
published: true
can_do: "Lọc BOOLEAN PostgreSQL đồng thời phân biệt TRUE, FALSE và trạng thái unknown NULL"
objectives:
  - Xem BOOLEAN là true / false với NULL đại diện unknown
  - Dùng IS TRUE để chỉ lấy hàng true đã biết
  - Giải thích WHERE xử lý kết quả boolean unknown như nào
exercise:
  starter: "SELECT name, active FROM members;"
  hints:
    - "Yêu cầu chỉ lấy member được xác nhận active, không lấy false hay unknown."
    - "IS TRUE biểu đạt tường minh việc chỉ giữ TRUE."
    - "Dùng: SELECT name FROM members WHERE active IS TRUE ORDER BY name;"
  solution: "SELECT name FROM members WHERE active IS TRUE ORDER BY name;"
  preview:
    columns: ["id", "name", "active"]
    rows:
      - [1, "Ana", true]
      - [2, "Ben", false]
      - [3, "Chi", true]
      - [4, "Dee", false]
      - [5, "Eve", null]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Chi"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE members (id INTEGER, name TEXT, active BOOLEAN);"
    - "INSERT INTO members VALUES (1, 'Ana', TRUE), (2, 'Ben', FALSE), (3, 'Chi', TRUE), (4, 'Dee', FALSE), (5, 'Eve', NULL);"
---

Cột boolean PostgreSQL có thể chứa `TRUE` đã biết, `FALSE` đã biết hoặc `NULL` khi trạng thái chưa biết.

## Mô hình tư duy

| active | ý nghĩa | `active IS TRUE` |
| --- | --- | --- |
| `TRUE` | biết chắc active | true |
| `FALSE` | biết chắc inactive | false |
| `NULL` | chưa biết trạng thái | false |

`WHERE active` là cách viết ngắn và giữ hàng khi biểu thức true. `IS TRUE` hữu ích lúc học vì cho thấy rõ NULL được xử lý thế nào.

## Dự đoán trước khi chạy

Ana và Chi là true đã biết. Ben, Dee false; Eve unknown. Kết quả phải đúng Ana và Chi.

## Ví dụ mẫu

```sql
SELECT name
FROM members
WHERE active IS TRUE
ORDER BY name;
```

| name |
| --- |
| Ana |
| Chi |

## Tìm lỗi

```sql
WHERE active IS NOT FALSE
```

Câu này lấy cả TRUE **và NULL**. Nếu business rule là “được xác nhận active”, không được âm thầm coi trạng thái unknown là active.

## Lỗi thường gặp

- Gộp NULL vào FALSE dù “unknown” có ý nghĩa nghiệp vụ khác.
- Lưu boolean bằng convention `1/0` tùy ý khi BOOLEAN biểu đạt domain trực tiếp hơn.
- Chọn predicate hiểu NULL mà không xác định unknown cần được lấy hay loại.

## Thử ngay

Trả đúng các member có active state là true tường minh, sắp theo name.

## Tự kiểm tra

BOOLEAN `NULL` có cùng nghĩa với `FALSE` không?

**Đáp án:** không. FALSE là false đã biết; NULL biểu diễn trạng thái boolean chưa biết.
