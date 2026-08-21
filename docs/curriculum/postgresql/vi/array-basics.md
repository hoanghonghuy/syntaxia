---
id: pg-13-array
track: postgresql
locale: vi
slug: array-basics
title: Kiểm tra phần tử array với ANY
order: 13
published: true
can_do: "Mô hình hóa list nhỏ cùng kiểu bằng PostgreSQL array và kiểm tra membership với operator ANY(array)"
objectives:
  - Đọc TEXT[] như array các text value
  - Đánh giá scalar = ANY(array)
  - Nhận ra khi related table tốt hơn array column
exercise:
  starter: "SELECT title, tags FROM courses;"
  hints:
    - "Câu hỏi là scalar sql có bằng bất kỳ element nào trong tags không."
    - "Đặt scalar bên trái và ANY(tags) bên phải."
    - "Dùng: SELECT title FROM courses WHERE 'sql' = ANY(tags) ORDER BY title;"
  solution: "SELECT title FROM courses WHERE 'sql' = ANY(tags) ORDER BY title;"
  preview:
    columns: ["id", "title", "tags"]
    rows:
      - [1, "SQL Basics", "{sql,beginner}"]
      - [2, "Vue Intro", "{vue,frontend}"]
      - [3, "Postgres Tips", "{sql,postgres}"]
  expected:
    columns: ["title"]
    rows:
      - ["Postgres Tips"]
      - ["SQL Basics"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE courses (id INTEGER, title TEXT, tags TEXT[]);"
    - "INSERT INTO courses VALUES (1, 'SQL Basics', ARRAY['sql','beginner']), (2, 'Vue Intro', ARRAY['vue','frontend']), (3, 'Postgres Tips', ARRAY['sql','postgres']);"
---

Array PostgreSQL có thể mô hình hóa collection nhỏ có thứ tự gồm các value cùng type trong một row. Với membership, dạng scalar-vs-array của `ANY` so scalar với từng element.

## Mô hình tư duy

```sql
'sql' = ANY(tags)
```

có thể hiểu như:

```text
'sql' = tags[1] OR 'sql' = tags[2] OR ...
```

Trace các hàng:

| course | tags | chứa sql? |
| --- | --- | --- |
| SQL Basics | `{sql,beginner}` | có |
| Vue Intro | `{vue,frontend}` | không |
| Postgres Tips | `{sql,postgres}` | có |

Array hữu ích, nhưng quan hệ many-to-many có attribute riêng, constraint, ownership hoặc query độc lập thường xuyên thường nên là related table thay vì array ngày càng lớn.

## Dự đoán trước khi chạy

Có hai title khớp; khi sắp alphabet: Postgres Tips, SQL Basics.

## Ví dụ mẫu

```sql
SELECT title
FROM courses
WHERE 'sql' = ANY(tags)
ORDER BY title;
```

| title |
| --- |
| Postgres Tips |
| SQL Basics |

## Tìm lỗi

```sql
WHERE tags = 'sql'
```

Bên trái là array còn bên phải là một text scalar. Yêu cầu là membership, không phải whole-array equality.

## Lỗi thường gặp

- Nhầm equality của cả array với membership của element.
- Lưu comma-separated text rồi mất array semantics.
- Dùng array cho quan hệ đáng ra cần key, metadata hoặc constraint riêng ở bảng liên kết.

## Thử ngay

Trả title các course có array tags chứa `sql`, sắp theo title.

## Tự kiểm tra

`'sql' = ANY(tags)` trả lời câu hỏi gì?

**Đáp án:** có ít nhất một element của `tags` bằng text `sql` hay không.
