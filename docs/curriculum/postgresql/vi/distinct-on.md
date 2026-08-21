---
id: pg-15-distinct
track: postgresql
locale: vi
slug: distinct-on
title: Một hàng xác định mỗi nhóm với DISTINCT ON
order: 15
published: true
can_do: "Dùng DISTINCT ON PostgreSQL cùng ORDER BY tương thích và xác định để chọn đúng một hàng mong muốn mỗi nhóm"
objectives:
  - Giải thích vì sao DISTINCT ON giữ hàng đầu tiên trong nhóm
  - Căn DISTINCT ON với các leftmost ORDER BY key
  - Thêm tie-breaker khi winner phải xác định
exercise:
  starter: "SELECT director, title, year FROM movies ORDER BY director, year DESC;"
  hints:
    - "DISTINCT ON (director) giữ hàng được sort đầu tiên cho mỗi director."
    - "ORDER BY phải bắt đầu bằng director, rồi xếp year mới nhất trước."
    - "Dùng: SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC, id DESC;"
  solution: "SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC, id DESC;"
  preview:
    columns: ["id", "director", "title", "year"]
    rows:
      - [1, "Nolan", "Inception", 2010]
      - [2, "Nolan", "Interstellar", 2014]
      - [3, "Villeneuve", "Arrival", 2016]
      - [4, "Villeneuve", "Dune", 2021]
  expected:
    columns: ["director", "title"]
    rows:
      - ["Nolan", "Interstellar"]
      - ["Villeneuve", "Dune"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, director TEXT, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Nolan', 'Inception', 2010), (2, 'Nolan', 'Interstellar', 2014), (3, 'Villeneuve', 'Arrival', 2016), (4, 'Villeneuve', 'Dune', 2021);"
---

`DISTINCT ON` là shortcut riêng của PostgreSQL cho “chọn một hàng mỗi nhóm”. Ý quan trọng là nó giữ **hàng đầu tiên sau khi sort**, nên ORDER BY định nghĩa winner.

## Mô hình tư duy

Pipeline:

```text
sort theo group + tiêu chí winner -> DISTINCT ON giữ hàng đầu mỗi group
```

Với Nolan, year giảm dần đặt Interstellar trước Inception. Với Villeneuve, Dune trước Arrival.

PostgreSQL yêu cầu expression của `DISTINCT ON` khớp các expression ngoài cùng bên trái của `ORDER BY`. Các key sau đó quyết định precedence trong nhóm.

## Dự đoán trước khi chạy

Một winner mỗi director: Nolan → Interstellar; Villeneuve → Dune.

## Ví dụ mẫu

```sql
SELECT DISTINCT ON (director) director, title
FROM movies
ORDER BY director, year DESC, id DESC;
```

| director | title |
| --- | --- |
| Nolan | Interstellar |
| Villeneuve | Dune |

`id DESC` là tie-breaker nếu hai hàng cùng director và year; thiếu ordering đủ mạnh thì “hàng đầu” vẫn có thể mơ hồ.

## Tìm lỗi

```sql
SELECT DISTINCT ON (director) director, title
FROM movies;
```

Query yêu cầu một hàng mỗi director nhưng không nói hàng nào được ưu tiên. SQL chạy được vẫn có thể nondeterministic về semantics.

## Lỗi thường gặp

- Bỏ ORDER BY rồi giả định hàng đầu có ý nghĩa.
- Không bắt đầu ORDER BY bằng expression của DISTINCT ON.
- Quên tie-breaker khi business rule cần winner ổn định duy nhất.

## Thử ngay

Trả movie mới nhất cho mỗi director bằng `DISTINCT ON`, kèm tie-breaker xác định.

## Tự kiểm tra

Điều gì quyết định hàng nào sống sót trong mỗi DISTINCT ON group?

**Đáp án:** hàng đứng đầu theo chuỗi ORDER BY tương thích.
