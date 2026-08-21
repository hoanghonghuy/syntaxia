---
id: html-09-forms
track: html-basics
locale: vi
slug: forms-basics
title: Form, label và tên dữ liệu gửi đi
order: 9
published: true
can_do: "Tạo form cơ bản có khả năng truy cập, trong đó label trỏ đúng input, control có submission name và button type rõ ràng"
objectives:
  - Liên kết giá trị for của label với id của input
  - Phân biệt id của control với name dùng khi submit
  - Dùng button type submit rõ ràng
exercise:
  mode: html
  starter: |
    <!-- TODO: tạo email form có label liên kết, input email có name và submit button -->
  hints:
    - Đặt label, input và button bên trong form.
    - Ghép label for="email" với input id="email"; đặt name="email" và type="email" cho input.
    - Dùng <button type="submit"> cho hành động gửi form.
  solution: |
    <form>
      <label for="email">Email</label>
      <input id="email" name="email" type="email">
      <button type="submit">Subscribe</button>
    </form>
  expected:
    type: htmlTags
    tags:
      - tag: form
        minCount: 1
      - tag: label
        minCount: 1
        requiredAttrs: [for]
      - tag: input
        minCount: 1
        requiredAttrs: [id, name, type]
        attrEquals:
          type: email
      - tag: button
        minCount: 1
        attrEquals:
          type: submit
    relations:
      - kind: attributeReference
        fromTag: label
        fromAttr: for
        toTag: input
        toAttr: id
        minCount: 1
---

Một form control cần nhiều hơn một ô nhìn thấy được. Nó cần **accessible name**, identity trong tài liệu và thường cần key cho dữ liệu submit.

## Mô hình tư duy

```text
label for="email" ─────┐
                       v
input id="email" name="email" type="email"
       |             |
  đích của label   key khi submit
```

`id` nối các quan hệ trong document như label; `name` là key dùng khi form data hợp lệ được submit.

## Dự đoán cấu trúc khi render

Với label liên kết đúng, hãy dự đoán điều xảy ra khi người dùng bấm chữ “Email”: focus chuyển vào email input. Đồng thời dự đoán key gửi lên server: nó đến từ `name`, không phải text hiển thị của label.

## Ví dụ mẫu

```html
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email">
  <button type="submit">Subscribe</button>
</form>
```

Trình duyệt cung cấp sẵn hành vi cho email input và label vì markup mô tả đúng quan hệ thay vì giả lập bằng hình thức.

## Tìm lỗi

```html
<label for="contact-email">Email</label>
<input id="email" name="email" type="email">
```

Label trỏ tới một id không tồn tại nên association bị hỏng. Hai giá trị phải khớp chính xác.

## Lỗi thường gặp

- Dùng placeholder thay cho visible label tồn tại ổn định.
- Nhầm `id` với `name` và bỏ mất một trong hai trách nhiệm.
- Để button type ngầm định trong form markup có thể tái sử dụng.

## Thử ngay

Tạo email form có association đúng. Grader giờ xác minh `label.for` thật sự tham chiếu tới `input.id` tồn tại, không chỉ đếm đủ hai tag.

## Tự kiểm tra

Attribute nào thường trở thành key trong form data được submit: `id` hay `name`?

**Đáp án:** `name`.
