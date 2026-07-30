package handler

import (
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"syntaxia/apps/api/internal/config"
	"syntaxia/apps/api/internal/content"
	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/internal/middleware"
	"syntaxia/apps/api/internal/service"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/constants"
	"syntaxia/apps/api/pkg/validate"
)

type Handler struct {
	svc *service.Services
	cfg config.Config
}

func New(svc *service.Services, cfg config.Config) *Handler {
	return &Handler{svc: svc, cfg: cfg}
}

func (h *Handler) RegisterRoutes(r *gin.Engine) {
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	v1 := r.Group("/api/v1")
	{
		authG := v1.Group("/auth")
		authLimit := middleware.RateLimit(20, time.Minute)
		{
			authG.POST("/register", authLimit, h.register)
			authG.POST("/login", authLimit, h.login)
			authG.POST("/logout", h.logout)
			authG.GET("/providers", h.authProviders)
			authG.GET("/me", middleware.Auth(h.svc.Tokens), h.me)
			authG.PATCH("/me", middleware.Auth(h.svc.Tokens), h.updateMe)
			authG.POST("/password", middleware.Auth(h.svc.Tokens), h.changePassword)
			authG.GET("/google", h.googleStart)
			authG.GET("/google/callback", h.googleCallback)
		}

		v1.GET("/tracks", h.listTracks)
		optAuth := middleware.OptionalAuth(h.svc.Tokens)
		v1.GET("/lessons", optAuth, h.listLessons)

		lessonG := v1.Group("/lessons")
		lessonG.Use(optAuth)
		{
			lessonG.GET("/:slug", h.getLesson)
		}

		sandboxG := v1.Group("/sandbox")
		sandboxG.Use(middleware.OptionalAuth(h.svc.Tokens))
		sandboxG.Use(middleware.RateLimit(30, time.Minute))
		{
			sandboxG.POST("/run", h.sandboxRun)
			sandboxG.POST("/js/grade", h.sandboxJsGrade)
			sandboxG.POST("/htmlcss/grade", h.sandboxHtmlCssGrade)
		}

		authed := v1.Group("")
		authed.Use(middleware.Auth(h.svc.Tokens))
		{
			authed.GET("/progress", h.listProgress)
			authed.PUT("/progress/:lessonId", h.setProgress)
			authed.GET("/notes", h.listAllNotes)
			authed.GET("/lessons/:slug/solution", h.getLessonSolution)
			authed.GET("/lessons/:slug/notes", h.listNotes)
			authed.POST("/lessons/:slug/notes", h.createNote)
			authed.PUT("/notes/:noteId", h.updateNote)
			authed.DELETE("/notes/:noteId", h.deleteNote)
		}

		admin := v1.Group("/admin")
		admin.Use(middleware.Auth(h.svc.Tokens), middleware.RequireAdmin())
		{
			admin.GET("/content/backend", h.contentBackend)
			admin.POST("/content/sync", h.syncContent)
			admin.GET("/lessons", h.adminListLessons)
			admin.GET("/lessons/:id", h.adminGetLesson)
			admin.POST("/lessons", h.upsertLesson)
			admin.DELETE("/lessons/:id", h.deleteLesson)
		}
	}
}

func (h *Handler) authProviders(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"email":          true,
		"google":         h.svc.GoogleOAuth != nil,
		"contentBackend": h.svc.Content.Backend(),
	})
}

func (h *Handler) setCookie(c *gin.Context, token string) {
	secure := h.cfg.CookieSecure()
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(constants.CookieName, token, 7*24*3600, "/", "", secure, true)
}

func (h *Handler) register(c *gin.Context) {
	var req struct {
		Email       string `json:"email"`
		Password    string `json:"password"`
		DisplayName string `json:"displayName"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	u, token, err := h.svc.Auth.Register(c.Request.Context(), req.Email, req.Password, req.DisplayName)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	h.setCookie(c, token)
	c.JSON(http.StatusCreated, u)
}

func (h *Handler) login(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	u, token, err := h.svc.Auth.Login(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	h.setCookie(c, token)
	c.JSON(http.StatusOK, u)
}

func (h *Handler) logout(c *gin.Context) {
	secure := h.cfg.CookieSecure()
	c.SetCookie(constants.CookieName, "", -1, "/", "", secure, true)
	c.Status(http.StatusNoContent)
}

func (h *Handler) me(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	u, err := h.svc.Auth.Me(c.Request.Context(), claims.UserID)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, u)
}

func (h *Handler) updateMe(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	var req struct {
		DisplayName string `json:"displayName"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	u, err := h.svc.Auth.UpdateProfile(c.Request.Context(), claims.UserID, req.DisplayName)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, u)
}

