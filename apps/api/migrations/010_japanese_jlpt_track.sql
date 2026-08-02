-- Languages: Japanese JLPT track placeholder (target ja; explain via UI locale vi/en).
-- No lesson bodies until N5 map + OpenSpec — same pattern as early chinese-hsk / english-basics.
INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    (
        'japanese-jlpt',
        '{"en":"Japanese (JLPT)","vi":"Tiếng Nhật (JLPT)"}',
        '{"en":"Learn Japanese with vi/en explanations — under development. JLPT N5 path planned; same language player pattern as Chinese/English (not IT sandboxes).","vi":"Học tiếng Nhật với giải thích vi/en — đang phát triển. Dự kiến lộ trình JLPT N5; cùng kiểu bài ngôn ngữ như Trung/Anh (không phải sandbox IT)."}',
        'languages',
        'basic',
        120
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
