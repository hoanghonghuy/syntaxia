package repository

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"syntaxia/apps/api/internal/domain"
)

type Repository struct {
	pool *pgxpool.Pool
}

func New(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

func (r *Repository) CreateUser(ctx context.Context, email, passwordHash, displayName, role string) (domain.User, error) {
	var u domain.User
	err := r.pool.QueryRow(ctx, `
		INSERT INTO users (email, password_hash, display_name, role)
		VALUES ($1, $2, $3, $4::user_role)
		RETURNING id, email, display_name, role::text, created_at
	`, email, nullString(passwordHash), displayName, role).Scan(
		&u.ID, &u.Email, &u.DisplayName, &u.Role, &u.CreatedAt,
	)
	if err == nil && passwordHash != "" {
		u.HasPassword = true
	}
	return u, err
}

func (r *Repository) GetUserByEmail(ctx context.Context, email string) (domain.User, error) {
	var u domain.User
	var pw *string
	var googleID *string
	err := r.pool.QueryRow(ctx, `
		SELECT id, email, password_hash, display_name, role::text, google_id, created_at
		FROM users WHERE email = $1
	`, email).Scan(&u.ID, &u.Email, &pw, &u.DisplayName, &u.Role, &googleID, &u.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return u, pgx.ErrNoRows
	}
	if pw != nil {
		u.PasswordHash = *pw
	}
	u.GoogleID = googleID
	return u, err
}

func (r *Repository) GetUserByID(ctx context.Context, id uuid.UUID) (domain.User, error) {
	var u domain.User
	err := r.pool.QueryRow(ctx, `
		SELECT id, email, display_name, role::text, created_at,
			(COALESCE(password_hash, '') <> '') AS has_password
		FROM users WHERE id = $1
	`, id).Scan(&u.ID, &u.Email, &u.DisplayName, &u.Role, &u.CreatedAt, &u.HasPassword)
	return u, err
}

func (r *Repository) GetUserAuthByID(ctx context.Context, id uuid.UUID) (domain.User, error) {
	var u domain.User
	var pw *string
	err := r.pool.QueryRow(ctx, `
		SELECT id, email, password_hash, display_name, role::text, created_at
		FROM users WHERE id = $1
	`, id).Scan(&u.ID, &u.Email, &pw, &u.DisplayName, &u.Role, &u.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return u, pgx.ErrNoRows
	}
	if pw != nil {
		u.PasswordHash = *pw
	}
	return u, err
}

func (r *Repository) UpdateDisplayName(ctx context.Context, id uuid.UUID, displayName string) (domain.User, error) {
	var u domain.User
	err := r.pool.QueryRow(ctx, `
		UPDATE users SET display_name = $2, updated_at = now()
		WHERE id = $1
		RETURNING id, email, display_name, role::text, created_at,
			(COALESCE(password_hash, '') <> '') AS has_password
	`, id, displayName).Scan(&u.ID, &u.Email, &u.DisplayName, &u.Role, &u.CreatedAt, &u.HasPassword)
	return u, err
}

func (r *Repository) UpdatePasswordHash(ctx context.Context, id uuid.UUID, passwordHash string) error {
	tag, err := r.pool.Exec(ctx, `
		UPDATE users SET password_hash = $2, updated_at = now()
		WHERE id = $1
	`, id, passwordHash)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return pgx.ErrNoRows
	}
	return nil
}

func (r *Repository) UpsertGoogleUser(ctx context.Context, googleID, email, displayName, role string) (domain.User, error) {
	var u domain.User
	err := r.pool.QueryRow(ctx, `
		INSERT INTO users (email, display_name, google_id, role)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (email) DO UPDATE SET
			google_id = EXCLUDED.google_id,
			display_name = COALESCE(NULLIF(users.display_name, ''), EXCLUDED.display_name),
			role = CASE WHEN EXCLUDED.role = 'admin' THEN 'admin' ELSE users.role END,
			updated_at = now()
		RETURNING id, email, display_name, role::text, created_at,
			(COALESCE(password_hash, '') <> '') AS has_password
	`, email, displayName, googleID, role).Scan(&u.ID, &u.Email, &u.DisplayName, &u.Role, &u.CreatedAt, &u.HasPassword)
	return u, err
}

func (r *Repository) ListTracks(ctx context.Context) ([]domain.Track, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT id, title, description, COALESCE(category, 'sql'), COALESCE(level, 'basic'), sort_order
		FROM tracks ORDER BY sort_order
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var tracks []domain.Track
	for rows.Next() {
		var t domain.Track
		var title, desc []byte
		if err := rows.Scan(&t.ID, &title, &desc, &t.Category, &t.Level, &t.SortOrder); err != nil {
			return nil, err
		}
		_ = json.Unmarshal(title, &t.Title)
		_ = json.Unmarshal(desc, &t.Description)
		tracks = append(tracks, t)
	}
	return tracks, rows.Err()
}

