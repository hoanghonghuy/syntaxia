# Design — language-review-session

## Pool

1. Hub knows completed lesson ids via `catalog.progress`.
2. Review page fetches each completed lesson (`api.lesson(slug, locale, track)`).
3. Walk `exercise.steps`: collect `practice` and nested `checkpoint.items` via existing `practiceFromStep`.
4. Dedupe by `prompt+answer`; shuffle; slice to `REVIEW_SESSION_SIZE` (8).

## UX

- Continue CTA stays primary; secondary “Review” ghost button.
- Review page: progress N/M, one exercise at a time, done → back to hub.
- No progress API write (practice only).
