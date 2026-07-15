package repository

func listProgressSQL() string {
	return `
		SELECT p.lesson_id, p.locale, p.completed, p.completed_at
		FROM lesson_progress p
		JOIN lessons l ON l.id = p.lesson_id AND l.locale = p.locale
		WHERE p.user_id = $1 AND l.published = true
	`
}
