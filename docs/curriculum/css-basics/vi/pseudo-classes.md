---
id: css-04-pseudo
track: css-basics
locale: vi
slug: pseudo-classes
title: Style trạng thái element bằng pseudo-class
order: 4
published: true
can_do: "Dùng pseudo-class để style element hiện có theo interaction state và vẫn giữ focus state nhìn thấy được cho bàn phím"
objectives:
  - Đọc pseudo-class như điều kiện state trên một element
  - Style hover và focus riêng biệt
  - Không xóa focus indication nếu chưa có replacement
exercise:
  mode: both
  starterHtml: |
    <a href="/docs">Documentation</a>
  starter: |
    /* TODO: làm link màu orange khi hover và có outline nhìn thấy khi focus */
  hints:
    - Nối :hover và :focus vào anchor selector.
    - Hai interaction state nên là hai rule riêng.
    - Dùng a:hover { color: orange; } và a:focus { outline: 2px solid blue; }.
  solution: |
    a:hover { color: orange; }
    a:focus { outline: 2px solid blue; }
  expected:
    type: cssRules
    rules:
      - selector: a:hover
        declarations:
          color: orange
      - selector: a:focus
        declarations:
          outline: 2px solid blue
---

Pseudo-class thêm một **điều kiện trạng thái** vào selector. Element không biến thành loại element khác; state hiện tại quyết định rule nào match.

## Mô hình tư duy

```text
anchor + điều kiện state -> rule state được match

a:hover  pointer đang ở trên anchor
a:focus  anchor đang có focus
```

Focus đặc biệt quan trọng với người dùng bàn phím điều hướng bằng Tab.

## Dự đoán kết quả hiển thị

Trước khi preview, hãy dự đoán: đưa pointer lên link làm đổi màu; focus bằng bàn phím tạo outline. Hai state có thể xảy ra độc lập.

## Ví dụ mẫu

```css
a:hover { color: orange; }
a:focus { outline: 2px solid blue; }
```

Các pseudo-class như `:link`, `:visited`, `:hover`, `:focus`, `:active` đại diện cho các link state khác nhau. Focus cần luôn nhìn thấy được.

## Tìm lỗi

```css
a:focus { outline: none; }
```

Xóa focus indicator mặc định mà không có alternative khiến vị trí bàn phím khó nhận biết. Nếu custom focus, phải thay bằng style khác nhìn thấy rõ.

## Lỗi thường gặp

- Nghĩ `:hover` là class phải thêm vào HTML.
- Chỉ thiết kế pointer hover và quên keyboard focus.
- Xóa outline focus chỉ vì hình thức mà không thay accessibility cue khác.

## Thử ngay

Cài cả hover và focus style. Grader xác minh mỗi declaration nằm đúng state selector tương ứng.

## Tự kiểm tra

`:focus` có cần thêm `class="focus"` vào HTML không?

**Đáp án:** không. Nó tự match state focus hiện tại của element.
