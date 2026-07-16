-- Web category: HTML + CSS basics tracks (MDN-mapped)
INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    (
        'html-basics',
        '{"en":"HTML Basics","vi":"HTML cơ bản"}',
        '{"en":"Semantic HTML mapped from the MDN Learn curriculum","vi":"HTML ngữ nghĩa theo lộ trình MDN Learn"}',
        'web',
        'basic',
        5
    ),
    (
        'css-basics',
        '{"en":"CSS Basics","vi":"CSS cơ bản"}',
        '{"en":"CSS fundamentals and Flexbox intro mapped from MDN Learn","vi":"Nền tảng CSS và Flexbox cơ bản theo MDN Learn"}',
        'web',
        'basic',
        6
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
