# Tasks — language-v3-communicative-units

- [x] Define explicit unit frontmatter fields and role semantics.
- [x] Preserve unit metadata through the lesson parser and existing exercise JSONB storage.
- [x] Expose lean unit metadata from the lesson-summary API without N+1 full-lesson requests.
- [x] Build frontend grouping from explicit `unitId` only; keep unmigrated lessons as singleton units.
- [x] Render localized unit title/Can-Do and lesson/checkpoint/review node roles.
- [x] Lock parser and frontend grouping/fallback behavior with automated tests.
- [x] Add EN/VI unit metadata to the English A1 greetings seed lesson.
- [ ] Verify Language V3 CI, IT regression CI, and deployment smoke on the draft integration PR.
- [ ] Build full English/Mandarin/Japanese golden units under L5 before mass migration.
