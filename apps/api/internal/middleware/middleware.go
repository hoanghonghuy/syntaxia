package middleware

import (
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"syntaxia/apps/api/internal/auth"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/constants"
)

func RequestID() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.GetHeader("X-Request-ID")
		if id == "" {
			id = uuid.NewString()
		}
		c.Set(constants.ContextReqIDKey, id)
		c.Header("X-Request-ID", id)
		c.Next()
	}
}

func Logger(log *slog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		reqID, _ := c.Get(constants.ContextReqIDKey)
		log.Info("request",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"status", c.Writer.Status(),
			"latency_ms", time.Since(start).Milliseconds(),
			"request_id", reqID,
		)
	}
}

func Recovery(log *slog.Logger) gin.HandlerFunc {
	return gin.CustomRecovery(func(c *gin.Context, recovered any) {
		log.Error("panic", "err", recovered)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"code":    "INTERNAL_ERROR",
			"message": "internal server error",
		})
	})
}

func CORS(origins []string) gin.HandlerFunc {
	allowed := map[string]bool{}
	for _, o := range origins {
		allowed[o] = true
	}
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		if allowed[origin] {
			c.Header("Access-Control-Allow-Origin", origin)
			c.Header("Access-Control-Allow-Credentials", "true")
			c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Request-ID")
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		}
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}

// OptionalAuth attaches session claims when a valid token is present; anonymous requests continue.
func OptionalAuth(tokens *auth.TokenService) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr, err := c.Cookie(constants.CookieName)
		if err != nil || tokenStr == "" {
			authHeader := c.GetHeader("Authorization")
			if strings.HasPrefix(authHeader, "Bearer ") {
				tokenStr = strings.TrimPrefix(authHeader, "Bearer ")
			}
		}
		if tokenStr == "" {
			c.Next()
			return
		}
		claims, err := tokens.Parse(tokenStr)
		if err != nil {
			c.Next()
			return
		}
		c.Set(constants.ContextUserKey, claims)
		c.Next()
	}
}

func Auth(tokens *auth.TokenService) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr, err := c.Cookie(constants.CookieName)
		if err != nil || tokenStr == "" {
			authHeader := c.GetHeader("Authorization")
			if strings.HasPrefix(authHeader, "Bearer ") {
				tokenStr = strings.TrimPrefix(authHeader, "Bearer ")
			}
		}
		if tokenStr == "" {
			AbortAppError(c, apperrors.Unauthorized("authentication required"))
			return
		}
		claims, err := tokens.Parse(tokenStr)
		if err != nil {
			AbortAppError(c, apperrors.Unauthorized("invalid session"))
			return
		}
		c.Set(constants.ContextUserKey, claims)
		c.Next()
	}
}

func RequireAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, ok := c.Get(constants.ContextUserKey)
		if !ok {
			AbortAppError(c, apperrors.Unauthorized("authentication required"))
			return
		}
		cl := claims.(auth.Claims)
		if cl.Role != constants.RoleAdmin {
			AbortAppError(c, apperrors.Forbidden("admin only"))
			return
		}
		c.Next()
	}
}

func AbortAppError(c *gin.Context, err *apperrors.AppError) {
	c.AbortWithStatusJSON(err.Status, gin.H{"code": err.Code, "message": err.Message})
}

func JSONError(c *gin.Context, err error) {
	if ae, ok := err.(*apperrors.AppError); ok {
		c.JSON(ae.Status, gin.H{"code": ae.Code, "message": ae.Message})
		return
	}
	c.JSON(http.StatusInternalServerError, gin.H{"code": "INTERNAL_ERROR", "message": "internal server error"})
}

func ClaimsFromContext(c *gin.Context) (auth.Claims, bool) {
	v, ok := c.Get(constants.ContextUserKey)
	if !ok {
		return auth.Claims{}, false
	}
	cl, ok := v.(auth.Claims)
	return cl, ok
}
