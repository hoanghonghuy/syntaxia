package repository

// listAllNotesSQL returns the notes-hub query; must only join published lessons.
func listAllNotesSQL() string {
	return `
		SELECT n.id, n.lesson_id, n.locale, n.body, n.updated_at,
		       l.slug, l.title, l.track_id
		FROM lesson_notes n
		JOIN lessons l ON l.id = n.lesson_id AND l.locale = n.locale
		WHERE n.user_id = $1 AND n.locale = $2 AND l.published = true
		ORDER BY n.updated_at DESC
	`
}
