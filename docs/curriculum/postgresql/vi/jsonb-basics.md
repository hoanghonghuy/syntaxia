---
id: pg-12-jsonb
track: postgresql
locale: vi
slug: jsonb-basics
title: Query document có cấu trúc với JSONB
order: 12
published: true
can_do: "Extract scalar từ JSONB và lọc document bằng containment đồng thời nhận ra khi relational column là mô hình tốt hơn"
objectives:
  - Phân biệt JSONB extraction bằng -> và ->>
  - Lọc document với toán tử containment @>
  - Giải thích boundary sử dụng JSONB hợp lý
exercise:
  starter: "SELECT data FROM profiles;"
  hints:
    - "Lọc cấu trúc bằng cách hỏi data có chứa city Hanoi hay không."
    - "Dùng @> với JSONB object, sau đó ->> để trả name thành text."
    - "Dùng: SELECT data->>'name' AS name FROM profiles WHERE data @> '{\"city\":\"Hanoi\"}'::jsonb ORDER BY name;"
  solution: "SELECT data->>'name' AS name FROM profiles WHERE data @> '{\"city\":\"Hanoi\"}'::jsonb ORDER BY name;"
  preview:
    columns: ["id", "data"]
    rows:
      - [1, "{\"name\":\"Ana\",\"city\":\"Hanoi\"}"]
      - [2, "{\"name\":\"Ben\",\"city\":\"Hue\"}"]
      - [3, "{\"name\":\"Cara\",\"city\":\"Hanoi\"}"]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Cara"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE profiles (id INTEGER, data JSONB);"
    - "INSERT INTO profiles VALUES (1, '{\"name\":\"Ana\",\"city\":\"Hanoi\"}'::jsonb), (2, '{\"name\":\"Ben\",\"city\":\"Hue\"}'::jsonb), (3, '{\"name\":\"Cara\",\"city\":\"Hanoi\"}'::jsonb);"
---

`JSONB` phù hợp khi một relational row thực sự sở hữu một document có cấu trúc linh hoạt. PostgreSQL query trực tiếp cấu trúc đó và có thể index nhiều JSONB operator phổ biến.

## Mô hình tư duy

Tách extraction khỏi filtering:

| operator | kết quả |
| --- | --- |
| `data->'name'` | JSON value |
| `data->>'name'` | SQL text |
| `data @> '{"city":"Hanoi"}'::jsonb` | boolean containment test |

Với dữ liệu bài, containment giữ Ana và Cara, rồi `->>` project tên thành text thông thường.

JSONB không phải lý do để bỏ relational modeling. Field ổn định cần foreign key, constraint cột, join hoặc update độc lập thường rõ hơn khi là column/table bình thường.

## Dự đoán trước khi chạy

Document của Ana và Cara chứa đúng cặp `"city":"Hanoi"`; Ben thì không. Kết quả phải có hai tên theo alphabet.

## Ví dụ mẫu

```sql
SELECT data->>'name' AS name
FROM profiles
WHERE data @> '{"city":"Hanoi"}'::jsonb
ORDER BY name;
```

| name |
| --- |
| Ana |
| Cara |

PostgreSQL có thể hỗ trợ `@>` bằng GIN index khi workload và document shape phù hợp.

## Tìm lỗi

```sql
WHERE data::text LIKE '%Hanoi%'
```

Cách này bỏ qua cấu trúc JSON và search representation đã serialize. Nó có thể match ngoài ý muốn và không biểu đạt containment rõ như JSONB operator.

## Lỗi thường gặp

- Dùng `->` khi logic sau cần SQL text từ `->>`.
- Biến JSONB thành nơi đổ mọi field đáng ra cần relational constraint.
- Cast cả document sang text để search thay vì dùng structural operator.

## Thử ngay

Trả name của profile có JSONB data chứa city Hanoi, sắp theo name.

## Tự kiểm tra

Khi nào `->>` phù hợp hơn `->`?

**Đáp án:** khi cần scalar JSON được extract thành SQL text thay vì JSON value.