func (h *Handler) changePassword(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	var req struct {
		CurrentPassword string `json:"currentPassword"`
		NewPassword     string `json:"newPassword"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if err := h.svc.Auth.ChangePassword(c.Request.Context(), claims.UserID, req.CurrentPassword, req.NewPassword); err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *Handler) googleStart(c *gin.Context) {
	if h.svc.GoogleOAuth == nil {
		middleware.JSONError(c, apperrors.BadRequest("Google OAuth not configured"))
		return
	}
	state := uuid.NewString()
	secure := h.cfg.CookieSecure()
	redirect := validate.SafeRedirectPath(c.Query("redirect"))
	c.SetCookie("oauth_state", state, 600, "/", "", secure, true)
	c.SetCookie("oauth_redirect", redirect, 600, "/", "", secure, true)
	url := h.svc.GoogleOAuth.AuthCodeURL(state)
	c.Redirect(http.StatusFound, url)
}

func (h *Handler) googleCallback(c *gin.Context) {
	if h.svc.GoogleOAuth == nil {
		c.Redirect(http.StatusFound, h.cfg.WebBaseURL+"/login?error=oauth")
		return
	}
	stateCookie, _ := c.Cookie("oauth_state")
	if stateCookie == "" || stateCookie != c.Query("state") {
		c.Redirect(http.StatusFound, h.cfg.WebBaseURL+"/login?error=state")
		return
	}
	code := c.Query("code")
	tok, err := h.svc.GoogleOAuth.Exchange(c.Request.Context(), code)
	if err != nil {
		c.Redirect(http.StatusFound, h.cfg.WebBaseURL+"/login?error=exchange")
		return
	}
	client := h.svc.GoogleOAuth.Client(c.Request.Context(), tok)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.Redirect(http.StatusFound, h.cfg.WebBaseURL+"/login?error=userinfo")
		return
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		c.Redirect(http.StatusFound, h.cfg.WebBaseURL+"/login?error=userinfo")
		return
	}
	body, _ := io.ReadAll(resp.Body)
	var info struct {
		ID    string `json:"id"`
		Email string `json:"email"`
		Name  string `json:"name"`
	}
	if err := json.Unmarshal(body, &info); err != nil || info.ID == "" || info.Email == "" {
		c.Redirect(http.StatusFound, h.cfg.WebBaseURL+"/login?error=auth")
		return
	}
	u, token, err := h.svc.Auth.GoogleCallback(c.Request.Context(), info.ID, info.Email, info.Name)
	if err != nil {
		c.Redirect(http.StatusFound, h.cfg.WebBaseURL+"/login?error=auth")
		return
	}
	h.setCookie(c, token)
	_ = u
	redirect := "/"
	if v, err := c.Cookie("oauth_redirect"); err == nil {
		redirect = validate.SafeRedirectPath(v)
	}
	secure := h.cfg.CookieSecure()
	c.SetCookie("oauth_redirect", "", -1, "/", "", secure, true)
	c.Redirect(http.StatusFound, h.cfg.WebBaseURL+redirect)
}

func (h *Handler) listTracks(c *gin.Context) {
	tracks, err := h.svc.Content.ListTracks(c.Request.Context())
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, tracks)
}

func (h *Handler) listLessons(c *gin.Context) {
	track := c.Query("track")
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	if err := validate.Locale(locale); err != nil {
		middleware.JSONError(c, err)
		return
	}
	admin := false
	if claims, ok := middleware.ClaimsFromContext(c); ok && claims.Role == constants.RoleAdmin {
		admin = c.Query("admin") == "true" || c.Query("all") == "true"
	}
	lessons, err := h.svc.Content.ListLessons(c.Request.Context(), track, locale, admin)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, lessons)
}

func (h *Handler) getLesson(c *gin.Context) {
	slug := c.Param("slug")
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	if err := validate.Locale(locale); err != nil {
		middleware.JSONError(c, err)
		return
	}
	lesson, err := h.svc.Content.GetLesson(c.Request.Context(), slug, locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	if !lesson.Published {
		if claims, ok := middleware.ClaimsFromContext(c); !ok || claims.Role != constants.RoleAdmin {
			middleware.JSONError(c, apperrors.NotFound("lesson not found"))
			return
		}
	}
	if claims, ok := middleware.ClaimsFromContext(c); ok && claims.Role == constants.RoleAdmin {
		c.JSON(http.StatusOK, lesson)
		return
	}
	c.JSON(http.StatusOK, content.LessonForLearner(lesson))
}

func (h *Handler) getLessonSolution(c *gin.Context) {
	slug := c.Param("slug")
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	solution, err := h.svc.Content.GetLessonSolution(c.Request.Context(), slug, locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"solution": solution})
}

func (h *Handler) contentBackend(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"backend": h.svc.Content.Backend()})
}

func (h *Handler) adminListLessons(c *gin.Context) {
	track := c.Query("track")
	locale := c.Query("locale")
	lessons, err := h.svc.Content.ListLessons(c.Request.Context(), track, locale, true)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, lessons)
}

func (h *Handler) adminGetLesson(c *gin.Context) {
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	lesson, err := h.svc.Content.GetLessonByID(c.Request.Context(), c.Param("id"), locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, lesson)
}

func (h *Handler) syncContent(c *gin.Context) {
	n, err := h.svc.Content.SyncFromDrive(c.Request.Context())
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"synced": n})
}

func (h *Handler) upsertLesson(c *gin.Context) {
	var req struct {
		Lesson domain.Lesson `json:"lesson"`
		BodyMD string        `json:"bodyMd"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	l, err := h.svc.Content.UpsertLesson(c.Request.Context(), req.Lesson, req.BodyMD)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, l)
}

