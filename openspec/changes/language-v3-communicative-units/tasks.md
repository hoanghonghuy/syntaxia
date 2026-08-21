# Tasks — language-v3-communicative-units

- [x] Define explicit unit frontmatter fields and role semantics.
- [x] Preserve unit metadata through the lesson parser and existing exercise JSONB storage.
- [x] Expose lean unit metadata from the lesson-summary API without N+1 full-lesson requests.
- [x] Build frontend grouping from explicit `unitId` only; keep unmigrated lessons as singleton units.
- [x] Render localized unit title/Can-Do and lesson/checkpoint/review node roles.
- [x] Lock parser and frontend grouping/fallback behavior with automated tests.
- [x] Add EN/VI unit metadata to the English A1 greetings seed lesson.
- [x] Verify the integration gate on `e854df2`: Language V3 CI #77 green, IT Curriculum V2 CI #27 green, and Vercel deployment status green.
- [ ] Build full English/Mandarin/Japanese golden units under L5 before mass migration.
