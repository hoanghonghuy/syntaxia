/** Monotonic guard so async lesson loads cannot apply stale responses. */
export function createLessonLoadGuard() {
  let seq = 0
  return {
    next(): number {
      seq += 1
      return seq
    },
    isCurrent(id: number): boolean {
      return id === seq
    },
  }
}

export function lessonLoadKey(slug: string, locale: string): string {
  return `${locale}::${slug}`
}
