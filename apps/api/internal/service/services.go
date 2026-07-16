package service

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"gopkg.in/yaml.v3"

	"syntaxia/apps/api/internal/auth"
	"syntaxia/apps/api/internal/config"
	"syntaxia/apps/api/internal/content"
	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/internal/drive"
	"syntaxia/apps/api/internal/learning"
	"syntaxia/apps/api/internal/markdown"
	"syntaxia/apps/api/internal/repository"
	"syntaxia/apps/api/internal/sandbox"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/constants"
	"syntaxia/apps/api/pkg/validate"
)

type Services struct {
	Auth        *AuthService
	Content     *ContentService
	Learning    *LearningService
	Sandbox     *SandboxService
	Tokens      *auth.TokenService
	GoogleOAuth *oauth2.Config
}

func New(cfg config.Config, repo *repository.Repository, driveClient drive.Client, sandboxRunner *sandbox.Runner, tokens *auth.TokenService) *Services {
	var googleOAuth *oauth2.Config
	if cfg.GoogleClientID != "" && cfg.GoogleClientSecret != "" {
		googleOAuth = &oauth2.Config{
			ClientID:     cfg.GoogleClientID,
			ClientSecret: cfg.GoogleClientSecret,
			RedirectURL:  cfg.GoogleRedirectURL,
			Scopes:       []string{"openid", "email", "profile"},
			Endpoint:     google.Endpoint,
		}
	}
	content := &ContentService{repo: repo, drive: driveClient}
	return &Services{
		Auth:        &AuthService{repo: repo, tokens: tokens, bootstrapAdmin: cfg.BootstrapAdminEmail},
		Content:     content,
		Learning:    &LearningService{repo: repo},
		Sandbox:     &SandboxService{runner: sandboxRunner, content: content},
		Tokens:      tokens,
		GoogleOAuth: googleOAuth,
	}
}

type AuthService struct {
	repo           *repository.Repository
	tokens         *auth.TokenService
	bootstrapAdmin string
}

func (s *AuthService) Register(ctx context.Context, email, password, displayName string) (domain.User, string, error) {
	if err := validate.Email(email); err != nil {
		return domain.User{}, "", err
	}
	if err := validate.Password(password); err != nil {
		return domain.User{}, "", err
	}
	email = strings.ToLower(strings.TrimSpace(email))
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return domain.User{}, "", apperrors.Internal(err)
	}
	if displayName == "" {
		displayName = strings.Split(email, "@")[0]
	}
	if err := validate.DisplayName(displayName); err != nil {
		return domain.User{}, "", err
	}
	role := constants.RoleLearner
	if s.bootstrapAdmin != "" && email == s.bootstrapAdmin {
		role = constants.RoleAdmin
	}
	u, err := s.repo.CreateUser(ctx, email, string(hash), displayName, role)
	if err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			return domain.User{}, "", apperrors.Conflict("email already registered")
		}
		return domain.User{}, "", apperrors.Internal(err)
	}
	token, err := s.tokens.Sign(u.ID, u.Email, u.Role)
	return userResponse(u), token, err
}

func (s *AuthService) Login(ctx context.Context, email, password string) (domain.User, string, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	u, err := s.repo.GetUserByEmail(ctx, email)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.User{}, "", apperrors.Unauthorized("invalid credentials")
	}
	if err != nil {
		return domain.User{}, "", apperrors.Internal(err)
	}
	if u.PasswordHash == "" {
		return domain.User{}, "", apperrors.Unauthorized("use Google login for this account")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)); err != nil {
		return domain.User{}, "", apperrors.Unauthorized("invalid credentials")
	}
	token, err := s.tokens.Sign(u.ID, u.Email, u.Role)
	return userResponse(u), token, err
}

func (s *AuthService) GoogleCallback(ctx context.Context, googleID, email, name string) (domain.User, string, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	role := constants.RoleLearner
	if s.bootstrapAdmin != "" && email == s.bootstrapAdmin {
		role = constants.RoleAdmin
	}
	u, err := s.repo.UpsertGoogleUser(ctx, googleID, email, name, role)
	if err != nil {
		return domain.User{}, "", apperrors.Internal(err)
	}
	token, err := s.tokens.Sign(u.ID, u.Email, u.Role)
	return userResponse(u), token, err
}

