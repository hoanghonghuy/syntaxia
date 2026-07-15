package apperrors

import (
	"errors"
	"fmt"
	"net/http"
)

var (
	ErrNotFound       = errors.New("not found")
	ErrUnauthorized   = errors.New("unauthorized")
	ErrForbidden      = errors.New("forbidden")
	ErrConflict       = errors.New("conflict")
	ErrValidation     = errors.New("validation failed")
	ErrBadRequest     = errors.New("bad request")
	ErrInternal       = errors.New("internal error")
)

type AppError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Status  int    `json:"-"`
	Err     error  `json:"-"`
}

func (e *AppError) Error() string {
	if e.Err != nil {
		return fmt.Sprintf("%s: %v", e.Message, e.Err)
	}
	return e.Message
}

func New(code, message string, status int, err error) *AppError {
	return &AppError{Code: code, Message: message, Status: status, Err: err}
}

func NotFound(msg string) *AppError {
	return New("NOT_FOUND", msg, http.StatusNotFound, ErrNotFound)
}

func Unauthorized(msg string) *AppError {
	return New("UNAUTHORIZED", msg, http.StatusUnauthorized, ErrUnauthorized)
}

func Forbidden(msg string) *AppError {
	return New("FORBIDDEN", msg, http.StatusForbidden, ErrForbidden)
}

func Validation(msg string) *AppError {
	return New("VALIDATION_ERROR", msg, http.StatusBadRequest, ErrValidation)
}

func BadRequest(msg string) *AppError {
	return New("BAD_REQUEST", msg, http.StatusBadRequest, ErrBadRequest)
}

func Conflict(msg string) *AppError {
	return New("CONFLICT", msg, http.StatusConflict, ErrConflict)
}

func Internal(err error) *AppError {
	return New("INTERNAL_ERROR", "internal server error", http.StatusInternalServerError, err)
}
