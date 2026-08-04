package handler_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"

	"syntaxia/apps/api/internal/config"
	"syntaxia/apps/api/internal/handler"
	"syntaxia/apps/api/internal/service"
)

func TestHealth_GETAndHEAD(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	h := handler.New(&service.Services{}, config.Config{})
	h.RegisterRoutes(r)

	for _, method := range []string{http.MethodGet, http.MethodHead} {
		req := httptest.NewRequest(method, "/health", nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		if w.Code != http.StatusOK {
			t.Fatalf("%s /health: want 200, got %d", method, w.Code)
		}
	}
}