func (s *AuthService) Me(ctx context.Context, userID uuid.UUID) (domain.User, error) {
	u, err := s.repo.GetUserByID(ctx, userID)
	if err != nil {
		return domain.User{}, apperrors.NotFound("user not found")
	}
	return userResponse(u), nil
}

func (s *AuthService) UpdateProfile(ctx context.Context, userID uuid.UUID, displayName string) (domain.User, error) {
	if err := validate.DisplayName(displayName); err != nil {
		return domain.User{}, err
	}
	displayName = strings.TrimSpace(displayName)
	u, err := s.repo.UpdateDisplayName(ctx, userID, displayName)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.User{}, apperrors.NotFound("user not found")
	}
	if err != nil {
		return domain.User{}, apperrors.Internal(err)
	}
	return userResponse(u), nil
}

func (s *AuthService) ChangePassword(ctx context.Context, userID uuid.UUID, currentPassword, newPassword string) error {
	if err := validate.Password(newPassword); err != nil {
		return err
	}
	if err := validate.PasswordsDiffer(currentPassword, newPassword); err != nil {
		return err
	}
	u, err := s.repo.GetUserAuthByID(ctx, userID)
	if errors.Is(err, pgx.ErrNoRows) {
		return apperrors.NotFound("user not found")
	}
	if err != nil {
		return apperrors.Internal(err)
	}
	if u.PasswordHash == "" {
		return apperrors.BadRequest("use Google login for this account")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(currentPassword)); err != nil {
		return apperrors.Unauthorized("current password is incorrect")
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return apperrors.Internal(err)
	}
	if err := s.repo.UpdatePasswordHash(ctx, userID, string(hash)); err != nil {
		return apperrors.Internal(err)
	}
	return nil
}

type ContentService struct {
	repo  *repository.Repository
	drive drive.Client
}

func (s *ContentService) ListTracks(ctx context.Context) ([]domain.Track, error) {
	return s.repo.ListTracks(ctx)
}

func (s *ContentService) ListLessons(ctx context.Context, trackID, locale string, admin bool) ([]domain.LessonSummary, error) {
	return s.repo.ListLessons(ctx, trackID, locale, !admin)
}

func (s *ContentService) GetLesson(ctx context.Context, slug, locale string) (domain.Lesson, error) {
	l, err := s.repo.GetLesson(ctx, slug, locale)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.Lesson{}, apperrors.NotFound("lesson not found")
	}
	return l, err
}

func (s *ContentService) GetLessonByID(ctx context.Context, id, locale string) (domain.Lesson, error) {
	l, err := s.repo.GetLessonByID(ctx, id, locale)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.Lesson{}, apperrors.NotFound("lesson not found")
	}
	return l, err
}

// GetPublishedLesson resolves by id or slug and rejects unpublished lessons.
func (s *ContentService) GetPublishedLesson(ctx context.Context, lessonID, slug, locale string) (domain.Lesson, error) {
	var l domain.Lesson
	var err error
	switch {
	case lessonID != "":
		l, err = s.GetLessonByID(ctx, lessonID, locale)
	case slug != "":
		l, err = s.GetLesson(ctx, slug, locale)
	default:
		return domain.Lesson{}, apperrors.Validation("lessonId or slug is required")
	}
	if err != nil {
		return domain.Lesson{}, err
	}
	if !l.Published {
		return domain.Lesson{}, apperrors.NotFound("lesson not found")
	}
	return l, nil
}

// GetLessonSolution returns solution SQL for a published lesson exercise.
func (s *ContentService) GetLessonSolution(ctx context.Context, slug, locale string) (string, error) {
	l, err := s.GetPublishedLesson(ctx, "", slug, locale)
	if err != nil {
		return "", err
	}
	sol, ok := content.ExerciseSolutionText(l.Exercise)
	if !ok {
		return "", apperrors.NotFound("no solution for this lesson")
	}
	return sol, nil
}

