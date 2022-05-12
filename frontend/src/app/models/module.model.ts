export interface Module {
  readonly title: string,
  readonly lessons: Lessons[],
}

export interface Lessons {
  readonly _id: string,
  readonly title: string,
  readonly description: string | null,
  readonly video: string | null,
}

export class Lesson {
  constructor(
    public _id: string,
    public title: string,
    public description: string | null,
    public video: string | null,
  ) {}
}
