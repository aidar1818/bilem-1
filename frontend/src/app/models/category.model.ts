export class Category {
  constructor(
    public _id: string,
    public title: string
  ) {}
}

export interface CreateCategoryData {
  title: string
}

