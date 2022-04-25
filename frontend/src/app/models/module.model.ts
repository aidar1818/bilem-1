export interface Module {
  readonly title: string,
  readonly lessons: Lessons[],
}

export interface Lessons {
  readonly title: string,
  readonly description: string | null,
  readonly video: string | null,
}
