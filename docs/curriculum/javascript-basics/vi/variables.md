---
id: js-01-variables
track: javascript-basics
locale: vi
slug: variables
title: Lưu giá trị bằng biến
order: 1
published: true
objectives:
  - Tạo biến bằng let hoặc const
  - Cập nhật biến let và đọc lại giá trị
  - Ưu tiên const khi giá trị không nên đổi
exercise:
  starter: |
    let name = "Syntaxia";
    // return số ký tự trong name
    return name.length;
  hints:
    - "Chuỗi có thuộc tính .length."
    - "Dùng return ở cuối với name.length."
    - "Đáp án là số, không phải chữ."
  solution: |
    let name = "Syntaxia";
    return name.length;
  expected:
    type: returnValue
    value: 8
---

Trong đời thường bạn dán giấy ghi chú lên hộp: “táo = 4”. Sau đó bạn có thể đổi số hoặc đọc lại. Trong JavaScript, hộp có nhãn đó gọi là **biến** (variable).

Hai cách tạo biến thường gặp:

| Từ khóa | Nghĩa đơn giản | Khi nào dùng |
| --- | --- | --- |
| `let` | Hộp có thể đổ đầy lại | Giá trị có thể đổi |
| `const` | Hộp đổ một lần | Giá trị nên giữ cố định |

## Ví dụ mẫu

```javascript
let score = 0;
score = 10;

const player = "Sam";
console.log(player + " scored " + score);
```

- `let score = 0;` tạo `score` và đặt `0` vào trong.
- `score = 10;` thay nội dung bằng `10` (được phép với `let`).
- `const player = "Sam";` tạo `player` và khóa đoạn chữ đó.
- Dòng cuối ghép cả hai giá trị thành một thông báo ngắn.

## Lỗi thường gặp

- Dùng tên trước khi tạo — phải khai báo bằng `let` hoặc `const` trước.
- Gán lại `const` (`player = "Alex"`) — sẽ báo lỗi; dùng `let` nếu cần đổi.
- Nhầm nhãn với giá trị — `score` là tên; `10` là nội dung đang lưu.

## Thử ngay

Dùng sandbox bên dưới: return độ dài chuỗi `"Syntaxia"`. Khi checker báo **Đúng rồi**, đánh dấu hoàn thành bài.
