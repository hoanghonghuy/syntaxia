---
id: sql-27-exists
track: sql-fundamentals
locale: vi
slug: exists-subquery
title: Kiểm tra hàng liên quan với EXISTS
order: 27
published: true
can_do: "Dùng EXISTS tương quan để giữ các hàng cha có ít nhất một hàng con liên quan"
objectives:
  - Xem EXISTS như phép kiểm tra tồn tại true/false
  - Liên kết subquery với hàng hiện tại của query ngoài
  - Phân biệt kiểm tra tồn tại với việc trả dữ liệu của hàng con
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "Với mỗi director, query trong chỉ cần tìm thấy một movie khớp."
    - "Liên kết hai phía bằng m.director_id = d.id."
    - "Dùng: SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  solution: "SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2);"
---

Đôi khi câu hỏi nghiệp vụ chỉ là **có hàng liên quan hay không?** Bạn không cần các cột của movie; bạn cần câu trả lời có/không cho từng director.

## Mô hình tư duy

Một `EXISTS` tương quan giống phép kiểm tra nhỏ được thực hiện trong ngữ cảnh của từng hàng query ngoài:

| director ngoài | điều kiện bên trong | có hàng khớp? | giữ director? |
| --- | --- | --- | --- |
| Nolan (`d.id = 1`) | `m.director_id = 1` | có, 2 phim | có |
| Wachowski (`d.id = 2`) | `m.director_id = 2` | có, 1 phim | có |
| Villeneuve (`d.id = 3`) | `m.director_id = 3` | không | không |

`EXISTS` chỉ quan tâm “có ít nhất một hàng không?”. Vì vậy `SELECT 1` truyền đạt mục đích rõ hơn: giá trị được select bên trong không phải thứ ta cần lấy ra.

## Dự đoán trước khi chạy

```sql
SELECT name
FROM directors d
WHERE EXISTS (
  SELECT 1 FROM movies m
  WHERE m.director_id = d.id
);
```

Dự đoán hai tên: Nolan và Wachowski. Hãy giải thích thêm vì sao Nolan chỉ xuất hiện một lần dù có hai phim khớp: hàng ngoài chỉ được giữ một lần khi phép kiểm tra tồn tại là true.

## Ví dụ mẫu

```sql
SELECT name
FROM directors d
WHERE EXISTS (
  SELECT 1
  FROM movies m
  WHERE m.director_id = d.id
)
ORDER BY name;
```

| name |
| --- |
| Nolan |
| Wachowski |

Subquery là **correlated** vì nó tham chiếu `d.id` của director hiện tại bên ngoài.

## Tìm lỗi

Điều gì xảy ra nếu bỏ phần liên kết?

```sql
WHERE EXISTS (SELECT 1 FROM movies)
```

Vì bảng `movies` không rỗng, phép kiểm tra sẽ true với **mọi** director, kể cả Villeneuve. Subquery phải trả lời câu hỏi cho director hiện tại, không phải cho toàn bảng.

## Lỗi thường gặp

- Quên điều kiện tương quan khiến kết quả không còn phụ thuộc vào hàng query ngoài.
- Mong một hàng kết quả cho mỗi movie khớp; `EXISTS` chỉ giữ hoặc loại hàng ngoài.
- Viết projection phức tạp trong subquery dù mục tiêu chỉ là kiểm tra tồn tại.

## Thử ngay

Liệt kê tên mọi director có ít nhất một movie, sắp theo name. Trước khi chạy, hãy trace phép kiểm tra bên trong cho Villeneuve.

## Tự kiểm tra

Vì sao có thể dùng `SELECT 1` bên trong `EXISTS`?

**Đáp án:** vì `EXISTS` chỉ quan tâm subquery có trả ít nhất một hàng hay không, không quan tâm giá trị trong SELECT list.
