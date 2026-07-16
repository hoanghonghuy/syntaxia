# JavaScript Basics — W3Schools / MDN exercise map

## Purpose

One runnable **sandbox exercise per lesson** on `javascript-basics`, mapped from public curricula (W3Schools JS Tutorial sidebar + MDN Learn Scripting). Do not invent topics outside the locked nine-lesson outline in [`javascript-track.md`](./javascript-track.md).

## When to use

- Adding or revising `exercise` frontmatter on JS lessons
- Verifying curriculum completeness (all 9 slugs × en/vi)
- Smoke gates: `check-javascript-basics.ps1`, `check-js-sandbox.ps1`

## Lesson → reference → exercise

| Order | Slug | W3Schools / MDN map | Grader | Learner task |
|------:|------|-------------------|--------|--------------|
| 0 | `what-is-javascript` | [JS Introduction](https://www.w3schools.com/js/js_intro.asp), [Output](https://www.w3schools.com/js/js_output.asp) | `console` | `console.log("Hello, " + name)` → `Hello, Ada` |
| 1 | `variables` | [JS Let](https://www.w3schools.com/js/js_let.asp), [Const](https://www.w3schools.com/js/js_const.asp) | `returnValue` | `return name.length` → `8` |
| 2 | `numbers-and-operators` | [JS Arithmetic](https://www.w3schools.com/js/js_arithmetic.asp) | `returnValue` | `return price * quantity` → `36` |
| 3 | `strings` | [JS Strings](https://www.w3schools.com/js/js_strings.asp) | `returnValue` | Join greeting + name → `Hello, Sam!` |
| 4 | `string-methods` | [JS String Methods](https://www.w3schools.com/js/js_string_methods.asp) | `returnValue` | `return code.slice(0, 3)` → `Syn` |
| 5 | `arrays` | [JS Arrays](https://www.w3schools.com/js/js_arrays.asp) | `returnValue` | `push` then `return fruits.length` → `4` |
| 6 | `conditionals` | [JS If Else](https://www.w3schools.com/js/js_if_else.asp) | `console` | `lives === 0` → `Game over` |
| 7 | `loops` | [JS For Loop](https://www.w3schools.com/js/js_loop_for.asp) | `returnValue` | Sum `1+2+3` with `for` → `6` |
| 8 | `functions` | [JS Functions](https://www.w3schools.com/js/js_functions.asp) | `console` | `console.log(add(4, 5))` → `9` |

## Steps

1. Keep **one concept per exercise** — mirrors W3Schools “Try it” density at basics level.
2. Ship **en + vi** together (`hints`, `solution`, `starter`, `expected`).
3. Use only graders in [`javascript-sandbox.md`](./javascript-sandbox.md): `returnValue`, `console`.
4. After edits: `docker compose restart api` (or `docker-up.ps1` rebuild).
5. Run `powershell -File scripts/check-javascript-basics.ps1` and `check-js-sandbox.ps1`.

## Do

- Tie each exercise to the lesson’s worked example (same names/values where possible).
- Provide **3 hints** per lesson (pedagogy Depth B).
- Update **Your turn** body copy to point at the sandbox.

## Don't

- Add DOM, `document`, `fetch`, or events (next track / future row).
- Reuse SQL `sandbox_seed` or `POST /sandbox/run`.
- Publish a lesson with `exercise` in one locale only.

## Related

- [`javascript-track.md`](./javascript-track.md)
- [`javascript-sandbox.md`](./javascript-sandbox.md)
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- `docs/curriculum/javascript-basics/`
