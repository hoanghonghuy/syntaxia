---
id: css-03-combinators
track: css-basics
locale: vi
slug: combinators-and-groups
title: Quan hệ trong selector
order: 3
published: true
can_do: "Đọc quan hệ descendant và child từ cây HTML rồi viết selector chỉ target các element trong đúng structural context"
objectives:
  - Phân biệt descendant với direct-child relationship
  - Nhận biết adjacent/general sibling relationship
  - Hiểu selector list là cách dùng chung declaration cho nhiều target
exercise:
  mode: both
  starterHtml: |
    <article>
      <p>Inside article</p>
      <div><p>Nested deeper</p></div>
    </article>
    <p>Outside article</p>
  starter: |
    /* TODO: làm mọi paragraph nằm trong article thành màu green */
  hints:
    - Quan hệ cần target là descendant, không chỉ direct child.
    - Dấu cách giữa selector nghĩa là “nằm bên trong ở bất kỳ độ sâu nào”.
    - Dùng: article p { color: green; }
  solution: |
    article p { color: green; }
  expected:
    type: cssRules
    rules:
      - selector: article p
        declarations:
          color: green
---

Combinator biến cây HTML thành điều kiện selector.

## Mô hình tư duy

| Selector | Quan hệ |
| --- | --- |
| `article p` | p ở bất kỳ đâu bên trong article |
| `article > p` | p có parent trực tiếp là article |
| `h2 + p` | p là sibling đứng ngay sau h2 |
| `h2 ~ p` | các p sibling đứng sau h2 |
| `h1, h2` | selector list: dùng cùng declaration cho cả hai target |

Dấu cách trong descendant selector là cú pháp có ý nghĩa.

## Dự đoán kết quả hiển thị

Với `article` chứa một paragraph trực tiếp và một paragraph khác nằm trong `div`, hãy dự đoán `article p` match cả hai. `article > p` chỉ match direct child.

## Ví dụ mẫu

```css
article p { color: green; }
article > h2 { margin-top: 0; }
h1, h2 { font-family: sans-serif; }
```

Đọc quan hệ trong HTML trước khi chọn combinator; đừng chọn chỉ dựa trên vị trí hình ảnh hiện tại.

## Tìm lỗi

```css
article > p { color: green; }
```

Nếu yêu cầu là “mọi paragraph ở bất kỳ đâu trong article”, child combinator quá hẹp: paragraph lồng dưới element khác sẽ bị bỏ sót.

## Lỗi thường gặp

- Xem descendant space và child `>` là tương đương.
- Tạo selector quá dài phụ thuộc vào độ sâu markup tình cờ.
- Nhầm comma của selector list với descendant relationship.

## Thử ngay

Target mọi paragraph trong `article`, kể cả paragraph lồng sâu, và để paragraph ngoài article không bị ảnh hưởng.

## Tự kiểm tra

Selector nào rộng hơn trong article: `article p` hay `article > p`?

**Đáp án:** `article p` vì nó match descendant ở bất kỳ độ sâu nào.
