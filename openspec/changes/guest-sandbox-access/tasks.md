# Tasks — Guest sandbox access — allow unauthenticated users to run exercises

- [x] 1. Move sandbox routes to separate group with `OptionalAuth` + `RateLimit` (`handler.go`)
- [x] 2. Remove auth gate template block (`v-if="!canRun"`) from `SqlSandbox.vue`
- [x] 3. Remove auth gate template block (`v-if="!canRun"`) from `JsSandbox.vue`
- [x] 4. Remove auth gate template block (`v-if="!canRun"`) from `HtmlCssSandbox.vue`
- [x] 5. Remove `:can-run` binding from lesson page (`tracks/[track]/lessons/[slug].vue`)
- [x] 6. Test guest SQL sandbox (no auth cookie) — query runs, result shown
- [x] 7. Test guest JS sandbox — code runs, grading works
- [x] 8. Test guest HTML-CSS sandbox — code runs, grading works
- [x] 9. Test authed user sandbox still works (regression)
- [x] 10. Test rate limit (31 requests in 1 minute → 429)
- [x] 11. Verify soft login prompt still shows below sandbox for guest
- [x] 12. Write process doc `docs/processes/guest-sandbox-access.md`
- [ ] 13. Verify (run `/syn-verify`)
