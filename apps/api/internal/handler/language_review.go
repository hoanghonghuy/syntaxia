package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"syntaxia/apps/api/internal/middleware"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/constants"
)

// RegisterLanguageRoutes keeps language-learning APIs separate from the legacy
// lesson/progress handlers while the product moves to the v3 player.
func (h *Handler) RegisterLanguageRoutes(r *gin.Engine) {
	group := r.Group("/api/v1/language")
	group.Use(middleware.Auth(h.svc.Tokens))
	group.GET("/review/due", h.dueLanguageReviews)
	group.POST("/review", h.recordLanguageReview)
	group.POST("/attempt", h.recordGradedLanguageAttempt)
}

func (h *Handler) dueLanguageReviews(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	trackID := c.Query("track")
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	limit := 0
	if raw := c.Query("limit"); raw != "" {
		parsed, err := strconv.Atoi(raw)
		if err != nil {
			middleware.JSONError(c, apperrors.Validation("limit must be an integer"))
			return
		}
		limit = parsed
	}
	cards, err := h.svc.Learning.DueLanguageReviews(
		c.Request.Context(), claims.UserID, trackID, locale, limit,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, cards)
}

func (h *Handler) recordLanguageReview(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	var req struct {
		LessonID   string `json:"lessonId"`
		Locale     string `json:"locale"`
		ItemKey    string `json:"itemKey"`
		Rating     int    `json:"rating"`
		ResponseMS *int   `json:"responseMs"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if req.Locale == "" {
		req.Locale = constants.DefaultLocale
	}
	card, err := h.svc.Learning.RecordLanguageReview(
		c.Request.Context(), claims.UserID, req.LessonID, req.Locale,
		req.ItemKey, req.Rating, req.ResponseMS,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, card)
}

func (h *Handler) recordGradedLanguageAttempt(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	var req struct {
		LessonID   string `json:"lessonId"`
		Locale     string `json:"locale"`
		ItemKey    string `json:"itemKey"`
		Submission string `json:"submission"`
		ResponseMS *int   `json:"responseMs"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		middleware.JSONError(c, apperrors.Validation("invalid body"))
		return
	}
	if req.Locale == "" {
		req.Locale = constants.DefaultLocale
	}
	result, err := h.svc.Learning.RecordGradedLanguageAttempt(
		c.Request.Context(), claims.UserID, req.LessonID, req.Locale,
		req.ItemKey, req.Submission, req.ResponseMS,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, result)
}