func (h *Handler) deleteLesson(c *gin.Context) {
	id := c.Param("id")
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	var fileID *string
	if v := c.Query("fileId"); v != "" {
		fileID = &v
	}
	if err := h.svc.Content.DeleteLesson(c.Request.Context(), id, locale, fileID); err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *Handler) sandboxRun(c *gin.Context) {
	var req struct {
		SQL      string `json:"sql"`
		LessonID string `json:"lessonId"`
		Slug     string `json:"slug"`
		Locale   string `json:"locale"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if req.Locale == "" {
		req.Locale = constants.DefaultLocale
	}
	result, err := h.svc.Sandbox.RunForLesson(c.Request.Context(), req.LessonID, req.Slug, req.Locale, req.SQL)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, result)
}

func (h *Handler) sandboxJsGrade(c *gin.Context) {
	var req struct {
		LessonID     string   `json:"lessonId"`
		Slug         string   `json:"slug"`
		Locale       string   `json:"locale"`
		ReturnValue  any      `json:"returnValue"`
		ConsoleLines []string `json:"consoleLines"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if req.Locale == "" {
		req.Locale = constants.DefaultLocale
	}
	result, err := h.svc.Sandbox.GradeJSForLesson(
		c.Request.Context(),
		req.LessonID,
		req.Slug,
		req.Locale,
		req.ReturnValue,
		req.ConsoleLines,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, result)
}

func (h *Handler) sandboxHtmlCssGrade(c *gin.Context) {
	var req struct {
		LessonID string `json:"lessonId"`
		Slug     string `json:"slug"`
		Locale   string `json:"locale"`
		HTML     string `json:"html"`
		CSS      string `json:"css"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if req.Locale == "" {
		req.Locale = constants.DefaultLocale
	}
	result, err := h.svc.Sandbox.GradeHtmlCssForLesson(
		c.Request.Context(),
		req.LessonID,
		req.Slug,
		req.Locale,
		req.HTML,
		req.CSS,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, result)
}

func (h *Handler) listProgress(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	items, err := h.svc.Learning.ListProgress(c.Request.Context(), claims.UserID)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, items)
}

func (h *Handler) setProgress(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	var req struct {
		Locale    string `json:"locale"`
		Completed bool   `json:"completed"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if req.Locale == "" {
		req.Locale = constants.DefaultLocale
	}
	lesson, err := h.svc.Content.GetLessonByID(c.Request.Context(), c.Param("lessonId"), req.Locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	if !lesson.Published {
		middleware.JSONError(c, apperrors.NotFound("lesson not found"))
		return
	}
	p, err := h.svc.Learning.SetProgress(c.Request.Context(), claims.UserID, lesson.ID, req.Locale, req.Completed)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, p)
}

func (h *Handler) listNotes(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	lesson, err := h.svc.Content.GetLesson(c.Request.Context(), c.Param("slug"), locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	if !lesson.Published {
		middleware.JSONError(c, apperrors.NotFound("lesson not found"))
		return
	}
	notes, err := h.svc.Learning.ListNotes(c.Request.Context(), claims.UserID, lesson.ID, locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, notes)
}

func (h *Handler) listAllNotes(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	notes, err := h.svc.Learning.ListAllNotes(c.Request.Context(), claims.UserID, locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	if notes == nil {
		notes = []domain.NoteListItem{}
	}
	c.JSON(http.StatusOK, notes)
}

func (h *Handler) createNote(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	var req struct {
		Locale string `json:"locale"`
		Body   string `json:"body"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if req.Locale == "" {
		req.Locale = constants.DefaultLocale
	}
	lesson, err := h.svc.Content.GetLesson(c.Request.Context(), c.Param("slug"), req.Locale)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	if !lesson.Published {
		middleware.JSONError(c, apperrors.NotFound("lesson not found"))
		return
	}
	n, err := h.svc.Learning.CreateNote(c.Request.Context(), claims.UserID, lesson.ID, req.Locale, strings.TrimSpace(req.Body))
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusCreated, n)
}

func (h *Handler) updateNote(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	noteID, err := uuid.Parse(c.Param("noteId"))
	if err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid note id"))
		return
	}
	var req struct {
		Body string `json:"body"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	n, err := h.svc.Learning.UpdateNote(c.Request.Context(), claims.UserID, noteID, req.Body)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, n)
}

func (h *Handler) deleteNote(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	noteID, err := uuid.Parse(c.Param("noteId"))
	if err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid note id"))
		return
	}
	if err := h.svc.Learning.DeleteNote(c.Request.Context(), claims.UserID, noteID); err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}