func (s *ContentService) SyncFromDrive(ctx context.Context) (int, error) {
	files, err := s.drive.ListLessonFiles(ctx)
	if err != nil {
		return 0, apperrors.Internal(err)
	}
	count := 0
	for _, f := range files {
		l, err := drive.ParseLessonFile(f)
		if err != nil {
			continue
		}
		if err := s.repo.UpsertLesson(ctx, l); err != nil {
			return count, apperrors.Internal(err)
		}
		count++
	}
	return count, nil
}

func (s *ContentService) UpsertLesson(ctx context.Context, l domain.Lesson, bodyMD string) (domain.Lesson, error) {
	if err := validate.Required("id", l.ID); err != nil {
		return domain.Lesson{}, err
	}
	if err := validate.Required("slug", l.Slug); err != nil {
		return domain.Lesson{}, err
	}
	if err := validate.Required("trackId", l.TrackID); err != nil {
		return domain.Lesson{}, err
	}
	if l.Locale == "" {
		l.Locale = constants.DefaultLocale
	}
	if err := validate.Locale(l.Locale); err != nil {
		return domain.Lesson{}, err
	}
	if bodyMD != "" {
		l.BodyMD = bodyMD
	}
	l.BodyHTML = markdown.SimpleRender(l.BodyMD)
	rel := fmt.Sprintf("%s/%s/%s.md", l.TrackID, l.Locale, l.Slug)
	fileID, err := s.drive.WriteLessonFile(ctx, rel, buildLessonMD(l, l.BodyMD))
	if err != nil {
		return domain.Lesson{}, apperrors.Internal(err)
	}
	l.DriveFileID = &fileID
	if err := s.repo.UpsertLesson(ctx, l); err != nil {
		return domain.Lesson{}, apperrors.Internal(err)
	}
	return l, nil
}

func (s *ContentService) DeleteLesson(ctx context.Context, id, locale string, fileID *string) error {
	if fileID == nil || *fileID == "" {
		if existing, err := s.repo.GetLessonByID(ctx, id, locale); err == nil && existing.DriveFileID != nil {
			fileID = existing.DriveFileID
		}
	}
	if fileID != nil && *fileID != "" {
		_ = s.drive.DeleteLessonFile(ctx, *fileID)
	}
	return s.repo.DeleteLesson(ctx, id, locale)
}

func (s *ContentService) Backend() string {
	return s.drive.Backend()
}

func buildLessonMD(l domain.Lesson, body string) string {
	fm := map[string]any{
		"id":           l.ID,
		"track":        l.TrackID,
		"locale":       l.Locale,
		"slug":         l.Slug,
		"title":        l.Title,
		"order":        l.SortOrder,
		"published":    l.Published,
		"objectives":   l.Objectives,
		"exercise":     l.Exercise,
		"sandbox_seed": l.SandboxSeed,
	}
	if fm["objectives"] == nil {
		fm["objectives"] = []string{}
	}
	if fm["exercise"] == nil {
		fm["exercise"] = map[string]any{}
	}
	if fm["sandbox_seed"] == nil {
		fm["sandbox_seed"] = map[string]any{}
	}
	raw, err := yaml.Marshal(fm)
	if err != nil {
		return fmt.Sprintf("---\nid: %s\n---\n\n%s\n", l.ID, body)
	}
	return fmt.Sprintf("---\n%s---\n\n%s\n", string(raw), body)
}

type LearningService struct {
	repo *repository.Repository
}

func (s *LearningService) SetProgress(ctx context.Context, userID uuid.UUID, lessonID, locale string, completed bool) (domain.Progress, error) {
	return s.repo.UpsertProgress(ctx, userID, lessonID, locale, completed)
}

func (s *LearningService) ListProgress(ctx context.Context, userID uuid.UUID) ([]domain.Progress, error) {
	return s.repo.ListProgress(ctx, userID)
}

func (s *LearningService) ListNotes(ctx context.Context, userID uuid.UUID, lessonID, locale string) ([]domain.Note, error) {
	return s.repo.ListNotes(ctx, userID, lessonID, locale)
}