func (r *Repository) ListLessons(ctx context.Context, trackID, locale string, publishedOnly bool) ([]domain.LessonSummary, error) {
	q := `
		SELECT id, locale, track_id, slug, title, sort_order, published,
		       COALESCE(exercise->>'unitId', ''),
		       COALESCE(exercise->>'unitTitle', ''),
		       CASE
		         WHEN COALESCE(exercise->>'unitOrder', '') ~ '^[0-9]+$'
		         THEN (exercise->>'unitOrder')::int
		         ELSE 0
		       END,
		       COALESCE(exercise->>'unitCanDo', ''),
		       COALESCE(exercise->>'unitRole', '')
		FROM lessons WHERE ($1 = '' OR track_id = $1) AND ($2 = '' OR locale = $2)
	`
	if publishedOnly {
		q += ` AND published = true`
	}
	q += ` ORDER BY sort_order`
	rows, err := r.pool.Query(ctx, q, trackID, locale)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.LessonSummary
	for rows.Next() {
		var l domain.LessonSummary
		if err := rows.Scan(
			&l.ID, &l.Locale, &l.TrackID, &l.Slug, &l.Title, &l.SortOrder, &l.Published,
			&l.UnitID, &l.UnitTitle, &l.UnitOrder, &l.UnitCanDo, &l.UnitRole,
		); err != nil {
			return nil, err
		}
		out = append(out, l)
	}
	return out, rows.Err()
}

func (r *Repository) GetLessonByID(ctx context.Context, id, locale string) (domain.Lesson, error) {
	var l domain.Lesson
	var objectives, exercise, seed []byte
	var driveID *string
	err := r.pool.QueryRow(ctx, `
		SELECT id, locale, track_id, slug, title, sort_order, objectives, drive_file_id,
		       body_md, body_html, exercise, sandbox_seed, published, version
		FROM lessons WHERE id = $1 AND locale = $2
	`, id, locale).Scan(
		&l.ID, &l.Locale, &l.TrackID, &l.Slug, &l.Title, &l.SortOrder,
		&objectives, &driveID, &l.BodyMD, &l.BodyHTML, &exercise, &seed, &l.Published, &l.Version,
	)
	if err != nil {
		return l, err
	}
	l.DriveFileID = driveID
	_ = json.Unmarshal(objectives, &l.Objectives)
	_ = json.Unmarshal(exercise, &l.Exercise)
	_ = json.Unmarshal(seed, &l.SandboxSeed)
	return l, nil
}

func (r *Repository) GetLesson(ctx context.Context, slug, locale, trackID string) (domain.Lesson, error) {
	var l domain.Lesson
	var objectives, exercise, seed []byte
	var driveID *string
	var err error
	if trackID != "" {
		err = r.pool.QueryRow(ctx, `
			SELECT id, locale, track_id, slug, title, sort_order, objectives, drive_file_id,
			       body_md, body_html, exercise, sandbox_seed, published, version
			FROM lessons WHERE slug = $1 AND locale = $2 AND track_id = $3
		`, slug, locale, trackID).Scan(
			&l.ID, &l.Locale, &l.TrackID, &l.Slug, &l.Title, &l.SortOrder,
			&objectives, &driveID, &l.BodyMD, &l.BodyHTML, &exercise, &seed, &l.Published, &l.Version,
		)
	} else {
		err = r.pool.QueryRow(ctx, `
			SELECT id, locale, track_id, slug, title, sort_order, objectives, drive_file_id,
			       body_md, body_html, exercise, sandbox_seed, published, version
			FROM lessons WHERE slug = $1 AND locale = $2
			ORDER BY track_id
			LIMIT 1
		`, slug, locale).Scan(
			&l.ID, &l.Locale, &l.TrackID, &l.Slug, &l.Title, &l.SortOrder,
			&objectives, &driveID, &l.BodyMD, &l.BodyHTML, &exercise, &seed, &l.Published, &l.Version,
		)
	}
	if err != nil {
		return l, err
	}
	l.DriveFileID = driveID
	_ = json.Unmarshal(objectives, &l.Objectives)
	_ = json.Unmarshal(exercise, &l.Exercise)
	_ = json.Unmarshal(seed, &l.SandboxSeed)
	return l, nil
}

