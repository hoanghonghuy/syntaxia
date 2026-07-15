package main

import (
	"context"
	"log"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"syntaxia/apps/api/internal/auth"
	"syntaxia/apps/api/internal/config"
	"syntaxia/apps/api/internal/drive"
	"syntaxia/apps/api/internal/handler"
	"syntaxia/apps/api/internal/middleware"
	"syntaxia/apps/api/internal/repository"
	"syntaxia/apps/api/internal/sandbox"
	"syntaxia/apps/api/internal/service"
	"syntaxia/apps/api/pkg/logger"
)

func main() {
	_ = godotenv.Load()
	_ = godotenv.Load(filepath.Join("..", "..", ".env"))

	cfg := config.Load()
	if err := cfg.Validate(); err != nil {
		log.Fatalf("config: %v", err)
	}
	logr := logger.New()

	ctx := context.Background()
	pool, err := pgxpool.New(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("db: %v", err)
	}
	defer pool.Close()

	curriculumPath := cfg.CurriculumLocalPath
	if !filepath.IsAbs(curriculumPath) {
		if wd, err := os.Getwd(); err == nil {
			curriculumPath = filepath.Join(wd, curriculumPath)
		}
	}

	driveClient, err := drive.NewClient(cfg.GoogleDriveFolderID, cfg.GoogleDriveCredsFile, curriculumPath)
	if err != nil {
		log.Fatalf("drive: %v", err)
	}
	logr.Info("content backend", "backend", driveClient.Backend())

	sandboxPool, err := pgxpool.New(ctx, cfg.SandboxDatabaseURL)
	if err != nil {
		log.Fatalf("sandbox db: %v", err)
	}
	defer sandboxPool.Close()

	repo := repository.New(pool)
	tokens := auth.NewTokenService(cfg.JWTSecret)
	svc := service.New(cfg, repo, driveClient, sandbox.NewRunner(sandboxPool), tokens)

	// Sync curriculum from Drive/local mirror on startup (dev-friendly).
	if n, err := svc.Content.SyncFromDrive(ctx); err != nil {
		logr.Warn("curriculum sync failed", "err", err)
	} else {
		logr.Info("curriculum synced", "count", n)
	}

	h := handler.New(svc, cfg)

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(middleware.RequestID(), middleware.Logger(logr), middleware.Recovery(logr), middleware.CORS(cfg.CORSOrigins))
	h.RegisterRoutes(r)

	addr := ":" + cfg.Port
	logr.Info("starting api", "addr", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server: %v", err)
	}
}
