-- japanese-jlpt: N5 MVP copy (lessons ship under docs/curriculum/japanese-jlpt/).
UPDATE tracks
SET
    title = '{"en":"Japanese (JLPT)","vi":"Tiếng Nhật (JLPT)"}',
    description = '{"en":"JLPT N5 starter path — Japanese with vi/en explain. Recognition, kana readings, and short drills (not IT sandboxes).","vi":"Lộ trình JLPT N5 — tiếng Nhật giải thích vi/en. Nhận chữ, kana và bài luyện ngắn (không phải sandbox IT)."}'
WHERE id = 'japanese-jlpt';
