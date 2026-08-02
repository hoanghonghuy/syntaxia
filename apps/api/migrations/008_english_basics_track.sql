-- Languages: English track placeholder (learn English; explain via UI locale vi/en).
-- No lesson bodies until pedagogy map + OpenSpec — same pattern as early chinese-hsk.
INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    (
        'english-basics',
        '{"en":"English Basics","vi":"Tiếng Anh cơ bản"}',
        '{"en":"Learn English with vi/en explanations — under development. Same language player pattern as Chinese (not IT sandboxes).","vi":"Học tiếng Anh với giải thích vi/en — đang phát triển. Cùng kiểu bài ngôn ngữ như tiếng Trung (không phải sandbox IT)."}',
        'languages',
        'basic',
        110
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