func (r *Repository) UpsertLesson(ctx context.Context, l domain.Lesson) error {
	obj, _ := json.Marshal(l.Objectives)
	ex, _ := json.Marshal(l.Exercise)
	seed, _ := json.Marshal(l.SandboxSeed)
	_, err := r.pool.Exec(ctx, `
		INSERT INTO lessons (id, locale, track_id, slug, title, sort_order, objectives, drive_file_id,
			body_md, body_html, exercise, sandbox_seed, published, version, updated_at)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, now())
		ON CONFLICT (id, locale) DO UPDATE SET
			track_id = EXCLUDED.track_id,
			slug = EXCLUDED.slug,
			title = EXCLUDED.title,
			sort_order = EXCLUDED.sort_order,
			objectives = EXCLUDED.objectives,
			drive_file_id = EXCLUDED.drive_file_id,
			body_md = EXCLUDED.body_md,
			body_html = EXCLUDED.body_html,
			exercise = EXCLUDED.exercise,
			sandbox_seed = EXCLUDED.sandbox_seed,
			published = EXCLUDED.published,
			version = lessons.version + 1,
			updated_at = now()
	`, l.ID, l.Locale, l.TrackID, l.Slug, l.Title, l.SortOrder, obj, l.DriveFileID,
		l.BodyMD, l.BodyHTML, ex, seed, l.Published, l.Version)
	return err
}

func (r *Repository) DeleteLesson(ctx context.Context, id, locale string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM lessons WHERE id = $1 AND locale = $2`, id, locale)
	return err
}

func (r *Repository) UpsertProgress(ctx context.Context, userID uuid.UUID, lessonID, locale string, completed bool) (domain.Progress, error) {
	var p domain.Progress
	var completedAt *time.Time
	if completed {
		now := time.Now().UTC()
		completedAt = &now
	}
	err := r.pool.QueryRow(ctx, `
		INSERT INTO lesson_progress (user_id, lesson_id, locale, completed, completed_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, now())
		ON CONFLICT (user_id, lesson_id, locale) DO UPDATE SET
			completed = EXCLUDED.completed,
			completed_at = EXCLUDED.completed_at,
			updated_at = now()
		RETURNING lesson_id, locale, completed, completed_at
	`, userID, lessonID, locale, completed, completedAt).Scan(&p.LessonID, &p.Locale, &p.Completed, &p.CompletedAt)
	return p, err
}

func (r *Repository) ListProgress(ctx context.Context, userID uuid.UUID) ([]domain.Progress, error) {
	rows, err := r.pool.Query(ctx, listProgressSQL(), userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.Progress
	for rows.Next() {
		var p domain.Progress
		if err := rows.Scan(&p.LessonID, &p.Locale, &p.Completed, &p.CompletedAt); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}

func (r *Repository) ListNotes(ctx context.Context, userID uuid.UUID, lessonID, locale string) ([]domain.Note, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT id, lesson_id, locale, body, updated_at
		FROM lesson_notes WHERE user_id = $1 AND lesson_id = $2 AND locale = $3
		ORDER BY updated_at DESC
	`, userID, lessonID, locale)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.Note
	for rows.Next() {
		var n domain.Note
		if err := rows.Scan(&n.ID, &n.LessonID, &n.Locale, &n.Body, &n.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, n)
	}
	return out, rows.Err()
}

func (r *Repository) ListAllNotes(ctx context.Context, userID uuid.UUID, locale string) ([]domain.NoteListItem, error) {
	rows, err := r.pool.Query(ctx, listAllNotesSQL(), userID, locale)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.NoteListItem
	for rows.Next() {
		var n domain.NoteListItem
		if err := rows.Scan(
			&n.ID, &n.LessonID, &n.Locale, &n.Body, &n.UpdatedAt,
			&n.Slug, &n.Title, &n.TrackID,
		); err != nil {
			return nil, err
		}
		out = append(out, n)
	}
	return out, rows.Err()
}

func (r *Repository) CreateNote(ctx context.Context, userID uuid.UUID, lessonID, locale, body string) (domain.Note, error) {
	var n domain.Note
	err := r.pool.QueryRow(ctx, `
		INSERT INTO lesson_notes (user_id, lesson_id, locale, body)
		VALUES ($1, $2, $3, $4)
		RETURNING id, lesson_id, locale, body, updated_at
	`, userID, lessonID, locale, body).Scan(&n.ID, &n.LessonID, &n.Locale, &n.Body, &n.UpdatedAt)
	return n, err
}

func (r *Repository) UpdateNote(ctx context.Context, userID, noteID uuid.UUID, body string) (domain.Note, error) {
	var n domain.Note
	err := r.pool.QueryRow(ctx, `
		UPDATE lesson_notes SET body = $3, updated_at = now()
		WHERE id = $1 AND user_id = $2
		RETURNING id, lesson_id, locale, body, updated_at
	`, noteID, userID, body).Scan(&n.ID, &n.LessonID, &n.Locale, &n.Body, &n.UpdatedAt)
	return n, err
}

func (r *Repository) DeleteNote(ctx context.Context, userID, noteID uuid.UUID) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM lesson_notes WHERE id = $1 AND user_id = $2`, noteID, userID)
	return err
}

func nullString(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}
