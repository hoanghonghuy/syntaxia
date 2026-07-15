-- Code category scaffold: first track (MDN JavaScript First Steps / fundamentals)
INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    (
        'javascript-basics',
        '{"en":"JavaScript Basics","vi":"JavaScript cơ bản"}',
        '{"en":"Core language basics mapped from MDN JavaScript First Steps","vi":"Nền tảng ngôn ngữ theo MDN JavaScript First Steps"}',
        'code',
        'basic',
        10
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