func (s *LearningService) ListAllNotes(ctx context.Context, userID uuid.UUID, locale string) ([]domain.NoteListItem, error) {
	items, err := s.repo.ListAllNotes(ctx, userID, locale)
	if err != nil {
		return nil, err
	}
	for i := range items {
		items[i].Preview = learning.NotePreview(items[i].Body, 120)
	}
	return items, nil
}

func (s *LearningService) CreateNote(ctx context.Context, userID uuid.UUID, lessonID, locale, body string) (domain.Note, error) {
	if err := validate.NoteBody(body); err != nil {
		return domain.Note{}, err
	}
	return s.repo.CreateNote(ctx, userID, lessonID, locale, body)
}

func (s *LearningService) UpdateNote(ctx context.Context, userID, noteID uuid.UUID, body string) (domain.Note, error) {
	if err := validate.NoteBody(body); err != nil {
		return domain.Note{}, err
	}
	n, err := s.repo.UpdateNote(ctx, userID, noteID, body)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.Note{}, apperrors.NotFound("note not found")
	}
	if err != nil {
		return domain.Note{}, apperrors.Internal(err)
	}
	return n, nil
}

func (s *LearningService) DeleteNote(ctx context.Context, userID, noteID uuid.UUID) error {
	return s.repo.DeleteNote(ctx, userID, noteID)
}

type SandboxService struct {
	runner  *sandbox.Runner
	content *ContentService
}

func sandboxExerciseExpected(exercise map[string]any) (map[string]any, error) {
	if exercise == nil {
		return nil, apperrors.BadRequest("lesson has no exercise")
	}
	expected, _ := exercise["expected"].(map[string]any)
	if expected == nil {
		return nil, apperrors.BadRequest("exercise has no expected result")
	}
	return expected, nil
}

func (s *SandboxService) RunForLesson(ctx context.Context, lessonID, slug, locale, sql string) (domain.SandboxResult, error) {
	lesson, err := s.content.GetPublishedLesson(ctx, lessonID, slug, locale)
	if err != nil {
		return domain.SandboxResult{}, err
	}
	expected, err := sandboxExerciseExpected(lesson.Exercise)
	if err != nil {
		return domain.SandboxResult{}, err
	}
	return s.runner.Run(ctx, sql, lesson.SandboxSeed, expected)
}

func (s *SandboxService) GradeJSForLesson(
	ctx context.Context,
	lessonID, slug, locale string,
	returnValue any,
	consoleLines []string,
) (domain.SandboxResult, error) {
	lesson, err := s.content.GetPublishedLesson(ctx, lessonID, slug, locale)
	if err != nil {
		return domain.SandboxResult{}, err
	}
	expected, err := sandboxExerciseExpected(lesson.Exercise)
	if err != nil {
		return domain.SandboxResult{}, err
	}
	passed, code, msg := sandbox.GradeJs(expected, sandbox.JsGradeInput{
		ReturnValue:  returnValue,
		ConsoleLines: consoleLines,
	})
	result := domain.SandboxResult{
		Passed: passed,
		Code:   code,
		Message: msg,
		Meta: map[string]any{
			"returnValue":  returnValue,
			"consoleLines": consoleLines,
		},
	}
	return result, nil
}

func (s *SandboxService) GradeHtmlCssForLesson(
	ctx context.Context,
	lessonID, slug, locale string,
	html, css string,
) (domain.SandboxResult, error) {
	lesson, err := s.content.GetPublishedLesson(ctx, lessonID, slug, locale)
	if err != nil {
		return domain.SandboxResult{}, err
	}
	expected, err := sandboxExerciseExpected(lesson.Exercise)
	if err != nil {
		return domain.SandboxResult{}, err
	}
	passed, code, msg := sandbox.GradeHtmlCss(expected, sandbox.HtmlCssGradeInput{
		HTML: html,
		CSS:  css,
	})
	return domain.SandboxResult{
		Passed:  passed,
		Code:    code,
		Message: msg,
		Meta: map[string]any{
			"html": html,
			"css":  css,
		},
	}, nil
}
