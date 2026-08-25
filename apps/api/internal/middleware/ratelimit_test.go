package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"syntaxia/apps/api/internal/auth"
	"syntaxia/apps/api/pkg/constants"
)

func TestRateLimit_blocksAfterMax(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.POST("/login", RateLimit(2, time.Minute), func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	for i := 0; i < 2; i++ {
		w := httptest.NewRecorder()
		req := httptest.NewRequest(http.MethodPost, "/login", nil)
		req.RemoteAddr = "1.2.3.4:1234"
		r.ServeHTTP(w, req)
		if w.Code != http.StatusOK {
			t.Fatalf("request %d: got %d", i+1, w.Code)
		}
	}

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/login", nil)
	req.RemoteAddr = "1.2.3.4:1234"
	r.ServeHTTP(w, req)
	if w.Code != http.StatusTooManyRequests {
		t.Fatalf("expected 429, got %d", w.Code)
	}
}

func TestRateLimit_authenticatedUsersHaveIndependentBuckets(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	limit := RateLimit(1, time.Minute)
	r.POST("/sandbox", func(c *gin.Context) {
		userID, err := uuid.Parse(c.GetHeader("X-Test-User"))
		if err != nil {
			t.Fatalf("parse user id: %v", err)
		}
		c.Set(constants.ContextUserKey, auth.Claims{UserID: userID})
		c.Next()
	}, limit, func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	userA := uuid.NewString()
	userB := uuid.NewString()

	request := func(userID string) int {
		w := httptest.NewRecorder()
		req := httptest.NewRequest(http.MethodPost, "/sandbox", nil)
		req.RemoteAddr = "1.2.3.4:1234"
		req.Header.Set("X-Test-User", userID)
		r.ServeHTTP(w, req)
		return w.Code
	}

	if got := request(userA); got != http.StatusOK {
		t.Fatalf("user A first request: got %d", got)
	}
	if got := request(userB); got != http.StatusOK {
		t.Fatalf("user B first request should not share user A bucket: got %d", got)
	}
	if got := request(userA); got != http.StatusTooManyRequests {
		t.Fatalf("user A second request: expected 429, got %d", got)
	}
}

func TestRateLimit_anonymousRequestsStillShareIPBucket(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.POST("/sandbox", RateLimit(1, time.Minute), func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	request := func() int {
		w := httptest.NewRecorder()
		req := httptest.NewRequest(http.MethodPost, "/sandbox", nil)
		req.RemoteAddr = "1.2.3.4:1234"
		r.ServeHTTP(w, req)
		return w.Code
	}

	if got := request(); got != http.StatusOK {
		t.Fatalf("first anonymous request: got %d", got)
	}
	if got := request(); got != http.StatusTooManyRequests {
		t.Fatalf("second anonymous request: expected 429, got %d", got)
	}
}
