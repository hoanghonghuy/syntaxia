package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"

	"syntaxia/apps/api/pkg/apperrors"
)

type ipWindow struct {
	times []time.Time
}

type rateLimiter struct {
	mu      sync.Mutex
	windows map[string]*ipWindow
	max     int
	window  time.Duration
}

func newRateLimiter(max int, window time.Duration) *rateLimiter {
	return &rateLimiter{
		windows: map[string]*ipWindow{},
		max:     max,
		window:  window,
	}
}

func (rl *rateLimiter) allow(key string) bool {
	now := time.Now()
	cutoff := now.Add(-rl.window)
	rl.mu.Lock()
	defer rl.mu.Unlock()
	w := rl.windows[key]
	if w == nil {
		w = &ipWindow{}
		rl.windows[key] = w
	}
	filtered := w.times[:0]
	for _, t := range w.times {
		if t.After(cutoff) {
			filtered = append(filtered, t)
		}
	}
	if len(filtered) >= rl.max {
		w.times = filtered
		return false
	}
	w.times = append(filtered, now)
	return true
}

// RateLimit limits requests per client IP in a sliding window.
func RateLimit(max int, window time.Duration) gin.HandlerFunc {
	rl := newRateLimiter(max, window)
	return func(c *gin.Context) {
		if !rl.allow(c.ClientIP()) {
			AbortAppError(c, apperrors.New("RATE_LIMITED", "too many requests", http.StatusTooManyRequests, apperrors.ErrBadRequest))
			return
		}
		c.Next()
	}
}
