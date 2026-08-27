package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"syntaxia/apps/api/internal/middleware"
	"syntaxia/apps/api/pkg/constants"
)

func (h *Handler) RegisterAdaptiveLearningRoutes(r *gin.Engine) {
	group := r.Group("/api/v1/learning")
	group.Use(middleware.Auth(h.svc.Tokens))
	group.GET("/mastery", h.listSkillMastery)
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
