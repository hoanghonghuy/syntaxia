---
id: css-06-box
track: css-basics
locale: vi
slug: box-model
title: Box model và sizing dễ dự đoán
order: 6
published: true
can_do: "Theo dõi content, padding, border và margin rồi dùng border-box để width khai báo bao gồm cả padding và border"
objectives:
  - Phân biệt bốn layer của box model
  - Dự đoán total size giữa content-box và border-box
  - Dùng box-sizing để kích thước component dễ dự đoán
exercise:
  mode: both
  starterHtml: |
    <div class="box">Box</div>
  starter: |
    /* TODO: làm .box rộng 200px tính cả padding 20px và border 2px */
  hints:
    - Với content-box mặc định, padding và border cộng thêm ra ngoài declared width.
    - Đặt box-sizing: border-box để width bao gồm content, padding và border.
    - Dùng width: 200px; padding: 20px; border: 2px solid black; box-sizing: border-box;.
  solution: |
    .box {
      width: 200px;
      padding: 20px;
      border: 2px solid black;
      box-sizing: border-box;
    }
  expected:
    type: cssRules
    rules:
      - selector: .box
        declarations:
          width: 200px
          padding: 20px
          border: 2px solid black
          box-sizing: border-box
---

Mọi element khi render đều tham gia box model. Kỹ năng quan trọng là dự đoán dimension nào nằm **bên trong** declared size và dimension nào cộng thêm ra ngoài.

## Mô hình tư duy

```text
margin
  border
    padding
      content
```

`box-sizing: content-box` mặc định làm `width` chỉ mô tả content width. `border-box` làm declared width bao gồm content + padding + border.

## Dự đoán kết quả hiển thị

Với `width: 200px; padding: 20px; border: 2px solid`, content-box tạo outer border-box rộng `244px` (200 + 40 padding + 4 border). Với `border-box`, outer border-box giữ ở `200px`.

## Ví dụ mẫu

```css
.card {
  width: 20rem;
  padding: 1rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
```

Margin vẫn nằm ngoài ở cả hai sizing model; nó tách box này khỏi box lân cận.

## Tìm lỗi

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
}
```

Nếu design yêu cầu visible border box giữ đúng 200px, content-box mặc định làm nó rộng quá. Hãy đổi sizing model thay vì tự trừ padding thủ công ở mọi nơi.

## Lỗi thường gặp

- Gọi margin là “khoảng trống bên trong box”.
- Quên rằng hai phía padding ngang và hai border đều cộng vào outer width của content-box.
- Hard-code width bù trừ thay vì chọn đúng box-sizing model.

## Thử ngay

Tạo border box rộng 200px với padding và border nằm trong width đó.

## Tự kiểm tra

Margin có trở thành một phần của declared width khi dùng `border-box` không?

**Đáp án:** không. Margin vẫn nằm ngoài border box.
