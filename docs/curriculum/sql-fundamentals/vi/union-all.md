---
id: sql-37-union-all
track: sql-fundamentals
locale: vi
slug: union-all
title: Giữ hàng trùng với UNION ALL
order: 37
published: true
can_do: "Chọn UNION ALL khi gộp các result set tương thích phải giữ mọi hàng nguồn, kể cả hàng trùng"
objectives:
  - Xếp dọc các result set tương thích
  - Dự đoán việc giữ duplicate với UNION ALL
  - Chọn UNION hay UNION ALL từ semantics kết quả
exercise:
  starter: "SELECT name FROM east;"
  hints:
    - "Yêu cầu cần giữ mọi hàng nguồn, kể cả Ann lặp lại."
    - "Xếp hai SELECT tương thích bằng UNION ALL."
    - "Dùng: SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  solution: "SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE east (id INT, name TEXT);"
    - "CREATE TEMP TABLE west (id INT, name TEXT);"
    - "INSERT INTO east VALUES (1, 'Ann'), (2, 'Bo');"
    - "INSERT INTO west VALUES (1, 'Ann'), (2, 'Cy');"
---

`UNION` và `UNION ALL` đều kết hợp hàng theo **chiều dọc**. Điểm cần quyết định là các hàng kết quả trùng nhau có phải dữ liệu cần giữ hay không.

## Mô hình tư duy

Kết quả nguồn:

| east | west |
| --- | --- |
| Ann | Ann |
| Bo | Cy |

Sau khi xếp:

| phép toán | các hàng kết quả | số hàng |
| --- | --- | ---: |
| `UNION` | Ann, Bo, Cy | 3 |
| `UNION ALL` | Ann, Ann, Bo, Cy | 4 |

Khác JOIN: JOIN ghép các cột liên quan theo chiều ngang; nhóm UNION xếp các hàng có hình dạng tương thích.

## Dự đoán trước khi chạy

`Ann` có ở cả hai nguồn. Vì yêu cầu coi mọi lần xuất hiện đều có ý nghĩa, hãy dự đoán **4 hàng**, không phải 3.

## Ví dụ mẫu

```sql
SELECT name FROM east
UNION ALL
SELECT name FROM west
ORDER BY name;
```

| name |
| --- |
| Ann |
| Ann |
| Bo |
| Cy |

Hãy chọn theo semantics trước. `UNION ALL` còn có thể tránh công việc loại duplicate, nhưng không được đổi semantics chỉ vì lý do hiệu năng.

## Tìm lỗi

```sql
SELECT name FROM east
UNION
SELECT name FROM west;
```

Query chạy được nhưng một Ann biến mất. Nếu mỗi lần xuất hiện là một hàng nguồn có ý nghĩa, đây là lỗi mất dữ liệu logic.

## Lỗi thường gặp

- Dùng `UNION` theo thói quen khi duplicate cần được giữ.
- Kết hợp các SELECT không cùng số cột/hình dạng tương thích.
- Nhầm xếp dọc result set với JOIN theo quan hệ.

## Thử ngay

Gộp mọi name từ `east` và `west`, giữ cả hai hàng Ann và sắp kết quả cuối theo name.

## Tự kiểm tra

Nếu duplicate phải còn quan sát được, nên ưu tiên operator nào?

**Đáp án:** `UNION ALL`.
