# Syntaxia API — multi-stage image for Render (and any Docker host).
# Build context: repository root.
#
#   docker build -t syntaxia-api .
#   docker run --env-file .env -p 8080:8080 syntaxia-api

# Stage 1: Build
FROM golang:1.25-bookworm AS builder

RUN apt-get update && apt-get install -y --no-install-recommends git \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /src

COPY apps/api/go.mod apps/api/go.sum ./
RUN go mod download

COPY apps/api/ ./
COPY docs/curriculum /curriculum

RUN CGO_ENABLED=0 GOOS=linux go build -o /out/syntaxia-api ./cmd/server

# Stage 2: Run
FROM alpine:3.21

RUN apk --no-cache add ca-certificates curl

WORKDIR /app

COPY --from=builder /out/syntaxia-api ./syntaxia-api
COPY --from=builder /curriculum ./curriculum

ENV APP_ENV=production \
	CURRICULUM_LOCAL_PATH=/app/curriculum \
	API_PORT=8080

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
	CMD curl -fsS "http://127.0.0.1:${PORT:-8080}/health" || exit 1

CMD ["./syntaxia-api"]
