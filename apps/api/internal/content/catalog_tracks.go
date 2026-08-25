package content

import "syntaxia/apps/api/internal/domain"

// BuiltinTracks is the application-owned catalog metadata required by the
// bundled curriculum. Keeping this available at runtime lets an existing
// production database heal when new tracks were added after its initial
// one-shot bootstrap migration.
func BuiltinTracks() []domain.Track {
	return []domain.Track{
		{
			ID: "sql-fundamentals",
			Title: map[string]string{"en": "SQL Fundamentals", "vi": "SQL cơ bản"},
			Description: map[string]string{"en": "Portable SQL fundamentals aligned with SQLBolt", "vi": "Nền tảng SQL chuẩn, tham chiếu SQLBolt"},
			Category: "sql", Level: "basic", SortOrder: 1,
		},
		{
			ID: "postgresql",
			Title: map[string]string{"en": "PostgreSQL", "vi": "PostgreSQL"},
			Description: map[string]string{"en": "PostgreSQL from basics to advanced", "vi": "PostgreSQL từ cơ bản đến nâng cao"},
			Category: "sql", Level: "intermediate", SortOrder: 2,
		},
		{
			ID: "html-basics",
			Title: map[string]string{"en": "HTML Basics", "vi": "HTML cơ bản"},
			Description: map[string]string{"en": "Semantic HTML fundamentals mapped from MDN Learn", "vi": "Nền tảng HTML ngữ nghĩa tham chiếu MDN Learn"},
			Category: "web", Level: "basic", SortOrder: 5,
		},
		{
			ID: "css-basics",
			Title: map[string]string{"en": "CSS Basics", "vi": "CSS cơ bản"},
			Description: map[string]string{"en": "CSS fundamentals through a Flexbox introduction", "vi": "Nền tảng CSS đến phần nhập môn Flexbox"},
			Category: "web", Level: "basic", SortOrder: 6,
		},
		{
			ID: "javascript-basics",
			Title: map[string]string{"en": "JavaScript Basics", "vi": "JavaScript cơ bản"},
			Description: map[string]string{"en": "Core JavaScript language fundamentals mapped from MDN", "vi": "Nền tảng ngôn ngữ JavaScript tham chiếu MDN"},
			Category: "code", Level: "basic", SortOrder: 10,
		},
		{
			ID: "chinese-hsk",
			Title: map[string]string{"en": "Chinese (Mandarin)", "vi": "Tiếng Trung (Phổ thông)"},
			Description: map[string]string{"en": "Mandarin foundation aligned with the 2021 Chinese proficiency standard direction: pronunciation, vocabulary, grammar and everyday communication", "vi": "Nền tảng tiếng Trung theo định hướng chuẩn năng lực 2021: phát âm, từ vựng, ngữ pháp và giao tiếp đời sống"},
			Category: "languages", Level: "basic", SortOrder: 100,
		},
		{
			ID: "english-basics",
			Title: map[string]string{"en": "English Basics", "vi": "Tiếng Anh cơ bản"},
			Description: map[string]string{"en": "CEFR A1 practical foundation: pronunciation, core grammar, vocabulary and everyday communication", "vi": "Nền tảng thực hành CEFR A1: phát âm, ngữ pháp cốt lõi, từ vựng và giao tiếp đời sống"},
			Category: "languages", Level: "basic", SortOrder: 110,
		},
		{
			ID: "japanese-jlpt",
			Title: map[string]string{"en": "Japanese (JLPT)", "vi": "Tiếng Nhật (JLPT)"},
			Description: map[string]string{"en": "Practical Japanese N5 foundation with kana, basic language patterns and everyday communication", "vi": "Nền tảng tiếng Nhật N5 thực hành với kana, mẫu câu cơ bản và giao tiếp đời sống"},
			Category: "languages", Level: "basic", SortOrder: 120,
		},
		{
			ID: "chinese-it-vocab",
			Title: map[string]string{"en": "Chinese for IT", "vi": "Tiếng Trung chuyên ngành IT"},
			Description: map[string]string{"en": "Optional specialty Mandarin for common technology workplace situations", "vi": "Chuyên đề tiếng Trung tùy chọn cho các tình huống công nghệ tại nơi làm việc"},
			Category: "languages", Level: "basic", SortOrder: 130,
		},
	}
}
