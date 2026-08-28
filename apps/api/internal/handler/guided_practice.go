package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"syntaxia/apps/api/internal/middleware"
	"syntaxia/apps/api/pkg/constants"
)

func (h *Handler) guidedPracticeEligibility(c *gin.Context) {
	claims, _ := middleware.ClaimsFromContext(c)
	trackID := c.Query("track")
	locale := c.DefaultQuery("locale", constants.DefaultLocale)
	model, err := h.svc.Learning.GetGuidedPracticeEligibility(
		c.Request.Context(), claims.UserID, trackID, locale,
	)
	if err != nil {
		middleware.JSONError(c, err)
		return
	}
	c.JSON(http.StatusOK, model)
}
