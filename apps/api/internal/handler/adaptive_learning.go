package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"syntaxia/apps/api/internal/middleware"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/constants"
)

func (h *Handler) RegisterAdaptiveLearningRoutes(r *gin.Engine) {
	group := r.Group("/api/v1/learning")
	group.Use(middleware.Auth(h.svc.Tokens))
	group.GET("/mastery", h.listSkillMastery)
	group.GET("/weak-skills", h.listWeakSkills)
}

func (h *Handler) listSkillMastery(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	trackID := c.Query("track")
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	mastery, err := h.svc.Learning.ListSkillMastery(
		c.Request.Context(), claims.UserID, trackID, locale,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, mastery)
}

func (h *Handler) listWeakSkills(c *gin.Context) {
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
	model, err := h.svc.Learning.ListWeakSkills(
		c.Request.Context(), claims.UserID, trackID, locale, limit,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, model)
}
